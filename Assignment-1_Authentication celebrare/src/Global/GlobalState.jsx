import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseCofig";
import { googleLogout as firebaseLogout } from "../firebase/googleLogin";

const GlobalContext = createContext();


const USER_STORAGE_KEY = "user";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

const clearStoredUser = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

const getStoredSession = () => {
  const rawSession = localStorage.getItem(USER_STORAGE_KEY);
  if (!rawSession) {
    return { exists: false, expired: false, user: null, expiresAt: null };
  }

  try {
    const parsed = JSON.parse(rawSession);

    if (!parsed || typeof parsed !== "object") {
      clearStoredUser();
      return { exists: false, expired: false, user: null, expiresAt: null };
    }

    if (!parsed.expiresAt || !parsed.user) {
      clearStoredUser();
      return { exists: false, expired: false, user: null, expiresAt: null };
    }

    if (Date.now() > parsed.expiresAt) {
      clearStoredUser();
      return { exists: true, expired: true, user: null, expiresAt: parsed.expiresAt };
    }

    return {
      exists: true,
      expired: false,
      user: parsed.user,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    clearStoredUser();
    return { exists: false, expired: false, user: null, expiresAt: null };
  }
};

const setStoredSession = (user, expiresAt = Date.now() + SESSION_TTL_MS) => {
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify({
      user,
      expiresAt,
    })
  );
};

const getStoredUser = () => getStoredSession().user;

const GlobalProvider = ({ children }) => {

  const [user, setUser] = useState(() => getStoredUser());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionExpiresAt, setSessionExpiresAt] = useState(() => getStoredSession().expiresAt);

  const handleLogout = async () => {
    await firebaseLogout();
  };


  useEffect(() => {
    const syncUser = async (firebaseUser) => {
      const sessionState = getStoredSession();

      if (sessionState.expired) {
        await firebaseLogout();
        clearStoredUser();
        setUser(null);
        setIsLoggedIn(false);
        setSessionExpiresAt(null);
        return;
      }

      if (firebaseUser) {
        const loggedInUser = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
        };

        const expiresAt = sessionState.exists
          ? sessionState.expiresAt
          : Date.now() + SESSION_TTL_MS;
        setStoredSession(loggedInUser, expiresAt);
        setUser(loggedInUser);
        setIsLoggedIn(true);
        setSessionExpiresAt(expiresAt);
        return;
      }

      clearStoredUser();
      setUser(null);
      setIsLoggedIn(false);
      setSessionExpiresAt(null);
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      await syncUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loading,
        handleLogout,
        sessionExpiresAt,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };