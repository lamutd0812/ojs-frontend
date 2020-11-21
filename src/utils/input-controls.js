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
}

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
}