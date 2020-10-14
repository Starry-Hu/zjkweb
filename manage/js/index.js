// 绑定方法
var PersonCode = window.localStorage.getItem("PersonCode");
$(function() {
    if (PersonCode == undefined || PersonCode == "") {
        layui.use(["layer"], function() {
            var layer = layui.layer;
            layer.msg(
                "您还未登录！请先登录！！", {
                    time: 1000,
                },
                function() {
                    window.location.href = "login.html";
                }
            );

        });
    }

    user_manage(PersonCode);
})

// 退出登录的按钮事件
$('#logout').click(function() {
    window.localStorage.setItem("PersonCode", "");
    window.location.href = "login.html";
})

// 对导航栏绑定点击方法
$("#user_manage_tab").click(function() {
    user_manage(PersonCode);
})
$("#refresh_user_manage").click(function() {
    user_manage(PersonCode);
});
// ----
$("#line_type_manage_tab").click(function() {
    line_type_manage(PersonCode);
});
$("#refresh_line_type_manage").click(function() {
    line_type_manage(PersonCode);
});
// ----
$("#line_manage_tab").click(function() {
    line_manage(PersonCode, "", "");
    // 渲染下拉框
    getLineNames(PersonCode);
    getLineTypeNames(PersonCode);
});
$("#refresh_line_manage").click(function() {
    line_manage(PersonCode, "", "");
    // 渲染下拉框
    getLineNames(PersonCode);
    getLineTypeNames(PersonCode);
});

// ------- 线路管理的相应方法 -----------
// 线路管理中查询按钮的事件绑定
$('#search').click(function() {
    var searchCondition1 = $("#searchCondition1").val();
    var searchCondition2 = $("#searchCondition2").val();
    line_manage(PersonCode, searchCondition1, searchCondition2);
});
// 添加线路时输入线路名称后，动态渲染该线路的节点列表
$('#TreeName2').blur(function() {
    var TreeName = $('#TreeName2').val();
    if (TreeName == "") {
        layui.use(["layer"], function() {
            var layer = layui.layer;
            layer.msg(
                "请输入线路名称，以便选择父节点", {
                    time: 1000,
                }
            );
        });
    } else {
        getNodesByTree(PersonCode, TreeName, "", "ParentNodeName2");

    }
});

// 下拉列表的渲染显示（都是线路管理的）
// 线缆类型（电缆/架空线）的获取接口
function getLineTypeNames(PersonCode) {
    $.ajax({
        url: url + "LineTypes.asmx/getLineTypeNames",
        type: "post",
        dataType: "json",
        data: { PersonCode: PersonCode },
        success: function(res) {
            $("#LineType_1").html("");
            $("#LineType_2").html("");

            layui.use("form", function() {
                var form = layui.form;
                for (var i = 0; i < res.length; i++) {
                    $("#LineType_1").append("<option value=" + res[i].LineType + ">" + res[i].LineType + "</option>");
                    $("#LineType_2").append("<option value=" + res[i].LineType + ">" + res[i].LineType + "</option>");
                }
                form.render();
            });
        },
    });
}

// 线路名称（树名）的获取接口
function getLineNames(PersonCode) {
    $.ajax({
        url: url + "Line.asmx/Lines_List",
        type: "post",
        dataType: "json",
        data: { PersonCode: PersonCode },
        success: function(res) {
            layui.use("form", function() {
                $("#searchCondition1").html('<option value="" selected="">全部</option>');

                var form = layui.form;
                for (var i = 0; i < res.length; i++) {
                    $("#searchCondition1").append("<option value=" + res[i].LineName + ">" + res[i].LineName + "</option>");
                }
                form.render();
            });
        },
    });
}

