import DarkLightToggleButton from "@/components/Dark-Light-Toggle-Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <DarkLightToggleButton />
      <Link to='/SignUp' >Sign Up</Link>
      <br/>
      <Link to='/LogIn' >Log In</Link>
    </>
  );
}
