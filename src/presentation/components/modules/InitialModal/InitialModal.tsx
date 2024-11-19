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
  const [isLoading, setIsLoading] = useState(false);
    
  const handleStart = () => {    
    if (login) {
      onStart(login);
    } else {
      toast.warning('Insira seu login.');
    }
  };

  const handleDownloadCsv = async () => {    
    setIsLoading(true);
    
    toast.info('Iniciando download...');

    try {  
      // Fazer a requisição como arraybuffer
      const response = await fetch(`https://localhost:7061/api/nps/export`, {
        method: 'GET',
        headers: {
          'Accept': 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Pegar o nome do arquivo do header
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'nps_export.csv';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/["']/g, '');
        }
      }
      
      // Converter a resposta para blob
      const blob = await response.blob();

      // Criar URL e link para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Download realizado com sucesso!');
    } catch (error) {
      console.error('Erro na exportação:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer download do arquivo');
    } finally {
      setIsLoading(false);
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
        label="Iniciar" 
        onClick={handleStart}         
        type="button" 
        disabled={!login} 
        color='#00AB5D' 
      />      
      <Button 
        label="CSV Log" 
        onClick={handleDownloadCsv}         
        type="button"          
        color='#00AB5D'
        disabled={isLoading} 
      />     
    </S.InitialDialog>
  );
};