import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 250px;
  min-height: 100vh;

  @media only screen and (min-width: 300px) {
    p {
      font-size: 18px;
      padding: 20px;
    }
    flex-direction: column;
    gap: 0px;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    gap: 50px;
    p {
      width: 50%;
    }
    /* &:nth-child(3) {
      margin-top: -100px;
    } */
  }

  @media only screen and (min-width: 1000px) {
    flex-direction: row;
    p {
      font-size: 22px;
      width: 40%;
    }
    &:nth-child(1) {
      margin-top: -100px;
    }
  }
`;
