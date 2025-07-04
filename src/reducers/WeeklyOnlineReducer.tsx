import {WeeklySnapshot} from "../types";

const initialState = {
    nl: {
        timestamp: 0,
        ttl: 0,
        data: Array<WeeklySnapshot>(),
    },
    us: {
        timestamp: 0,
        ttl: 0,
        data: Array<WeeklySnapshot>(),
    },
}

export const weeklyOnlineReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_WEEKLY_ONLINE':
            return {...state, ...action.payload}
        default:
            return state;
    }
}