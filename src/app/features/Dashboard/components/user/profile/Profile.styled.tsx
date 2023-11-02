import { styled } from "styled-components";

export const Container = styled.div`
  margin-left: 50px;
  padding-bottom: 36px;

  @media only screen and (min-width: 300px) {
    width: 60%;
  }
  @media only screen and (min-width: 420px) {
    width: 50%;
  }
  @media only screen and (min-width: 600px) {
    width: 42%;
  }
  @media only screen and (min-width: 768px) {
    width: 42%;
  }
  @media only screen and (min-width: 1000px) {
    width: 38%;
  }
  @media only screen and (min-width: 1440px) {
    width: 20%;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const DragAndDropContainer = styled.div`
  position: relative;
  border: solid white 1px;
  border-radius: 100%;

  svg {
    position: absolute;
    padding: 4px;
    background-color: black;
    color: white;
    border-radius: 6px;
    cursor: pointer;

    @media only screen and (min-width: 300px) {
      right: -20px;
    }
    @media only screen and (min-width: 768px) {
      right: 0px;
    }
  }

  @media only screen and (min-width: 300px) {
    width: 200px;
    height: 200px;
  }

  @media only screen and (min-width: 768px) {
    width: 384px;
    height: 384px;
  }
  @media only screen and (min-width: 1440px) {
    gap: 200px;
  }
  @media only screen and (min-width: 1600px) {
    gap: 400px;
  }
`;

export const AvatarContainer = styled.div`
  @media only screen and (min-width: 300px) {
    img {
      width: 200px;
      height: 200px;
    }
  }
  @media only screen and (min-width: 768px) {
    img {
      width: 384px;
      height: 384px;
    }
  }
`;