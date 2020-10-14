var pageUrl = window.location.search;
var id = pageUrl.split("&")[0].split("=")[1];
var time = pageUrl.split("&")[1].split("=")[1].replace("%20", " ");
var title = getNameTitle(id) + "风电机组拓扑图";
$('title').html(title);

// var myDate = new Date();
// window.time = dateFormat("YYYY-mm-dd HH:MM", myDate);
// window.time = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();

if (time.indexOf(".") == -1) {
    var temp = time.split(":");
    time = temp[0] + ":" + temp[1] + ":00";
}

var myChart = echarts.init(document.getElementById("content"));

// 相关的样式颜色
var redColor = {
    color: "#ff6347", // 节点填充的颜色
    lineStyle: {
        color: "#ff6347",
    },
    borderColor: "#ff6347",
};
var greenColor = {
    color: "green", // 节点填充的颜色
    lineStyle: {
        color: "green",
    },
    borderColor: "green",
};

var data = [];

$(function() {
    getDatas(id, time);
    $(".form_datetime")
        .datetimepicker()
        .on("changeDate", function(ev) {
            time = $(".form-control").val();
            if (time != "") {
                setTimeout(function() {
                    myChart.clear();
                    getDatas(id, time);
                }, 10);
            }
        });
});

// 获取数据(json格式)， 并处理成层级的形式
function getDatas(id, time) {

    myChart.showLoading({
        text: "加载中……",
        color: "#01AAED",
        textColor: "#000",
        maskColor: "rgba(255, 255, 255, 0.8)",
        zlevel: 0,

        textStyle: { fontSize: 20 },
    });

    $.ajax({
        url: url + "/getTreeByName",
        type: "post",
        data: {
            treeName: "T" + id,
            datatime: time,
        },
        success: function(res) {
            data[0] = createNode(res, true);
            // 画树
            drawTree(data);
        },
        error: function(data) {
            alert("数据访问异常,请联系管理员！");
        },
    });
}

// 生成节点的方法（递归将孩子节点填充到数组中）同时将数据处理成层级的形式
function createNode(res, top) {
    var element = {};
    element["TreeName"] = res.node.TreeName;
    element["name"] = res.node.NodeName;
    element["value"] = keepTwoDecimal(res.node.Length2ParentNode);
    element["LineType"] = res.node.LineType;
    element["ExceptionStr"] = res.node.ExceptionStr;
    element["dataTime"] = res.node.dataTime
        .replace(/\+/, " ")
        .replace("08:00", "");
    element["JNode"] = res.node.JNode;
    element["ShowInFigure"] = res.node.ShowInFigure;
    element["label"] = {};
    element["children"] = [];

    // 调整节点颜色
    if (res.node.color == "red") {
        element.itemStyle = redColor;
    } else if (res.node.color == "green") {
        element.itemStyle = greenColor;
    }
    // 调整节点大小
    if (res.node.JNode == 0) {
        element.symbolSize = [8, 8];
    }
    // 调整节点名称
    var index = res.node.NodeName.indexOf("_");
    if (index != -1) {
        element["name"] = res.node.NodeName.substring(0, index);
    }
    // 调整节点的标签位置
    if (!top) {
        element.label.position = "bottom";
        element.label.distance = 10;
        top = true;
    } else {
        top = false;
    }
    // 调整出错信息（保留两位小数）
    if (res.node.ExceptionStr != null) {
        // 保留前缀
        element["ExceptionStr"] = res.node.ExceptionStr.substr(0, 2);
        var index = res.node.ExceptionStr.indexOf("m");
        var temp = res.node.ExceptionStr.substring(2, index);
        // 数值四舍五入，同时加上后缀
        element["ExceptionStr"] += keepTwoDecimal(temp) + res.node.ExceptionStr.substring(index);
    }

    // 设置孩子节点数组
    for (let i = 0; i < res.SubTrees.length; i++) {
        const child = res.SubTrees[i];
        element["children"][i] = createNode(child, top);
    }
    return element;
}

// 画树
function drawTree(data) {
    // 对样式预处理
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
    //     // element.label = { color: element.color }; （文字颜色）
    //     //根据返回数据的状态设置不同的颜色
    //     changeColor(element);
    //     if (element.children != null && element.children.length != 0) {
    //         //如果有子节点，调用递归循环
    //         child(element.children);
    //     }
    // }
    myChart.hideLoading();

    // data.children[0].label = { color: "red", fontSize: "20" }; //这个很重要，调试了好久才出来的，这个就是Echarts单个节点的样式改造了

    myChart.setOption({
        title: {
            text: title,
            subtext: "数据所在时间:" + time,
            x: "center",
            align: "right",
        },
        tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
            formatter: function(element) {
                var s1 = "杆塔编号：" + element.name + "<br />距离上游杆塔：" + element.value + "m";
                if (element.data.ExceptionStr != null) {
                    s1 += "<br /> 故障位置：" + element.data.ExceptionStr;
                }
                return s1;
            },
        },
        series: [{
            type: "tree",
            data: data,
            symbol: "circle",
            symbolSize: [12, 12],
            // borderColor: "black",

            // 每个节点所对应的标签文字的样式
            label: {
                normal: {
                    position: "top",
                    distance: 10,
                    verticalAlign: "middle",
                    align: "center",
                },
            },
            // 设置节点的相关样式
            itemStyle: {
                normal: {
                    color: "#5B9BD5", // 节点填充的颜色
                    lineStyle: {
                        color: "#5B9BD5",
                    },
                    borderColor: "#5B9BD5",
                },
            },
            // 叶子节点的特殊配置
            leaves: {
                label: {
                    position: "right",
                    verticalAlign: "middle",
                    align: "left",
                },
            },
            expandAndCollapse: false, // 改成false防止点击收缩
            initialTreeDepth: 3, //展示层级数,默认是2
        }, ],
    });
    // 4. 树绑定事件
    myChart.on("click", function(params) {
        // console.log(params)
        var name = params.data.name; //点击的节点的name
        var value = params.data.value; //点击的节点的value
        //调用点击事件
        clickNode(name, value);
    });

    myChart.dispatchAction({
        //触发图表行为(我这里是点进去默认显示根节点的数据)
        type: "showTip",
        seriesIndex: 0, //第几条series
        dataIndex: 0, //第几个tooltip
    });
}

//节点的点击事件
function clickNode(name, value) {
    // alert(name + "--的值：" + value);
}

function child(param) {
    //递归循环节点
    $.each(param, function(i, obj) {
        changeColor(obj); //根据状态设置不同的颜色
        if (obj.children != null && obj.children.length != 0) {
            child(obj.children); //递归循环
        }
    });
}

// 获取设备名，并显示在表格上
function getNameTitle(id) {
    if (id == 1)
        return "4#";
    if (id == 2)
        return "5#";
    if (id == 3)
        return "6#";
    if (id == 4)
        return "7#";
    if (id == 5)
        return "8#";
    if (id == 6)
        return "9#";
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

// 四舍五入保留2位小数（若第二位小数为0，则保留一位小数）
function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        console.log('参数非数值，无法四舍五入保留两位小数！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}