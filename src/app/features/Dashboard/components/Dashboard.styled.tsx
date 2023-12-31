import { styled } from "styled-components";
import "react-calendar/dist/Calendar.css";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  width: 100%;
  @media only screen and (min-width: 300px) {
    flex-flow: column-reverse;
    align-items: center;
    gap: 50px;
    margin: 0px;
    padding-top: 50px;
  }

  @media only screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 70px;
    padding: 20px;
  }
  @media only screen and (min-width: 1440px) {
    gap: 200px;
  }
  @media only screen and (min-width: 1600px) {
    gap: 400px;
  }

`;

export const UserNavContainer = styled.div`
  padding: 16px;

  @media only screen and (min-width: 300px) {
    order: -1;
    width: fit-content;
    align-self: flex-end;
  }

  @media only screen and (min-width: 769px) {
    align-self: flex-start;
   order: 1;
  }
`;

export const TutorialHeading = styled.h2`
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  font-weight: 500;
  cursor: pointer;

  @media only screen and (min-width: 300px) {
    display: none
  }
  @media only screen and (min-width: 769px) {
    display: flex;
  }
`;