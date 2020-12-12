import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../store/actions/submissionActions';
class Footer extends Component {
    componentDidMount() {
        if (this.props.categories.length <= 0) {
            this.props.getCategories();
        }
    }

    render() {
        const footer = (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="footer-widget">
                                <img src={require("../../resources/core-imgs/logo3_admin.png")} style={{ width: '60%', height: '60%' }} alt="" />
                                <p>Tạp chí truy cập mở VNOJS</p>
                                <div className="footer-social-info">
                                    <Link to="#" className="facebook"><i className="fa fa-facebook"></i></Link>
                                    <Link to="#" className="google-plus"><i className="fa fa-google-plus"></i></Link>
                                    <Link to="#" className="instagram"><i className="fa fa-globe"></i></Link>
                                    <Link to="#" className="twitter"><i className="fa fa-twitter"></i></Link>
                                    <Link to="#" className="linkedin"><i className="fa fa-linkedin"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="footer-widget">
                                <h6 className="widget-title">Chủ đề</h6>
                                <nav className="footer-widget-nav">
                                    <ul>
                                        {this.props.categories.length > 0 && this.props.categories.map(category => (
                                            <li key={category._id}>
                                                <Link to="#">
                                                    <i className="fa fa-angle-double-right" aria-hidden="true"></i> {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="footer-widget">
                                <h6 className="widget-title">Tag</h6>
                                <ul className="footer-tags">
                                    {this.props.categories.length > 0 && this.props.categories.map(category => (
                                        <li key={category._id}>
                                            <Link to="#">
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="footer-widget">
                                <h6 className="widget-title">Hướng dẫn</h6>
                                <nav className="footer-widget-nav">
                                    <ul>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-angle-double-right" aria-hidden="true"></i> Tác giả
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-angle-double-right" aria-hidden="true"></i> Thẩm định viên
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-angle-double-right" aria-hidden="true"></i> Biên tập viên
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-angle-double-right" aria-hidden="true"></i> Tổng biên tập
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-angle-double-right" aria-hidden="true"></i> Thư ký biên tập
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="fa fa-angle-double-right" aria-hidden="true"></i> Admin
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copywrite-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <p className="copywrite-text">
                                    Copyright @2020 All rights reserved | This template is made with {" "}
                                    <i className="fa fa-heart-o" aria-hidden="true"></i> {" "}
                                    by <a href="https://colorlib.com">Colorlib</a></p>
                            </div>
                            <div className="col-12 col-sm-6">
                                <nav className="footer-nav">
                                    <ul>
                                        <li><Link to="/">Trang chủ</Link></li>
                                        <li><Link to="#">Quy trình thẩm định</Link></li>
                                        <li><Link to="#">Về chúng tôi</Link></li>
                                        <li><Link to="#">Liên hệ</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
        return (
            <div>
                {footer}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        categories: state.submission.categories
    };
};

const mapDispatchToProps = {
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);