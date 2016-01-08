<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<style type="text/css">
body {
			margin: 0px auto;
			padding: 0px;
			width: 100%;
			text-align: center;
/* 			background-image: url('images/body.jpg'); */
			background-repeat: no-repeat;
			background-color: transparent;
			background-position: center;
			overflow: hidden;
		}		.pagebg{
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
			line-height: 35px;
			font-family: "微软雅黑", "宋体";
			font-size: 18px;
			color: #444444;
			
		}
		.login-button{
			position: absolute;
			border: none;
			width: 80px;
			height: 30px;
			line-height: 2px;
			background-image : url('images/quicklink-button-hover.png');
			background-repeat: no-repeat;
			font-family: "微软雅黑", "宋体";
			font-size: 16px;
			color: #FFFFFF;
			cursor: pointer;
		}
/* 		.download-link{ */
/* 			position: absolute; */
/* 			left: 303px; */
/* 			top: 270px; */
/* 			text-decoration: underline; */
/* 			font-family: "微软雅黑", "宋体"; */
/* 			font-size: 14px; */
/* 			color: #2804F4; */
/* 			cursor: pointer; */
/* 		} */
	</style>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/page.css" />
<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
	<script type="text/javascript" src="js/EF.js"></script>
	<script type="text/javascript" src="js/comm.js"></script>
	<script type="text/javascript" src="js/jquery.qtip.min.js"></script>
	<script type="text/javascript" src="js/moaModal.js"></script>
<script type="text/javascript" src="add.js"></script>
<title>Insert title here</title>
</head>
<body id="body">
  <!-- 学号 -->
	 <div align="center" style="height:35px; margin-top: 30px;">
		 <span class="normal-label-bold" style="left: 558px;">学号：</span>
		<input id="s_number"  style="left: 665px; top: 50px; width: 150px;" maxlength="16"
		 name="student.number"/>
	</div>
	 <!-- 姓名 -->
	 <div align="center" style="height:35px;">
		 <span class="normal-label-bold" style="left: 558px;">姓名：</span>
		 <input id="s_name"  style="left: 665px; top: 50px; width: 150px;" maxlength="16"
		 name="student.name"/>
	 </div>
	 <!-- 年龄 -->
	 <div align="center" style="height:35px;">
		 <span class="normal-label-bold" style="left: 558px;">年龄：</span>
		 <input id="s_age"  style="left: 665px; top: 50px; width: 150px;" maxlength="16"
		 name="student.age"/>
	 </div>
	 <!-- 性别 -->
	 <div align="center" style="height:35px;">
		 <span class="normal-label-bold" style="left: 558px;">性别：</span>
		<select  id="s_sex"  style="left: 665px; top: 50px; width: 150px;"
		 name="student.sex" >
			  <option value ="男" selected="selected">男</option>
			  <option value ="女">女</option>
     </select>
    </div>
    <!-- 院系-->
	 <div align="center" style="height:35px;">
		 <span class="normal-label-bold" style="left: 558px;">院系：</span>
		 <input id="s_dept"  style="left: 665px; top: 50px; width: 150px;" maxlength="16"
		 name="student.dept"/>
    </div>
     <!-- 学校-->
	 <div align="center" style="height:35px;">
		 <span class="normal-label-bold" style="left: 558px;">学校：</span>
		 <input id="s_school"  style="left: 665px; top: 50px; width: 150px;" maxlength="16"
		 name="student.school"/>
    </div>
    <!-- 专业-->
	 <div align="center" style="height:35px;">
		 <span class="normal-label-bold" style="left: 558px;">专业：</span>
		 <input id="s_profession"  style="left: 665px; top: 50px; width: 150px;" maxlength="16"
		 name="student.profession"/>
    </div>
<div  align="center" style="height:60px;">
<button class="login-button" style="left: 685px; top: 270px;" onclick="insertStudent()">增加</button>
</div>
<!-- 确认对话框 -->
	<div id="dialogConfirm" style="display: none"><p>确定删除这些设备信息吗？</p></div>
	<!-- 提示信息 -->
	<%@ include file="dialogInfo.jsp" %>
</body>
</html>