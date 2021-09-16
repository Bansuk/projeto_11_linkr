import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUp from "./Components/signUp";
import Timeline from "./Components/Timeline";

export default function App() {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route path='/sign-up' exact>
                    <SignUp />
                </Route>
            </Switch>
            
        </BrowserRouter>            
        </>

    );
}

