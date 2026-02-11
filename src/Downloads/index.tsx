import React from "react"

import {Grid, Header, Image, Segment, Table} from "semantic-ui-react"

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
                                <Table.Cell textAlign={"left"} content={'Client'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={'https://mega.nz/file/Vn5jVCIJ#RCOdDfjEZXSPPWP1s2TYYL6fGybRLSQHbkZTdohRLt0'}>
                                        drx_setup-1.4.2-cl_win_prod
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={
                                    '8953fbd49e7c6ea29f6eaf7a709edb4024bd36c3756b1657c53c1a383af35455'
                                }/>
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
                                <Table.Cell textAlign={"left"} content={'Dedicated Server'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={'https://mega.nz/file/Vn5jVCIJ#RCOdDfjEZXSPPWP1s2TYYL6fGybRLSQHbkZTdohRLt0'}>
                                        drx_setup-1.5.4-sv_win_prod
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={
                                    '8953fbd49e7c6ea29f6eaf7a709edb4024bd36c3756b1657c53c1a383af35455'
                                }/>
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
                                <Table.Cell textAlign={"left"} content={
                                    'Client .deb package for Debian/Ubuntu/Mint/PoP! OS etc'
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={'https://mega.nz/file/M7xHkILB#oxqC9Uiu9xFQVVtNUttEnYun8cs9gmH1hezAN4P65Bo'}>
                                        savage-drx_2025.01.28-2.deb
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={
                                    'dabb164c094f030d580f34e00605d73c355aa6e997408c2c85f276e566b109b5'
                                }/>
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
                                <Table.Cell textAlign={"left"} content={
                                    'Client Flatpak bundle'
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={'https://mega.nz/file/BipikKaB#Y9rGMWKpB5G2GgRNY46KyETERDmLYnsNi1hm1yDJvW8'}>
                                        savage-drx-x86_64-2025.01.28-2.flatpak
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={
                                    '687edeed89f0ddedc138f29dab3504434c0c3acfd28df703883380632a8ae148'
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
                                <Table.Cell textAlign={"left"} content={
                                    'Client Standalone zip, I\'ll sort out the dependencies myself'
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={'https://mega.nz/file/JjozRZaT#kdHsO5CciHAQSqVqrIZajWawiw3eiAS9AQPQzUk65qw'}>
                                        savage-drx_2025.01.28-2.zip
                                    </a>
                                }/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Sha256'}/>
                                <Table.Cell textAlign={"left"} content={
                                    '9517bd68f673e861fbca063a9c1a09e2ea436bacb82613de9128f4b7d51a9f00'
                                }/>
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
                                <Table.Cell textAlign={"left"} content={'Dedicated Server'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign={"left"} content={'Download'}/>
                                <Table.Cell textAlign={"left"} content={
                                    <a href={'https://github.com/savage-drx/savage-drx-server-public'}>
                                        https://github.com/savage-drx/savage-drx-server-public
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