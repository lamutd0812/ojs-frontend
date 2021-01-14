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
    return { updatedControls, eq };
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

// With Published Research
export const publishedResearchInputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    const updatedControls = updateObject(state.controls_published, {
        [controlName]: updateObject(state.controls_published[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, state.controls_published[controlName].validation),
            touched: true
        })
    });

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    return { updatedControls, formIsValid };
};

// Seek Published Article Update Controls
export const crawlPublishedArticleHandler = (publishedArticle, state) => {
    const updatedControls = updateObject(state.controls, {
        title: updateObject(state.controls.title, {
            value: publishedArticle.title,
            valid: publishedArticle.title !== '' ? true : false,
            touched: true
        }),
        abstract: updateObject(state.controls.abstract, {
            value: publishedArticle.abstract,
            valid: publishedArticle.abstract !== '' ? true : false,
            touched: true
        }),
    });
    const updatedControls_published = updateObject(state.controls_published, {
        magazineName: updateObject(state.controls_published.magazineName, {
            value: publishedArticle.magazineName,
            valid: publishedArticle.magazineName !== '' ? true : false,
            touched: true
        })
    });

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    let formIsValid_published = true;
    for (let controlName in updatedControls_published) {
        formIsValid = updatedControls_published[controlName].valid && formIsValid_published;
    }

    return { updatedControls, formIsValid, updatedControls_published, formIsValid_published };
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

export const updateUserInforInputChangeHandler = (event, state) => {
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

export const changePasswordInputChangeHandler = (event, state) => {
    let controlName = event.target.name;
    const updatedControls = updateObject(state.controls_change_pwd, {
        [controlName]: updateObject(state.controls_change_pwd[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, state.controls_change_pwd[controlName].validation),
            touched: true
        })
    });

    let passwordEquals = true;
    if (updatedControls['new_password'].value !== updatedControls['confirm_password'].value) {
        passwordEquals = false;
    }

    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    const eq = formIsValid && passwordEquals;
    return { updatedControls, eq };
};