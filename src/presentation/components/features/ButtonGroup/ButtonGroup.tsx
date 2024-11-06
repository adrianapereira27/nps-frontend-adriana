import { useState } from 'react';
import * as S from './styles';

// Mapeamento das opções para valores numéricos
const options = [        
    { label: "Product access", value: 1 },
    { label: "Connection / Internet", value: 2 },
    { label: "Slowness / Crash", value: 3 },
    { label: "Interface / Appearance", value: 4 },
    { label: "Bugs", value: 5 },
    { label: "Others", value: 6 },         
  ];

interface ButtonGroupProps {
  onSelect: (value: number) => void;
}

export const ButtonGroup = ({ onSelect }: ButtonGroupProps) => {
    const [selectedValue, setSelectedValue] = useState<number | null>(null);

    const handleSelect = async (value: number) => {
      setSelectedValue(value);    
      onSelect(value);   // Passa a opção selecionada para o FeedbackModal  
    };

    return (
        <S.ButtonContainer>
        {options.map((option) => (
          <S.Button
            key={option.value}
            isSelected={selectedValue === option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </S.Button>
        ))}
      </S.ButtonContainer>
    );
};
