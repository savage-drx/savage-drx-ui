import React, {useEffect, useState} from 'react'
import {Checkbox, Grid, Header, Icon, Image, Label, Table} from "semantic-ui-react";

import BaseContainer from "../HomePage/BaseContainer";
import {getA2sServerInfo} from "../requests";
import {A2SPlayer, A2SResponse, LiveServerProps, SortedA2SPlayers} from "../types";
import {capitalizeFirstLetter, clearClansAndColors, formatA2SPlayer,} from "../utils";

import './scss/styles-live-server.scss';


const LiveServer = ({address}: LiveServerProps) => {

    const [response, setResponse] = useState<A2SResponse>();
    const [sortedPlayers, setSortedPlayers] = useState<SortedA2SPlayers>()
    const [intervalId, setIntervalId] = useState<any>()
    const [isIconLoading, setIsIconLoading] = useState(false)

    useEffect(() => {
        getA2sServerInfo(address).then(res => {
            setResponse(res.data)
        })
    }, [address]);

    useEffect(() => {
        if (response) {
            setSortedPlayers(sortPlayersByTeams(response))
        }
    }, [response]);

    const getTable = (response: A2SResponse) => {
        return <Table celled singleLine inverted compact size={"small"} textAlign={"center"}>
            <Table.Body>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Address</Table.Cell>
                    <Table.Cell collapsing>{response.info.server_ip}:{response.info.port}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Map</Table.Cell>
                    <Table.Cell collapsing>{response.info.map_name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Player Count</Table.Cell>
                    <Table.Cell collapsing>{response.info.player_count}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Max Players</Table.Cell>
                    <Table.Cell collapsing>{response.info.max_players}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Bot Count</Table.Cell>
                    <Table.Cell collapsing>{response.info.bot_count}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Password</Table.Cell>
                    <Table.Cell
                        collapsing>{capitalizeFirstLetter(String(response.info.password_protected))}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Game Version</Table.Cell>
                    <Table.Cell collapsing>{response.info.version}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan="2" textAlign={"left"}>Game Type</Table.Cell>
                    <Table.Cell collapsing>{response.info.game}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    }

    const getTeamTable = (teamName: string, players: Array<A2SPlayer>) => {
        return <Table celled singleLine compact inverted size={"small"} textAlign={"center"}
                      className={"team-table"}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan="3">{teamName}</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Kills</Table.HeaderCell>
                    <Table.HeaderCell>Deaths</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {players.map((p: A2SPlayer, index: any) => (
                    <Table.Row key={index}>
                        <Table.Cell textAlign={"left"}>
                            {formatA2SPlayer(p)}
                        </Table.Cell>
                        <Table.Cell>{p.score}</Table.Cell>
                        <Table.Cell>{p.deaths}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    }

    const sortPlayersByTeams = (response: A2SResponse) => {
        const result: SortedA2SPlayers = {
            0: Array<A2SPlayer>(),
            1: Array<A2SPlayer>(),
            2: Array<A2SPlayer>(),
            3: Array<A2SPlayer>(),
            4: Array<A2SPlayer>()
        };

        response?.players?.forEach((p) => {
            const team = String(p.team)
            result[team].push(p)
        })

        return result
    }

    const getBody = () => <div className={'div-live-server'}>
        <div className={"refresh-group"}>
            <div>
                <Label className={"refresh-label"}>
                    <Checkbox toggle className={"refresh-checkbox"} onChange={(fe, cp) => {
                        if (cp.checked) {
                            setIntervalId(setInterval(() => {
                                getA2sServerInfo(address).then(res => {
                                    setIsIconLoading(true)
                                    setTimeout(() => {
                                        setIsIconLoading(false)
                                    }, 2000)
                                    setResponse(res.data)
                                })
                            }, 15000))
                        } else {
                            clearInterval(intervalId)
                        }
                    }}/>
                    <br/>
                    <Icon name='refresh' loading={isIconLoading} className={isIconLoading ? "icon-loading" : ""}/>
                    Auto
                </Label>
            </div>
        </div>


        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h3">
                        {clearClansAndColors(response?.info?.server_name)}
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    {response?.info ? getTable(response) : null}
                </Grid.Column>
                <Grid.Column>
                    {response?.info?.map_name
                        ? <Image
                            className={'world-image'}
                            src={process.env.REACT_APP_WORLD_LOCATION + response?.info.map_name + '_overhead.jpg'}
                            size={"medium"}
                            rounded
                            inline/>
                        : null
                    }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
                <Grid.Column>
                    {sortedPlayers ? getTeamTable("Team 1", sortedPlayers["1"]) : null}
                </Grid.Column>
                <Grid.Column>
                    {sortedPlayers ? getTeamTable("Team 2", sortedPlayers["2"]) : null}
                </Grid.Column>
            </Grid.Row>
            {sortedPlayers && (sortedPlayers["3"].length || sortedPlayers["4"].length)
                ? <Grid.Row columns={2}>
                    <Grid.Column>
                        {sortedPlayers && sortedPlayers["3"].length
                            ? getTeamTable("Team 3", sortedPlayers["3"])
                            : null
                        }
                    </Grid.Column>
                    <Grid.Column>
                        {sortedPlayers && sortedPlayers["4"].length
                            ? getTeamTable("Team 4", sortedPlayers["4"])
                            : null
                        }
                    </Grid.Column>
                </Grid.Row>
                : null
            }
            <Grid.Row columns={2}>
                <Grid.Column>
                    {sortedPlayers ? getTeamTable("Spectators", sortedPlayers["0"]) : null}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>

    return <BaseContainer body={getBody()}/>
}

export default LiveServer