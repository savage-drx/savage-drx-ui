import React from 'react'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useLocation, useRouteMatch} from 'react-router-dom'

import {logOut} from "../utils/auth";
import {escape} from "html-escaper";
import {Dropdown, Icon, Menu, Sticky} from 'semantic-ui-react'
import {ROUTES} from "../utils/constants";

import './scss/styles-navigation.scss';
import {hasRole} from "../utils";


const Navigation = () => {
    const history = useHistory();
    const auth = useSelector((state: any) => state.authReducer, shallowEqual);

    const dispatch = useDispatch();
    const location = useLocation();

    const routeHomeWithPage = useRouteMatch(ROUTES.homeWithPage);
    const isHomePath = Boolean(location.pathname === ROUTES.root || routeHomeWithPage)

    const routeGameHistoryStats = useRouteMatch(ROUTES.historyTimestampTab);
    const isGameHistoryStatsPath = Boolean(location.pathname === ROUTES.history || routeGameHistoryStats)

    const routeLadderHistorical = useRouteMatch(ROUTES.ladderWeekTab);
    const routeLadderLive = useRouteMatch(ROUTES.ladderLiveTab);
    const isLadderPath = Boolean(location.pathname === ROUTES.ladder || routeLadderHistorical || routeLadderLive)

    const routePlayer = useRouteMatch(ROUTES.player);
    const routePlayerWeekly = useRouteMatch(ROUTES.playerWeekly);
    const isPlayerPath = Boolean(routePlayer || routePlayerWeekly)

    const routeStatsUid = useRouteMatch(ROUTES.searchStatsUid);
    const routeStatsName = useRouteMatch(ROUTES.searchStatsName);
    const isStatsPath = Boolean(location.pathname === ROUTES.stats || routeStatsUid || routeStatsName || isPlayerPath)

    const isOnlinePath = Boolean(location.pathname === ROUTES.online)
    const isServerPath = Boolean(location.pathname === ROUTES.servers)
    const isDownloadsPath = Boolean(location.pathname === ROUTES.downloads)
    const isAboutPath = Boolean(location.pathname === ROUTES.about)

    const activeColor = 'orange'
    const inactiveColor = 'grey'

    return <Sticky className={'csp-navigation'}>
        <Menu inverted size={'mini'} borderless className={'csp-menu'} fixed={"top"}>
            <div className={"menu-placeholder-large"}/>
            <Menu.Item
                name='home'
                as={Link}
                to={ROUTES.root}
                position={"right"}
                color={isHomePath ? activeColor : inactiveColor}
                active={isHomePath}>
                <Icon name='home'/>
                Home
            </Menu.Item>
            <Menu.Item
                name='online'
                as={Link}
                to={ROUTES.online}
                color={isOnlinePath ? activeColor : inactiveColor}
                active={isOnlinePath}>
                <Icon name='signal'/>
                Online
            </Menu.Item>
            <Menu.Item
                name='history'
                as={Link}
                to={ROUTES.history}
                color={isGameHistoryStatsPath ? activeColor : inactiveColor}
                active={isGameHistoryStatsPath}>
                <Icon name='history'/>
                History
            </Menu.Item>
            <Menu.Item
                name='ladder'
                as={Link}
                to={ROUTES.ladder}
                color={isLadderPath ? activeColor : inactiveColor}
                active={isLadderPath}>
                <Icon name='trophy'/>
                Ladder
            </Menu.Item>
            <Menu.Item
                name='stats'
                as={Link}
                to={ROUTES.stats}
                color={isStatsPath ? activeColor : inactiveColor}
                active={isStatsPath}>
                <Icon name='user'/>
                Stats
            </Menu.Item>
            <Menu.Item
                name='server'
                as={Link}
                to={ROUTES.servers}
                color={null ? activeColor : inactiveColor}
                active={isServerPath}>
                <Icon name='server'/>
                Servers
            </Menu.Item>
            <Menu.Item
                name='downloads'
                as={Link}
                to={ROUTES.downloads}
                color={null ? activeColor : inactiveColor}
                active={isDownloadsPath}>
                <Icon name='gamepad'/>
                Downloads
            </Menu.Item>
            <Menu.Item
                name='about'
                as={Link}
                to={ROUTES.about}
                position={"left"}
                color={null ? activeColor : inactiveColor}
                active={isAboutPath}>
                <Icon name='hashtag'/>
                About
            </Menu.Item>

            <div className={"menu-placeholder-small"} hidden={auth.isLoggedIn}>
                <Menu.Item
                    name='login'
                    as={Link}
                    to={ROUTES.login}
                    position={"left"}
                    active={false}>
                    <Icon name='sign-in'/>
                    Log in
                </Menu.Item>
            </div>
            <div className={"menu-placeholder-small"} hidden={auth.isLoggedIn}>
                <Menu.Item
                    name='registration'
                    as={Link}
                    to={ROUTES.registration}
                    position={"left"}
                    active={false}>
                    <Icon name='globe'/>
                    Sign up
                </Menu.Item>
            </div>

            <div className={"menu-placeholder-large"} hidden={!auth.isLoggedIn}>
                <Dropdown item
                          icon={"user yellow"}
                          text={auth?.token?.name ? escape(auth.token.name) : 'User'}
                          floating
                          compact
                          basic
                          className={"logged-in-dropdown"}>
                    <Dropdown.Menu direction={"left"}>
                        <Dropdown.Item
                            as={Link}
                            to={ROUTES.accountSettings}
                            icon={'cog'}
                            text={'Settings'}
                        />
                        {
                            hasRole(auth.token, 'CAN_MANAGE_SERVER')
                                ? <Dropdown.Item
                                    hidden={true}
                                    key={'accountServers'}
                                    icon={'server'}
                                    text={'Your servers'}
                                    as={Link}
                                    to={ROUTES.setupServers}
                                />
                                : null
                        }
                        <Dropdown.Item icon={'sign-out'} text={'Log out'} onClick={() => {
                            logOut(dispatch, history)
                        }}/>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Menu>
    </Sticky>
}

export default Navigation;