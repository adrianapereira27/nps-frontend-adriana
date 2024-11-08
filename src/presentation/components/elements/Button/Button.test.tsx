import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';
import { describe, expect, it } from 'vitest';
import { jest } from '@jest/globals';

describe('Botão', () => {
  it('renderiza o botão com o rótulo correto', () => {
    render(<Button label="Clique-me" />);
    expect(screen.getByText('Clique-me')).toBeInTheDocument();
  });

  it('chama a função onClick quando o botão é clicado', () => {
    const mockOnClick = jest.fn();
    render(<Button label="Clique-me" onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('Clique-me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('desabilita o botão quando a prop disabled é verdadeira', () => {
    render(<Button label="Clique-me" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('define o tipo de botão correto', () => {
    render(<Button label="Enviar" type="submit" />);
    expect(screen.getByText('Enviar')).toHaveAttribute('type', 'submit');

    render(<Button label="Redefinir" type="reset" />);
    expect(screen.getByText('Redefinir')).toHaveAttribute('type', 'reset');

    render(<Button label="Botão" type="button" />);
    expect(screen.getByText('Botão')).toHaveAttribute('type', 'button');
  });
  
});