import React, {useEffect, useState} from 'react'
import {shallowEqual, useSelector} from "react-redux";
import {useRouteMatch} from "react-router-dom";
import {Button, Confirm, Form, Header, Icon, Message, Table} from "semantic-ui-react";

import BaseContainer from "../HomePage/BaseContainer";
import {createMyServer, deleteMyServer, getMyServers, serverGenerateNewCredentials, updateMyServer} from "../requests";
import {ROUTES} from "../utils/constants";
import {CreateUpdateServer, ServerCredentials, UserServer, UserServersList} from "../types";
import {isString} from "../utils";


import './scss/styles-user-servers.scss'


const SetupServer = () => {
    const auth = useSelector((state: any) => state.authReducer, shallowEqual);
    const isSetupServerConfigPath = Boolean(useRouteMatch(ROUTES.setupServers)?.isExact)
    const [userServersList, setUserServersList] = useState<UserServersList>();
    const [selectedServer, setSelectedServer] = useState<UserServer>();

    const [showSummary, setShowSummary] = useState<boolean>(true);
    const [showServerUpdate, setShowServerUpdate] = useState<boolean>(false);
    const [showServerCreate, setShowServerCreate] = useState<boolean>(false);
    const [showCompleted, setShowCompleted] = useState<boolean>(false);
    const [serverCredentials, setServerCredentials] = useState<ServerCredentials>()
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

    const defaultFormValues: UserServer = {
        id: 0,
        description: '',
        display_name: '',
        game_type: '',
        host_name: '',
        max_player_count: 0,
        port: 0,
        updated: '',
        current_map: '',
        current_player_count: '',
    }
    const [formValues, setFormValues] = useState<UserServer>(
        {...defaultFormValues});

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorCode, setErrorCode] = useState(0)
    const [errorStatusText, setErrorStatusText] = useState("")


    useEffect(() => {
        if (selectedServer) {
            setFormValues(selectedServer)
        }
    }, [selectedServer])

    useEffect(() => {
        if (showServerUpdate || showServerCreate) {
            setShowSummary(false)
        }
    }, [showServerUpdate, showServerCreate])

    useEffect(() => {
        if (showSummary) {
            setShowCompleted(false)
            setShowServerUpdate(false)
            setShowServerCreate(false)
        }
    }, [showSummary])

    useEffect(() => {
        if (isSetupServerConfigPath && auth.isLoggedIn) {
            if (showSummary && userServersList == null) {
                getMyServers().then(res => {
                    setUserServersList(res.data)
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSetupServerConfigPath, auth, showSummary]);

    const processError = (error: any) => {
        setShowError(true)
        let errorMessage
        if (error?.response?.data?.messages?.length > 0) {
            errorMessage = error.response.data.messages[0]
        }
        setErrorMessage(isString(errorMessage) ? errorMessage : '')
        setErrorCode(error?.response?.status)
        setErrorStatusText(error?.response?.data?.error)
    }

    const resetErrorNotification = () => {
        setShowError(false)
        setErrorMessage("")
        setErrorCode(0)
        setErrorStatusText("")
    }

    const sendServerUpdate = () => {
        if (formValues.id > 0 && formValues.display_name && formValues.host_name && formValues.port > 0
            && formValues.max_player_count > 0 && formValues.description && formValues.game_type) {
            const request: CreateUpdateServer = {
                description: formValues.description,
                display_name: formValues.display_name,
                game_type: formValues.game_type,
                host_name: formValues.host_name,
                max_player_count: formValues.max_player_count,
                port: formValues.port
            }
            updateMyServer(formValues.id, request).then(res => {
                setShowCompleted(true)
            }).catch(error => {
                processError(error)
            })
        } else {
            setShowError(true)
            setErrorMessage('Invalid data (all fields are required)')
        }
    }

    const sendServerCreate = () => {
        if (formValues.display_name && formValues.host_name && formValues.port > 0
            && formValues.max_player_count > 0 && formValues.description && formValues.game_type) {
            const request: CreateUpdateServer = {
                description: formValues.description,
                display_name: formValues.display_name,
                game_type: formValues.game_type,
                host_name: formValues.host_name,
                max_player_count: formValues.max_player_count,
                port: formValues.port
            }
            createMyServer(request).then(res => {
                setServerCredentials(res.data)
                setShowCompleted(true)
            }).catch(error => {
                processError(error)
            })
        } else {
            setShowError(true)
            setErrorMessage('Invalid data (all fields are required)')
        }
    }

    const serverLimitTable = (userServers: UserServersList) => {
        return <div>
            <Table celled inverted compact
                   size={"small"}
                   className={'user-server-info-table'}
                   textAlign={"center"}>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Max Servers Limit'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={userServers.servers_limit}/>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button className={'button-create'}
                    color={'green'}
                    size={"small"}
                    onClick={() => {
                        setShowServerCreate(true);
                        setFormValues(defaultFormValues)
                    }}>
                <Icon name='server' size={"small"}/>
                Create New Server
            </Button>
            <br/><br/><br/><br/>
        </div>
    }

    const serverInfoTable = (server: UserServer, index: number) => {
        return <div key={index}>
            <Table celled inverted compact
                   size={"small"}
                   className={'user-server-info-table'}
                   textAlign={"center"}>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Server ID'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={server.id}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Display Name'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={server.display_name}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Host'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={server.host_name}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Port'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={server.port}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Max Player Count'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={server.max_player_count}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Description'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={server.description}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} collapsing textAlign={"left"} content={'Game Type'}/>
                        <Table.Cell width={12} collapsing textAlign={"left"} content={server.game_type}/>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button className={'button-update'}
                    primary
                    size={"small"}
                    onClick={() => {
                        setSelectedServer(server);
                        setShowServerUpdate(true)
                    }}>
                <Icon name='bars' size={"small"}/>
                Update Server
            </Button>
            <Button className={'button-gen-password'}
                    size={"small"}
                    onClick={() => {
                        serverGenerateNewCredentials(server.id).then(res => {
                            setServerCredentials(res.data)
                            setShowSummary(false)
                            setShowCompleted(true)
                        }).catch(error => {
                            processError(error)
                        })
                    }}>
                <Icon name='key' size={"small"}/>
                Generate New Password
            </Button>
            <Button className={'button-delete'}
                    color={'red'}
                    size={"small"}
                    onClick={() => {
                        setShowDeleteConfirmation(true)
                    }}>
                <Icon name='close' size={"small"}/>
                Delete Server
            </Button>
            <Confirm
                header={"Delete Server Confirmation"}
                content={`Are you sure you want to delete server ${server.id}?`}
                open={showDeleteConfirmation}
                onCancel={() => {
                    setShowDeleteConfirmation(false)
                }}
                onConfirm={() => {
                    deleteMyServer(server.id).then(res => {
                        getMyServers().then(res => {
                            setUserServersList(res.data)
                        });
                    });
                    setShowDeleteConfirmation(false)
                }}
            />
            <br/><br/><br/><br/>
        </div>
    }

    const showUpdateCreateServer = () => {
        return <div>
            <Form inverted size={"small"} className={"form-server-update"} error={showError}
                  onSubmit={() => {
                      resetErrorNotification()
                      if (showServerUpdate) {
                          sendServerUpdate()
                      }
                      if (showServerCreate) {
                          sendServerCreate()
                      }
                  }}>

                {
                    showServerUpdate
                        ? <Form.Input name='server-id' label='id' placeholder='Server ID' type={"number"}
                                      required width={8} className={'field-size'}
                                      value={formValues.id}
                                      disabled={true}/>
                        : null
                }

                <Form.Input name='display-name' label='Display Name' placeholder='^ySavage ^yPublic ^gServer'
                            type={"string"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setFormValues(values => ({...values, display_name: value}))
                            }}
                            value={formValues.display_name}
                />
                <Form.Input name='host' label='Host' placeholder='8.8.8.8' type={"string"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setFormValues(values => ({...values, host_name: value}))
                            }}
                            value={formValues.host_name}
                />
                <Form.Input name='port' label='Port' placeholder='11235' type={"number"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setFormValues(values => ({...values, port: parseInt(value)}))
                            }}
                            value={formValues.port}
                />
                <Form.Input name='max-player-count' label='Max Player Count' placeholder='24' type={"number"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setFormValues(values => ({...values, max_player_count: parseInt(value)}))
                            }}
                            value={formValues.max_player_count}
                />
                <Form.Input name='description' label='Description' placeholder='^gWelcome ^gto ^ythe ^yServer... '
                            type={"string"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setFormValues(values => ({...values, description: value}))
                            }}
                            value={formValues.description}
                />

                <Form.Input name='game-type' label='Game Type (ex: RTSS, DUEL, INSTAGIB)' placeholder='RTSS' type={"string"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setFormValues(values => ({...values, game_type: value}))
                            }}
                            value={formValues.game_type}
                />

                {
                    showServerUpdate
                        ? <Button className={'button-update'}
                                  primary
                                  size={"small"}
                                  onClick={() => {
                                      resetErrorNotification()
                                  }}>
                            <Icon name='bars' size={"small"}/>
                            Update Server
                        </Button>
                        : null
                }

                {
                    showServerCreate
                        ? <Button className={'button-update'}
                                  color={'green'}
                                  size={"small"}
                                  onClick={() => {
                                      resetErrorNotification()
                                  }}>
                            <Icon name='bars' size={"small"}/>
                            Create New Server
                        </Button>
                        : null
                }

                <Button className={'button-cancel'}
                        color={'red'}
                        size={"small"}
                        onClick={() => {
                            resetErrorNotification()
                            setFormValues(defaultFormValues)
                            setSelectedServer(undefined)
                            setShowSummary(true)
                        }}>
                    <Icon name='cancel' size={"small"}/>
                    Cancel
                </Button>

                {
                    showError
                        ? <Form.Field width={8} className={'server-update-error field-size'}>
                            <Message size={"small"}
                                     error
                                     header={'Error:'}
                                     content={errorMessage ? errorMessage : errorCode + ' - ' + errorStatusText}/>
                        </Form.Field>
                        : null
                }
            </Form>
        </div>
    }

    const getForm = () => {
        return <div className={'user-servers-wrapper'}>
            {showSummary && userServersList ? serverLimitTable(userServersList) : null}
            {showSummary
                ? userServersList?.servers
                    ?.sort((a, b) => a.id - b.id)
                    ?.map((server, index) => (serverInfoTable(server, index)))
                : null
            }
            {(showServerUpdate || showServerCreate) && !showCompleted ? showUpdateCreateServer() : null}
            {showCompleted ? SetupServerCompleted(serverCredentials, setShowSummary, setUserServersList) : null}
        </div>
    }

    return <BaseContainer header={"Your Servers"} body={getForm()}/>
}


