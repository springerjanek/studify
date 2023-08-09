import { styled } from "styled-components";

export const AssignmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 22%;
  height: fit-content;
  gap: 40px;
  padding: 25px;
  border-radius: 10px;
  background-color: #6140a6;

  button {
    align-self: center;
  }

  @media only screen and (min-width: 300px) {
    width: 85%;
  }
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
  @media only screen and (min-width: 1200px) {
    width: 40%;
  }
  @media only screen and (min-width: 1440px) {
    width: 23%;
  }
`;

export const AssignmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;
