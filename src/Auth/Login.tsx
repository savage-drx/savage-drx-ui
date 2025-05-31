import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, Form, Message} from "semantic-ui-react";
import ReCAPTCHA from "react-google-recaptcha";
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import BaseContainer from "../HomePage/BaseContainer";
import {LoginProps, OAuthResponse} from "../types";
import {ROUTES} from "../utils/constants";
import {sendLoginRequest} from "../requests";
import {updateAuthStateOnLogin} from "../utils/auth";
import {isString} from "../utils";

import './scss/styles-login.scss';


const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [authResponse, setAuthResponse] = useState<OAuthResponse>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [errorCode, setErrorCode] = useState<number>(0)
    const [errorStatusText, setErrorStatusText] = useState<string>("")

    const site_key = String(process.env.REACT_APP_CAPTCHA_SITE_KEY)
    const captchaRef = useRef<ReCAPTCHA>(null)
    const [captchaToken, setCaptchaToken] = useState<any>(null)
    const [visitorId, setVisitorId] = useState<any>()

    const logIn = () => {
        if (email && password && captchaToken && visitorId) {
            const loginProps: LoginProps = {
                username: email,
                password: password,
                token: captchaToken,
                visitorId: visitorId
            }

            sendLoginRequest(loginProps).then(res => {
                setAuthResponse(res.data)
            }).catch(error => {
                captchaRef?.current?.reset()
                setCaptchaToken(null)
                setShowError(true)
                let errorMessage
                if (error?.response?.data?.messages?.length > 0) {
                    errorMessage = error.response.data.messages[0]
                }
                setErrorMessage(isString(errorMessage) ? errorMessage : '')
                setErrorCode(error?.response?.status)
                setErrorStatusText(error?.response?.data?.error)
            })
        }
    }

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

    useEffect(() => {
        if (updateAuthStateOnLogin(dispatch, authResponse)) {
            captchaRef?.current?.reset()
            setCaptchaToken(null)
            history.push(ROUTES.root)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authResponse]);

    const showErrorNotification = () => {
        if (showError && !errorMessage?.includes('Incorrect')) {
            const messageWithCode = errorCode ? errorCode + ' - ' + errorStatusText : "Unknown error"
            const message = errorMessage ? errorMessage : messageWithCode
            return <Form.Field width={8} className={'login-error field-size'}>
                <Message size={"small"} error header='Error:' content={message}/>
            </Form.Field>
        } else return null
    }

    const getForm = () => {
        return <div className={'login-wrapper'}>
            <Form inverted size={"small"} className={"form-login"} error={showError}
                  onSubmit={() => {
                      logIn()
                  }}>
                <Form.Input name='email' label='Email (username)' placeholder='example@gmail.com' type={"email"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setEmail(value)
                                setShowError(false)
                            }}
                            error={showError && errorMessage?.includes("Incorrect") ? {
                                content: errorMessage,
                                pointing: 'below',
                            } : false}
                />
                <Form.Input name='password' label='Password' placeholder='Password' type={"password"}
                            required width={8} className={'field-size'}
                            onChange={(e, {name, value}) => {
                                setPassword(value)
                                setShowError(false)
                            }}
                />

                <div className={"site-captcha"}>
                    <ReCAPTCHA sitekey={site_key}
                               ref={captchaRef}
                               onChange={() => {
                                   setCaptchaToken(captchaRef?.current?.getValue())
                                   setShowError(false)
                               }}/>
                </div>

                <Button type='submit' size={"tiny"} className={"submit-button"} disabled={!captchaToken}>
                    Submit
                </Button>

                {showErrorNotification()}
            </Form>
        </div>
    }

    return <BaseContainer header={"Log in"} body={getForm()}/>
}

export default Login;