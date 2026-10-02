import { useCallback, useMemo, useState } from "react";
import type { Chat } from "@/api";

export function useChat(chats: Chat[]) {
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

	const activeChat = chats.find(({ chatId }) => chatId === selectedChatId) ?? null;

	const selectChat = useCallback((id: string) => {
		setSelectedChatId(id);
	}, []);

	return { selectedChatId, visibleChats, activeChat, selectChat, searchChat }
}
