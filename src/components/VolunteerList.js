import { useDispatch, useSelector } from "react-redux";
import {addVolunteerBlockOut} from "../redux/actions";

const VolunteerList = () => {

    const volunteers = useSelector(state => state.slides);
    const dispatch = useDispatch();

    return(
        <ul class="list-group kh-max-height">
            {volunteers.map((vol) => 
            <li class="list-group-item d-flex justify-content-between align-items-center">
                {vol}
                <button type="button" class="btn btn-primary" onClick={() => dispatch(addVolunteerBlockOut(vol))}>+</button>
            </li>)}
        </ul>
    )
}

export default VolunteerList;