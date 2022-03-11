import { useDispatch, useSelector } from "react-redux";
import {addVolunteerBlockOut, removeVolunteerBlockOut} from "../redux/actions";

const VolunteerList = (props) => {

    const volunteers = props.volunteers;
    const display = props.display;
    console.log("volunteers in ehre: ", volunteers);
    console.log("display: ", display)
    
    const dispatch = useDispatch();

    return(
        <ul class="list-group kh-max-height kh-empty-content">
            {volunteers.map((vol) => 
            <li class="list-group-item d-flex justify-content-between align-items-center">
                {vol}
                {display ? 
                <button type="button" class="btn btn-danger" value={vol} onClick={(e) => dispatch(removeVolunteerBlockOut(e.target.value))}>-</button>
                :
                <button type="button" class="btn btn-primary" value={vol} onClick={(e) => dispatch(addVolunteerBlockOut(e.target.value))}>+</button>}
            </li>)}
        </ul>
    )
}

export default VolunteerList;