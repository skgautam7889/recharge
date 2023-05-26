import "./addmoreoption.css";
const AddMoreOptions = (props) => {
    const { addMoreOptions, handleClick } = props;
    return (
        <li className="nav-item">
            <div className='nav-link'>
                <div className="dropdown">
                    <span >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                    </span>
                    <div >More</div>
                    <div className="dropdown-content">
                        {
                            addMoreOptions && addMoreOptions.map((category) => (
                                <>
                                    <div key={category.index}>
                                        <div onClick={handleClick(category.index)} key={category.index}><span><i className={category.IconClassName}> </i> </span> {category.PayCategory}</div>
                                    </div>
                                    <hr />
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </li>
    )
}
export default AddMoreOptions;