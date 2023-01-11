import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";
import { ChatContextProvider } from "./contexts/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ChatContextProvider>
      <main className="w-full max-w-[1600px]">
        <App />
      </main>
    </ChatContextProvider>
  </AuthProvider>
);
