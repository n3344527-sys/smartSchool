import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to SmartSchool</h1>

      <Link to="/signup">
        <button>Get Started</button>
      </Link>

      <br />

      <Link to="/login">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Home;