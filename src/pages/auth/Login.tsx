
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/Loginform";
import { Link } from "react-router-dom";
// import AuthLayout from "@/components/AuthLayout";
// import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Enter your credentials to sign in to your account"
      footer={
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
