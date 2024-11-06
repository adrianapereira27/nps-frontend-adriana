import React, { useState } from 'react';
import * as S from "./styles";
import { AppBar } from '../../features/AppBar';
import { Input } from "../../elements/Input";
import { Button } from '../../elements/Button';
import { toast } from 'react-toastify';

interface InitialModalProps {
  onStart: (login: string) => void;
}

export const InitialModal = ({ onStart }: InitialModalProps) => {
  const [login, setLogin] = useState<string>('');  
  
  const handleStart = () => {    
    if (login) {
      onStart(login);
    } else {
      toast.warning('Insira seu login.');
    }
  };

  return (
    <S.InitialDialog>
      <AppBar />      
      <h2 style={{textAlign: 'center'}}>Pesquisa NPS</h2>
      <Input 
        type="text" 
        placeholder="Login" 
        value={login}  
        id="input-login"
        size={40}              
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLogin(e.target.value);          
        }}        
      />      
      <Button 
        label="Start" 
        onClick={handleStart}         
        type="button" 
        disabled={!login} 
        color='#00AB5D' 
      />
    </S.InitialDialog>
  );
};