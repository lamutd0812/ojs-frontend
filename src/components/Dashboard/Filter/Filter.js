import React from 'react';

const Filter = (props) => {
    return (
        <div className="card-header">
            <div className="card-tools float-left">
                <div className="input-group input-group-sm p-0">
                    <div className="mr-2 pt-1 ">
                        <i className="fas fa-filter"></i> <b>Tìm kiếm</b>
                    </div>
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Nhập tên bài báo"
                        onChange={props.searchInputChangeHandler} />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-default btn-flat"><i className="fas fa-search"></i></button>
                    </div>
                    <div className="ml-2 pt-1">
                        <i className="fas fa-filter"></i> <b>Bộ lọc</b>
                    </div>
                    <div className="ml-2">
                        <select className="form-control-sm" onChange={props.typeFilterHandler}>
                            <option value="">Thể loại</option>
                            {props.types.map(type => (
                                <option key={type._id} value={type._id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="ml-2">
                        <select className="form-control-sm" onChange={props.categoryFilterHandler}>
                            <option value="">Lĩnh vực nghiên cứu</option>
                            {props.categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="ml-2">
                        <select className="form-control-sm" onChange={props.stageFilterHandler}>
                            <option value="">Pha</option>
                            {props.stages.map(stage => (
                                <option key={stage._id} value={stage._id}>
                                    {stage.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;