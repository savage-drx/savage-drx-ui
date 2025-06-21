import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {getOnline} from "../requests";
import {Label, Segment} from "semantic-ui-react";
import {
    convertDailyTSCodeToDateTime,
    getCurrentTimeSeconds,
    getMyTimeZone,
    isCacheOutdated
} from "../utils";
import {CLAN_ICON_URL, WEEKLY_CHART_TTL_SECONDS} from "../utils/constants";
import {Activity} from "../types";

import './scss/styles-chart-with-members.scss';


export const WeeklyChartWithMembers = () => {

    const dispatch = useDispatch()
    const cache = useSelector((state: any) => state.weeklyOnlineReducer, shallowEqual);
    const [activity, setActivity] = useState<Activity>();
    const [chartData, setChartData] = useState<Array<any>>();
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (isCacheOutdated(cache.ttl, cache.timestamp)) {
            getOnline('WEEK').then(res => {
                setActivity(res.data);
                dispatch({
                    type: 'SET_WEEKLY_ONLINE', payload:
                        {
                            timestamp: getCurrentTimeSeconds(),
                            ttl: WEEKLY_CHART_TTL_SECONDS,
                            data: res.data
                        }
                });
            })
        } else {
            setActivity(cache.data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

            if (cache.data?.activities) {
                setTotal(cache.data?.activities.length)
            }

            setChartData(result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    return Highcharts.dateFormat('%a %d', f.value);
                    // return Highcharts.dateFormat('%a %d - %H:00', f.value);
                },
                rotation: -45
            },
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Activity'
            },
            // gridLineColor: '#9c9c9c',
        },
        title: {
            text: 'Week'

        },
        series: [
            {
                // type: 'area',
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

    const getMembers = () => {
        if (activity?.activities?.length === 0) {
            return null;
        }

        return <div className={"chart-with-members"}>
            <br/>
            {
                activity?.activities?.map((p, index) => (
                    <Label as='a' image href={'/player/' + p.userId} key={"weekly-" + index}>
                        {
                            p.clanId
                                ? <img src={CLAN_ICON_URL + p.clanId + '.png'} alt={''}/>
                                : null
                        }
                        {
                            p.displayName
                        }
                    </Label>
                ))
            }
        </div>
    }

    return <div className={'chart-with-members-wrapper'}>
        <Segment className={"chart-with-members-wrapper-segment"}>
            <Label className={'csp-label'} size={"small"} attached={"top right"}>
                total<Label.Detail content={total}/>
            </Label>

            <div className={"chart-with-members-highcharts-div"}>
                <HighchartsReact highcharts={Highcharts} options={options} className={'chart-with-members-highcharts'}/>
            </div>

            {
                total > 0
                    ? getMembers()
                    : null
            }

        </Segment>
    </div>
}