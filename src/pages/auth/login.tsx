import React, { useEffect } from 'react'
import {useState} from 'react'
import {login} from '../../presenters/slices/authSlice'
import type { UserPayLoad } from '../../entities/user/entity'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../presenters/hooks'
import logo from '../../assets/logo.png'
import Warning from '../../components/icons/Warning'
import { useTranslation } from 'react-i18next'
import EyeVisible from '../../components/icons/Eyevisible'
import EyeInvisible from '../../components/icons/Eyeinvisible'
import {Checkbox} from 'antd'
import './login.scss'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [labelHovered, setLabelHovered] = useState(false)
    const [filledLogin, setFilledLogin] = useState(false)
    const [failedLogin, setFailedLogin] = useState(false)
    const dispatch = useAppDispatch()
    const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth)
    const navigate = useNavigate()
    const {t} = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (isAuthenticated && token) {
            navigate('/dashboard', { replace: true })
        }
    }, [isAuthenticated, navigate])

    useEffect(() => {
        if (!rememberMe) return
        const handler = (e: MouseEvent) => {
            const label = document.querySelector('.item-control label')
            if (label && label.contains(e.target as Node)) return
            setLabelHovered(false)
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [rememberMe])

    useEffect(() => {
        if (error) setFailedLogin(true)
        else setFailedLogin(false)
    },[error])

    useEffect(() => {

        setFilledLogin(false)
    },[])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setFilledLogin(true)
        if (!username || !password) {
            if (!filledLogin) setFilledLogin(true)
            return;
        }

        const payload: UserPayLoad = {
            username,
            password
        }
        dispatch(login(payload))

    }

  return (
    <div className="login-body">
        <div className="auth-wrapper">
            <div className="content-form">
                <img src={logo} alt="Logo" className="logo" />
                <h1>{t('Log in')}</h1>
                <form className="input-form" onSubmit={handleLogin}>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('Username')}
                    disabled={loading}
                    className= {
                        filledLogin && !username ? "username-input error" :
                        "username-input"}
                    />
                    {filledLogin && !username? (
                    <div
                    style={{color: 'red', fontFamily: 'Inter, sans-serif', fontSize: '14px',fontWeight: "400", marginTop: '-10px',
                    }}>
                        {t("Mes.User.Required.Username")}
                    </div>) 
                    : null}
                    

                    <div className= "password-wrapper">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('Password')}
                        disabled={loading}
                        className= {
                            filledLogin && !password ? "password-input error" :
                            "password-input"}
                    />
                    <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeVisible /> : <EyeInvisible />}
                    </span>
                    </div>

                    {filledLogin && !password ? (
                    <div
                    style={{color: 'red', fontFamily: 'Inter, sans-serif', fontSize: '14px', marginTop: '-10px'}}>
                        {t("Mes.User.Required.Password")}
                    </div>) 
                    : null}
                    
                    {
                       failedLogin&&error? (
                       <div className="error-msg" 
                       style={{color: 'red', 
                               marginTop: '-6px',
                               padding: '0px',
                               display: 'flex',
                               gap: '5px',
                               fontSize: '14px',
                               alignItems: 'center',
                               fontFamily: 'Inter, sans-serif',
                               lineHeight: '24px',
                            }}
                       >
                        <Warning />
                        {t(error)}
                       </div>


                       ): null
                    }
                    

                    <div className="item-control">
                       <label
                         onMouseEnter={() => rememberMe && setLabelHovered(true)}
                         onMouseLeave={() => rememberMe && setLabelHovered(false)}
                            style={{
                            gap: rememberMe && !labelHovered ? '20px' : '17px',
                            transition: 'gap 0.15s ease-out',
                         }}
                       >
                             <Checkbox
                                 checked={rememberMe}
                                 onChange={(e) => setRememberMe(e.target.checked)}
                                 disabled={loading}
                                 style={{
                                   transform: rememberMe && !labelHovered ? 'scale(1.2)' : 'scale(1)',

                                   transition: 'transform 0.15s ease-out',
                                 }}
                             />
                         {t('Remember me')}
                       </label>

                      <a href="#">{t('Forgot password')}?</a>
                    </div>

                   

                    <button className="login-button" type="submit" disabled={loading}>
                        {loading ? t('Logging in') : t('Log in')}
                    </button>
                </form>
            </div>
        </div>

        <div className="login-footer">
            <p className="copyright">Powered by <b>Alta Media</b></p>
            <p className="hotline">Hotline: 1900 1567</p>
        </div>
    </div>
  )
}

