exports.USER_ROLES = {
    ADMIN: {
        name: 'Admin',
        permissionLevel: 5,
        roleId: '5f97f6d9d1011608a40d3349'
    },
    CHIEF_EDITOR: {
        name: 'Chief Editor',
        permissionLevel: 4,
        roleId: '5f97f6cbd1011608a40d3348'
    },
    EDITOR: {
        name: 'Editor',
        permissionLevel: 3,
        roleId: '5f97f6b4d1011608a40d3347'
    },
    REVIEWER: {
        name: 'Reviewer',
        permissionLevel: 2,
        roleId: '5f97f6a8d1011608a40d3346'
    },
    AUTHOR: {
        name: 'Author',
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
    }
};