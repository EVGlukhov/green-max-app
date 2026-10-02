import { useCallback, useMemo, useState } from "react";
import * as greenApi from './greenApi'
import { type Chat, type Contact, type Credentials } from "./greenTypes";
import { GreenContext } from "./GreenContext";

type AuthProviderProps = {
  children: React.ReactNode;
};


export const GreenProvider = ({ children }: AuthProviderProps) => {
	const [stateInstance, setStateInstance] = useState("");
	const [credentials, setCredentials] = useState<Credentials | null>(null);
	const [chats, setChats] = useState<Chat[]>([]);

  const getStateInstance = useCallback(async (nextCredentials: Credentials) => {
    try {
		const result = await greenApi.getStateInstance(nextCredentials);
		setCredentials(nextCredentials);
		setStateInstance(result.stateInstance);
	} catch {
		throw new Error('Ошибка при получении состояния инстанса. Проверьте правильность введенных данных.');
	}
  }, []);

  const getChats = useCallback(async () => {
	if (credentials === null) return;
	try {
		const result = await greenApi.getChats(credentials);
		setChats(result)

		return result;
	} catch {
		throw new Error('Ошибка при получении списка чатов. Проверьте правильность введенных данных.');
	}
  }, [credentials]);

  const getContactInfo = useCallback(async (chatId: string) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.getContactInfo(credentials, chatId);
		setChats((chats) => chats.map((chat) => chat.chatId === chatId ? {...chat, ...response } : chat))
	} catch {
		throw new Error('Ошибка при получении информации о контакте. Проверьте правильность введенных данных.');
	}
  }, [credentials]);

  const getAvatar = useCallback(async (chatId: string) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.getAvatar(credentials, chatId);
		setChats((chats) => chats.map((chat) => chat.chatId === chatId ? {...chat, avatar: response.urlAvatar } : chat))
	} catch {
		throw new Error('Ошибка при получении аватара контакта. Проверьте правильность введенных данных.');
	}
  }, [credentials]);

  const getChatHistory = useCallback(async (chatId: string) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.getChatHistory(credentials, chatId);
		setChats((chats) => chats.map((chat) => chat.chatId === chatId ? {...chat, messages: response } : chat))
	} catch {
		throw new Error('Ошибка при получении истории чата. Проверьте правильность введенных данных.');
	}
  }, [credentials]);

  const addContact = useCallback(async (contact: Contact) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.addContact(credentials, contact);
		return response;
	} catch {
		throw new Error('Ошибка при добавлении контакта. Проверьте правильность введенных данных.');
	}
  }, [credentials]);

  const sendMessage = useCallback(async (chatId: string, message: string) => {
	if (credentials === null) return;
	try {
		const response = await greenApi.sendMessage(credentials, chatId, message);
		return response;
	} catch {
		throw new Error('Ошибка при отправке сообщения. Проверьте правильность введенных данных.');
	}
  }, [credentials]);


  const logout = useCallback(() => {
    setStateInstance("");
	setCredentials(null);
	setChats([]);
  }, []);

  const value = useMemo(() => ({
	credentials,
	chats,
    stateInstance,
    getStateInstance,
	getContactInfo,
	getChatHistory,
	addContact,
	getAvatar,
	getChats,
    logout,
    sendMessage,
  }), [
	credentials,
	chats,
	stateInstance,
	getStateInstance,
	getContactInfo,
	getChatHistory,
	addContact,
	getAvatar,
	getChats,
	logout,
	sendMessage,
  ]);

  return (
		<GreenContext.Provider value={value}>
			{children}
		</GreenContext.Provider>
	);
};
