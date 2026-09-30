import { Button } from "@maxhub/max-ui";
import { useAuth } from "../auth";

export function Chat() {
	const { onDisconnect } = useAuth();
    return (
        <>
			<Button onClick={onDisconnect}>Disconnect</Button>
		</>
    )
}
