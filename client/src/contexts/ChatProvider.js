import React, { useReducer, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const ChatContext = React.createContext();

export function ChatContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const currentUser = user; //Just to avoid confusion
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.friendId
              ? currentUser.uid + action.payload.friendId
              : action.payload.friendId + currentUser.uid,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
