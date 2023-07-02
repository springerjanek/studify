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
