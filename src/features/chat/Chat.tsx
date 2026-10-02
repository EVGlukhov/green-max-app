import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Container, Flex, Grid, IconButton, Panel, Typography } from "@maxhub/max-ui";
import { Brand } from "@/shared";
import { useGreen, type Contact } from "@/api"
import { ChatListHeader, ChatList } from "./components";
import { useChat } from "./hooks/useChat";
import { ChatAvatar } from "./components/ChatAvatar/ChatAvatar";
import { ChatSearchContact } from "./components/ChatSearchContact/ChatSearchContact";
import { Dialog } from "@/shared/dialog/Dialog";
import * as utils from "./utils";

import styles from "./styles.module.css";

export function Chat() {
	const { chats, logout, getChats, credentials, getChatHistory, addContact, sendMessage } = useGreen();
	const { selectedChatId, visibleChats, searchChat, selectChat, activeChat } = useChat(chats);
	const [ draftMessage, setDraftMessage ] = useState('');
	const [ isDialogOpen, setIsDialogOpen ] = useState(false);
	const [ isSending, setIsSending ] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getChats()
	}, [getChats]);

	const handleSelectChat = useCallback(async (chatId: string) => {
		if (!credentials) return;
		selectChat(chatId);
		await getChatHistory(chatId);
	}, [credentials, getChatHistory, selectChat]);

	const onOpenDialog = useCallback(() => {
		setIsDialogOpen(true);
	}, []);

	const handleAddContact = useCallback(async (contact: Contact) => {
		await addContact(contact);
		await getChats();
		setIsDialogOpen(false);
	}, [addContact, getChats]);

	const handleSendMessage = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const message = draftMessage.trim();
		if (!message || !activeChat || !credentials || isSending) return;

		const chatId = activeChat.chatId;

		setIsSending(true);
		setDraftMessage('');
		await sendMessage(chatId, message);
		await getChatHistory(chatId);
	}, [activeChat, credentials, draftMessage, getChatHistory, isSending, sendMessage]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [activeChat?.chatId, activeChat?.messages]);

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

				<Panel
					mode="primary"
					className={styles.sidebar}
				>
					<ChatListHeader onSearch={searchChat} onAdd={onOpenDialog} />
					<ChatList
						chats={visibleChats}
						selectedChatId={selectedChatId}
						onSelect={handleSelectChat} />
				</Panel>

				<Dialog
					isOpen={isDialogOpen}
					onClose={() => setIsDialogOpen(false)}
					title="Добавить контакт"
				>
					<ChatSearchContact onAdd={handleAddContact} />
				</Dialog>

				<Panel
					mode="primary"
					className={`${styles.thread} ${selectedChatId ? "" : styles.threadMobileHidden}`}
				>
					{activeChat ? (
						<>
							<header className={styles.threadHeader}>
								<button
									type="button"
									className={styles.backButton}
									onClick={() => selectChat('')}
									aria-label="Назад к чатам"
								>
									‹
								</button>
								<ChatAvatar chat={activeChat} />
								<div className={styles.threadIdentity}>
									<strong>{activeChat.name}</strong>
									{activeChat.lastSeen ? (
										<span>Был(а) недавно</span>
									) : null}
								</div>
							</header>
							<div className={styles.messages} aria-live="polite">
								{activeChat.messages?.length ? (
									activeChat.messages.map((message) => (
										<div
											key={message.idMessage}
											className={`${styles.messageRow} ${message.type === 'outgoing' ? styles.messageOutgoing : ""}`}
										>
											<div className={styles.messageBubble}>
												<p>{message.textMessage || "Сообщение без текста"}</p>
												<span className={styles.messageMeta}>
													{utils.formatMessageTime(message.timestamp)}
													{message.type === 'outgoing' && <span aria-label="Отправлено">✓✓</span>}
												</span>
											</div>
										</div>
									))
								) : (
									<Typography.Body>Сообщений пока нет</Typography.Body>
								)}
								<div ref={messagesEndRef} />
							</div>

							<form className={styles.composer} onSubmit={handleSendMessage}>
								<input
									value={draftMessage}
									onChange={(event) => setDraftMessage(event.target.value)}
									placeholder="Сообщение"
									aria-label="Сообщение"
									disabled={isSending}
								/>
								<button
									type="submit"
									className={styles.sendButton}
									aria-label="Отправить сообщение"
									disabled={!draftMessage.trim() || isSending}
								>
									{isSending ? "…" : "➤"}
								</button>
							</form>
						</>
					) : (
						<>
							<div className={styles.welcome}>
								<span className={styles.welcomeIcon}>✦</span>
								<Typography.Headline>Ваши сообщения</Typography.Headline>
								<Typography.Body>Выберите чат, чтобы начать общение</Typography.Body>
							</div>
						</>
					)}
				</Panel>
			</Grid>
		</Container>
	);
}

