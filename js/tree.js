var pageUrl = window.location.search;
var id = pageUrl.split("&")[0].split("=")[1];
var time = pageUrl.split("&")[1].split("=")[1].replace("%20", " ");
var title = id + "#风机组拓扑图";
var myDate = new Date();

// 准备树的数据
// var data = [
//     { name: "广东", value: "01", parent: "-", color: "blue", status: "1" },
//     { name: "广州", value: "0101", parent: "01", color: "red", status: "2" },
//     { name: "潮州", value: "0102", parent: "01", color: "red", status: "2" },
//     { name: "深圳", value: "0103", parent: "01", color: "red", status: "3" },
//     { name: "茂名", value: "0104", parent: "01", color: "red", status: "1" },
//     { name: "揭阳", value: "0105", parent: "01", color: "red", status: "1" },
//     { name: "萝岗", value: "010101", parent: "0101", color: "green", status: "2" },
//     { name: "天河", value: "010102", parent: "0101", color: "green", status: "2" },
//     { name: "黄埔", value: "010103", parent: "0101", color: "green", status: "1" },
//     { name: "白云", value: "010104", parent: "0101", color: "green", status: "1" },
//     { name: "花都", value: "010105", parent: "0101", color: "green", status: "1" },
//     { name: "海珠", value: "010106", parent: "0101", color: "green", status: "1" },
//     { name: "枫溪", value: "010201", parent: "0102", color: "green", status: "1" },
//     { name: "枫桥", value: "010202", parent: "0102", color: "blue", status: "1" },
//     { name: "罗湖", value: "010301", parent: "0103", color: "blue", status: "1" },
// ];


var data = [];

window.onload = function() {
    // 获取数据(json格式)，并处理成层级的形式
    $.ajax({
        url: url + "/getTreeByName",
        type: "get",
        data: {
            "treeName": "T" + id,
            "datatime": time
        },
        success: function(res) {
            console.log(res)
            data[0] = createNode(res);
        },
    });

    // 画树
    drawTree(data);
}

// 生成节点的方法（递归将孩子节点填充到数组中）同时将数据处理成层级的形式
function createNode(res) {
    var element = {};
    element["TreeName"] = res.node.TreeName;
    element["NodeName"] = res.node.NodeName;
    element["Length2ParentNode"] = res.node.Length2ParentNode;
    element["LineType"] = res.node.LineType;
    element["ExceptionStr"] = res.node.ExceptionStr;
    element["dataTime"] = res.node.dataTime;
    element["JNode"] = res.node.JNode;
    element["ShowInFigure"] = res.node.ShowInFigure;
    element["children"] = [];

    for (let i = 0; i < res.SubTrees.length; i++) {
        const child = res.SubTrees[i];
        element["children"][i] = createNode(child);
    }
    return element;
};

// // 2. 数据处理成层级关系的数据、
// 调用方法： treeData = transData(data, "node.NodeName", "parent", "children");
// function transData(a, idStr, pidStr, childrenStr) {
//     var r = [],
//         hash = {},
//         id = idStr,
//         pid = pidStr,
//         children = childrenStr,
//         len = a.length;
//     for (var i = 0; i < len; i++) {
//         hash[a[i][id]] = a[i];
//     }
//     for (var j = 0; j < len; j++) {
//         var aVal = a[j],
//             hashVP = hash[aVal[pid]];
//         if (hashVP) {
//             !hashVP[children] && (hashVP[children] = []);
//             hashVP[children].push(aVal);
//         } else {
//             r.push(aVal);
//         }
//     }
//     return r;
// }


// 3. 画树
function drawTree(data) {
    var myChart = echarts.init(document.getElementById("content"));
    myChart.showLoading();
    myChart.hideLoading();
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
    console.log(data)
        // data[2].label = { color: "red", fontSize: "20" }; //这个很重要，调试了好久才出来的，这个就是Echarts单个节点的样式改造了


    myChart.setOption({
        // backgroundColor: "#06182F",
        title: {
            text: "3号风机组",
            textStyle: {
                fontSize: 20,
                color: "#2AA0E5",
            },
        },
        tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
        },
        series: [{
            type: "tree",
            name: "TREE_ECHARTS",
            data: data,
            top: "2%",
            left: "10%",
            bottom: "2%",
            right: "15%",
            symbol: "fullRect",
            symbolSize: [24, 80],
            borderColor: "black",

            // 每个节点所对应的标签文字的样式
            label: {
                normal: {
                    position: "left",
                    verticalAlign: "middle",
                    align: "right",
                    fontSize: 16,
                    // color: "#cccccc",
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
            expandAndCollapse: true, // 改成false防止点击收缩
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


function child(param) { //递归循环节点
    $.each(param, function(i, obj) {
        changeColor(obj); //根据状态设置不同的颜色
        if (obj.children != null && obj.children.length != 0) {
            child(obj.children); //递归循环
        }
    })

};

function changeColor(obj) { //设置节点颜色

    // var dangerColor = {
    //     color: "#ff6347", // 节点填充的颜色
    //     lineStyle: {
    //         color: "#ff6347",
    //     },
    //     borderColor: "#ff6347",
    // };
    // var warningColor = {
    //     color: "#ffd700", // 节点填充的颜色
    //     lineStyle: {
    //         color: "#ffd700",
    //     },
    //     borderColor: "#ffd700",
    // };

    if (obj.color == "red") {
        obj.itemStyle = {
            color: "#ff6347", // 节点填充的颜色
            lineStyle: {
                color: "#ff6347",
            },
            borderColor: "#ff6347",
        };
    }
    if (obj.status == 3) {
        obj.itemStyle = {
            color: "#ffd700", // 节点填充的颜色
            lineStyle: {
                color: "#ffd700",
            },
            borderColor: "#ffd700",
        };
    }
};