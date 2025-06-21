import {MonthlySnapshot} from "../types";

const initialState = {
    nl: {
        timestamp: 0,
        ttl: 0,
        data: Array<MonthlySnapshot>(),
    },
    us: {
        timestamp: 0,
        ttl: 0,
        data: Array<MonthlySnapshot>(),
    },
}

export const monthlyOnlineReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_MONTHLY_ONLINE':
            return {...state, ...action.payload}
        default:
            return state;
    }
}