// 获取某线路的全部节点（树中的所有节点）（下拉框渲染）
function getNodesByTree(PersonCode, TreeName, ParentNodeName1, container) {
    $.ajax({
        url: url + "Line.asmx/Nodes_List",
        type: "post",
        dataType: "json",
        data: {
            PersonCode: PersonCode,
            TreeName: TreeName,
        },
        success: function(res) {
            layui.use("form", function() {
                $("#" + container).html('<option value="" selected="">无</option>');

                var form = layui.form;
                for (var i = 0; i < res.length; i++) {
                    $("#" + container).append("<option value=" + res[i].NodeName + ">" + res[i].NodeName + "</option>");
                }

                // 修改时默认选中相应项（添加时忽略，默认选中无）
                if (ParentNodeName1 == "无") $("#" + container).val("");
                else $("#" + container).val(ParentNodeName1);

                form.render();
            });
        },
    });
}

// ------------------------------------------------------------------------

// 提示框函数
function tip(content) {
    layui.use('layer', function() {
        layer.msg(content, {
            time: 0,
            btn: ['知道了'],
            area: 'auto',
            // shade: [0.8, '#393D49'],
            btnAlign: 'c'
        });
    });
}

// 修改和删除的确认框
function editAndDelConfirm(method, fun, arg1, arg2, arg3) {
    layui.use("layer", function() {
        layui.layer.open({
            type: 1,
            title: "警示框",
            content: '<div style="padding: 30px 100px 20px 100px;text-align: center;">' + "您要确认" + method + "吗？" + "</div>",
            btn: ["确认", "取消"],
            btnAlign: "c", //按钮居中
            shade: 0, //不显示遮罩
            yes: function() {
                if (arg1 == undefined && arg2 == undefined) {
                    fun();
                } else if (arg1 != undefined && arg2 == undefined) {
                    fun(arg1);
                } else {
                    fun(arg1, arg2, arg3);
                }
                layer.closeAll();
            },
            btn2: function(index, layero) {
                layer.closeAll();
            },
        });
    });
}


// ----------------------------  用户管理的列表  ------------------------------
function user_manage(PersonCode) {
    // 清空原有数据
    $(".wait_remove_users").remove();
    $.ajax({
        url: url + "user.asmx/User_Management_List",
        type: "post",
        dataType: "json",
        data: {
            PersonCode: PersonCode,
        },
        success: function(res) {
            layui.use("laypage", function() {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "user_laypage",
                    count: res.length,
                    limit: 10,
                    layout: ["count", "prev", "page", "next"],
                    jump: function(obj) {
                        $(".wait_remove_users").remove();
                        for (var i = 0; i < obj.limit; i++) {
                            if (res[obj.limit * (obj.curr - 1) + i]) {
                                $(".user_table tbody").append(
                                    '<tr class="wait_remove_users">' +
                                    "<td>" +
                                    (i + 1) +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i]
                                    .userName +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i]
                                    .realName +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i]
                                    .phoneNumber +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i]
                                    .userRole +
                                    "</td>" +
                                    "<td><button type='button' class='layui-btn layui-btn-sm layui-btn-normal' prop='edit'><i class='layui-icon'></i> 编辑</button>" +
                                    "<td><button type='button' class='layui-btn layui-btn-sm layui-btn-danger' prop='delete'><i class='layui-icon'></i> 删除</button>" +
                                    "</tr>"
                                );
                            }
                        }
                    },
                });
            });
        },
    });
}

// 添加用户按钮的事件绑定
$("#add_user").click(function() {
    layui.use("layer", function() {
        var layer = layui.layer;
        layer.open({
            type: 1,
            title: "添加用户",
            content: $("#add_user_box"),
        });
    });
});

