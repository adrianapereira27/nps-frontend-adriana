import { SetStateAction, useState } from 'react';
import * as S from "./styles";
import { AppBar } from '../../features/AppBar';
import { Button } from '../../elements/Button';
import { Textarea } from '../../elements/Textarea';
import { ButtonGroup } from '../../features/ButtonGroup';
import { toast } from 'react-toastify';
import axios from 'axios';

interface FeedbackModalProps {
  onFinish: () => void;
  onReturn: () => void;
  login: string;  
  score: number;
  selectedOption: number | null;
  onOptionSelect: (value: number) => void;
}

export const FeedbackModal = ({ onFinish, onReturn, login, score, selectedOption, onOptionSelect }: FeedbackModalProps) => {
  const [feedback, setFeedback] = useState<string>('');
    
  const handleFinish = async () => {
    if(selectedOption == null){
      selectedOption = 0;
    }
    try {
      await axios.post('https://localhost:7061/api/nps', {
        UserId: login,
        Score: score,
        Description: feedback,  
        CategoryNumber: selectedOption,       
      });
      toast.success('Nota enviada com sucesso!');
      onFinish();
    } catch (error) {
      toast.error('Erro ao enviar a nota');
    }
  };  

  return (
    <S.FeedbackDialog>
      <AppBar />
      <h4>We appreaciate your feedback!</h4>
      {score < 7 && (
        <>
          <h6>How can we improve? Use the buttons or the comments field below to deepen your evaluation.</h6>
          <ButtonGroup onSelect={onOptionSelect} />
        </>
      )}
      <br />
      <Textarea
        placeholder="Please, if you wish, detail the reason"
        value={feedback}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFeedback(e.target.value)}
        width="600px" 
      />
      <div style={{ textAlign: 'right' }}>
        <Button 
          label="Skip" 
          onClick={onReturn}         
          type="button"        
        />
        <Button 
          label="Send" 
          onClick={handleFinish}         
          type="button" 
          color='#00AB5D' 
        />
      </div>
    </S.FeedbackDialog>
  );
};