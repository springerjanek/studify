import { Container } from "@components/shared/ui/Container/Container";
import { Section } from "@components/shared/ui/Section";
import { AnimateIn } from "@features/Animate";
import { DefaultLayout } from "./layouts";
import Lottie from "lottie-react";
import boyAnimation from "@assets/boy-studying.json";
import girlAnimation from "@assets/girl-studying.json";

export const App = () => {
  return (
    <DefaultLayout>
      <Container>
        <h1 className="float">STUDIFY</h1>
        <p style={{ fontSize: "18px" }}>
          Make your homework easy and pleasure.
        </p>
        <AnimateIn>
          <Section>
            <p>
              Revolutionize your homework management with Studify, <br /> the
              AI-powered organizer. Say goodbye to chaos and hello <br /> to
              effortless organization. From tracking assignments to <br />{" "}
              setting reminders, Studify keeps you on top of your game. <br />
              Join thousands of students experiencing the future of <br />
              homework management with Studify.
            </p>
            <Lottie animationData={boyAnimation} />
          </Section>
        </AnimateIn>

        <AnimateIn>
          <Section>
            <Lottie animationData={girlAnimation} />
            <p>
              Revolutionize your homework management with Studify, <br /> the
              AI-powered organizer. Say goodbye to chaos and hello <br /> to
              effortless organization. From tracking assignments to <br />{" "}
              setting reminders, Studify keeps you on top of your game. <br />
              Join thousands of students experiencing the future of <br />
              homework management with Studify.
            </p>
          </Section>
        </AnimateIn>

        <AnimateIn photos={true}>
          <Section>
            <p>
              Revolutionize your homework management with Studify, <br /> the
              AI-powered organizer. Say goodbye to chaos and hello <br /> to
              effortless organization. From tracking assignments to <br />{" "}
              setting reminders, Studify keeps you on top of your game. <br />
              Join thousands of students experiencing the future of <br />
              homework management with Studify.
            </p>
            <img
              className="hidden"
              src="https://cdn-icons-png.flaticon.com/512/4297/4297861.png"
            />
            <img
              className="hidden"
              src="https://cdn-icons-png.flaticon.com/512/10371/10371428.png"
            />
            <img
              className="hidden"
              src="https://cdn-icons-png.flaticon.com/512/404/404672.png"
            />
          </Section>
        </AnimateIn>
      </Container>
    </DefaultLayout>
  );
};
