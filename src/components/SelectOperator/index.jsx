const SelectOperator = (props) => {
    return (
        <select className="form-select" id="operator" required="" name="operator" onChange={props.handleOperatorChange}>
            <option value="">Select Your Operator</option>
            {props.subCategoryList.map((subCategory, index) => {
                return <option key={index} value={index} selected={subCategory.billerid === props.billerid}> {subCategory.BillerName}</option>
            })}
        </select>
    )
}
export default SelectOperator;