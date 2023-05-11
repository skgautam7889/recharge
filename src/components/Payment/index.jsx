const Payment = () => {
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
                                            <li className="nav-item"> <a className="nav-link text-4 lh-lg active" id="first-tab" data-bs-toggle="tab" href="#firstTab" role="tab" aria-controls="firstTab" aria-selected="true">Credit/Debit Cards</a> </li>
                                            <li className="nav-item"> <a className="nav-link text-4 lh-lg" id="second-tab" data-bs-toggle="tab" href="#secondTab" role="tab" aria-controls="secondTab" aria-selected="false">PayPal</a> </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContentVertical">
                                            <div className="tab-pane fade show active" id="firstTab" role="tabpanel" aria-labelledby="first-tab">
                                                <h3 className="text-5 mb-4">Enter Card Details</h3>
                                                <form id="payment" method="post">
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label" htmlFor="cardNumber">Enter Debit / Credit Card Number</label>
                                                            <input type="text" className="form-control" data-bv-field="cardnumber" id="cardNumber" required placeholder="Card Number" />
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryMonth">Expiry Month</label>
                                                                <select id="expiryMonth" className="form-select" required="">
                                                                    <option value="">Expiry Month</option>
                                                                    <option value="1">January</option>
                                                                    <option value="2">February</option>
                                                                    <option value="3">March</option>
                                                                    <option value="1">April</option>
                                                                    <option value="1">May</option>
                                                                    <option value="1">June</option>
                                                                    <option value="1">July</option>
                                                                    <option value="1">August</option>
                                                                    <option value="1">September</option>
                                                                    <option value="1">October</option>
                                                                    <option value="1">November</option>
                                                                    <option value="1">December</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label className="form-label" htmlFor="expiryYear">Expiry Year</label>
                                                                <select id="expiryYear" className="form-select" required="">
                                                                    <option value="">Expiry Year</option>
                                                                    <option>2018</option>
                                                                    <option>2019</option>
                                                                    <option>2020</option>
                                                                    <option>2021</option>
                                                                    <option>2022</option>
                                                                    <option>2023</option>
                                                                    <option>2024</option>
                                                                    <option>2025</option>
                                                                    <option>2026</option>
                                                                    <option>2027</option>
                                                                    <option>2028</option>
                                                                    <option>2029</option>
                                                                    <option>2030</option>
                                                                    <option>2031</option>
                                                                    <option>2032</option>
                                                                    <option>2033</option>
                                                                    <option>2034</option>
                                                                    <option>2035</option>
                                                                    <option>2036</option>
                                                                    <option>2037</option>
                                                                    <option>2038</option>
                                                                    <option>2039</option>
                                                                    <option>2040</option>
                                                                    <option>2041</option>
                                                                    <option>2042</option>
                                                                    <option>2043</option>
                                                                    <option>2044</option>
                                                                    <option>2045</option>
                                                                    <option>2046</option>
                                                                    <option>2047</option>
                                                                    <option>2048</option>
                                                                    <option>2049</option>
                                                                    <option>2050</option>
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
                                                        <div className="col-12 d-grid"> <a className="btn btn-primary" href="recharge-payment-success.html">Proceed to Pay $135</a> </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="tab-pane fade" id="secondTab" role="tabpanel" aria-labelledby="second-tab">
                                                <div className="text-center"> <img className="img-fluid" src="images/paypal-logo.png" alt="Paypal Logo" title="Pay easily, fast and secure with PayPal." />
                                                    <p className="lead">Pay easily, fast and secure with PayPal.</p>
                                                </div>
                                                <p className="alert alert-info mb-4"><i className="fas fa-info-circle"></i> You will be redirected to PayPal to complete your payment securely.</p>
                                                <div className="d-grid"><a className="btn btn-primary d-flex align-items-center justify-content-center" href="recharge-payment-success.html"><i className="fab fa-paypal fa-2x me-2"></i> Pay via PayPal</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-5 order-0 order-md-1">
                                        <div className="bg-light-2 rounded p-4 mb-4">
                                            <h3 className="text-5 mb-4">Payable Amount</h3>
                                            <ul className="list-unstyled">
                                                <li className="mb-2">Amount <span className="float-end text-4 fw-500 text-dark">$150</span></li>
                                                <li className="mb-2">Discount <span className="text-success">(10% Off!)</span> <span className="float-end text-4 fw-500 text-dark">-$15</span></li>
                                            </ul>
                                            <hr />
                                                <div className="text-dark text-4 fw-500 py-1"> Total Amount<span className="float-end text-7">$135</span></div>
                                        </div>
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