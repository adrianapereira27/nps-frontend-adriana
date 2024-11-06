import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModalSwitcher } from './presentation/components/features/ModalSwitcher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [step, setStep] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  const handleStart = (name: string) => {
    setUserName(name);
    setStep(1);  // Próximo modal: NPS
  };

  const handleNpsSubmit = (score: number) => {
    console.log(`Nota do NPS: ${score}`);
    setStep(2);  // Próximo modal: Feedback
  };

  const handleFeedbackFinish = () => {
    alert('Obrigado pelo seu feedback!');
    setStep(0);  // Resetar para o início ou finalizar.
  };

  const handleReturn = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ModalSwitcher 
                step={step}
                onStart={handleStart}
                onNpsSubmit={handleNpsSubmit}
                onFeedbackFinish={handleFeedbackFinish} 
                onReturn={handleReturn} 
                login={userName}            
              />
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
