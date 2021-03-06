exports.USER_ROLES = {
    ADMIN: {
        name: 'Admin',
        permissionLevel: 5,
        roleId: '5f97f6d9d1011608a40d3349'
    },
    CHIEF_EDITOR: {
        name: 'Tổng biên tập',
        permissionLevel: 4,
        roleId: '5f97f6cbd1011608a40d3348'
    },
    EDITOR: {
        name: 'Biên tập viên',
        permissionLevel: 3,
        roleId: '5f97f6b4d1011608a40d3347'
    },
    REVIEWER: {
        name: 'Thẩm định viên',
        permissionLevel: 2,
        roleId: '5f97f6a8d1011608a40d3346'
    },
    AUTHOR: {
        name: 'Tác giả',
        permissionLevel: 1,
        roleId: '5f97f67fd1011608a40d3345'
    }
};

exports.STAGE = {
    SUBMISSION: {
        name: 'Chờ thẩm định',
        value: 1
    },
    REVIEW: {
        name: 'Thẩm định',
        value: 2
    },
    PRE_PUBLISHING: {
        name: 'Tiền xuất bản',
        value: 3
    },
    PUBLISHED: {
        name: 'Xuất bản',
        value: 4
    },
    END: {
        name: 'Kết thúc',
        value: 0
    }
};

exports.CHIEF_EDITOR_DECISION = {
    ACCEPT_SUBMISSION: {
        decisionName: 'Chấp nhận bài báo',
        value: 1
    },
    DECLINE_SUBMISSION: {
        decisionName: 'Từ chối bài báo',
        value: 0
    }
}

exports.EDITOR_DECISION = {
    ACCEPT_SUBMISSION: {
        decisionName: 'Chấp nhận bài báo',
        value: 1
    },
    DECLINE_SUBMISSION: {
        decisionName: 'Từ chối bài báo',
        value: 0
    }
}

exports.REVIEWER_DECISION = {
    ACCEPT_SUBMISSION: {
        decisionName: 'Chấp nhận bài báo',
        value: 1
    },
    REVISION_REQUIRED: {
        decisionName: 'Yêu cầu chỉnh sửa',
        value: 2
    },
    DECLINE_SUBMISSION: {
        decisionName: 'Từ chối bài báo',
        value: 0
    }
}

exports.orgList = [
    {
        value: 'Viện Hàn Lâm Khoa Học và Công Nghệ Việt Nam',
        name: 'Viện Hàn Lâm Khoa Học và Công Nghệ Việt Nam',
        engName: 'Vietnam Academy of Science and Technology',
        memberUnits: [
            {
                name: 'Institute of Marine Biochemistry',
                engName: 'Institute of Marine Biochemistry'
            },
            {
                name: 'Institute of Marine Biochemistry 2',
                engName: 'Institute of Marine Biochemistry 2'
            }
        ]
    }
];

exports.SUBMISSION_TYPES = {
    PUBLISHED_RESEARCH: {
        name: 'Published Research'
    },
    PREPRINT: {
        name: 'Preprint'
    },
    PEER_REVIEW_RESEARCH: {
        name: 'Peer-review Research'
    }
};