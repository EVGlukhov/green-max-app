import type {
	AvatarResponse,
	Chat,
	Contact,
	ContactInfo,
	Credentials,
	Message,
	StateInstance
} from "./greenTypes";

export const getStateInstance = (c: Credentials): Promise<StateInstance> =>
  fetch(`${c.apiUrl}/waInstance${c.idInstance}/getStateInstance/${c.apiTokenInstance}`, {
    method: "GET",
  }).then((response) => response.json());

export const getChats = (c: Credentials): Promise<Chat[]> =>
	fetch(`${c.apiUrl}/waInstance${c.idInstance}/getChats/${c.apiTokenInstance}`, {
    method: "GET",
  }).then((response) => response.json());

export const getContactInfo = (c: Credentials, chatId: string): Promise<ContactInfo> =>
	fetch(`${c.apiUrl}/waInstance${c.idInstance}/getContactInfo/${c.apiTokenInstance}`, {
		body: JSON.stringify({ chatId }),
    method: "POST",
  }).then((response) => response.json());

export const getAvatar = (c: Credentials, chatId: string): Promise<AvatarResponse> =>
	fetch(`${c.apiUrl}/waInstance${c.idInstance}/getAvatar/${c.apiTokenInstance}`, {
		body: JSON.stringify({ chatId }),
    method: "POST",
  }).then((response) => response.json());

export const getChatHistory = (c: Credentials, chatId: string): Promise<Message[]> =>
	fetch(`${c.apiUrl}/waInstance${c.idInstance}/getChatHistory/${c.apiTokenInstance}`, {
		body: JSON.stringify({ chatId }),
    method: "POST",
  }).then((response) => response.json());

export const addContact = (c: Credentials, contact: Contact): Promise<void> =>
	fetch(`${c.apiUrl}/waInstance${c.idInstance}/addContact/${c.apiTokenInstance}`, {
		body: JSON.stringify({ ...contact, chatId: `${contact.chatId}@c.us` }),
    method: "POST",
  }).then((response) => response.json());

