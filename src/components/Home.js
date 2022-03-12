import { useDispatch, useSelector } from 'react-redux';
import {setBlockoutsForCurrentDate, setSchedule} from "../redux/actions";
import Date from './Date';
import VolunteerList from './VolunteerList';
import Schedule from './Schedule';
import Nav from './Nav';

const Home = () => {

    const nodate = useSelector(state => state.nodate);  // display an error if no date selected but there are selected volunteers
    const blockouts = useSelector(state => state.blockout); // array holding the blockout info - [{'blockout_date':[volunteers]}]
    const slides = useSelector(state => state.slides);
    const livestream = useSelector(state => state.livestream);
    const sound = useSelector(state => state.sound);
    const lead = useSelector(state => state.lead);
    const scheduleCreated = useSelector(state => state.scheduleCreated);    // boolean to check if schedule exists and so needs to be displayed
    const currentDate = useSelector(state => state.currentDate);   // selected date
    const volunteersBlockedOut = useSelector(state => state.volunteersBlockout);    // currently selected volunteers
    const volunteersBlockoutStillAvail = useSelector(state => state.volunteersBlockoutStillAvail);  // volunteers not yet blocked out - on the left

    const dispatch = useDispatch();

    const selectAVolunteer = (vols, freq, blocks) => {
        // get the available volunteers that haven't been scheduled for any sunday yet
        let lookup = vols.filter((i) => freq['0'].includes(i))
        let freq_0 = true

        // if none of those, get the ones who've only been scheduled once so far
        if(lookup.length < 1) {
            lookup = vols.filter((i) => freq['1'].includes(i))
            freq_0 = false
        }

        // check if volunteers that have blockouts this month are available for this Sunday, if so, schedule one of them
        let newLookup = lookup.filter((i) => blocks.has(i))
        if(newLookup.length > 0) {
            lookup = newLookup;
        }

        // randomly select a volunteer from this list now
        let rando = Math.floor(Math.random() * lookup.length)
        let vol = lookup[rando];

        // remove them from the available list for this sunday
        vols.splice(rando,1);
        
        return [freq_0, vol];
    }

    const createSchedule = () => {

        let schedule = []
        let roles = ['sound', 'livestream', 'slides']
        let frequencies = {'0':[...slides], '1':[]} // so each volunteer gets a chance you know
        let allBlockouts = new Set();   // a list of all volunteers that have at least one sunday blocked out, use this to prioritize to schedule them whenever they are available, no volunteer left behind

        Object.keys(blockouts).forEach((d) => {
            for(let each of blockouts[d]) {
                allBlockouts.add(each);
            }
        })
        
        console.log("start freqs: ", frequencies)

        Object.keys(blockouts).forEach((date) => {
            
            let vols = blockouts[date]; // volunteers blocked out for this day
            let currSchedule = {'date': date, 'slides':'', 'livestream':'', 'sound':''} // new schedule object for this date
            let leadExists = false;
                     
            let availableSlides = slides.filter((v) => !vols.includes(v));
            let availableLivestream = livestream.filter((v) => !vols.includes(v));
            let availableSound = sound.filter((v) => !vols.includes(v));

            let lookup_freq_0;
            let vol = '';
            console.log("date: ", date)
            console.log("blocked out: ", vols)
            console.log("freqs: ", frequencies)
            console.log("allBlocks: ", allBlockouts)

            for(let t of roles) {
                
                // scheduling first sound -> livestream -> slides, in order of available volunteers for each
                if(t === 'sound') {

                    let info = selectAVolunteer(availableSound, frequencies, allBlockouts);
                    lookup_freq_0 = info[0];
                    vol = info[1];

                    // check if it's a leader
                    leadExists = (vol === lead[0] || vol === lead[1]);

                    // if a leader is scheduled, remove the other one from availability, don't nobody need 2 leaders on the same day
                    if(leadExists) {
                        if (vol === lead[0]) {
                            availableLivestream.splice(availableLivestream.indexOf(lead[1]),1);
                            availableSlides.splice(availableSlides.indexOf(lead[1]),1);
                        } else {
                            availableLivestream.splice(availableLivestream.indexOf(lead[0]),1);
                            availableSlides.splice(availableSlides.indexOf(lead[0]),1);
                        }
                    }

                    // remove this vol from the other team availability list too, no one getting scheduled for more than one role lol
                    availableLivestream.splice(availableLivestream.indexOf(vol),1);
                    availableSlides.splice(availableSlides.indexOf(vol),1);
                    
                } else if (t === 'livestream') {

                    let info = selectAVolunteer(availableLivestream, frequencies, allBlockouts);
                    lookup_freq_0 = info[0];
                    vol = info[1];

                    if (!leadExists) {
                        leadExists = (vol === lead[0] || vol === lead[1]);
                        if(leadExists) {
                            if (vol === lead[0]) {
                                availableSlides.splice(availableSlides.indexOf(lead[1]),1);
                            } else {
                                availableSlides.splice(availableSlides.indexOf(lead[0]),1);
                            }
                        }
                    }
                    availableSlides.splice(availableSlides.indexOf(vol),1);
                
                } else {

                    if (!leadExists) {
                        vol = availableSlides.includes(lead[0]) ? lead[0]
                                : availableSlides.includes(lead[1]) ? lead[1]
                                : "No lead available";

                    } else {

                        let info = selectAVolunteer(availableSlides, frequencies, allBlockouts);
                        lookup_freq_0 = info[0];
                        vol = info[1];
                        
                    }
                }
                console.log("selected vol: ", vol)
                console.log("lookup_freq_0: ", lookup_freq_0)
                currSchedule[t] = vol;

                if(lookup_freq_0) {
                    frequencies['0'].splice(frequencies['0'].indexOf(vol),1);
                    frequencies['1'].push(vol);
                } else {
                    frequencies['1'].splice(frequencies['1'].indexOf(vol),1);
                }
                allBlockouts.delete(vol);
            }
            schedule.push(currSchedule);
        })
        dispatch(setSchedule(schedule));
    }

    return(
        <>
        <Nav/>
        {/* the main content on the page - grid layout */}
        <div className="container mt-5 pt-5 kh-text-align-center">
            {/* the blockout date input */}
            <div className="row mb-5">
                <div className="col">
                    <Date date={currentDate} nodate={nodate}/>
                </div>
            </div>
            {/* the two sections to display available volunteers on the left and selected volunteers on the right */}
            <div className="row mb-5 justify-content-center">
                <div className="col-4 align-self-end d-none d-md-block ">
                    <VolunteerList volunteers={volunteersBlockoutStillAvail} display={false}/>
                </div>
                <div className="col-4 align-self-start kh-empty d-none d-md-block ">
                {(volunteersBlockedOut.length > 0)? 
                    <VolunteerList volunteers={volunteersBlockedOut} display={true}/>
                :<div className="kh-empty-content kh-round-borders">None selected</div>}</div>
            </div>
            {/* responsive volunteer list for smaller screens */}
            <div className="row mb-5 justify-content-center d-sm-block d-md-none">
                <div className="col-10">
                    <VolunteerList volunteers={volunteersBlockoutStillAvail} display={false}/>
                </div>
            </div>
            <div className="row mb-5 justify-content-center d-sm-block d-md-none">
                <div className="col-10 kh-empty">
                    {(volunteersBlockedOut.length > 0)? 
                        <VolunteerList volunteers={volunteersBlockedOut} display={true}/>
                    :<div className="kh-empty-content">None selected</div>}
                </div>
            </div>
            {/* save a blockout */}
            <div className="row mb-5">
                <div className="col">
                    <button type="button" class="btn btn-primary kh-width-max-content" onClick={() => dispatch(setBlockoutsForCurrentDate({date: currentDate, volunteers: volunteersBlockedOut}))}>Save</button>
                </div>
            </div>
            {/* create the schedule */}
            <div className="row mb-5">
                <div className="col">
                    <button type="button" class="btn btn-danger kh-width-max-content" onClick={() => createSchedule()}>Create Schedule</button>
                </div>
            </div>
            {/* display the schedule as a table below once it's created */}
            <div className="row mb-5">
                <div className="col">
                {scheduleCreated ? <Schedule/>:""}
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;