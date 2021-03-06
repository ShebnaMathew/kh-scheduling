import { BLOCKOUT_DATE, VOLUNTEER_BLOCKOUT, SAVE_BLOCKOUT, SET_SCHEDULE, VOLUNTEER_BLOCKOUT_REMOVE } from "./actionConstants";

export const setCurrentDate = (date) => ({
    type: BLOCKOUT_DATE,
    payload: {
        currentDate: date
    }
});

export const addVolunteerBlockOut = (vol) => ({
    type: VOLUNTEER_BLOCKOUT,
    payload: {
        volunteersBlockout: vol
    }
})

export const removeVolunteerBlockOut = (vol) => ({
    type: VOLUNTEER_BLOCKOUT_REMOVE,
    payload: {
        volunteersBlockout: vol
    }
})

export const setBlockoutsForCurrentDate = (blocked) => ({
    type: SAVE_BLOCKOUT,
    payload: {
        blocked: blocked
    }
});

export const setSchedule = (sched) => ({
    type: SET_SCHEDULE,
    payload: {
        schedule: sched
    }
});

