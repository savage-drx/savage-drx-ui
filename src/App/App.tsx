import React, {useEffect} from 'react'
import {Route, Switch} from "react-router-dom"
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import Navigation from "../Navigation"
import Player from "../Player"
import Stats from "../Stats"
import Server from '../Server'
import Client from '../Client'
import About from '../About'
import HomePage from "../HomePage/HomePage";
import {GameHistoryStats, GamesHistory} from "../GamesHistory"
import {Ladder, LadderHomePage} from "../Ladder"
import {updateAuthState} from "../utils/auth";
import {ROUTES} from "../utils/constants"

import './scss/styles-generic.scss'


const App = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.authReducer, shallowEqual);

    useEffect(() => {
        updateAuthState(dispatch, auth)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={'app-container'} style={{backgroundImage: `url('/images/main-background.jpg')`}}>
        <Navigation/>
        <Switch>
            <Route exact path={ROUTES.root} component={HomePage}/>
            <Route exact path={ROUTES.homeWithPage} component={HomePage}/>
            <Route exact path={ROUTES.login} component={HomePage}/>
            <Route exact path={ROUTES.registration} component={HomePage}/>
            <Route exact path={ROUTES.confirmEmail} component={HomePage}/>
            <Route exact path={ROUTES.registrationFinished} component={HomePage}/>
            <Route exact path={ROUTES.server} component={HomePage}/>
            <Route exact path={ROUTES.online} component={HomePage}/>
            <Route exact path={ROUTES.history} component={GamesHistory}/>
            <Route exact path={ROUTES.historyTimestampTab} component={GameHistoryStats}/>
            <Route exact path={ROUTES.ladder} component={LadderHomePage}/>
            <Route exact path={ROUTES.ladderWeekTab} component={Ladder}/>
            <Route exact path={ROUTES.ladderLiveTab} component={Ladder}/>
            <Route exact path={ROUTES.stats} component={Stats}/>
            <Route exact path={ROUTES.searchStatsUid} component={Stats}/>
            <Route exact path={ROUTES.searchStatsName} component={Stats}/>
            <Route exact path={ROUTES.player} component={Player}/>
            <Route exact path={ROUTES.playerWeekly} component={Player}/>
            <Route exact path={ROUTES.servers} component={Server}/>
            <Route exact path={ROUTES.client} component={Client}/>
            <Route exact path={ROUTES.about} component={About}/>
            <Route exact path={ROUTES.accountSettings} component={HomePage}/>
            <Route exact path={ROUTES.setupServers} component={HomePage}/>
        </Switch>
    </div>
}

export default App