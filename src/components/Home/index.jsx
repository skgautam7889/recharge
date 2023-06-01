import { Link, useLocation, useHistory } from "react-router-dom";
import DownloadOurApp from "../DownloadOurApp";
import ReferEarnSection from "../ReferEarnSection";
import React, { useState, useEffect } from 'react';
import OfferImageSlider from "../OfferImageSlider";
import { userService } from "../Services";
import Select from 'react-select';

import { Modal, Button } from "react-bootstrap";
import SelectOperator from "../SelectOperator";
import AddMoreOptions from "./AddMoreOptions";
const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [subCategory, setSubCategory] = useState(null);
    const [addMoreOptions, setAddMoreOptions] = useState([]);
    const [circles, setCircleList] = useState([]);
    const [plansInfo, setPlansInfo] = useState({
        operator: "",
        circle: ""
    });
    const [show, setShow] = useState(false);

    const [prepaidcategory, setPrepaidCategory] = useState([]);
    const [prepaidplanlist, setPrepaidPlanList] = useState([]);
    const [plantype, setPlantype] = useState([]);
    const [plans, setPlans] = useState([]);
    const [allplans, setAllPlans] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [numberType, setNumberType] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState([]);
    const [isNumberTrue, setIsNumberTrue] = useState(true);
    const [offers, setOffers] = useState([]);
    const [billerid, setBillerid] = useState('');
    const [errorBillerName, setErrorBillerName] = useState('');
    const [chargeableAmount, setChargeableAmount] = useState(0);
    const [billPayForm, setBillPayForm] = useState({
        billerInfo: "",
        ConnectionNumber: "",
        // amount: 0,
    });
    const [connectionNumberError, setConnectionNumberError] = useState('');
    const [billInformation, setBilIInformation] = useState('');

    useEffect(() => {
        getCategories();
    }, []);
    useEffect(() => {
        setCurrentCategory(currentCategory);
        if (currentCategory?.PayID) {
            GetSubCategory(currentCategory.PayID);
            setOffers(currentCategory.offers)
            let mobile = currentCategory.slug.indexOf("mobile-prepaid");
            if (mobile >= 0) {
                setIsNumberTrue(true)
            } else {
                setIsNumberTrue(false);
            }
        }
    }, [currentCategory]);

    const location = useLocation();
    const history = useHistory();

    async function getCategories() {
        let addMoreBtn = [];

        const endPoint = 'GetHomePageData';
        const categorylists = await userService.getCategoriesList(endPoint);
        if (categorylists && categorylists.length > 0) {
            categorylists.map((category, index) => { if (index > 5) { category.index = index; addMoreBtn.push(category); } })
        }
        setAddMoreOptions(addMoreBtn);
        setCurrentCategory(categorylists[0]);
        setCategories(categorylists);
        setIsLoading(false);
    }
    async function GetSubCategory(categoryId) {
        // setIsLoading(true);
        const endPoint = 'GetSubCategory';
        const subCategoryList = await userService.getGetSubCategoryList(endPoint, categoryId);

        const options1 = subCategoryList.map((subcategory) => {
            subcategory.billerParameters.map((billerParameter) => {
                billerParameter.ConnectionNumber = null;
                billerParameter.isError = false;
            })
            subcategory.image = subcategory.BillerLogo;
            subcategory.value = subcategory.BillerName;
            subcategory.label = "hello";
            subcategory.label = <div><img src={subcategory.BillerLogo} height="20px" width="20px" />{subcategory.BillerName} </div>;
            return subcategory;
        });
        setSelectedOption(null)
        setSubCategoryList(options1);
        // setIsLoading(false);

    }
    async function getGetOperatorDetails(number) {
        console.log("subCategoryList===>", subCategoryList);
        setIsLoading(true);
        const endPoint = 'GetOperatorDetails';
        const operatorDetails = await userService.getGetOperatorDetailsList(endPoint, number);
        plansInfo.operator = operatorDetails?.billerid;
        plansInfo.circle = operatorDetails?.circle_name;
        if (operatorDetails?.billerid) {

            let result = subCategoryList.filter(operator => operator.billerid == operatorDetails?.billerid);
            if (result.length > 0) {
                setSelectedOption(result[0]);
            }
            console.log("resultresultresult===>", result);
        }
        setBillerid(operatorDetails?.billerid);
        // setCircleName(operatorDetails.circle_name);
        setPlansInfo(plansInfo);
        setIsLoading(false);
    }

    const pageName = location.pathname;
    const currentPage = pageName.replace('/', '');

    // let isNumberTrue = true;
    // if (categories.length > 0) {
    //     let catData = categories.filter((cat) => cat.slug === currentPage.replace('/', ''));

    //     // console.log("currentCategory====>", catData[0]);
    //     let currentCategory = catData[0];
    //     console.log("catData[0]====>", catData[0]);
    //     let mobile = catData[0].slug.indexOf("mobile");
    //     if (mobile >= 0) {
    //         // setNumberType(true);
    //         isNumberTrue = true;
    //     } else {
    //         // setNumberType(false)
    //         isNumberTrue = false;
    //     }

    //     // setCurrentCategory(catData[0]);
    //     // GetSubCategory(currentCategory.PayID);
    //     // console.log("pageName=>", currentPage);

    //     titel = currentCategory.Payheading;
    //     offers = currentCategory.offers;
    //     playholder = currentCategory.DefaultMessage;
    //     // console.log("offers====>",offers);
    // }
    const [rechargeForm, setRechargeForm] = useState({
        type: "",
        number: "",
        operator_info: "",
    });

    const [numberError, setNumberError] = useState('');
    const [planError, setPlanError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // console.log("name===>", name);
        // console.log("value====>", value);
        setAllPlans([]);
        if (name == 'number') {
            if (/^[0-9]{10}$/.test(value)) {
                setNumberError("");
                getGetOperatorDetails(value);
            } else {
                setNumberError("Please enter a valid phone number");
            }
        }
        setRechargeForm((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        selectedPlan.number = rechargeForm.number;
        if (!rechargeForm.number) {
            setNumberError("Please enter number")
            return false;
        }
        if (!/^[0-9]{10}$/.test(rechargeForm.number)) {
            setNumberError("Please enter a valid phone number");
            return false;
        }
        if (selectedPlan.length == 0) {
            setPlanError("Please select Plan");
            return false;
        }
        selectedPlan.total_pay_amount = selectedPlan.amount;
        selectedPlan.discount = 0;
        selectedPlan.is_recharge = true;
        // var txnid = (new Date()).getTime()+ Math.random().toString(16).slice(2);
        var txnid = Math.random().toString(16).slice(2);
        selectedPlan.txnid = txnid;
        const recharge_information = JSON.stringify(selectedPlan);

        localStorage.removeItem('billplan_information');
        localStorage.setItem('recharge_information', recharge_information);
        history.push('/pay/order-summary');
    };


    const handleBillPaymentSubmit = async (event) => {
        event.preventDefault();
        setErrorBillerName('');
        // if (!billPayForm.billerInfo) {
        //     setErrorBillerName("Please select any one operator!");
        //     return false;
        // }
        // if (!billPayForm.ConnectionNumber) {
        //     setConnectionNumberError("Please Enter connectionNumber!");
        //     return false;
        // }
        // const RegexPattern = new RegExp(billPayForm.billerInfo.RegexPattern);
        // if (!RegexPattern.test(billPayForm.ConnectionNumber)) {
        //     console.log("If");
        //     setConnectionNumberError(subCategory.ErrorMsg);
        //     console.log("else");
        //     return false;

        // }
        // const data = {
        //     ConnectionNumber: billPayForm.ConnectionNumber,
        //     ParameterName: billPayForm.billerInfo.ParameterName,
        //     BillerID: billPayForm.billerInfo.billerid,
        //     firstname: "amar",
        //     lastname: "gupta",
        //     mobile: "8882288881",
        //     email: "amar@pinkitravels.com",
        //     IPAddress: "61.246.34.128",
        //     MACAddress: "11-AC-58-21-1B-AA"
        // }
        // console.log("subCategory=>", subCategory.billerParameters);
        const parametersListData = [];
        subCategory.billerParameters.map((billerParameter, index) => {
            parametersListData.push({
                ParameterName: billerParameter.ParameterName,
                ConnectionNumber: billerParameter.ConnectionNumber,
            })
        })
        // console.log("parametersListData=====>", parametersListData);
        const data = {
            parametersLists: parametersListData,
            BillerID: subCategory?.billerid,
            firstname: "amar",
            lastname: "gupta",
            mobile: "8882288881",
            email: "amar@pinkitravels.com",
            IPAddress: "61.246.34.128",
            MACAddress: '11-AC-58-21-1B-AA'
        }
        // getFetchBillPlan(data);
        setIsLoading(true);
        const fetchBillPlanData = await userService.fetchBillPlanList(data);
        if (fetchBillPlanData?.validationid) {
            setBilIInformation(fetchBillPlanData);
            setChargeableAmount(fetchBillPlanData?.billlist[0]?.billamount);
            // setBillPayForm({ amount: fetchBillPlanData?.billlist[0]?.billamount });
            // localStorage.removeItem('recharge_information');
            // fetchBillPlanData.ConnectionNumber = billPayForm.ConnectionNumber;
            // fetchBillPlanData.amount = billPayForm.amount;
            // const billplan_information = JSON.stringify(fetchBillPlanData);
            // localStorage.setItem('billplan_information', billplan_information);
            // localStorage.setItem('is_recharge', false);
            // console.log("fetchBillPlanData==>", fetchBillPlanData?.billlist[0]?.billamount)
        } else {
            console.log("invalid connection number=======>")
            setConnectionNumberError('invalid connection number');
        }
        setIsLoading(false);
    }
    const payBillPayment = (event) => {
        event.preventDefault();
        setErrorBillerName('');
        console.log("billPayForm===>", billPayForm);
        // if (!billPayForm.billerInfo) {
        //     setErrorBillerName("Please select any one operator!");
        //     return false;
        // }

        if (billInformation?.validationid) {

            setBilIInformation(billInformation);

            localStorage.removeItem('recharge_information');
            billInformation.ConnectionNumber = subCategory.billerParameters[0]?.ConnectionNumber;//billPayForm.ConnectionNumber;
            billInformation.amount = chargeableAmount;
            // var txnid = (new Date()).getTime()+ Math.random().toString(16).slice(2);
            var txnid = Math.random().toString(16).slice(2);
            billInformation.txnid = txnid;
            // setBillPayForm({ amount: billInformation?.billlist[0]?.billamount,  });
            const billplan_information = JSON.stringify(billInformation);
            localStorage.setItem('billplan_information', billplan_information);
            localStorage.setItem('is_recharge', false);
            history.push('/pay/order-summary');
        }
    }

    const handleClick = (index) => () => {
        setErrorBillerName('');
        setConnectionNumberError('');
        setRechargeForm({ type: '', number: '', operator_info: '' })
        let category = categories[index];
        history.push(category.slug);
        setCurrentCategory(category);
        setSubCategory(null);
        GetSubCategory(category.PayID);
        setErrorBillerName("")
        setBillPayForm({
            billerInfo: "",
            ConnectionNumber: "",
            // amount: 0,
        })
        setChargeableAmount(0);

    };

    const handleClick1 = (index) => () => {
        setErrorBillerName('');
        setConnectionNumberError('');
        setRechargeForm({ type: '', number: '', operator_info: '' })
        let category = categories[index];
        history.push(category.slug);
        setCurrentCategory(category);
        setSubCategory(null);
        GetSubCategory(category.PayID);
        setErrorBillerName("")
        setBillPayForm({
            billerInfo: "",
            ConnectionNumber: "",
            // amount: 0,
        })
        setChargeableAmount(0);

    };

    async function GetCircle(billerid) {
        setIsLoading(true);
        const endPoint = 'GetCircle';
        // let billerid = 'JIOPRE'
        const circleinformation = await userService.getGetCircleList(endPoint, billerid);
        (circleinformation) ? setCircleList(circleinformation) : setCircleList([]);
        setIsLoading(false);
        // setShow(true);

    }
    async function getFetchBillPlan(data) {
        setIsLoading(true);
        const fetchBillPlanData = await userService.fetchBillPlanList(data);
        setBilIInformation(fetchBillPlanData);
        console.log("fetchBillPlanData===>", fetchBillPlanData);
        setIsLoading(false);
    }
    async function FetchPrepaidPlan(billerid, circleName) {
        setIsLoading(true);
        const endPoint = 'FetchPrepaidPlan';
        let data = {
            billerid: billerid,
            CircleName: circleName
        }
        const fetchPrepaidPlan = await userService.allFetchPrepaidPlan(endPoint, data);
        const prepaidCategoryData = fetchPrepaidPlan.prepaidcategory;
        const prepaidPlanListData = fetchPrepaidPlan.prepaidplanlist;

        (prepaidPlanListData) ? setAllPlans(prepaidPlanListData) : setAllPlans([]);
        (prepaidPlanListData) ? setPrepaidPlanList(prepaidPlanListData) : setPrepaidPlanList([]);
        (prepaidCategoryData) ? setPrepaidCategory(prepaidCategoryData) : setPrepaidCategory([]);
        // setPrepaidCategory(prepaidCategoryData);
        // setPrepaidPlanList(prepaidPlanListData);
        setIsLoading(false);
    }

    const handlePlanChange = (event) => {
        const { name, value } = event.target;
        setPlansInfo((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    useEffect(() => {
        console.log("plansInfo====>", plansInfo);
        if (plansInfo.operator && plansInfo.circle) {
            FetchPrepaidPlan(plansInfo.operator, plansInfo.circle);
        }

    }, [plansInfo]);


    const [selectedOption, setSelectedOption] = useState(null);
    const handleOperatorChange = (e) => {
        setSelectedOption(e);
        setPayNumber('');
        setErrorBillerName("")
        let currentSubCategory = e;//subCategoryList[e.target.value];
        setBillPayForm({
            billerInfo: currentSubCategory,
            ConnectionNumber: "",
            // amount: 0,
        });


        currentSubCategory.billerParameters.map((billerParameter, index) => {
            currentSubCategory.billerParameters[index].ConnectionNumber = null;

        })
        setSubCategory(currentSubCategory);
        setBillerid(currentSubCategory?.billerid);
        (currentSubCategory?.PartialPay === "N") ? setIsPartialPay(true) : setIsPartialPay(false);

    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        (plansInfo.operator) ? GetCircle(plansInfo.operator) : console.log("operator not available");
        if (plansInfo.operator && plansInfo.circle) { FetchPrepaidPlan(plansInfo.operator, plansInfo.circle) };
        setShow(true);
    }
    const handlePlanTypeChange = (event) => {
        let plantype = event.target.value;
        if (plantype) {
            let data = prepaidplanlist.filter(prepaidplan => prepaidplan.plan_category_name == plantype)
            setAllPlans(data);
        } else {
            setAllPlans(prepaidplanlist);
        }

    }
    const handleRechargeClick = (index) => {
        let selectedplan = allplans[index];
        setSelectedPlan(selectedplan);
        setShow(false);
    }

    const options1 = [
        { value: 'apple', label: <div><img src='https://utility.pinkytravels.com/Images/Icons/postpaid.png' height="30px" width="30px" />Chocolate </div>, image: '' },
        { value: 'banana', label: <div><img src='https://utility.pinkytravels.com/Images/Icons/postpaid.png' height="30px" width="30px" />Chocolate </div>, image: '' },
        { value: 'orange', label: <div><img src='https://utility.pinkytravels.com/Images/Icons/postpaid.png' height="30px" width="30px" />Chocolate </div>, image: '' }
    ];
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundImage: `url(${state.data.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '5px center',
            paddingLeft: '40px',
            height: '10',
            width: '10'
        })
    };
    const [payNumber, setPayNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isPartialPay, setIsPartialPay] = useState(true);
    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        setPayNumber(value);
        let RegexPattern = /subCategory.RegexPattern/;
        if (!RegexPattern.test(value)) {
            setEmailError(subCategory.ErrorMsg);
        } else {
            setEmailError('');
        }
    };
    const handleInputBillPaymentChange = (index, event) => {
        // const { name, value } = event.target;
        // setBillPayForm((prevProps) => ({
        //     ...prevProps,
        //     [name]: value
        // }));
        // console.log("subCategory",subCategory.billerParameters);
        // let billerParameter = subCategory.billerParameters[index];
        // console.log("subCategory.billerParameters[index]=>", subCategory.billerParameters[index]);

        const billerParameter = subCategory.billerParameters[index];
        const RegexPattern = new RegExp(billerParameter.RegexPattern);
        if (!RegexPattern.test(event.target.value)) {
            // console.log("If");
            // setConnectionNumberError(subCategory.ErrorMsg);
            // console.log("error");
            billerParameter.isError = true;
            // return false;

        }
        subCategory.billerParameters[index].ConnectionNumber = event.target.value;
        // console.log("billerParameter===>", billerParameter);
        // console.log("event", event.target.value);
        // console.log("subCategory===>", subCategory);
        setSubCategory(subCategory)
    };
    const numErrorStyle = {
        color: 'red'
    };
    if (isLoading) {
        return <div id="preloader">
            <div data-loader="dual-ring"></div>
        </div>;
    }
    return (
        <>
            <div id="main-wrapper">
                <div id="content">
                    <div className="bg-secondary desktop-view">
                        <div className="container">
                            <ul className="nav secondary-nav">
                                {categories && categories.map((category, index) => {
                                    if (index < 6) {
                                        return <li key={index} className="nav-item"> <div onClick={handleClick(index)} className={(category.slug == currentCategory.slug) ? 'active nav-link' : 'nav-link'} to={'/' + category.slug}><span><i
                                            className={category.IconClassName}></i></span> {category.PayCategory}</div> </li>
                                    }
                                })}
                                {
                                    (addMoreOptions.length > 0) ? (<AddMoreOptions addMoreOptions={addMoreOptions} handleClick={handleClick} />) : (<span></span>)
                                }

                            </ul>
                        </div>
                    </div>
                    <section className="container mt-4 mobile-view">
                        <div className="bg-white shadow-md rounded p-4">
                            <div className="row g-4">
                                <div className="col-lg-4 col-xxl-5">
                                    <div className="accordion" id="accordionExample">
                                        {categories && categories.map((category, index) => {

                                            // return <li key={index} className="nav-item"> <div onClick={handleClick(index)} className={(category.slug == currentCategory.slug) ? 'active nav-link' : 'nav-link'} to={'/' + category.slug}><span><i
                                            //     className={category.IconClassName}></i></span> {category.PayCategory}</div> </li>
                                            return <div key={index} className="accordion-item">
                                                <h2 className="accordion-header" id={'headingOne' + index} >
                                                    <button onClick={handleClick1(index)} className={(category.PayID == currentCategory.PayID) ? 'accordion-button' : 'accordion-button collapsed'} type="button" >
                                                        <span><i className={category.IconClassName}></i></span> &nbsp;{category.PayCategory}
                                                    </button>
                                                </h2>
                                                <div id={"collapseOne" + index} className={(category.PayID == currentCategory.PayID) ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'} aria-labelledby={'headingOne' + index} data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">

                                                        <h2 className="text-4 mb-3">{currentCategory.Payheading}</h2>
                                                        {isNumberTrue ? (
                                                            <form id="recharge-bill" method="post" onSubmit={handleSubmit}>
                                                                <div className="mb-3">
                                                                    <input type="text" className="form-control" data-bv-field="number" id="mobileNumber" required
                                                                        placeholder={currentCategory.DefaultMessage} name="number" value={rechargeForm.number} onChange={handleInputChange} />
                                                                    {numberError && <span style={numErrorStyle}>{numberError}</span>}
                                                                </div>
                                                                <div className="mb-3">
                                                                    {/* <SelectOperator subCategoryList={subCategoryList} billerid={billerid} plansInfo={plansInfo} handleOperatorChange={handleOperatorChange} selectedOption={selectedOption} /> */}
                                                                    <Select
                                                                        placeholder="Select Your Operator"
                                                                        value={selectedOption}
                                                                        options={subCategoryList}
                                                                        onChange={props.handleOperatorChange}
                                                                        getOptionLabel={e => (
                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <span><img height={45} width={45} src={e.BillerLogo} alt='' /></span>
                                                                                <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="input-group mb-3"> <span className="input-group-text"></span> <div onClick={handleShow} href="#"
                                                                    className="view-plans-link">View Plans</div>
                                                                    <input className="form-control" id="amount" placeholder="Enter Amount" value={selectedPlan?.amount} required type="text" />
                                                                </div>
                                                                {planError && <span style={numErrorStyle}>{planError}</span>}
                                                                <div className="d-grid">
                                                                    <button className="btn btn-primary">Continue to Recharge</button>
                                                                </div>
                                                            </form>
                                                        ) : (
                                                            <form id="recharge-bill" method="post" onSubmit={handleBillPaymentSubmit}>
                                                                <div className="mb-3">

                                                                    {/* <select className="form-select" id="operator" name="operator" required="" onChange={handleOperatorChange}>
                                                                        <option value="">Select Your Operator</option>
                                                                        {subCategoryList && subCategoryList.map((subCategory, index) => {
                                                                            return <option key={index} value={index} selected={billPayForm?.billerInfo?.billerid === subCategory.billerid}>{subCategory.BillerName}</option>;
                                                                        })}
                                                                    </select> */}

                                                                    <Select
                                                                        placeholder="Select Your Operator"
                                                                        value={selectedOption}
                                                                        options={subCategoryList}
                                                                        onChange={handleOperatorChange}
                                                                        getOptionLabel={e => (
                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <span><img height={45} width={45} src={e.BillerLogo} alt="" /></span>
                                                                                <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                    {errorBillerName && <span style={numErrorStyle}>{errorBillerName}</span>}
                                                                </div>
                                                                {
                                                                    subCategory && subCategory.billerParameters && subCategory.billerParameters.map((billerParameter, index) => (
                                                                        <div className="mb-3">
                                                                            <input type="text" className="form-control" data-bv-field={billerParameter?.ConnectionNumber} required value={billerParameter?.ConnectionNumber} onChange={(event) => handleInputBillPaymentChange(index, event)}
                                                                                placeholder={billerParameter?.ParameterName} name={billerParameter?.ConnectionNumber} />
                                                                            {(billerParameter?.isError == true) && <span style={numErrorStyle}> {billerParameter?.ErrorMsg} </span>}
                                                                            <span>{billerParameter?.ErrorMs} {billerParameter?.ConnectionNumber}</span>
                                                                        </div>
                                                                    ))
                                                                }
                                                                {/* <div className="mb-3">
                                                                    <input type="text" className="form-control" data-bv-field="ConnectionNumber" id="ConnectionNumber" required value={billPayForm.ConnectionNumber} onChange={handleInputBillPaymentChange}
                                                                        placeholder={subCategory?.ParameterName} name="ConnectionNumber" />
                                                                    {connectionNumberError && <span style={numErrorStyle}>{connectionNumberError}</span>}
                                                                </div> */}
                                                                {isPartialPay ? (<div className="mb-3">
                                                                    <input type="text" className="form-control" data-bv-field="amount" id="amount" value={chargeableAmount} readOnly onChange={(event) => setChargeableAmount(event.target.value)}
                                                                        placeholder="Amount" name="amount" />
                                                                </div>) : (<div className="mb-3">
                                                                    <input type="text" className="form-control" data-bv-field="amount" id="amount" value={chargeableAmount} onChange={(event) => setChargeableAmount(event.target.value)}
                                                                        placeholder="Amount" name="amount" />
                                                                </div>)}
                                                                {
                                                                    (billInformation?.validationid) ? (<div className="d-grid">
                                                                        <div className="btn btn-primary w-100" onClick={payBillPayment}>Pay</div>
                                                                    </div>) : (<div className="d-grid"><button className="btn btn-primary">Continue to Pay</button> </div>)
                                                                }
                                                            </form>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="col-lg-8 col-xxl-7">
                                    <OfferImageSlider offers={offers} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="container desktop-view">
                        <div className="bg-white shadow-md rounded p-4">
                            <div className="row g-4">
                                <div className="col-lg-4 col-xxl-5">
                                    <h2 className="text-4 mb-3">{currentCategory.Payheading}</h2>
                                    {isNumberTrue ? (
                                        <form id="recharge-bill" method="post" onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <input type="text" className="form-control" data-bv-field="number" id="mobileNumber" required
                                                    placeholder={currentCategory.DefaultMessage} name="number" value={rechargeForm.number} onChange={handleInputChange} />
                                                {numberError && <span style={numErrorStyle}>{numberError}</span>}
                                            </div>
                                            <div className="mb-3">
                                                <Select
                                                    placeholder="Select Your Operator"
                                                    value={selectedOption}
                                                    options={subCategoryList}
                                                    onChange={handleOperatorChange}
                                                    getOptionLabel={e => (
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span><img height={45} width={45} src={e.BillerLogo} alt="" /></span>
                                                            <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                                                        </div>
                                                    )}
                                                />
                                                {/* <SelectOperator subCategoryList={subCategoryList} billerid={billerid} plansInfo={plansInfo} handleOperatorChange={handleOperatorChange} /> */}
                                            </div>
                                            <div className="input-group mb-3"> <span className="input-group-text"></span> <div onClick={handleShow} href="#"
                                                className="view-plans-link">View Plans</div>
                                                <input className="form-control" id="amount" placeholder="Enter Amount" value={selectedPlan?.amount} required type="text" />
                                            </div>
                                            {planError && <span style={numErrorStyle}>{planError}</span>}
                                            <div className="d-grid">
                                                <button className="btn btn-primary">Continue to Recharge</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <form id="recharge-bill" method="post" onSubmit={handleBillPaymentSubmit}>
                                            <div className="mb-3">
                                                {/* <select className="form-select" id="operator" name="operator" required="" onChange={handleOperatorChange}>
                                                    <option value="">Select Your Operator</option>
                                                    {subCategoryList && subCategoryList.map((subCategory, index) => {
                                                        return <option key={index} value={index} selected={billPayForm?.billerInfo?.billerid === subCategory.billerid}>{subCategory.BillerName}</option>;
                                                    })}
                                                </select> */}
                                                <Select
                                                    placeholder="Select Your Operator"
                                                    value={selectedOption}
                                                    options={subCategoryList}
                                                    onChange={handleOperatorChange}
                                                    getOptionLabel={e => (
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span><img height={45} width={45} src={e.BillerLogo} alt="" /></span>
                                                            <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                                                        </div>
                                                    )}
                                                />
                                                {errorBillerName && <span style={numErrorStyle}>{errorBillerName}</span>}
                                            </div>
                                            {
                                                subCategory && subCategory.billerParameters && subCategory.billerParameters.map((billerParameter, index) => (
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" data-bv-field={billerParameter?.ConnectionNumber} required value={billerParameter?.ConnectionNumber} onChange={(event) => handleInputBillPaymentChange(index, event)}
                                                            placeholder={billerParameter?.ParameterName} name={billerParameter?.ConnectionNumber} />
                                                        {(billerParameter?.isError == true) && <span style={numErrorStyle}> {billerParameter?.ErrorMsg} </span>}
                                                        <span>{billerParameter?.ErrorMs} {billerParameter?.ConnectionNumber}</span>
                                                    </div>
                                                ))
                                            }
                                            {isPartialPay ? (<div className="mb-3">
                                                <input type="text" className="form-control" data-bv-field="amount" id="amount" value={chargeableAmount} readOnly onChange={(event) => setChargeableAmount(event.target.value)}
                                                    placeholder="Amount" name="amount" />
                                            </div>) : (<div className="mb-3">
                                                <input type="text" className="form-control" data-bv-field="amount" id="amount" value={chargeableAmount} onChange={(event) => setChargeableAmount(event.target.value)}
                                                    placeholder="Amount" name="amount" />
                                            </div>)}

                                            {
                                                (billInformation?.validationid) ? (<div className="d-grid">
                                                    <div className="btn btn-primary w-100" onClick={payBillPayment}>Pay</div>
                                                </div>) : (<div className="d-grid"><button className="btn btn-primary">Continue to Pay</button> </div>)
                                            }

                                        </form>

                                    )}

                                    {/* {billInformation ? (
                                        <pre>
                                            <div>{JSON.stringify(billInformation, null, 2)}</div>
                                        </pre>
                                    ) : (
                                        <div>not available data</div>

                                    )} */}
                                </div>
                                <div className="col-lg-8 col-xxl-7">
                                    <OfferImageSlider offers={offers} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="section pt-4 pb-3">
                        <div className="container">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item"> <a className="nav-link active" id="mobile-recharge-tab" data-bs-toggle="tab"
                                    href="#mobile-recharge" role="tab" aria-controls="mobile-recharge" aria-selected="true">Mobile
                                    Recharge</a> </li>
                                <li className="nav-item"> <a className="nav-link" id="billpayment-tab" data-bs-toggle="tab" href="#billpayment"
                                    role="tab" aria-controls="billpayment" aria-selected="false">Bill Payment</a> </li>
                                <li className="nav-item"> <a className="nav-link" id="why-quickai-tab" data-bs-toggle="tab" href="#why-quickai"
                                    role="tab" aria-controls="why-quickai" aria-selected="false">Why Quickai</a> </li>
                            </ul>
                            <div className="tab-content my-3" id="myTabContent">
                                <div className="tab-pane fade show active" id="mobile-recharge" role="tabpanel"
                                    aria-labelledby="mobile-recharge-tab">
                                    <p>Instant Online mobile recharge Iisque persius interesset his et, in quot quidam persequeris vim, ad mea
                                        essent possim iriure. Mutat tacimates id sit. Ridens mediocritatem ius an, eu nec magna imperdiet.
                                        Mediocrem qualisque in has. Enim utroque perfecto id mei, ad eam tritani labores facilisis, ullum
                                        sensibus no cum. Eius eleifend in quo. At mei alia iriure propriae.</p>
                                    <p>Partiendo voluptatibus ex cum, sed erat fuisset ne, cum ex meis volumus mentitum. Alienum pertinacia
                                        maiestatis ne eum, verear persequeris et vim. Mea cu dicit voluptua efficiantur, nullam labitur veritus
                                        sit cu. Eum denique omittantur te, in justo epicurei his, eu mei aeque populo. Cu pro facer sententiae,
                                        ne brute graece scripta duo. No placerat quaerendum nec, pri alia ceteros adipiscing ut. Quo in nobis
                                        nostrum intellegebat. Ius hinc decore erroribus eu, in case prima exerci pri. Id eum prima adipisci. Ius
                                        cu minim theophrastus, legendos pertinacia an nam. <a href="#">Read Terms</a></p>
                                </div>
                                <div className="tab-pane fade" id="billpayment" role="tabpanel" aria-labelledby="billpayment-tab">
                                    <p>Partiendo voluptatibus ex cum, sed erat fuisset ne, cum ex meis volumus mentitum. Alienum pertinacia
                                        maiestatis ne eum, verear persequeris et vim. Mea cu dicit voluptua efficiantur, nullam labitur veritus
                                        sit cu. Eum denique omittantur te, in justo epicurei his, eu mei aeque populo. Cu pro facer sententiae,
                                        ne brute graece scripta duo. No placerat quaerendum nec, pri alia ceteros adipiscing ut. Quo in nobis
                                        nostrum intellegebat. Ius hinc decore erroribus eu, in case prima exerci pri. Id eum prima adipisci. Ius
                                        cu minim theophrastus, legendos pertinacia an nam.</p>
                                    <p>Instant Online mobile recharge Iisque persius interesset his et, in quot quidam persequeris vim, ad mea
                                        essent possim iriure. Mutat tacimates id sit. Ridens mediocritatem ius an, eu nec magna imperdiet.
                                        Mediocrem qualisque in has. Enim utroque perfecto id mei, ad eam tritani labores facilisis, ullum
                                        sensibus no cum. Eius eleifend in quo. At mei alia iriure propriae.</p>
                                </div>
                                <div className="tab-pane fade" id="why-quickai" role="tabpanel" aria-labelledby="why-quickai-tab">
                                    <p>Cu pro facer sententiae, ne brute graece scripta duo. No placerat quaerendum nec, pri alia ceteros
                                        adipiscing ut. Quo in nobis nostrum intellegebat. Ius hinc decore erroribus eu, in case prima exerci
                                        pri. Id eum prima adipisci. Ius cu minim theophrastus, legendos pertinacia an nam.</p>
                                    <p>Partiendo voluptatibus ex cum, sed erat fuisset ne, cum ex meis volumus mentitum. Alienum pertinacia
                                        maiestatis ne eum, verear persequeris et vim. Mea cu dicit voluptua efficiantur, nullam labitur veritus
                                        sit cu. Eum denique omittantur te, in justo epicurei his, eu mei aeque populo.</p>
                                    <p>Instant Online mobile recharge Iisque persius interesset his et, in quot quidam persequeris vim, ad mea
                                        essent possim iriure. Mutat tacimates id sit. Ridens mediocritatem ius an, eu nec magna imperdiet.
                                        Mediocrem qualisque in has. Enim utroque perfecto id mei, ad eam tritani labores facilisis, ullum
                                        sensibus no cum. Eius eleifend in quo. At mei alia iriure propriae.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReferEarnSection />
                    <DownloadOurApp />

                </div>
            </div>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href=""><i
                className="fa fa-chevron-up"></i></a>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Browse Plans</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">
                        <form className="row g-3 mb-4" method="post">
                            <div className="col-12 col-sm-6 col-lg-4">
                                {/* <select className="form-select" required="" name="operator" value={plansInfo.operator} onChange={handlePlanChange}>
                                    <option value="">Select Your Operator</option>
                                    {subCategoryList.map((subCategory, index) => {
                                        return <option key={index} value={subCategory.billerid} selected={subCategory.billerid == billerid}>{billerid} {subCategory.billerid} {subCategory.BillerName}</option>
                                    })}
                                </select> */}
                                {/* <SelectOperator subCategoryList={subCategoryList} billerid={billerid} plansInfo={plansInfo} handleOperatorChange={handleOperatorChange} /> */}
                                <Select
                                    placeholder="Select Your Operator"
                                    value={selectedOption}
                                    options={subCategoryList}
                                    onChange={handleOperatorChange}
                                    getOptionLabel={e => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span><img height={45} width={45} src={e.BillerLogo} alt="" /></span>
                                            <span style={{ marginLeft: 5 }}>{e.BillerName}</span>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4">
                                <select className="form-select" required="" name="circle" value={plansInfo.circle} onChange={handlePlanChange}>
                                    <option value="">Select Your Circle</option>
                                    {circles.map((circle, index) => {
                                        return <option key={index} value={circle.CircleName}>{circle.CircleName}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-4">
                                <select className="form-select" required="" name="plantype" onChange={handlePlanTypeChange}>
                                    <option value="">All Plans</option>
                                    {prepaidcategory.map((prepaidcat, index) => {
                                        return <option key={index} value={prepaidcat.PlanCategory}>{prepaidcat.PlanCategory}</option>
                                    })}
                                </select>
                            </div>
                        </form>
                        <div className="plans">
                            <div className="row align-items-center">
                                <div className="col-4 col-lg-2 text-5 text-center">Amount</div>

                                <div className="col-4 col-lg-2 text-5 text-center">Top Plan</div>

                                <div className="col-4 col-lg-2 text-5 text-center">Validity Days</div>

                                <div className="col-3 col-lg-1 text-5 text-center">Category</div>

                                <div className="col-5 col-lg-3 text-5 text-center">Description</div>

                                <hr className="my-4" />
                            </div>
                            {allplans && allplans.map((plan, index) => {
                                return <div key={index} className="row align-items-center">
                                    <div className="col-3 col-lg-2 text-5 text-primary text-center">{plan.amount}<span
                                        className="text-1 text-muted d-block"></span></div>

                                    <div className="col-3 col-lg-2 text-3 text-center">{plan.top_plan}<span className="text-1 text-muted d-block">Talktime</span>
                                    </div>

                                    <div className="col-3 col-lg-2 text-3 text-center">{plan.validity} Days<span
                                        className="text-1 text-muted d-block">Validity</span></div>

                                    <div className="col-3 col-lg-2 my-2 my-lg-0 text-1 text-muted">{plan.plan_category_name}</div>
                                    <div className="col-7 col-lg-2 my-2 my-lg-0 text-1 text-muted" style={{ textAlign: 'justify' }}>{plan.plan_description}</div>

                                    <div className="col-5 col-lg-2 my-2 my-lg-0 text-end text-lg-center">
                                        <button className="btn btn-sm btn-outline-primary shadow-none text-nowrap" onClick={() => handleRechargeClick(index)} type="submit">Recharge</button>
                                    </div>
                                    <hr className="my-4" />
                                </div>
                            })}
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
export default Home;