import React from 'react'

import BaseContainer from "../HomePage/BaseContainer";
import {DailyChartWithMembers} from "./DailyChartWithMembers";
import {WeeklyChartWithMembers} from "./WeeklyChartWithMembers";
import {MonthlyChart} from "./MonthlyChart";


import './scss/styles-historical-online.scss';
import {YearlyChart} from "./YearlyChart";


export const HistoricalOnline = () => {

    const getForm = () => {
        return <div className={'online-wrapper'}>
            <DailyChartWithMembers/>
            <br/>
            <br/>
            <WeeklyChartWithMembers/>
            <br/>
            <MonthlyChart/>
            <br/>
            <YearlyChart/>
        </div>
    }

    return <BaseContainer header={"Online"} body={getForm()}/>
}