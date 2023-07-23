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
    align-items: baseline;
  }
  @media only screen and (min-width: 1200px) {
    margin-left: 150px;
    margin-right: 150px;
  }
`;

export const AssignmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22%;
  button {
    width: 50%;
    align-self: center;
  }

  @media only screen and (min-width: 300px) {
    width: 100%;
  }
  @media only screen and (min-width: 450px) {
    width: 70%;
  }
  @media only screen and (min-width: 768px) {
    width: 50%;
    height: 600px;
  }
  @media only screen and (min-width: 1200px) {
    width: 40%;
    height: 650px;
  }
  @media only screen and (min-width: 1440px) {
    width: 30%;
  }
`;

export const AssignmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: white;
  color: black;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow-y: auto;
  p {
    padding: 10px 15px;
  }

  @media only screen and (min-width: 768px) {
    height: 600px;
  }
  @media only screen and (min-width: 1200px) {
    height: 650px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const Test = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 1;
  filter: alpha(opacity = 80);
`;
