import { StyledLink } from "@components/shared/ui/Link";
import { NavbarContainer } from "./style";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <StyledLink to="/">About</StyledLink>
      <StyledLink to="/">Sign Up</StyledLink>
      <StyledLink to="/">Sign In</StyledLink>
    </NavbarContainer>
  );
};
