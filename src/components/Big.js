import React, {useEffect, useState, useRef} from "react"
import s from "./style.css";
import axios from "axios";

const BigData = ({bigData}) => {
    const [pagesData, setPagesData] = useState([])
    const [pagesCount, setPageCount] = useState([])
    const currentPage = useRef(1)
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
        if (!bigData.getStart) {
            bigData.start({getBigData: true})
        }
    }, [])
    useEffect(() => {
        if (bigData.webData) {
            for (let i = 1; i <= bigData.webData.length / 50; i++) {
                setPageCount([...pagesCount, pagesCount.push(i)])
            }
            for (let i = 0; i <= 49; i++) {
                setPagesData([...pagesData, pagesData.push(bigData.webData[i])])
            }

        }
    }, [bigData.webData])
    console.log(pagesData)

    const Pagination = () => {
        const PaginationClick = (key) => {
            let current = []
            if (key == 1) {
                for (let i = 0; i <= 49; i++) {
                    current.push(bigData.webData[i])
                }
                setPagesData(current)
            }
            if (key > 1) {
                for (let i = key * 50 - 50; i <= key * 50 - 1; i++) {
                    current.push(bigData.webData[i])
                }
                setPagesData(current)
            }
        }
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li onClick={()=>{
                        if (currentPage.current>1){
                            currentPage.current--
                        }
                        PaginationClick(currentPage.current)
                    }} className="page-item"><a
                        className={currentPage.current == 1 ? "page-link disabled" : "page-link"}>Previous</a></li>
                    {pagesCount.map(el => {
                        return <li onClick={() =>{
                            currentPage.current=el
                            PaginationClick(el)}
                        } className="page-item"><a
                            className={currentPage.current == el ? "red" : "page-link"}>{el}</a></li>
                    })}
                    <li onClick={() => {
                        if (currentPage.current < pagesCount.length) {
                            currentPage.current++
                        }
                        PaginationClick(currentPage.current)
                    }} className="page-item"><a className="page-link">Next</a></li>
                </ul>

            </nav>
        )
    }
    return (
        <div>
            {bigData.isLoading?<div className={s.loading}>
                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only"> <br/><br/><br/>Loading...</span>
                </div></div> : <div >
            <div className={s.small__inner}>
                <div onClick={() => {
                    bigData.SortData(pagesData, "id", sortIcon, setSortIcon,setPagesData)
                }}>{!sortIcon.sortId.down ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} id
                </div>
                <div onClick={() => {
                    bigData.SortData(pagesData, "name", sortIcon, setSortIcon, setPagesData)
                }}>{!sortIcon.sortName.down ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} firstName
                </div>
                <div onClick={() => {
                    bigData.SortData(pagesData, "email", sortIcon, setSortIcon,setPagesData)
                }}>{!sortIcon.sortEmail.down ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} email
                </div>
                <div onClick={() => {
                    bigData.SortData(pagesData, "phone", sortIcon, setSortIcon, setPagesData)
                }}>{!sortIcon.sortPhone.down ? <i className="bi bi-arrow-bar-up"></i> :
                    <i className="bi bi-arrow-bar-down"></i>} phone
                </div>
            </div>
            <div>{bigData.MapData(pagesData)}</div>
            <div className={s.big__inner}> {Pagination()}</div>
        </div>
                }
        </div>
    )
}
export default BigData