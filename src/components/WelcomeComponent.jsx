import { useParams, Link } from "react-router-dom";

export default function WelcomeComponent() {
  const { username } = useParams();
  return (
    <div className="welcomeComponent">
      <h1>
        Welcome to Your Diary,{" "}
        <span className="userName">{username.toUpperCase()}</span>
      </h1>
      <div className="welcomeStories m-9">
        <h3>
          Your Diary Stories - <Link to="/entries">go here</Link>
        </h3>
      </div>
    </div>
  );
}
