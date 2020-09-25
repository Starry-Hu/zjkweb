// newFZ,newBoxid都在FZ和boxid的基础上删除了7018，随便删除一个，因为分支箱七多了一列，需要错位
var FZ = [101, 102, 103, 203, 204, 205, 305, 306, 3013, 406, 407, 408, 508, 509, 5010, 6010, 6011, 6012, 7013, 7014, 7015, 7018, 8015, 8016, 8017, 9018, 9019, 9020];
var newFZ = [101, 102, 103, 203, 204, 205, 305, 306, 3013, 406, 407, 408, 508, 509, 5010, 6010, 6011, 6012, 7013, 7014, 7015, 8015, 8016, 8017, 9018, 9019, 9020];
var boxid = ["1_1", "1_2", "1_3", "2_3", "2_4", "2_5", "3_5", "3_6", "3_13", "4_6", "4_7", "4_8", "5_8", "5_9", "5_10", "6_10", "6_11", "6_12", "7_13", "7_14", "7_15", "7_18", "8_15", "8_16", "8_17", "9_18", "9_19", "9_20"];
var newBoxid = ["1_1", "1_2", "1_3", "2_3", "2_4", "2_5", "3_5", "3_6", "3_13", "4_6", "4_7", "4_8", "5_8", "5_9", "5_10", "6_10", "6_11", "6_12", "7_13", "7_14", "7_15", "8_15", "8_16", "8_17", "9_18", "9_19", "9_20"];
var number = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

// 获取风电机组的相关数据（电流I），并调用相关方法进行渲染
function getFZ_1(FZ_id, FZ_time, amplitudeOrAngle) {

    // 分别对七个分支进行判断渲染
    if (FZ_id == 0) {

        var FZUrl = "";

        if (amplitudeOrAngle == true)
            FZUrl = "/getDataByDevice_FZ_1";
        else
            FZUrl = "/getDataByDevice_FZ_1_ANG";

        // 分别获取到该设备的状态，渲染红色、绿色等图层，写显示相应的线路故障情况，并将数据传递给子函数进行每行的渲染
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 1], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 0, getArray(res));
                }
            }
        })
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 2], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 2]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 1, getArray(res));
                }
            }
        })
    } else if (FZ_id == 1) {

        var FZUrl = "";

        if (amplitudeOrAngle == true)
            FZUrl = "/getDataByDevice_FZ_1";
        else
            FZUrl = "/getDataByDevice_FZ_1_ANG";

        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 0], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 0]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 0, getArray(res));
                }
            }
        })
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 1], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 1, getArray(res));
                }
            }
        })
    } else if (FZ_id == 2) {

        var FZUrl = "";

        if (amplitudeOrAngle == true)
            FZUrl = "/getDataByDevice_FZ_1";
        else
            FZUrl = "/getDataByDevice_FZ_1_ANG";

        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 0], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 0]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 0, getArray(res));
                }
            }
        })
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 2], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 2]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 1, getArray(res));
                }
            }
        })
    } else if (FZ_id == 3) {

        var FZUrl = "";

        if (amplitudeOrAngle == true)
            FZUrl = "/getDataByDevice_FZ_1";
        else
            FZUrl = "/getDataByDevice_FZ_1_ANG";

        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 0], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 0]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 0, getArray(res));
                }
            }
        })
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 1], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 1, getArray(res));
                }
            }
        })
    } else if (FZ_id == 4) {

        var FZUrl = "";

        if (amplitudeOrAngle == true)
            FZUrl = "/getDataByDevice_FZ_1";
        else
            FZUrl = "/getDataByDevice_FZ_1_ANG";

        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 0], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 0]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 0, getArray(res));
                }
            }
        })
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 1], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++) {
                    fillFZ_1(FZ_id, i, 1, getArray(res));
                }
            }
        })
    } else if (FZ_id == 6) {

        var FZUrl = "";

        if (amplitudeOrAngle == true)

            FZUrl = "/getDataByDevice_FZ_1";
        else
            FZUrl = "/getDataByDevice_FZ_1_ANG";

        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": FZ[3 * FZ_id], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 0]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++)
                    fillFZ_1(FZ_id, i, 0, getArray(res));
            }
        })
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": FZ[3 * FZ_id + 1], "datatime": FZ_time },
            success: function(res) {
                $("#box" + boxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++)
                    fillFZ_1(FZ_id, i, 1, getArray(res));
            }
        })
    } else if (FZ_id == 7) {

        var FZUrl = "";

        if (amplitudeOrAngle == true)

            FZUrl = "/getDataByDevice_FZ_1";
        else
            FZUrl = "/getDataByDevice_FZ_1_ANG";

        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id], "datatime": FZ_time },
            success: function(res) {
                $("#box" + newBoxid[3 * FZ_id]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++)
                    fillFZ_1(FZ_id, i, 0, getArray(res));
            }
        })
        $.ajax({
            url: url + FZUrl,
            type: "post",
            data: { "DeviceID": newFZ[3 * FZ_id + 1], "datatime": FZ_time },
            success: function(res) {
                $("#box" + newBoxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 });
                for (var i = 0; i <= 3; i++)
                    fillFZ_1(FZ_id, i, 1, getArray(res));
            }
        })
    }
}


