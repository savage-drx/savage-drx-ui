import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {useOnlineActivity} from "./useOnlineActivity";
import {Segment} from "semantic-ui-react";
import {MONTHLY_CHART_TTL_SECONDS} from "../utils/constants";
import {createTimeZoneFormatter} from "../utils";

import './scss/styles-chart-with-members.scss';

export const MonthlyChart = ({tz}: { tz: string }) => {

    const {chartData, serverTimezone} = useOnlineActivity(
        'MONTH', tz,
        {
            ttl: MONTHLY_CHART_TTL_SECONDS,
            dispatchType: 'SET_MONTHLY_ONLINE',
            cacheSelector: (state: any) => state.monthlyOnlineReducer
        }
    );

    const displayTimezone = serverTimezone || tz;

    const formatLabel = createTimeZoneFormatter('MONTH', displayTimezone);

    const options = {
        chart: {
            type: 'column',
            zoomType: 'x',
            height: '350px'
        },
        mapNavigation: {
            enableMouseWheelZoom: true
        },
        xAxis: {
            type: "datetime",
            scrollbar: {enabled: true},
            labels: {
                formatter: (f: any) => formatLabel(f.value),
                rotation: -45
            },
        },
        yAxis: {
            title: {enabled: true, text: 'Activity'}
        },
        title: {text: 'Month'},
        series: [{
            data: chartData,
            name: displayTimezone,
            colors: ['#3d97b7'],
            colorByPoint: true,
        }],
        credits: {enabled: false},
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {enabled: true}
            }
        }
    };

    return <div className={'chart-with-members-wrapper'}>
        <Segment className={"chart-with-members-wrapper-segment"}>
            <div className={"chart-with-members-highcharts-div"}>
                <HighchartsReact highcharts={Highcharts} options={options} className={'chart-with-members-highcharts'}/>
            </div>
        </Segment>
    </div>
};
