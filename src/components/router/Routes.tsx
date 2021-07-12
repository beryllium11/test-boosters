import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import CountriesContainer from "../countries/CountriesContainer";
import GlobalContainer from "../global/GlobalContainer";
import About from "../about/About";



export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to="/global/from/:from?/to/:to?"/>}/>
                <Route path="/global/from/:from?/to/:to?" render={() => <GlobalContainer/>}/>
                <Route path="/country/:country?/date/:date?" render={() => <CountriesContainer/>}/>
                <Route path="/about" render={() => <About/>}/>
            </Switch>
        </div>
    );
}
