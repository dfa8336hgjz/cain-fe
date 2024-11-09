import '../../styles/loginWidget.css'
import logo from '../../assets/logo.png'
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { ReactComponent as EyeCloseIcon } from '../../assets/icons/eyeClose.svg'

import API_URL from '../../services/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginWidget({ onClick }) {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState({
        username: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        if (isInputFilled(e)) {
            try {
                const response = await axios.post(`http://${API_URL}/auth/login`, {
                    username: e.target.username.value,
                    password: e.target.password.value
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                )
                if (response.status === 200) {
                    setErrorText({ ...errorText, password: "" })
                    console.log("Login success")
                    localStorage.setItem('token', response.data)
                    navigate('/notebooks')
                }
            }
            catch (err) {
                setErrorText({ ...errorText, password: "Wrong username or password" })
            }

        }
    }

    const isInputFilled = (e) => {
        let result = true
        let currentErrorText = {
            username: "",
            password: ""
        }

        let passwordRegex = /.{8,}/
        if (e.target.username.value === "") {
            currentErrorText.username = "Username is required"
            result = false
        }

        if (e.target.password.value === "") {
            currentErrorText.password = "Password is required"
            result = false
        }
        else if (!passwordRegex.test(e.target.password.value)) {
            currentErrorText.password = "Password must be at least 8 characters"
            result = false
        }

        setErrorText({ ...currentErrorText })

        return result
    }

    return (
        <div className='modal-widget'>
            <div className='popup-login-content'>
                <div className="modal-widget-top">
                    <img src={logo} alt="logo" className='logo' />
                    <h1 id="app-name">CAIN</h1>
                    <button onClick={() => onClick(false)}>
                        <CloseIcon width={35} height={35} />
                    </button>
                </div>

                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="username" style={{ marginTop: '20px' }}>Username</label>

                    <p className="inputForm">
                        <input type="text" id="username" />
                    </p>
                    <label htmlFor="username-error" className='errorField'>{errorText.username}</label>

                    <label htmlFor="password">Password</label>
                    <p className="inputForm">
                        <input type={showPassword ? "text" : "password"} id="password" />
                        {showPassword ? <EyeIcon onClick={() => setShowPassword(!showPassword)} width={21} height={21} />
                            : <EyeCloseIcon onClick={() => setShowPassword(!showPassword)} width={21} height={21} />}
                    </p>
                    <label htmlFor="password-error" className='errorField'>{errorText.password}</label>

                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginWidget