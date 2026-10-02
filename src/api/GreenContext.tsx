import { createContext } from "react";
import type {
	AvatarResponse,
	Chat,
	Contact,
	ContactInfo,
	Credentials,
	Message,
	StateInstance
} from "./greenTypes";

type GreenState = {
  credentials: Credentials | null;
  chats: Chat[];
  stateInstance: string;
  getStateInstance: (credentials: Credentials) => Promise<StateInstance | void>;
  getChats: () => Promise<Chat[] | void>;
	addContact: (contact: Contact) => Promise<void>;
  getAvatar: (chatId: string) => Promise<AvatarResponse | void>;
  getChatHistory: (chatId: string) => Promise<Message[] | void>;
	sendMessage: (chatId: string, message: string) => Promise<void>;
  getContactInfo: (chatId: string) => Promise<ContactInfo | void>;
  logout: () => void;
}

const initialState: GreenState = {
	credentials: null,
  stateInstance: "",
	chats: [],
	getChats: () => Promise.resolve([]),
	getAvatar: () => Promise.resolve({ urlAvatar: '' }),
	getChatHistory: () => Promise.resolve([]),
	getStateInstance: () => Promise.resolve({ stateInstance: '' }),
	getContactInfo: () => Promise.resolve({} as ContactInfo),
	sendMessage: () => Promise.resolve(),
	addContact: () => Promise.resolve(),
  logout: () => {},
}

export const GreenContext = createContext<GreenState>(initialState);

