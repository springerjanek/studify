import { StyledLink } from "../../shared/ui/Link";
import { NavbarContainer } from "./Navbar.styled";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <StyledLink to="/features">Features</StyledLink>
      <StyledLink to="/about">About Us</StyledLink>
      <StyledLink to="/contact">Contact</StyledLink>
      <StyledLink to="/sign-in">Sign In</StyledLink>
    </NavbarContainer>
  );
};
