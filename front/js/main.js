var count = 0;
var myDate = new Date();
window.time = dateFormat("YYYY-mm-dd HH:MM", myDate);

window.chartCount = 0;
window.timeout = false; //启动及关闭按钮 
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
                $("#datetime1").datetimepicker().on("changeDate", function(ev) {
                    // 获取选择的时间，并以当前时间去刷新界面；同时提供六个分钟时间段的选择按钮
                    window.time = $("#form-control1").val();
                    if (window.time != "") {
                        setTimeout(function() {
                            Refresh(window.time);
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
                            Refresh(window.time);
                        }, 100);
                    }
                });
            }
            // 自动刷新的实现
            else {
                $("#container1").css("display", "none");

                window.timeout = false;
                window.time = dateFormat("YYYY-mm-dd HH:MM", myDate);
                // window.time = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
                interval();
            }
        },
    });
    $(".switch input").bootstrapSwitch("toggleState", true);

    // 上一小时、下一小时的事件绑定
    $("#up_hour").click(function() {
        if ($("#form-control1").val() == "") {
            var myDate = new Date();
            var h = myDate.getHours() - 1; //获取前一个小时数(0-23)
            tmp = dateFormat("YYYY-mm-dd HH", myDate) + ":00";
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
            Refresh(window.time);
        }, 100);
    });

    $("#down_hour").click(function() {
        var tmp;

        if ($("#form-control1").val() == "") {
            var myDate = new Date();
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
            Refresh(window.time);
        }, 100);
    });
});

function interval() {
    if (timeout) return;
    Refresh(window.time);
    setTimeout(interval, 40000); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒 
}


// 入口函数在这里
$(document).ready(function() {
    Refresh(window.time);
    setTimeout(interval, 40000);
});

function Refresh(time) {
    // 刷新设置快照时间
    $("#shot-time").html(time.substr(0, 16));
    // 获取表格内容，同时填充图层颜色
    for (var i = 1; i <= 11; i++) {
        getTableInfo(i, time);
        getDeviceColor(i, time);
    }
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

    // 跳转后台管理系统的入口
    $("#manageEntrance").click(function() {
        window.open("../../manage/login.html");
    });
})


