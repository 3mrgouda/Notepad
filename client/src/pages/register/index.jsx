import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function Register() {
  const registerReference = useRef(null); // Corrected the spelling of 'registerReference'
  const { registerUser } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(registerReference.current); // Corrected the spelling of 'formData'
    const data = Object.fromEntries(formData);
    registerUser(data);
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-center">Register</h1>
          </div>

          <form
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
            ref={registerReference} // Corrected the spelling of 'registerReference'
          >
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email" // Added the 'name' attribute for form data
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password" // Added the 'name' attribute for form data
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit" // Explicitly set the button type to 'submit'
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
            >
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have an account?
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
