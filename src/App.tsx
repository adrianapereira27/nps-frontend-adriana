import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModalSwitcher } from './presentation/components/features/ModalSwitcher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ModalSwitcher />
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>    
  );
}

export default App;
