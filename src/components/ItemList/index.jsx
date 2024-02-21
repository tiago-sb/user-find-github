import React from "react"
import './styles.css'

const Lista = ({ title, description, html_url }) => {
    return(
        <div className="itemList">
            <b>
                <a href={html_url} target="_blank">
                    {title}
                </a>
            </b>
            <p>{description}</p>
            <hr/>
        </div>
    )
}

export default Lista