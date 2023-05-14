import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header id="header">
            <div className="container">
                <div className="header-row">
                    <div className="header-column justify-content-start">
                        <div className="logo me-2 me-lg-3"> <Link to='/' className="d-flex" title="HTML Template"><img
                            src="assets/images/logo.png" alt="Quickai" /></Link> </div>
                    </div>
                    <div className="header-column justify-content-end">

                        <nav className="primary-menu navbar navbar-expand-lg">
                            <div id="header-nav" className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                    <li><Link className="dropdown-item" to='/'>Home</Link></li>
                                </ul>
                            </div>
                        </nav>
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-nav">
                            <span></span> <span></span> <span></span> </button>
                        <div className="vr mx-2 h-25 my-auto"></div>
                        <nav className="login-signup navbar navbar-expand">
                            <ul className="navbar-nav">
                                <li className="profile"><a className="pe-0" data-bs-toggle="modal" data-bs-target="#login-modal" href="#"
                                    title="Login / Sign up"><span className="d-none d-sm-inline-block">Login / Sign up</span> <span
                                        className="user-icon ms-sm-2"><i className="fas fa-user"></i></span></a></li>
                            </ul>
                        </nav> */}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;