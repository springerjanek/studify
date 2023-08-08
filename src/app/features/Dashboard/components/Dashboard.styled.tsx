import { styled } from "styled-components";
import "react-calendar/dist/Calendar.css";

export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  @media only screen and (min-width: 300px) {
    flex-flow: column-reverse;
    align-items: center;
    gap: 50px;
    margin: 0px;
    padding: 20px;
    padding-top: 20px;
  }

  @media only screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
  }
  @media only screen and (min-width: 1200px) {
    margin-left: 150px;
    margin-right: 150px;
  }
`;