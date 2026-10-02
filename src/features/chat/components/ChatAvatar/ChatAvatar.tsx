import type { Chat } from "@/api";
import { Avatar } from "@maxhub/max-ui";
import * as utils from '../../utils';

type Props = {
	chat: Chat;
}

export function ChatAvatar({ chat }: Props) {
	return (
		<Avatar.Container size={40}>
			<Avatar.Text>{utils.getInitials(chat.name)}</Avatar.Text>
		</Avatar.Container>
	)
}
