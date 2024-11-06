import styled from "styled-components";
 
export const InitialDialog = styled.div`
    position: fixed; /* Fixa o modal na tela */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Centraliza o modal horizontal e verticalmente */    
    z-index: 1000; /* Certifica que o modal estará acima de outros elementos */
    margin: auto;
    width: 700px;
    min-height: 400px;
    padding: 20px;
    border: none;    
    border-radius: 8px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;