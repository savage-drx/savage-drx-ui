import React from 'react';
import {Dropdown} from "semantic-ui-react";
import {getMyTimezoneIANA} from "../utils";

interface TimezoneSelectorProps {
    timezone: string;
    onTimezoneChange: (tz: string) => void;
    serverTimezone?: string;
}

export const TimezoneSelector = ({timezone, onTimezoneChange, serverTimezone}: TimezoneSelectorProps) => {
    const userTz = getMyTimezoneIANA();
    const options = [
        {key: 'user', value: userTz, text: userTz},
        {key: 'london', value: 'Europe/London', text: 'Europe/London'},
        {key: 'newyork', value: 'America/New_York', text: 'America/New_York'},
    ];

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Dropdown
                selection
                options={options}
                value={timezone}
                onChange={(_e, data) => onTimezoneChange(data.value as string)}
                style={{minWidth: '180px'}}
            />
            {serverTimezone && serverTimezone !== timezone && (
                <span style={{fontSize: '11px', color: '#888'}}>
                    server: {serverTimezone}
                </span>
            )}
        </div>
    );
};
