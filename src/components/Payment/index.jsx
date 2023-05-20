import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { userService } from "../Services";
const Payment = () => {
    const location = useLocation();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isDiscountApply, setIsDiscountApply] = useState(false);
    const [discounAmount, setDiscounAmount] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [billInformation, setBillInformation] = useState(null);
    useEffect(() => {
        const recharge_information = localStorage.getItem('recharge_information');
        if (recharge_information) {

            // localStorage.setItem('recharge_information', JSON.stringify(recharge_info));
            // const updated_recharge_information = localStorage.getItem('recharge_information');
            setSelectedPlan(JSON.parse(recharge_information))
            // getPaymentMethodList(selectedPlan?.billerid);
            // console.log("selectedPlan=====>", selectedPlan);
        }
        const billplan_information = localStorage.getItem('billplan_information');
        if (billplan_information) {

            // localStorage.setItem('recharge_information', JSON.stringify(recharge_info));
            // const updated_recharge_information = localStorage.getItem('recharge_information');
            setBillInformation(JSON.parse(billplan_information))
            // getPaymentMethodList(billInformation?.billerid);
            // console.log("billInformation=====>", billInformation?.billlist[0]?.billamount);
        }


    }, []);


    useEffect(() => {

        if(selectedPlan?.billerid){
            getPaymentMethodList(selectedPlan?.billerid);
        }
        if(billInformation?.billerid){
            getPaymentMethodList(billInformation?.billerid);
        }

    }, [selectedPlan, billInformation]);


    const paypentPayForm = (event) => {
        event.preventDefault();
        console.log("selectedPlan====>", selectedPlan);
    };
    async function getPaymentMethodList(billerid) {
        const paymentMethodList = await userService.getPaymentMethodList(billerid);
        setPaymentMethods(paymentMethodList);
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
    const wallets = [
        { id: 1, name: "Paytm", image: "https://jep-asset.akamaized.net/MyJio_Client/corefiles/jpg/wallet/logo_paytm.svg" },
        { id: 2, name: "MobiKwik", image: "https://jep-asset.akamaized.net/MyJio_Client/corefiles/jpg/wallet/logo_mobikwik.svg" },
        { id: 3, name: "JioMoney", image: "https://jep-asset.akamaized.net/MyJio_Client/corefiles/jpg/wallet/logo_jiomoney.svg" },
        { id: 4, name: "Amazon Pay", image: "https://jep-asset.akamaized.net/MyJio_Client/corefiles/jpg/wallet/Apay_logo.svg" },
    ];
    const upis = [
        { id: 1, name: "MyJio UPI", image: "https://jep-asset.akamaized.net/MyJio_Client/corefiles/jpg/ic_jio-01.svg" },
        { id: 2, name: "Google Pay", image: "https://jep-asset.akamaized.net/MyJio_Client/corefiles/jpg/ic_googlepay-01.svg" },
        { id: 3, name: "Phonepe", image: "https://jep-asset.akamaized.net/MyJio_Client/corefiles/jpg/ic_phonepe-01.svg" },
        { id: 4, name: "Other UPI", image: "https://static.india.com/wp-content/uploads/2022/10/UPI.jpg" },
    ];
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

                                            {/* <li className="nav-item"> <a className="nav-link text-4 lh-lg active" id="first-tab" data-bs-toggle="tab" href="#firstTab" role="tab" aria-controls="firstTab" aria-selected="true">Credit/Debit Cards</a> </li>
                                            <li className="nav-item"> <a className="nav-link text-4 lh-lg" id="second-tab" data-bs-toggle="tab" href="#secondTab" role="tab" aria-controls="secondTab" aria-selected="false">PayPal</a> </li> */}
                                            {
                                                paymentMethods && paymentMethods.map((payment, index) => (
                                                    // <h1 key={index}>{payment.Paymethod}</h1>
                                                    <li key={index} className="nav-item"> <a className={(index == 0) ? 'nav-link text-4 lh-lg active' : 'nav-link text-4 lh-lg'} id="second-tab" data-bs-toggle="tab" href={"#" + payment.Paymethod} role="tab" aria-controls="firstTab" aria-selected="false">{payment.Paymethod}</a> </li>

                                                ))
                                            }
                                        </ul>

                                        <div className="tab-content" id="myTabContentVertical">

                                            <div className="tab-pane fade show active" id="CreditCard" role="tabpanel" aria-labelledby="first-tab">
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
                                            </div>
                                            <div className="tab-pane fade" id="DebitCard" role="tabpanel" aria-labelledby="first-tab">
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
                                            </div>
                                            <div className="tab-pane fade" id="PrepaidCard" role="tabpanel" aria-labelledby="first-tab">
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
                                            </div>
                                            <div className="tab-pane fade" id="UPI" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Select Any UPI</h3>
                                                <div className="row g-3">
                                                    {
                                                        upis && upis.map((upi, index) => (
                                                            <div key={index} className="col-12">
                                                                <div className="row">
                                                                    <div className='col-2'>
                                                                        <input type="radio" name='upi' />
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div style={{ height: "30px", width: "30px" }}>
                                                                            <img className="img-fluid" src={upi?.image} alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-8 text-left">
                                                                        <span>{upi?.name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="Wallet" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Pay payment any Wallet</h3>
                                                <div className="row g-3">
                                                    {
                                                        wallets && wallets.map((wallet, index) => (
                                                            <div key={index} className="col-12">
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div style={{ height: "30px", width: "30px" }}>
                                                                            <img className="img-fluid" src={wallet?.image} alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6 text-left">
                                                                        <span>{wallet?.name}</span>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <span><button className='btn btn-primary d-flex align-items-center justify-content-center'>Pay</button></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="secondTab" role="tabpanel" aria-labelledby="second-tab">
                                                <div className="text-center"> <img className="img-fluid" src="assets/images/paypal-logo.png" alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />
                                                    <p className="lead">Pay easily, fast and secure with PayPal.</p>
                                                </div>
                                                <p className="alert alert-info mb-4"><i className="fas fa-info-circle"></i> You will be redirected to PayPal to complete your payment securely.</p>
                                                <div className="d-grid"><a className="btn btn-primary d-flex align-items-center justify-content-center" href=""><i className="fab fa-paypal fa-2x me-2"></i> Pay via PayPal</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-5 order-0 order-md-1">
                                        {(selectedPlan?.is_recharge == true) ? (
                                            <div className="bg-light-2 rounded p-4 mb-4">
                                                <h3 className="text-5 mb-4">Payable Amount</h3>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2">Amount <span className="float-end text-4 fw-500 text-dark">${selectedPlan?.amount}</span></li>
                                                    {
                                                        selectedPlan?.discount ? (<li className="mb-2">Discount <span className="text-success">({selectedPlan?.discount} Off!)</span> <span className="float-end text-4 fw-500 text-dark">-${selectedPlan?.discount}</span></li>) : (<span></span>)
                                                    }
                                                </ul>
                                                <hr />
                                                <div className="text-dark text-4 fw-500 py-1"> Total Amount<span className="float-end text-7">${selectedPlan?.total_pay_amount}</span></div>
                                            </div>
                                        ) : (
                                            <div className="bg-light-2 rounded p-4 mb-4">
                                                <h3 className="text-5 mb-4">Payable Amount</h3>
                                                <ul className="list-unstyled">
                                                    <li className="mb-2">Amount <span className="float-end text-4 fw-500 text-dark">${billInformation?.billlist[0]?.billamount}</span></li>
                                                    <li className="mb-2">Remaining Amount <span className="float-end text-4 fw-500 text-dark">${billInformation?.billlist[0]?.billamount-billInformation?.amount}</span></li>
                                                    {
                                                        selectedPlan?.discount ? (<li className="mb-2">Discount <span className="text-success">({selectedPlan?.discount} Off!)</span> <span className="float-end text-4 fw-500 text-dark">-${selectedPlan?.discount}</span></li>) : (<span></span>)
                                                    }
                                                </ul>
                                                <hr />
                                                <div className="text-dark text-4 fw-500 py-1"> Total Amount<span className="float-end text-7">${(billInformation?.amount)??billInformation?.billlist[0]?.billamount}</span></div>
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
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href="#"><i className="fa fa-chevron-up"></i></a>

        </>
    )
}
export default Payment;