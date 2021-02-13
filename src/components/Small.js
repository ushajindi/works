import React, {useState, useEffect} from "react"
import axios from "axios"
import s from "./style.css"

const url = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
const json = [
    {
        id: 101,
        firstName: 'Sue',
        lastName: 'Corson',
        email: 'DWhalley@in.gov',
        phone: '(612)211-6296',
        address: {
            streetAddress: '9792 Mattis Ct',
            city: 'Waukesha',
            state: 'WI',
            zip: '22178'
        },
        description: 'et lacus magna dolor...',
    }
]
const SmallData = () => {
    const [webData, setWebData] = useState(json)
    const [sortIcon, setSortIcon] = useState({
        sortName: false,
        sortId: false,
        sortEmail: false,
        sortPhone: false
    })
    useEffect(() => {
        axios.get(url).then(data => {
            setWebData(data.data)
        })
    }, [])

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
                    <div className={s.address}>
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
                <div key={el.id}>
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
    const SortData = (data, key) => {
        if (key === "id") {
            if (!sortIcon.sortId) {
                setWebData(data.sort((a, b) => a.id - b.id))
                setSortIcon({
                    sortName: false,
                    sortId: true,
                    sortEmail: false,
                    sortPhone: false
                })
                //console.log(webData)

            }
        }
        if (key === "name") {
            if (!sortIcon.sortName) {
                setWebData(data.sort((a,b)=>{
                    if (a.firstName<b.firstName)return -1
                    if (a.firstName>b.firstName)return 1
                }))
                setSortIcon({
                    sortName: true,
                    sortId: false,
                    sortEmail: false,
                    sortPhone: false
                })
            }
        }
    }


    return (
        <div>
            <div className={s.small__inner}>
                <div onClick={() => {
                    SortData(webData, "id")
                }}>{!sortIcon.sortId ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} id
                </div>
                <div onClick={() => {
                    SortData(webData, "name")
                }}>{!sortIcon.sortName ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} firstName
                </div>
                <div>{!sortIcon.sortEmail ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} email
                </div>
                <div>{!sortIcon.sortPhone ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} phone
                </div>
            </div>
            {MapData(webData)}
        </div>
    )
}
export default SmallData


/*  <div className={vis?s.address:s.hidden}>
                    Выбран пользователь:  <b>{el.firstName}</b><br/>
                    Описание: <br/>
                    <textarea value={el.description}/> <br/>
                    Адрес проживания: <b>{el.address.streetAddress}</b> <br/>
                    Город: <b>{el.address.city}</b> <br/>
                    Провинция/штат: <b>{el.address.state}</b><br/>
                    Индекс: <b>{el.address.zip}</b>
                </div>
            )*/