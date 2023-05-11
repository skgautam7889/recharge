const PaymentSuccess = () => {
    return (
        <><div id="content">
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-11 mx-auto">
                        <div className="row widget-steps">
                            <div className="col-3 step complete">
                                <div className="step-name">Order</div>
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                                <a href="#" className="step-dot"></a> </div>
                            <div className="col-3 step complete">
                                <div className="step-name">Summary</div>
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                                <a href="#" className="step-dot"></a> </div>
                            <div className="col-3 step complete">
                                <div className="step-name">Payment</div>
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                                <a href="#" className="step-dot"></a> </div>
                            <div className="col-3 step complete">
                                <div className="step-name">Done</div>
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                                <a href="#" className="step-dot"></a> </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center mt-5">
                        <p className="text-success text-16 lh-1"><i className="fas fa-check-circle"></i></p>
                        <h2 className="text-8">Recharge Successful</h2>
                        <p className="lead">We are processing the same and you will be notified via email.</p>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                        <div className="bg-white shadow-sm rounded p-4 p-lg-5 mb-4">
                            <div className="row">
                                <div className="col-sm text-muted">Transactions ID</div>
                                <div className="col-sm text-sm-end fw-600">PHDF173076359</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm text-muted">Date</div>
                                <div className="col-sm text-sm-end fw-600">06-Feb-2019</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm text-muted">Mode of Payment</div>
                                <div className="col-sm text-sm-end fw-600">Credit Card</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm text-muted">Transaction Status</div>
                                <div className="col-sm text-sm-end fw-600 text-success">Success</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm text-muted">Customer Name</div>
                                <div className="col-sm text-sm-end fw-600">Johne Cary</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm text-muted">Mobile No</div>
                                <div className="col-sm text-sm-end fw-600">(+91) 9898989898</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm text-muted">Subject</div>
                                <div className="col-sm text-sm-end fw-600">Mobile Recharge</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm text-muted">Payment Amount</div>
                                <div className="col-sm text-sm-end text-6 fw-500">$135</div>
                            </div>
                        </div>
                        <div className="text-center"> <a href="#" className="btn-link text-muted mx-3 my-2 align-items-center d-inline-flex"><span className="text-5 me-2"><i className="far fa-file-pdf"></i></span>Save as PDF</a> <a href="#" className="btn-link text-muted mx-3 my-2 align-items-center d-inline-flex"><span className="text-5 me-2"><i className="fas fa-print"></i></span>Print Receipt</a> <a href="#" className="btn-link text-muted mx-3 my-2 align-items-center d-inline-flex"><span className="text-5 me-2"><i className="far fa-envelope"></i></span>Email Receipt</a>
                            <p className="mt-4 mb-0"><a href="#" className="btn btn-primary">Make another Recharge</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div><a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href=""><i className="fa fa-chevron-up"></i></a></>

    )
}
export default PaymentSuccess;