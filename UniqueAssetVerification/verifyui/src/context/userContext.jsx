import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  loading: true,
  balance: "",
  threshold: {},
  provider: {},
  setUser: () => {},
  setLoading: () => {},
  setBalance: () => {},
  setThreshold: () => {},
  setProvider: () => {},
});

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({
    address: "",
    network: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState("");
  const [threshold, setThreshold] = useState({});
  const [provider, setProvider] = useState({});

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        balance: balance,
        threshold: threshold,
        provider: provider,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
        setBalance: setBalance,
        setThreshold: setThreshold,
        setProvider: setProvider,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
