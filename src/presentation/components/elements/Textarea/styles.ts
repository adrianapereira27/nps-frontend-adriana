import styled from "styled-components";

export const TextareaStyle = styled.textarea<{ width?: string }>`
  width: ${({ width }) => width || '100%'};
  height: 30px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical; /* Permite redimensionar apenas verticalmente */
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;
