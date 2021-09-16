import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUp from "./Components/signUp";

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

