import React from 'react';
import * as S from './styles';

interface RatingScaleProps {
  score: number|null;
  setScore: (value: number) => void;
}

export const RatingScale: React.FC<RatingScaleProps> = ({ score, setScore }: RatingScaleProps) => {
  return (
    <S.ScaleContainer>
      {[...Array(11)].map((_, i) => (
        <S.RatingButton
          key={i}
          score={i}
          $selected={score === i}
          aria-pressed={score === i}
          onClick={() => setScore(i)}
        >
          {i}
        </S.RatingButton>
      ))}
    </S.ScaleContainer>
  );
};
