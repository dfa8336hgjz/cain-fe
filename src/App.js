import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div>
        <AppRoutes />
        <ToastContainer
          autoClose={1500} />
      </div>
    </Router>
  );
}

export default App;