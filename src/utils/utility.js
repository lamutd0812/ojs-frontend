// import axios from './axios';
import { REVIEWER_DECISION } from './constant';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject, ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.usernameValid) {
        const pattern = /^[a-zA-Z0-9]+$/;
        isValid = pattern.test(value) && isValid;
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
};

export const getStageBadgeClassname = (value) => {
    switch (value) {
        case 1:
            return "badge-dark";
        case 2:
            return "badge-warning";
        case 3:
            return "badge-primary";
        case 4:
            return "badge-success";
        default:
            return "badge-dark";
    };
};

export const getDecisionBadgeClassname = (value) => {
    switch (value) {
        case -1:
            return "decision-secondary"; // chua nop y kien
        case 0:
            return "decision-danger"; // tu choi bai bao
        case 1:
            return "decision-success"; // chap nhan bai bao
        case 2:
            return "decision-warning"; // yeu cau chinh sua
        default:
            return "decision-secondary";
    };
};

export const getDecisionBadgeClassname2 = (value) => {
    switch (value) {
        case -1:
            return "bg-secondary"; // chua nop y kien
        case 0:
            return "bg-danger"; // tu choi bai bao
        case 1:
            return "bg-success"; // chap nhan bai bao
        case 2:
            return "bg-warning";  // yeu cau chinh sua
        default:
            return "bg-secondary";
    };
};

export const getDecisionButtonClassname = (value) => {
    switch (value) {
        case -1:
            return "btn-secondary"; // chua nop y kien
        case 0:
            return "btn-danger"; // tu choi bai bao
        case 1:
            return "btn-success"; // chap nhan bai bao
        case 2:
            return "btn-warning";  // yeu cau chinh sua
        default:
            return "bg-secondary";
    };
};

export const getDeadlineDate = (days) => {
    const today = new Date();
    let deadline = new Date();
    deadline.setDate(today.getDate() + days);
    return deadline;
};

export const getFormattedDate = (dateStr) => {
    let date = new Date(dateStr);

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    const formattedDate = day + "-" + month + "-" + date.getFullYear() + " " + hour + ":" + min + ":" + sec;
    return formattedDate;
};

export const getFormattedDateOnly = (dateStr) => {
    let date = new Date(dateStr);

    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;

    const formattedDate = day + "-" + month + "-" + date.getFullYear();
    return formattedDate;
};

export const getFormattedTimeOnly = (dateStr) => {
    let date = new Date(dateStr);

    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    const formattedTimeFromDate = hour + ":" + min + ":" + sec;
    return formattedTimeFromDate;
};

export const checkDueDate = (dueDateStr) => {
    const curDate = new Date();
    const dueDate = new Date(dueDateStr);
    return curDate < dueDate; // if current date < due date === true
}

export const getDoughnutData = (reviewerAssignments) => {
    let accept = 0, editRequired = 0, decline = 0, unSent = 0;
    if (reviewerAssignments) {
        reviewerAssignments.forEach(ra => {
            if (ra.reviewerSubmissionId !== null) {
                const decisionValue = ra.reviewerSubmissionId.reviewerDecisionId.value;
                if (decisionValue === REVIEWER_DECISION.ACCEPT_SUBMISSION.value) {
                    accept++;
                }
                if (decisionValue === REVIEWER_DECISION.REVISION_REQUIRED.value) {
                    editRequired++;
                }
                if (decisionValue === REVIEWER_DECISION.DECLINE_SUBMISSION.value) {
                    decline++;
                }
            } else {
                unSent++;
            }
        });
    }
    const data = {
        labels: ['Chấp nhận bài báo', 'Yêu cầu chỉnh sửa', 'Từ chối bài báo', 'Chưa nộp ý kiến'],
        datasets: [
            {
                data: [accept, editRequired, decline, unSent],
                backgroundColor: [
                    '#28a745',
                    '#ffc107',
                    '#dc3545',
                    '#6c757d'
                ]
            },
        ],
    };
    return data;
}


