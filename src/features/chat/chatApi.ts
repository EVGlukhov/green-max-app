export type Message = {
	id: number;
	text: string;
	time: string;
	outgoing?: boolean;
};

export type Conversation = {
	id: string;
	name: string;
	preview: string;
	time: string;
	initials: string;
	color: string;
	unread?: number;
	online?: boolean;
	messages: Message[];
};
