import React from 'react';

const Filter = (props) => {
    return (
        <div className="card-header">
            <div className="card-tools float-left pb-2">
                <div className="input-group input-group-sm p-0">
                    <div className="pt-1">
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
                </div>
            </div>
        </div>
    );
};

export default Filter;