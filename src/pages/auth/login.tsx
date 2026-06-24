import React, { useEffect } from 'react'
import {useState} from 'react'
import {login} from '../../presenters/slices/authSlice'
import type UserPayLoad from '../../entities/user/entity'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../presenters/hooks'
import logo from '../../assets/logo.png'
import './login.scss'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const dispatch = useAppDispatch()
    const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !password) {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập')
            return
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
                <h1>Đăng nhập</h1>
                <form className="input-form" onSubmit={handleLogin}>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tên đăng nhập"
                    disabled={loading}
                    />

                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    disabled={loading}
                    />

                    <div className="item-control">
                       <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={loading}
                        />
                        Ghi nhớ đăng nhập
                      </label>

                      <a href="#">Quên mật khẩu?</a>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button className="login-button" type="submit" disabled={loading}>
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
