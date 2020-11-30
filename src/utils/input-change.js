import { checkValidity, updateObject } from "./utility";

export const loginInputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    const updatedControls = updateObject(state.controls, {
        [controlName]: updateObject(state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, state.controls[controlName].validation),
            touched: true
        })
    });

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    return { updatedControls, formIsValid };
};

export const registerInputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    const updatedControls = updateObject(state.controls, {
        [controlName]: updateObject(state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, state.controls[controlName].validation),
            touched: true
        })
    });

    let passwordEquals = true;
    if (updatedControls['password'].value !== updatedControls['confirm_password'].value) {
        passwordEquals = false;
    }

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    const eq = formIsValid && passwordEquals;
    return { updatedControls, eq};
};


export const submitArticleInputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    let updatedControls = null;
    if (controlName === 'attachment') {
        updatedControls = updateObject(state.controls, {
            [controlName]: updateObject(state.controls[controlName], {
                filename: event.target.files[0].name,
                file: event.target.files[0],
                valid: checkValidity(event.target.value, state.controls[controlName].validation),
                touched: true
            })
        });
    } else {
        updatedControls = updateObject(state.controls, {
            [controlName]: updateObject(state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, state.controls[controlName].validation),
                touched: true
            })
        });
    }

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    return { updatedControls, formIsValid };
};

export const createReviewInputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    let updatedControls = null;
    if (controlName === 'attachment') {
        updatedControls = updateObject(state.controls, {
            [controlName]: updateObject(state.controls[controlName], {
                filename: event.target.files[0].name,
                file: event.target.files[0],
                valid: checkValidity(event.target.value, state.controls[controlName].validation),
                touched: true
            })
        });
    } else {
        updatedControls = updateObject(state.controls, {
            [controlName]: updateObject(state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, state.controls[controlName].validation),
                touched: true
            })
        });
    }

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    return { updatedControls, formIsValid };
};

export const editReviewInnputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    let updatedControls = null;
    if (controlName === 'attachment') {
        updatedControls = updateObject(state.controls_edit, {
            [controlName]: updateObject(state.controls_edit[controlName], {
                filename: event.target.files[0].name,
                file: event.target.files[0],
                valid: checkValidity(event.target.value, state.controls_edit[controlName].validation),
                touched: true
            })
        });
    } else {
        updatedControls = updateObject(state.controls_edit, {
            [controlName]: updateObject(state.controls_edit[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, state.controls_edit[controlName].validation),
                touched: true
            })
        });
    }

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    return { updatedControls, formIsValid };
};

export const acceptSubmissionInputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    const updatedControls = updateObject(state.controls, {
        [controlName]: updateObject(state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, state.controls[controlName].validation),
            touched: true
        })
    });

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    return { updatedControls, formIsValid };
};