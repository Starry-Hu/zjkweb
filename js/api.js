// newFZ,newBoxid都在FZ和boxid的基础上删除了7018，随便删除一个，因为分支箱七多了一列，需要错位
var FZ = [101, 102, 103, 203, 204, 205, 305, 306, 3013, 406, 407, 408, 508, 509, 5010, 6010, 6011, 6012, 7013, 7014, 7015, 7018, 8015, 8016, 8017, 9018, 9019, 9020];
var newFZ = [101, 102, 103, 203, 204, 205, 305, 306, 3013, 406, 407, 408, 508, 509, 5010, 6010, 6011, 6012, 7013, 7014, 7015, 8015, 8016, 8017, 9018, 9019, 9020];
var boxid = ["1_1", "1_2", "1_3", "2_3", "2_4", "2_5", "3_5", "3_6", "3_13", "4_6", "4_7", "4_8", "5_8", "5_9", "5_10", "6_10", "6_11", "6_12", "7_13", "7_14", "7_15", "7_18", "8_15", "8_16", "8_17", "9_18", "9_19", "9_20"];
var newBoxid = ["1_1", "1_2", "1_3", "2_3", "2_4", "2_5", "3_5", "3_6", "3_13", "4_6", "4_7", "4_8", "5_8", "5_9", "5_10", "6_10", "6_11", "6_12", "7_13", "7_14", "7_15", "8_15", "8_16", "8_17", "9_18", "9_19", "9_20"];
var number = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

// ---------------------  获取各风机组的“详细数据”并绘制表格 ------------------------
function getTableInfo(id, time) {
    $.ajax({
        url: url + "/getDataByDevice_2",
        type: "post",
        data: { DeviceID: id, datatime: time },
        success: function(res) {
            fillTable(id, getArray(res), time);
        },
    });
}

function fillTable(id, array, time) {
    var temp = [];
    for (var i = 0; i < 4; i++)
        temp.push(array[i].split(","));
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            if (temp[i][j] == "0" || temp[i][j] == "0.0")
                temp[i][j] = "——";
        }
    }
    // 到该渲染的时候再移除，解决抖动问题
    $('#table_info' + id).remove();
    // 对不同的设备显示电流或电压
    if (id == 1 || id == 3 || id == 7) {
        $("#tableInfo").html($("#tableInfo").html() +
            "<table class=\"table table-bordered table-striped table-hover XBdetail detail \" id=\"table_info" + id + "\"  time=\"" + time + "\"  order=\"" + id + "\"><thead><tr>" +
            "<th width=\"75px\">&nbsp;&nbsp;&nbsp;#" + id + "</th>" +
            "<th>模值(A)</th><th>角度(度)</th></tr></thead><tbody><tr><td>I<sub>A</sub></td>" +
            "<td style='color:" + temp[0][2] + "'>" + temp[0][0] + "</td><td style='color:" + temp[0][2] + "'>" + temp[0][1] + "</td>" +
            "</tr><tr><td>I<sub>B</sub></td>" +
            "<td style='color:" + temp[1][2] + "'>" + temp[1][0] + "</td><td style='color:" + temp[1][2] + "'>" + temp[1][1] + "</td>" +
            "</tr><tr><td>I<sub>C</sub></td>" +
            "<td style='color:" + temp[2][2] + "'>" + temp[2][0] + "</td><td style='color:" + temp[2][2] + "'>" + temp[2][1] + "</td></tr><tr><td>3U<sub>0</sub></td>" +
            "<td style='color:" + temp[3][2] + "'>" + temp[3][0] + "</td><td style='color:" + temp[3][2] + "'>" + temp[3][1] + "</td></tr></tbody></table>"
        );
    } else {
        $("#tableInfo").html($("#tableInfo").html() +
            "<table class=\"table table-bordered table-striped table-hover XBdetail detail \" id=\"table_info" + id + "\"  time=\"" + time + "\"  order=\"" + id + "\"><thead><tr>" +
            "<th width=\"75px\">&nbsp;&nbsp;&nbsp;#" + id + "</th>" +
            "<th>模值(V)</th><th>角度(度)</th></tr></thead><tbody><tr><td>U<sub>A</sub></td>" +
            "<td style='color:" + temp[0][2] + "'>" + temp[0][0] + "</td><td style='color:" + temp[0][2] + "'>" + temp[0][1] + "</td>" +
            "</tr><tr><td>U<sub>B</sub></td>" +
            "<td style='color:" + temp[1][2] + "'>" + temp[1][0] + "</td><td style='color:" + temp[1][2] + "'>" + temp[1][1] + "</td>" +
            "</tr><tr><td>U<sub>C</sub></td>" +
            "<td style='color:" + temp[2][2] + "'>" + temp[2][0] + "</td><td style='color:" + temp[2][2] + "'>" + temp[2][1] + "</td></tr><tr><td>3U<sub>0</sub></td>" +
            "<td style='color:" + temp[3][2] + "'>" + temp[3][0] + "</td><td style='color:" + temp[3][2] + "'>" + temp[3][1] + "</td></tr></tbody></table>"
        );
    }
}

// 绘制图层状态颜色
function getDeviceColor(id, time) {
    $.ajax({
        url: url + "/getDataByDevice_1",
        type: "post",
        data: { DeviceID: id, datatime: time },
        success: function(res) {
            $("#flag" + id).css({ "background-color": getArray(res)[0], opacity: 0.9 });
        },
    });

}

// 点击具体的表格信息内容，显示相应的图像
$("#tableInfo").on('click', '.XBdetail', function() {
    var num = $(this).attr("order");
    var time = $(this).attr("time");
    window.open('./detail.html?id=' + num + "&time=" + time);
})

// 点击图层，跳转到相应的树形界面中
$('.flag').click(function() {
    var num = $(this).attr("order");
    window.open("./tree.html?id=" + num + "&time=" + window.time);
})

// 获取设备名，并显示在表格上
function getNameTitle(id) {

    if (id == 1)
        return "<u>分一</u>/升压站";
    if (id == 2)
        return "<u>分一</u>/箱变6";
    if (id == 3)
        return "<u>分一</u>/分二";
    if (id == 4)
        return "<u>分二</u>/分一";
    if (id == 5)
        return "<u>分二</u>/箱变4";
    if (id == 6)
        return "<u>分二</u>/分三";
    if (id == 7)
        return "<u>分三</u>/分二";
    if (id == 8)
        return "<u>分三</u>/分四";
    if (id == 9)
        return "<u>分三</u>/分七";
    if (id == 10)
        return "<u>分四</u>/分三";
    if (id == 11)
        return "<u>分四</u>/箱变8";
    if (id == 12)
        return "<u>分四</u>/分五";
    if (id == 13)
        return "<u>分五</u>/分四";
    if (id == 14)
        return "<u>分五</u>/箱变10";
    if (id == 15)
        return "<u>分五</u>/分六";
    if (id == 19)
        return "<u>分七</u>/分三";
    if (id == 20)
        return "<u>分七</u>/箱变1";
    if (id == 21)
        return "<u>分七</u>/分八";
    if (id == 22)
        return "<u>分七</u>/分九";
    if (id == 23)
        return "<u>分八</u>/分七";
    if (id == 24)
        return "<u>分八</u>/箱变2";
    if (id == 25)
        return "<u>分八</u>/箱变5";
}