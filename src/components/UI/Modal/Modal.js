import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        props.show ?
            <div className={classes.modal}>
                <div className={classes.content}>
                    {props.message}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className={classes.btn} onClick={props.confirm}>
                        {props.confirmMessage}
                    </div>
                    {props.hasCancel ? (
                        <div className={classes.btn} onClick={props.cancel}>
                            {props.cancelMessage}
                        </div>
                    ) : null}
                </div>
            </div> : null
    );
};

export default Modal;