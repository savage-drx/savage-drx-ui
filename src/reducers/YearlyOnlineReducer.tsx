import {YearlySnapshot} from "../types";

const initialState = {
    nl: {
        timestamp: 0,
        ttl: 0,
        data: Array<YearlySnapshot>(),
    },
    us: {
        timestamp: 0,
        ttl: 0,
        data: Array<YearlySnapshot>(),
    },
}

export const yearlyOnlineReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_YEARLY_ONLINE':
            return {...state, ...action.payload}
        default:
            return state;
    }
}