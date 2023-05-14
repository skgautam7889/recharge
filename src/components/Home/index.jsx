import { Link, useLocation, useHistory } from "react-router-dom";
import DownloadOurApp from "../DownloadOurApp";
import ReferEarnSection from "../ReferEarnSection";
import React, { useState, useEffect } from 'react';
import OfferImageSlider from "../OfferImageSlider";
import { userService } from "../Services";

import { Modal, Button } from "react-bootstrap";

import Select from 'react-select';
import SelectOperator from "../SelectOperator";
import { useContext } from 'react';
const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [subCategory, setSubCategory] = useState(null);
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
    const [billPayForm, setBillPayForm] = useState({
        billerInfo: "",
        ConnectionNumber: ""
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
        const endPoint = 'GetHomePageData';
        const categorylists = await userService.getCategoriesList(endPoint);
        setCurrentCategory(categorylists[0]);
        setCategories(categorylists);
        setIsLoading(false);
    }
    async function GetSubCategory(categoryId) {
        setIsLoading(true);
        const endPoint = 'GetSubCategory';
        const subCategoryList = await userService.getGetSubCategoryList(endPoint, categoryId);

        const options1 = subCategoryList.map((subcategory) => {
            subcategory.image = subcategory.BillerLogo;
            subcategory.value = subcategory.BillerName;
            subcategory.label = "hello";
            subcategory.label = <div><img src={subcategory.BillerLogo} height="20px" width="20px" />{subcategory.BillerName} </div>;
            return subcategory;
        });
        setSubCategoryList(options1);
        setIsLoading(false);

    }
    async function getGetOperatorDetails(number) {
        setIsLoading(true);
        const endPoint = 'GetOperatorDetails';
        const operatorDetails = await userService.getGetOperatorDetailsList(endPoint, number);
        plansInfo.operator = operatorDetails?.billerid;
        plansInfo.circle = operatorDetails?.circle_name;
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
        console.log("name===>", name);
        console.log("value====>", value);
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

        // const recharge_info = {
        //     selectedPlan: selectedPlan,
        //     recharge_form: rechargeForm,
        //     number: rechargeForm.number,
        //     plan_description: selectedPlan.plan_description
        // }
        console.log("selectedPlan==>",selectedPlan);
        selectedPlan.number = rechargeForm.number;
        if(!rechargeForm.number){
            setNumberError("Please enter number")
            return false;
        }
        if (!/^[0-9]{10}$/.test(rechargeForm.number)) {
            setNumberError("Please enter a valid phone number");
            return false;
        }
        if(selectedPlan.length==0){
            setPlanError("Please select Plan");
            return false;
        }
        return false;
        selectedPlan.total_pay_amount = selectedPlan.amount;
        

        const recharge_information = JSON.stringify(selectedPlan);
        localStorage.setItem('recharge_information', recharge_information);
        history.push('/pay/order-summary');

        // history.push('pay/order-summary',{state});
    };
    const handleBillPaymentSubmit = (event) => {
        event.preventDefault();
        setErrorBillerName('');
        console.log("billPayForm===>",);

        if (!billPayForm.billerInfo) {
            setErrorBillerName("Please select any one operator!");
            return false;
        }
        if (!billPayForm.ConnectionNumber) {
            setConnectionNumberError("Please Enter connectionNumber!");
            return false;
        }
        const RegexPattern = new RegExp(billPayForm.billerInfo.RegexPattern);
        console.log("RegexPattern===>", RegexPattern);
        if (!RegexPattern.test(billPayForm.ConnectionNumber)) {
            console.log("If");
            setConnectionNumberError(subCategory.ErrorMsg);
            console.log("else");
            return false;

        }
        const data = {
            ConnectionNumber: billPayForm.ConnectionNumber,
            ParameterName: billPayForm.billerInfo.ParameterName,
            BillerID: billPayForm.billerInfo.billerid,
            firstname: "amar",
            lastname: "gupta",
            mobile: "8882288881",
            email: "amar@pinkitravels.com",
            IPAddress: "61.246.34.128",
            MACAddress: "11-AC-58-21-1B-AA"
        }
        getFetchBillPlan(data);
    }

    const handleClick = (index) => () => {
        setErrorBillerName('');
        setConnectionNumberError('');
        setRechargeForm({ type: '', number: '', operator_info: '' })
        let category = categories[index];
        history.push(category.slug);
        setCurrentCategory(category);
        GetSubCategory(category.PayID);
        setErrorBillerName("")
        setBillPayForm({
            billerInfo: "",
            ConnectionNumber: ""
        })
        setSubCategory(null);
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


    const handleOperatorChange = (e) => {
        setPayNumber('');
        setErrorBillerName("")
        let currentSubCategory = subCategoryList[e.target.value];
        setBillPayForm({
            billerInfo: currentSubCategory,
            ConnectionNumber: ""
        })
        setSubCategory(currentSubCategory);
        setBillerid(currentSubCategory?.billerid);
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
    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        setPayNumber(value);
        let RegexPattern = /subCategory.RegexPattern/;
        if (!RegexPattern.test(value)) {
            setEmailError(subCategory.ErrorMsg);
        } else {
            setEmailError('');
        }

        // if(RegexPattern){

        //     let result = '';//RegexPattern.test(value);
        //     if(result){
        //         console.log("result===>",result);
        //     }else{
        //         console.log("result  else==>",result)
        //     }
        // }
        // if (!validateNumber(event.target.value)) {
        //     setEmailError('Please enter a valid email address.');
        // } else {
        //     setEmailError('');
        // }

        // console.log("name===>", name);
        // console.log("value====>", value);
        // if (name == 'number' && value.length == 10) {
        //     getGetOperatorDetails(value);
        // }
        // setRechargeForm((prevProps) => ({
        //     ...prevProps,
        //     [name]: value
        // }));
    };
    function validateNumber() {

    }
    const handleInputBillPaymentChange = (event) => {
        const { name, value } = event.target;
        setBillPayForm((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
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
                    <div className="bg-secondary">
                        <div className="container">
                            <ul className="nav secondary-nav">
                                {categories.map((category, index) => {
                                    return <li key={index} className="nav-item"> <div onClick={handleClick(index)} className={(category.slug == currentCategory.slug) ? 'active nav-link' : 'nav-link'} to={'/' + category.slug}><span><i
                                        className={category.IconClassName}></i></span> {category.PayCategory}</div> </li>
                                })}
                            </ul>
                        </div>
                    </div>

                    <section className="container">
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
                                                {/* <select className="form-select" id="operator" required="" name="operator" onChange={handleOperatorChange}>
                                                        <option value="">Select Your Operator</option>
                                                        {subCategoryList.map((subCategory, index) => {
                                                            return <option key={index} value={index} selected={subCategory.billerid === billerid}>{billerid} {subCategory.billerid} {subCategory.BillerName}</option>
                                                        })}
                                                    </select> */}
                                                <SelectOperator subCategoryList={subCategoryList} billerid={billerid} plansInfo={plansInfo} handleOperatorChange={handleOperatorChange} />
                                            </div>
                                            <div className="input-group mb-3"> <span className="input-group-text">$</span> <div onClick={handleShow} href="#"
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
                                                <select className="form-select" id="operator" name="operator" required="" onChange={handleOperatorChange}>
                                                    <option value="">Select Your Operator</option>
                                                    {subCategoryList.map((subCategory, index) => {
                                                        return <option key={index} value={index} selected={billPayForm?.billerInfo?.billerid === subCategory.billerid} >{subCategory.BillerName}</option>
                                                    })}
                                                </select>
                                                {errorBillerName && <span style={numErrorStyle}>{errorBillerName}</span>}
                                            </div>
                                            <div className="mb-3">

                                                <input type="text" className="form-control" data-bv-field="ConnectionNumber" id="ConnectionNumber" required value={billPayForm.ConnectionNumber} onChange={handleInputBillPaymentChange}
                                                    placeholder={subCategory?.ParameterName} name="ConnectionNumber" />
                                                {connectionNumberError && <span style={numErrorStyle}>{connectionNumberError}</span>}

                                            </div>
                                            {/* <div className="input-group mb-3">
                                                <input className="form-control" id="amount" placeholder="Enter Amount" value={selectedPlan?.amount} required type="text" />
                                            </div> */}
                                            <div className="d-grid">
                                                <button className="btn btn-primary">Continue to Pay</button>
                                            </div>
                                        </form>

                                    )}

                                    {billInformation ? (
                                        <pre>
                                            <div>{JSON.stringify(billInformation, null, 2)}</div>
                                        </pre>
                                    ) : (
                                        <div>not available data</div>

                                    )}
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
                                <SelectOperator subCategoryList={subCategoryList} billerid={billerid} plansInfo={plansInfo} handleOperatorChange={handleOperatorChange} />
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
                            {allplans.map((plan, index) => {
                                return <div key={index} className="row align-items-center">
                                    <div className="col-4 col-lg-2 text-5 text-primary text-center">{plan.amount}<span
                                        className="text-1 text-muted d-block">Amount</span></div>

                                    <div className="col-4 col-lg-2 text-3 text-center">{plan.top_plan}<span className="text-1 text-muted d-block">Talktime</span>
                                    </div>

                                    <div className="col-4 col-lg-2 text-3 text-center">{plan.validity} Days<span
                                        className="text-1 text-muted d-block">Validity</span></div>

                                    <div className="col-3 col-lg-1 my-2 my-lg-0 text-1 text-muted">{plan.plan_category_name}</div>

                                    <div className="col-5 col-lg-3 my-2 my-lg-0 text-1 text-muted">{plan.plan_description}</div>

                                    <div className="col-4 col-lg-2 my-2 my-lg-0 text-end text-lg-center">
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