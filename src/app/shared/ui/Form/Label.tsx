import { ReactNode } from "react";
import { styled } from "styled-components";

const StyledLabel = styled.label`
  font-size: 18px;
`;

export const Label = ({
  children,
  htmlFor,
  className,
}: {
  children: ReactNode;
  htmlFor: string;
  className?: string;
}) => {
  return (
    <StyledLabel htmlFor={htmlFor} className={className}>
      {children}
    </StyledLabel>
  );
};
