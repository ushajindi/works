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
            if (!sortIcon.sortId.sorted) {
                setWebData(data.sort((a, b) => a.id - b.id))
                setSortIcon({
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
            if (sortIcon.sortId.sorted) {
                setWebData(data.sort((a, b) => a.id - b.id).reverse())
                setSortIcon({
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
            console.log("click")
            if (!sortIcon.sortPhone.sorted) {
                setWebData(data.sort((a, b) => a.phone[1] - b.phone[1]))
                setSortIcon({
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
            if (sortIcon.sortPhone.sorted) {
                setWebData(data.sort((a, b) => a.phone[1] - b.phone[1]).reverse())
                setSortIcon({
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
            if (!sortIcon.sortName.sorted) {
                setWebData(data.sort((a,b)=>{
                    if (a.firstName<b.firstName)return -1
                    if (a.firstName>b.firstName)return 1
                }))
                setSortIcon({
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
            if (sortIcon.sortName.sorted){
                setWebData(data.sort((a,b)=>{
                    if (a.firstName<b.firstName)return -1
                    if (a.firstName>b.firstName)return 1
                }).reverse())
                setSortIcon({
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
            if (!sortIcon.sortEmail.sorted) {
                //setWebData(webData.map(el=>{el.email.toLowerCase()}))
                setWebData(data.sort((a,b)=>{
                    if (a.email<b.email)return -1
                    if (a.email>b.email)return 1
                }))
                setSortIcon({
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
            if (sortIcon.sortEmail.sorted){
                setWebData(data.sort((a,b)=>{
                    if (a.email<b.email)return -1
                    if (a.email>b.email)return 1
                }).reverse())
                setSortIcon({
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


    return (
        <div>
            <div className={s.small__inner}>
                <div onClick={() => {
                    SortData(webData, "id")
                }}>{!sortIcon.sortId.down ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} id
                </div>
                <div onClick={() => {
                    SortData(webData, "name")
                }}>{!sortIcon.sortName.down ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} firstName
                </div>
                <div onClick={()=>{SortData(webData,"email")}}>{!sortIcon.sortEmail.down ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} email
                </div>
                <div onClick={()=>{SortData(webData,"phone")}}>{!sortIcon.sortPhone.down ? <i className="bi bi-arrow-bar-up"></i> :
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