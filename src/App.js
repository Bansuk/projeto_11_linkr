import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Timeline from "./Components/Timeline";
import SignUp from "./Components/signUp";
import UserContext from "./Context/UserContext";
import { useState } from "react/cjs/react.development";

export default function App() {
    const [user, setUser] = useState({
        token: "3582c710-71c0-46b4-8101-d57544fbc839",
        user: {
            id: 450,
            email: "teste213@gmail.com",
            username: "teste213",
            avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/450/avatar",
        },
    });

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <GlobalStyle />
                <Switch>
                    <Route path="/timeline" exact>
                        <Timeline />
                    </Route>
                    <Route path="/sign-up" exact setUser={setUser}>
                        <SignUp />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}
