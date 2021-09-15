import { BrowserRouter, Switch, Route } from "react-router-dom";
import Post from "./Components/Post";
import GlobalStyle from "./Styles/GlobalStyle";
import Timeline from "./Components/Timeline";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Switch>
                <Route path="/timeline" exact component={Timeline} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
