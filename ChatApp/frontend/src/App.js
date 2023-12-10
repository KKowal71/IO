import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ForgottenPasswordPage from "./Pages/ForgottenPasswordPage";

function App() {
  return (
    <div className="ChatApp">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} />
      <Route path="/forgottenPassword" component={ForgottenPasswordPage} />
    </div>
  );
}

export default App;
