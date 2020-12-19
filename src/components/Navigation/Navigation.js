import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { searchArticlesByKeyword } from '../../store/actions/articleActions';
import axios from '../../utils/axios';
class Navigation extends Component {

    state = {
        value: '',
        articles: []
    };

    getSuggestions = (keyword) => {
        const articles = axios.get('/articles/search/all?keyword=' + keyword)
            .then(res => {
                return res.data.articles;
            }).catch(err => {
                console.log(err);
            });
        return articles;
    };

    getSuggestionValue = (suggestion) => {
        this.props.history.push('/single-article/' + suggestion._id);

        return suggestion.title;
    };

    renderSuggestion = (suggestion) => (
        <div>
            {suggestion.title}
        </div>
    );

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = async ({ value }) => {
        this.setState({
            articles: await this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            articles: []
        });
    };

    render() {
        const { value, articles } = this.state;

        const inputProps = {
            placeholder: 'Tìm kiếm bài báo',
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <header className="header-area">
                    <div className="mag-main-menu" id="sticker">
                        <div className="classy-nav-container breakpoint-off">
                            <nav className="classy-navbar justify-content-between" id="magNav">
                                <NavLink to="/" className="nav-brand">
                                    {/* <img src="img/core-img/logo.png" alt="" /> */}
                                    <img src={require("../../resources/core-imgs/logo3.png")} style={{ width: '60%', height: '60%' }} alt="" />
                                </NavLink>

                                <div className="nav-content d-flex align-items-center">
                                    <div className="top-search-area">
                                        <form>
                                            <Autosuggest
                                                suggestions={articles}
                                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                getSuggestionValue={this.getSuggestionValue}
                                                renderSuggestion={this.renderSuggestion}
                                                inputProps={inputProps}
                                            />
                                            <button type="button" className="btn">
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </button>
                                        </form>
                                    </div>
                                    <div className="classy-menu">
                                        <div className="classycloseIcon">
                                            <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                                        </div>
                                        <div className="classynav">
                                            <ul>
                                                <li className="active"><Link to="/">Trang chủ</Link></li>
                                                <li><NavLink to="/articles">Bài báo</NavLink></li>
                                                <li><NavLink to="/dashboard">Biên tập</NavLink></li>
                                                <li style={{ borderRight: '1px solid #ebebeb' }}><NavLink to="#">Về chúng tôi</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        {!this.props.isAuth ? (
                                            <NavLink to="/login" className="login-btn">
                                                <i className="fa fa-user" aria-hidden="true"></i> Đăng nhập
                                            </NavLink>
                                        ) : (
                                                <div className="classynav">
                                                    <ul>
                                                        <li className="cn-dropdown-item has-down text-center">
                                                            <NavLink to="#" className="login-btn p-2">
                                                                <img
                                                                    className="rounded-circle border border-danger mb-3 ml-2"
                                                                    src={this.props.avatar}
                                                                    alt="UserImage"
                                                                    style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                                                {/* <i className="fa fa-user" aria-hidden="true"></i> {this.props.fullname} */}
                                                            </NavLink>
                                                            <ul className="dropdown text-left">
                                                                <li>
                                                                    <NavLink to="#" style={{ fontSize: '14px', fontWeight: '400' }}>
                                                                        <i className="far fa-id-badge"></i> Trang cá nhân
                                                                    </NavLink>
                                                                </li>
                                                                <li>
                                                                    <NavLink to="/logout" style={{ fontSize: '14px', fontWeight: '400' }}>
                                                                        <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                                                    </NavLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}

                                        <NavLink to="/dashboard" className="submit-video">
                                            <span><i className="fa fa-cloud-upload"></i></span> <span className="video-text">Dashboard</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header >
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        userId: state.auth.userId,
        avatar: state.auth.avatar,
        fullname: state.auth.fullname,
        articles: state.article.articles_search
    };
};

const mapDispatchToProps = {
    searchArticlesByKeyword
};


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);