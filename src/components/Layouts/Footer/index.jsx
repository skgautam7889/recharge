const Footer = () => {
    return (
        <footer id="footer">
            <section className="section bg-white shadow-md pt-4 pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3">
                            <div className="featured-box text-center">
                                <div className="featured-box-icon"> <i className="fas fa-lock"></i> </div>
                                <h4>100% Secure Payments</h4>
                                <p>Moving your card details to a much more secured place.</p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="featured-box text-center">
                                <div className="featured-box-icon"> <i className="fas fa-thumbs-up"></i> </div>
                                <h4>Trust pay</h4>
                                <p>100% Payment Protection. Easy Return Policy.</p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="featured-box text-center">
                                <div className="featured-box-icon"> <i className="fas fa-bullhorn"></i> </div>
                                <h4>Refer & Earn</h4>
                                <p>Invite a friend to sign up and earn up to $100.</p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="featured-box text-center">
                                <div className="featured-box-icon"> <i className="far fa-life-ring"></i> </div>
                                <h4>24X7 Support</h4>
                                <p>We're here to help. Have a query and need help ? <a href="#">Click here</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mt-4">
                <div className="row g-4">
                    <div className="col-md-4">
                        <p>Payment</p>
                        <ul className="payments-types">
                            <li><a href="#" target="_blank"> <img data-bs-toggle="tooltip" src="assets/images/payment/visa.png" alt="visa"
                                title="Visa" /></a></li>
                            <li><a href="#" target="_blank"> <img data-bs-toggle="tooltip" src="assets/images/payment/discover.png"
                                alt="discover" title="Discover" /></a></li>
                            <li><a href="#" target="_blank"> <img data-bs-toggle="tooltip" src="assets/images/payment/paypal.png"
                                alt="paypal" title="PayPal" /></a></li>
                            <li><a href="#" target="_blank"> <img data-bs-toggle="tooltip" src="assets/images/payment/american.png"
                                alt="american express" title="American Express" /></a></li>
                            <li><a href="#" target="_blank"> <img data-bs-toggle="tooltip" src="assets/images/payment/mastercard.png"
                                alt="discover" title="Discover" /></a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <p>Subscribe</p>
                        <div className="input-group newsletter">
                            <input className="form-control" placeholder="Your Email Address" name="newsletterEmail" id="newsletterEmail"
                                type="text" />
                            <button className="btn btn-secondary shadow-none px-3" type="submit">Subscribe</button>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-md-end flex-column">
                        <p>Keep in touch</p>
                        <ul className="social-icons">
                            <li className="social-icons-facebook"><a data-bs-toggle="tooltip" href="http://www.facebook.com/"
                                target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                            <li className="social-icons-twitter"><a data-bs-toggle="tooltip" href="http://www.twitter.com/"
                                target="_blank" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                            <li className="social-icons-google"><a data-bs-toggle="tooltip" href="http://www.google.com/" target="_blank"
                                title="Google"><i className="fab fa-google"></i></a></li>
                            <li className="social-icons-linkedin"><a data-bs-toggle="tooltip" href="http://www.linkedin.com/"
                                target="_blank" title="Linkedin"><i className="fab fa-linkedin-in"></i></a></li>
                            <li className="social-icons-youtube"><a data-bs-toggle="tooltip" href="http://www.youtube.com/"
                                target="_blank" title="Youtube"><i className="fab fa-youtube"></i></a></li>
                            <li className="social-icons-instagram"><a data-bs-toggle="tooltip" href="http://www.instagram.com/"
                                target="_blank" title="Instagram"><i className="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer-copyright">
                    <ul className="nav justify-content-center">
                        <li className="nav-item"> <a className="nav-link active" href="#">About Us</a> </li>
                        <li className="nav-item"> <a className="nav-link" href="#">Faq</a> </li>
                        <li className="nav-item"> <a className="nav-link" href="#">Contact</a> </li>
                        <li className="nav-item"> <a className="nav-link" href="#">Support</a> </li>
                        <li className="nav-item"> <a className="nav-link" href="#">Terms of Use</a> </li>
                        <li className="nav-item"> <a className="nav-link" href="#">Privacy Policy</a> </li>
                    </ul>
                    <p className="copyright-text">Copyright © 2022 <a href="#">Quickai</a>. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer