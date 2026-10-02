import { createContext } from "react";
import type {
	AvatarResponse,
	Chat,
	ContactInfoResponse,
	Credentials,
	Message,
	StateInstance
} from "./greenTypes";

type GreenState = {
  credentials: Credentials | null;
  chats: Chat[];
  stateInstance: string;
  getStateInstance(credentials: Credentials): Promise<StateInstance | void>;
  getChats(credentials: Credentials): Promise<Chat[] | void>;

  getAvatar(chatId: string): Promise<AvatarResponse | void>;
  getChatHistory(chatId: string): Promise<Message[] | void>;
  getContactInfo(chatId: string): Promise<ContactInfoResponse | void>;
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
	getContactInfo: () => Promise.resolve({} as ContactInfoResponse),
  logout: () => {},
}

export const GreenContext = createContext<GreenState>(initialState);