// 对分支箱信息表格进行填充
function fillFZ_1(id, row, col, array) {

    try {
        var newid = id + 1; //分支箱号
        // 如果没有数据则显示为——，否则显示为相应的数值
        if (array[row].split(",")[0] == "0" || array[row].split(",")[0] == "0.0") //数组下标对应行号
            $("#box_info" + newid).find("tbody tr").eq(row).find("td").eq(col + 1).html("——");
        else
            $("#box_info" + newid).find("tbody tr").eq(row).find("td").eq(col + 1).html(parseFloat(array[row].split(",")[0]).toFixed(2));
    } catch (e) {
        $("#box_info" + id).css("display", "none");
    }
}


function temp(FZ_id, FZ_time, category, amplitudeOrAngle) {


    var FZUrl = "";

    if (amplitudeOrAngle == true)
        FZUrl = "/getDataByDevice_FZ_1";
    else
        FZUrl = "/getDataByDevice_FZ_1_ANG";

    $.ajax({
        url: url + FZUrl,
        type: "post",
        data: { "DeviceID": category[3 * FZ_id], "datatime": FZ_time },
        success: function(res) {
            if (FZ_id <= 5) { $("#box" + boxid[3 * FZ_id]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 }); } else { $("#box" + newBoxid[3 * FZ_id]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 }); }
            for (var i = 0; i <= 3; i++) {
                fillFZ_1(FZ_id, i, 0, getArray(res));
            }
        }
    })
    $.ajax({
        url: url + FZUrl,
        type: "post",
        data: { "DeviceID": category[3 * FZ_id + 1], "datatime": FZ_time },
        success: function(res) {
            if (FZ_id <= 5) { $("#box" + boxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 }); } else { $("#box" + newBoxid[3 * FZ_id + 1]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 }); }
            for (var i = 0; i <= 3; i++) {
                fillFZ_1(FZ_id, i, 1, getArray(res));
            }
        }
    })
    $.ajax({
        url: url + FZUrl,
        type: "post",
        data: { "DeviceID": category[3 * FZ_id + 2], "datatime": FZ_time },
        success: function(res) {
            if (FZ_id <= 5) { $("#box" + boxid[3 * FZ_id + 2]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 }); } else { $("#box" + newBoxid[3 * FZ_id + 2]).css({ "background-color": getArray(res)[0].split(",")[1], "opacity": 0.7 }); }
            for (var i = 0; i <= 3; i++) {
                fillFZ_1(FZ_id, i, 2, getArray(res));
            }
        }
    })
}

// 对分支箱旁边线路上的电流数据进行获取，并填充表格
function getFZ_2(FZ_id, FZ_time) {
    console.log(FZ[FZ_id - 1]);
    $.ajax({
        url: url + "/getDataByDevice_FZ_2",
        type: "post",
        data: { "DeviceID": FZ[FZ_id - 1], "datatime": FZ_time },
        success: function(res) {
            fillFZ_2(FZ_id, getArray(res), FZ_time);
        }
    })
}

