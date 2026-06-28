import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.png";

export const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "There was a problem creating your account.");
      }

      navigate("/", { replace: true });
    } catch (registerError) {
      setError(registerError.message || "There was a problem creating your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center   min-h-[calc(100vh-0px)] overflow-hidden bg-[#111418] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_45%)]" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <section className="flex min-h-screen justify-center w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-[50%] ">
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-[2rem] border border-white/10 bg-[#141922]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">
                  Get started
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Sign up</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Create your account to access your study tools.
                </p>
              </div>

              <label className="mb-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Full name</span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f141c] px-4 py-3 transition focus-within:border-sky-400/60">
                  <FontAwesomeIcon icon={faUser} className="text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Email address</span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f141c] px-4 py-3 transition focus-within:border-sky-400/60">
                  <FontAwesomeIcon icon={faEnvelope} className="text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    autoComplete="email"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
              </label>

              <label className="mb-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f141c] px-4 py-3 transition focus-within:border-sky-400/60">
                  <FontAwesomeIcon icon={faLock} className="text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="text-slate-400 transition hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </label>

              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Confirm password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f141c] px-4 py-3 transition focus-within:border-sky-400/60">
                  <FontAwesomeIcon icon={faLock} className="text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className="text-slate-400 transition hover:text-white"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </label>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && (
                  <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" />
                )}
              </button>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link to="/" className="font-medium text-sky-300 transition hover:text-sky-200">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
