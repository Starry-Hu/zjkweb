// var	time = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
var pageUrl = window.location.search;
var id = pageUrl.split("&")[0].split("=")[1];
var time = pageUrl.split("&")[1].split("=")[1].replace("%20", " ");
var title = getNameTitle(id);
var myDate = new Date();

if (time.indexOf(".") == -1) {
    var temp = time.split(":");
    time = temp[0] + ":" + temp[1] + ":00";
}

function getDatas(id, time) {
    $.ajax({
        url: url + "/getDataByDevice_3",
        type: "post",
        data: { DeviceID: id, datatime: time },
        success: function(res) {
            var max;
            var min;
            var temp1 = [];
            var temp2 = [];
            var data = [];
            var x = [];

            for (var i = 0; i < 4; i++) {
                data.push(getArray(res)[i].split(","));
                temp1.push(Math.max.apply(null, data[i]));
                temp2.push(Math.min.apply(null, data[i]));
            }

            max = Math.max.apply(null, temp1);
            min = Math.min.apply(null, temp2);

            len = Math.max(data[0].length, data[3].length);
            for (var i = 0; i < len; i++) {
                x.push((1.6 * i).toFixed(1));
            }

            createChart(
                "current1",
                data[0],
                data[1],
                data[2],
                data[3],
                max,
                min,
                x,
            );

        },
    });
}

function createChart(div, array1, array2, array3, array4, maxdata, mindata, x) {
    window.myChart1 = echarts.init(document.getElementById(div));
    var option;
    if (id == 7) {
        option = {
            title: {
                text: title + " 三相电压波形图",
                subtext: "数据所在时间:" + time,
                x: "center",
                align: "right",
            },
            xAxis: {
                name: "毫秒(ms)",
                type: "category",
                data: x,
                axisLine: {
                    symbol: ["none", "arrow"],
                    symbolOffset: [0, 12],
                    symbolSize: [10, 15],
                },
            },
            yAxis: {
                name: "模值(V)",
                type: "value",
                axisLine: {
                    symbol: ["none", "arrow"],
                    symbolOffset: [0, 12],
                    symbolSize: [10, 15],
                },
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    animation: false,
                    label: {
                        backgroundColor: "#505765",
                    },
                },
            },
            color: ["#FFB800", "#5FB878", "#FF5722", "#393D49"],
            series: [{
                    name: "A相电压",
                    data: array1,
                    type: "line",
                },
                {
                    name: "B相电压",
                    data: array2,
                    type: "line",
                },
                {
                    name: "C相电压",
                    data: array3,
                    type: "line",
                },
                {
                    name: "3V0电压",
                    data: array4,
                    type: "line",
                },
            ],
            legend: {
                data: ["A相电压", "B相电压", "C相电压", "3V0电压"],
                right: "100",
            },
            dataZoom: [{
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                },
                {
                    type: "inside",
                    realtime: true,
                    start: 0,
                    end: 100,
                },
            ],
        };
    } else if (id == 11) {
        option = {
            title: {
                text: title + " 三相电阻波形图",
                subtext: "数据所在时间:" + time,
                x: "center",
                align: "right",
            },
            xAxis: {
                name: "毫秒(ms)",
                type: "category",
                data: x,
                axisLine: {
                    symbol: ["none", "arrow"],
                    symbolOffset: [0, 12],
                    symbolSize: [10, 15],
                },
            },
            yAxis: {
                name: "模值(R)",
                type: "value",
                axisLine: {
                    symbol: ["none", "arrow"],
                    symbolOffset: [0, 12],
                    symbolSize: [10, 15],
                },
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    animation: false,
                    label: {
                        backgroundColor: "#505765",
                    },
                },
            },
            color: ["#FFB800", "#5FB878", "#FF5722", "#393D49"],
            series: [{
                    name: "A相电阻",
                    data: array1,
                    type: "line",
                },
                {
                    name: "B相电阻",
                    data: array2,
                    type: "line",
                },
                {
                    name: "C相电阻",
                    data: array3,
                    type: "line",
                },
                {
                    name: "3R0电阻",
                    data: array4,
                    type: "line",
                },
            ],
            legend: {
                data: ["A相电阻", "B相电阻", "C相电阻", "3R0电阻"],
                right: "100",
            },
            dataZoom: [{
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                },
                {
                    type: "inside",
                    realtime: true,
                    start: 0,
                    end: 100,
                },
            ],
        };
    } else {
        option = {
            title: {
                text: title + " 三相电流波形图",
                subtext: "数据所在时间:" + time,
                x: "center",
                align: "right",
            },
            xAxis: {
                name: "毫秒(ms)",
                type: "category",
                data: x,
                axisLine: {
                    symbol: ["none", "arrow"],
                    symbolOffset: [0, 12],
                    symbolSize: [10, 15],
                },
            },
            yAxis: {
                name: "模值(A)",
                type: "value",
                axisLine: {
                    symbol: ["none", "arrow"],
                    symbolOffset: [0, 12],
                    symbolSize: [10, 15],
                },
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    animation: false,
                    label: {
                        backgroundColor: "#505765",
                    },
                },
            },
            color: ["#FFB800", "#5FB878", "#FF5722", "#393D49"],
            series: [{
                    name: "A相电流",
                    data: array1,
                    type: "line",
                },
                {
                    name: "B相电流",
                    data: array2,
                    type: "line",
                },
                {
                    name: "C相电流",
                    data: array3,
                    type: "line",
                },
                {
                    name: "3I0电流",
                    data: array4,
                    type: "line",
                },
            ],
            legend: {
                data: ["A相电流", "B相电流", "C相电流", "3I0电流"],
                right: "100",
            },
            dataZoom: [{
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                },
                {
                    type: "inside",
                    realtime: true,
                    start: 0,
                    end: 100,
                },
            ],
        };
    }

    myChart1.setOption(option);
}

$(function() {
    $(".content").html('<div id="current1" class="current">');
    getDatas(id, time);
    $(".form_datetime")
        .datetimepicker()
        .on("changeDate", function(ev) {
            time = $(".form-control").val();
            if (time != "") {
                setTimeout(function() {
                    myChart1.clear();
                    getDatas(id, time);
                }, 100);
            }
        });

});


// 获取设备名，并显示在表格上
function getNameTitle(id) {
    if (id == 1)
        return "4#风电机组";
    if (id == 2)
        return "5#风电机组";
    if (id == 3)
        return "6#风电机组";
    if (id == 4)
        return "7#风电机组";
    if (id == 5)
        return "8#风电机组";
    if (id == 6)
        return "9#风电机组";
    if (id == 7)
        return "PT";
    if (id == 8)
        return "3923";
    if (id == 9)
        return "3921";
    if (id == 10)
        return "3935";
    if (id == 11)
        return "接地电阻";
}