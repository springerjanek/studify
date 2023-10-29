import { useEffect, useState } from "react";
import { useAuth } from "@/app/shared/utils/auth";
import { useToast } from "@/components/ui/use-toast";
import { useGetUserNotiPreferences } from "../../data-access/getUserNotiPreferences.query";
import { useQueryClient } from "@tanstack/react-query";
import { updateNotificationPreferences } from "./notificationService";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { Heading } from "@/app/shared/ui/Heading";
import { Button } from "@/app/shared/ui/Button";
import {
  Container,
  Notification,
  NotificationsContainer,
  WhiteLine,
} from "./Notifications.styled";
import "./utils.css";

export const Notifications = () => {
  const [options, setOptions] = useState({
    noti_upcoming: false,
    noti_nextDay: false,
  });

  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: user_noti_preferences } = useGetUserNotiPreferences(
    currentUser.id
  );

  const { toast } = useToast();

  useEffect(() => {
    if (user_noti_preferences) {
      setOptions({
        noti_nextDay: user_noti_preferences[0].notifications.noti_nextDay,
        noti_upcoming: user_noti_preferences[0].notifications.noti_upcoming,
      });
    }
  }, [user_noti_preferences]);

  const submitHandler = async () => {
    await updateNotificationPreferences({
      options: options,
      currentUserId: currentUser.id,
      toast: toast,
      queryClient: queryClient,
    });
  };

  return (
    <DashboardLayout>
      <Container>
        <Heading>Notifications</Heading>
        <p className="text-gray-100 font-normal m-0 mb-1.5">
          Configure how you receive notifications.
        </p>

        <WhiteLine />

        <h3 className="font-bold mt-10">Assignment Notifications</h3>

        <NotificationsContainer>
          <Notification>
            <p>Receive notifications about upcoming assignments</p>

            <Switch
              checked={options.noti_upcoming}
              onCheckedChange={() =>
                setOptions((prev) => ({
                  ...prev,
                  noti_upcoming: !options.noti_upcoming,
                }))
              }
            />
          </Notification>

          <Notification>
            <p>Receive notifications about assignments for the next day</p>

            <Switch
              checked={options.noti_nextDay}
              onCheckedChange={() =>
                setOptions((prev) => ({
                  ...prev,
                  noti_nextDay: !options.noti_nextDay,
                }))
              }
            />
          </Notification>
        </NotificationsContainer>

        <Button className="mt-7" onClick={submitHandler} $primary={true}>
          Submit Changes
        </Button>
      </Container>
    </DashboardLayout>
  );
};
