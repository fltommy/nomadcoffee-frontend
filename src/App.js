import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useReactiveVar } from "@apollo/client";

const darkTheme = {
  fontColor: "white",
  bgColor: "black",
};

const lightTheme = {
  fontColor: "balck",
  bgColor: "white",
};

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home/> : <Login/>}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;