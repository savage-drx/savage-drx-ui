import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {useOnlineActivity} from "./useOnlineActivity";
import {Label, Segment} from "semantic-ui-react";
import {CLAN_ICON_URL, WEEKLY_CHART_TTL_SECONDS} from "../utils/constants";
import {createTimeZoneFormatter} from "../utils";

import './scss/styles-chart-with-members.scss';

export const WeeklyChartWithMembers = ({tz}: { tz: string }) => {

    const {chartData, serverTimezone, total, activeUsers} = useOnlineActivity(
        'WEEK', tz,
        {
            ttl: WEEKLY_CHART_TTL_SECONDS,
            dispatchType: 'SET_WEEKLY_ONLINE',
            cacheSelector: (state: any) => state.weeklyOnlineReducer
        }
    );

    const displayTimezone = serverTimezone || tz;

    const formatLabel = createTimeZoneFormatter('WEEK', displayTimezone);

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
        title: {text: 'Week'},
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

    const getMembers = () => {
        if (!activeUsers || activeUsers.length === 0) {
            return null;
        }

        return <div className={"chart-with-members"}>
            <br/>
            {
                activeUsers.map((p, index) => (
                    <Label as='a' image href={'/player/' + p.user_id} key={"weekly-" + index}>
                        {
                            p.clan_id
                                ? <img src={CLAN_ICON_URL + p.clan_id + '.png'} alt={''}/>
                                : null
                        }
                        {p.display_name}
                    </Label>
                ))
            }
        </div>
    };

    return <div className={'chart-with-members-wrapper'}>
        <Segment className={"chart-with-members-wrapper-segment"}>
            <Label className={'csp-label'} size={"small"} attached={"top right"}>
                total<Label.Detail content={total}/>
            </Label>

            <div className={"chart-with-members-highcharts-div"}>
                <HighchartsReact highcharts={Highcharts} options={options} className={'chart-with-members-highcharts'}/>
            </div>

            {total > 0 ? getMembers() : null}
        </Segment>
    </div>
};
