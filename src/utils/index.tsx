import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {Icon, Image} from "semantic-ui-react"
import {DateTime} from "luxon";


import {A2SPlayer, BearerToken, GameResult} from "../types"
import {weekNumber} from 'weeknumber'
import {
    CLAN_ICON_URL,
    FINISHED_WEEKLY_LADDER_TTL_SECONDS,
    INFO_FIELDS,
    LIVE_WEEKLY_LADDER_TTL_SECONDS
} from "./constants"

export const formatGameTime = (gameTime: number) => {
    const date = new Date(0);
    date.setSeconds(gameTime / 1000);
    return date.toISOString().substring(11, 19);
}

export const formatGameTimeWithDays = (gameTime: number) => {
    const date = new Date(0);
    date.setSeconds(gameTime / 1000);
    return date.toISOString().substring(8, 19);
}

export const isString = (variable: any) => {
    return typeof variable === 'string' || variable instanceof String
}

export const getWinner = (id: number) => {
    if (id === 0) {
        return 'Draw'
    }
    if (id === 1) {
        return 'Human'
    }
    if (id === 2) {
        return 'Beast'
    }
}

export const addCommanders = (gameResults: Array<GameResult>) => {
    gameResults.map((gr) => (
        Object.values(gr.game.teams).forEach((team) => (
            team.players.forEach((p) => {
                if (p.is_commander) {
                    team.commander_name = p.name;
                    team.commander_clan_id = p.clan_id;
                }
            })
        ))
    ));
    return gameResults;
}

export const getCurrentTimeSeconds = () => {
    return Math.round(new Date().getTime() / 1000);
}

export const isCacheOutdated = (ttl: number, timestamp: number) => {
    if (!ttl || !timestamp) {
        return true;
    }
    const currentTime = getCurrentTimeSeconds();
    return currentTime > ttl + timestamp;
}

export const isWeekLadderCacheOutdated = (timestamp: number, weekCode: string) => {
    const weekNumber = getCurrentWeekCode()
    return weekCode === weekNumber
        ? isCacheOutdated(LIVE_WEEKLY_LADDER_TTL_SECONDS, timestamp)
        : isCacheOutdated(FINISHED_WEEKLY_LADDER_TTL_SECONDS, timestamp);
}

export const getExpectedTeamName = (teamNumber: number) => {
    if (teamNumber === 0) {
        return `Spectators`
    }
    return teamNumber % 2 === 0 ? `Team-${teamNumber} (Beast)` : `Team-${teamNumber} (Human)`
}

export const getStartDateOfISOWeek = (week: number, year: number) => {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOWeekStart = simple;
    if (dow <= 4)
        ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOWeekStart;
}

export const getEndDateOfISOWeek = (week: number, year: number) => {
    const startDate = getStartDateOfISOWeek(week, year);
    const finish = new Date(startDate);
    finish.setDate(finish.getDate() + 7);
    finish.setSeconds(finish.getSeconds() - 1);
    return finish;
}

export const getFormattedDate = (d: Date) => {
    const options: any = {year: 'numeric', month: 'long', day: 'numeric'};
    return d.toLocaleDateString("en-US", options)
}

export const getShortFormattedDate = (d: Date) => {
    const options: any = {year: 'numeric', month: 'short', day: 'numeric'};
    return d.toLocaleDateString("en-US", options)
}

export function getCurrentWeekCode() {
    const now = new Date()
    const current_year = now.getFullYear()
    const current_week = weekNumber(now)
    return current_year + '_' + current_week
}

export const sliceArray = (inputArray: Array<any>, perChunk: number) => {
    return inputArray.reduce((all, one, i) => {
        const ch = Math.floor(i / perChunk);
        all[ch] = [].concat((all[ch] || []), one);
        return all
    }, [])
}

export const secondsToDhms = (seconds: number) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + "d " : "";
    const hDisplay = h > 0 ? h + "h " : "";
    const mDisplay = m > 0 ? m + "m " : "";
    const sDisplay = s > 0 ? s + "s" : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export const formatNumber = (n: number) => {
    return new Intl.NumberFormat().format(n)
}

export const formatAccumulatedGameTime = (t: number) => {
    return secondsToDhms(t / 1000)
}

export const formatMoneyDelta = (t: number) => {
    return t > 0 ? "+" + formatNumber(t) : formatNumber(t)
}

export const formatInfoValue = (key: string, value: number) => {
    let result: any
    if (key === INFO_FIELDS.MONEY_DELTA.key) {
        result = formatMoneyDelta(value)
    }
    if (key === INFO_FIELDS.ON_TEAM_TIME.key) {
        result = formatAccumulatedGameTime(value)
    }
    if (key !== INFO_FIELDS.MONEY_DELTA.key && key !== INFO_FIELDS.ON_TEAM_TIME.key) {
        result = formatNumber(value)
    }
    return result
}

