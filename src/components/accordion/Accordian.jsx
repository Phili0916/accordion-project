import React, { useState } from "react";
import data from "./data";
import './styles.css'

const Accordian = () => {
    const [selected, setSelected] = useState(null)

    const [enableMultiSelected, setEnableMultiSelected] = useState(false)

    const [multipleSelected, setMultipleSelected] = useState([])

    const handleSingleSelection = (getCurrentId) => {
        setSelected(getCurrentId === selected ? null : getCurrentId)
    }

    const handleMulitpleSelection = (getCurrentId) => {
        let copyMultiple = [...multipleSelected]
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)

        if(findIndexOfCurrentId === -1) {
            copyMultiple.push(getCurrentId)
        } else {
            copyMultiple.splice(getCurrentId, 1)
        }

        setMultipleSelected(copyMultiple)
    }

    console.log(selected, 'selected')
    console.log(multipleSelected, 'multipleSelected')

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelected(!enableMultiSelected)}>Select Multiple</button>
            <div className="accordian">
                {
                data && data.length > 0 ? 
                data.map((dataItem) => {
                    return(
                    <div 
                        key={dataItem.id}
                        className="item">
                        <div 
                            className="title"
                            onClick={
                                enableMultiSelected
                                ? () => handleMulitpleSelection(dataItem.id)
                                : () => handleSingleSelection(dataItem.id)
                            }
                        >
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                        </div>
                        {
                            enableMultiSelected ?
                            multipleSelected.indexOf(dataItem.id) !== -1 &&
                            <div className="content">
                                {dataItem.answer}
                            </div>
                            :
                            selected === dataItem.id &&                            
                            <div className="content">
                                {dataItem.answer}
                            </div>
                        }
        
                    </div>
                )})
                : <div>No data present</div>
                }
            </div>
        </div>
    )
}

export default Accordian;