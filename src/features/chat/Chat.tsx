import { Container, Flex, Grid, IconButton, Panel } from "@maxhub/max-ui";
import { Brand } from "@/shared";
import { useGreen } from "@/api/useGreen"
import { ChatListHeader, ChatList } from "./components";
import { useChat } from "./hooks/useChat";;

import styles from "./styles.module.css";
import { useEffect } from "react";

export function Chat() {
	const { chats, logout, getChats, credentials } = useGreen();
	const { selectedChatId, visibleChats, searchChat, selectChat } = useChat(chats)

	useEffect(() => {
		if (!credentials)
			return

		getChats(credentials);
	}, [credentials])


	// const sendMessage = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const text = draft.trim();
	// 	if (!text || !activeConversation) return;

	// 	const time = new Intl.DateTimeFormat("ru", {
	// 		hour: "2-digit",
	// 		minute: "2-digit",
	// 	}).format(new Date());

	// 	setConversations((current) =>
	// 		current.map((conversation) =>
	// 			conversation.id === activeConversation.id
	// 				? {
	// 						...conversation,
	// 						preview: text,
	// 						time,
	// 						messages: [
	// 							...conversation.messages,
	// 							{ id: Date.now(), text, time, outgoing: true },
	// 						],
	// 					}
	// 				: conversation,
	// 		),
	// 	);
	// 	setDraft("");
	// };

	return (
		<Container className={styles.container}>
			<Grid gapX={0} cols={3} className={styles.grid}>
				<Flex direction="column" className={styles.actions} justify="space-between" align="center">
					<Brand />
					<IconButton
						aria-label="Отключиться"
						variant="secondary"
						size="medium"
						className={styles.disconnectButton}
						onClick={logout}
					>
						<span aria-hidden="true">↪</span>
					</IconButton>
				</Flex>

				<Panel mode="primary" className={styles.sidebar}>
					<ChatListHeader onSearch={searchChat} />
					<ChatList
						chats={visibleChats}
						selectedId={selectedChatId}
						onSelect={selectChat} />
				</Panel>

				<Panel
					mode="primary"
					className={styles.thread}
				>
					{/* {activeConversation ? (
						<>
							<header className={styles.threadHeader}>
								<button
									type="button"
									className={styles.backButton}
									onClick={() => setSelectedId(null)}
									aria-label="Назад к чатам"
								>
									‹
								</button>
								<span className={`${styles.avatar} ${styles[activeConversation.color]}`}>
									{activeConversation.initials}
									{activeConversation.online && <span className={styles.onlineDot} />}
								</span>
								<div className={styles.threadIdentity}>
									<strong>{activeConversation.name}</strong>
									<span>{activeConversation.online ? "в сети" : "был(а) недавно"}</span>
								</div>
							</header>

							<div className={styles.messages} aria-live="polite">
								<div className={styles.dateDivider}><span>Сегодня</span></div>
								{activeConversation.messages.map((message) => (
									<div
										key={message.id}
										className={`${styles.messageRow} ${message.outgoing ? styles.messageOutgoing : ""}`}
									>
										<div className={styles.messageBubble}>
											<p>{message.text}</p>
											<span className={styles.messageMeta}>
												{message.time}
												{message.outgoing && <span aria-label="Отправлено">✓✓</span>}
											</span>
										</div>
									</div>
								))}
							</div>

							<form className={styles.composer} onSubmit={sendMessage}>
								<button type="button" aria-label="Прикрепить файл">＋</button>
								<input
									value={draft}
									onChange={(event) => setDraft(event.target.value)}
									placeholder="Сообщение"
									aria-label="Сообщение"
								/>
								<button
									type="submit"
									className={styles.sendButton}
									aria-label="Отправить сообщение"
									disabled={!draft.trim()}
								>
									➤
								</button>
							</form>
						</>
					) : (
						<div className={styles.welcome}>
							<span className={styles.welcomeIcon}>✦</span>
							<Typography.Headline>Ваши сообщения</Typography.Headline>
							<p>Выберите чат, чтобы начать общение</p>
						</div>
					)} */}
				</Panel>
			</Grid>
		</Container>
	);
}
