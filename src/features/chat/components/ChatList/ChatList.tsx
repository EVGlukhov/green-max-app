import type { Chat } from '@/api/greenTypes';
import styles from './styles.module.css'

type Props = {
	chats: Chat[];
	selectedId: string;
	onSelect(id: string): void;
}
export function ChatList({ chats, selectedId, onSelect }: Props) {
	debugger
	return (
		<div className={styles.conversationList}>
			{chats.map((chat) => (
				<button
					type="button"
					key={chat.chatId}
					className={`${styles.conversation} ${chat.chatId === selectedId ? styles.chatActive : ""}`}
					onClick={() => onSelect(chat.chatId)}
				>
					<span className={styles.conversationDetails}>
						<span className={styles.conversationTop}>
							<strong>{chat.name}</strong>
						</span>
					</span>
				</button>
			))}
			{chats.length === 0 && (
				<p className={styles.emptySearch}>Ничего не найдено</p>
			)}
		</div>
	)
}
