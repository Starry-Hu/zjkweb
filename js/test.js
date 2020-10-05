var pageUrl = window.location.search;
var id = pageUrl.split("&")[0].split("=")[1];
var time = pageUrl.split("&")[1].split("=")[1].replace("%20", " ");
var title = id + "#风机组拓扑图";
// var myDate = new Date();
// window.time = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();

if (time.indexOf(".") == -1) {
    time = time.split(":")[0] + ":00:00";
}

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

// 准备树的数据
var treeDate = {
    node: {
        TreeName: "T1",
        NodeName: "N1",
        Length2ParentNode: 0,
        ShowInFigure: false,
        LineType: null,
        JNode: false,
        dataTime: "/Date(-62135596800000+0800)/",
        ExceptionStr: null,
        color: "green",
    },
    SubTrees: [{
            node: {
                TreeName: "T1",
                NodeName: "N2",
                Length2ParentNode: 500,
                ShowInFigure: false,
                LineType: null,
                JNode: false,
                dataTime: "/Date(-62135596800000+0800)/",
                ExceptionStr: "出错了！！",
                color: "red",
            },
            SubTrees: [{
                node: {
                    TreeName: "T1",
                    NodeName: "N3",
                    Length2ParentNode: 300,
                    ShowInFigure: false,
                    LineType: null,
                    JNode: false,
                    dataTime: "/Date(-62135596800000+0800)/",
                    ExceptionStr: "出错了！！",
                    color: "red",
                },
                SubTrees: [{
                    node: {
                        TreeName: "T1",
                        NodeName: "N4",
                        Length2ParentNode: 600,
                        ShowInFigure: false,
                        LineType: null,
                        JNode: false,
                        dataTime: "/Date(-62135596800000+0800)/",
                        ExceptionStr: null,
                    },
                    SubTrees: [],
                }, ],
            }, ],
        },
        {
            node: {
                TreeName: "T1",
                NodeName: "N5",
                Length2ParentNode: 500,
                ShowInFigure: false,
                LineType: null,
                JNode: false,
                dataTime: "/Date(-62135596800000+0800)/",
                ExceptionStr: "出错了！！",
                color: "red",
            },
            SubTrees: [{
                node: {
                    TreeName: "T1",
                    NodeName: "N6",
                    Length2ParentNode: 300,
                    ShowInFigure: false,
                    LineType: null,
                    JNode: false,
                    dataTime: "/Date(-62135596800000+0800)/",
                    ExceptionStr: null,
                },
                SubTrees: [{
                        node: {
                            TreeName: "T1",
                            NodeName: "N7",
                            Length2ParentNode: 600,
                            ShowInFigure: false,
                            LineType: null,
                            JNode: false,
                            dataTime: "/Date(-62135596800000+0800)/",
                            ExceptionStr: null,
                        },
                        SubTrees: [],
                    },
                    {
                        node: {
                            TreeName: "T1",
                            NodeName: "N8",
                            Length2ParentNode: 400,
                            ShowInFigure: false,
                            LineType: null,
                            JNode: false,
                            dataTime: "/Date(-62135596800000+0800)/",
                            ExceptionStr: "1231231231231",
                            color: "red",
                        },
                        SubTrees: [],
                    },
                ],
            }, ],
            node: {
                TreeName: "T1",
                NodeName: "N6",
                Length2ParentNode: 300,
                ShowInFigure: false,
                LineType: null,
                JNode: false,
                dataTime: "/Date(-62135596800000+0800)/",
                ExceptionStr: null,
            },
            SubTrees: [{
                    node: {
                        TreeName: "T1",
                        NodeName: "N7",
                        Length2ParentNode: 600,
                        ShowInFigure: false,
                        LineType: null,
                        JNode: false,
                        dataTime: "/Date(-62135596800000+0800)/",
                        ExceptionStr: null,
                    },
                    SubTrees: [],
                },
                {
                    node: {
                        TreeName: "T1",
                        NodeName: "N8",
                        Length2ParentNode: 400,
                        ShowInFigure: false,
                        LineType: null,
                        JNode: false,
                        dataTime: "/Date(-62135596800000+0800)/",
                        ExceptionStr: "1231231231231",
                        color: "red",
                    },
                    SubTrees: [{
                        node: {
                            TreeName: "T1",
                            NodeName: "N5",
                            Length2ParentNode: 500,
                            ShowInFigure: false,
                            LineType: null,
                            JNode: false,
                            dataTime: "/Date(-62135596800000+0800)/",
                            ExceptionStr: "出错了！！",
                            color: "red",
                        },
                        SubTrees: [{
                            node: {
                                TreeName: "T1",
                                NodeName: "N6",
                                Length2ParentNode: 300,
                                ShowInFigure: false,
                                LineType: null,
                                JNode: false,
                                dataTime: "/Date(-62135596800000+0800)/",
                                ExceptionStr: null,
                            },
                            SubTrees: [{
                                    node: {
                                        TreeName: "T1",
                                        NodeName: "N7",
                                        Length2ParentNode: 600,
                                        ShowInFigure: false,
                                        LineType: null,
                                        JNode: false,
                                        dataTime: "/Date(-62135596800000+0800)/",
                                        ExceptionStr: null,
                                    },
                                    SubTrees: [],
                                },
                                {
                                    node: {
                                        TreeName: "T1",
                                        NodeName: "N8",
                                        Length2ParentNode: 400,
                                        ShowInFigure: false,
                                        LineType: null,
                                        JNode: false,
                                        dataTime: "/Date(-62135596800000+0800)/",
                                        ExceptionStr: "1231231231231",
                                        color: "red",
                                    },
                                    SubTrees: [],
                                },
                            ],
                        }, ],
                        node: {
                            TreeName: "T1",
                            NodeName: "N6",
                            Length2ParentNode: 300,
                            ShowInFigure: false,
                            LineType: null,
                            JNode: false,
                            dataTime: "/Date(-62135596800000+0800)/",
                            ExceptionStr: null,
                        },
                        SubTrees: [{
                                node: {
                                    TreeName: "T1",
                                    NodeName: "N7",
                                    Length2ParentNode: 600,
                                    ShowInFigure: false,
                                    LineType: null,
                                    JNode: false,
                                    dataTime: "/Date(-62135596800000+0800)/",
                                    ExceptionStr: null,
                                },
                                SubTrees: [],
                            },
                            {
                                node: {
                                    TreeName: "T1",
                                    NodeName: "N8",
                                    Length2ParentNode: 400,
                                    ShowInFigure: false,
                                    LineType: null,
                                    JNode: false,
                                    dataTime: "/Date(-62135596800000+0800)/",
                                    ExceptionStr: "1231231231231",
                                    color: "red",
                                },
                                SubTrees: [{
                                    node: {
                                        TreeName: "T1",
                                        NodeName: "N5",
                                        Length2ParentNode: 500,
                                        ShowInFigure: false,
                                        LineType: null,
                                        JNode: false,
                                        dataTime: "/Date(-62135596800000+0800)/",
                                        ExceptionStr: "出错了！！",
                                        color: "red",
                                    },
                                    SubTrees: [{
                                        node: {
                                            TreeName: "T1",
                                            NodeName: "N6",
                                            Length2ParentNode: 300,
                                            ShowInFigure: false,
                                            LineType: null,
                                            JNode: false,
                                            dataTime: "/Date(-62135596800000+0800)/",
                                            ExceptionStr: null,
                                        },
                                        SubTrees: [{
                                                node: {
                                                    TreeName: "T1",
                                                    NodeName: "N7",
                                                    Length2ParentNode: 600,
                                                    ShowInFigure: false,
                                                    LineType: null,
                                                    JNode: false,
                                                    dataTime: "/Date(-62135596800000+0800)/",
                                                    ExceptionStr: null,
                                                },
                                                SubTrees: [],
                                            },
                                            {
                                                node: {
                                                    TreeName: "T1",
                                                    NodeName: "N8",
                                                    Length2ParentNode: 400,
                                                    ShowInFigure: false,
                                                    LineType: null,
                                                    JNode: false,
                                                    dataTime: "/Date(-62135596800000+0800)/",
                                                    ExceptionStr: "1231231231231",
                                                    color: "red",
                                                },
                                                SubTrees: [],
                                            },
                                        ],
                                    }, ],
                                    node: {
                                        TreeName: "T1",
                                        NodeName: "N6",
                                        Length2ParentNode: 300,
                                        ShowInFigure: false,
                                        LineType: null,
                                        JNode: false,
                                        dataTime: "/Date(-62135596800000+0800)/",
                                        ExceptionStr: null,
                                    },
                                    SubTrees: [{
                                            node: {
                                                TreeName: "T1",
                                                NodeName: "N7",
                                                Length2ParentNode: 600,
                                                ShowInFigure: false,
                                                LineType: null,
                                                JNode: false,
                                                dataTime: "/Date(-62135596800000+0800)/",
                                                ExceptionStr: null,
                                            },
                                            SubTrees: [],
                                        },
                                        {
                                            node: {
                                                TreeName: "T1",
                                                NodeName: "N8",
                                                Length2ParentNode: 400,
                                                ShowInFigure: false,
                                                LineType: null,
                                                JNode: false,
                                                dataTime: "/Date(-62135596800000+0800)/",
                                                ExceptionStr: "1231231231231",
                                                color: "red",
                                            },
                                            SubTrees: [{
                                                node: {
                                                    TreeName: "T1",
                                                    NodeName: "N5",
                                                    Length2ParentNode: 500,
                                                    ShowInFigure: false,
                                                    LineType: null,
                                                    JNode: false,
                                                    dataTime: "/Date(-62135596800000+0800)/",
                                                    ExceptionStr: "出错了！！",
                                                    color: "red",
                                                },
                                                SubTrees: [{
                                                    node: {
                                                        TreeName: "T1",
                                                        NodeName: "N6",
                                                        Length2ParentNode: 300,
                                                        ShowInFigure: false,
                                                        LineType: null,
                                                        JNode: false,
                                                        dataTime: "/Date(-62135596800000+0800)/",
                                                        ExceptionStr: null,
                                                    },
                                                    SubTrees: [{
                                                            node: {
                                                                TreeName: "T1",
                                                                NodeName: "N7",
                                                                Length2ParentNode: 600,
                                                                ShowInFigure: false,

                                                                LineType: null,
                                                                JNode: false,
                                                                dataTime: "/Date(-62135596800000+0800)/",
                                                                ExceptionStr: null,
                                                            },
                                                            SubTrees: [],
                                                        },
                                                        {
                                                            node: {
                                                                TreeName: "T1",
                                                                NodeName: "N8",
                                                                Length2ParentNode: 400,
                                                                ShowInFigure: false,
                                                                LineType: null,
                                                                JNode: false,
                                                                dataTime: "/Date(-62135596800000+0800)/",
                                                                ExceptionStr: "1231231231231",
                                                                color: "red",
                                                            },
                                                            SubTrees: [],
                                                        },
                                                    ],
                                                }, ],
                                                node: {
                                                    TreeName: "T1",
                                                    NodeName: "N6",
                                                    Length2ParentNode: 300,
                                                    ShowInFigure: false,
                                                    LineType: null,
                                                    JNode: false,
                                                    dataTime: "/Date(-62135596800000+0800)/",
                                                    ExceptionStr: null,
                                                },
                                                SubTrees: [{
                                                        node: {
                                                            TreeName: "T1",
                                                            NodeName: "N7",
                                                            Length2ParentNode: 600,
                                                            ShowInFigure: false,
                                                            LineType: null,
                                                            JNode: false,
                                                            dataTime: "/Date(-62135596800000+0800)/",
                                                            ExceptionStr: null,
                                                        },
                                                        SubTrees: [],
                                                    },
                                                    {
                                                        node: {
                                                            TreeName: "T1",
                                                            NodeName: "N8",
                                                            Length2ParentNode: 400,
                                                            ShowInFigure: false,
                                                            LineType: null,
                                                            JNode: false,
                                                            dataTime: "/Date(-62135596800000+0800)/",
                                                            ExceptionStr: "1231231231231",
                                                            color: "red",
                                                        },
                                                        SubTrees: [],
                                                    },
                                                ],
                                            }, ],
                                        },
                                    ],
                                }, ],
                            },
                        ],
                    }, ],
                },
            ],
        },
    ],
};