// 用户表格的修改和删除按钮
$(".user_table").on("click", "tbody tr td button", function(e) {
    if ($(this).attr("prop") == "edit") {
        $("#user_UserName1").val($(this).parents("tr").find("td").eq(1).text());
        $("#user_Name1").val($(this).parents("tr").find("td").eq(2).text());
        $("#user_Phone1").val($(this).parents("tr").find("td").eq(3).text());
        var permission = $(this).parents("tr").find("td").eq(4).text();
        if (permission == "仅浏览") $("#user_Permission1").val("1");
        else if (permission == "一般用户") $("#user_Permission1").val("2");
        else $("#user_Permission1").val("3");
        layui.use(["form", "layer"], function() {
            var layer = layui.layer;
            layui.form.render();
            layer.open({
                type: 1,
                title: "编辑用户",
                content: $("#edit_user_box"),
            });
        });
    } else {
        editAndDelConfirm("删除", del_user);
        var UserName = $(this).parents("tr").find("td").eq(1).text();

        function del_user() {
            $.ajax({
                url: url + "user.asmx/User_Management_Delete",
                type: "post",
                dataType: "json",
                data: {
                    PersonCode: PersonCode,
                    UserName: UserName,
                    CityName: " ",
                },
                success: function(res) {
                    tip(res);
                    user_manage(PersonCode);
                },
            });
        }
    }
});

// 添加用户界面的提交按钮点击事件
layui.use("form", function() {
    var form = layui.form;
    form.render();
    form.on("submit(add_user_submit)", function(data) {
        var userName = $("#user_UserName2").val();
        var realName = $("#user_Name2").val();
        var password = $("#user_Password2").val();
        var confirm_password = $("#user_ConfirmPassword2").val();
        var phoneNumber = $("#user_Phone2").val();
        var userRole = $("#user_Permission2").val();

        // 检查两次密码是否相同
        if (password != confirm_password) {
            tip("两次输入密码不一致！");
        }
        $.ajax({
            url: url + "user.asmx/User_Management_Add",
            type: "post",
            dataType: "json",
            data: {
                PersonCode: PersonCode,
                userName: userName,
                realName: realName,
                password: password,
                phoneNumber: phoneNumber,
                cityName: " ",
                userRole: userRole,
            },
            success: function(res) {
                tip(res);
                user_manage(PersonCode);
            },
        });
        return false;
    });
});

// 编辑用户界面的提交按钮点击事件
layui.use("form", function() {
    var form = layui.form;
    form.render();
    form.on("submit(edit_user_submit)", function(data) {
        editAndDelConfirm("编辑", edit_user);

        function edit_user() {
            var userName = $("#user_UserName1").val();
            var realName = $("#user_Name1").val();
            var phoneNumber = $("#user_Phone1").val();
            var userRole = $("#user_Permission1").val();
            $.ajax({
                url: url + "user.asmx/User_Management_Update",
                type: "post",
                dataType: "json",
                data: {
                    PersonCode: PersonCode,
                    userName: userName,
                    realName: realName,
                    phoneNumber: phoneNumber,
                    cityName: " ",
                    userRole: userRole,
                },
                success: function(res) {
                    tip(res);
                    user_manage(PersonCode);
                },
            });
        }
        return false;
    });
});

// ----------------------------  参数管理的列表  ------------------------------
function line_type_manage(PersonCode) {
    // 清空原有数据
    $(".wait_remove_line_types").remove();
    $.ajax({
        url: url + "LineTypes.asmx/LineTypes_List",
        type: "post",
        dataType: "json",
        data: {
            PersonCode: PersonCode,
        },
        success: function(res) {
            layui.use("laypage", function() {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "line_type_laypage",
                    count: res.length,
                    limit: 10,
                    layout: ["count", "prev", "page", "next"],
                    jump: function(obj) {
                        $(".wait_remove_line_types").remove();
                        for (var i = 0; i < obj.limit; i++) {
                            if (res[obj.limit * (obj.curr - 1) + i]) {
                                $(".line_type_table tbody").append(
                                    '<tr class="wait_remove_line_types">' +
                                    "<td>" +
                                    (i + 1) +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i].LineType +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i].rPerKm +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i].xPerKm +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i].wcPerkm +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i].rPerKm0 +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i].xPerKm0 +
                                    "</td>" +
                                    "<td>" +
                                    res[obj.limit * (obj.curr - 1) + i].wcPerkm0 +
                                    "</td>" +
                                    "<td><button type='button' class='layui-btn layui-btn-sm layui-btn-normal' prop='edit'><i class='layui-icon'></i> 编辑</button>" +
                                    "<td><button type='button' class='layui-btn layui-btn-sm layui-btn-danger' prop='delete'><i class='layui-icon'></i> 删除</button>" +
                                    "</tr>"
                                );
                            }
                        }
                    },
                });
            });
        },
    });
}

