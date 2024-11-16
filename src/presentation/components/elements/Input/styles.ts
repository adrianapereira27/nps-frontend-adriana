import styled from "styled-components";

export const InputStyle = styled.input`
    margin-left: 60px;
    margin-top: 50px;
    padding: 13px;    
    border: 1px solid black;
    border-radius: 4px;
    outline: none;
    transition: border-color .2s ease;
    &:focus {
        border-color: #19de;
        & + span {
            top: -8px;
        }
    }
`;
export const LabelStyle = styled.label`
    position: relative;
`;
export const SpanStyle = styled.span<{ type: string }>`
    ${({ type }) => 
        type !== 'radio' && type !== 'checkbox' && `
            top: 4px;
            z-index: 2;
            left: 10px;
            color: #999;
            cursor: text;
            padding: 0 4px;
            font-size: 12px;
            background: #fff;
            font-weight: bold;
            position: absolute;
            transition: all .3s ease;
            background-color: #1e1e1e;
        `
    }
`;