const SetupServerCompleted = (credentials?: ServerCredentials, setShowSummary?: any, setUserServersList?: any) => {

    const getTableWithCredentials = () => {
        if (credentials == null) {
            return null;
        }
        return <Table celled inverted compact
                      size={"small"}
                      className={'user-server-info-table'}
                      textAlign={"center"}>
            <Table.Body>
                <Table.Row>
                    <Table.Cell width={4} collapsing textAlign={"left"} content={'Server username'}/>
                    <Table.Cell width={12} collapsing textAlign={"left"} content={credentials.username}/>
                </Table.Row>
                <Table.Row>
                    <Table.Cell width={4} collapsing textAlign={"left"} content={'Server password'}/>
                    <Table.Cell width={12} collapsing textAlign={"left"} content={credentials.password}/>
                </Table.Row>
            </Table.Body>
        </Table>
    }

    const createUpdateCompleted = () => {
        return <div className={'server-create-update-finished'}>
            <Icon name="chevron down" className={"icon-valid input-icon"} size={"huge"}/>
            <Icon name="server" size={"huge"} color={"green"}/>
            <div className={'text-block'}>
                <Header as='h3'>You have successfully created or updated your server!</Header>
                {
                    credentials == null
                        ? null
                        : getTableWithCredentials()
                }
            </div>
            <Button className={'button-return'}
                    color={'grey'}
                    size={"small"}
                    onClick={() => {
                        setUserServersList(null)
                        setShowSummary(true)
                    }}>
                <Icon name='home' size={"small"}/>
                Return to Your Servers
            </Button>
        </div>
    }

    return createUpdateCompleted()
}

export default SetupServer;