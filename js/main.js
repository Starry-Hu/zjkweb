var count = 0;
var myDate = new Date();
window.time = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();;
var map = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
var orderNum = [1, 2, 3, 3, 4, 5, 5, 6, 13, 6, 7, 8, 8, 9, 10, 10, 11, 12, 13, 14, 15, 18];
var specialNum = [1, 2, 3, 3, 4, 5, 5, 6, 13, 6, 7, 8, 8, 9, 10, 10, 11, 12, 13, 14, 15, 15, 16, 17, 18, 19, 20];
var FZ = [101, 102, 103, 203, 204, 205, 305, 306, 3013, 406, 407, 408, 508, 509, 5010, 6010, 6011, 6012, 7013, 7014, 7015, 7018, 8015, 8016, 8017, 9018, 9019, 9020];

window.chartCount = 0;
window.timeout = false; //启动及关闭按钮 
window.amplitudeOrAngle = true;
window.myArray = [0, 0, 0, 0, 0];

// 手动、自动按钮切换函数
$(function() {
    $("#loading").hide();
    $(".switch input").bootstrapSwitch({
        onColor: "success",
        offColor: "warning",
        onSwitchChange: function(event, state) {
            // 切换到手动选择阶段
            if (state == true) {
                window.timeout = true;

                $("#container1").css("display", "block");
                // 选择时间
                $("#datetime1")
                    .datetimepicker()
                    .on("changeDate", function(ev) {
                        // 获取选择的时间，并以当前时间去刷新界面；同时提供六个分钟时间段的选择按钮
                        window.time = $("#form-control1").val();
                        if (window.time != "") {
                            setTimeout(function() {
                                Refresh(window.time, amplitudeOrAngle);
                            }, 100);
                        }
                    });

                // 绑定每个小时中六个时间段的选择
                $(".minuteChoose").click(function() {
                    // 提示先选择相应的时间，之后才允许点击分钟段
                    if ($("#form-control1").val() == "") {
                        $("#minuteModal").modal("toggle");
                    } else {
                        // 获取选择的时间，并以当前时间去刷新界面
                        $("#form-control1").val(
                            $("#form-control1").val().substr(0, 14) + $(this).attr("minute")
                        );

                        window.time = $("#form-control1").val();
                        $(".minuteChoose").removeClass("active");
                        $(this).addClass("active");
                        setTimeout(function() {
                            Refresh(window.time, amplitudeOrAngle);
                        }, 100);
                    }
                });
            }
            // 自动刷新的实现
            else {
                $("#container1").css("display", "none");

                window.timeout = false;
                window.time = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
                interval();
            }
        },
    });
    $(".switch input").bootstrapSwitch("toggleState", true);

    // 上一小时、下一小时的事件绑定
    $("#up_hour").click(function() {
        if ($("#form-control1").val() == "") {
            var myDate = new Date();
            var year = myDate.getFullYear(); //获取当前年
            var month = myDate.getMonth() + 1; //获取当前月
            var date = myDate.getDate(); //获取当前日
            var h = myDate.getHours() - 1; //获取当前小时数(0-23)
            tmp = year + "-" + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ":00";
        } else {
            var str = $("#form-control1").val();
            var aPos = str.indexOf(" ");
            var bPos = str.indexOf(":");
            var r = str.substr(aPos + 1, bPos - aPos - 1);
            var h = parseInt(r) - 1;
            tmp = $("#form-control1").val().substr(0, aPos) + " " + getNow(h) + ":00";
        }
        // 进行相应的内容设置
        $(".minuteChoose").removeClass("active");
        $(".minuteChoose").eq(0).addClass("active");
        $("#form-control1").val(tmp);
        window.time = tmp;
        setTimeout(function() {
            Refresh(window.time, amplitudeOrAngle);
        }, 100);
    });

    $("#down_hour").click(function() {
        var tmp;

        if ($("#form-control1").val() == "") {
            var myDate = new Date();
            var year = myDate.getFullYear(); //获取当前年
            var month = myDate.getMonth() + 1; //获取当前月
            var date = myDate.getDate(); //获取当前日
            var h = myDate.getHours() + 1; //获取当前小时数(0-23)
            tmp = year + "-" + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ":00";

        } else {
            var str = $("#form-control1").val();
            var aPos = str.indexOf(" ");
            var bPos = str.indexOf(":");
            var r = str.substr(aPos + 1, bPos - aPos - 1);
            var h = parseInt(r) + 1;
            tmp = $("#form-control1").val().substr(0, aPos) + " " + getNow(h) + ":00";
        }
        // 进行相应的内容设置
        $(".minuteChoose").removeClass("active");
        $(".minuteChoose").eq(0).addClass("active");
        $("#form-control1").val(tmp);
        window.time = tmp;
        setTimeout(function() {
            Refresh(window.time, amplitudeOrAngle);
        }, 100);
    });
});

