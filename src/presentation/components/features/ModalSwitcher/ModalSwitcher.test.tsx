import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalSwitcher } from './ModalSwitcher';

// Mock dos componentes internos
vi.mock('../../modules/InitialModal', () => ({
    InitialModal: vi.fn(({ onStart }) => (
      <div data-testid="initial-modal">
        <button onClick={() => onStart('testuser')}>Simular Início</button>
      </div>
    ))
  }));
  
  vi.mock('../../modules/NpsModal', () => ({
    NpsModal: vi.fn(({ setScore, onReturn, login }) => (
      <div data-testid="nps-modal">
        <div>Login: {login}</div>
        <button onClick={() => setScore(8)}>Definir Nota 8</button>
        <button onClick={onReturn}>Voltar</button>
      </div>
    ))
  }));
  
  vi.mock('../../modules/FeedbackModal', () => ({
    FeedbackModal: vi.fn(({ 
      onFinish, 
      onReturn, 
      login, 
      score, 
      onOptionSelect 
    }) => (
      <div data-testid="feedback-modal">
        <div>Login: {login}</div>
        <div>Nota: {score}</div>
        <button onClick={() => onOptionSelect(1)}>Selecionar Opção 1</button>
        <button onClick={onFinish}>Finalizar</button>
        <button onClick={onReturn}>Voltar</button>
      </div>
    ))
  }));

describe('Componente ModalSwitcher', () => {
  it('renderiza o InitialModal inicialmente', () => {
    render(<ModalSwitcher />);
    
    expect(screen.getByTestId('initial-modal')).toBeInTheDocument();
  });

  it('avança para o NpsModal após iniciar com login', () => {
    render(<ModalSwitcher />);
    
    // Simular início com login
    const startButton = screen.getByText('Simular Início');
    fireEvent.click(startButton);
    
    // Verificar que o NpsModal foi renderizado
    expect(screen.getByTestId('nps-modal')).toBeInTheDocument();
    
    // Verificar que o login foi passado corretamente
    expect(screen.getByText('Login: testuser')).toBeInTheDocument();
  });

  it('avança para o FeedbackModal após definir nota no NpsModal', () => {
    render(<ModalSwitcher />);
    
    // Simular início com login
    const startButton = screen.getByText('Simular Início');
    fireEvent.click(startButton);
    
    // Definir nota no NpsModal
    const setScoreButton = screen.getByText('Definir Nota 8');
    fireEvent.click(setScoreButton);
    
    // Verificar que o FeedbackModal foi renderizado
    expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();
    
    // Verificar que o login e a nota foram passados corretamente
    expect(screen.getByText('Login: testuser')).toBeInTheDocument();
    expect(screen.getByText('Nota: 8')).toBeInTheDocument();
  });

  it('permite voltar do NpsModal para InitialModal', () => {
    render(<ModalSwitcher />);
    
    // Simular início com login
    const startButton = screen.getByText('Simular Início');
    fireEvent.click(startButton);
    
    // Voltar para InitialModal
    const returnButton = screen.getByText('Voltar');
    fireEvent.click(returnButton);
    
    // Verificar que voltou para InitialModal
    expect(screen.getByTestId('initial-modal')).toBeInTheDocument();
  });

  it('permite voltar do FeedbackModal para InitialModal', () => {
    render(<ModalSwitcher />);
    
    // Simular fluxo completo
    const startButton = screen.getByText('Simular Início');
    fireEvent.click(startButton);
    
    // Definir nota no NpsModal
    const setScoreButton = screen.getByText('Definir Nota 8');
    fireEvent.click(setScoreButton);
    
    // Voltar para InitialModal
    const returnButton = screen.getByText('Voltar');
    fireEvent.click(returnButton);
    
    // Verificar que voltou para InitialModal
    expect(screen.getByTestId('initial-modal')).toBeInTheDocument();
  });

  it('finaliza o fluxo e reseta estados no FeedbackModal', () => {
    render(<ModalSwitcher />);
    
    // Simular fluxo completo
    const startButton = screen.getByText('Simular Início');
    fireEvent.click(startButton);
    
    // Definir nota no NpsModal
    const setScoreButton = screen.getByText('Definir Nota 8');
    fireEvent.click(setScoreButton);
    
    // Selecionar opção no FeedbackModal
    const selectOptionButton = screen.getByText('Selecionar Opção 1');
    fireEvent.click(selectOptionButton);
    
    // Finalizar fluxo
    const finishButton = screen.getByText('Finalizar');
    fireEvent.click(finishButton);
    
    // Verificar que voltou para InitialModal
    expect(screen.getByTestId('initial-modal')).toBeInTheDocument();
  });
});