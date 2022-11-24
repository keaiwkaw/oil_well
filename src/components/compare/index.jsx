import { useParams } from "react-router"
import "./index.less"


const Index = () => {
    let { arr } = useParams()
    arr = arr.split(",")
    const baseURL = window.location.origin
    return (
        <div className="c-compare">
            {
                arr.map((item, index) => {
                    return (
                        <iframe src={`${baseURL}/#/all_single/${item}`} frameBorder="0" key={index}></iframe>
                    )
                })
            }
        </div>
    )
}

export default Index