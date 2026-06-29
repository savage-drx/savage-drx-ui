import React, {useState} from 'react'

import BaseContainer from "../HomePage/BaseContainer";
import {DailyChartWithMembers} from "./DailyChartWithMembers";
import {WeeklyChartWithMembers} from "./WeeklyChartWithMembers";
import {MonthlyChart} from "./MonthlyChart";
import {YearlyChart} from "./YearlyChart";
import {TimezoneSelector} from "./TimezoneSelector";
import {getMyTimezoneIANA} from "../utils";

import './scss/styles-historical-online.scss';

export const HistoricalOnline = () => {

    const [tz, setTz] = useState(getMyTimezoneIANA());

    const getForm = () => {
        return <div className={'online-wrapper'}>
            <TimezoneSelector
                timezone={tz}
                onTimezoneChange={setTz}
            />
            <DailyChartWithMembers tz={tz}/>
            <br/>
            <br/>
            <WeeklyChartWithMembers tz={tz}/>
            <br/>
            <MonthlyChart tz={tz}/>
            <br/>
            <YearlyChart tz={tz}/>
        </div>
    }

    return <BaseContainer header={"Online"} body={getForm()}/>
}
