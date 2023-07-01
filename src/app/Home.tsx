import Lottie from "lottie-react";
import boyAnimation from "@assets/boy-studying.json";
import girlAnimation from "@assets/girl-studying.json";
import { DefaultLayout } from "./layouts";
import { Container } from "./shared/ui/Container";
import { Section } from "./shared/ui/Section";
import { ImageContainer } from "./shared/ui/Section";
import { AnimateIn } from "./features/Animate";
import { Heading } from "@shared/ui/Heading";

export const Home = () => {
  return (
    <DefaultLayout>
      <Container>
        <Heading $bold={true} className="float">
          STUDIFY
        </Heading>
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          Make your homework easy and pleasure.
        </p>
        <AnimateIn>
          <Section>
            <p>
              Revolutionize your homework management with Studify, the
              AI-powered organizer. Say goodbye to chaos and hello to effortless
              organization. From tracking assignments to setting reminders,
              Studify keeps you on top of your game. Join thousands of students
              experiencing the future of homework management with Studify.
            </p>
            <Lottie animationData={boyAnimation} />
          </Section>
        </AnimateIn>

        <AnimateIn>
          <Section>
            <Lottie animationData={girlAnimation} />
            <p>
              Revolutionize your homework management with Studify, the
              AI-powered organizer. Say goodbye to chaos and hello to effortless
              organization. From tracking assignments to setting reminders,
              Studify keeps you on top of your game. Join thousands of students
              experiencing the future of homework management with Studify.
            </p>
          </Section>
        </AnimateIn>

        <AnimateIn>
          <Section>
            <p>
              Revolutionize your homework management with Studify, the
              AI-powered organizer. Say goodbye to chaos and hello to effortless
              organization. From tracking assignments to setting reminders,
              Studify keeps you on top of your game. Join thousands of students
              experiencing the future of homework management with Studify.
            </p>
            <ImageContainer>
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
            </ImageContainer>
          </Section>
        </AnimateIn>
      </Container>
    </DefaultLayout>
  );
};
