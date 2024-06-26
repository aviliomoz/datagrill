import { Link } from "react-router-dom";
import { Modal } from "./modal";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export function AuthButtons() {
  const { session, loading } = useAuth();
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [signupModal, setSignupModal] = useState<boolean>(false);

  if (loading) return <></>;

  return (
    <>
      <div className="flex items-center gap-6">
        {session ? (
          <>
            <Link
              to={"/home"}
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border border-orange-400 rounded-md px-4 py-1.5 text-sm font-medium hover:bg-orange-400"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setLoginModal(true)}
              className="text-sm font-medium"
            >
              Login
            </button>
            <button
              onClick={() => setSignupModal(true)}
              className="bg-orange-500 text-white rounded-md px-4 py-1.5 text-sm font-medium"
            >
              Sign up
            </button>
          </>
        )}
      </div>
      {loginModal && (
        <Modal close={() => setLoginModal(false)}>
          <LoginForm />
          <button
            className="text-sm flex mx-auto mt-4"
            onClick={() => {
              setLoginModal(false);
              setSignupModal(true);
            }}
          >
            Don`&apos;`t have an account?{" "}
            <span className="text-orange-500 ml-2">Register</span>
          </button>
        </Modal>
      )}
      {signupModal && (
        <Modal close={() => setSignupModal(false)}>
          <SignupForm />
          <button
            className="text-sm flex mx-auto mt-4"
            onClick={() => {
              setSignupModal(false);
              setLoginModal(true);
            }}
          >
            Already have an account?{" "}
            <span className="text-orange-500 ml-2">Login</span>
          </button>
        </Modal>
      )}
    </>
  );
}
