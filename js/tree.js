var dangerColor = {
    color: "#ff6347", // 节点填充的颜色
    lineStyle: {
        color: "#ff6347",
    },
    borderColor: "#ff6347",
};
var warningColor = {
    color: "#ffd700", // 节点填充的颜色
    lineStyle: {
        color: "#ffd700",
    },
    borderColor: "#ffd700",
};


// 1. 准备树的数据
var data = [
    { name: "广东", value: "01", parent: "-", color: "blue", status: "1" },
    { name: "广州", value: "0101", parent: "01", color: "red", status: "2" },
    { name: "潮州", value: "0102", parent: "01", color: "red", status: "2" },
    { name: "深圳", value: "0103", parent: "01", color: "red", status: "3" },
    { name: "茂名", value: "0104", parent: "01", color: "red", status: "1" },
    { name: "揭阳", value: "0105", parent: "01", color: "red", status: "1" },
    { name: "萝岗", value: "010101", parent: "0101", color: "green", status: "2" },
    { name: "天河", value: "010102", parent: "0101", color: "green", status: "2" },
    { name: "黄埔", value: "010103", parent: "0101", color: "green", status: "1" },
    { name: "白云", value: "010104", parent: "0101", color: "green", status: "1" },
    { name: "花都", value: "010105", parent: "0101", color: "green", status: "1" },
    { name: "海珠", value: "010106", parent: "0101", color: "green", status: "1" },
    { name: "枫溪", value: "010201", parent: "0102", color: "green", status: "1" },
    { name: "枫桥", value: "010202", parent: "0102", color: "blue", status: "1" },
    { name: "罗湖", value: "010301", parent: "0103", color: "blue", status: "1" },
];


var treeData;
window.onload = function() {
    //2.处理数据
    treeData = transData(data, "value", "parent", "children");

    //3.展示数据
    drawTree(treeData);
};

// 2. 数据处理成层级关系的数据
function transData(a, idStr, pidStr, childrenStr) {
    var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = childrenStr,
        i = 0,
        j = 0,
        len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        var aVal = a[j],
            hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}

// 3. 画树
function drawTree(treeData) {
    var myChart = echarts.init(document.getElementById("container")); //div元素节点的对象

    myChart.showLoading();
    var app = {};
    myChart.hideLoading();
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        element.label = { color: element.color };
        changeColor(element); //根据返回数据的状态设置不同的颜色
        if (element.children != null && element.children.length != 0) {
            //如果有子节点，调用递归循环
            child(element.children);
        }
    }
    // data[2].label = { color: "red", fontSize: "20" }; //这个很重要，调试了好久才出来的，这个就是Echarts单个节点的样式改造了

    console.log(data)
    console.log(treeData)

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
            data: treeData,
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
        console.log(params)
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
    if (obj.status == 2) {
        obj.itemStyle = warningColor;
    }
    if (obj.status == 3) {
        obj.itemStyle = dangerColor;
    }
};