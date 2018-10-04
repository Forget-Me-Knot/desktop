import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import createHistory from "history/createBrowserHistory";

//material ui
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, green, pink } from "@material-ui/core/colors";

const history = createHistory();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green
  },
  status: {
    danger: "orange"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <HashRouter history={history}>
        <App />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
