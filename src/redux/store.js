import {createStore} from "redux";
import {INITIAL_STATE} from "./stateConstants";
import { BLOCKOUT_DATE, VOLUNTEER_BLOCKOUT, SAVE_BLOCKOUT, SET_SCHEDULE } from "./actionConstants";


function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case BLOCKOUT_DATE:
            return {...state, currentDate: action.payload.currentDate};
        case VOLUNTEER_BLOCKOUT:
            return {...state, volunteersBlockout: [...state.volunteersBlockout, action.payload.volunteersBlockout]};
        case SAVE_BLOCKOUT:
            {
                let tmp = state.blockout
                tmp[action.payload.blocked.date] = action.payload.blocked.volunteers
                return {...state, blockout: tmp, volunteersBlockout: [], currentDate: ''};
            }
            
        case SET_SCHEDULE:
            return {...state, schedule: action.payload.schedule, scheduleCreated: true};
        default:
            return state;
    }
}

export default createStore(rootReducer);