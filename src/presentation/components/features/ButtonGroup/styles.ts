import styled from 'styled-components';

interface ButtonProps {
  isSelected: boolean;
}

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
`;

export const Button = styled.button<ButtonProps>`
  flex: 1 1 30%; // Ocupa cerca de um terço da linha
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px 10px;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#FF8F8F' : '#fff')};
  color: #333;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#FF8F8F' : '#f0f0f0')};
  }
`;
