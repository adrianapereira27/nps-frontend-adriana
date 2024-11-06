import styled from "styled-components";

export const ButtonStyle = styled.button<{ color?: string }>`
  width: auto;  
  border: ${({ color }) => (color ? `1px solid ${color}` : '1px solid black')};
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;    
  border-radius: 6px;
  background-color: ${({ color }) => color || 'white'};
  font-weight: 700;
  margin: 10px;
  
  &:hover {
    background-color: ${({ color }) => color || 'white'};
    opacity: 0.8;
  }
`;