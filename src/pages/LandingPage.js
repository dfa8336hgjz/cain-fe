import HeaderLandingPage from '../components/headers/HeaderLandingPage';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import instagramIcon from '../assets/icons/instagram.png'
import facebookIcon from '../assets/icons/facebook.png'
import githubIcon from '../assets/icons/github.png'
import '../styles/landingPage.css'
import '../styles/header.css'
import LoginWidget from '../components/widgets/LoginWidget';
import SignupWidget from '../components/widgets/SignupWidget';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const [loginPopup, setLoginPopup] = useState(false);
    const [signupPopup, setSignupPopup] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/notebooks');
        }
    })

    return (
        <div className="landing-page">
            {loginPopup ? <LoginWidget onClick={setLoginPopup} /> : null}
            {signupPopup ? <SignupWidget onClick={setSignupPopup} /> : null}
            <HeaderLandingPage loginPopup={setLoginPopup} signupPopup={setSignupPopup} />
            <div className='landing-page-content'>
                <img src={logo} alt="" className='logo' />
                <div>
                    <h3>NICE TO MEET YOU, I'M CAIN</h3>
                    <p>An <i>AI-powered notebook assistant</i> that helps you interact with documents, automate tasks, and improve your workflow through conversation</p>
                    <button onClick={() => {
                        setLoginPopup(true);
                    }}>Let's start</button>
                </div>
            </div>
            <div className='footer'>
                <div className='footer-content-1'>
                    <div className='footer-content-11'>
                        <img src={logo} alt="" className='logo' />
                        <h1 id="app-name" style={{ fontSize: '300%' }}>CAIN</h1>
                    </div>
                    <p>© Created by Phung Minh Chien</p>
                </div>
                <div className='footer-content-2'>
                    <div className='footer-content-21'>
                        <h3>Contact</h3>
                        <p>FAQ</p>
                    </div>
                    <div className='footer-content-22'>
                        <a href="https://www.instagram.com/pmc_9.10/">
                            <button>
                                <img src={instagramIcon} alt="" />
                            </button>
                        </a>
                        <a href="https://www.facebook.com/minhchien.phung.79069/">
                            <button>
                                <img src={facebookIcon} alt="" />
                            </button>
                        </a>
                        <a href="https://github.com/dfa8336hgjz">
                            <button>
                                <img src={githubIcon} alt="" />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage