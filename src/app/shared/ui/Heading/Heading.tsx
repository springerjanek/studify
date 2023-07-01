import { styled } from "styled-components";

export const Heading = styled.h1<{ $bold?: boolean }>`
  font-size: 24px;
  font-weight: ${(props) => (props.$bold ? "600" : "400")};
`;
