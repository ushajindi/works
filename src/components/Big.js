import React, {useEffect, useState} from "react"
import s from "./style.css";
import axios from "axios";

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
const url = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"

const BigData = ({smallData}) => {
    const [webData, setWebData] = useState(json)
    const [pages, setPages] = useState({
        pageCount: [],
        currentPage:[]
    })
    const [viewData,setViewData]=useState({
        viewPage:[]
    })
    const [load, setLoad] = useState(false)

    useEffect(() => {
        let page=[]
        if (!load) {
            axios.get(url).then(data => {
                setWebData(data.data)
                for (let i = 1; i <= data.data.length / 50; i++) {
                    page.push(i)
                }

                setPages({...pages, pageCount: page})
                setLoad(true)
            })
        }
    }, [])
    const Pagination = () => {
        const dataView = (page) => {
            let dat=[]
            for (let i = 1; i < page * 50; i++) {
               dat.push(webData[i])
            }

            setViewData({...viewData, viewPage: dat})
            console.log(viewData.viewPage)
        }
        dataView(1)
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    {pages.pageCount.map(el => {
                        return <li className="page-item"><a className="page-link" href="#">{el}</a></li>
                    })}
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>

            </nav>
        )
    }

    return (
        <div>
            {load && Pagination()}
        </div>
    )
}
export default BigData