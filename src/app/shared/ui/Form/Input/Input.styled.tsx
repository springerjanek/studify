import { styled } from "styled-components";

export const StyledInput = styled.input<{ $width: string | undefined }>`
  width: ${(props) => props.$width || "50%"};
  border: 0;
  border-radius: 10px;
  padding: 12px;
  font-size: 15px;
  font-family: "Raleway", sans-serif;
  background-color: #6f48eb;
  color: white;
  &::placeholder {
    color: white;
  }
  &:focus {
    outline: 0;
  }
`;

export const SecondaryInput = styled.input`
  padding: 6px;
  width: 66%;
  border-radius: 5px;

  @media only screen and (min-width: 300px) {
    width: 90%;
  }
  @media only screen and (min-width: 768px) {
    width: 75%;
  }
`;