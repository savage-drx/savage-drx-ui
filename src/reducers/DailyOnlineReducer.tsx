import {Activity} from "../types";

const initialState = {
    timestamp: 0,
    ttl: 0,
    data: {} as Activity
}

export const dailyOnlineReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_DAILY_ONLINE':
            return {...state, ...action.payload}
        default:
            return state;
    }
}