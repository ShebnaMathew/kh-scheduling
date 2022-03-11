import { useDispatch, useSelector } from 'react-redux';
import {setBlockoutsForCurrentDate, setSchedule} from "../redux/actions";
import Date from './Date';
import VolunteerList from './VolunteerList';
import Schedule from './Schedule';
import { useState } from 'react';

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    
    const nodate = useSelector(state => state.nodate);
    const blockouts = useSelector(state => state.blockout);
    const slides = useSelector(state => state.slides);
    const livestream = useSelector(state => state.livestream);
    const sound = useSelector(state => state.sound);
    const lead = useSelector(state => state.lead);
    const scheduleCreated = useSelector(state => state.scheduleCreated);

    const date = useSelector(state => state.currentDate);
    const vols = useSelector(state => state.volunteersBlockout);
    const sched = useSelector(state => state.schedule);
    const volunteersBlockoutStillAvail = useSelector(state => state.volunteersBlockoutStillAvail);

    const dispatch = useDispatch();

    const createSchedule = () => {

        console.log(".................SCHEDULE CREATE START............")
        let schedule = []
        let currSchedule;
        let leadExists;
        let teams = ['sound', 'livestream', 'slides']
        console.log("inside: ", blockouts)
        let frequencies = {'0':[...slides], '1':[]}
        let allBlockouts = new Set();
        Object.keys(blockouts).forEach((d) => {
            for(let each of blockouts[d]) {
                allBlockouts.add(each);
            }

        })

        Object.keys(blockouts).forEach((date) => {
            
            let vols = blockouts[date];
            currSchedule = {'date': date, 'slides':'', 'livestream':'', 'sound':''}
            leadExists = false;
                     
            let availableSlides = slides.filter((vol) => !vols.includes(vol));
            let availableLivestream = livestream.filter((vol) => !vols.includes(vol));
            let availableSound = sound.filter((vol) => !vols.includes(vol));

            console.log("frequencies: ", frequencies)
            console.log("all blocks: ", allBlockouts)

            let lookup;
            let newLookup;
            let lookup_freq_0 = true
            let vol;

            for(let t of teams) {
                
                if(t === 'sound') {
                    lookup = availableSound.filter((i) => frequencies['0'].includes(i))
                    if(lookup.length < 1) {
                        lookup = availableSound.filter((i) => frequencies['1'].includes(i))
                        lookup_freq_0 = false
                    }
                    newLookup = lookup.filter((i) => allBlockouts.has(i))
                    if(newLookup.length > 0) {
                        lookup = newLookup;
                    }
                    let rando = Math.floor(Math.random() * lookup.length)
                    vol = lookup[rando];
                    leadExists = (vol === lead[0] || vol === lead[1]);
                    availableSound.splice(rando,1);

                    if(leadExists) {
                        if (vol === lead[0]) {
                            availableLivestream.splice(availableLivestream.indexOf(lead[1]),1);
                            availableSlides.splice(availableSlides.indexOf(lead[1]),1);
                        } else {
                            availableLivestream.splice(availableLivestream.indexOf(lead[0]),1);
                            availableSlides.splice(availableSlides.indexOf(lead[0]),1);
                        }
                    }

                    availableLivestream.splice(availableLivestream.indexOf(vol),1);
                    availableSlides.splice(availableSlides.indexOf(vol),1);
                    
    
                } else if (t === 'livestream') {

                    lookup = availableLivestream.filter((i) => frequencies['0'].includes(i))
                    
                    if(lookup.length < 1) {
                        lookup = availableLivestream.filter((i) => frequencies['1'].includes(i))
                        lookup_freq_0 = false

                    }
                    newLookup = lookup.filter((i) => allBlockouts.has(i))
                    if(newLookup.length > 0) {
                        lookup = newLookup;
                    }
                    let rando = Math.floor(Math.random() * lookup.length)
                    vol = lookup[rando];
                    
                    availableLivestream.splice(rando,1);
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
                        lookup = availableSlides.filter((i) => frequencies['0'].includes(i))
                    
                        if(lookup.length < 1) {
                            lookup = availableSlides.filter((i) => frequencies['1'].includes(i))
                            lookup_freq_0 = false

                        }
                        newLookup = lookup.filter((i) => allBlockouts.has(i))
                        if(newLookup.length > 0) {
                            lookup = newLookup;
                            
                        }
                        let rando = Math.floor(Math.random() * lookup.length)
                        vol = lookup[rando];
                        
                    }
                }
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
        <nav class="navbar navbar-dark bg-primary kh-position-fixed">
            <div class="container-fluid">
                <a class="navbar-brand me-0 pe-0" href="#">
                <img src="KingsHillLogo.png" alt="" width="30" height="24" class="d-inline-block align-text-top pe-2"/>
                 KH Scheduler
                </a>
                <button type="button" class="btn btn-primary" onClick={() => setShowModal(true)}>
                <i class="far fa-question-circle"></i>
                </button>
                {showModal ?
                    <div class="modal fade kh-view mt-5 pt-3" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Instructions</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div class="modal-body">
                                        <p className='text-muted'>You can see I haven't put much effort into this help section.</p>
                                        <p>1. Select a blockout date to add volunteers to that date</p>
                                        <p>2. Hit Save</p>
                                        <p>3. Do this for all blockout dates</p>
                                        <p>4. Made a mistake ? Just select the date that needs correction and add the volunteers again</p>
                                        <p>5. Once all the blockouts are set, create the schedule</p>
                                        <p>6. This app doesn't have permanent storage, so all data would be lost once you hit refresh lol</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                    </div>
                        </div>
                    </div>
                </div>:""}

            </div>
        </nav>
        
        <div className="container mt-5 pt-5 kh-text-align-center">
        
            <div className="row mb-5">
                <div className="col">
                    <Date date={date} nodate={nodate}/>
                </div>
            </div>
            <div className="row mb-5 justify-content-center">
                <div className="col-4 align-self-end">
                    <VolunteerList volunteers={volunteersBlockoutStillAvail} display={false}/>
                </div>
                <div className="col-4 align-self-start kh-empty">
                {(vols.length > 0)? 
                
                    <VolunteerList volunteers={vols} display={true}/>
                :<div className="kh-empty-content">None selected</div>}</div>
                <div className="kh-float-done"></div>
            </div>
            
            <div className="row mb-5">
                <div className="col">
                    <button type="button" class="btn btn-primary kh-width-10" onClick={() => dispatch(setBlockoutsForCurrentDate({date: date, volunteers: vols}))}>Save</button>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col">
                    <button type="button" class="btn btn-danger kh-width-15" onClick={() => createSchedule()}>Create Schedule</button>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col">
                {scheduleCreated ? <Schedule/>:""}
                </div>
            </div>
        </div>
        {console.log("date: ", date)}
        {console.log("blocks: ", blockouts)}
        {console.log("sched: ", sched)}
        </>
    )
}

export default Home;