export type Credentials = {
	idInstance: string;
	apiTokenInstance: string;
	apiUrl: string;
}

export type StateInstance = {
	stateInstance: string;
}

export type Chat = {
	chatId: string;
	name: string;
	type: 'user' | 'bot';
	phoneNumber: number;
	username: string;
}
