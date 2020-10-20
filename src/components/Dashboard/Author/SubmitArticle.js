import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Modal from '../../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../utils/utility';
import { getCategories, createSubmission, resetCreateSubmissionState } from '../../../store/actions/submisisonActions';

class SubmitArticle extends Component {

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
                validation: {
                    required: true
                },
                valid: false,
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
        if (nextProps.isSubmissionCreated) {
            this.setState(updateObject(this.state, { isModalOpen: true }));
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
        console.log(this.state);
    };

    step1ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: true,
            step2Active: false
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true
        });
        this.setState(newState);
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.controls.title.value);
        formData.append('abstract', this.state.controls.abstract.value);
        formData.append('attachment', this.state.controls.attachment.file);
        formData.append('categoryId', this.state.controls.categoryId.value);
        this.props.createSubmission(formData);
    }

    closeModalHandler = () => {
        this.setState(updateObject(this.state, { isModalOpen: false }));
        this.props.resetCreateSubmissionState();
        this.props.history.push('/dashboard');
    }

    render() {

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ fontStyle: 'italic', color: 'red' }}>{this.props.error}</p>
            );
        }

        const submitArticle = (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>
                                    Đăng bài báo lên hệ thống
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="d">Home</a></li>
                                    <li className="breadcrumb-item active">Navbar & Tabs</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-primary card-tabs">
                                <div className="card-header p-0 pt-1">
                                    <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li className="nav-item">
                                            <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}
                                                onClick={this.step1ActiveHandler}>
                                                1. Điều khoản
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                                onClick={this.step2ActiveHandler}>
                                                2. Đăng bài
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            <div>Chấp nhận điều khoản để tiếp tục</div>
                                            <button className="btn btn-primary" onClick={this.step2ActiveHandler}>Chấp nhận</button>
                                        </div>
                                        <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                            <form onSubmit={this.formSubmitHandler}>
                                                <div className="card-body">
                                                    {this.props.categories ? (
                                                        <div className="form-group">
                                                            <label>Thể loại*</label>
                                                            <select
                                                                name="categoryId"
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
                                                    </div>
                                                    {/* <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                                    </div> */}
                                                    <div className="form-group">
                                                        {errorMessage}
                                                    </div>
                                                </div>

                                                <div className="card-footer">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        disabled={!this.state.formIsValid}>Submit</button>
                                                </div>
                                            </form>
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
                <Modal
                    show={this.state.isModalOpen}
                    message="Submit bài báo thành công!"
                    modalClosed={this.closeModalHandler}>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.submission.categories,
        error: state.submission.error,
        isSubmissionCreated: state.submission.isSubmissionCreated
    };
};

const mapDispatchToProps = {
    getCategories,
    createSubmission,
    resetCreateSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitArticle);