<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="css/page.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery.qtip.min.css" />
	<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
	<script type="text/javascript" src="js/EF.js"></script>
	<script type="text/javascript" src="js/comm.js"></script>
	<script type="text/javascript" src="js/jquery.qtip.min.js"></script>
	<script type="text/javascript" src="js/moaModal.js"></script>
	<script type="text/javascript" src="login.js"></script>
	<title>学生管理系统</title>
	<style type="text/css">
		body {
			margin: 0px auto;
			padding: 0px;
			width: 100%;
			text-align: center;
			background-image: url('images/body.jpg');
			background-repeat: no-repeat;
			background-color: transparent;
			background-position: center;
			overflow: hidden;
		}
		.pagebg{
			width: 100%;
			height: 100%;
			border-collapse: collapse;
		}
		.loginbg{
			position: relative;
			display: inline-block;
			width: 708px;
			height: 493px;
			background-image: url('images/login_cz.png');
			background-repeat: no-repeat;
		}
		.loginbg>table{
			position: absolute;
			left: 200px;
			top: 300px;
		}
		.ans{
			display: inline-block;
			width: 100px;
			height: 25px;
			line-height: 25px;
			text-align: right;
			font-size: 18px;
			font-family: "微软雅黑", "宋体";
			color: #222222;
		}
		.login-input{
			width: 200px;
			height: 25px;
			line-height: 25px;
			font-family: "微软雅黑", "宋体";
			font-size: 18px;
			color: #444444;
			
		}
		.login-button{
			position: absolute;
			border: none;
			width: 80px;
			height: 30px;
			line-height: 25px;
			background-image : url('images/quicklink-button-hover.png');
			background-repeat: no-repeat;
			font-family: "微软雅黑", "宋体";
			font-size: 16px;
			color: #FFFFFF;
			cursor: pointer;
		}
		.download-link{
			position: absolute;
			left: 303px;
			top: 270px;
			text-decoration: underline;
			font-family: "微软雅黑", "宋体";
			font-size: 14px;
			color: #2804F4;
			cursor: pointer;
		}
	</style>
</head>
	<body onkeydown="loginClick();">
			<table class="pagebg" cellspacing="0">
				<tr>
					<td align="center" valign="middle">
						<div class="loginbg">
		<form action="user.login.action" method="post">
							<table>
								<tr>
									<td><span class="ans">用户名：</span></td>
									<td><input id="yw_dlm"  class="login-input" name="user.yhm" maxlength="20"/></td>
									</tr>
								<tr>
									<td><span class="ans">密码：</span></td>
									<td><input id="yw_mm" type="password" name="user.mm" class="login-input" maxlength="8"/></td>
								</tr>
							</table>
		</form>
							<button class="login-button" style="left: 300px; top: 80px" onclick="checkSubmit()">登录</button>
							<button class="login-button" style="left: 400px; top: 80px" >重置</button>
						</div>
					</td>
				</tr>
			</table>
			<!-- 确认对话框 -->
	<div id="dialogConfirm" style="display: none"><p>确定删除这些设备信息吗？</p></div>
	<!-- 提示信息 -->
	<%@ include file="dialogInfo.jsp" %>
	</body>
</html>
