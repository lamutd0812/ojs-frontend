import React from 'react';

const Filter = (props) => {
    return (
        <div className="card-header">
            <div className="card-tools float-left">
                <div className="input-group input-group-sm p-0" style={{ width: '300px' }}>
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Tìm kiếm"
                    onChange={props.searchInputChangeHandler} />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-default"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;