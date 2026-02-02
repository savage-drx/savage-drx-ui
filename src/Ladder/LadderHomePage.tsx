import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import {Button, Grid, Header, Icon, Segment, Select, Table} from "semantic-ui-react"

import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {getLadderWeeks} from "../requests"
import {
    getCurrentTimeSeconds,
    getCurrentWeekCode,
    getEndDateOfISOWeek,
    getFormattedDate,
    getStartDateOfISOWeek,
    isCacheOutdated
} from "../utils"
import {WEEKLY_LADDERS_LIST_TTL_SECONDS} from "../utils/constants"

import './scss/styles-ladder-home-page.scss'


export const LadderHomePage = () => {
    const dispatch = useDispatch()
    const weeklyLaddersListCache = useSelector((state: any) => state.weeklyLaddersListReducer, shallowEqual);
    const current_year_week = getCurrentWeekCode()
    const current_year = new Date().getFullYear()
    const current_week = current_year_week.split('_')[1]
    const [weeks, setWeeks] = useState([])
    const [selectedYear, setSelectedYear] = useState(current_year)

    type YearOption = { key: number; value: number; text: number };

    function buildYears(startYear = 2021): YearOption[] {
        const currentYear = new Date().getFullYear();

        return Array.from(
            { length: currentYear - startYear + 1 },
            (_, i) => {
                const year = startYear + i;
                return { key: year, value: year, text: year };
            }
        );
    }

    // 2021 → current year
    const years = buildYears();

    // Example
    // const yearsFrom2023 = buildYears(2023);


    useEffect(() => {
        if (isCacheOutdated(weeklyLaddersListCache?.ttl, weeklyLaddersListCache?.timestamp)
            || !weeklyLaddersListCache[selectedYear]) {
            getLadderWeeks(selectedYear).then(res => {
                setWeeks(res.data.sort((a: any, b: any) => {
                    const week_a = Number(a.split('_')[1])
                    const week_b = Number(b.split('_')[1])
                    return week_b - week_a
                }));
                dispatch({
                    type: 'SET_WEEKLY_LADDERS_LIST',
                    payload:
                        {
                            timestamp: getCurrentTimeSeconds(),
                            ttl: WEEKLY_LADDERS_LIST_TTL_SECONDS,
                            [selectedYear]: res.data
                        }
                });
            })
        } else {
            setWeeks(weeklyLaddersListCache[selectedYear]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedYear]);

    return <div className={'weekly-ladder-home-page'}>
        <div className={'weekly-grid-wrapper'}>
            <Grid columns='equal'>
                <Grid.Row columns={1} className={'grid-row'}>
                    <Grid.Column>
                        <Segment className={'weekly-segment'} textAlign={"center"}>
                            <Header as={'h5'} inverted content={"Weekly Ladders"} className={'weekly-ladder-header'}/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column className={'grid-column-ladder'}>
                        <Segment className={'weekly-segment'} textAlign={"center"}>
                            <Header as={'h5'} inverted content={"Live!"} className={'header-live'}/>
                            <Table celled inverted compact size={"small"} className={'weekly-table'}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell collapsing textAlign={"center"} content={'Week'}/>
                                        <Table.HeaderCell content={'From'}/>
                                        <Table.HeaderCell content={'To'}/>
                                        <Table.HeaderCell/>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell collapsing textAlign={"center"}>{current_week}</Table.Cell>
                                        <Table.Cell>{getFormattedDate(getStartDateOfISOWeek(Number(current_week), current_year))}</Table.Cell>
                                        <Table.Cell>{getFormattedDate(getEndDateOfISOWeek(Number(current_week), current_year))}</Table.Cell>
                                        <Table.Cell textAlign={"center"} collapsing>
                                            <Button
                                                primary
                                                size={"small"}
                                                as={Link}
                                                to={'/ladder/live/top'}>
                                                <Icon name='bars' size={"small"}/>
                                                open
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className={'grid-column-ladder'}>
                        <Segment className={'weekly-segment'} textAlign={"center"}>
                            <Header as={'h5'} inverted content={"History"} className={'header-history'}/>
                            <Table celled selectable inverted compact size={"small"} className={'weekly-table'}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell collapsing textAlign={"center"}>Week</Table.HeaderCell>
                                        <Table.HeaderCell>From</Table.HeaderCell>
                                        <Table.HeaderCell>To</Table.HeaderCell>
                                        <Table.HeaderCell textAlign={"right"} className={'th-select'}>
                                            <Select
                                                className={'weekly-dropdown'}
                                                placeholder='Select year'
                                                defaultValue={selectedYear}
                                                options={years}
                                                onChange={(e, p) => {
                                                    setSelectedYear(Number(p.value))
                                                }}
                                            />
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {weeks.map((w: string, index) => {
                                        const s = w.split('_')
                                        const year = Number(s[0])
                                        const week = Number(s[1])
                                        const from = getFormattedDate(getStartDateOfISOWeek(week, year));
                                        const to = getFormattedDate(getEndDateOfISOWeek(week, year));
                                        return <Table.Row key={index}>
                                            <Table.Cell collapsing textAlign={"center"}>{week}</Table.Cell>
                                            <Table.Cell>{from}</Table.Cell>
                                            <Table.Cell>{to}</Table.Cell>
                                            <Table.Cell textAlign={"right"} collapsing>
                                                <Button
                                                    primary
                                                    size={"small"}
                                                    as={Link}
                                                    to={'/ladder/week/' + w + '/top'}>
                                                    <Icon name='bars' size={"small"}/>
                                                    open
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    </div>
}