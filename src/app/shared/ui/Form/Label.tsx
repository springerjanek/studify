import { ReactNode } from "react";
import { styled } from "styled-components";

const StyledLabel = styled.label`
  font-size: 18px;
`;

export const Label = ({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor: string;
}) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};
