import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUp from "./signUp";

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

