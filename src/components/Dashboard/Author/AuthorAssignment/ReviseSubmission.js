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

class ReviseSubmission extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: editSubmissionInputControls,
        formIsValid: true
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
        this.setState(updateObject(this.state, { controls: updatedControls }));
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
                step2Active: true,
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

    confirmSubmitHandler = () => {
        const formData = new FormData();
        formData.append('title', this.state.controls.title.value);
        formData.append('abstract', this.state.controls.abstract.value);
        formData.append('attachment', this.state.controls.attachment.file);
        formData.append('categoryId', this.state.controls.categoryId.value);
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
                                                    1. Thông tin
                                            </div>
                                            </li>
                                            <li className="nav-item">
                                                <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}>
                                                    2. Hoàn thành
                                            </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content" id="custom-tabs-one-tabContent">
                                            {/* Step 1 Active  */}
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
                                                        {this.state.controls.attachment.file && this.props.fileUploading ? (
                                                            <div className="input-group">
                                                                <div className="spinner-border text-primary mt-2" role="status" style={{ width: '25px', height: '25px' }}>
                                                                </div>
                                                                <div className="mt-2 ml-2 text-secondary" style={{ fontStyle: 'italic' }}>Đang tải lên...</div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        data-toggle="modal"
                                                        data-target="#confirmDialogModal"
                                                        disabled={!this.state.formIsValid}>Chỉnh sửa</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-infor ml-1"
                                                        onClick={this.cancelHandler}>Hủy</button>
                                                </div>
                                            </div>
                                            {/* Step 2 Active */}
                                            <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
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