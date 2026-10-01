import { createContext } from "react";
import type { Chat, Credentials, StateInstance } from "./greenTypes";

type GreenState = {
	credentials: Credentials | null;
	chats: Chat[];
  stateInstance: string;
  getStateInstance(credentials: Credentials): Promise<StateInstance>;
	getChats(credentials: Credentials): Promise<Chat[]>;
  logout: () => void;
}

const initialState: GreenState = {
	credentials: null,
  stateInstance: "",
	chats: [],
	getChats: () => Promise.resolve([]),
  getStateInstance: () => Promise.resolve({ stateInstance: '' }),
  logout: () => {},
}

export const GreenContext = createContext<GreenState>(initialState);


