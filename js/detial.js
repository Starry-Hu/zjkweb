
var myDate = new Date();
// var	time = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
var pageUrl = window.location.search;
var id = pageUrl.split("&")[0].split("=")[1];
var category = pageUrl.split("&")[1].split("=")[1];
var time = pageUrl.split("&")[2].split("=")[1].replace("%20"," ");

function getDatas(id,category,time) {
	$.ajax({
		url:url + "/getDataByDevice_" + category + "_3",
		type:"post",
		data:{"DeviceID":id,"datatime":time},
		success:function(res) {
			var max;
			var min;
			var temp1 = [];
			var temp2 = [];
			var data = [];
			var x = [];
			if (category == "FZ") {
				for (var i = 0; i < 4; i++) {
					data.push(getArray(res)[i].split(","));
					temp1.push(Math.max.apply(null, data[i]));
					temp2.push(Math.min.apply(null, data[i]));
				}

				max	= Math.max.apply(null, temp1);
				min = Math.min.apply(null, temp2);

				for (var i = 0; i < data[0].length; i++) {
					x.push((1.6*i).toFixed(1));
				}
				createChart1('current1',data[0],data[1],data[2],data[3],max,min,x,time);

				temp1 = [];
				temp2 = [];
				for (var i = 4; i <= 5; i++) {
					data.push(getArray(res)[i].split(","));
					temp1.push(Math.max.apply(null, data[i]));
					temp2.push(Math.min.apply(null, data[i]));
				}
				max = 0;
				min = 0;
				max	= Math.max.apply(null, temp1);
				min = Math.min.apply(null, temp2);
				x = [];
				for (var i = 0; i < data[4].length; i++) {
					x.push((1.6*i).toFixed(1));
				}
				createChart2('current2',data[4],data[5],max,min,x,time);
			}

			else if (category == "XB") {

				for (var i = 0; i < 4; i++) {
					data.push(getArray(res)[i].split(","));
					temp1.push(Math.max.apply(null, data[i]));
					temp2.push(Math.min.apply(null, data[i]));
				}

				max	= Math.max.apply(null, temp1);
				min = Math.min.apply(null, temp2);

				for (var i = 0; i < data[0].length; i++) {
					x.push((1.6*i).toFixed(1));
				}
				createChart3('current3',data[0],data[1],data[2],data[3],max,min,x,time);
			}
		}
	})
}

function createChart1(div,array1,array2,array3,array4,maxdata,mindata,x) {
        window.myChart1 = echarts.init(document.getElementById(div));
        option = {
        	title : {
		        text: '分支箱三相电流波形图',
		        subtext: '数据所在时间:' + time,
		        x: 'center',
		        align: 'right'
		    },
		    xAxis: {
		    	name: '毫秒(ms)',
		        type: 'category',
		        data: x,
		        axisLine:{symbol:['none','arrow'],symbolOffset:[0,12],symbolSize: [10, 15]}
		    },
		    yAxis: {
		    	name: '模值(A)',
		        type: 'value',
		        axisLine:{symbol:['none','arrow'],symbolOffset:[0,12],symbolSize: [10, 15]}
		    },
		    tooltip : {
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
		    	name:'A相电流',
		        data:  array1,
		        type: 'line'
		    },
		    {
		    	name:'B相电流',
		        data:  array2,
		        type: 'line'
		    },
		    {
		    	name:'C相电流',
		        data:  array3,
		        type: 'line'
		    },
		    {
		    	name:'3I0电流',
		        data:  array4,
		        type: 'line'
		    }],
		    legend: {
		        data:['A相电流','B相电流','C相电流','3I0电流'],
		       right:'100'
		    },
		    dataZoom: [
	        {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start: 0,
	            end: 100
	        }]
		};
        myChart1.setOption(option);
}

function createChart2(div,array1,array2,maxdata,mindata,x) {
        window.myChart2 = echarts.init(document.getElementById(div));
        option = {
        	title : {
		        text: '分支箱漏电流波形图',
		        subtext: '数据所在时间:' + time,
		        x: 'center',
		        align: 'right'
		    },
		    xAxis: {
		    	name: '毫秒(ms)',
		        type: 'category',
		        data: x,
		        axisLine:{symbol:['none','arrow'],symbolOffset:[0,12],symbolSize: [10, 15]}
		    },
		    yAxis: {
		    	name: '模值(mA)',
		        type: 'value',
		        axisLine:{symbol:['none','arrow'],symbolOffset:[0,12],symbolSize: [10, 15]}
		    },
		    tooltip : {
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
		    	name:'漏A电流',
		        data:  array1,
		        type: 'line',
		        itemStyle:{  normal:{color:'rgb(200,210,99)'}   }  
		    },
		    {
		    	name:'漏B电流',
		        data:  array2,
		        type: 'line',
		         itemStyle:{  normal:{color:'#079255'}} 
		    }],
		    legend: {
		        data:['漏A电流','漏B电流'],
		       right:'100'
		    },
		    dataZoom: [
	        {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start: 0,
	            end: 100
	        }
	    ]
		};
        myChart2.setOption(option);
}
function createChart3(div,array1,array2,array3,array4,maxdata,mindata,x) {
        window.myChart3 = echarts.init(document.getElementById(div));
        option = {
        	title : {
		        text: '箱变三相电压波形图',
		        subtext: '数据所在时间:' + time,
		        x: 'center',
		        align: 'right'
		    },
		    xAxis: {
		    	name: '毫秒(ms)',
		        type: 'category',
		        data: x,
		        axisLine:{symbol:['none','arrow'],symbolOffset:[0,12],symbolSize: [10, 15]}
		    },
		    yAxis: {
		    	name: '模值(V)',
		        type: 'value',
		        axisLine:{symbol:['none','arrow'],symbolOffset:[0,12],symbolSize: [10, 15]}
		    },
		    tooltip : {
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
		    	name:'A相电压',
		        data:  array1,
		        type: 'line'
		    },
		    {
		    	name:'B相电压',
		        data:  array2,
		        type: 'line'
		    },
		    {
		    	name:'C相电压',
		        data:  array3,
		        type: 'line'
		    },
		    {
		    	name:'3U0电压',
		        data:  array4,
		        type: 'line'
		    }],
		    legend: {
		        data:['A相电压','B相电压','C相电压','3U0电压'],
		       right:'100'
		    },
		    dataZoom: [
	        {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start: 0,
	            end: 100
	        }]
		};
        myChart3.setOption(option);
}
$(function() {
	if (category == "FZ") {
		$(".content").html("<div id=\"current1\" class=\"current\"></div><div id=\"current2\" class=\"current\"></div>");
		getDatas(id,category,time);
		$('.form_datetime').datetimepicker().on('changeDate', function(ev){
		     time = $(".form-control").val();
		     if (time != "") {
		     	 setTimeout(function() {
					myChart1.clear()
					myChart2.clear()
			     	getDatas(id,category,time);
			     },100)
		     }
		});
	}
	else if(category == "XB"){
		$(".content").html("<div id=\"current3\" class=\"current\">");
		getDatas(id,category,time);
		$('.form_datetime').datetimepicker().on('changeDate', function(ev){
		     time = $(".form-control").val();
		     if (time != "") {
		     	 setTimeout(function() {
					myChart3.clear()
			     	getDatas(id,category,time);
			     },100)
		     }
		});
	}
})