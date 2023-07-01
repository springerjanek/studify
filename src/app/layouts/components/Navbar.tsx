import { useState } from "react";
import { useAuth } from "@shared/utils/auth";
import { StyledLink } from "../../shared/ui/Link";
import {
  HamburgerIconWrapper,
  HamburgerMenu,
  NavbarContainer,
} from "./Navbar.styled";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const { session } = useAuth();
  return (
    <>
      <NavbarContainer>
        <StyledLink to="/features">Features</StyledLink>
        <StyledLink to="/about">About Us</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
        {!session ? (
          <StyledLink to="/sign-in">Sign In</StyledLink>
        ) : (
          <StyledLink to="/dashboard">Dashboard</StyledLink>
        )}
        <HamburgerIconWrapper>
          <MenuIcon onClick={() => setShowHamburgerMenu(!showHamburgerMenu)} />
        </HamburgerIconWrapper>
      </NavbarContainer>
      {showHamburgerMenu && (
        <HamburgerMenu>
          <StyledLink to="/features">Features</StyledLink>
          <StyledLink to="/about">About Us</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
          {!session ? (
            <StyledLink to="/sign-in">Sign In</StyledLink>
          ) : (
            <StyledLink to="/dashboard">Dashboard</StyledLink>
          )}
        </HamburgerMenu>
      )}
    </>
  );
};
