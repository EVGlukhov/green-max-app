import { useCallback, useEffect, useState } from "react";
import { Container, Flex, Grid, IconButton, Panel, Typography } from "@maxhub/max-ui";
import { Brand } from "@/shared";
import { useGreen, type Contact } from "@/api"
import { ChatListHeader, ChatList } from "./components";
import { useChat } from "./hooks/useChat";;
import { ChatAvatar } from "./components/ChatAvatar/ChatAvatar";
import { ChatSearchContact } from "./components/ChatSearchContact/ChatSearchContact";
import { Dialog } from "@/shared/dialog/Dialog";

import styles from "./styles.module.css";

export function Chat() {
	const { chats, logout, getChats, credentials, getChatHistory, addContact } = useGreen();
	const { selectedChatId, visibleChats, searchChat, selectChat, activeChat } = useChat(chats)
	const [ draftMessage, setDraftMessage ] = useState('');
	const [ isDialogOpen, setIsDialogOpen ] = useState(false);

	useEffect(() => {
		getChats();
	}, [])

	const handleSelectChat = async (chatId: string) => {
		if (credentials) {
			selectChat(chatId);
			getChatHistory(chatId);
		}
	}

	const onOpenDialog = useCallback(() => {
		setIsDialogOpen(true);
	}, [])

	const handleAddContact = useCallback(async (contact: Contact) => {
		await addContact(contact);
		await getChats();
		setIsDialogOpen(false);
	}, [])

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
					className={styles.thread}
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
								</div>
							</header>

							<div className={styles.messages} aria-live="polite">
								<div className={styles.dateDivider}><span>Сегодня</span></div>
								{activeChat.messages?.map((message) => (
									<div
										key={message.idMessage}
										className={`${styles.messageRow} ${message.type === 'outgoing' ? styles.messageOutgoing : ""}`}
									>
										<div className={styles.messageBubble}>
											<p>{message.textMessage}</p>
											<span className={styles.messageMeta}>
												{message.timestamp}
												{message.type === 'outgoing' && <span aria-label="Отправлено">✓✓</span>}
											</span>
										</div>
									</div>
								))}
							</div>

							<form className={styles.composer} onSubmit={() => {}}>
								<button type="button" aria-label="Прикрепить файл">＋</button>
								<input
									value={draftMessage}
									onChange={(event) => setDraftMessage(event.target.value)}
									placeholder="Сообщение"
									aria-label="Сообщение"
								/>
								<button
									type="submit"
									className={styles.sendButton}
									aria-label="Отправить сообщение"
									disabled={!draftMessage.trim()}
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
					)}
				</Panel>
			</Grid>
		</Container>
	);
}
