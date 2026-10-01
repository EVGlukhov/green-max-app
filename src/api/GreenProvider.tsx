import { useState } from "react";
import * as greenApi from './greenApi'
import { type Chat, type Credentials } from "./greenTypes";
import { GreenContext } from "./GreenContext";

type AuthProviderProps = {
  children: React.ReactNode;
};


export const GreenProvider = ({ children }: AuthProviderProps) => {
	const [stateInstance, setStateInstance] = useState("");
	const [credentials, setCredentials] = useState<Credentials | null>(null);
	const [chats, setChats] = useState<Chat[]>([] as Chat[]);

  const getStateInstance = async (credentials: Credentials) => {
    try {
		const result = await greenApi.getStateInstance(credentials);
		setCredentials(credentials);
		setStateInstance(result.stateInstance);

		return result;
	} catch (error) {
		console.error("Ошибка подключения:", error);
		throw error;
	}
  };

  const getChats = async (credentials: Credentials) => {
	try {
		const result = await greenApi.getChats(credentials);
		setChats(result)

		return result;
	} catch (error) {
		console.error("Ошибка получения списка чатов:", error);
		throw error;
	}
  }

  const logout = () => {
    setStateInstance("");
	setCredentials(null);
  };

  const value = {
	credentials,
	chats,
    stateInstance,
    getStateInstance,
	getChats,
    logout,
  };

  return (
		<GreenContext.Provider value={value}>
			{children}
		</GreenContext.Provider>
	);
};
