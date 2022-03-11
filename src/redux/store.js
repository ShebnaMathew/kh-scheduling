import {createStore} from "redux";
import {INITIAL_STATE} from "./stateConstants";
import { BLOCKOUT_DATE, VOLUNTEER_BLOCKOUT, SAVE_BLOCKOUT, SET_SCHEDULE, VOLUNTEER_BLOCKOUT_REMOVE } from "./actionConstants";


function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case BLOCKOUT_DATE:
            return {...state, currentDate: action.payload.currentDate};
        case VOLUNTEER_BLOCKOUT: {
            state.volunteersBlockoutStillAvail.splice(state.volunteersBlockoutStillAvail.indexOf(action.payload.volunteersBlockout),1);
            return {...state, volunteersBlockout: [...state.volunteersBlockout, action.payload.volunteersBlockout]};
        }
        case VOLUNTEER_BLOCKOUT_REMOVE: {
            state.volunteersBlockout.splice(state.volunteersBlockout.indexOf(action.payload.volunteersBlockout),1);
            return {...state, volunteersBlockoutStillAvail:[...state.volunteersBlockoutStillAvail, action.payload.volunteersBlockout]};
        }
        case SAVE_BLOCKOUT:
            {
                if(action.payload.blocked.date) {
                let tmp = state.blockout
                tmp[action.payload.blocked.date] = action.payload.blocked.volunteers
                return {...state, blockout: tmp, volunteersBlockout: [], currentDate: '', volunteersBlockoutStillAvail: ['Thomas','Kevin','Shebna','Maura','Nate','Anuj','Satish', 'Michael','Jacob','PT','Sam']};
                } else {
                    return state;
                }
            }
            
        case SET_SCHEDULE:
            return {...state, schedule: action.payload.schedule, scheduleCreated: true};
        default:
            return state;
    }
}

export default createStore(rootReducer);