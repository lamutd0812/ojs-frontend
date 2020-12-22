import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Spinner from '../../UI/Spinner/Spinner';
import { vastArticlesCrawl } from '../../../store/actions/vastActions';
import Pagination from '../../UI/Pagination/Pagination';
import { getDeadlineDate, updateObject } from '../../../utils/utility';
// import { convertPublishedPrintToDate } from '../../../utils/utility';
import DatePicker from 'react-datepicker';
import CustomInput from './CustomInput';
import Authors from './Authors';

const ITEMS_PER_PAGE = 10;
class VastStats extends Component {

    state = {
        startDate: new Date(),
        endDate: getDeadlineDate(30)
    }

    init = () => {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.vastArticlesCrawl(this.state.startDate, this.state.endDate, page, ITEMS_PER_PAGE);
            }
        } else {
            this.props.vastArticlesCrawl(this.state.startDate, this.state.endDate, 1, ITEMS_PER_PAGE);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const prevQuery = new URLSearchParams(prevProps.location.search);
            const query = new URLSearchParams(this.props.location.search);
            const prevPage = prevQuery.get('page');
            const page = query.get('page');
            if (page !== prevPage) {
                this.props.vastArticlesCrawl(this.state.startDate, this.state.endDate, page, ITEMS_PER_PAGE);
            }
        }
    }

    refreshHandler = () => {
        this.init();
    }

    setStartDateHandler = (date) => {
        this.setState(updateObject(this.state, { startDate: date }));
    }
    setEndDateHandler = (date) => {
        this.setState(updateObject(this.state, { endDate: date }));
    }

    searchArticlesHandler = () => {
        this.init();
    }

    render() {
        const contentWrapper = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Thống kê nghiên cứu khoa học VAST" />
                </section>

                <section className="content">
                    <div className="card">
                        {/* Card Header */}
                        <div className="card-header">
                            <div className="card-tools float-left">
                                {/* <div className="input-group input-group-sm p-0" style={{ width: '300px' }}>
                                        <input type="text" name="table_search" className="form-control float-right" placeholder="Tìm kiếm" />
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-default"><i className="fas fa-search"></i></button>
                                        </div>
                                    </div> */}
                                <div className="row">
                                    <div>
                                        <span className="font-weight-bold pr-1">Ngày bắt đầu</span>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={date => this.setStartDateHandler(date)}
                                            selectsStart
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={<CustomInput />} />
                                    </div>
                                    <div>
                                        <span className="font-weight-bold pl-3 pr-1">Ngày kết thúc</span>
                                        <DatePicker
                                            selected={this.state.endDate}
                                            onChange={date => this.setEndDateHandler(date)}
                                            selectsEnd
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            minDate={this.state.startDate}
                                            dateFormat="dd/MM/yyyy"
                                            customInput={<CustomInput />} />
                                    </div>
                                    <div className="btn vast-search-btn" onClick={this.searchArticlesHandler}>
                                        Tìm kiếm
                                        </div>
                                </div>
                            </div>
                            <div className="float-right">
                                <button className="btn btn-tool" onClick={this.refreshHandler}>
                                    <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                </button>
                            </div>
                        </div>
                        {/* Card Body */}
                        {!this.props.loading ? (
                            <div className="card-body p-1">
                                {this.props.articles.length > 0 ? (
                                    <Aux>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th> #</th>
                                                        <th>Tên bài Báo</th>
                                                        <th className="text-left pl-5 pr-5">Danh sách tác giả</th>
                                                        <th>Lĩnh vực</th>
                                                        <th>Thể loại</th>
                                                        <th>Năm xuất bản</th>
                                                        <th>Tạp chí</th>
                                                        <th>Đường dẫn bài báo</th>
                                                    </tr>
                                                    {/* <tr>
                                                        <th colspan="2"></th>
                                                        <th colspan="2">Tên</th>
                                                        <th colspan="3">Đơn vị thành viên</th>
                                                        <th colspan="3">Tổ chức</th>
                                                        <th colspan="5"></th>
                                                    </tr> */}
                                                </thead>
                                                <tbody>
                                                    {this.props.articles.map(article => {
                                                        const iden = Math.floor(Math.random() * 111111);
                                                        return (
                                                            <tr key={article.DOI}>
                                                                <td>#</td>
                                                                <td>
                                                                    <span className="text-dark">{article.title[0]}</span>
                                                                </td>
                                                                <td className="text-primary text-center" style={{ cursor: 'pointer' }}>
                                                                    <div data-toggle="modal" data-target={"#aaa" + iden}>
                                                                        <u>Xem chi tiết</u>
                                                                    </div>
                                                                    <div className="text-dark text-left">
                                                                        <Authors
                                                                            authors={article.author}
                                                                            iden={iden} />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {article.subject && article.subject.map((value, idx) => (
                                                                        <span key={idx}>
                                                                            - {value}{", "}<br />
                                                                        </span>
                                                                    ))}
                                                                </td>
                                                                <td>
                                                                    <span>{article.type}</span>
                                                                </td>
                                                                <td>
                                                                    <span>2020</span>
                                                                </td>
                                                                <td>
                                                                    <span>{article.publisher}</span>
                                                                </td>
                                                                <td>
                                                                    {article.link && article.link.map((url, idx) => (
                                                                        <a className="text-primary" href={url.URL} key={idx}
                                                                            target="_blank" rel="noopener noreferrer">
                                                                            Link {idx + 1}<br />
                                                                        </a>
                                                                    ))}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-2">
                                            <Pagination
                                                currentPage={this.props.currentPage}
                                                hasNextPage={ITEMS_PER_PAGE * this.props.currentPage < this.props.total}
                                                hasPrevPage={this.props.currentPage > 1}
                                                nextPage={this.props.currentPage + 1}
                                                prevPage={this.props.currentPage - 1}
                                                lastPage={Math.ceil(this.props.total / ITEMS_PER_PAGE)}
                                                location={this.props.location} />
                                        </div>
                                    </Aux>
                                ) : (<div className="card-text ml-4">Không tìm thấy bài báo nào.</div>)}
                            </div>
                        ) : <Spinner />}
                    </div>
                </section>
            </div>
        );
        return (
            <Aux>
                {contentWrapper}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.vast.articles,
        loading: state.vast.loading,
        // error: state.vast.error,
        total: state.vast.total,
        currentPage: state.vast.currentPage
    }
};

const mapDispatchToProps = {
    vastArticlesCrawl
};

export default connect(mapStateToProps, mapDispatchToProps)(VastStats);