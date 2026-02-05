import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Container, Grid, Icon, Menu} from "semantic-ui-react";

import {getGameResultByTimestamp} from "../requests";
import {StatsInfoTable} from "./GameHistoryStatsInfo";
import {WeaponStats} from "./WeaponStats";
import {GameHistoryStatsResult} from "./GameHistoryStatsResult";
import {getCurrentTimeSeconds, isCacheOutdated} from "../utils";
import {GAME_HISTORY_TTL_SECONDS} from "../utils/constants";
import {EGRAccuracy, ExtendedGameResult} from "../types";

import './scss/styles-game-history-stats.scss';


export const GameHistoryStats = () => {
    const params: any = useParams();
    const timestamp = params?.timestamp;
    const dispatch = useDispatch()
    const gameStatsCache = useSelector((state: any) => state.gameHistoryStatsReducer[timestamp], shallowEqual);
    const [gameResult, setGameResult] = useState<ExtendedGameResult>();
    const [activeMenu, setActiveMenu] = useState(params?.tab);

    useEffect(() => {
        if (isCacheOutdated(gameStatsCache?.ttl, gameStatsCache?.timestamp)) {
            getGameResultByTimestamp(timestamp).then(res => {

                if (res.data.length) {
                    const result: ExtendedGameResult = res.data[0];

                    interface APMCollection {
                        [key: string]: {
                            [key: string]: EGRAccuracy
                        }
                    }

                    const playersMap: any = {};
                    const accuracyPlayerMap: APMCollection = {};

                    result.players.forEach((p) => {
                        playersMap[p.name] = p;
                        p.accuracy.forEach((accuracy) => {
                            const an = accuracyPlayerMap[accuracy.name] || {};
                            an[p.name] = accuracy;
                            accuracyPlayerMap[accuracy.name] = an;
                        })
                    })

                    Object.values(result.game.teams).forEach((team) => {
                        team.players.forEach((player) => {
                            player.p = playersMap[player.name]
                        })
                    })

                    result.p_accuracies = result.players.map((p) => {
                        const acPlayer: any = {
                            name: p.name,
                            clan_id: p.clan_id,
                            uid: p.uid,
                            accuracies: []
                        };

                        for (const [accuracyName, players] of Object.entries(accuracyPlayerMap)) {
                            acPlayer.accuracies.push({
                                name: accuracyName,
                                value: players[p.name] && players[p.name].shots > 0 ? players[p.name] : null
                            })
                        }
                        return acPlayer;
                    })

                    setGameResult(result);
                    dispatch({
                        type: 'SET_GAME_HISTORY_STATS', payload:
                            {
                                [timestamp]: {
                                    timestamp: getCurrentTimeSeconds(),
                                    ttl: GAME_HISTORY_TTL_SECONDS,
                                    data: result
                                }
                            }
                    });
                }
            })
        } else {
            setGameResult(gameStatsCache.data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={'game-history-stats'}>
        <div className={'grid-wrapper'}>
            <Grid columns='equal'>
                <Grid.Column className={'grid-column'}>
                    {gameResult ? GameHistoryStatsResult(gameResult) : null}

                    <Container className={'history-stats-menu-container'}>
                        <Menu inverted size={"mini"} fluid widths={2} className={'stats-menu'}>
                            <Menu.Item
                                className={'menu-item-stats'}
                                name='Stats'
                                as={Link}
                                to={'/history/' + timestamp + '/stats'}
                                active={activeMenu === 'stats'}
                                onClick={() => {
                                    setActiveMenu('stats')
                                }}
                                color={"orange"}
                                position={"right"}>
                                <Icon name='bars'/>
                                Stats
                            </Menu.Item>
                            <Menu.Item
                                className={'menu-item-accuracy'}
                                name='Weapons'
                                as={Link}
                                to={'/history/' + timestamp + '/weapons'}
                                active={activeMenu === 'weapons'}
                                onClick={() => {
                                    setActiveMenu('weapons')
                                }}
                                color={"orange"}
                                position={"left"}>
                                <Icon name='target'/>
                                Weapons
                            </Menu.Item>
                        </Menu>
                    </Container>

                    {activeMenu === 'stats'
                        ? gameResult ? drawInfo(gameResult) : null
                        : gameResult?.p_accuracies?.length ? drawAccuracy(gameResult) : null
                    }
                </Grid.Column>
            </Grid>
        </div>
    </div>
}

const drawInfo = (gameResult: ExtendedGameResult) => {
    return <div>
        {gameResult.game.teams['1'].players.length ? StatsInfoTable(gameResult.game.teams['1']) : null}
        {gameResult.game.teams['2'].players.length ? StatsInfoTable(gameResult.game.teams['2']) : null}
        {gameResult.game.teams['3'] ? StatsInfoTable(gameResult.game.teams['3']) : null}
        {gameResult.game.teams['4'] ? StatsInfoTable(gameResult.game.teams['4']) : null}
        {gameResult.game.teams['0'] ? StatsInfoTable(gameResult.game.teams['0']) : null}
    </div>
}

const drawAccuracy = (gameResult: ExtendedGameResult) => {
    return <div>
        <WeaponStats players={gameResult.p_accuracies}/>
    </div>
}