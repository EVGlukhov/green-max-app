import { createBrowserRouter } from "react-router";
import { Home } from "./features/home/Home";
import { Chat } from "./features/chat";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/chat",
    Component: Chat
  }
]);
