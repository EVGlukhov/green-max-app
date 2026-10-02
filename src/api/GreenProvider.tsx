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
	} catch {
		throw new Error('Ошибка при получении состояния инстанса. Проверьте правильность введенных данных.');
	}
  };

  const getChats = async () => {
	if (credentials === null) return;
	try {
		const result = await greenApi.getChats(credentials);
		setChats(result)

		return result;
	} catch(error) {
		throw new Error('Ошибка при получении списка чатов. Проверьте правильность введенных данных.');
	}
  }

  const getContactInfo = async (chatId: string) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.getContactInfo(credentials, chatId);
		setChats((chats) => chats.map((chat) => chat.chatId === chatId ? {...chat, ...response } : chat))
	} catch {
		throw new Error('Ошибка при получении информации о контакте. Проверьте правильность введенных данных.');
	}
  }

  const getAvatar = async (chatId: string) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.getAvatar(credentials, chatId);
		setChats((chats) => chats.map((chat) => chat.chatId === chatId ? {...chat, avatar: response.urlAvatar } : chat))
	} catch {
		throw new Error('Ошибка при получении аватара контакта. Проверьте правильность введенных данных.');
	}
  }

  const getChatHistory = async (chatId: string) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.getChatHistory(credentials, chatId);
		setChats((chats) => chats.map((chat) => chat.chatId === chatId ? {...chat, messages: response } : chat))
	} catch {
		throw new Error('Ошибка при получении истории чата. Проверьте правильность введенных данных.');
	}
  }

  const logout = () => {
    setStateInstance("");
	setCredentials(null);
  };

  console.log('chats', chats)

  const value = {
	credentials,
	chats,
    stateInstance,
    getStateInstance,
	getContactInfo,
	getChatHistory,
	getAvatar,
	getChats,
    logout,
  };

  return (
		<GreenContext.Provider value={value}>
			{children}
		</GreenContext.Provider>
	);
};
