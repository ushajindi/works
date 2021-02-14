import React, {useState, useEffect} from "react"
import s from "./style.css"


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
const SmallData = ({smallData}) => {
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
    useEffect(()=>{
        if (!smallData.getStart){
            smallData.start({getSmallData:true,})
        }
    })
    return (
        <>{smallData.isLoading ? <div className={s.loading}>
                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only"> <br/><br/><br/>Loading...</span>
                </div>
            </div> :<div>
                <div className={s.small__inner}>
                    <div onClick={() => {
                        smallData.SortData(smallData.webData, "id", sortIcon, setSortIcon, smallData.setWebData)
                    }}>{!sortIcon.sortId.down ? <i className="bi bi-arrow-bar-up"></i> :
                        <i className="bi bi-arrow-bar-down"></i>} id
                    </div>
                    <div onClick={() => {
                        smallData.SortData(smallData.webData, "name", sortIcon, setSortIcon, smallData.setWebData)
                    }}>{!sortIcon.sortName.down ? <i className="bi bi-arrow-bar-up"></i> :
                        <i className="bi bi-arrow-bar-down"></i>} firstName
                    </div>
                    <div onClick={() => {
                        smallData.SortData(smallData.webData, "email", sortIcon, setSortIcon, smallData.setWebData)
                    }}>{!sortIcon.sortEmail.down ? <i className="bi bi-arrow-bar-up"></i> :
                        <i className="bi bi-arrow-bar-down"></i>} email
                    </div>
                    <div onClick={() => {
                        smallData.SortData(smallData.webData, "phone", sortIcon, setSortIcon, smallData.setWebData)
                    }}>{!sortIcon.sortPhone.down ? <i className="bi bi-arrow-bar-up"></i> :
                        <i className="bi bi-arrow-bar-down"></i>} phone
                    </div>
                </div>
                {smallData.MapData(smallData.webData)}

            </div>
        }
            </>
    )
}
export default SmallData