function fillFZ_2(FZ_id, array, time) {
    var temp = [];
    for (var i = 0; i < 6; i++)
        temp.push(array[i].split(","));
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 2; j++) {
            if (temp[i][j] == "0" || temp[i][j] == "0.0")
                temp[i][j] = "——";
        }
    }

    var order = FZ[FZ_id - 1].toString().substr(0, 1);
    var nameTitle = getNameTitle(FZ_id);
    // 拼接右侧弹窗的内容进行显示
    // 修改为：找到该设备对应的表格，将数据渲染成当前的
    $("#tableInfo").html($("#tableInfo").html() +
        "<table class=\"table table-bordered table-striped table-hover XBdetail detail \" id=\"table_info" + id + "\"  time=\"" + time + "\"  order=\"" + id + "\"><thead><tr>" +
        "<th width=\"px\">&nbsp;&nbsp;&nbsp;#" + id + "</th>" +
        "<th>模值(V)</th><th>角度(度)</th></tr></thead><tbody><tr><td>U<sub>A</sub></td>" +
        "<td style='color:" + temp[0][2] + "'>" + temp[0][0] + "</td><td style='color:" + temp[0][2] + "'>" + temp[0][1] + "</td></tr><tr>" +
        "<td>I<sub>B</sub></td>" +
        "<td style='color:" + temp[1][2] + "'>" + temp[1][0] + "</td><td style='color:" + temp[1][2] + "'>" + temp[1][1] + "</td></tr><tr>" +
        "<td>I<sub>C</sub></td>" +
        "<td style='color:" + temp[2][2] + "'>" + temp[2][0] + "</td><td style='color:" + temp[2][2] + "'>" + temp[2][1] + "</td></tr><tr>" +
        "<td>3I<sub>0</sub></td>" +
        "<td style='color:" + temp[3][2] + "'>" + temp[3][0] + "</td><td style='color:" + temp[3][2] + "'>" + temp[3][1] + "</td></tr><tr>" +
        "<td>I<sub>g1</sub></td>" +
        "<td style='color:" + temp[4][2] + "'>" + temp[4][0] + "</td><td style='color:" + temp[4][2] + "'>" + temp[4][1] + "</td></tr><tr>" +
        "<td>I<sub>g2</sub></td>" +
        "<td style='color:" + temp[5][2] + "'>" + temp[5][0] + "</td><td style='color:" + temp[5][2] + "'>" + temp[5][1] + "</td></tr></tbody></table>"
    );
}

// 点击表格，查看当前设备在此故障时刻的图表显示
$(".move").on('click', '.FZdetail', function() {
    var num = $(this).attr("order");
    var time = $(this).attr("time");
    window.open('./detail.html?id=' + num + "&category=FZ&time=" + time);
})

// 获取各风机组电压的“部分数据（显示U和3U）”并绘制表格（原系统为X型设备）绘制某个风机的数据表格，
function getXB_1(XB_id, XB_time, amplitudeOrAngle) {

    var severUrl = "";

    // 原来是模值和相角请求不同的接口，现在全部一起显示。
    // if (amplitudeOrAngle == true) 
    // 	severUrl = "/getDataByDevice_XB_1";
    // else
    // 	severUrl = "/getDataByDevice_XB_1_ANG";

    severUrl = "/getDataByDevice_XB_1";

    if (XB_id == 11) XB_id = 200;

    $.ajax({
        url: url + severUrl,
        type: "post",
        async: false,
        data: { "DeviceID": XB_id, "datatime": XB_time },
        success: function(res) {
            if (XB_id == 200) XB_id = 11;
            // 对获取的两行数据填充进表格，并进行相应的状态图层颜色显示
            fillXB_1(XB_id, 0, getArray(res));
            fillXB_1(XB_id, 1, getArray(res));
        }
    })
}

function fillXB_1(id, order, array) {
    try {
        // 如果没有数据的话，显示为——
        if (array[order].split(",")[0] == "0" || array[order].split(",")[0] == "0.0") {
            $("#move" + id).find("tbody tr").eq(order).find("td").eq(1).html("——");
            $("#flag" + id).css({ "background-color": array[order].split(",")[1], "opacity": 0.7 });
        } else {
            $("#move" + id).find("tbody tr").eq(order).find("td").eq(1).html(parseFloat(array[order].split(",")[0]).toFixed(2));
            $("#flag" + id).css({ "background-color": array[order].split(",")[1], "opacity": 0.7 });

        }
    } catch (e) {
        $("#move" + id).css("display", "none");
    }
}

// ---------------------  获取各风机组电压的“详细数据”并绘制表格（原系统为X型设备） ------------------------
function getXB_2(XB_id, XB_time) {
    if (XB_id == 11) XB_id = 200;
    $.ajax({
        url: url + "/getDataByDevice_XB_2",
        type: "post",
        data: { "DeviceID": XB_id, "datatime": XB_time },
        success: function(res) {
            if (XB_id == 200) XB_id = 11;
            // console.log(getArray(res))
            fillXB_2(XB_id, getArray(res), XB_time);
        }
    })
}

function fillXB_2(id, array, time) {
    var temp = [];
    for (var i = 0; i < 4; i++)
        temp.push(array[i].split(","));
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 2; j++) {
            if (temp[i][j] == "0" || temp[i][j] == "0.0")
                temp[i][j] = "——";
        }
    }

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

    // 绘制图层状态颜色
    $("#flag" + id).css({ "background-color": temp[0][2] });
}

// 点击具体的表格信息内容，显示相应的图像
$("#tableInfo").on('click', '.XBdetail', function() {
    var num = $(this).attr("order");
    var time = $(this).attr("time");
    if (num == 11) { num = 200; }
    window.open('./detail.html?id=' + num + "&category=XB&time=" + time);
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