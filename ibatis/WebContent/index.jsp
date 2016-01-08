<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
<title>Insert title here</title>
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
			line-height: 2px;
			background-image : url('images/quicklink-button-hover.png');
			background-repeat: no-repeat;
			font-family: "微软雅黑", "宋体";
			font-size: 16px;
			color: #FFFFFF;
			cursor: pointer;
		}
		tr{
background:expression_r((this.parentNode.rowIndex)%2==0?"#3DB7CC":"#B3F4FF");
}
z	</style>
</head>
<body id="body">
<script type="text/javascript">
function add(){
	location.href = "add.jsp";   
	alert(0);
function queryById(){
		$("#body").load("student.list.action?student.number="+$("#s_id").val()+
				      "&student.age="+$("#s_age").val());
}
}
</script>
<div align="center" style="left: 585px; height: 80px;top: 150px; width: 100%; margin-top: 40px;"" >
<span class="ans" style="left:535px; top: 50px; width: 150px;" >学号</span>
<input id="s_id" class="login-input" style="left: 665px; top: 50px; width: 150px;" maxlength="16"/>
<span class="ans" style="top: 30px; width:150px; left:660px;" >年龄</span>
<input id="s_age"  class="login-input" style="left: 650px; top: 10px; width: 150px;" maxlength="16"/>
<button class="login-button" style="left: 615px; top: 95px;" onclick="queryById()">查询</button>
<button class="login-button" style="left: 765px; top: 95px;" onclick="add()">增加</button>
</div>

<div style="width: 100%; height: 600px;left: 450px;text-align: center;padding-top: 20px; margin-top: 1px;" ><p>
<font color="red">学生信息列表</font><p>

<input type="hidden" id="ids" name="ids" />
	<table border="1" align="center" border="0" cellpadding="1" cellspacing="0">
		<tr>
			  <td >  		                            
			     <input type="checkbox" id="cbxSelAll" onclick="selectAll(this.checked);" />全选 &nbsp;&nbsp; 
	 			 <input type="checkbox" id="cbxReSel" onclick="reSelect();" />反选   
			   </td> 
		       <td width="130" align="center">学号</td>
			   <td width="130" align="center">姓名</td>
			   <td width="130" align="center">年龄</td>
			   <td width="130" align="center">性别</td>
			   <td width="130" align="center">班级</td>
			   <td width="130" align="center">学校</td>
			   <td width="130" align="center">专业</td>
		</tr>
		 <tbody>
		<c:forEach var="student" items="${list}">
<%-- 		<s:iterator value="#list" var="student"> --%>
		<tr>
		        <td>                   
                    <input type="checkbox" name="ch" value="${student.number}"/>                                       
                 </td>  
                <td align="center">${student.number}</td>
				<td align="center">${student.name}</td>
				<td align="center">${student.age}</td>
				<td align="center">${student.sex}</td>
				<td align="center">${student.dept}</td>
				<td align="center">${student.school}</td>
				<td align="center">${student.profession}</td>
		</tr>
<%-- 		</s:iterator> --%>
		</c:forEach>
		</tbody>
	</table>
 </div>
</body>
</html>