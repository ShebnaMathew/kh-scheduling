import {useDispatch} from "react-redux";
import {setCurrentDate} from "../redux/actions";

const Date = () => {
    const dispatch = useDispatch();

    return(
        <input type="date" id="date" onChange={(e) => dispatch(setCurrentDate(e.target.value))}/>
    )
}

export default Date;