import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import ConfirmDialog from '../../../UI/ConfirmDialog/ConfirmDialog';
import Spinner from '../../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { updateObject } from '../../../../utils/utility';
import {
    getCategories,
    getSubmissionDetail
} from '../../../../store/actions/submissionActions';
import {
    authorCreateRevision,
    resetAuthorRevisionState
} from '../../../../store/actions/reviewActions';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Shared/ContentHeader';
import { toast } from 'react-toastify';
import { editSubmissionInputControls } from '../../../../utils/input-controls';
import { submitArticleInputChangeHandler } from '../../../../utils/input-change';
import AddContributor from '../AddContributor/AddContributor';

class ReviseSubmission extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: editSubmissionInputControls,
        formIsValid: true,
        oldMetadata: [],
        metadata: [],
        contributors: [],
        fullname: '',
        affiliation: ''
    }

    componentDidMount() {
        this.props.getCategories();
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
        }
    }

    initControlValues = (submission) => {
        const updatedControls = updateObject(this.state.controls, {
            categoryId: updateObject(this.state.controls.categoryId, { value: submission.categoryId._id, categoryName: submission.categoryId.name }),
            title: updateObject(this.state.controls.title, { value: submission.title }),
            abstract: updateObject(this.state.controls.abstract, { value: submission.abstract }),
            attachment: updateObject(this.state.controls.attachment, { filename: submission.attachmentFile })
        });
        const oldMetadata = submission.metadata;
        const contributors = submission.contributors;
        this.setState(updateObject(this.state, {
            controls: updatedControls,
            oldMetadata: oldMetadata,
            contributors: contributors
        }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetAuthorRevisionState();
        }
        if (nextProps.submission && nextProps.submission !== this.props.submission) {
            this.initControlValues(nextProps.submission);
        }
        if (nextProps.isAuthorRevisionCreated) {
            this.props.resetAuthorRevisionState();
            toast.success("Nộp bản chỉnh sửa bài báo thành công!");
            this.setState(updateObject(this.state, {
                step1Active: false,
                step2Active: false,
                step3Active: true,
            }));
        }
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        const { updatedControls, formIsValid } = submitArticleInputChangeHandler(event, this.state);
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    metaDataChangeHandler = (event) => {
        event.preventDefault();
        let controlName = event.target.name;
        if (controlName === 'metadata') {
            let newState = updateObject(this.state, {
                metadata: event.target.files
            });
            this.setState(newState);
        }
    }

    contributorInputChangeHandler = (event) => {
        event.preventDefault();
        let controlName = event.target.name;
        if (controlName === 'fullname') {
            this.setState(updateObject(this.state, { fullname: event.target.value }));
        } else {
            this.setState(updateObject(this.state, { affiliation: event.target.value }));
        }
    }

    addContributorHandler = () => {
        const contributor = {
            fullname: this.state.fullname,
            affiliation: this.state.affiliation
        };
        const contributors = this.state.contributors;
        contributors.push(contributor);
        this.setState(updateObject(this.state, {
            contributors: contributors,
            fullname: '',
            affiliation: ''
        }));
    }

    removeContributorHandler = (idx) => {
        const contributors = this.state.contributors;
        contributors.splice(idx, 1);
        this.setState(updateObject(this.state, { contributors: contributors }));
    }

    step1ActiveHandler = (event) => {
        event.preventDefault();
        let newState = updateObject(this.state, {
            step1Active: true,
            step2Active: false,
            step3Active: false,
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
            step3Active: false,
        });
        this.setState(newState);
    }

    confirmSubmitHandler = () => {
        const formData = new FormData();
        formData.append('title', this.state.controls.title.value);
        formData.append('abstract', this.state.controls.abstract.value);
        formData.append('attachment', this.state.controls.attachment.file);
        formData.append('categoryId', this.state.controls.categoryId.value);
        const data = JSON.stringify({ data: this.state.contributors });
        formData.append('contributors', data);
        for (const file of this.state.metadata) {
            formData.append('metadata', file);
        }
        this.props.authorCreateRevision(this.props.submission._id, formData);
    }

    cancelHandler = () => {
        this.props.resetAuthorRevisionState();
        this.props.history.push('/dashboard/submission/' + this.props.submission._id);
    }

    render() {
        const editArticle = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Chỉnh sửa bài báo">
                        <li className="breadcrumb-item active">Chỉnh sửa bài báo</li>
                    </ContentHeader>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            {!this.props.loading ? (
                                <div className="card card-dark card-tabs">
                                    <div className="card-header p-0 pt-1">
                                        <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                            <li className="nav-item">
                                                <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}>
                                                    1. Thông tin chi tiết
                                            </div>
                                            </li>
                                            <li className="nav-item">
                                                <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}>
                                                    2. Metadata
                                            </div>
                                            </li>
                                            <li className="nav-item">
                                                <div className={this.state.step3Active ? 'nav-link active' : 'nav-link'}>
                                                    3. Hoàn thành
                                            </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content" id="custom-tabs-one-tabContent">
                                            {/* ------------------Tab 1----------------- */}
                                            <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <div className="card-body">
                                                    {this.props.categories.length > 0 ? (
                                                        <div className="form-group">
                                                            <label>Thể loại*</label>
                                                            <select
                                                                name="categoryId"
                                                                defaultValue={this.value}
                                                                className="custom-select form-control"
                                                                onChange={this.inputChangeHandler}
                                                            >
                                                                <option value="" hidden>{this.state.controls.categoryId.categoryName}</option>
                                                                {this.props.categories.map(category => (
                                                                    <option key={category._id} value={category._id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    ) : null}
                                                    <div className="form-group">
                                                        <label>Tiêu để*</label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            className={!this.state.controls.title.valid && this.state.controls.title.touched ? "form-control-error" : "form-control"}
                                                            defaultValue={this.state.controls.title.value}
                                                            onChange={this.inputChangeHandler} />
                                                        {!this.state.controls.title.valid && this.state.controls.title.touched ?
                                                            <p className="form-control-error-msg">Tiêu đề không hợp lệ!</p> : null}
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Mô tả*</label>
                                                        <textarea
                                                            type="text"
                                                            name="abstract"
                                                            className={!this.state.controls.abstract.valid && this.state.controls.abstract.touched ? "form-control-error" : "form-control"}
                                                            placeholder={this.state.controls.abstract.elementConfig.placeholder}
                                                            defaultValue={this.state.controls.abstract.value}
                                                            onChange={this.inputChangeHandler} />
                                                        {!this.state.controls.abstract.valid && this.state.controls.abstract.touched ?
                                                            <p className="form-control-error-msg">Mô tả không hợp lệ!</p> : null}
                                                    </div>
                                                    <div className="form-group">
                                                        <label>File đính kèm*</label>
                                                        <div className="input-group">
                                                            <div className="custom-file">
                                                                <input
                                                                    type="file"
                                                                    name="attachment"
                                                                    className="custom-file-input"
                                                                    onChange={this.inputChangeHandler} />
                                                                {!this.state.controls.attachment.valid && this.state.controls.attachment.touched ?
                                                                    <p className="form-control-error-msg">File tải lên không hợp lệ!</p> : null}
                                                                <label className="custom-file-label" htmlFor="coverImage">{this.state.controls.attachment.filename}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary btn-flat"
                                                        disabled={!this.state.formIsValid}
                                                        onClick={this.step2ActiveHandler}>Tiếp tục</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger ml-1 btn-flat"
                                                        onClick={this.cancelHandler}>Hủy</button>
                                                </div>
                                            </div>
                                            {/* ------------------Tab 2----------------- */}
                                            <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label>Tài liệu kèm theo</label>
                                                        <div className="input-group">
                                                            <div className="custom-file mb-2">
                                                                <input
                                                                    type="file"
                                                                    name="metadata"
                                                                    multiple
                                                                    className="custom-file-input"
                                                                    onChange={this.metaDataChangeHandler} />
                                                                <label className="custom-file-label" htmlFor="coverImage">{this.state.metadata.length} file đã chọn</label>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {this.state.metadata.length > 0 ? (
                                                                <Aux>
                                                                    {Array.from(this.state.metadata).map(file => {
                                                                        const iden = Math.floor(Math.random() * 111111);
                                                                        return (
                                                                            <div className="ml-2" key={iden}>
                                                                                <i className="fa fa-paperclip fa-lg"></i> {" "}
                                                                                <Link to="#" className="text-primary">{file.name}</Link>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </Aux>
                                                            ) : (
                                                                    <Aux>
                                                                        {this.state.oldMetadata.map(file => {
                                                                            const iden = Math.floor(Math.random() * 111111);
                                                                            return (
                                                                                <div className="ml-2" key={iden}>
                                                                                    <i className="fa fa-paperclip fa-lg"></i>
                                                                                    <a href={file.url} className="text-primary" target="_blank" rel="noopener noreferrer">
                                                                                        {" "}{file.filename}
                                                                                    </a>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </Aux>
                                                                )}
                                                        </div>
                                                        {this.props.fileUploading ? (
                                                            <div className="input-group">
                                                                <div className="spinner-border text-primary mt-2" role="status" style={{ width: '25px', height: '25px' }}></div>
                                                                <div className="mt-2 ml-2 text-secondary" style={{ fontStyle: 'italic' }}>Đang tải lên...</div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Đồng tác giả ({this.state.contributors.length})</label><br />
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-dark btn-flat"
                                                            data-toggle="modal"
                                                            data-target="#addContributorModal">
                                                            <i className="fas fa-plus"></i>{" "}Thêm mới
                                                    </button>
                                                    </div>
                                                    <div>
                                                        {this.state.contributors.length > 0 && (
                                                            <Aux>
                                                                {this.state.contributors.map((contributor, idx) => {
                                                                    const iden = idx;
                                                                    return (
                                                                        <div className="ml-2" key={iden}>
                                                                            <i className="fas fa-user"></i> {" "}
                                                                            <Link to="#" className="text-primary">{contributor.fullname}</Link>{""}
                                                                            - <b>{contributor.affiliation}</b>
                                                                            <i className="far fa-trash-alt text-danger pl-3"
                                                                                style={{ cursor: 'pointer' }}
                                                                                onClick={() => this.removeContributorHandler(iden)}></i>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </Aux>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary btn-flat"
                                                        data-toggle="modal"
                                                        data-target="#confirmDialogModal">Xác nhận</button>
                                                    <button
                                                        className="btn btn-outline-danger ml-2 btn-flat"
                                                        onClick={this.step2ActiveHandler}>Quay lại</button>
                                                </div>
                                            </div>
                                            {/* ------------------Tab 3----------------- */}
                                            <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <h4>Nộp bản chỉnh sửa bài báo thành công.</h4>
                                                <div className="ml-2">Bạn đã nộp bản chỉnh sửa bài báo. Biên tập viên sẽ đánh giá lại bài báo và
                                                gửi kết quả thẩm định cuối cùng lại cho bạn trong thời gian sớm nhất.</div>
                                                <div className="ml-2 mt-2">Bạn vui lòng kiểm tra email và thông
                                                    báo trên hệ thống thường xuyên để thuận tiện trong việc trao đổi với ban biên tập các vấn đề liên quan.</div>
                                                <h4 className="mt-3">Bây giờ, bạn có thể:</h4>
                                                {this.props.submission ? (
                                                    <Aux>
                                                        <div className="ml-2">
                                                            <i className="fa fa-eye"></i>
                                                            {" "}<Link to={`/dashboard/submission/${this.props.submission._id}`} className="text-primary">
                                                                Xem chi tiết bài báo.
                                                                </Link>.
                                                        </div>
                                                        <div className="ml-2">
                                                            <i className="fa fa-edit"></i>
                                                            {" "}<Link to={`/dashboard/revise-submission/${this.props.submission._id}`} className="text-primary">Nộp lại bản chỉnh sửa bài báo</Link>
                                                        </div>
                                                    </Aux>
                                                ) : null}
                                                <div className="ml-2">
                                                    <i className="fa fa-home"></i>
                                                    {" "} <Link to="/dashboard/author" className="text-primary">Trở về trang tác giả.</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : <Spinner />}
                        </div>
                    </div>
                </section>
            </div>
        );

        return (
            <Aux>
                {editArticle}
                <ConfirmDialog
                    title="Xác nhận"
                    message="Nộp bản chỉnh sửa bài báo?"
                    confirm={this.confirmSubmitHandler} />
                <AddContributor
                    title="Thêm đồng tác giả"
                    fullname={this.state.fullname}
                    affiliation={this.state.affiliation}
                    inputChange={this.contributorInputChangeHandler}
                    confirm={this.addContributorHandler} />
                {this.props.error ? toast.error('Error: ' + this.props.error) : null}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.submission.categories,
        submission: state.submission.submission,
        loading: state.review.loading,
        fileUploading: state.review.fileUploading,
        error: state.review.error,
        isAuthorRevisionCreated: state.review.isAuthorRevisionCreated
    };
};

const mapDispatchToProps = {
    getCategories,
    getSubmissionDetail,
    authorCreateRevision,
    resetAuthorRevisionState
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviseSubmission);