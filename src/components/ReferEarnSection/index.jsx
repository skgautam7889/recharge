const ReferEarnSection = () => {
    return (
        <div className="container">
            <section className="section bg-white shadow-md rounded px-5">
                <h2 className="text-9 fw-600 text-center">Refer & Earn</h2>
                <p className="lead text-center mb-5">Refer your friends and earn up to $20.</p>
                <div className="row">
                    <div className="col-md-4">
                        <div className="featured-box style-4">
                            <div className="featured-box-icon bg-light-4 text-primary rounded-circle"> <i className="fas fa-bullhorn"></i>
                            </div>
                            <h3>You Refer Friends</h3>
                            <p className="text-3">Share your referral link with friends. They get $10.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="featured-box style-4">
                            <div className="featured-box-icon bg-light-4 text-primary rounded-circle"> <i
                                className="fas fa-sign-in-alt"></i> </div>
                            <h3>Your Friends Register</h3>
                            <p className="text-3">Your friends Register with using your referral link.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="featured-box style-4">
                            <div className="featured-box-icon bg-light-4 text-primary rounded-circle"> <i
                                className="fas fa-dollar-sign"></i> </div>
                            <h3>Earn You</h3>
                            <p className="text-3">You get $20. You can use these credits to take recharge.</p>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-4"> <a href="#" className="btn btn-primary">Get Started Earn</a> </div>
            </section>
        </div>
    )
}
export default ReferEarnSection;