function interval() {
    if (timeout) return;
    Refresh(window.time, amplitudeOrAngle);
    setTimeout(interval, 40000); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒 
}


// 入口函数在这里
$(document).ready(function() {
    Refresh(window.time, amplitudeOrAngle);
    setTimeout(interval, 40000);

});

function Refresh(time, amplitudeOrAngle) {
    // $("#tableInfo table").remove();

    //....................................................分支箱表格绘制...............................................................

    var number = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];

    for (var i = 0; i < 8; i++) {
        getXB_2(i, time);
    }

    // 显示相应的图层颜色
    // 点击线路显示其电流值（转到树状图中显示）
    //   $(".box").click(function () {
    //     if (count >= 12) {
    //       $("#mymodal").modal("toggle");
    //     } else {
    //       count = count + 4;
    //       var order = $(this).attr("order");
    //       getXB_2(order, time);
    //     }
    //   });
}

// 绑定点击查看异常报警，并提供搜索方法
$(function() {
    $("#alarm").click(function() {
        getAlarm("", "");
        $("#warningList_2").modal("toggle");
    });
    $("#search_2").click(function() {
        getAlarm($("#deviceIDs").val(), $("#dtp_input_2").val());
    })
})


$(function() {

    // 	var chooseTime;

    // 	$('#datetime2').datetimepicker().on('changeDate', function(ev){

    //      chooseTime = ;
    // });

    $("#search").click(function() {
        getWarningListFun($("#dtp_input_1").val(), "");
    });
});

// 获取报警列表
function getWarningListFun(ErrorTime, ErrorLine) {

    var ErrorTitle = "异常电缆段：" + ErrorLine + "&nbsp;&nbsp;&nbsp;&nbsp;异常时间：" + ErrorTime;

    $.ajax({

        url: url + "/getExceptionList",
        type: "post",
        data: { "DeviceID": "", "datatime": ErrorTime },
        success: function(res) {

            var count = 0;
            var content = "";

            while (res.getElementsByTagName("Table")[count] != null)
                count++;

            for (var i = 0; i < count; i++) {

                for (var j = 1; j <= 4; j++) {
                    if (j == 1)
                        content = content + "<tr><td>" + (i + 1) + "</td><td>" + GetDeviceID(parseInt(res.getElementsByTagName("Table")[i].childNodes[2 * j - 1].childNodes[0].nodeValue)) + "</td>";
                    if (j == 4)
                        content = content + "</tr>";
                    if (j == 3)
                        content = content + "<td>" + res.getElementsByTagName("Table")[i].childNodes[2 * j - 1].childNodes[0].nodeValue + "</td>";
                }
            }
            content = content.replace(/m/g, "短路电流").replace(/l/g, "漏电流").replace(/C/g, "三相电流").replace(/V/g, "电压");
            content = content.replace(/T/g, " ");

            $("#warningList h4").html(ErrorTitle);

            $("#list").html("");
            $("#list").html("<table class=\"table table-bordered table-striped table-hover\">" +
                "<thead><tr>" +
                "<th>序号</th><th>设备号</th><th>数据类型</th></tr></thead><tbody>" + content + "</tbody></table>");

            $("#list table tbody tr").click(function(e) {

                window.chartCount++;
                if (window.chartCount < 5) {

                    var ErrorID = $(this).children().eq(1)[0].innerHTML;
                    var ErrorType = $(this).children().eq(2)[0].innerHTML == '电压' ? " 电压" : " 电流";
                    var sendID = "";
                    ErrorID == "升压站" ? sendID = 200 : sendID = backID(ErrorID);
                    var tempIndex;

                    for (var i = 1; i < 5; i++) {
                        if (myArray[i] == 0) {
                            tempIndex = i;
                            myArray[i] = 1;
                            break;
                        }
                    }
                    $("#show" + tempIndex).modal("show");
                    $("#show" + tempIndex).find("h4").text(ErrorID + ErrorType + "异常情况");

                    $.ajax({
                        url: url + "/getDataByDevice_Exp_3",
                        type: "post",
                        data: { "DeviceID": sendID, "datatime": ErrorTime },
                        success: function(res) {
                            var t = [];
                            var a = [];
                            var errorData = res.getElementsByTagName("string")[0].innerHTML.split(";");
                            a[0] = errorData[0].split(",");
                            a[1] = errorData[1].split(",");
                            a[2] = errorData[2].split(",");
                            for (var i = 0; i < a[0].length; i++) t.push((0.625 * i).toFixed(1));
                            if (ErrorType == " 电流")
                                errorC(a[0], a[1], a[2], t, "charts" + tempIndex);
                            else
                                errorV(a[0], a[1], a[2], t, "charts" + tempIndex);
                        }
                    });
                } else {
                    window.chartCount = 4;
                    alert("折线图过多，请先关掉部分后重试！");
                }
            });
        }
    })
}

