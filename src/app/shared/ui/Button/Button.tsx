import { styled } from "styled-components";

export const Button = styled.button<{
  $primary?: boolean;
}>`
  width: fit-content;
  padding: 12px;
  font-family: "Raleway", sans-serif;
  font-size: 17px;
  font-weight: 600;
  border-color: white;
  border-radius: 8px;
  background-color: ${(props) => (props.$primary ? "white" : "#6f48eb")};
  color: ${(props) => (props.$primary ? "#6f48eb" : "white")};
  cursor: pointer;
`;
