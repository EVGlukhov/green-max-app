import { useCallback, useMemo, useState } from "react";
import type { Conversation } from "../chatApi";

export function useConversation(initialConversations: Conversation[]) {
	const [conversations, setConversations] = useState(initialConversations);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [search, setSearch] = useState('');

	const searchConversation = useCallback((term: string) => {
		setSearch(term);
	}, [])

	const visibleConversations = useMemo(() => {
		const query = search.trim().toLocaleLowerCase();
		if (!query)
			return conversations;

		return conversations.filter(({ name, preview }) =>
			`${name} ${preview}`.toLocaleLowerCase().includes(query),
		);
	}, [conversations, search]);

	const activeConversation =
		conversations.find(({ id }) => id === selectedId) ?? conversations[0];

	const selectConversation = (id: string) => {
		setSelectedId(id);
		setConversations((current) =>
			current.map((conversation) =>
				conversation.id === id ? { ...conversation, unread: undefined } : conversation,
			),
		);
	};

	return { visibleConversations, activeConversation, selectConversation, searchConversation }
}
