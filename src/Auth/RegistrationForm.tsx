import React, {useEffect, useRef, useState} from 'react'
import {Button, Form, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import {ROUTES} from "../utils/constants";
import {sendRegistrationRequest} from "../requests";
import {RegistrationFormProps, RegistrationProps} from "../types";
import {isString} from "../utils";

import RegDisplayNameForm from "./RegDisplayNameForm";
import RegEmailForm from "./RegEmailForm";

import './scss/styles-registration.scss';



const RegistrationForm = (props: RegistrationFormProps) => {

    const [regEmail, setRegEmail] = useState("")
    const [regPassword1, setRegPassword1] = useState("")
    const [regPassword2, setRegPassword2] = useState("")
    const [isRegEnabled, setIsRegEnabled] = useState(false)

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorCode, setErrorCode] = useState(0)
    const [errorStatusText, setErrorStatusText] = useState("")

    const [showEmailConfirmationForm, setShowEmailConfirmationForm] = useState(false)
    const [showPreviousForm, setShowPreviousForm] = useState(false)

    const site_key = String(process.env.REACT_APP_CAPTCHA_SITE_KEY)
    const captchaRef = useRef<ReCAPTCHA>(null)
    const [captchaToken, setCaptchaToken] = useState<any>(null)
    const [visitorId, setVisitorId] = useState<any>()
    const minPasswordLength = 8

    useEffect(() => {
        setIsRegEnabled(regEmail && captchaToken && visitorId && regPassword1 === regPassword2)
    }, [regEmail, captchaToken, regPassword1, regPassword2, visitorId]);

    useEffect(() => {
        if (captchaToken != null) {
            FingerprintJS.load()
                .then(fp => fp.get())
                .then(result => {
                    setVisitorId(result.visitorId)
                })
        } else {
            setVisitorId(undefined)
        }
    }, [captchaToken])


    const register = () => {
        if (isRegEnabled) {
            const registrationProps: RegistrationProps = {
                userName: regEmail,
                password: regPassword1,
                displayName: props.displayName,
                token: captchaToken,
                visitorId: visitorId
            }
            sendRegistrationRequest(registrationProps).then(res => {
                setShowEmailConfirmationForm(true)
            }).catch(error => {
                captchaRef?.current?.reset()
                setCaptchaToken(null)
                processError(error)
            })
        }
    }

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

    const isInitialPasswordValid = () => {
        return Boolean(regPassword1) && regPassword1?.length >= minPasswordLength;
    }

    const arePasswordsEqual = () => {
        return Boolean(regPassword1) && Boolean(regPassword2)
            && regPassword1 === regPassword2
            && regPassword1?.length >= minPasswordLength && regPassword2?.length >= minPasswordLength;
    }

    const showRegistrationForm = () => {
        return <div>
            <Form inverted size={"small"} className={"form-registration"} error={showError}
                  onSubmit={() => {
                      register()
                  }}>

                <Form.Input name='email' label='email (username)' placeholder='example@gmail.com' type={"email"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setRegEmail(value)
                                resetErrorNotification()
                            }}
                            error={showError && errorMessage?.includes("Email")}
                            icon={showError && errorMessage?.includes("Email")
                                ? 'times circle icon-invalid active big input-icon'
                                : 'question circle outline big input-icon'}
                />
                <Form.Input name='nick' label='displayed username' placeholder='Nick'
                            value={props.displayName}
                            required width={8} className={'field-size'} disabled={true}
                            error={errorMessage?.includes("Display")}
                            icon={errorMessage?.includes("Display")
                                ? 'times circle icon-invalid active big input-icon'
                                : 'chevron circle down icon-valid active big input-icon'}
                />
                <Form.Input name='password1' label='password (minimum 8 characters)' placeholder='Password' type={"password"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setRegPassword1(value)
                            }}
                            icon={regPassword1
                                ? isInitialPasswordValid()
                                    ? 'chevron circle down icon-valid active big input-icon'
                                    : 'times circle icon-invalid active big input-icon'
                                : 'question circle outline big input-icon'
                            }
                />
                <Form.Input name='password2' label='confirm password' placeholder='Password' type={"password"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setRegPassword2(value)
                            }}
                            icon={regPassword2
                                ? arePasswordsEqual()
                                    ? 'chevron circle down icon-valid active big input-icon'
                                    : 'times circle icon-invalid active big input-icon'
                                : 'question circle outline big input-icon'
                            }
                />

                <div className={"site-captcha"}>
                    <ReCAPTCHA sitekey={site_key} ref={captchaRef} onChange={() => {
                        setCaptchaToken(captchaRef?.current?.getValue())
                        resetErrorNotification()
                    }}/>
                </div>

                <Button color={"blue"} type='submit' size={"tiny"} className={"go-back-button"}
                        onClick={() => {
                            resetErrorNotification()
                            setShowPreviousForm(true)
                            setRegPassword1("")
                            setRegPassword2("")
                        }}>
                    <Icon name='chevron circle left'/>
                    Back
                </Button>

                <Button color={"teal"} type='submit' size={"tiny"} className={"create-account-button"}
                        disabled={!isRegEnabled}>
                    <Icon name='plug'/>
                    Register
                </Button>

                {
                    showError
                        ? <Form.Field width={8} className={'registration-error field-size'}>
                            <Message size={"small"}
                                     error
                                     header={'Error:'}
                                     content={errorMessage
                                         ? errorMessage
                                         : errorCode
                                             ? errorCode + ' - ' + errorStatusText
                                             : "Unknown error"}/>
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

    const selectForm = () => {
        if (showPreviousForm) {
            return <RegDisplayNameForm response={{is_available: true, display_name: props.displayName}}/>;
        }
        if (showEmailConfirmationForm) {
            return <RegEmailForm props={{password: regPassword1, email: regEmail, disableFields: true}}/>;
        }
        return showRegistrationForm();
    }

    return selectForm();
}

export default RegistrationForm;
