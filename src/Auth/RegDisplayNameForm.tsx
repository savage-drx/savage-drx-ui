import React, {useState} from 'react'
import {Button, Form, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";

import RegistrationForm from "./RegistrationForm";
import {ROUTES} from "../utils/constants";
import {DisplayNameResponse} from "../types";
import {sendCheckDisplayName} from "../requests";
import {isString} from "../utils";

import './scss/styles-registration.scss';


const RegDisplayNameForm = ({response}: { response: DisplayNameResponse | null }) => {

    const [displayName, setDisplayName] = useState<string>(response?.display_name || "")
    const [displayNameResponse, setDisplayNameResponse] = useState<DisplayNameResponse | null>(response)
    const [checkDisplayNameDisabled, setCheckDisplayNameDisabled] = useState(true)
    const [showNextForm, setShowNextForm] = useState(false)

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorCode, setErrorCode] = useState(0)
    const [errorStatusText, setErrorStatusText] = useState("")

    const displayNameRegex = /^[a-z0-9 -]{1,32}$/i;

    const confirmDisplayName = () => {
        if (displayName) {
            sendCheckDisplayName(displayName).then(res => {
                setDisplayNameResponse(res.data)
                if (!res.data?.is_available) {
                    setShowError(true)
                    setErrorMessage("Display name taken")
                }
            }).catch(error => {
                processError(error)
            })
        }
    }

    const processError = (error: any) => {
        setShowError(true)
        setErrorMessage(isString(error?.response?.data?.detail) ? error?.response?.data?.detail : '')
        setErrorCode(error?.response?.status || 504)
        setErrorStatusText(error?.response?.statusText || "Gateway Timeout")
    }

    const resetErrorNotification = () => {
        setShowError(false)
        setErrorMessage("")
        setErrorCode(0)
        setErrorStatusText("")
    }

    const showDisplayNameForm = () => {
        return <div>
            <Form inverted size={"small"} className={"form-registration"} error={showError}
                  onSubmit={() => {
                      resetErrorNotification()
                      setDisplayNameResponse(null)
                      setCheckDisplayNameDisabled(true)
                      confirmDisplayName()
                  }}>

                <Form.Input name='nick'
                            label='displayed username'
                            placeholder='Nick'
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                if (displayNameRegex.test(value)) {
                                    resetErrorNotification()
                                    setDisplayName(value)
                                    setDisplayNameResponse(null)
                                    setCheckDisplayNameDisabled(false)
                                }
                            }}
                            icon={displayNameResponse
                                ? displayNameResponse.is_available
                                    ? 'chevron circle down icon-valid active big input-icon'
                                    : 'times circle icon-invalid active big input-icon'
                                : 'question circle outline big input-icon'
                            }
                            value={displayName}
                />

                <Button color={"teal"} type='submit' size={"tiny"} className={"check-display-name-button"}
                        disabled={checkDisplayNameDisabled}>
                    <Icon name='question circle outline'/>
                    Check
                </Button>

                <Button color={"blue"} type='submit' size={"tiny"} className={"go-next-button"}
                        disabled={displayNameResponse ? !displayNameResponse.is_available : true}
                        onClick={() => {
                            resetErrorNotification()
                            setShowNextForm(displayNameResponse?.is_available || false)
                        }}>
                    Next
                    <Icon name='chevron circle right'/>
                </Button>

                {
                    showError
                        ? <Form.Field width={8} className={'registration-error field-size'}>
                            <Message size={"small"} error
                                     content={errorMessage ? errorMessage : errorCode + ' - ' + errorStatusText}/>
                        </Form.Field>
                        : null
                }
            </Form>

            <Link to={ROUTES.confirmEmail} className={'link-color link-email-validation'}>
                <Icon name={'mail'} size={"large"}/>
                Already registered and need to confirm email?
            </Link>
        </div>
    }

    return showNextForm
        ? <RegistrationForm displayName={displayName}/>
        : showDisplayNameForm()
}

export default RegDisplayNameForm;