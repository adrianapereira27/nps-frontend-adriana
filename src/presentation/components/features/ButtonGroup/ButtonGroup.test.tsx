import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';
import { describe, expect, it, vi } from 'vitest';
import 'jest-styled-components';

describe('ButtonGroup', () => {
  it('renderiza o número correto de botões', () => {
    const onSelect = vi.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
  });

  it('chama a callback onSelect com o valor correto quando um botão é clicado', () => {
    const onSelect = vi.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    const button = screen.getByText('Slowness / Crash');
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledWith(3);
  });

  it('destaca o botão selecionado', () => {
    const onSelect = vi.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    // Clica no botão "Product access"
    const button = screen.getByText('Product access');
    fireEvent.click(button);

    // Verifica se o onSelect foi chamado com o valor correto
    expect(onSelect).toHaveBeenCalledWith(1);

    // Verifica se o botão tem o atributo de selecionado
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('permite selecionar diferentes opções', () => {
    const onSelect = vi.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    // Clica em uma opção
    const firstButton = screen.getByText('Product access');
    fireEvent.click(firstButton);
    expect(onSelect).toHaveBeenCalledWith(1);
    expect(firstButton).toHaveAttribute('aria-pressed', 'true');

    // Clica em outra opção
    const secondButton = screen.getByText('Bugs');
    fireEvent.click(secondButton);
    expect(onSelect).toHaveBeenCalledWith(5);
    expect(secondButton).toHaveAttribute('aria-pressed', 'true');
    expect(firstButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('renderiza todas as opções corretamente', () => {
    const onSelect = vi.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    expect(screen.getByText('Product access')).toBeInTheDocument();
    expect(screen.getByText('Connection / Internet')).toBeInTheDocument();
    expect(screen.getByText('Slowness / Crash')).toBeInTheDocument();
    expect(screen.getByText('Interface / Appearance')).toBeInTheDocument();
    expect(screen.getByText('Bugs')).toBeInTheDocument();
    expect(screen.getByText('Others')).toBeInTheDocument();
  });
  
});