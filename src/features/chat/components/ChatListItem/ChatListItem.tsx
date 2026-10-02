import { useCallback } from "react"
import { CellSimple } from "@maxhub/max-ui";
import { type Chat } from "@/api"
import { ChatAvatar } from "../ChatAvatar/ChatAvatar";

type Props = {
	chat: Chat;
	active: boolean,
	onSelect(chatId: string): void;
}
export function ChatListItem({ chat, onSelect }: Props) {
	const handleClick = useCallback(() => {
		onSelect(chat.chatId)
	}, [onSelect, chat]);

	return (
		<CellSimple
			before={<ChatAvatar chat={chat} />}
			title={chat.name}
			onClick={handleClick}
		/>
	)
}
