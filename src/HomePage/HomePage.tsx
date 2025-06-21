import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom'
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {Container, Grid, Pagination, Segment} from "semantic-ui-react"

import Account from "../Account/Account";
import SetupServer from "../Account/SetupServer";
import Discord from "../Discord"
import Login from "../Auth/Login";
import Patreon from '../Patreon'
import Registration from "../Auth/Registration";
import LiveServer from "../Live/LiveServer";
import {LivePanel} from "../Live"
import {getNewsByPage} from "../requests"
import {LadderNews, LiveLadderWidget} from "../Ladder"
import {useWindowDimensions} from "../utils"
import {ROUTES} from "../utils/constants"
import {HistoricalOnline} from "../Online";

import './scss/styles-homepage.scss'


const HomePage = () => {
    const history = useHistory();
    const location = useLocation();
    const params: any = useParams();
    const dispatch = useDispatch();
    const newsCache = useSelector((state: any) => state.newsPageReducer, shallowEqual);
    const [page, setPage] = useState(params?.p ? params.p : 1);
    const [pages, setPages] = useState(0);
    const [news, setNews] = useState([]);
    const maxElementsOnPage = 3;
    const {width} = useWindowDimensions();

    const routeHomeWithPage = useRouteMatch(ROUTES.homeWithPage);
    const isHomePath = Boolean(location.pathname === ROUTES.root || routeHomeWithPage)
    const isServerPath = Boolean(useRouteMatch(ROUTES.server))
    const isLoginPath = Boolean(useRouteMatch(ROUTES.login))
    const isRegistrationPath = Boolean(useRouteMatch(ROUTES.registration)?.isExact)
    const isEmailConfirmationPath = Boolean(useRouteMatch(ROUTES.confirmEmail)?.isExact)
    const isRegistrationFinishedPath = Boolean(useRouteMatch(ROUTES.registrationFinished)?.isExact)
    const isAccountSettingsPath = Boolean(useRouteMatch(ROUTES.accountSettings)?.isExact)
    const isSetupServersPath = Boolean(useRouteMatch(ROUTES.setupServers)?.isExact)
    const isOnlinePath = Boolean(useRouteMatch(ROUTES.online)?.isExact)

    useEffect(() => {
        if (isHomePath || page > 1) {
            if (!newsCache[page]) {
                getNewsByPage(page).then(res => {
                    setNews(res.data)
                    setPages(res.headers.pages)
                    dispatch({
                        type: 'ADD_NEWS', payload:
                            {
                                [page]: res.data,
                                pages: res.headers.pages
                            }
                    });
                });
            } else {
                setNews(newsCache[page])
                setPages(newsCache.pages)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, isHomePath]);

    const getLadderNews = () => {
        return news.map((ns: any, i) => {
            return <Segment key={i} textAlign='center' className={'base-segment'}>
                {ns.is_weekly_ladder ?
                    <LadderNews body={ns.body} week_name={ns.week_name}/> : null}
            </Segment>
        })
    }

    const getNewsPagination = () => {
        return <Container textAlign={"center"} className={'base-pagination'}>
            <Pagination
                inverted
                defaultActivePage={page}
                totalPages={Math.ceil(pages / maxElementsOnPage)}
                onPageChange={(e, {activePage}) => {
                    setPage(Number(activePage));
                    if (activePage && activePage > 1) {
                        history.push("/page/" + activePage)
                    } else {
                        history.push(ROUTES.root)
                    }
                }}
            />
        </Container>
    }

    return <div className={'home-page'}>
        {
            width < 1200
                ? <div className={'media-small-screen'}>
                    <LivePanel background={'/images/beast_unit_predator.jpg'} serverProp={params?.server}/>
                    <br/>
                    <Discord/>
                </div>
                : <div>
                    <div className={'media-large-screen'}>
                        <Grid columns='equal'>
                            <Grid.Column>
                                <Container className={'base-align-right'}>
                                    <Discord/>
                                    <br/>
                                    <LiveLadderWidget/>
                                    <br/>
                                    <Patreon/>
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Container className={'base-container'}>
                                    {isHomePath ? getLadderNews() : null}
                                    {isHomePath ? getNewsPagination() : null}
                                    {isServerPath ? <LiveServer address={params?.server}/> : null}
                                    {isLoginPath ? <Login/> : null}
                                    {isRegistrationPath ? <Registration/> : null}
                                    {isEmailConfirmationPath ? <Registration/> : null}
                                    {isRegistrationFinishedPath ? <Registration/> : null}
                                    {isAccountSettingsPath ? <Account/> : null}
                                    {isSetupServersPath ? <SetupServer/> : null}
                                    {isOnlinePath ? <HistoricalOnline/> : null}
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container className={'base'}>
                                    <LivePanel background={'/images/beast_unit_predator.jpg'} serverProp={params?.server}/>
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </div>
                    {/*<Footer/>*/}
                </div>
        }
    </div>
}

export default HomePage