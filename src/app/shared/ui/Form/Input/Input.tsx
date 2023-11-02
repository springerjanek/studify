import { UseFormRegisterReturn } from "react-hook-form";
import { StyledInput, SecondaryInput } from "./Input.styled";
import { HTMLInputTypeAttribute } from "react";

export const Input = ({
  id,
  register,
  type,
  placeholder,
  width,
}: {
  id: string;
  register: UseFormRegisterReturn<string>;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  width?: string;
}) => {
  return (
    <StyledInput
      id={id}
      type={type}
      placeholder={placeholder}
      $width={width}
      {...register}
    ></StyledInput>
  );
};

export const WhiteInput = ({
  id,
  register,
  type,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  register?: UseFormRegisterReturn<string>;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <SecondaryInput
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      placeholder={placeholder}
      {...register}
    ></SecondaryInput>
  );
};