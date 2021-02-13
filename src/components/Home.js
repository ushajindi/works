import React from "react"
import s from "./style.css"
import {Link} from "react-router-dom";

const Home = ()=>{
    return(
        <div className={s.home}>
            <div>
                <Link to="/small"><button type="button" className="btn btn-outline-primary">Маленький набор данных</button></Link></div>
            <div>
                <Link to="/big"><button type="button" className="btn btn-outline-primary">Большой набор данных</button></Link>
            </div>
        </div>
    )
}
export default Home