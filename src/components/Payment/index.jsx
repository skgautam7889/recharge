import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useId} from 'react';
import { userService } from "../Services";
import { PaymentService } from '../Services/PaymentService';
import PopupComponent from './PopupComponent';
import { Modal, Button } from "react-bootstrap";
const Payment = () => {
    const location = useLocation();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isDiscountApply, setIsDiscountApply] = useState(false);
    const [discounAmount, setDiscounAmount] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [billInformation, setBillInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('');
    const [upis, setUPI] = useState([]);
    const [wallets, setWallets] = useState([]);

    const [showPopup, setShowPopup] = useState(true);
    const [htmlContent, setHtmlContent] = useState('');
    const [show, setShow] = useState(false);

    const furl = "http://localhost:3000/recharge/#/pay/payment-success";
    const surl = "http://localhost:3000/recharge/#/pay/payment-success";

    useEffect(() => {
        const recharge_information = localStorage.getItem('recharge_information');
        if (recharge_information) {
            setSelectedPlan(JSON.parse(recharge_information))
        }
        const billplan_information = localStorage.getItem('billplan_information');
        if (billplan_information) {
            setBillInformation(JSON.parse(billplan_information))
        }
    }, []);

    useEffect(() => {
        if (selectedPlan?.billerid) {
            getPaymentMethodList(selectedPlan?.billerid);
        }
        if (billInformation?.billerid) {
            getPaymentMethodList(billInformation?.billerid);
        }

    }, [selectedPlan, billInformation]);


    const paypentPayForm = (event) => {
        event.preventDefault();
        console.log("selectedPlan====>", selectedPlan);
    };
    async function getPaymentMethodList(billerid) {
        setIsLoading(true);
        const paymentMethodList = await userService.getPaymentMethodList(billerid);
        setPaymentMethods(paymentMethodList);
        setActiveTab(paymentMethodList[0]?.Paymethod);
        setIsLoading(false);
    }


    const months = [
        { 'id': 1, name: "January" },
        { 'id': 2, name: "February" },
        { 'id': 3, name: "March" },
        { 'id': 4, name: "April" },
        { 'id': 5, name: "May" },
        { 'id': 6, name: "June" },
        { 'id': 7, name: "July" },
        { 'id': 8, name: "August" },
        { 'id': 9, name: "September" },
        { 'id': 10, name: "October" },
        { 'id': 11, name: "November" },
        { 'id': 12, name: "December" },
    ]
    var years = Array.from(Array(2051 - new Date().getFullYear()), (_, i) => (i + new Date().getFullYear()).toString())

    const handleTabClick = (index) => {
        setActiveTab(paymentMethods[index]?.Paymethod);
        setUPI(paymentMethods[index]?.paymentValues);
        setWallets(paymentMethods[index]?.paymentValues)
    }

    const handleWalletPayment = (index) => {
        let wallet = wallets[index];
        const data = {
            "txnid": "Adn1211232234",
            "amount": "10.00",
            "firstname": "Adnan",
            "email": "test@gmail.com",
            "phone": "9876543210",
            "productinfo": "iPhone14",
            pg: wallet.pg,
            bankcode: wallet?.Bankcode,
            "surl": "https://apiplayground-response.herokuapp.com/",
            "furl": "https://apiplayground-response.herokuapp.com/",
            "clientid": "0"
        }
        payPaymentRequestwithWallets(data);
    }
    const handleUPIPayment = (index) => {
        console.log("handleUPIPayment index",index);
        console.log("selectedPlan===>",selectedPlan)
        console.log("billInformation==>",billInformation);
        let txnid = (selectedPlan?.txnid)?selectedPlan?.txnid:(billInformation?.txnid);
        let upi = upis[index];
        console.log("upi===>",upi);
        const data = {
            txnid: txnid,
            "amount": "10.00",
            "firstname": "Adnan",
            "email": "test@gmail.com",
            "phone": "9876543210",
            "productinfo": "iPhone14",
            pg: upi.pg,
            bankcode: upi.Bankcode,
            "vpa": "anything@payu",
            surl: surl,
            furl: furl,
            "clientid": "0"
          }
        payPaymentRequestwithUPI(data);
    }
    async function payPaymentRequestwithWallets(data) {
        setIsLoading(true);
        const paymentresponse = await PaymentService.payPaymentRequestwithUPI(data);
        setHtmlContent(paymentresponse);
        setShow(true);
        setShowPopup(true);
        console.log("paymentresponse", paymentresponse);
        setIsLoading(false);
    }
    async function payPaymentRequestwithUPI(data) {
        setIsLoading(true);
        const paymentresponse = await PaymentService.payPaymentRequestwithWallets(data);
        setHtmlContent(paymentresponse);
        setShow(true);
        setShowPopup(true);
        console.log("paymentresponse", paymentresponse);
        setIsLoading(false);
    }
    const handleClose = () => setShow(false);

    if (isLoading) {
        return <div id="preloader">
            <div data-loader="dual-ring"></div>
        </div>;
    }
    return (
        <>
            <div id="content">
                <div className="container">
                    <div className="row my-5">
                        <div className="col-lg-11 mx-auto">
                            <div className="row widget-steps">
                                <div className="col-3 step complete">
                                    <div className="step-name">Order</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="" className="step-dot"></a> </div>
                                <div className="col-3 step complete">
                                    <div className="step-name">Summary</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="recharge-order-summary.html" className="step-dot"></a> </div>
                                <div className="col-3 step active">
                                    <div className="step-name">Payment</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                                <div className="col-3 step disabled">
                                    <div className="step-name">Done</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                            </div>

                        </div>
                        <div className="col-lg-12 text-center mt-5">
                            <h2 className="text-8">Select a Payment Mode</h2>
                        </div>
                        <div className="col-lg-10 mx-auto mt-3">
                            <div className="bg-white shadow-sm rounded p-4 p-lg-5">
                                <div className="row gx-5">
                                    <div className="col-md-7 col-lg-7 order-1 order-md-0">
                                        <ul className="nav nav-tabs mb-4 nav-fill" id="myTab" role="tablist">
                                            {
                                                paymentMethods && paymentMethods.map((payment, index) => (
                                                    <li key={index} className="nav-item">
                                                        <button className={(payment.Paymethod == activeTab) ? 'nav-link text-4 lh-lg active' : 'nav-link text-4 lh-lg'} onClick={() => handleTabClick(index)}>{payment.Paymethod}</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        <div className="tab-content" id="myTabContentVertical">

                                            {activeTab === 'CreditCard' && <div className="tab-pane fade show active" id="CreditCard" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Enter Credit Card Details</h3>
                                                <form id="payment" method="post" onSubmit={paypentPayForm}>
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label" htmlFor="cardNumber">Enter Credit Card Number</label>
                                                            <input type="text" className="form-control" data-bv-field="cardnumber" id="cardNumber" required placeholder="Card Number" />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryMonth">Expiry Month</label>
                                                                <select id="expiryMonth" className="form-select" required="">
                                                                    <option value="">Expiry Month</option>
                                                                    <option value="1">January</option>
                                                                    {
                                                                        months && months.map((month, index) => (
                                                                            <option key={index} value={month.id}>{month.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryYear">Expiry Year</label>
                                                                <select id="expiryYear" className="form-select" required="">
                                                                    <option value="">Expiry Year</option>
                                                                    {
                                                                        years && years.map((year, index) => (
                                                                            <option key={index}>{year}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label className="form-label" htmlFor="cvvNumber">CVV</label>
                                                            <input type="text" className="form-control" data-bv-field="cvvnumber" id="cvvNumber" required placeholder="CVV Number" />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label" htmlFor="cardHolderName">Card Holder Name</label>
                                                            <input type="text" className="form-control" data-bv-field="cardholdername" id="cardHolderName" required placeholder="Card Holder Name" />
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check">
                                                                <input id="save-card" name="savecard" className="form-check-input" type="checkbox" />
                                                                <label className="form-check-label" htmlFor="save-card">Save my card Details.</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-grid"> <button className="btn btn-primary" href="#">Proceed to Pay</button> </div>
                                                    </div>
                                                </form>
                                            </div>}
                                            {activeTab === 'DebitCard' && <div className="tab-pane fade show active" id="DebitCard" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Enter Debit Card Details</h3>
                                                <form id="payment" method="post" onSubmit={paypentPayForm}>
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label" htmlFor="cardNumber">Enter Debit Card Number</label>
                                                            <input type="text" className="form-control" data-bv-field="cardnumber" id="cardNumber" required placeholder="Card Number" />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryMonth">Expiry Month</label>
                                                                <select id="expiryMonth" className="form-select" required="">
                                                                    <option value="">Expiry Month</option>
                                                                    <option value="1">January</option>
                                                                    {
                                                                        months && months.map((month, index) => (
                                                                            <option key={index} value={month.id}>{month.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryYear">Expiry Year</label>
                                                                <select id="expiryYear" className="form-select" required="">
                                                                    <option value="">Expiry Year</option>
                                                                    {
                                                                        years && years.map((year, index) => (
                                                                            <option key={index}>{year}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label className="form-label" htmlFor="cvvNumber">CVV</label>
                                                            <input type="text" className="form-control" data-bv-field="cvvnumber" id="cvvNumber" required placeholder="CVV Number" />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label" htmlFor="cardHolderName">Card Holder Name</label>
                                                            <input type="text" className="form-control" data-bv-field="cardholdername" id="cardHolderName" required placeholder="Card Holder Name" />
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check">
                                                                <input id="save-card" name="savecard" className="form-check-input" type="checkbox" />
                                                                <label className="form-check-label" htmlFor="save-card">Save my card Details.</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-grid"> <button className="btn btn-primary" href="#">Proceed to Pay</button> </div>
                                                    </div>
                                                </form>
                                            </div>}
                                            {activeTab === 'PrepaidCard' && <div className="tab-pane fade show active" id="PrepaidCard" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Enter Prepaid Card Details</h3>
                                                <form id="payment" method="post" onSubmit={paypentPayForm}>
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label" htmlFor="cardNumber">Enter Prepaid Card Number</label>
                                                            <input type="text" className="form-control" data-bv-field="cardnumber" id="cardNumber" required placeholder="Card Number" />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryMonth">Expiry Month</label>
                                                                <select id="expiryMonth" className="form-select" required="">
                                                                    <option value="">Expiry Month</option>
                                                                    <option value="1">January</option>
                                                                    {
                                                                        months && months.map((month, index) => (
                                                                            <option key={index} value={month.id}>{month.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryYear">Expiry Year</label>
                                                                <select id="expiryYear" className="form-select" required="">
                                                                    <option value="">Expiry Year</option>
                                                                    {
                                                                        years && years.map((year, index) => (
                                                                            <option key={index}>{year}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <label className="form-label" htmlFor="cvvNumber">CVV</label>
                                                            <input type="text" className="form-control" data-bv-field="cvvnumber" id="cvvNumber" required placeholder="CVV Number" />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label" htmlFor="cardHolderName">Card Holder Name</label>
                                                            <input type="text" className="form-control" data-bv-field="cardholdername" id="cardHolderName" required placeholder="Card Holder Name" />
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check">
                                                                <input id="save-card" name="savecard" className="form-check-input" type="checkbox" />
                                                                <label className="form-check-label" htmlFor="save-card">Save my card Details.</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-grid"> <button className="btn btn-primary" href="#">Proceed to Pay</button> </div>
                                                    </div>
                                                </form>
                                            </div>}
                                            {activeTab === 'UPI' && <div className="tab-pane fade show active" id="UPI" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Select Any UPI</h3>
                                                <div className="row g-3">
                                                    {
                                                        upis && upis.map((upi, index) => (
                                                            <div key={index} className="col-12">
                                                                <div className="row">
                                                                    <div className='col-2'>
                                                                        <input type="radio" name='upi' onClick={()=>handleUPIPayment(index)} />
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div style={{ height: "60px", width: "60px" }}>
                                                                            <img className="img-fluid" src={upi?.LogoPath} alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-8 text-left">
                                                                        <span>{upi?.PaymentName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>}
                                            {activeTab === 'Wallet' && <div className="tab-pane fade show active" id="Wallet" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Pay payment any Wallet</h3>
                                                <div className="row g-3">
                                                    {
                                                        wallets && wallets.map((wallet, index) => (
                                                            <div key={index} className="col-12">
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div style={{ height: "30px", width: "30px" }}>
                                                                            <img className="img-fluid" src={wallet?.LogoPath} alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6 text-left">
                                                                        <span>{wallet?.PaymentName}</span>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <span><button className='btn btn-primary d-flex align-items-center justify-content-center' onClick={()=>handleWalletPayment(index)}>Pay</button></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>}

                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-5 order-0 order-md-1">
                                        {(selectedPlan?.is_recharge == true) ? (
                                            <div className="bg-light-2 rounded p-4 mb-4">
                                                <h3 className="text-5 mb-4">Payable Amount</h3>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2">Transaction ID: <span className="float-end text-4 fw-500 text-dark">{selectedPlan?.txnid}</span></li>
                                                    <li className="mb-2">Amount <span className="float-end text-4 fw-500 text-dark">{selectedPlan?.amount}</span></li>
                                                    {
                                                        selectedPlan?.discount ? (<li className="mb-2">Discount <span className="text-success">({selectedPlan?.discount} Off!)</span> <span className="float-end text-4 fw-500 text-dark">-{selectedPlan?.discount}</span></li>) : (<span></span>)
                                                    }
                                                </ul>
                                                <hr />
                                                <div className="text-dark text-4 fw-500 py-1"> Total Amount<span className="float-end text-7">{selectedPlan?.total_pay_amount}</span></div>
                                            </div>
                                        ) : (
                                            <div className="bg-light-2 rounded p-4 mb-4">
                                                <h3 className="text-5 mb-4">Payable Amount</h3>
                                                <ul className="list-unstyled">
                                                <li className="mb-2">Transaction ID: <span className="float-end text-4 fw-500 text-dark">{selectedPlan?.txnid}</span></li>
                                                    <li className="mb-2">Amount <span className="float-end text-4 fw-500 text-dark">{billInformation?.billlist[0]?.billamount}</span></li>
                                                    <li className="mb-2">Remaining Amount <span className="float-end text-4 fw-500 text-dark">{billInformation?.billlist[0]?.billamount - billInformation?.amount}</span></li>
                                                    {
                                                        selectedPlan?.discount ? (<li className="mb-2">Discount <span className="text-success">({selectedPlan?.discount} Off!)</span> <span className="float-end text-4 fw-500 text-dark">-{selectedPlan?.discount}</span></li>) : (<span></span>)
                                                    }
                                                </ul>
                                                <hr />
                                                <div className="text-dark text-4 fw-500 py-1"> Total Amount<span className="float-end text-7">{(billInformation?.amount) ?? billInformation?.billlist[0]?.billamount}</span></div>
                                            </div>
                                        )}

                                        <div className="bg-light-2 rounded p-4 d-none d-md-block">
                                            <h3 className="text-5 mb-3">We value your Privacy.</h3>
                                            <p className="mb-0">We will not sell or distribute your information. Read our <a href="#">Privacy Policy</a>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Browse Plans</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    {/* <div className="modal-body">

                        <div className="plans">
                            <div className="row align-items-center">
                                <div className="col-4 col-lg-2 text-5 text-center">Amount</div>

                                <div className="col-4 col-lg-2 text-5 text-center">Top Plan</div>

                                <div className="col-4 col-lg-2 text-5 text-center">Validity Days</div>

                                <div className="col-3 col-lg-1 text-5 text-center">Category</div>

                                <div className="col-5 col-lg-3 text-5 text-center">Description</div>

                                <hr className="my-4" />
                            </div>
                        </div>
                    </div> */}
                </Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href="#"><i className="fa fa-chevron-up"></i></a>
            {/* {showPopup && <PopupComponent htmlContent={htmlContent} />} */}
        </>
    )
}
export default Payment;