// 添加参数按钮的事件绑定
$("#add_line_type").click(function() {
    layui.use("layer", function() {
        var layer = layui.layer;
        layer.open({
            type: 1,
            title: "添加参数",
            content: $("#add_line_type_box"),
        });
    });
});

// 参数表格的修改和删除按钮
$(".line_type_table").on("click", "tbody tr td button", function(e) {
    if ($(this).attr("prop") == "edit") {
        $("#LineType1").val($(this).parents("tr").find("td").eq(1).text());
        $("#rPerKm1").val($(this).parents("tr").find("td").eq(2).text());
        $("#xPerKm1").val($(this).parents("tr").find("td").eq(3).text());
        $("#wcPerkm1").val($(this).parents("tr").find("td").eq(4).text());
        $("#rPerKm01").val($(this).parents("tr").find("td").eq(5).text());
        $("#xPerKm01").val($(this).parents("tr").find("td").eq(6).text());
        $("#wcPerkm01").val($(this).parents("tr").find("td").eq(7).text());

        layui.use(["form", "layer"], function() {
            var layer = layui.layer;
            layui.form.render();
            layer.open({
                type: 1,
                title: "编辑参数",
                content: $("#edit_line_type_box"),
            });
        });
    } else {
        editAndDelConfirm("删除", del_line_type);
        var temp1 = $(this).parents("tr").find("td").eq(1).text();

        function del_line_type() {
            $.ajax({
                url: url + "LineTypes.asmx/LineTypes_Delete",
                type: "post",
                dataType: "json",
                data: {
                    PersonCode: PersonCode,
                    LineType: temp1,
                },
                success: function(res) {
                    tip(res);
                    line_type_manage(PersonCode);
                },
            });
        }
    }
});

// 添加参数界面的提交按钮点击事件
layui.use("form", function() {
    var form = layui.form;
    form.render();
    form.on("submit(add_line_type_submit)", function(data) {
        var LineType = $("#LineType2").val();
        var rPerKm = $("#rPerKm2").val();
        var xPerKm = $("#xPerKm2").val();
        var wcPerkm = $("#wcPerkm2").val();
        var rPerKm0 = $("#rPerKm02").val();
        var xPerKm0 = $("#xPerKm02").val();
        var wcPerkm0 = $("#wcPerkm02").val();

        $.ajax({
            url: url + "LineTypes.asmx/LineTypes_Add",
            type: "post",
            dataType: "json",
            data: {
                PersonCode: PersonCode,
                LineType: LineType,
                rPerKm: rPerKm,
                xPerKm: xPerKm,
                wcPerkm: wcPerkm,
                rPerKm0: rPerKm0,
                xPerKm0: xPerKm0,
                wcPerkm0: wcPerkm0,
            },
            success: function(res) {
                tip(res);
                line_type_manage(PersonCode);
            },
        });
        return false;
    });
});