// 对出错电流的绘图
function errorC(x1, x2, x3, time, div) {

    window.myChart1 = echarts.init(document.getElementById(div));

    option = {
        xAxis: {
            name: '毫秒',
            type: 'category',
            data: time,
            axisLine: { symbol: ['none', 'arrow'], symbolOffset: [0, 12], symbolSize: [10, 15] }
        },
        yAxis: {
            name: '模值',
            type: 'value',
            axisLine: { symbol: ['none', 'arrow'], symbolOffset: [0, 12], symbolSize: [10, 15] }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        series: [{
                name: 'A相电流',
                data: x1,
                type: 'line'
            },
            {
                name: 'B相电流',
                data: x2,
                type: 'line'
            },
            {
                name: 'C相电流',
                data: x3,
                type: 'line'
            }
        ],
        legend: {
            data: ['A相电流', 'B相电流', 'C相电流'],
            right: '100'
        }
    };
    myChart1.setOption(option);
}

// 对出错电压的绘图
function errorV(x1, x2, x3, time, div) {

    window.myChart2 = echarts.init(document.getElementById(div));
    option = {
        xAxis: {
            name: '毫秒',
            type: 'category',
            data: time,
            axisLine: { symbol: ['none', 'arrow'], symbolOffset: [0, 12], symbolSize: [10, 15] }
        },
        yAxis: {
            name: '模值(V)',
            type: 'value',
            axisLine: { symbol: ['none', 'arrow'], symbolOffset: [0, 12], symbolSize: [10, 15] }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        series: [{
                name: 'A相电压',
                data: x1,
                type: 'line',
                itemStyle: { normal: { color: '#CD00CD' } }
            },
            {
                name: 'B相电压',
                data: x2,
                type: 'line',
                itemStyle: { normal: { color: 'blue' } }
            },
            {
                name: 'C相电压',
                data: x3,
                type: 'line',
                itemStyle: { normal: { color: '#008F28' } }
            }
        ],
        legend: {
            data: ['A相电压', 'B相电压', 'C相电压'],
            right: '100'
        }

    };
    myChart2.setOption(option);
}


$(function() {
    // 删掉了介损角信息的图表\钠图表
    // 点击I 显示电流的历史情况
    $("#content").on("click", ".I_history", function() {
        $("#line_loss_chart").modal("toggle");
        drawI_history(window.time, $(this).attr("order"));
    });
});

// 绘制电流历史曲线
function drawI_history(time, id) {

    $.ajax({
        url: url + "/getCurrentById",
        type: "post",
        data: {
            // "datatime":time,
            "id": id
        },
        success: function(res) {

            var loss = res.getElementsByTagName("string")[0].innerHTML.split(";")[0].split(",");
            var temp = res.getElementsByTagName("string")[0].innerHTML.split(";")[1].split(",");
            var date = [];
            for (var i = 0; i < temp.length; i++) {
                var x = temp[i].toString().replace(" ", "-")
                date.push(x);

            }


            try {
                myChart.clear();
            } catch (e) {

            }
            var myChart = echarts.init(document.getElementById('line_loss_pic'));

            option = {
                title: {
                    text: id + '号电缆段电流历史信息',
                    x: 'center'

                },
                tooltip: {
                    trigger: 'axis'
                },

                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },


                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} A'
                    }
                },
                series: [{
                    name: '当前电流',
                    type: 'line',
                    data: loss,
                    itemStyle: { normal: { color: '#26C0C0' } },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            };
            myChart.setOption(option);
        }

    })
}


// 获取设备名称
function GetDeviceID(ID) {

    var result = ID;

    if (ID == 200) { result = "升压站"; return result; }
    if (ID < 1000)
        result = "分支箱" + map[Math.floor(ID / 100 - 1)] + (ID % 100) + "号线";
    else
        result = "分支箱" + map[Math.floor(ID / 1000 - 1)] + (ID % 100) + "号线";
    return result;

}

function backID(name) {

    var ID = "";

    for (var i = 0; i < 9; i++) {
        if (map[i] == name[3]) {
            ID = i + 1;
            break;
        }
    }
    if (name.length > 7) ID = ID + '0' + name[4] + name[5];
    else ID = ID + '0' + name[4];
    return ID;
}

