import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUp from "./signUp";
import Timeline from "./Timeline";

export default function App() {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route path='/sign-up' exact>
                    <SignUp />
                </Route>
                <Route path="/timeline" exact>
                    <Timeline />
                </Route>
                
            </Switch>
            
        </BrowserRouter>            
        </>

    );
}

