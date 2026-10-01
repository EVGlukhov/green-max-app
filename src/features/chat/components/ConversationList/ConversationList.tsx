import type { Conversation } from "../../chatApi"
import { useConversation } from "../../hooks/useConversation";

import styles from './styles.module.css'

type Props = {
	visibleConversations: Conversation[];
	activeConversation: Conversation;
	onSelect(id: string): void;
}
export function ConversationList({ visibleConversations, activeConversation, onSelect }: Props) {
	return (
		<div className={styles.conversationList}>
			{visibleConversations.map((conversation) => (
				<button
					type="button"
					key={conversation.id}
					className={`${styles.conversation} ${activeConversation.id === conversation.id ? styles.conversationActive : ""}`}
					onClick={() => onSelect(conversation.id)}
					aria-current={activeConversation.id === conversation.id ? "true" : undefined}
				>
					<span className={`${styles.avatar} ${styles[conversation.color]}`}>
						{conversation.initials}
						{conversation.online && <span className={styles.onlineDot} />}
					</span>
					<span className={styles.conversationDetails}>
						<span className={styles.conversationTop}>
							<strong>{conversation.name}</strong>
							<time>{conversation.time}</time>
						</span>
						<span className={styles.conversationBottom}>
							<span>{conversation.preview}</span>
							{conversation.unread && (
								<span className={styles.unread}>{conversation.unread}</span>
							)}
						</span>
					</span>
				</button>
			))}
			{visibleConversations.length === 0 && (
				<p className={styles.emptySearch}>Ничего не найдено</p>
			)}
		</div>
	)
}
