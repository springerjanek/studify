import { useRef, ReactNode } from "react";
import { useElementOnScreen } from "../hooks/useElementOnScreen";
import "../assets/styles.css";

export const AnimateIn = ({
  children,
  photos,
}: {
  children: ReactNode;
  photos?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <div
      ref={ref}
      className={`${onScreen && photos ? "photos-slide" : ""}`}
      style={{
        opacity: onScreen ? 1 : 0,
        translate: onScreen ? "none" : "0 2rem",
        transition: "600ms ease-in-out",
      }}
    >
      {children}
    </div>
  );
};
