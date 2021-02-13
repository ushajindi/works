import React from 'react'
import s from "./style.css"
import {Link, Route, Switch} from "react-router-dom";
import Home from "./Home";
import SmallData from "./Small";
import BigData from "./Big";

const App=(props)=>{

    return(
        <div className={s.intro}>
            <header>
                <div className={s.logo}><Link to="/">DATA</Link></div>
            </header>
            <Switch>
                <Route path="/" exact component={(props)=>{
                    return(
                        <Home props={props}/>
                    )
                }}/>
                <Route path={"/big"} component={(props)=>{
                    return(
                        <BigData props={props}/>
                    )
                }}/>
                <Route path={"/small"} component={(props)=>{
                    return(
                        <SmallData props={props}/>
                    )
                }}/>
            </Switch>
        </div>
    )
}
export default App