import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { userService } from "../Services";

const OrderSummary = (props) => {
    const location = useLocation();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [isDiscountApply, setIsDiscountApply] = useState(false);
    const [discounAmount, setDiscounAmount] = useState(0);
    const [couponCodeError, setCouponCodeError] = useState('');
    const [isRecharge, setIsRecharge] = useState(false);
    const [billplanInformation, setBillplanInformation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    useEffect(() => {
        const recharge_information = localStorage.getItem('recharge_information');
        if (recharge_information) {
            const recharge_info = JSON.parse(recharge_information);
            recharge_info.total_pay_amount = recharge_info.amount;
            setSelectedPlan(recharge_info)
            console.log("selectedPlan====>", selectedPlan);
        }
        const billplan_information = localStorage.getItem('billplan_information');
        if (billplan_information) {
            const bill_info = JSON.parse(billplan_information);
            setBillplanInformation(bill_info)
            console.log("billplanInformation========================>", billplanInformation);

        }
        // const is_recharge = localStorage.getItem('is_recharge');
        // if(is_recharge){
        //     setIsRecharge(JSON.parse(is_recharge).is_recharge);

        //     console.log("isRecharge====>",isRecharge);
        // }

        getCouponCodeList();
    }, []);

    async function getCouponCodeList() {
        setIsLoading(true);
        const data = {
            "Enquiryno": selectedPlan?.planid,
            "Product": "UTILITY",
            "Type": "Mobile Prepaid"
        }
        const cuponCodeList = await userService.DisplayCouponCode(data);
        setCoupons(cuponCodeList.Coupons)
        setIsLoading(false);
        // setShow(true);
    }

    const handelCouponCodeChange = (event) => {
        setCouponCode(event.target.value)
    }
    const applyCouponCode = async (e) => {
        let discount = 0;
        if (!isDiscountApply) {
            const data = {
                "Enquiryno": selectedPlan.planid,
                "Product": "Utility",
                "Type": "Mobile Prepaid",
                "Amount": selectedPlan.amount,
                CouponCode: couponCode
            }
            const ApplyCodeResponse = await userService.ApplyCouponCode(data);
            if (!ApplyCodeResponse?.CouponDiscount) {
                setCouponCodeError("Invalid coupon code")
            } else {
                discount = ApplyCodeResponse?.CouponDiscount;
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
            selectedPlan.discount = 0;
            setSelectedPlan(selectedPlan);
            localStorage.setItem('recharge_information', JSON.stringify(selectedPlan));
            setDiscounAmount(0);
        }
    }
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
                        {(selectedPlan?.is_recharge == true) ? (
                            <div className="col-md-8 col-lg-7 col-xl-6 mx-auto">
                                <div className="bg-white shadow-sm rounded text-3 p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-0 mb-sm-4">
                                    <h3 className="text-5 fw-400 mb-3 mb-sm-4 text-center">Confirm Recharge Details</h3>
                                    <hr className="mx-n3 mx-sm-n5 mb-4" />
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Mobile Number:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500"> {selectedPlan?.number}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Operator/Circle:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500">{selectedPlan?.biller_name} | {selectedPlan?.circle_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Plan:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500">{selectedPlan?.plan_category_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Validity:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500">{selectedPlan?.validity}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Amount:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500">${selectedPlan?.amount} </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-12 text-muted mb-0">Plan Description:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-12 text-1" style={{ textAlign: 'justify' }}>{selectedPlan?.plan_description}</p>
                                        </div>
                                    </div>
                                    <div className="bg-light-4 rounded p-3">
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <div className="col-sm text-3 fw-600">Payment Amount:</div>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <div className="col-sm text-sm-end text-5 fw-500">${selectedPlan?.total_pay_amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center my-4"><a className="btn-link" data-bs-toggle="collapse" href="#couponCode" aria-expanded="false" aria-controls="couponCode">Apply a Coupon Code</a></p>
                                    <div id="couponCode" className="bg-light-3 p-4 rounded collapse">
                                        <h3 className="text-4">Coupon Code</h3>
                                        <div className="input-group">
                                            <input className="form-control" placeholder="Coupon Code" value={couponCode} name='coupon_code' onChange={e => { setCouponCode(e.target.value) }} aria-label="Promo Code" type="text" />
                                            <button className="btn btn-secondary" onClick={applyCouponCode} type="submit">Apply</button>
                                        </div>
                                        {
                                            isDiscountApply ? (<><div>
                                                <label style={{ color: 'green' }}>{discounAmount} Rupay discount has been applied.</label>
                                                <span style={removeBtn} onClick={removeCouponCode}>Remove</span>
                                            </div><hr /></>) : (<><span style={{ color: 'red' }}>{couponCodeError}</span><hr /></>)

                                        }
                                        {coupons && coupons.map((coupon) => (
                                            <div key={coupon.CouponCode} style={{textAlign:'justify'}}>
                                                <span style={{ fontWeight: 'bold', lineHeight: 2.0 }} >{coupon.CouponCode}</span>
                                                &nbsp; {coupon.Remarks}
                                                <hr />
                                            </div>
                                        ))}

                                    </div>
                                    <div className="d-grid mt-4"><Link to='/pay/payment' className="btn btn-primary">Make Payment</Link></div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-md-8 col-lg-7 col-xl-6 mx-auto">
                                <div className="bg-white shadow-sm rounded text-3 p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-0 mb-sm-4">
                                    <h3 className="text-5 fw-400 mb-3 mb-sm-4 text-center">Confirm Bill Details</h3>
                                    <hr className="mx-n3 mx-sm-n5 mb-4" />
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Connection Number:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.ConnectionNumber}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Category:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.biller_category}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Operator:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.biller_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Validation Date:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.validation_date}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Valid Until:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.valid_until}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Total Payment:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.billlist[0]?.net_billamount}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-muted mb-0 mb-sm-3">Remaining Amount:</p>
                                        </div>
                                        <div className="col-6 col-lg-6 text-3">
                                            <p className="col-sm text-sm-end fw-500 text-right">{billplanInformation?.billlist[0]?.billamount - billplanInformation?.amount}</p>
                                        </div>
                                    </div>
                                    <div className="bg-light-4 rounded p-3">
                                        <div className="row">
                                            <div className="col-6 col-lg-6 text-3">
                                                <div className="col-sm text-3 fw-600">Payment Amount:</div>
                                            </div>
                                            <div className="col-6 col-lg-6 text-3">
                                                <div className="col-sm text-sm-end text-5 fw-500">${billplanInformation?.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="text-center my-4"><a className="btn-link" data-bs-toggle="collapse" href="#couponCode" aria-expanded="false" aria-controls="couponCode">Apply a Coupon Code</a></p>
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
                                    </div> */}
                                    <div className="d-grid mt-4"><Link to="/pay/payment" className="btn btn-primary">Make Payment</Link></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href=""><i className="fa fa-chevron-up"></i></a>

        </>
    )
}
export default OrderSummary;