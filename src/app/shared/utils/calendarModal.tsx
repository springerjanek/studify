import { ReactNode, createContext, useContext, useState } from "react";

type CalendarContext = {
  showCalendarDayModal: boolean;
  setShowCalendarDayModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataToDayModal: {
    date: Date;
    userId: string;
  };
  handleOpenCalendarModal: ({
    date,
    userId,
  }: {
    date: Date;
    userId: string;
  }) => void;
};

const CalendarModalContext = createContext<CalendarContext | null>(null);

export const CalendarModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showCalendarDayModal, setShowCalendarDayModal] = useState(false);
  const [dataToDayModal, setDataToDayModal] = useState({
    date: new Date(),
    userId: "",
  });

  const handleOpenCalendarModal = ({
    date,
    userId,
  }: {
    date: Date;
    userId: string;
  }) => {
    setDataToDayModal({ date: date, userId: userId });
    setShowCalendarDayModal(true);
  };

  return (
    <CalendarModalContext.Provider
      value={{ showCalendarDayModal, setShowCalendarDayModal, dataToDayModal, handleOpenCalendarModal }}
    >
      {children}
    </CalendarModalContext.Provider>
  );
};

export const useCalendarModal = () => {
  const context = useContext(CalendarModalContext);

  if (context === null) {
    throw new Error(
      "useCalendarModal must be used within a CalendarModalProvider"
    );
  }

  const showCalendarDayModal = context.showCalendarDayModal;
  const setShowCalendarDayModal = context.setShowCalendarDayModal;
  const dataToDayModal = context.dataToDayModal
  const handleOpenCalendarDayModal = context.handleOpenCalendarModal
  return { showCalendarDayModal, setShowCalendarDayModal, dataToDayModal, handleOpenCalendarDayModal };
};
