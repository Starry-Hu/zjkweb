
$(function() {
	
	$("#login").click(function() {

		var userName = $("#LAY-user-login-username").val();
		var passWord = $("#LAY-user-login-password").val();

		if (userName == "" || passWord == "") {

			$("#tip").html("请输入用户名或密码");
		}
		else{

			$.ajax({

				url:url + "/Login",
				type:"post",
				data:{"Name":userName,"Pwd":passWord},

				success:function(res) {

					if (getArray(res).toString() == "登录成功！") 

						window.location.href='./html/main.html';

					else

						$("#tip").html("用户名或密码错误，请重试！");
				}
			});
		}

		setTimeout(function() {

			$("#tip").html("");
		},1500);

	});
});


