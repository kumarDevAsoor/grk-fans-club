import { createContext, useContext, useEffect, useState } from "react";

const STATIC_ADMIN_EMAIL = "admin@example.com";
const STATIC_ADMIN_PASSWORD = "Admin@123";
const STORAGE_KEY = "grk_admin_user";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email === STATIC_ADMIN_EMAIL && password === STATIC_ADMIN_PASSWORD) {
      const userData = { email };
      setUser(userData);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return userData;
    }
    throw new Error("Invalid email or password.");
  };

  const logout = async () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const resetPassword = async (email) => {
    if (email !== STATIC_ADMIN_EMAIL) {
      throw new Error("No admin account found with that email.");
    }
    return Promise.resolve(`Use the static password: ${STATIC_ADMIN_PASSWORD}`);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
