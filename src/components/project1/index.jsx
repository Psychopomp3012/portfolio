import React, { useState } from "react";
import data from "./data.js";
import "./style.css";

const Accordian = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSingleSelection = (getCurrentId) => {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    };

    const handleMultiSelection = (getCurrentId) => {
        let copyMultiple = [...multiple];
        const indexOfCurrentID = copyMultiple.indexOf(getCurrentId);

        if (indexOfCurrentID === -1) copyMultiple.push(getCurrentId);
        else copyMultiple.splice(indexOfCurrentID, 1);

        setMultiple(copyMultiple);

        console.log(multiple);
    }

    return (
        <div className="wrapper">
            <button
                onClick={() => {
                    setEnableMultiSelection(!enableMultiSelection);
                }}
            >
                Enable Multi Selection
            </button>
            <div className="accordian">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className="item">
                            <div
                                className="question"
                                onClick={
                                    enableMultiSelection ?
                                        () => handleMultiSelection(dataItem.id) :
                                        () => handleSingleSelection(dataItem.id)
                                }
                            >
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {   
                                
                                enableMultiSelection
                                    ? (multiple.indexOf(dataItem.id) !== -1) && (<div className="answer">
                                        <p>{dataItem.answer}</p>
                                    </div>)
                                    : selected === dataItem.id && (<div className="answer">
                                        <p>{dataItem.answer}</p>
                                    </div>)

                            }
                            {/* {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1
                                ? (
                                    <div className="answer">
                                        <p>{dataItem.answer}</p>
                                    </div>
                                ) : null} */}
                        </div>
                    ))
                ) : (
                    <div>No Items present</div>
                )}
            </div>
        </div >
    );
};

export default Accordian;
