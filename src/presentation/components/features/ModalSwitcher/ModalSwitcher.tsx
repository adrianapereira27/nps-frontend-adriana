import { useState } from 'react';
import { InitialModal } from '../../modules/InitialModal';
import { NpsModal } from '../../modules/NpsModal';
import { FeedbackModal } from '../../modules/FeedbackModal';

export const ModalSwitcher = () => {
  const [step, setStep] = useState(0);   // Estado para controlar o fluxo dos modais
  const [login, setLogin] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
      
  const handleStart = (userLogin: string) => {
    setLogin(userLogin);
    setStep(1); // Avança para o NpsModal
  };

  const handleScoreSubmit = (newScore: number) => {
    setScore(newScore);
    setStep(2); // Avança para o FeedbackModal
  };

  const handleFeedbackFinish = () => {
    setStep(0); // Reseta para o InitialModal após finalizar o feedback
    setLogin('');   
    setScore(null);
    setSelectedOption(null);
  };

  const handleReturn = () => {
    setStep(0); // Retorna para o InitialModal
    setLogin('');   
    setScore(null);
  };

  switch (step) {
    case 0:
      return <InitialModal onStart={handleStart} />;
    case 1:
      return (
        <NpsModal
          setScore={handleScoreSubmit}   // Passa o score e avança para o FeedbackModal
          onReturn={handleReturn}          
          login={login}
      />
      );
    case 2:      
      return <FeedbackModal 
        onFinish={handleFeedbackFinish}
        onReturn={handleReturn}
        login={login}
        score={score ?? 0}  // Garante que o score seja um número
        selectedOption={selectedOption}
        onOptionSelect={setSelectedOption} // Callback para passar a opção selecionada
      />;
    default:
      return null;
  }
};
