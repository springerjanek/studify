import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "./ProfileForm.schema";
import { Button } from "@/app/shared/ui/Button";
import { Form, Label } from "@/app/shared/ui/Form";
import { WhiteInput } from "@/app/shared/ui/Form/Input";
import { Error } from "@shared/ui/Form/Error";

export type ProfileFormValues = {
  name: string;
  email: string;
};

export const ProfileForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (data: ProfileFormValues) => void;
  loading: boolean;
}) => {

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<ProfileFormValues>({
      resolver: yupResolver(profileSchema),
    });
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="items-start">
      <Label htmlFor="name">Name</Label>
      <Error>{errors.name?.message}</Error>
      <WhiteInput
        id="name"
        register={register("name")}
        type="text"
        placeholder="Name"
      />
      <Label htmlFor="email" className="mt-2">E-mail</Label>
      <Error>{errors.email?.message}</Error>
      <WhiteInput
        id="email"
        register={register("email")}
        type="email"
        placeholder="E-mail"
      />
      <Button className="mt-4" $primary disabled={loading}>
        Update Account
      </Button>
    </Form>
  );
};
