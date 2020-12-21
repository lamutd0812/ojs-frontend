import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Spinner from '../../UI/Spinner/Spinner';
import { vastArticlesCrawl } from '../../../store/actions/vastActions';
import Pagination from '../../UI/Pagination/Pagination';
// import { convertPublishedPrintToDate } from '../../../utils/utility';

const ITEMS_PER_PAGE = 10;

class VastStats extends Component {
    init = () => {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.vastArticlesCrawl(page, ITEMS_PER_PAGE);
            }
        } else {
            this.props.vastArticlesCrawl(1, ITEMS_PER_PAGE);
        }
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const prevQuery = new URLSearchParams(prevProps.location.search);
            const query = new URLSearchParams(this.props.location.search);
            const prevPage = prevQuery.get('page');
            const page = query.get('page');
            if (page !== prevPage) {
                this.props.vastArticlesCrawl(page, ITEMS_PER_PAGE);
            }
        }
    }

    refreshHandler = () => {
        this.init();
    }

    render() {
        const contentWrapper = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Thống kê nghiên cứu khoa học VAST" />
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            {/* Card Header */}
                            <div className="card-header">
                                <div className="card-tools float-left">
                                    <div className="input-group input-group-sm p-0" style={{ width: '300px' }}>
                                        <input type="text" name="table_search" className="form-control float-right" placeholder="Tìm kiếm" />
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-default"><i className="fas fa-search"></i></button>
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
                            <div className="card-body p-0">
                                {this.props.articles.length > 0 ? (
                                    <Aux>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th> #</th>
                                                        <th>Tên bài Báo</th>
                                                        <th>Danh sách tác giả</th>
                                                        {/* <th>Đơn vị thành viên</th> */}
                                                        {/* <th>Tổ chức</th> */}
                                                        <th>Lĩnh vực</th>
                                                        <th>Thể loại</th>
                                                        <th>Năm xuất bản</th>
                                                        <th>Tạp chí</th>
                                                        <th>DOI</th>
                                                        <th>Đường dẫn bài báo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.articles.map(article => (
                                                        <tr key={article.DOI}>
                                                            <td>#</td>
                                                            <td>
                                                                <span className="text-dark">{article.title[0]}</span>
                                                            </td>
                                                            <td>
                                                                {article.author && article.author.map((value, idx) => (
                                                                    <span className="text-dark" key={idx}>
                                                                        - {`${value.family} ${value.given}`}<br />
                                                                    </span>
                                                                ))}
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
                                                                <span>{article.DOI}</span>
                                                            </td>
                                                            <td>
                                                                {article.link && article.link.map((url, idx) => (
                                                                    <a className="text-primary" href={url.URL} key={idx}
                                                                        target="_blank" rel="noopener noreferrer">
                                                                        {url.URL}<br />
                                                                    </a>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                    ))}
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
                        </div>
                    ) : <Spinner />}
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