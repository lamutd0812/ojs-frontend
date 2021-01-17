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
            placeholder: 'Chọn lĩnh vực nghiên cứu'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false
    },
    typeId: {
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
    },
};

// With Published Research
export const publishedResearchInputControls = {
    magazineName: {
        elementConfig: {
            type: 'text',
            placeholder: 'Tên tạp chí'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    },
    DOI: {
        elementConfig: {
            type: 'text',
            placeholder: 'DOI'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    },
    url: {
        elementConfig: {
            type: 'text',
            placeholder: 'url'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    },
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
    typeId: {
        elementConfig: {
            type: 'text',
            placeholder: 'Chọn thể loại'
        },
        value: '',
        typeName: '',
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
        valid: true,
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

export const acceptSubmissionInputControls = {
    content: {
        elementConfig: {
            type: 'text',
            placeholder: 'Nhận xét của bạn'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    }
};

export const updateUserInforInputControls = {
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
        valid: true,
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
        valid: true,
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
        valid: true,
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
        valid: true,
        touched: false
    },
    affiliation: {
        elementConfig: {
            type: 'text',
            placeholder: 'Tổ chức'
        },
        value: '',
        validation: {
            required: false,
            maxLength: 255
        },
        valid: true,
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
        valid: true,
        touched: false
    }
};

export const changePasswordInputControls = {
    old_password: {
        elementConfig: {
            type: 'password',
            placeholder: 'Mật khẩu cũ*'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    },
    new_password: {
        elementConfig: {
            type: 'password',
            placeholder: 'Mật khẩu mới*'
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
};

export const commentAndReplyInput = {
    comment: {
        value: '',
        validation: {
            required: true,
            minLength: 10,
        },
        valid: false,
        touched: false
    },
    reply: {
        value: '',
        validation: {
            required: true,
            minLength: 10,
        },
        valid: false,
        touched: false
    },
    commentToReplyId: ''
};