import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Authors = (props) => {
    let stt = 1;
    return (
        <Aux>
            <div className="modal fade" id={"aaa" + props.iden} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Danh sách tác giả</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered table-sm mt-3">
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%' }}>#</th>
                                        <th style={{ width: '30%' }}>Tên</th>
                                        <th style={{ width: '30%' }} className="text-center">Đơn vị thành viên</th>
                                        <th style={{ width: '39%' }} className="text-center">Tổ chức</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.authors && props.authors.map((value, idx) => {
                                        const memberUnit = value.affiliation.length > 0 ? value.affiliation[0].name.split(/,(.+)/) : '';
                                        const dataOrg = value.affiliation.length > 0 ? value.affiliation[0].name.split(/,(.+)/) : '';
                                        const org = dataOrg[1] ? dataOrg[1] : ' ';
                                        return (
                                            <tr key={idx}>
                                                <td>{stt++}</td>
                                                <td>
                                                    <b>{`${value.family} ${value.given}`}</b>
                                                </td>
                                                <td>
                                                    {memberUnit[0] ?? '  '}
                                                </td>
                                                <td>
                                                    {org}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default Authors;