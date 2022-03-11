import {useDispatch} from "react-redux";
import {setCurrentDate} from "../redux/actions";

const Date = (props) => {
    const dispatch = useDispatch();

    return(
        <>
            <h6 className="text-muted">Blockout date</h6>
            <input type="date" id="date" onChange={(e) => dispatch(setCurrentDate(e.target.value))} value={props.date}/>
            {(props.nodate) ? <div class="invalid-feedback kh-view">Maybe select a date to go with that?</div>:""}
        </>
    )
}

export default Date;