import Lottie from "lottie-react";
import animationData from "./assets/boy-studying.json";
import "./App.css";

function App() {
  return (
    <main className="container">
      <h1 className="float">STUDIFY</h1>
      <p style={{ fontSize: "18px" }}>Make your homework easy and pleasure.</p>
      <div className="section">
        <p>
          Revolutionize your homework management with Studify, <br /> the
          AI-powered organizer. Say goodbye to chaos and hello <br /> to
          effortless organization. From tracking assignments to <br /> setting
          reminders, Studify keeps you on top of your game. <br />
          Join thousands of students experiencing the future of <br />
          homework management with Studify.
        </p>
        <Lottie animationData={animationData} />
      </div>
    </main>
  );
}

export default App;
