import React from "react"

import {Grid, Header, Image, Segment, Table} from "semantic-ui-react"
import {FILES} from "../utils/constants";


import './scss/styles-downloads.scss'


const Downloads = () => {

    return <div className={'csp-downloads-wrapper'}>
        <Segment textAlign={"center"} className={'downloads-header-segment'}>
            <Header as={'h4'} inverted>
                Savage DRX
                <Header.Subheader>
                    (open beta)
                </Header.Subheader>
            </Header>
        </Segment>
        <Grid columns="equal" textAlign={"center"}>
            <Grid.Column textAlign={"left"}>
                <Segment textAlign={"center"} className={'windows-segment'}>
                    <Image className={"platform-image"}
                           src={process.env.PUBLIC_URL + '/images/windows.png'}
                           rounded
                           inline
                           centered
                    />

                    {/*Windows*/}
                    <Table celled inverted compact
                           size={"small"}
                           className={'platform-table'}
                           textAlign={"center"}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Type'}/>
                                <Table.Cell textAlign={"left"} content={FILES.WINDOWS_CLIENT.type}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={FILES.WINDOWS_CLIENT.filePath}>
                                        {FILES.WINDOWS_CLIENT.fileTitle}
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={FILES.WINDOWS_CLIENT.hash}/>
                            </Table.Row>
                        </Table.Body>
                    </Table>

                    <Table celled inverted compact
                           size={"small"}
                           className={'platform-table'}
                           textAlign={"center"}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Type'}/>
                                <Table.Cell textAlign={"left"} content={FILES.WINDOWS_SERVER.type}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={FILES.WINDOWS_SERVER.filePath}>
                                        {FILES.WINDOWS_SERVER.fileTitle}
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={FILES.WINDOWS_SERVER.hash}/>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
            </Grid.Column>
            <Grid.Column textAlign={"left"}>
                <Segment textAlign={"center"} className={'linux-segment'}>
                    <Image className={"platform-image"}
                           src={'/images/linux.png'}
                           rounded
                           inline
                           centered
                    />

                    {/*Deb*/}
                    <Table celled inverted compact
                           size={"small"}
                           className={'platform-table'}
                           textAlign={"center"}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} width={"3"} content={'Type'}/>
                                <Table.Cell textAlign={"left"} content={FILES.LINUX_CLIENT_DEB.type}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={FILES.LINUX_CLIENT_DEB.filePath}>
                                        {FILES.LINUX_CLIENT_DEB.fileTitle}
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={FILES.LINUX_CLIENT_DEB.hash}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Install with'}/>
                                <Table.Cell textAlign={"left"} content={
                                    'sudo apt install ./savage-drx_2025.01.28-2.deb'
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Uninstall with'}/>
                                <Table.Cell textAlign={"left"} content={
                                    'sudo apt remove savage-drx'
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Wayland'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={'https://discord.com/channels/511261029838225419/1334995287604854909'}>
                                        Guide to enabling Wayland in DRX
                                    </a>
                                }/>
                            </Table.Row>
                        </Table.Body>
                    </Table>

                    {/*Flatpak*/}
                    <Table celled inverted compact
                           size={"small"}
                           className={'platform-table'}
                           textAlign={"center"}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} width={"3"} content={'Type'}/>
                                <Table.Cell textAlign={"left"} content={FILES.LINUX_CLIENT_FLATPAK.type}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={FILES.LINUX_CLIENT_FLATPAK.filePath}>
                                        {FILES.LINUX_CLIENT_FLATPAK.fileTitle}
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={
                                    FILES.LINUX_CLIENT_FLATPAK.hash
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Install with'}/>
                                <Table.Cell textAlign={"left"}>
                                    * flatpak --user remote-add --if-not-exists flathub
                                    https://flathub.org/repo/flathub.flatpakrepo
                                    <br/>
                                    * flatpak --user install ./savage-drx-x86_64-2025.01.28-2.flatpak
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Uninstall with'}/>
                                <Table.Cell textAlign={"left"} content={
                                    'flatpak uninstall --user --delete-data org.savagedrx.savagedrx'
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Note'}/>
                                <Table.Cell textAlign={"left"}>
                                    Backup your cdkey and startup.cfg first if upgrading from older version, guide
                                    here: <a
                                    href={'https://discord.com/channels/511261029838225419/1334995287604854909'}>
                                    discord
                                </a>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>

                    {/*Manual*/}
                    <Table celled inverted compact
                           size={"small"}
                           className={'platform-table'}
                           textAlign={"center"}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} width={"3"} content={'Type'}/>
                                <Table.Cell textAlign={"left"} content={FILES.LINUX_CLIENT_ZIP.type}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={FILES.LINUX_CLIENT_ZIP.filePath}>
                                        {FILES.LINUX_CLIENT_ZIP.fileTitle}
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={FILES.LINUX_CLIENT_ZIP.hash}/>
                            </Table.Row>
                        </Table.Body>
                    </Table>

                    {/*Linux server*/}
                    <Table celled inverted compact
                           size={"small"}
                           className={'platform-table'}
                           textAlign={"center"}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} width={"3"} content={'Type'}/>
                                <Table.Cell textAlign={"left"} content={FILES.LINUX_SERVER.type}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={FILES.LINUX_SERVER.filePath}>
                                        {FILES.LINUX_SERVER.fileTitle}
                                    </a>
                                }/>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Segment>
            </Grid.Column>
        </Grid>
        <Segment textAlign={"center"} className={'details-segment'}>
            <div>
                Ask for help in discord <span className={'discord-setup-questions'}>#setup-questions</span> channel
            </div>
        </Segment>
    </div>
}

export default Downloads