//////////////////

for (var i = 1; i < 5; i++) $("#show" + i).draggable();

$(function() { $('#warningList').on('hide.bs.modal', function() { window.chartCount = 0; }) });
// 点击异常信息弹窗关闭后的事件
$(function() {
    $('#show1').on('hide.bs.modal', function() {
        myArray[1] = 0;
        window.chartCount--;
    })
});
$(function() {
    $('#show2').on('hide.bs.modal', function() {
        myArray[2] = 0;
        window.chartCount--;
    })
});
$(function() {
    $('#show3').on('hide.bs.modal', function() {
        myArray[3] = 0;
        window.chartCount--;
    })
});
$(function() {
    $('#show4').on('hide.bs.modal', function() {
        myArray[4] = 0;
        window.chartCount--;
    })
});

// show方法触动后，显示弹窗的事件
$(document).on('show.bs.modal', '.modal', function(event) {
    $(this).appendTo($('body'));
}).on('shown.bs.modal', '.modal.in', function(event) {
    setModalsAndBackdropsOrder();
}).on('hidden.bs.modal', '.modal', function(event) {
    setModalsAndBackdropsOrder();
});

// 设置弹出模块，并进行相应信息设置
function setModalsAndBackdropsOrder() {
    var modalZIndex = 1040;
    $('.modal.in').each(function(index) {
        var $modal = $(this);
        modalZIndex++;
        $modal.css('zIndex', modalZIndex);
        $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
    });
    $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
}

// 获取异常报警信息，并绘制表格
function getAlarm(data, time) {
    $.ajax({
        url: url + "/getExceptionList_Hardware",
        type: "post",
        data: { "DeviceID": data, "datatime": time },
        success: function(res) {

            var count = 0;
            var content = "";

            while (res.getElementsByTagName("Table")[count] != null)
                count++;

            for (var i = 0; i < count; i++) {

                for (var j = 1; j <= 5; j++) {
                    if (j == 1)
                        content = content + "<tr><td>" + (i + 1) + "</td><td>" + GetDeviceID_2(res.getElementsByTagName("Table")[i].childNodes[2 * j - 1].childNodes[0].nodeValue) + "</td>";
                    else if (j == 5)
                        content = content + "<td>" + res.getElementsByTagName("Table")[i].childNodes[2 * j - 1].childNodes[0].nodeValue + "</td></tr>";
                    else
                        content = content + "<td>" + res.getElementsByTagName("Table")[i].childNodes[2 * j - 1].childNodes[0].nodeValue + "</td>";
                }
            }
            content = content.replace(/m/g, "短路电流").replace(/l/g, "漏电流").replace(/c/g, "三相电流").replace(/v/g, "电压");
            content = content.replace(/T/g, " ").replace(/\+08:00/g, " ");

            $("#list_2").html("");
            $("#list_2").html("<table class=\"table table-bordered table-striped table-hover\">" +
                "<thead><tr>" +
                "<th>序号</th><th>设备号</th><th>相位</th><th>异常类型</th><th>异常时间</th><th>长度</th></tr></thead><tbody>" + content + "</tbody></table>");

            $("#list_2 table tbody tr").click(function(e) {
                var ErrorTime = $(this).children().eq(4)[0].innerHTML;
                window.timeout = true;
                // 获取该异常对应情况下的数据信息，并进行显示
                Refresh(ErrorTime, amplitudeOrAngle);

                $("#warningList_2").modal("toggle");
            });
        }
    })
}

// 获取设备号，用于绘制表格时显示名字
function GetDeviceID_2(DeviceID) {
    var ID = parseInt(DeviceID);
    if (ID > 20) {
        switch (ID) {
            case 23:
                return "箱变一";
            case 26:
                return "箱变二";
            case 24:
                return "箱变八";
            case 25:
                return "箱变十";
            case 21:
                return "箱变六";
            case 22:
                return "箱变九";
        }
    }
    if (ID < 20) {
        switch (ID) {
            case 1:
                return "分支箱一2号线";
            case 2:
                return "分支箱一3号线";
            case 4:
                return "分支箱二3号线";
            case 3:
                return "分支箱二4号线";
            case 14:
                return "分支箱三5号线";
            case 13:
                return "分支箱三13号线";
            case 6:
                return "分支箱四6号线";
            case 5:
                return "分支箱四7号线";
            case 8:
                return "分支箱五8号线";
            case 7:
                return "分支箱五9号线";
            case 10:
                return "分支箱七13号线";
            case 9:
                return "分支箱七14号线";
            case 12:
                return "分支箱八15号线";
            case 11:
                return "分支箱八16号线";
        }
    }
}