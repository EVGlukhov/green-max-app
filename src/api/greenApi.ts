import type { Chat, Credentials, StateInstance } from "./greenTypes";

export const getStateInstance = (c: Credentials): Promise<StateInstance> =>
  fetch(`${c.apiUrl}/waInstance${c.idInstance}/getStateInstance/${c.apiTokenInstance}`, {
    method: "GET",
  }).then((response) => response.json());

export const getChats = (c: Credentials): Promise<Chat[]> =>
	fetch(`${c.apiUrl}/waInstance${c.idInstance}/getChats/${c.apiTokenInstance}`, {
    method: "GET",
  }).then((response) => response.json());
