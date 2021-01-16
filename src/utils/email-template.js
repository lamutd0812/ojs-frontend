const getNameFromNameAndEmail = (nameAndEmail) => {
    const fileds = nameAndEmail.split("|");
    const fullname = fileds[0];
    return fullname
}

export const assignEditorTemplate = (submisisonName, chiefEditorName, editorName) => {
    const email =
        '<p>Xin chào <strong>' + getNameFromNameAndEmail(editorName) + '</strong>.</p>' +
        '<p>Ban biên tập tạp chí truy cập mở VNOJS xin được thông báo rằng bạn đã được chỉ định ' +
        'vào vị trí biên tập viên chủ trì thẩm định bài báo <strong>' + submisisonName + '</strong></>' +
        '. Bạn vui lòng truy cập vào hệ thống để xem chi tiết yêu cầu và chủ trì quá trình thẩm định.' +
        ' Tiến trình thẩm định sẽ bắt đầu khi bạn xác nhận trên hệ thống.</p>' +
        '<p>Chúng tôi tin rằng bạn là người phù hợp với vị trí biên tập viên cho bài báo này.</p>' +
        '<p>Trân trọng <br/>Tổng biên tập</p>' +
        '<p><strong>' + chiefEditorName + '</strong></p>';
    return email;
}

export const assignReviewerTemplate = (submisisonName, editorName, reviewerName) => {
    const email =
        '<p>Xin chào <strong>' + reviewerName + '</strong>.</p>' +
        '<p>Ban biên tập tạp chí truy cập mở VNOJS xin được thông báo rằng bạn đã được chỉ định ' +
        'vào vị trí thẩm định viên cho bài báo <strong>' + submisisonName + '</strong></>' +
        '. Bạn vui lòng truy cập vào hệ thống để xem chi tiết yêu cầu và chủ trì quá trình thẩm định. Tiến' +
        ' trình thẩm định sẽ bắt đầu khi bạn xác nhận trên hệ thống.</p>' +
        '<p>Chúng tôi tin rằng bạn là người phù hợp với vị trí thẩm định viên cho bài báo này.</p>' +
        '<p>Trân trọng <br/>Biên tập viên</p>' +
        '<p><strong>' + editorName + '</strong></p>';
    return email;
}

export const requestRevisionTemplate = (submisisonName, url, editorName, authorName) => {
    const email =
        '<p>Xin chào <strong>' + authorName + '</strong>.</p>' +
        '<p>Ban biên tập tạp chí truy cập mở VNOJS xin được thông báo rằng bạn nhận được yêu cầu chỉnh sửa bài báo ' +
        '<strong>' + submisisonName + '</strong></>. Bạn có thể xem ý kiến đánh giá của ban biên tập về bài báo' +
        ' <a href="' + url + '"a> tại đây.</a></p>' +
        '<p>Bạn vui lòng truy cập vào hệ thống để xem chi tiết yêu cầu và nộp lại bản chỉnh sửa bài báo ' +
        'theo yêu cầu và nhận xét từ ban biên tập</p>' +
        '<p>Trân trọng <br/>Biên tập viên</p>' +
        '<p><strong>' + editorName + '</strong></p>';
    return email;
}

export const acceptSubmissionTemplate = (submisisonName, editorName, authorName) => {
    const email =
        '<p>Xin chào <strong>' + authorName + '</strong>.</p>' +
        '<p>Ban biên tập tạp chí truy cập mở VNOJS xin trân trọng thông báo rằng bài báo ' +
        '<strong>' + submisisonName + '</strong></> của bạn đã được chấp nhận xuất bản' +
        '<p>Chúng tôi xin được chúc mừng và cảm ơn bạn. Hi vọng bạn sẽ có nhiều bài báo ' +
        'nghiên cứu khoa học chất lượng hơn trong tương lai, đóng góp vào sự phát triển ' +
        'chung của tạp chí.' +
        '<p>Trân trọng <br/>Tổng biên tập</p>' +
        '<p><strong>' + editorName + '</strong></p>';
    return email;
}

export const declineSubmissionTemplate = (submisisonName, url, editorName, authorName) => {
    const email =
        '<p>Xin chào <strong>' + authorName + '</strong>.</p>' +
        '<p>Ban biên tập tạp chí truy cập mở VNOJS xin thông báo tới bạn rằng bài báo ' +
        '<strong>' + submisisonName + '</strong></> của bạn đã bị từ chối xuất bản. ' +
        'Bạn có thể xem lại nhận xét của ban biên tập tại <a href="' + url + '"a>đây.</a></p>' +
        '<p>Chúng tôi rất lấy làm tiếc vì quyết định này. Hi vọng bạn sẽ có nhiều bài báo ' +
        'nghiên cứu khoa học chất lượng hơn trong tương lai, đóng góp vào sự phát triển ' +
        'chung của tạp chí.' +
        '<p>Trân trọng <br/>Tổng biên tập</p>' +
        '<p><strong>' + editorName + '</strong></p>';
    return email;
}
