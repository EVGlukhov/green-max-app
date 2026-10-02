export type Credentials = {
	idInstance: string;
	apiTokenInstance: string;
	apiUrl: string;
}

export type Contact = {
	chatId: string;
	firstName: string;
	lastName: string;
}

export type StateInstance = {
	stateInstance: string;
}

export type AvatarResponse = {
	urlAvatar: string
}

type ChatType = "user" | "bot";

export type ContactInfo = {
	avatar: string,
	name: string,
	contactName: string,
	chatId: string,
	chatType: ChatType,
	lastSeen: number,
	phoneNumber: number,
	phoneNumberTimestamp: number,
	username: string,
	isPremium: boolean,
	isVerified: boolean,
	isScam: false,
	description: string
}

export type Message = {
	chatId: string;
	chatType: ChatType;
	deletedMessageId: string;
	editedMessageId: string;
	forwardingScore: number;
	idMessage: string;
	isDeleted: boolean;
	isEdited: boolean;
	isForwarded: boolean;
	sendByApi: boolean;
	statusMessage: string;
	textMessage: string;
	timestamp: number;
	type: string;
	typeMessage: string;
}

export type Chat = {
	chatId: string;
	name: string;
	type: ChatType;
	phoneNumber: number;
	username: string;
	messages?: Message[];
} & Partial<ContactInfo>

