import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../Shared/ContentHeader';
import {  toast } from 'react-toastify';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../utils/utility';
import { getCategories, createSubmission, resetCreateSubmissionState } from '../../../store/actions/submissionActions';

class SubmitArticle extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        controls: {
            categoryId: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Chọn thể loại'
                },
                value: '',
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
                valid: false,
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
                valid: false,
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
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    componentDidMount() {
        this.props.getCategories();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.resetCreateSubmissionState();
        }
        if (nextProps.isSubmissionCreated && !nextProps.error) {
            this.props.resetCreateSubmissionState();
            toast.success("Submit bài báo lên hệ thống thành công!");
            this.setState(updateObject(this.state, {
                step1Active: false,
                step2Active: false,
                step3Active: true
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
            step3Active: false
        });
        this.setState(newState);
    }

    confirmSubmitHandler = () => {
        const formData = new FormData();
        formData.append('title', this.state.controls.title.value);
        formData.append('abstract', this.state.controls.abstract.value);
        formData.append('attachment', this.state.controls.attachment.file);
        formData.append('categoryId', this.state.controls.categoryId.value);
        this.props.createSubmission(formData);
    }

    render() {
        const submitArticle = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Submit bài báo lên hệ thống" />
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-dark card-tabs">
                                <div className="card-header p-0 pt-1">
                                    <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li className="nav-item">
                                            <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}>
                                                1. Điều khoản
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}>
                                                2. Đăng bài
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
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* <div>Chấp nhận điều khoản để tiếp tục</div> */}
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <h6>Yêu cầu chung</h6>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                        <label className="form-check-label">Yêu cầu 1</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                        <label className="form-check-label">Yêu cầu 2</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                        <label className="form-check-label">Yêu cầu 3</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                        <label className="form-check-label">Yêu cầu 4</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" onClick={this.step2ActiveHandler}>Chấp nhận</button>
                                        </div>
                                        <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                            <div className="card-body">
                                                {this.props.categories ? (
                                                    <div className="form-group">
                                                        <label>Thể loại*</label>
                                                        <select
                                                            name="categoryId"
                                                            value={this.value}
                                                            className="custom-select form-control"
                                                            onChange={this.inputChangeHandler}
                                                        >
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
                                                        placeholder={this.state.controls.title.elementConfig.placeholder}
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
                                                    {this.props.fileUploading ? (
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
                                                    disabled={!this.state.formIsValid}>Submit</button>
                                                <button
                                                    className="btn btn-dark ml-2"
                                                    onClick={this.step1ActiveHandler}>Quay lại</button>
                                            </div>
                                        </div>
                                        <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                            <h4>Submit bài báo lên hệ thống thành công.</h4>
                                            <div className="ml-2">Cảm ơn bạn đã đăng tải bài báo lên hệ thống. Chúng tôi đã
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
                        </div>
                    </div>
                </section>
            </div>
        );

        return (
            <Aux>
                {submitArticle}
                <ConfirmDialog
                    title="Xác nhận"
                    message="Đăng tải bài báo lên hệ thống?"
                    confirm={this.confirmSubmitHandler} />
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.submission.categories,
        isSubmissionCreated: state.submission.isSubmissionCreated,
        submission: state.submission.submission,
        fileUploading: state.submission.fileUploading
    };
};

const mapDispatchToProps = {
    getCategories,
    createSubmission,
    resetCreateSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitArticle);