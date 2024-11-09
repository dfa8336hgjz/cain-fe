import logo from '../../assets/logo.png'
import '../../styles/header.css'

const HeaderLandingPage = ({ loginPopup, signupPopup }) => {
    return (
        <div className="landing-page-header">
            <img src={logo} alt="logo" className='logo' />
            <h1 id="app-name">CAIN</h1>
            <button onClick={() => loginPopup(true)} className='loginBtn'>Login</button>
            <button onClick={() => signupPopup(true)} className='signupBtn'>Sign up</button>
        </div>
    )
}

export default HeaderLandingPage