import React, { Component } from 'react';
import { updateObject } from '../../../utils/utility';

class SubmitArticle extends Component {

    state = {
        category: '',
        title: '',
        abstraction: '',
        coverImage: 'Chọn File',
        filename: 'Chọn File',
        step1Active: true,
        step2Active: false
    }

    fileSelectedHandler = (event) => {
        console.log(event.target.files[0].name);
        let newState = updateObject(this.state, { attachmentfile: event.target.files[0].name });
        this.setState(newState);
    }

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

    formSubmitHandler = () => {

    }

    render() {
        return (
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
                                                    <div className="form-group">
                                                        <label>Thể loại*</label>
                                                        <input type="text" className="form-control" placeholder="Nhập thể loại" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail2">Tiêu để*</label>
                                                        <input type="text" className="form-control" placeholder="Nhập tiêu đề" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail3">Mô tả*</label>
                                                        <textarea className="form-control" placeholder="Nhập mô tả" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="image">File bài báo</label>
                                                        <div className="input-group">
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" onChange={this.fileSelectedHandler} />
                                                                <label className="custom-file-label" htmlFor="coverImage">{this.state.attachmentfile}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                                    </div> */}
                                                </div>

                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-primary">Submit</button>
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
    }
}

export default SubmitArticle;