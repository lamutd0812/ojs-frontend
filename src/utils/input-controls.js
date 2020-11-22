export const registerInputControls = {
    username: {
        elementConfig: {
            type: 'username',
            placeholder: 'Tên đăng nhập*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 3,
            usernameValid: true
        },
        valid: false,
        touched: false
    },
    email: {
        elementConfig: {
            type: 'email',
            placeholder: 'Địa chỉ email*'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementConfig: {
            type: 'password',
            placeholder: 'Mật khẩu*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    },
    confirm_password: {
        elementConfig: {
            type: 'password',
            placeholder: 'Xác nhận mật khẩu*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    },
    firstname: {
        elementConfig: {
            type: 'text',
            placeholder: 'Nhập tên của bạn*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 2
        },
        valid: false,
        touched: false
    },
    lastname: {
        elementConfig: {
            type: 'text',
            placeholder: 'Nhập họ của bạn*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 2
        },
        valid: false,
        touched: false
    },
    affiliation: {
        elementConfig: {
            type: 'text',
            placeholder: 'Địa chỉ công tác'
        },
        value: '',
        validation: {
            required: false,
            maxLength: 255
        },
        valid: false,
        touched: false
    },
    biography: {
        elementConfig: {
            type: 'text',
            placeholder: 'Giới thiệu bản thân'
        },
        value: '',
        validation: {
            required: false,
            maxLength: 10000
        },
        valid: false,
        touched: false
    }
};

export const loginInputControls = {
    username: {
        elementConfig: {
            type: 'username',
            placeholder: 'Tên đăng nhập*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 3,
            usernameValid: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementConfig: {
            type: 'password',
            placeholder: 'Mật khẩu*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    }
};

export const submitArticleInputControls = {
    categoryId: {
        elementConfig: {
            type: 'text',
            placeholder: 'Chọn thể loại'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false
    },
    title: {
        elementConfig: {
            type: 'text',
            placeholder: 'Nhập tiêu đề'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    },
    abstract: {
        elementConfig: {
            type: 'text',
            placeholder: 'Nhập mô tả'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    },
    attachment: {
        elementConfig: {
            type: 'file',
            placeholder: 'Chọn File'
        },
        filename: 'Chọn File',
        file: null,
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    }
};

export const editSubmissionInputControls = {
    categoryId: {
        elementConfig: {
            type: 'text',
            placeholder: 'Chọn thể loại'
        },
        value: '',
        categoryName: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false
    },
    title: {
        elementConfig: {
            type: 'text',
            placeholder: 'Nhập tiêu đề'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: true,
        touched: false
    },
    abstract: {
        elementConfig: {
            type: 'text',
            placeholder: 'Nhập mô tả'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: true,
        touched: false
    },
    attachment: {
        elementConfig: {
            type: 'file',
            placeholder: 'Chọn File'
        },
        filename: 'Chọn File',
        file: null,
        validation: {
            required: true,
            minLength: 5
        },
        valid: true,
        touched: false
    }
};

export const createReviewInputControls = {
    decisionId: {
        elementConfig: {
            type: 'text',
            placeholder: 'Quyết định'
        },
        value: '',
        decisionName: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false
    },
    content: {
        elementConfig: {
            type: 'text',
            placeholder: 'Ý kiến nhận xét của bạn'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    },
    attachment: {
        elementConfig: {
            type: 'file',
            placeholder: 'Chọn File'
        },
        filename: 'Chọn File',
        file: null,
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    }
};

export const editReviewInputControls = {
    decisionId: {
        elementConfig: {
            type: 'text',
            placeholder: 'Quyết định'
        },
        value: '',
        decisionName: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false
    },
    content: {
        elementConfig: {
            type: 'text',
            placeholder: 'Ý kiến nhận xét của bạn'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: true,
        touched: false
    },
    attachment: {
        elementConfig: {
            type: 'file',
            placeholder: 'Chọn File'
        },
        filename: 'Chọn File',
        file: null,
        validation: {
            required: true,
            minLength: 5
        },
        valid: true,
        touched: false
    }
};