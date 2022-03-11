import { useDispatch, useSelector } from 'react-redux';
import {setBlockoutsForCurrentDate, setSchedule} from "../redux/actions";
import Date from './Date';
import VolunteerList from './VolunteerList';
import Schedule from './Schedule';

const Home = () => {

    const blockouts = useSelector(state => state.blockout);
    const slides = useSelector(state => state.slides);
    const livestream = useSelector(state => state.livestream);
    const sound = useSelector(state => state.sound);
    const lead = useSelector(state => state.lead);
    const scheduleCreated = useSelector(state => state.scheduleCreated);

    const date = useSelector(state => state.currentDate);
    const vols = useSelector(state => state.volunteersBlockout);
    const sched = useSelector(state => state.schedule);

    const dispatch = useDispatch();

    const createSchedule = () => {

        let schedule = []
        let currSchedule;
        let leadExists;
        let teams = ['sound', 'livestream', 'slides']
        console.log("inside: ", blockouts)

        Object.keys(blockouts).forEach((date) => {
            console.log("inside more: ", date);
            let vols = blockouts[date];
            currSchedule = {'date': date, 'slides':'', 'livestream':'', 'sound':''}
            leadExists = false;
            console.log("vols: ", vols)
            console.log("slides: ", slides)            
            let availableSlides = slides.filter((vol) => !vols.includes(vol));
            let availableLivestream = livestream.filter((vol) => !vols.includes(vol));
            let availableSound = sound.filter((vol) => !vols.includes(vol));
    
            for(let t of teams) {
                let vol;
                if(t === 'sound') {
                    let rando = Math.floor(Math.random() * availableSound.length)
                    vol = availableSound[rando];
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

                    let rando = Math.floor(Math.random() * availableLivestream.length)
                    vol = availableLivestream[rando];
                    
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
                        let rando = Math.floor(Math.random() * availableSlides.length)
                        vol = availableSlides[rando];
                    }
                }
                currSchedule[t] = vol;
            }
            schedule.push(currSchedule);
        
        })
        dispatch(setSchedule(schedule));
        
    }

    return(
        <>
        <nav class="navbar navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand me-0 pe-0" href="#">
                <img src="KingsHillLogo.png" alt="" width="30" height="24" class="d-inline-block align-text-top pe-2"/>
                KH Scheduling
                </a>
            </div>
        </nav>
        <div className="container mt-5 kh-text-align-center">
            <div className="row mb-5">
                <div className="col">
                    <h6>Select a date to input blockouts</h6>
                    <Date/>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col kh-width">
                    <VolunteerList/>
                </div>
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
        {console.log("vols: ", vols)}
        {console.log("blocks: ", blockouts)}
        {console.log("sched: ", sched)}
        
        </>
    )
}

export default Home;