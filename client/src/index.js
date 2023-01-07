import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/chat-page",
//     element: <ChatPage />,
//   },
//   {
//     path: "/sign-up",
//     element: <SignUp />,
//   },
// ]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <main className="w-full max-w-[1600px]">
      {/* <RouterProvider router={router} /> */}
      <App />
    </main>
  </AuthProvider>
);
