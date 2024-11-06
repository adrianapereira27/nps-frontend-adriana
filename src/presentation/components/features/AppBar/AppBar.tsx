import Logo from "../../../../application/assets/Logo_AmbevTech.png";
import * as S from "./styles";

export function AppBar() {
  return (
    <S.AppBarContainer>
      <S.LogoImg
        src={Logo}  // Caminho para a logo           
      />
    </S.AppBarContainer>
  );
}
