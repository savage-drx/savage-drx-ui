import {useEffect, useRef, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'

import {getOnline} from "../requests";
import {getCurrentTimeSeconds, isCacheOutdated} from "../utils";
import {Activity} from "../types";

interface UseOnlineActivityResult {
    chartData: Array<[number, number]>;
    serverTimezone: string;
    total: number;
    activeUsers: Activity['active_users'];
    loading: boolean;
}

export const useOnlineActivity = (
    period: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
    tz: string,
    options: { ttl: number; dispatchType: string; cacheSelector: (state: any) => any }
): UseOnlineActivityResult => {
    const dispatch = useDispatch();
    const cache = useSelector(options.cacheSelector, shallowEqual);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [chartData, setChartData] = useState<Array<[number, number]>>([]);
    const [loading, setLoading] = useState(false);
    const lastTzRef = useRef<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const tzChanged = lastTzRef.current !== null && lastTzRef.current !== tz;
        lastTzRef.current = tz;

        if (tzChanged || isCacheOutdated(cache.ttl, cache.timestamp)) {
            getOnline(period, tz).then(res => {
                setActivity(res.data);
                dispatch({
                    type: options.dispatchType,
                    payload: {
                        timestamp: getCurrentTimeSeconds(),
                        ttl: options.ttl,
                        data: res.data
                    }
                });
                setLoading(false);
            });
        } else {
            setActivity(cache.data);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period, tz]);

    useEffect(() => {
        if (activity?.activity_map) {
            const result: Array<[number, number]> = Object.entries(activity.activity_map).map(
                ([key, value]) => [new Date(key).getTime(), value]
            );
            setChartData(result);
        } else {
            setChartData([]);
        }
    }, [activity]);

    return {
        chartData,
        serverTimezone: activity?.timezone || '',
        total: activity?.total_active_users || 0,
        activeUsers: activity?.active_users,
        loading
    };
};
