import { useRef, ReactNode } from "react";
import { useElementOnScreen } from "../hooks/useElementOnScreen";
import { AnimateContainer } from "./AnimateIn.styled";

export const AnimateIn = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <AnimateContainer ref={ref} $onScreen={onScreen}>
      {children}
    </AnimateContainer>
  );
};
