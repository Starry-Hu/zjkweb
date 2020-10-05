//关于接口的代码在这个文件中，url为配置地址
var url = "http://47.92.26.201:8083/";

function getArray(res) {
    var array = res.getElementsByTagName("string")[0].childNodes[0].nodeValue.split(";");
    return array;
}

var PersonCode = $.cookie("PersonCode");