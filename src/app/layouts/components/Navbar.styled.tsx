import { styled } from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: right;
  gap: 20px;
  padding: 10px 25px;

  @media only screen and (min-width: 300px) {
    a {
      display: none;
    }
    padding: 0;
  }
`;

export const HamburgerIconWrapper = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
    padding: 10px 15px;
    z-index: 1001;
  }
`;

export const HamburgerMenu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 100%;
  color: white;
  background-color: black;

  z-index: 1000;
  overflow: hidden;
`;
