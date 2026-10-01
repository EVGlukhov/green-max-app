import { useCallback, useMemo, useState } from "react";
import type { Chat } from "@/api";

export function useChat(initialChats: Chat[]) {
	const [chats, setChats] = useState(initialChats);
	const [selectedChatId, setSelectedChatId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState('');

	const searchChat = useCallback((term: string) => setSearchTerm(term), [])

	const visibleChats = useMemo(() => {
		const query = searchTerm.trim().toLocaleLowerCase();
		if (!query)
			return chats;

		return chats.filter(({ name }) =>
			`${name}`.toLocaleLowerCase().includes(query),
		);
	}, [chats, searchTerm]);


	const activeChat =
		chats.find(({ chatId }) => chatId === selectedChatId) ?? chats[0];

	const selectChat = (id: string) => {
		setSelectedChatId(id);
		setChats((current) =>
			current.map((chat) =>
				chat.chatId === id ? { ...chat, unread: undefined } : chat,
			),
		);
	};

	return { selectedChatId, visibleChats, activeChat, selectChat, searchChat }
}
