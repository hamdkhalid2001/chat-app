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
        console.log("Setting user");

        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "DELETE_USER":
        console.log("Deleting user");
        return {
          user: {},
          chatId: null,
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