// 编辑参数界面的提交按钮点击事件
layui.use("form", function() {
    var form = layui.form;
    form.render();
    form.on("submit(edit_line_type_submit)", function(data) {
        editAndDelConfirm("编辑", edit_line_type);

        function edit_line_type() {
            var LineType = $("#LineType1").val();
            var rPerKm = $("#rPerKm1").val();
            var xPerKm = $("#xPerKm1").val();
            var wcPerkm = $("#wcPerkm1").val();
            var rPerKm0 = $("#rPerKm01").val();
            var xPerKm0 = $("#xPerKm01").val();
            var wcPerkm0 = $("#wcPerkm01").val();

            $.ajax({
                url: url + "LineTypes.asmx/LineTypes_UpDate",
                type: "post",
                dataType: "json",
                data: {
                    PersonCode: PersonCode,
                    LineType: LineType,
                    rPerKm: rPerKm,
                    xPerKm: xPerKm,
                    wcPerkm: wcPerkm,
                    rPerKm0: rPerKm0,
                    xPerKm0: xPerKm0,
                    wcPerkm0: wcPerkm0,
                },
                success: function(res) {
                    tip(res);
                    line_type_manage(PersonCode);
                },
            });
        }
        return false;
    });
});

// ----------------------------  线路管理的列表  ------------------------------
function line_manage(PersonCode, searchCondition1, searchCondition2) {
    // 清空原有数据
    $(".wait_remove_lines").remove();
    $.ajax({
        url: url + "Line.asmx/Line_Management_List",
        type: "post",
        dataType: "json",
        data: {
            PersonCode: PersonCode,
            TreeName: searchCondition1,
            showInFigure: searchCondition2,
        },
        success: function(res) {
            layui.use("laypage", function() {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "line_laypage",
                    count: res.length,
                    limit: 10,
                    layout: ["count", "prev", "page", "next"],
                    jump: function(obj) {
                        $(".wait_remove_lines").remove();
                        for (var i = 0; i < obj.limit; i++) {
                            const element = res[obj.limit * (obj.curr - 1) + i];
                            if (element) {
                                // 相应的信息处理
                                if (element.ParentNodeName == "") {
                                    element.ParentNodeName = "无";
                                }
                                if (element.ShowInFigure == false) {
                                    element.ShowInFigure = "否";
                                } else {
                                    element.ShowInFigure = "是";
                                }
                                if (element.JNode == false) {
                                    element.JNode = "否";
                                } else {
                                    element.JNode = "是";
                                }

                                $(".line_table tbody").append(
                                    '<tr class="wait_remove_lines">' +
                                    "<td>" +
                                    (i + 1) +
                                    "</td>" +
                                    "<td>" +
                                    element.TreeName +
                                    "</td>" +
                                    "<td>" +
                                    element.NodeName +
                                    "</td>" +
                                    "<td>" +
                                    element.ParentNodeName +
                                    "</td>" +
                                    "<td>" +
                                    keepTwoDecimal(element.Length2ParentNode) +
                                    "</td>" +
                                    "<td>" +
                                    element.ShowInFigure +
                                    "</td>" +
                                    "<td>" +
                                    element.LineType +
                                    "</td>" +
                                    "<td>" +
                                    element.JNode +
                                    "</td>" +
                                    "<td><button type='button' class='layui-btn layui-btn-sm layui-btn-normal' prop='edit'><i class='layui-icon'></i> 编辑</button>" +
                                    "<td><button type='button' class='layui-btn layui-btn-sm layui-btn-danger' prop='delete'><i class='layui-icon'></i> 删除</button>" +
                                    "</tr>"
                                );
                            }
                        }
                    },
                });
            });
        },
    });
}

// 添加线路按钮的事件绑定
$("#add_line").click(function() {
    layui.use("layer", function() {
        var layer = layui.layer;
        layer.open({
            type: 1,
            title: "添加线路",
            content: $("#add_line_box"),
        });
    });
});

