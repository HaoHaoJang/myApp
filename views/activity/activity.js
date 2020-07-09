$(function() {
    loadActivityList();
});

function loadActivityList() {
    var resp = {
        success: true,
        data: [{
                fdId: "1731e08fd9e5ab1aa5c12f64adbba080",
                activeName: "快乐周六，大家一起嗨",
                startTime: "2020-07-24 00:00",
                endTime: "2020-07-18 00:00",
                closeTime: "2020-07-18 00:00",
                enterPerson: 0,
                location: "快乐周六，大家一起嗨",
                activeContent: "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨快乐周六，大家一起嗨</p>\n",
                fdState: "20",
                imageUrl: "/sys/attachment/sys_att_main/sysAttMain.do?method=download&fdId=1731e0a0ac4d2e54e79c0d341c8981a5&open=1",
            },
            {
                fdId: "1731dfa6ea38c0aa58f7c79426ead91a",
                activeName: "快乐星球六，大家一起嗨",
                startTime: "2020-07-24 00:00",
                endTime: "2020-07-17 00:00",
                closeTime: "2020-07-17 00:00",
                enterPerson: 0,
                location: "鸡鸣寺(地铁站)",
                activeContent: "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨快乐星球六，大家一起嗨</p>\n",
                fdState: "20",
                imageUrl: "/sys/attachment/sys_att_main/sysAttMain.do?method=download&fdId=1731dfb5ce5657a45c9898f420e9b37a&open=1",
            },
        ],
        msg: null,
        code: null,
    };
    render(resp.data);
}

function render(data) {
    var status = {
        "0": "未开始",
        "1": "进行中",
        "2": "已结束",
    };
    template.defaults.imports.formatStatus = function(startTime, endTime) {
        var result = compareTime(startTime, endTime);
        return status[result];
    };

    var html = template("activityListTpl", {
        list: data,
    });
    $(".container").append(html);
}
/**
 * 0 未开始  1正在进行 2已结束
 * @param {*} startTime 开始时间
 * @param {*} endTime 结束时间
 */
function compareTime(startTime, endTime) {
    var startDate = new Date(startTime).getTime();
    var endDate = new Date(endTime).getTime();
    var currentDate = new Date().getTime();
    if (startDate > currentDate) {
        return 0;
    } else if (currentDate <= endDate) {
        return 1;
    } else {
        return 2;
    }
}