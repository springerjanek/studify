import { styled } from "styled-components";

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  img:nth-child(2) {
    transition-delay: 200ms;
  }

  img:nth-child(3) {
    transition-delay: 400ms;
  }

  @media only screen and (min-width: 300px) {
    img {
      width: 25%;
    }
  }

  @media only screen and (min-width: 768px) {
    img {
      width: 100px;
    }
  }

  @media only screen and (min-width: 1000px) {
    img {
      width: 150px;
    }
  }

  @media only screen and (min-width: 1440px) {
    img {
      width: 200px;
    }
  }
`;
