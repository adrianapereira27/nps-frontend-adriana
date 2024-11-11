import styled from 'styled-components';

interface ButtonProps {
  score: number;
  $selected?: boolean;
}

export const ScaleContainer = styled.div`
  display: flex;
  justify-content: center; 
  margin: 10px 0; 
`;

export const RatingButton = styled.button<ButtonProps>`
  width: 50px;
  height: 50px;
  margin: 5px;  
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.5s ease, border-color 0.5s ease;

  /* Cor quando o botão está selecionado */
  background-color: ${({ $selected, score }) => 
    $selected ? 
      (score >= 9 ? '#00ab5d' : score >= 7 ? '#f76800' : '#ff3636') 
      : '#fff'};
  color: ${({ $selected }) => ($selected ? '#333' : 'black')};

  /* Hover: Exibe a cor dependendo da nota */
  &:hover {
    background-color: ${({ score }) => 
      score >= 9 ? '#aae3c9' : score >= 7 ? '#fccdaa' : '#ff8f8f'};
    color: #333;
    border: none;
  }

  /* Borda padrão para os botões */
  border: ${({ $selected }) => ($selected ? 'none' : '1px solid #ccc')};
`;