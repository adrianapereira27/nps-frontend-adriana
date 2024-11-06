import * as S from './styles';

export function Button({ label, onClick, disabled = false, type, color }: {
    label: string;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void; // usado para quando a função não retorna nada.
    disabled?: boolean;
    color?: string;
}) {
    return (
        <S.ButtonStyle onClick={onClick} disabled={disabled} type={type} color={color}>{label}</S.ButtonStyle>
    );
}

