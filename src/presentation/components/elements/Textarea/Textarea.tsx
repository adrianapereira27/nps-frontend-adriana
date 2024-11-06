import React from "react";
import * as S from './styles';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  width?: string;
  rows?: number;
  disabled?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder = "Digite aqui...",
  value,
  onChange,
  width,
  rows = 2,
  disabled = false,
}) => {
  return (
    <S.TextareaStyle
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      width={width}
      rows={rows}
      disabled={disabled}
    />
  );
};
