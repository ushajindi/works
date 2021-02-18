import React, {useState,useEffect}  from 'react'
import s from "./style.css"
import {Link, Route, Switch} from "react-router-dom";
import Home from "./Home";
import SmallData from "./Small";
import BigData from "./Big";
import axios from "axios"
const bigDataUrl = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
const smallDataUrl = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"

const App=(props)=>{
    const [isLoading,setIsLoading]=useState(true)
    const [smallData,setSmallData]=useState()
    const [getDataStart,setGetDataStart]=useState({
        getSmallData:false,
        getBigData:false
    })
    const [bigData,setBigData]=useState()
    useEffect(()=>{
        if (getDataStart.getSmallData){
            axios.get(smallDataUrl).then(data => {
                setSmallData(data.data)
                setIsLoading(false)
            })
        }
        if (getDataStart.getBigData){
            axios.get(bigDataUrl).then(data=>{
                setBigData(data.data)
                setIsLoading(false)
            })
        }
    },[getDataStart.getSmallData,getDataStart.getBigData])
    const MapData = (data) => {
        const [vis, setVis] = useState(false)
        const [id, setId] = useState(null)

        const getAddress = (idEl) => {
            setId(idEl)
            setVis(true)


        }
        const Address = (el, id) => {

            if (el.id === id) {
                return (
                    <div key={el.id} className={s.address}>
                        Выбран пользователь: <b>{el.firstName}</b><br/>
                        Описание: <br/>
                        <textarea value={el.description}/> <br/>
                        Адрес проживания: <b>{el.address.streetAddress}</b> <br/>
                        Город: <b>{el.address.city}</b> <br/>
                        Провинция/штат: <b>{el.address.state}</b><br/>
                        Индекс: <b>{el.address.zip}</b>
                    </div>
                )
            }
        }
        return (data.map((el => {
            return (
                <div>
                    <div onClick={() => {
                        getAddress(el.id)
                    }} className={s.small__inner}>
                        <div> {el.id}</div>
                        <div>{el.firstName}</div>
                        <div>{el.email}</div>
                        <div>{el.phone}</div>
                        {vis && Address(el, id)}
                    </div>

                </div>

            )
        })))
    }
    const SortData = (data, key,getStateSort,setStateSort,setStateData) => {
        if (key === "id") {
            if (!getStateSort.sortId.sorted) {
                setStateData(data.sort((a, b) => a.id - b.id))
                setStateSort({
                    sortName: {
                        sorted:false,
                        down:false
                    },
                    sortId: {
                        sorted:true,
                        down:true
                    },
                    sortEmail: {
                        sorted:false,
                        down:false
                    },
                    sortPhone: {
                        sorted:false,
                        down:false
                    },
                })
                //console.log(webData)

            }
            if (getStateSort.sortId.sorted) {
                setStateData(data.sort((a, b) => a.id - b.id).reverse())
                setStateSort({
                    sortName: {
                        sorted:false,
                        down:false
                    },
                    sortId: {
                        sorted:false,
                        down:false
                    },
                    sortEmail: {
                        sorted:false,
                        down:false
                    },
                    sortPhone: {
                        sorted:false,
                        down:false
                    },
                })
            }
        }
        if (key === "phone") {
            if (!getStateSort.sortPhone.sorted) {
                setStateData(data.sort((a, b) => a.phone[1] - b.phone[1]))
                setStateSort({
                    sortName: {
                        sorted:false,
                        down:false
                    },
                    sortId: {
                        sorted:false,
                        down:false
                    },
                    sortEmail: {
                        sorted:false,
                        down:false
                    },
                    sortPhone: {
                        sorted:true,
                        down:true
                    },
                })
            }
            if (getStateSort.sortPhone.sorted) {
                setStateData(data.sort((a, b) => a.phone[1] - b.phone[1]).reverse())
                setStateSort({
                    sortName: {
                        sorted:false,
                        down:false
                    },
                    sortId: {
                        sorted:false,
                        down:false
                    },
                    sortEmail: {
                        sorted:false,
                        down:false
                    },
                    sortPhone: {
                        sorted:false,
                        down:false
                    },
                })
            }
        }
        if (key === "name") {
            if (!getStateSort.sortName.sorted) {
                setStateData(data.sort((a,b)=>{
                    if (a.firstName<b.firstName)return -1
                    if (a.firstName>b.firstName)return 1
                }))
                setStateSort({
                    sortName: {
                        sorted:true,
                        down:true
                    },
                    sortId: {
                        sorted:false,
                        down:false
                    },
                    sortEmail: {
                        sorted:false,
                        down:false
                    },
                    sortPhone: {
                        sorted:false,
                        down:false
                    },
                })
            }
            if (getStateSort.sortName.sorted){
                setStateData(data.sort((a,b)=>{
                    if (a.firstName<b.firstName)return -1
                    if (a.firstName>b.firstName)return 1
                }).reverse())
                setStateSort({
                    sortName: {
                        sorted:false,
                        down:false
                    },
                    sortId: {
                        sorted:false,
                        down:false
                    },
                    sortEmail: {
                        sorted:false,
                        down:false
                    },
                    sortPhone: {
                        sorted:false,
                        down:false
                    },
                })
            }
        }
        if (key === "email") {
            if (!getStateSort.sortEmail.sorted) {
                setStateData(data.sort((a,b)=>{
                    if (a.email<b.email)return -1
                    if (a.email>b.email)return 1
                }))
                setStateSort({
                    sortName: {
                        sorted:true,
                        down:true
                    },
                    sortId: {
                        sorted:false,
                        down:false
                    },
                    sortEmail: {
                        sorted:true,
                        down:true
                    },
                    sortPhone: {
                        sorted:false,
                        down:false
                    },
                })
            }
            if (getStateSort.sortEmail.sorted){
                setStateData(data.sort((a,b)=>{
                    if (a.email<b.email)return -1
                    if (a.email>b.email)return 1
                }).reverse())
                setStateSort({
                    sortName: {
                        sorted:false,
                        down:false
                    },
                    sortId: {
                        sorted:false,
                        down:false
                    },
                    sortEmail: {
                        sorted:false,
                        down:false
                    },
                    sortPhone: {
                        sorted:false,
                        down:false
                    },
                })
            }
        }
    }

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
                <Route path={"/big"} component={()=>{
                    return(
                        <BigData bigData={{
                            isLoading:isLoading,
                            start:setGetDataStart,
                            getStart:getDataStart.getBigData,
                            webData:bigData,
                            MapData,
                            SortData
                        }}/>
                    )
                }}/>
                <Route path={"/small"} component={()=>{
                    return(
                        <SmallData smallData={{
                            isLoading:isLoading,
                            setIsLoading:setIsLoading,
                            start:setGetDataStart,
                            getStart:getDataStart.getSmallData,
                            webData:smallData,
                            setWebData:setSmallData,
                            MapData,
                            SortData
                        }}/>
                    )
                }}/>
            </Switch>
        </div>
    )
}
export default App