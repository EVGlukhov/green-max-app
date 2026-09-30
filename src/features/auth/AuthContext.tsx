import { createContext, useState } from "react";
import {
	authApi,
	type Credentials
} from "@/features/auth";

export const AuthContext = createContext<{
  stateInstance: string;
  onConnect: (credentials: Credentials) => Promise<void>;
  onDisconnect: () => void;
}>({
  stateInstance: "",
  onConnect: () => Promise.resolve(),
  onDisconnect: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  	const [stateInstance, setStateInstance] = useState("");

  const handleConnect = async (credentials: Credentials) => {
		debugger;
    try {
			debugger;
			const result = await authApi.connect(credentials);
			setStateInstance(result.stateInstance);
		} catch (error) {
			console.error("Ошибка подключения:", error);
		}
  };

  const handleDisconnect = () => {
    setStateInstance("");
  };

  const value = {
    stateInstance,
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
  };

  return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);
};
