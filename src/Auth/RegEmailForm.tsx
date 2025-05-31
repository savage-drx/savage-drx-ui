import React, {useEffect, useState} from 'react'
import {Button, Form, Icon, Message} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

import {sendEmailConfirmationRequest, sendRenewEmailRequest} from "../requests";
import {isString} from "../utils";
import {EmailConfirmationProps, EmailTokenRenewProps, RegEmailFormProps} from "../types";
import {RESEND_EMAIL_TOKEN_TIMEOUT, ROUTES} from "../utils/constants";

import './scss/styles-registration.scss';


const RegEmailForm = ({props}: { props?: RegEmailFormProps | null }) => {

    const history = useHistory();

    const [email, setEmail] = useState(props?.email || "")
    const [password, setPassword] = useState(props?.password || "")
    const [confirmationCode, setConfirmationCode] = useState("")
    const [confirmationDisabled, setConfirmationDisabled] = useState(true)
    const [codeSent, setCodeSent] = useState(false)
    const [resendTimer, setResendTimer] = useState(RESEND_EMAIL_TOKEN_TIMEOUT)

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorCode, setErrorCode] = useState(0)
    const [errorStatusText, setErrorStatusText] = useState("")

    useEffect(() => {
        if (resendTimer > 0) {
            setTimeout(() => {
                setResendTimer(resendTimer - 1)
            }, 1000)
        }
    }, [resendTimer])

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

    const confirmEmail = () => {
        if (email && password && confirmationCode) {
            const request: EmailConfirmationProps = {
                username: email,
                password: password,
                mail_token: confirmationCode
            }
            setConfirmationDisabled(true)
            sendEmailConfirmationRequest(request).then(res => {
                history.push(ROUTES.registrationFinished)
            }).catch(error => {
                processError(error)
                setConfirmationDisabled(false)
            })
        }
    }

    const resendEmailConfirmationCode = () => {
        if (email && password) {
            const props: EmailTokenRenewProps = {
                username: email,
                password: password
            }
            setConfirmationDisabled(false)
            sendRenewEmailRequest(props).then(res => {
                setCodeSent(true)
            }).catch(error => {
                processError(error)
                setCodeSent(false)
            })

            setResendTimer(RESEND_EMAIL_TOKEN_TIMEOUT)
        }
    }

    const resetErrorNotification = () => {
        setShowError(false)
        setErrorMessage("")
        setErrorCode(0)
        setErrorStatusText("")
    }

    return <div>
        <Form inverted size={"small"} className={"form-registration"} error={showError}
              onSubmit={() => {
                  resetErrorNotification()
                  confirmEmail()
              }}>

            <Form.Input name='email' label='email' placeholder='example@gmail.com' type={"email"}
                        required width={8} className={'field-size'}
                        onChange={(e, {name, value}) => {
                            setEmail(value)
                            setCodeSent(false)
                        }}
                        value={email}
                        disabled={props?.disableFields || false}
                        icon={props?.disableFields || codeSent
                            ? 'chevron circle down icon-valid active big input-icon'
                            : null
                        }
            />

            <Form.Input name='password' label='password' placeholder='Password' type={"password"}
                        required width={8} className={'field-size'}
                        onChange={(e, {name, value}) => {
                            setPassword(value)
                            setCodeSent(false)
                        }}
                        value={password}
                        disabled={props?.disableFields || false}
                        icon={props?.disableFields || codeSent
                            ? 'chevron circle down icon-valid active big input-icon'
                            : null
                        }
            />

            <Button color={"grey"} type='submit' size={"tiny"} className={"resend-email-token-button"}
                    disabled={resendTimer > 0 || Boolean(!email || !password)}
                    onClick={() => {
                        resetErrorNotification()
                        resendEmailConfirmationCode()
                    }}>
                <Icon name='send'/>
                {resendTimer > 0 ? 'Try to resend a code again in: ' + resendTimer : 'Resend code'}
            </Button>

            <Form.Input name='code'
                        label='verification code from your email (6 symbols)'
                        placeholder='Code'
                        type={"text"}
                        width={8} className={'field-size'}
                        required
                        onChange={(e, {name, value}) => {
                            setConfirmationCode(value.toUpperCase())
                            setConfirmationDisabled(false)
                        }}
                        value={confirmationCode}
                        maxLength="6"
                        minLength="6"
            />

            <Button color={"teal"} type='submit' size={"tiny"} className={"create-account-button"}
                    disabled={!Boolean(confirmationCode) || confirmationCode?.length !== 6 || confirmationDisabled}>
                <Icon name='envelope'/>
                Confirm Email
            </Button>

            {
                showError
                    ? <Form.Field width={8} className={'registration-error field-size'}>
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

export default RegEmailForm;