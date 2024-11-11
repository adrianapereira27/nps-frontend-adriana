import { render, screen, fireEvent } from '@testing-library/react';
import { RatingScale } from './RatingScale';
import { describe, expect, it, vi } from 'vitest';
import 'jest-styled-components';

describe('RatingScale', () => {
  it('renderiza o número correto de botões', () => {
    const setScore = vi.fn();
    render(<RatingScale score={5} setScore={setScore} />);

    // Verify that there are 11 rating buttons
    const ratingButtons = screen.getAllByRole('button');
    expect(ratingButtons).toHaveLength(11);

    // Verify that the selected button is the one with the score of 5
    const selectedButton = screen.getByText('5');
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('chama a função setScore quando um botão de classificação é clicado', () => {
    const setScore = vi.fn();
    render(<RatingScale score={3} setScore={setScore} />);

    // Click on the rating button with a score of 7
    const ratingButton = screen.getByText('7');
    fireEvent.click(ratingButton);

    // Verify that the setScore function was called with the correct argument
    expect(setScore).toHaveBeenCalledWith(7);
  });

  it('lida com uma pontuação nula', () => {
    const setScore = vi.fn();
    render(<RatingScale score={null} setScore={setScore} />);
  
    // Verify that none of the buttons are selected
    const ratingButtons = screen.getAllByRole('button');
    ratingButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });
  });
});