import { useState } from "react";
import { StyledLink } from "../../shared/ui/Link";
import {
  HamburgerIconWrapper,
  HamburgerMenu,
  NavbarContainer,
} from "./Navbar.styled";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  return (
    <>
      <NavbarContainer>
        <StyledLink to="/features">Features</StyledLink>
        <StyledLink to="/about">About Us</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
        <StyledLink to="/sign-in">Sign In</StyledLink>
        <HamburgerIconWrapper>
          <MenuIcon onClick={() => setShowHamburgerMenu(!showHamburgerMenu)} />
        </HamburgerIconWrapper>
      </NavbarContainer>
      {showHamburgerMenu && (
        <HamburgerMenu>
          <StyledLink to="/features">Features</StyledLink>
          <StyledLink to="/about">About Us</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
          <StyledLink to="/sign-in">Sign In</StyledLink>
        </HamburgerMenu>
      )}
    </>
  );
};
