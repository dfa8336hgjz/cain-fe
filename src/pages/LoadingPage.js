import Loading from '../assets/loading.gif'
import '../styles/loadingPage.css'

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <img src={Loading}></img>
        </div>
    )
}

export default LoadingPage;