import React from 'react'
import LoadingGif from '../images/loading.gif'

// import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loader = () => {
    return (
        <div className="loader">
            <div className="Loader_img">
                <img src={LoadingGif} alt="Loading" />
                {/* <AiOutlineLoading3Quarters /> */}
            </div>
        </div>
    )
}

export default loader