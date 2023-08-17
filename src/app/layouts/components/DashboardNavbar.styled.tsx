import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  
  &::after {
    flex: 1;
    content: '';
  }

  @media only screen and (max-width: 768px) {
   flex-direction: column;
  }
`;

export const NavbarContainer = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: right;
  gap: 10px;

  @media only screen and (min-width: 300px) {
    a {
      display: none;
    }
    padding: 0;
  }
  @media only screen and (min-width: 769px) {
    a {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    padding: 10px 25px;
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
  padding-top: 50px;
  color: white;
  background-color: black;
  overflow: hidden;
  z-index: 1000;
`;
