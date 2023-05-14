import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const OrderSummary = (props) => {
    const location = useLocation();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [isDiscountApply, setIsDiscountApply] = useState(false);
    const [discounAmount, setDiscounAmount] = useState(0);
    const [couponCodeError, setCouponCodeError] = useState('');
    useEffect(() => {
        const recharge_information = localStorage.getItem('recharge_information');
        if(recharge_information){
        const recharge_info = JSON.parse(recharge_information);
        recharge_info.total_pay_amount = recharge_info.amount; 

        // localStorage.setItem('recharge_information', JSON.stringify(recharge_info));
        // const updated_recharge_information = localStorage.getItem('recharge_information');
        setSelectedPlan(recharge_info)
        console.log("selectedPlan====>", selectedPlan);
        }
    }, []);

    const handelCouponCodeChange = (event) => {
        setCouponCode(event.target.value)
    }
    const applyCouponCode = (e) => {
        let discount = 0;

        if (!isDiscountApply) {
            if (couponCode != "Code") {
                setCouponCodeError("Invalid coupon code")
            } else {
                discount = 10;
                setDiscounAmount(discount);
                setIsDiscountApply(true);
                selectedPlan.total_pay_amount = (selectedPlan.total_pay_amount - discount).toFixed(2);
                selectedPlan.discount = discount;
                setSelectedPlan(selectedPlan);
                localStorage.setItem('recharge_information', JSON.stringify(selectedPlan));

            }
        }
    }
    const removeBtn = {
        marginLeft: ' 60px',
        color: 'red',
        cursor: 'pointer'
    }
    const removeCouponCode = () => {
        if (isDiscountApply) {
            setCouponCode('');
            setCouponCodeError('');
            setIsDiscountApply(false);
            selectedPlan.total_pay_amount = selectedPlan.amount;
            setSelectedPlan(selectedPlan);
            localStorage.setItem('recharge_information', JSON.stringify(selectedPlan));
            setDiscounAmount(0);
        }
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
                                <div className="col-3 step active">
                                    <div className="step-name">Summary</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                                <div className="col-3 step disabled">
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
                            <h2 className="text-8 mb-4">Order Summary</h2>
                        </div>
                        <div className="col-md-8 col-lg-7 col-xl-6 mx-auto">
                            <div className="bg-white shadow-sm rounded text-3 p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-0 mb-sm-4">
                                <h3 className="text-5 fw-400 mb-3 mb-sm-4 text-center">Confirm Recharge Details</h3>
                                <hr className="mx-n3 mx-sm-n5 mb-4" />
                                <div className="row">
                                    <p className="col-sm text-muted mb-0 mb-sm-3">Mobile Number:</p>
                                    <p className="col-sm text-sm-end fw-500"> {selectedPlan?.number}</p>
                                </div>
                                <div className="row">
                                    <p className="col-sm text-muted mb-0 mb-sm-3">Operator/Circle:</p>
                                    <p className="col-sm text-sm-end fw-500">{selectedPlan?.biller_name} | {selectedPlan?.circle_name}</p>
                                </div>
                                <div className="row">
                                    <p className="col-sm text-muted mb-0 mb-sm-3">Plan:</p>
                                    <p className="col-sm text-sm-end fw-500">{selectedPlan?.plan_category_name}</p>
                                </div>
                                <div className="row">
                                    <p className="col-sm text-muted mb-0 mb-sm-3">Validity:</p>
                                    <p className="col-sm text-sm-end fw-500">{selectedPlan?.validity}</p>
                                </div>
                                <div className="row">
                                    <p className="col-sm text-muted mb-0 mb-sm-3">Amount:</p>
                                    <p className="col-sm text-sm-end fw-500">${selectedPlan?.amount} </p>
                                </div>
                                <div className="row">
                                    <p className="col-12 text-muted mb-0">Plan Description:</p>
                                    <p className="col-12 text-1">{selectedPlan?.plan_description}</p>
                                </div>
                                <div className="bg-light-4 rounded p-3">
                                    <div className="row">
                                        <div className="col-sm text-3 fw-600">Payment Amount:</div>
                                        <div className="col-sm text-sm-end text-5 fw-500">${selectedPlan?.total_pay_amount}</div>
                                    </div>
                                </div>
                                <p className="text-center my-4"><a className="btn-link" data-bs-toggle="collapse" href="#couponCode" aria-expanded="false" aria-controls="couponCode">Apply a Coupon Code</a></p>
                                <div id="couponCode" className="bg-light-3 p-4 rounded collapse">
                                    <h3 className="text-4">Coupon Code</h3>
                                    <div className="input-group">
                                        <input className="form-control" placeholder="Coupon Code" value={couponCode} name='coupon_code' onChange={handelCouponCodeChange} aria-label="Promo Code" type="text" />
                                        <button className="btn btn-secondary" onClick={applyCouponCode} type="submit">Apply</button>
                                    </div>
                                    {
                                        isDiscountApply ? (<div>
                                            <label style={{ color: 'green' }} >{discounAmount} Rupay discount has been applied.</label>
                                            <span style={removeBtn} onClick={removeCouponCode} >Remove</span>
                                        </div>) : (<span style={{ color: 'red' }}>{couponCodeError}</span>)
                                    }
                                </div>
                                <div className="d-grid mt-4"><Link to='/pay/payment' className="btn btn-primary">Make Payment</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href=""><i className="fa fa-chevron-up"></i></a>

        </>
    )
}
export default OrderSummary;