import {useState} from 'react'
import Joyride, { ACTIONS, CallBackProps, STATUS, Step } from "react-joyride";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

export const DashboardTutorial = ({
  setShowCalendarDayModal
}: {
  setShowCalendarDayModal: (clickedDay: Date) => void; 
}) => {
  const [{ run, steps }, tutorialState] = useState<State>({
    run: false,
    stepIndex: 0,
    steps: [
      {
        content: (
          <p className="font-bold">
            Here you can add or view your assignments.
          </p>
        ),
        spotlightPadding: 15,
        target: "main button",
      },
      {
        content: (
          <p className="font-bold">
            Click on the arrow icon to expand list of your assignments!
          </p>
        ),
        target: ".absolute svg",
      },
      {
        content: (
          <p className="font-bold">
            On the calendar you are able to view your daily schedule by clicking
            on a desired day.
          </p>
        ),
        target: ".react-calendar",
      },
      {
        content: <p className="font-bold">Let me open it for you.</p>,
        target: ".react-calendar",
        isFixed: true,
      },
      {
        content: <p className="font-bold">Now go ahead and check whats inside!</p>,
        target: "body",
       placement: "center"
      },
      {
        content: (
          <p className="font-bold">
            Here you can view your daily schedule and move the assignments if
            there are any.
          </p>
        ),
        target: ".sc-jrICsz",
        placement: "bottom"
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    tutorialState((prev) => ({ ...prev, run: true }));
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, status, index } = data;

    console.log(index)
    
    const currentStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

    if(currentStepIndex === 5) {
      setShowCalendarDayModal(new Date())
    }

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      tutorialState((prev) => ({ ...prev, run: false }));
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
          },
        }}
      />
      <h2
        className="font-medium m-0 flex items-center gap-1 cursor-pointer"
        onClick={handleClickStart}
      >
        <InfoOutlinedIcon className="w-4 h-4" /> Tutorial
      </h2>
    </div>
  );
};
