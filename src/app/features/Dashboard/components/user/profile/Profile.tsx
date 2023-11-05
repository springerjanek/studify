import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/shared/utils/auth";
import { useQueryClient } from "@tanstack/react-query";
import { DragAndDrop } from "./DragAndDrop";
import { ProfileForm, ProfileFormValues } from "./forms/ProfileForm";
import { handleProfileFormSubmit } from "./forms/formSubmitHandler";
import { updatePassword } from "./utils/updatePassword";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { Separator } from "@/components/ui/separator";
import { WhiteInput } from "@/app/shared/ui/Form/Input";
import { Button } from "@/app/shared/ui/Button";
import { Container, ContentWrapper } from "./Profile.styled";

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const onSubmit = async (data: ProfileFormValues) => {
    await handleProfileFormSubmit({
      data,
      setLoading,
      toast,
      currentUser,
      queryClient,
    });
  };

  return (
    <DashboardLayout>
      <Container>
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          <p>Manage your profile and account settings.</p>
        </div>

        <Separator className="my-6" />

        <ContentWrapper>
          <DragAndDrop currentUser={currentUser}/>

          <h3>Account</h3>

          <ProfileForm onSubmit={onSubmit} loading={loading} />

          <label className="mt-6 mb-2">Password*</label>
          <WhiteInput
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="mt-4"
            $primary
            onClick={() => updatePassword({ password, toast })}
          >
            Update Password
          </Button>
        </ContentWrapper>
      </Container>
    </DashboardLayout>
  );
};