// 线路表格的修改和删除按钮
$(".line_table").on("click", "tbody tr td button", function(e) {
    if ($(this).attr("prop") == "edit") {
        $("#TreeName1").val($(this).parents("tr").find("td").eq(1).text());
        $("#NodeName1").val($(this).parents("tr").find("td").eq(2).text());
        var ParentNodeName1 = $(this).parents("tr").find("td").eq(3).text();
        $("#Length2ParentNode1").val($(this).parents("tr").find("td").eq(4).text());
        var ShowInFigure1 = $(this).parents("tr").find("td").eq(5).text();
        $("#LineType_1").val($(this).parents("tr").find("td").eq(6).text());
        var JNode1 = $(this).parents("tr").find("td").eq(7).text();

        // 相应的信息处理
        getNodesByTree(PersonCode, $("#TreeName1").val(), ParentNodeName1, "ParentNodeName1");
        if (ShowInFigure1 == "是") $("#ShowInFigure1").val("true");
        else $("#ShowInFigure1").val("false");


        if (JNode1 == "是") $("#JNode1").val("true");
        else $("#JNode1").val("false");



        layui.use(["form", "layer"], function() {
            var layer = layui.layer;
            layui.form.render();
            layer.open({
                type: 1,
                title: "编辑线路",
                content: $("#edit_line_box"),
            });
        });

        console.log()
    } else {
        editAndDelConfirm("删除", del_line);
        var temp1 = $(this).parents("tr").find("td").eq(1).text();
        var temp2 = $(this).parents("tr").find("td").eq(2).text();

        function del_line() {
            $.ajax({
                url: url + "LineTypes.asmx/LineTypes_Delete",
                type: "post",
                dataType: "json",
                data: {
                    PersonCode: PersonCode,
                    TreeName: temp1,
                    NodeName: temp2
                },
                success: function(res) {
                    tip(res);
                    line_manage(PersonCode);
                },
            });
        }
    }
});

// 添加线路界面的提交按钮点击事件
layui.use("form", function() {
    var form = layui.form;
    form.render();
    form.on("submit(add_line_submit)", function(data) {
        var TreeName = $("#TreeName2").val();
        var NodeName = $("#NodeName2").val();
        var ParentNodeName = $("#ParentNodeName2").val();
        var Length2ParentNode = $("#Length2ParentNode2").val();
        var ShowInFigure = $("#ShowInFigure2").val();
        var LineType = $("#LineType_2").val();
        var JNode = $("#JNode2").val();

        $.ajax({
            url: url + "Line.asmx/Line_Management_Add",
            type: "post",
            dataType: "json",
            data: {
                PersonCode: PersonCode,
                TreeName: TreeName,
                NodeName: NodeName,
                ParentNodeName: ParentNodeName,
                Length2ParentNode: Length2ParentNode,
                ShowInFigure: ShowInFigure,
                LineType: LineType,
                JNode: JNode,
            },
            success: function(res) {
                tip(res);
                line_manage(PersonCode);
            },
        });
        return false;
    });
});

// 编辑线路界面的提交按钮点击事件
layui.use("form", function() {
    var form = layui.form;
    form.render();
    form.on("submit(edit_line_submit)", function(data) {
        editAndDelConfirm("编辑", edit_line);

        function edit_line() {
            var TreeName = $("#TreeName1").val();
            var NodeName = $("#NodeName1").val();
            var ParentNodeName = $("#ParentNodeName1").val();
            var Length2ParentNode = $("#Length2ParentNode1").val();
            var ShowInFigure = $("#ShowInFigure1").val();
            var LineType = $("#LineType_1").val();
            var JNode = $("#JNode1").val();

            $.ajax({
                url: url + "Line.asmx/Line_Management_UpDate",
                type: "post",
                dataType: "json",
                data: {
                    PersonCode: PersonCode,
                    TreeName: TreeName,
                    NodeName: NodeName,
                    ParentNodeName: ParentNodeName,
                    Length2ParentNode: Length2ParentNode,
                    ShowInFigure: ShowInFigure,
                    LineType: LineType,
                    JNode: JNode,
                },
                success: function(res) {
                    tip(res);
                    line_manage(PersonCode);
                },
            });
        }
        return false;
    });
});

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