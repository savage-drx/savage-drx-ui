import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {getOnline} from "../requests";
import {Segment} from "semantic-ui-react";
import {convertDailyTSCodeToDateTime, getCurrentTimeSeconds, getMyTimeZone, isCacheOutdated} from "../utils";
import {MONTHLY_CHART_TTL_SECONDS} from "../utils/constants";
import {Activity} from "../types";

import './scss/styles-chart-with-members.scss';


export const MonthlyChart = () => {

    const dispatch = useDispatch()
    const cache = useSelector((state: any) => state.monthlyOnlineReducer, shallowEqual);
    const [activity, setActivity] = useState<Activity>();
    const [chartData, setChartData] = useState<Array<any>>();

    useEffect(() => {
        if (isCacheOutdated(cache.ttl, cache.timestamp)) {
            getOnline('MONTH').then(res => {
                setActivity(res.data);
                dispatch({
                    type: 'SET_MONTHLY_ONLINE', payload:
                        {
                            timestamp: getCurrentTimeSeconds(),
                            ttl: MONTHLY_CHART_TTL_SECONDS,
                            data: res.data
                        }
                });
            })
        } else {
            setActivity(cache.data)
        }
    });

    useEffect(() => {
        if (activity) {
            const result: any = [];
            if (activity.activity_map) {
                Object.keys(activity.activity_map).forEach((key) => {
                    if (activity.activity_map) {
                        result.push(
                            [
                                convertDailyTSCodeToDateTime(key),
                                activity.activity_map[key]
                            ]
                        )
                    }
                });
            }

            setChartData(result);
        }
    }, [activity]);

    const options = {
        chart: {
            type: 'column',
            zoomType: 'x',
            height: '350px',
            // backgroundColor: '#D5D0CF'
        },
        mapNavigation: {
            enableMouseWheelZoom: true
        },
        xAxis: {
            type: "datetime",

            scrollbar: {
                enabled: true
            },

            labels: {
                formatter: (f: any) => {
                    return Highcharts.dateFormat('%b %e', f.value);
                },
                rotation: -45
            },
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Activity'
            }
        },
        title: {
            text: 'Month'

        },
        series: [
            {
                data: chartData,
                name: `${getMyTimeZone()}`,
                colors: [
                    '#3d97b7'
                ],
                colorByPoint: true,
            }
        ],
        credits: {
            enabled: false
        },

        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
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
}