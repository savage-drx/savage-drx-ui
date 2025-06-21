import axios from 'axios'
import {
    CreateUpdateServer,
    EmailConfirmationProps,
    EmailTokenRenewProps,
    LoginProps,
    RegistrationProps
} from "../types";
import {LOCAL_STORAGE_TOKEN} from "../utils/constants";

const SERVER_URL = process.env.REACT_APP_API_URL
const J_SERVER = `${SERVER_URL}/metaserver`

// for local testing
// const J_SERVER = `${SERVER_URL}`
// const J_SERVER = `${SERVER_URL}/jserver`


export const getDiscordServerInfo = () => {
    return axios.get(`https://discord.com/api/guilds/511261029838225419/widget.json`)
}

export const getLiveServersInfo = () => {
    return axios.get(`${SERVER_URL}/stats/live`)
}

export const getOnline = (period: string) => {
    return axios.get(`${J_SERVER}/v1/user/activity?period=${period}`)
}

export const getGameResults = (quantity: number) => {
    return axios.get(`${SERVER_URL}/stats/results/${quantity}`)
}

export const getGameResultByTimestamp = (timestamp: number) => {
    return axios.get(`${SERVER_URL}/stats/result/${timestamp}`)
}

export const getNewsByPage = (page: number) => {
    return axios.get(`${SERVER_URL}/news/${page}`)
}

export const getWeeklyLadder = (week_name: string) => {
    return axios.get(`${SERVER_URL}/stats/ladder/${week_name}`)
}

export const getLiveWeeklyLadder = () => {
    return axios.get(`${SERVER_URL}/stats/ladder/live`)
}

export const getSSF = (uid: number) => {
    return axios.get(`${SERVER_URL}/stats/ssf/${uid}`)
}

export const searchSSFByUid = (uid: number) => {
    return axios.get(`${SERVER_URL}/stats/ssf/search/uid/${uid}`)
}

export const searchSSFByName = (nick: string) => {
    return axios.get(`${SERVER_URL}/stats/ssf/search/name/${nick}`)
}

export const getLadderWeeks = (year: number) => {
    return axios.get(`${SERVER_URL}/stats/ladder/weeks/${year}`)
}

export const getA2sServerInfo = (serverAddress: string) => {
    return axios.get(`${SERVER_URL}/stats/server/${serverAddress}`)
}

export const sendLoginRequest = (loginProps: LoginProps) => {
    return axios.post(`${J_SERVER}/v1/oauth2/login`, {},
        {
            auth: {
                username: loginProps.username,
                password: loginProps.password
            },
            headers: {
                'X-Token': loginProps.token,
                'V-Token': loginProps.visitorId
            }
        })
}

export const sendRegistrationRequest = (props: RegistrationProps) => {
    return axios.post(`${J_SERVER}/v1/oauth2/register`, {
        'userName': props.userName,
        'displayName': props.displayName,
        'password': props.password
    }, {
        headers: {
            'X-Token': props.token,
            'V-Token': props.visitorId
        }
    })
}

export const sendCheckDisplayName = (displayName: string) => {
    return axios.get(`${J_SERVER}/v1/oauth2/verify/name`, {params: {name: displayName}})
}

export const sendEmailConfirmationRequest = (props: EmailConfirmationProps) => {
    return axios.post(`${J_SERVER}/v1/oauth2/email/verify`,
        {'mail_token': props.mail_token},
        {
            auth: {
                'username': props.username,
                'password': props.password
            }
        })
}

export const sendRenewEmailRequest = (props: EmailTokenRenewProps) => {
    return axios.post(`${J_SERVER}/v1/oauth2/email/token/renew`,
        {},
        {
            auth: {
                'username': props.username,
                'password': props.password
            }
        })
}

export const getMyServers = () => {
    const cred = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    const config = {
        headers: {Authorization: `Bearer ${cred}`}
    }
    return axios.get(`${J_SERVER}/v1/server/list/my`, config)
}

export const createMyServer = (data: CreateUpdateServer) => {
    const cred = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    const config = {
        headers: {Authorization: `Bearer ${cred}`}
    }
    return axios.post(`${J_SERVER}/v1/server/register`, data, config)
}

export const updateMyServer = (serverId: number, data: CreateUpdateServer) => {
    const cred = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    const config = {
        headers: {Authorization: `Bearer ${cred}`}
    }
    return axios.post(`${J_SERVER}/v1/server/${serverId}/update`, data, config)
}

export const serverGenerateNewCredentials = (serverId: number) => {
    const cred = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    const config = {
        headers: {Authorization: `Bearer ${cred}`}
    }
    return axios.get(`${J_SERVER}/v1/server/${serverId}/generate-new-credentials`, config)
}

export const deleteMyServer = (serverId: number) => {
    const cred = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    const config = {
        headers: {Authorization: `Bearer ${cred}`}
    }
    return axios.delete(`${J_SERVER}/v1/server/${serverId}`, config)
}