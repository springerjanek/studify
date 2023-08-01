import { styled } from "styled-components";

export const ModalContainer = styled.div`
  height: 500px;
  width: 500px;
  text-align: center;
  border-radius: 15px;
  background-color: white;
  color: #6f48eb;
  overflow-y: auto;

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

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TimeFramesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

export const TimeFrame = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  padding-left: 20px;
  background-color: #6f48eb;
  color: white;
  text-align: left;
  border-radius: 10px;
  p {
    margin: 0;
  }
`;

export const DraggableWrapper = styled.div`
  background-color: #1e063b;
  padding: 8px;
  border-radius: 12px;
`;
