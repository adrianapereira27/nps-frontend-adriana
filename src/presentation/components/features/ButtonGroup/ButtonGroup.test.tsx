import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';
import { describe, expect, it } from 'vitest';
import { jest } from '@jest/globals';

describe('ButtonGroup', () => {
  it('renderiza o número correto de botões', () => {
    const onSelect = jest.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
  });

  it('chama a callback onSelect com o valor correto quando um botão é clicado', () => {
    const onSelect = jest.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    const button = screen.getByText('Slowness / Crash');
    fireEvent.click(button);

    expect(onSelect).toHaveBeenCalledWith(3);
  });

  it('destaca o botão selecionado', () => {
    const onSelect = jest.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    const button = screen.getByText('Interface / Appearance');
    fireEvent.click(button);

    expect(button).toHaveClass('selected');
  });

  it('limpa o botão anteriormente selecionado quando um novo é clicado', () => {
    const onSelect = jest.fn();
    render(<ButtonGroup onSelect={onSelect} />);

    const firstButton = screen.getByText('Product access');
    const secondButton = screen.getByText('Connection / Internet');

    fireEvent.click(firstButton);
    expect(firstButton).toHaveClass('selected');

    fireEvent.click(secondButton);
    expect(firstButton).not.toHaveClass('selected');
    expect(secondButton).toHaveClass('selected');
  });
});