$(function() {
    // 点击I显示对应的电流（或者是电阻）历史情况
    $(".I_history").click(function() {
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
            "id": id,
            "datatime": time,
        },
        success: function(res) {
            var loss = res
                .getElementsByTagName("string")[0]
                .innerHTML.split(";")[0]
                .split(",");
            var temp = res
                .getElementsByTagName("string")[0]
                .innerHTML.split(";")[1]
                .split(",");
            var date = [];
            for (var i = 0; i < temp.length; i++) {
                var x = temp[i].toString().replace(" ", "-");
                date.push(x);
            }

            try {
                myChart.clear();
            } catch (e) {}
            var myChart = echarts.init(document.getElementById("line_loss_pic"));
            var option;
            if (id == 7) {
                option = {
                    title: {
                        text: getNameTitle(id) + "零序电压历史信息",
                        x: "center",
                    },
                    tooltip: {
                        trigger: "axis",
                    },

                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: "none",
                            },
                            dataView: { readOnly: false },
                            magicType: { type: ["line", "bar"] },
                        },
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: date,
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            formatter: "{value} V",
                        },
                    },
                    series: [{
                        name: "当前电压",
                        type: "line",
                        data: loss,
                        itemStyle: { normal: { color: "#26C0C0" } },
                        markLine: {
                            data: [{ type: "average", name: "平均值" }],
                        },
                    }, ],
                };
            } else if (id == 11) {
                option = {
                    title: {
                        text: getNameTitle(id) + "历史信息",
                        x: "center",
                    },
                    tooltip: {
                        trigger: "axis",
                    },

                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: "none",
                            },
                            dataView: { readOnly: false },
                            magicType: { type: ["line", "bar"] },
                        },
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: date,
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            formatter: "{value} A",
                        },
                    },
                    series: [{
                        name: "当前电流",
                        type: "line",
                        data: loss,
                        itemStyle: { normal: { color: "#26C0C0" } },
                        markLine: {
                            data: [{ type: "average", name: "平均值" }],
                        },
                    }, ],
                };
            } else if (id == 8 || id == 9 || id == 10) {
                option = {
                    title: {
                        text: getNameTitle(id) + "泄露电流历史信息",
                        x: "center",
                    },
                    tooltip: {
                        trigger: "axis",
                    },

                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: "none",
                            },
                            dataView: { readOnly: false },
                            magicType: { type: ["line", "bar"] },
                        },
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: date,
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            formatter: "{value} A",
                        },
                    },
                    series: [{
                        name: "当前电流",
                        type: "line",
                        data: loss,
                        itemStyle: { normal: { color: "#26C0C0" } },
                        markLine: {
                            data: [{ type: "average", name: "平均值" }],
                        },
                    }, ],
                };
            } else {
                option = {
                    title: {
                        text: getNameTitle(id) + "风电机组零序电流历史信息",
                        x: "center",
                    },
                    tooltip: {
                        trigger: "axis",
                    },

                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: "none",
                            },
                            dataView: { readOnly: false },
                            magicType: { type: ["line", "bar"] },
                        },
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: date,
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            formatter: "{value} A",
                        },
                    },
                    series: [{
                        name: "当前电流",
                        type: "line",
                        data: loss,
                        itemStyle: { normal: { color: "#26C0C0" } },
                        markLine: {
                            data: [{ type: "average", name: "平均值" }],
                        },
                    }, ],
                };
            }

            myChart.setOption(option);
        },
    });
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
            console.log(res)
            var count = 0;
            var content = "";

            while (res.getElementsByTagName("Table")[count] != null)
                count++;

            for (var i = 0; i < count; i++) {

                for (var j = 1; j <= 5; j++) {
                    var element = res.getElementsByTagName("Table")[i].childNodes[2 * j - 1].childNodes[0].nodeValue;
                    if (j == 1) {
                        content = content + "<tr><td>" + (i + 1) + "</td><td>" + GetDeviceID_2(element) + "</td>";
                        console.log(element);
                    } else if (j == 5)
                        content = content + "<td>" + element + "</td></tr>";
                    else
                        content = content + "<td>" + element + "</td>";
                }
            }
            content = content.replace(/m/g, "短路电流").replace(/l/g, "漏电流").replace(/c/g, "三相电流").replace(/v/g, "电压");
            content = content.replace(/T/g, " ").replace(/\+08:00/g, " ");

            $("#list_2").html("");
            $("#list_2").html("<table class=\"table table-bordered table-striped table-hover\">" +
                "<thead><tr>" +
                "<th>序号</th><th>设备号</th><th>相位</th><th>异常类型</th><th>异常时间</th><th>故障距离</th></tr></thead><tbody>" + content + "</tbody></table>");

            $("#list_2 table tbody tr").click(function(e) {
                var ErrorTime = $(this).children().eq(4)[0].innerHTML;
                window.timeout = true;
                window.time = ErrorTime;
                // 获取该异常对应情况下的数据信息，并进行显示
                Refresh(ErrorTime);

                $("#warningList_2").modal("toggle");
            });
        }
    })
}

// 获取设备号，用于绘制表格时显示名字
function GetDeviceID_2(DeviceID) {
    var id = parseInt(DeviceID);
    if (id == 1) return "4#风电机组";
    if (id == 2) return "5#风电机组";
    if (id == 3) return "6#风电机组";
    if (id == 4) return "7#风电机组";
    if (id == 5) return "8#风电机组";
    if (id == 6) return "9#风电机组";
    if (id == 7) return "PT";
    if (id == 8) return "3923";
    if (id == 9) return "3921";
    if (id == 10) return "3935";
    if (id == 11) return "接地电流";
    return "未知设备";
}

// 格式化时间
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}