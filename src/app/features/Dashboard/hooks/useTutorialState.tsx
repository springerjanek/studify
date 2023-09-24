import { useState } from "react";
import { Step } from "react-joyride";

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

export const useTutorialState = () => {
 const [{ run, steps, stepIndex }, tutorialState] = useState<State>({
   run: false,
   stepIndex: 0,
   steps: [
     {
       content: (
         <p className="font-bold">Here you can add or view your assignments.</p>
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
       content: (
         <p className="font-bold">Now go ahead and check whats inside!</p>
       ),
       target: "body",
       placement: "center",
     },
     {
       content: (
         <p className="font-bold">
           Here you can view your daily schedule and move the assignments if
           there are any.
         </p>
       ),
       spotlightPadding: 0,
       target: ".sc-jrICsz",
       placement: "bottom",
     },
   ],
 });

 return {
   run,
   steps,
   stepIndex,
   tutorialState,
 };
};
