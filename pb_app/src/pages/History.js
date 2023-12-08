import { useState } from "react";


export default function purhcaseHist() {
    const [info, getInfo] = useState('');
    const [inputInfo, getInputInfo] = useState(false);
    const [paragraph, setParagraph] = useState<JSX.Element | null>(null);
    
    const retrieve = () => {
        console.log("entered");
        console.log(info);
    }

    const handleChange = (event) => {
        getInfo(event.target.value);
        console.log(info);
    };

    const newItem = <div className="input-section">
        <h3>New Item</h3>
        <input onChange={handleChange} className="category" placeholder="category" />
        <input className="item-name" placeholder="item name" />
        <input className="cost" placeholder="cost" />
        <button onClick={retrieve}>Create</button>
    </div>;

    function toggle() {
        getInputInfo(!inputInfo);
        if(inputInfo) 
            setParagraph(newItem);
        else   
            setParagraph(null);
    }

    return (
        <>
            <h1>Purchase History</h1>
            <div className="purchase-history">
                <button className="add" onClick={toggle}>+ Add New</button>
                {paragraph}
            </div>
        </>
    );
}