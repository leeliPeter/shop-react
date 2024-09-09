import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Import Redux related components
import { Provider } from "react-redux";
import store from "./Redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <GoogleOAuthProvider clientId="399574814517-8e8bv109negr0b0odgl3mbficed3qgnc.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Router>
  </Provider>
);
