import React, {useEffect, useState} from 'react'
import {Image, Segment, Label, List, Button} from "semantic-ui-react"

import {getDiscordServerInfo} from "../requests"
import {DiscordInfo} from "../types"

import './scss/styles-discord.scss'


const Discord = () => {
    const [discordServerInfo, setDiscordServerInfo] = useState<DiscordInfo>();

    useEffect(() => {
        getDiscordServerInfo().then(res => {
            setDiscordServerInfo(res.data);
        })
    }, []);

    return <div className={'csp-discord-wrapper'}>
        <Segment.Group className={'csp-discord-widget'}>
            <Segment className={'discord-segment-top'} compact>
                <Image src={process.env.PUBLIC_URL + '/images/discord-logo.png'} size={"small"} inline
                       className={'discord-logo'}/>
                <Label className={'csp-label'} size={"small"} attached={"top right"}>
                    online
                    <Label.Detail>{discordServerInfo?.presence_count}</Label.Detail>
                </Label>

            </Segment>
            <Segment inverted className={'discord-users-list customized-scrollbar'} style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/discord-background.png'})`
            }}>
                <List>
                    {discordServerInfo?.members.map((member, index) => (
                        <div key={member.username + index}>
                            <Image src={member.avatar_url}
                                   size={"small"}
                                   inline/>
                            <span>{member.username}</span>
                        </div>
                    ))}
                </List>
            </Segment>
            <Segment inverted textAlign='center' className={'discord-segment-bottom'}>
                <Button
                    primary
                    size={"small"}
                    compact
                    fluid
                    as={'a'}
                    href='https://discord.com/invite/gMXqMA7?utm_source=Discord%20Widget&utm_medium=Connect'
                    target={'_blank'}>
                    Join
                </Button>
            </Segment>
        </Segment.Group>

        {/*<iframe src={"https://discord.com/widget?id=511261029838225419&theme=dark"}*/}
        {/*        width={"250"}*/}
        {/*        height={"400"}*/}
        {/*        frameBorder={"0"}*/}
        {/*        sandbox={"allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"}>*/}
        {/*</iframe>*/}
    </div>
}

export default Discord