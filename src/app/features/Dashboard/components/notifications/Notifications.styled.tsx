import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;

  @media only screen and (min-width: 300px) {
    width: 85%;
  }
  @media only screen and (min-width: 450px) {
    height: 600px;
  }
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
  @media only screen and (min-width: 1200px) {
    width: 45%;
  }
  @media only screen and (min-width: 1440px) {
    width: 35%;
  }
`;

export const WhiteLine = styled.div`
height: 1px;
width: 100%;
    background-color: white;
`

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: solid white 1px;
  padding: 24px;
`;