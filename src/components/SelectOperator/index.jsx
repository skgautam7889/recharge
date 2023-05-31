import React, { useState } from 'react';
import Select from 'react-select';

const SelectOperator = (props) => {
    // const [selectedOption, setSelectedOption] = useState('');
    // console.log("SelectOperator props===>",props);
    const data = props.subCategoryList;
    
    return (
        // <select className="form-select" id="operator" required="" name="operator" onChange={props.handleOperatorChange}>
        //     <option value="">Select Your Operator</option>
        //     {props.subCategoryList && props.subCategoryList.map((subCategory, index) => {
        //         return <option key={index} value={index} selected={subCategory.billerid === props.billerid}> {subCategory.BillerName}</option>
        //     })}
        // </select>
        <Select
            placeholder="Select Your Operator"
            value={props.selectedOption}
            options={data}
            onChange={props.handleOperatorChange}
            getOptionLabel={e => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span><img height={45} width={45} src={e.BillerLogo} alt={e.BillerName} /></span>
                    <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                </div>
            )}
        />
    )
}
export default SelectOperator;