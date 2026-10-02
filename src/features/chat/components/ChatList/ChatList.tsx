import { CellList, Typography } from '@maxhub/max-ui';
import type { Chat } from '@/api/greenTypes';
import { ChatListItem } from '../ChatListItem/ChatListItem';

type Props = {
	chats: Chat[];
	selectedChatId: string;
	onSelect(id: string): void;
}
export function ChatList({ chats, selectedChatId, onSelect }: Props) {
	return (
		<CellList filled mode="island">
			{chats.map((chat) => (
				<ChatListItem key={chat.chatId}
					chat={chat}
					active={chat.chatId === selectedChatId}
					onSelect={onSelect}>
				</ChatListItem>
			))}
			{chats.length === 0 && (
				<Typography.Label>Ничего не найдено</Typography.Label>
			)}
		</CellList>
	)
}
