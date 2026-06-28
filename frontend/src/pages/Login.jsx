import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBrain,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Logo.png";

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "We couldn't sign you in.");
      }

      login(data.user, data.token, rememberMe);
      navigate("/chat", { replace: true });
    } catch (authError) {
      setError(authError.message || "There was a problem signing in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-0px)] overflow-hidden bg-[#111418] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_45%)]" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#1b2230] shadow-lg shadow-black/20">
                  <img src={logo} alt="Study Helper" className="h-10 w-10 object-contain" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">AI Study Helper</p>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Access your study dashboard</h1>
                </div>
              </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Sign in to continue your conversations, save your progress, and
              return to your sessions whenever you want.
            </p>

            <div className="mt-8 gap-4 ">
              <div className="rounded-2xl border border-white/10 bg-[#171d28] p-4">
                <FontAwesomeIcon icon={faBrain} className="text-xl text-sky-300" />
                <h2 className="mt-3 text-lg font-semibold">Guided learning</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Ask questions and get clear, organized explanations that are ready to review.
                </p>
              </div>


            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Fast answers
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Responsive design
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                AI chat
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-[2rem] border border-white/10 bg-[#141922]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">
                  Welcome back
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Sign in</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Enter your email and password to continue.
                </p>
              </div>

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

              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f141c] px-4 py-3 transition focus-within:border-sky-400/60">
                  <FontAwesomeIcon icon={faLock} className="text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
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

              <div className="mb-6 flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event)=> setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-transparent text-sky-500 focus:ring-sky-500"
                  />
                  Remember me
                </label>

                <button type="button" className="text-sky-300 transition hover:text-sky-200">
                  Forgot your password?
                </button>
              </div>

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
                {loading ? "Signing in..." : "Sign in"}
                {!loading && (
                  <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" />
                )}
              </button>

              <p className="mt-6 text-center text-sm text-slate-400">
                Don't have an account yet?{" "}
                <span className="font-medium text-sky-300">Request one or register from the backend</span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