var data = [];

$(function() {
    getDatas(id, time);
    $(".form_datetime").datetimepicker().on("changeDate", function(ev) {
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
    // $.ajax({
    //     url: url + "/getTreeByName",
    //     type: "post",
    //     data: {
    //         treeName: "T" + id,
    //         datatime: time,
    //     },
    //     success: function(res) {
    //         data[0] = createNode(res);
    // // 画树
    data[0] = createNode(treeDate);
    drawTree(data);
    //     },
    //     error: function(data) {
    //         alert("数据访问异常,请联系管理员！");
    //     },
    // });
};

// 生成节点的方法（递归将孩子节点填充到数组中）同时将数据处理成层级的形式
function createNode(res) {
    var element = {};
    element["TreeName"] = res.node.TreeName;
    element["name"] = res.node.NodeName;
    element["value"] = res.node.Length2ParentNode;
    element["LineType"] = res.node.LineType;
    element["ExceptionStr"] = res.node.ExceptionStr;
    element["dataTime"] = res.node.dataTime.replace(/\+/, " ").replace("08:00", "");
    element["JNode"] = res.node.JNode;
    element["ShowInFigure"] = res.node.ShowInFigure;
    element["label"] = {};
    element["children"] = [];

    // 调整节点样式
    if (res.node.color == "red") {
        element.itemStyle = redColor;
    } else if (res.node.color == "green") {
        element.itemStyle = greenColor;
    }

    // 设置孩子节点数组
    for (let i = 0; i < res.SubTrees.length; i++) {
        const child = res.SubTrees[i];
        element["children"][i] = createNode(child);
    }
    return element;
}

// 画树
function drawTree(data) {
    var myChart = echarts.init(document.getElementById("content"));
    myChart.showLoading();
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
            text: title + " 三相电压波形图",
            subtext: "数据所在时间:" + time,
            x: "center",
            align: "right",
        },
        tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
            formatter: function(element) {
                var s1 =
                    "节点：" + element.name + "<br />距离父节点：" + element.value;
                if (element.data.ExceptionStr != null) {
                    s1 += "<br /> 错误信息：" + element.data.ExceptionStr;
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
                    distance: 5,
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