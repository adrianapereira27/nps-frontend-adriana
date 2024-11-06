import styled from "styled-components";

export const AppBarContainer = styled.div`
    width: '100%';   
    height: '40px'; 
    display: flex;
    padding: 10px 10px;
    position: sticky;
    text-align: center;
    align-items: center;  
    justify-content: center;  
    background-color: #fff;    
`;

export const LogoImg = styled.style<{ src?: string }>`
    width: 230px;
    height: auto;
    padding: 25px;
    display: flex;
    text-align: center;    
    background-size: cover;    
    background-position: center;  
    object-fit: contain;  
    background-image: url(${(props) => props.src});    
`;
