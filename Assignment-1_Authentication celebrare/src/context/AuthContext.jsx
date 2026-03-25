import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth, provider } from "../firebase/firebaseCofig";
import { getEventsData } from "../services/eventService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Event State
  const [events, setEvents] = useState([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastClickedId, setLastClickedId] = useState(
    localStorage.getItem("lastClickedEvent") || null
  );

  // Auth Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ... in AuthProvider:
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEventsData();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);


  const login = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleCardClick = (id) => {
    setLastClickedId(id);
    localStorage.setItem("lastClickedEvent", id);
  };

  const filteredEvents = events.filter((event) =>
    event.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      events: filteredEvents,
      isEventsLoading,
      searchQuery,
      setSearchQuery,
      lastClickedId,
      handleCardClick
    }}>
      {children}
    </AuthContext.Provider>
  );
};
