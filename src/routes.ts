import { createHashRouter } from "react-router";
import { Home } from "./features/home/Home";
import { Chat } from "./features/chat";
import { ProtectedRoute } from "./features/auth";
import NoMatch from "./features/auth/components/NoMatch/NoMatch";

export const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/chat",
    Component: ProtectedRoute,
    children: [
      {
        index: true,
        Component: Chat
      }
    ]
  },
	{
		path: "*",
		Component: NoMatch
	}
]);
