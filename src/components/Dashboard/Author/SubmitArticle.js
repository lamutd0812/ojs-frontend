import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../Shared/ContentHeader';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../UI/ConfirmDialog/ConfirmDialog';
import { connect } from 'react-redux';
import { updateObject } from '../../../utils/utility';
import { getCategories, getSubmissionTypes, createSubmission, resetCreateSubmissionState } from '../../../store/actions/submissionActions';
import { submitArticleInputControls, publishedResearchInputControls } from '../../../utils/input-controls';
import { submitArticleInputChangeHandler, publishedResearchInputChangeHandler } from '../../../utils/input-change';
import AddContributor from './AddContributor/AddContributor';
import { SUBMISSION_TYPES } from '../../../utils/constant';
class SubmitArticle extends Component {

    state = {
        step1Active: true,
        step2Active: false,
        step3Active: false,
        step4Active: false,
        requirement1: false,
        requirement2: false,
        requirement3: false,
        requirement4: false,
        controls: submitArticleInputControls,
        controls_published: publishedResearchInputControls,
        formIsValid: false,
        formIsValid_published: false,
        metadata: [],
        contributors: [],
        fullname: '',
        affiliation: '',
        submissionType: 'Peer-review Research'
    }

    componentDidMount() {
        this.props.getCategories();
        this.props.getSubmissionTypes();
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
                step3Active: false,
                step4Active: true
            }));
        }
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        let submissionType = this.state.submissionType;
        if (event.target.name === 'typeId') {
            submissionType = event.target.selectedOptions[0].text;
        }
        const { updatedControls, formIsValid } = submitArticleInputChangeHandler(event, this.state);
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid,
            submissionType: submissionType
        });
    };

    inputChangeHandler_published = (event) => {
        event.preventDefault();
        const { updatedControls, formIsValid } = publishedResearchInputChangeHandler(event, this.state);
        this.setState({
            controls_published: updatedControls,
            formIsValid_published: formIsValid,
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
            step4Active: false,
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
            step3Active: false,
            step4Active: false,
        });
        this.setState(newState);
    }

    step3ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: false,
            step3Active: true,
            step4Active: false,
        });
        this.setState(newState);
    }

    confirmRequirementHandler = (event) => {
        let name = event.target.name;
        if (event.target.checked) {
            this.setState(updateObject(this.state, { [name]: true }));
        } else {
            this.setState(updateObject(this.state, { [name]: false }));
        }
    }

    confirmSubmitHandler = () => {
        const formData = new FormData();
        formData.append('title', this.state.controls.title.value);
        formData.append('abstract', this.state.controls.abstract.value);
        formData.append('attachment', this.state.controls.attachment.file);
        formData.append('categoryId', this.state.controls.categoryId.value);
        formData.append('typeId', this.state.controls.typeId.value);
        // with published research
        if (this.state.submissionType === SUBMISSION_TYPES.PUBLISHED_RESEARCH.name) {
            formData.append('magazineName', this.state.controls_published.magazineName.value);
            formData.append('DOI', this.state.controls_published.DOI.value);
        }
        // metadata
        const data = JSON.stringify({ data: this.state.contributors });
        formData.append('contributors', data);
        for (const file of this.state.metadata) {
            formData.append('metadata', file);
        }
        this.props.createSubmission(formData);
    }

    render() {
        const submitArticle = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Submit bài báo lên hệ thống">
                        <li className="breadcrumb-item active">Submit bài báo</li>
                    </ContentHeader>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-dark card-tabs">
                                <div className="card-header p-0 pt-1">
                                    <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li className="nav-item">
                                            <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}>
                                                1. Chọn loại bài báo
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}>
                                                2. Thông tin chi tiết
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className={this.state.step3Active ? 'nav-link active' : 'nav-link'}>
                                                3. Metadata
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className={this.state.step4Active ? 'nav-link active' : 'nav-link'}>
                                                4. Hoàn thành
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        {/* ------------------Tab 1----------------- */}
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {this.props.types.length > 0 && (
                                                <div className="form-group">
                                                    <h6>Loại bài báo*</h6>
                                                    <select
                                                        name="typeId"
                                                        className="custom-select form-control"
                                                        onChange={this.inputChangeHandler}
                                                    >
                                                        {this.props.types.map(type => (
                                                            <option key={type._id} value={type._id}>
                                                                {type.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            {this.state.submissionType === SUBMISSION_TYPES.PEER_REVIEW_RESEARCH.name ? (
                                                <Aux>
                                                    <h6>Yêu cầu chung</h6>
                                                    <div className="text-secondary mb-1">Bạn cần đọc và chấp nhận các yêu cầu dưới đây
                                                    trước khi tiến hành đăng tải bài báo lên hệ thống.
                                                    </div>
                                                    <div className="form-check pt-1 pb-1">
                                                        <input className="form-check-input" type="checkbox" name="requirement1"
                                                            checked={this.state.requirement1} onChange={event => this.confirmRequirementHandler(event)} />
                                                        <label className="form-check-label">
                                                            Bài báo chưa từng được xuất bản trên hệ thống, cũng như trên các tạp chí khác.
                                                        </label>
                                                    </div>
                                                    <div className="form-check pt-1 pb-1">
                                                        <input className="form-check-input" type="checkbox" name="requirement2"
                                                            checked={this.state.requirement2} onChange={event => this.confirmRequirementHandler(event)} />
                                                        <label className="form-check-label">
                                                            Các tài liệu liên quan như file đính kèm bài báo phải ở dạng doc, docx hoặc pdf.
                                                        </label>
                                                    </div>
                                                    <div className="form-check pt-1 pb-1">
                                                        <input className="form-check-input" type="checkbox" name="requirement3"
                                                            checked={this.state.requirement3} onChange={event => this.confirmRequirementHandler(event)} />
                                                        <label className="form-check-label">
                                                            Văn bản có khoảng cách chữ bằng một dấu cách; font chữ 12;
                                                            sử dụng chữ nghiêng thay vì gạch chân (ngoại trừ các địa chỉ URL);
                                                            và tất cả các hình minh họa, mô phỏng và bảng biểu được đặt trong văn bản
                                                            ở những vị trí thích hợp, thay vì ở cuối.
                                                        </label>
                                                    </div>
                                                    <div className="form-check pt-1 pb-1">
                                                        <input className="form-check-input" type="checkbox" name="requirement4"
                                                            checked={this.state.requirement4} onChange={event => this.confirmRequirementHandler(event)} />
                                                        <label className="form-check-label">
                                                            Văn bản tuân thủ các yêu cầu về  văn phong của một bài báo khoa học.
                                                        </label>
                                                    </div>
                                                    <button
                                                        className="btn btn-outline-primary mt-2 btn-flat"
                                                        disabled={!(this.state.requirement1 && this.state.requirement2 && this.state.requirement3 && this.state.requirement4)}
                                                        onClick={this.step2ActiveHandler}>Tiếp tục</button>
                                                </Aux>
                                            ) : (
                                                <button className="btn btn-outline-primary mt-2 btn-flat"
                                                    onClick={this.step2ActiveHandler}>Tiếp tục</button>
                                            )}
                                        </div>
                                        {/* ------------------Tab 2----------------- */}
                                        <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                            <div className="card-body">
                                                {this.props.categories.length > 0 ? (
                                                    <div className="form-group">
                                                        <label>Lĩnh vực nghiên cứu*</label>
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

                                                {/* With Published Research */}
                                                {this.state.submissionType === SUBMISSION_TYPES.PUBLISHED_RESEARCH.name && (
                                                    <Aux>
                                                        <div className="form-group">
                                                            <label>DOI*</label>
                                                            <input
                                                                type="text"
                                                                name="DOI"
                                                                className={!this.state.controls_published.DOI.valid && this.state.controls_published.DOI.touched ? "form-control-error" : "form-control"}
                                                                placeholder={this.state.controls_published.DOI.elementConfig.placeholder}
                                                                defaultValue={this.state.controls_published.DOI.value}
                                                                onChange={this.inputChangeHandler_published} />
                                                            {!this.state.controls_published.DOI.valid && this.state.controls_published.DOI.touched ?
                                                                <p className="form-control-error-msg">Giá trị DOI không hợp lệ!</p> : null}
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Tên tạp chí*</label>
                                                            <input
                                                                type="text"
                                                                name="magazineName"
                                                                className={!this.state.controls_published.magazineName.valid && this.state.controls_published.magazineName.touched ? "form-control-error" : "form-control"}
                                                                placeholder={this.state.controls_published.magazineName.elementConfig.placeholder}
                                                                defaultValue={this.state.controls_published.magazineName.value}
                                                                onChange={this.inputChangeHandler_published} />
                                                            {!this.state.controls_published.magazineName.valid && this.state.controls_published.magazineName.touched ?
                                                                <p className="form-control-error-msg">Tên tạp chí không hợp lệ!</p> : null}
                                                        </div>
                                                    </Aux>
                                                )}

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
                                                    <label>File bài báo*</label>
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
                                                    disabled={
                                                        this.state.submissionType === SUBMISSION_TYPES.PUBLISHED_RESEARCH.name ?
                                                            (!(this.state.formIsValid && this.state.formIsValid_published)) : (!this.state.formIsValid)}
                                                    onClick={this.step3ActiveHandler}>Tiếp tục</button>
                                                <button
                                                    className="btn btn-outline-danger ml-2 btn-flat"
                                                    onClick={this.step1ActiveHandler}>Quay lại</button>
                                            </div>
                                        </div>
                                        {/* ------------------Tab 3----------------- */}
                                        <div className={this.state.step3Active ? 'tab-pane show active' : 'tab-pane'}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label>Tài liệu kèm theo</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
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
                                                        {this.state.metadata.length > 0 && (
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
                                        {/* ------------------Tab 4----------------- */}
                                        <div className={this.state.step4Active ? 'tab-pane show active' : 'tab-pane'}>
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
        types: state.submission.types,
        isSubmissionCreated: state.submission.isSubmissionCreated,
        submission: state.submission.submission,
        fileUploading: state.submission.fileUploading,
        error: state.submission.error
    };
};

const mapDispatchToProps = {
    getCategories,
    getSubmissionTypes,
    createSubmission,
    resetCreateSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitArticle);