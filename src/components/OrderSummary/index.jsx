import Footer from "../Footer";

const OrderSummary = () => {
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
                                    <a href="recharge-order.html" className="step-dot"></a> </div>
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
                                <hr className="mx-n3 mx-sm-n5 mb-4"/>
                                    <div className="row">
                                        <p className="col-sm text-muted mb-0 mb-sm-3">Mobile Number:</p>
                                        <p className="col-sm text-sm-end fw-500">(+91) 9898989898</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-sm text-muted mb-0 mb-sm-3">Operator/Circle:</p>
                                        <p className="col-sm text-sm-end fw-500">Vodafone | Gujarat</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-sm text-muted mb-0 mb-sm-3">Plan:</p>
                                        <p className="col-sm text-sm-end fw-500">Mobile top-up</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-sm text-muted mb-0 mb-sm-3">Validity:</p>
                                        <p className="col-sm text-sm-end fw-500">Talktime</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-sm text-muted mb-0 mb-sm-3">Amount:</p>
                                        <p className="col-sm text-sm-end fw-500">$150</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-12 text-muted mb-0">Plan Description:</p>
                                        <p className="col-12 text-1">Local calls free & STD calls free & Roaming Incoming & Outgoing calls free & 300 Local & National SMS & 1 GB 3G/4G Data & Data Validity 28 day(s) & For 3G/4G user - T&C apply</p>
                                    </div>
                                    <div className="bg-light-4 rounded p-3">
                                        <div className="row">
                                            <div className="col-sm text-3 fw-600">Payment Amount:</div>
                                            <div className="col-sm text-sm-end text-5 fw-500">$150</div>
                                        </div>
                                    </div>
                                    <p className="text-center my-4"><a className="btn-link" data-bs-toggle="collapse" href="#couponCode" aria-expanded="false" aria-controls="couponCode">Apply a Coupon Code</a></p>
                                    <div id="couponCode" className="bg-light-3 p-4 rounded collapse">
                                        <h3 className="text-4">Coupon Code</h3>
                                        <div className="input-group">
                                            <input className="form-control" placeholder="Coupon Code" aria-label="Promo Code" type="text"/>
                                                <button className="btn btn-secondary" type="submit">Apply</button>
                                        </div>
                                    </div>
                                    <div className="d-grid mt-4"><a href="recharge-payment.html" className="btn btn-primary">Make Payment</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href="javascript:void(0)"><i className="fa fa-chevron-up"></i></a>

        </>
    )
}
export default OrderSummary;