import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }

    setError("");
    setMessage("");
    setResetLoading(true);

    try {
      const result = await resetPassword(email);
      setMessage(result);
    } catch (err) {
      console.error(err);
      setError("Unable to reset password. Please use the static admin credentials.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071B4C] px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0C1E4D]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
        <p className="text-sm uppercase tracking-[0.35em] text-[#F2D35C]/80">Admin Login</p>
        <h1 className="mt-4 text-3xl font-bold">Sign in to the admin portal</h1>
        <p className="mt-3 text-sm text-gray-300">
          Enter your admin email and password to continue. If you have forgotten your password, you can reset it below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200">Email / Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none transition focus:border-[#F2D35C]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none transition focus:border-[#F2D35C]"
              required
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F2D35C]">
            Static login credentials:
            <div className="mt-2 text-xs text-gray-300">Email: admin@example.com</div>
            <div className="text-xs text-gray-300">Password: Admin@123</div>
          </div>

          {error && <p className="rounded-3xl bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FECACA]">{error}</p>}
          {message && <p className="rounded-3xl bg-[#22C55E]/10 px-4 py-3 text-sm text-[#D1FAE5]">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#F2D35C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#071B4C] transition hover:bg-[#e5cc4a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-300">
          <button
            type="button"
            onClick={handleResetPassword}
            disabled={resetLoading}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {resetLoading ? "Sending..." : "Reset Password"}
          </button>
          <Link to="/" className="text-[#F2D35C] hover:text-white">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