export const formatPlayer = (p: any) => {
    return _formatPlayer(p, null)
}

export const formatWeeklyPlayer = (p: any, weekName: string) => {
    return _formatPlayer(p, weekName)
}

const _formatPlayer = (p: any, weekName: any) => {

    // for local testing
    // p.clan_id = 32994

    return Number(p.uid)
        ? <Link to={'/player/' + (weekName ? weekName + '/' : '') + p.uid} className={'link-color'}>
            {p.is_commander
                ? <Icon name={'copyright'} size={"large"}/>
                : null
            }
            {
                p.clan_id
                    ? <Image src={CLAN_ICON_URL + p.clan_id + '.png'}
                             size={"small"}
                             inline/>
                    : null
            }
            <span className={p.clan_id ? 'span-name' : ''}>{p.name}</span>
        </Link>
        : <span>
            {p.is_commander
                ? <Icon name={'copyright'} size={"large"}/>
                : null
            }
            {
                p.clan_id
                    ? <Image src={CLAN_ICON_URL + p.clan_id + '.png'}
                             size={"small"}
                             inline/>
                    : null
            }
            <span className={p.clan_id ? 'span-name' : ''}>{p.name}</span>
        </span>
}

export const formatA2SPlayer = (p: A2SPlayer) => {
    // p.clan = 32994
    return <span>
            {p.is_comm
                ? <Icon name={'copyright'} size={"large"}/>
                : null
            }
        {
            p.clan
                ? <Image src={CLAN_ICON_URL + p.clan + '.png'}
                         size={"small"}
                         inline/>
                : null
        }
        <span className={p.clan ? 'span-name' : ''}>{p.name}</span>
        </span>
}

const _getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(_getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(_getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const capitalizeFirstLetter = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const hasRole = (token: BearerToken, roleName: string) => {
    return token?.roles?.includes(roleName);
}

export const convertHourlyTSCodeToDateTime = (code: string) => {
    const year = parseInt(code.slice(0, 4));
    const month = parseInt(code.slice(4, 6)) - 1;
    const day = parseInt(code.slice(6, 8));
    const hour = parseInt(code.slice(8, 10));

    const simpleDate = new Date(year, month, day, hour, 0, 0);
    simpleDate.setHours(simpleDate.getHours() + (isDST() ? 3 : 2));

    const now = DateTime.now();
    const timezoneOffset = now.offset * 60 * 1000;
    return simpleDate.getTime() + timezoneOffset;
}

export const isDST = () => {
    const now = DateTime.now().setZone("Europe/Kyiv");
    return now.isInDST;
}


export const convertDailyTSCodeToDateTime = (code: string) => {
    const year = parseInt(code.slice(0, 4));
    const month = parseInt(code.slice(4, 6)) - 1;
    const day = parseInt(code.slice(6, 8));

    const simpleDate = new Date(year, month, day, 0, 0, 0);

    return simpleDate.getTime();
}

export const convertMonthlyTSCodeToDateTime = (code: string) => {
    const year = parseInt(code.slice(0, 4));
    const month = parseInt(code.slice(4, 6)) - 1;

    const simpleDate = new Date(year, month, 0, 0, 0, 0);

    return simpleDate.getTime();
}

export const getMyTimeZone = () => {
    const dt = DateTime.local();
    const zoneName = dt.zoneName;
    const offsetHours = dt.offset / 60;
    return `${zoneName}, UTC${offsetHours >= 0 ? '+' : ''}${offsetHours}`;
}

export const formatServerNameHtml = (serverName?: string | null): string => {
    if (!serverName) return '';

    const COLORS: Record<string, string> = {
        b: 'blue',
        c: 'cyan',
        g: 'green',
        k: 'black',
        m: 'magenta',
        r: 'red',
        w: 'white',
        y: 'yellow',
    };

    const RGB_MULTIPLIER = 11.1;

    // Initial wrap in white
    let result = `<span style="color: ${COLORS['w']}">${serverName}</span>`;

    const convertRgbCodes = (match: string): string => {
        const code = match.substring(1); // remove ^
        const r = Math.round(parseInt(code[0]) * RGB_MULTIPLIER);
        const g = Math.round(parseInt(code[1]) * RGB_MULTIPLIER);
        const b = Math.round(parseInt(code[2]) * RGB_MULTIPLIER);

        return `<span style="color: rgb(${r}% ${g}% ${b}%)">`;
    };

    const convertColorLetters = (match: string): string => {
        const letter = match[1];
        return `<span style="color: ${COLORS[letter]}">`;
    };

    result = result
        .replace(/\^[0-9]{3}/g, convertRgbCodes)
        .replace(/\^[bcgkmrwy]/g, convertColorLetters)
        .replace(/<span/g, '</span><span');

    // Equivalent to Python result[7:]
    return result.substring(7);
};