import logo from '../../assets/logo.png'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg'
import { ReactComponent as EyeCloseIcon } from '../../assets/icons/eyeClose.svg'
import Success from '../../assets/success.gif'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../../services/config'
import '../../styles/signupWidget.css'

function SignupWidget(props) {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        fullname: "",
        email: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleLoginSubmit = async (e) => {
        props.setLoading(true)
        e.preventDefault()
        if (isInputFilled(e)) {
            try {
                const response = await axios.post(`http://${API_URL}/auth/signup`, {
                    username: e.target.username.value,
                    password: e.target.password.value,
                    fullname: e.target.fullname.value,
                    email: e.target.email.value
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
                    setShowSuccess(true)
                }
            }
            catch (err) {
                if (err.response.status === 450) {
                    setErrorText({ ...errorText, username: "Username already exists" })
                }
            }
        }
        props.setLoading(false)
    }

    const isInputFilled = (e) => {
        let result = true
        let currentErrorText = {
            username: "",
            password: "",
            confirmPassword: "",
            fullname: "",
            email: ""
        }
        let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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

        if (e.target.confirmPassword.value === "") {
            currentErrorText.confirmPassword = "Confirm password is required"
            result = false
        }
        else if (e.target.password.value !== e.target.confirmPassword.value) {
            currentErrorText.confirmPassword = "Passwords do not match"
            result = false
        }

        if (e.target.fullname.value === "") {
            currentErrorText.fullname = "Full name is required"
            result = false
        }

        if (e.target.email.value === "") {
            currentErrorText.email = "Email is required"
            result = false
        }
        else if (!mailRegex.test(e.target.email.value)) {
            currentErrorText.email = "Invalid email form"
            result = false
        }

        setErrorText({ ...currentErrorText })
        return result
    }

    return (
        <div className='modal-widget'>
            <div className='popup-signup-content'>
                <div className="modal-widget-top">
                    <img src={logo} alt="logo" className='logo' />
                    <h1 id="app-name">CAIN</h1>
                    <button onClick={() => props.onClick(false)}>
                        <CloseIcon width={35} height={35} />
                    </button>
                </div>
                {showSuccess ?
                    <div className='success'>
                        <p>Your account has been created successfully</p>
                        <p>You can now log in</p>
                        <img src={Success} alt="" />
                    </div> :
                    <form onSubmit={handleLoginSubmit}>
                        <div className='left'>
                            <label htmlFor="username">Username</label>
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

                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <p className="inputForm">
                                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" />
                                {showConfirmPassword ? <EyeIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} width={21} height={21} />
                                    : <EyeCloseIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} width={21} height={21} />}
                            </p>
                            <label htmlFor="confirmPassword-error" className='errorField'>{errorText.confirmPassword}</label>
                        </div>
                        <div className='right'>
                            <label htmlFor="fullname">Full name</label>
                            <p className="inputForm">
                                <input type="text" id="fullname" />
                            </p>
                            <label htmlFor="fullname-error" className='errorField'>{errorText.fullname}</label>

                            <label htmlFor="email">Email</label>
                            <p className="inputForm">
                                <input type="text" id="email" />
                            </p>
                            <label htmlFor="email-error" className='errorField'>{errorText.email}</label>
                            <button type="submit">Sign up</button>
                        </div>

                    </form>
                }

            </div>
        </div>
    )
}

export default SignupWidget