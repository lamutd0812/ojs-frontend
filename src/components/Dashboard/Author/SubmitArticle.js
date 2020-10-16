import React, { Component } from 'react';

class SubmitArticle extends Component {
    render() {
        return (
            <div className="content-wrapper">
                {/* Submit Form */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-primary" style={{ marginTop: '30px' }}>
                                <div className="card-header">
                                    <h3 className="card-title">Submit bài báo lên hệ thống</h3>
                                </div>
                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Thể loại*</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Tiêu để*</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Mô tả*</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                        </div>
                                        {/* <div className="form-group">
                                            <label for="image">Ảnh bìa</label>
                                            <div className="input-group">
                                                <input type="file" id="image" />
                                            </div>
                                        </div> */}
                                        <div className="form-group">
                                            <label for="image">Ảnh bìa</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="image" />
                                                    <label className="custom-file-label" for="image">Choose file</label>
                                                </div>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Upload</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="image">File đính kèm*</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="image" />
                                                    <label className="custom-file-label" for="image">Choose file</label>
                                                </div>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Upload</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                        </div>
                                    </div>


                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SubmitArticle;