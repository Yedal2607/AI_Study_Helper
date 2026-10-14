import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBrain,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import logo from "../../../assets/Logo.png";

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
    <main className="relative min-h-[calc(100vh-0px)] overflow-hidden ui-page">
      
      
      

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center rounded-[2rem] ui-border border ui-panel-subtle p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl ui-border border ui-panel-subtle shadow-lg shadow-black/20">
                  <img src={logo} alt="Study Helper" className="h-10 w-10 object-contain" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] ui-accent">AI Study Helper</p>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Access your study dashboard</h1>
                </div>
              </div>

            <p className="mt-5 max-w-xl text-sm leading-6 ui-muted sm:text-base">
              Sign in to continue your conversations, save your progress, and
              return to your sessions whenever you want.
            </p>

            <div className="mt-8 gap-4 ">
              <div className="rounded-2xl ui-border border ui-panel-subtle p-4">
                <FontAwesomeIcon icon={faBrain} className="text-xl ui-accent" />
                <h2 className="mt-3 text-lg font-semibold">Guided learning</h2>
                <p className="mt-2 text-sm ui-muted">
                  Ask questions and get clear, organized explanations that are ready to review.
                </p>
              </div>


            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm ui-muted">
              <span className="rounded-full ui-border border ui-panel-subtle px-4 py-2">
                Fast answers
              </span>
              <span className="rounded-full ui-border border ui-panel-subtle px-4 py-2">
                Responsive design
              </span>
              <span className="rounded-full ui-border border ui-panel-subtle px-4 py-2">
                AI chat
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-[2rem] ui-border border ui-panel p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.3em] ui-accent">
                  Welcome back
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">Sign in</h2>
                <p className="mt-2 text-sm ui-muted">
                  Enter your email and password to continue.
                </p>
              </div>

              <label className="mb-5 block">
                <span className="mb-2 block text-sm font-medium ui-text">Email address</span>
                <div className="flex items-center gap-3 rounded-2xl ui-border border ui-input px-4 py-3 transition focus-within:opacity-80">
                  <FontAwesomeIcon icon={faEnvelope} className="ui-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    autoComplete="email"
                    className="w-full bg-transparent text-sm outline-none placeholder:ui-muted"
                  />
                </div>
              </label>

              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-medium ui-text">Password</span>
                <div className="flex items-center gap-3 rounded-2xl ui-border border ui-input px-4 py-3 transition focus-within:opacity-80">
                  <FontAwesomeIcon icon={faLock} className="ui-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full bg-transparent text-sm outline-none placeholder:ui-muted"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="ui-muted transition hover:opacity-80"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </label>

              <div className="mb-6 flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 ui-muted">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event)=> setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded ui-border bg-transparent ui-accent focus:ring-sky-500"
                  />
                  Remember me
                </label>

                <button type="button" className="ui-accent transition hover:opacity-80">
                  Forgot your password?
                </button>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border ui-error px-4 py-3 text-sm ui-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl ui-button px-5 py-3.5 text-sm font-semibold shadow-lg  transition hover:-translate-y-0.5  disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && (
                  <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" />
                )}
              </button>

              <p className="mt-6 text-center text-sm ui-muted">
                Don't have an account yet?{" "}
                <Link to="/register" className="font-medium ui-accent transition hover:opacity-80">
                  Create one here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
