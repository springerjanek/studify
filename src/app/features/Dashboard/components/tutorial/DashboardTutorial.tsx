import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTutorialState } from "../../hooks/useTutorialState";
import { useCalendarModal } from "@/app/shared/utils/calendarModal";
import { useAuth } from "@/app/shared/utils/auth";
import { useToast } from "@/components/ui/use-toast";
import Joyride, { ACTIONS, CallBackProps, STATUS } from "react-joyride";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TutorialHeading } from "../Dashboard.styled";

export const DashboardTutorial = () => {
  const { showCalendarDayModal, handleOpenCalendarDayModal, setShowCalendarDayModal } =
    useCalendarModal();

  const { run, steps, stepIndex, tutorialState } = useTutorialState();

  const { currentUser } = useAuth();

  const navigate = useNavigate()
  const location = useLocation()

  const {toast} = useToast()

  useEffect(() => {
    if (!showCalendarDayModal && stepIndex === 6) {
      tutorialState((prev) => ({ ...prev, run: false }));
       toast({
         title: "You have closed the tutorial.",
         description: "Click on the tutorial button to resume it.",
         className: "text-black",
       });
      }

    if (showCalendarDayModal && stepIndex !== 0) {
      tutorialState((prev) => ({ ...prev, run: true }));
    }
  }, [showCalendarDayModal]);


  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if(location.pathname !== "/dashboard") {

      navigate("/dashboard")
      toast({
        title: "You must be on the main dashboard page to start the tutorial!",
        description: "Click on the tutorial button to start.",
        className: "text-black",
      });
    }

    tutorialState((prev) => ({ ...prev, run: true }));
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, status, index } = data;
    const currentStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)

    if (currentStepIndex === 4 && action === ACTIONS.UPDATE) {
      tutorialState((prev) => ({ ...prev, stepIndex: currentStepIndex }));
      setShowCalendarDayModal(false)
    }

    if (currentStepIndex === 5) {
      tutorialState((prev) => ({...prev, stepIndex: currentStepIndex }));
      handleOpenCalendarDayModal({ date: new Date(), userId: currentUser.id });
    }

    if (currentStepIndex === 6 && status === STATUS.RUNNING) {
      tutorialState((prev) => ({ ...prev, stepIndex: currentStepIndex }));
      handleOpenCalendarDayModal({ date: new Date(), userId: currentUser.id });
    }

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      tutorialState((prev) => ({ ...prev, run: false, stepIndex: 0 }));
    }
  };

  return (
    <div>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#a03055",
            textColor: "#6f48eb",
          },
        }}
      />
      <TutorialHeading
        className="font-medium m-0 flex items-center gap-1 cursor-pointer"
        onClick={handleClickStart}
      >
        <InfoOutlinedIcon className="w-4 h-4" /> Tutorial
      </TutorialHeading>
    </div>
  );
};
