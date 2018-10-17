import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
			main: '#000000'
		}
  },
  status: {
    danger: "orange"
  }
});

ReactDOM.render(
  <Provider>
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
