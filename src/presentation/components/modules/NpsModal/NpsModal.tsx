import { useState, useEffect } from 'react';
import * as S from "./styles";
import { AppBar } from '../../features/AppBar';
import { RatingScale } from '../../features/RatingScale';
import { Button } from '../../elements/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

interface NpsModalProps {
  setScore: (score: number) => void;
  onReturn: () => void;  
  login: string;
}

export const NpsModal = ({ setScore, onReturn, login }: NpsModalProps) => {
  const [score, setLocalScore] = useState<number | null>(null);
  const [question, setQuestion] = useState<string>('');

  useEffect(() => {
    // Fazer a requisição ao backend para obter a pergunta com axios
    axios.get(`https://localhost:7061/api/nps`, {
      params: {
        UserId: login, 
      },
    })
    .then(response => {      
      if (response.data) { 
        setQuestion(response.data);
      }
    })
    .catch(error => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          "Erro ao buscar a pergunta";
      toast.error(errorMessage);
      onReturn();
    });      
  }, [login]);
      
  const handleSend = () => {
    if (score !== null) {
      setScore(score);     // Atualiza o score no componente pai (ModalSwitcher)      
    } else {
      toast.warning('Selecione uma nota antes de enviar.');
    }
  };

  return (
    <S.NpsDialog>
      <AppBar />
      <h4>{question || "Carregando pergunta..."}</h4>
      <h6>Sendo zero não recomendaria e 10 recomendaria totalmente</h6>
      <RatingScale score={score} setScore={setLocalScore} />
      <div style={{ textAlign: 'right' }}>
        <Button 
          label="Responder depois" 
          onClick={onReturn}         
          type="button"        
        />
        <Button 
          label="Enviar" 
          onClick={handleSend}         
          type="button" 
          color='#00AB5D' 
        />
      </div>
    </S.NpsDialog>
  );
};