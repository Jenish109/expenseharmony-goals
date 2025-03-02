
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignUpForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <AuthLayout 
      title="Create an account"
      subtitle="Enter your details to create a new account"
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
