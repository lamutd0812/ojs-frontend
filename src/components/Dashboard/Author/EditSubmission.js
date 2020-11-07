import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../utils/utility';
import { getCategories, getSubmissionDetail, editSubmission, resetEditSubmissionState } from '../../../store/actions/submissionActions';
import { Link } from 'react-router-dom';
import ContentHeader from '../Shared/ContentHeader';

class EditArticle extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        controls: {
            categoryId: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Chọn thể loại'
                },
                value: '',
                categoryName: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            title: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nhập tiêu đề'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: true,
                touched: false
            },
            abstract: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nhập mô tả'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: true,
                touched: false
            },
            attachment: {
                elementConfig: {
                    type: 'file',
                    placeholder: 'Chọn File'
                },
                filename: 'Chọn File',
                file: null,
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: true,
        isModalOpen: false
    }

    componentDidMount() {
        this.props.getCategories();
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
        }
    }

    initControlValues = (nextProps) => {
        const updatedControls = updateObject(this.state.controls, {
            categoryId: updateObject(this.state.controls.categoryId, { value: nextProps.submission.categoryId._id, categoryName: nextProps.submission.categoryId.name }),
            title: updateObject(this.state.controls.title, { value: nextProps.submission.title }),
            abstract: updateObject(this.state.controls.abstract, { value: nextProps.submission.abstract }),
            attachment: updateObject(this.state.controls.attachment, { filename: nextProps.submission.attachmentFile })
        });
        this.setState(updateObject(this.state, { controls: updatedControls }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.submission) {
            this.initControlValues(nextProps);
        }
        if (nextProps.isSubmissionEdited) {
            this.props.resetEditSubmissionState();
            this.setState(updateObject(this.state, {
                isModalOpen: false,
                step1Active: false,
                step2Active: true,
            }));
        }
    }

    inputChangeHandler = (event) => {
        let controlName = event.target.name;
        let updatedControls = null;
        if (controlName === 'attachment') {
            updatedControls = updateObject(this.state.controls, {
                [controlName]: updateObject(this.state.controls[controlName], {
                    filename: event.target.files[0].name,
                    file: event.target.files[0],
                    valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                })
            });
        } else {
            updatedControls = updateObject(this.state.controls, {
                [controlName]: updateObject(this.state.controls[controlName], {
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                })
            });
        }

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    showModalHandler = (event) => {
        event.preventDefault();
        this.setState(updateObject(this.state, { isModalOpen: true }));
    }

    confirmSubmitHandler = () => {
        const formData = new FormData();
        formData.append('title', this.state.controls.title.value);
        formData.append('abstract', this.state.controls.abstract.value);
        formData.append('attachment', this.state.controls.attachment.file);
        formData.append('categoryId', this.state.controls.categoryId.value);
        this.props.editSubmission(this.props.submission._id, formData);
        // this.setState(updateObject(this.state, { isModalOpen: false }));
    }

    cancelHandler = () => {
        this.setState(updateObject(this.state, {
            isModalOpen: false
        }));
    }

    render() {

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ fontStyle: 'italic', color: 'red' }}>{this.props.error}</p>
            );
        }

        const editArticle = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Chỉnh sửa bài báo" />
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            {!this.props.loading ? (
                                <div className="card card-primary card-tabs">
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
                                                <form>
                                                    <div className="card-body">
                                                        {this.props.categories ? (
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
                                                        <div className="form-group">
                                                            {errorMessage}
                                                        </div>
                                                    </div>

                                                    <div className="card-footer">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            onClick={this.showModalHandler}
                                                            disabled={!this.state.formIsValid}>Chỉnh sửa</button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* Step 2 Active */}
                                            <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                                <h4>Chỉnh sửa bài báo thành công.</h4>
                                                <div className="ml-2">Bạn đã chỉnh sửa bài báo trước khi bước vào quá trình thẩm định. Chúng tôi đã
                                                    tiếp nhận và sẽ tiến hành thẩm định bài báo của bạn trước khi quyết định đăng tải.</div>
                                                <div className="ml-2 mt-2">Trong quá trình thẩm định, bạn vui lòng kiểm tra email và thông
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
                                                            {" "}<Link to={`/dashboard/edit-submission/${this.props.submission._id}`} className="text-primary">Chỉnh sửa bài báo</Link> (Trước khi bước vào pha Thẩm định).
                                                        </div>
                                                    </Aux>
                                                ) : null}
                                                <div className="ml-2">
                                                    <i className="fa fa-home"></i>
                                                    {" "} <Link to="/dashboard" className="text-primary">Trở về trang chủ.</Link>
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
                <Modal
                    show={this.state.isModalOpen}
                    message="Chỉnh sửa bài báo?"
                    confirmMessage="Đồng ý"
                    confirm={this.confirmSubmitHandler}
                    hasCancel={true}
                    cancelMessage="Hủy"
                    cancel={this.cancelHandler}>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.submission.categories,
        error: state.submission.error,
        isSubmissionEdited: state.submission.isSubmissionEdited,
        submission: state.submission.submission,
        loading: state.submission.loading,
        fileUploading: state.submission.fileUploading
    };
};

const mapDispatchToProps = {
    getCategories,
    getSubmissionDetail,
    editSubmission,
    resetEditSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);