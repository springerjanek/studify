import { styled } from "styled-components";

export const AssignmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: fit-content;
  width: 22%;
  padding: 25px;
  border-radius: 10px;
  background-color: #6140a6;

  button {
    align-self: center;
  }

  @media only screen and (min-width: 300px) {
    width: 65%;
  }
  @media only screen and (min-width: 650px) {
    width: 55%;
  }
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
  @media only screen and (min-width: 1000px) {
    width: 45%;
  }
  @media only screen and (min-width: 1200px) {
    width: 40%;
  }
  @media only screen and (min-width: 1440px) {
    width: 35%;
  }
  @media only screen and (min-width: 1600px) {
    width: 27%;
  }
`;

export const AssignmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;
