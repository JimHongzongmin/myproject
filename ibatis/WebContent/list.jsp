<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	
    int listsize=0;    
    int pageshow=0;   //一页显示多少条数据 
    int pagesize=0;   //一共有多少页     
        if(session.getAttribute("listSize2")!=null)    
    {       
         listsize=Integer.parseInt((String)session.getAttribute("listSize2"));
         pageshow=10;
         pagesize=listsize/pageshow+1;
    }  
 %> 
 
<script language="javascript" src="listAll.js"></script>
<script language="javascript" src="js/page.js"></script>
<script language="javascript" src="js/jquery.js"></script>
<script language="javascript">
</script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<center>
<font color="red">学生信息列表</font>
<input type="hidden" id="ids" name="ids" />
	<table border="1">
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
<!-- 		<tr> -->
<%-- 				<td align="right" colspan="6"><input  type="button" id="${user.id}" value="删除" onclick="confirmDelete()" /> </td> --%>
<!-- 		</tr> -->
		
	</table>
<div id="controls">
<div id="tablelocation">
            	<div id="perpage" >
<!-- 					<select onchange="alert(this.value)"> -->
<!-- 					     	<option value="5">5</option> -->
<!-- 							<option value="10" selected="selected">10</option> -->
<!-- 							<option value="20">20</option> -->
<!-- 							<option value="50">50</option> -->
<!-- 							<option value="100">100</option> -->
<!-- 					</select> -->
<!-- 					<span>每页数量</span> -->
<!-- 				</div> -->
		       </div>
					<div id="text">当前页面 <s:property value="page.currentPage"/> 共 <span id="pagelimit">页</span></div>
               </div>
		
		<div id="navigation">
			<img src="js/themes/images/first.gif" width="16" height="16" alt="First Page" onclick="firstPage()" />
			<img src="js/themes/images/previous.gif" width="16" height="16" alt="First Page" onclick="prePage()" />
			<img src="js/themes/images/next.gif" width="16" height="16" alt="First Page" onclick="nextPage()" />
			<img src="js/themes/images/last.gif" width="16" height="16" alt="Last Page" onclick="lastPage()" />
		</div>
 
      <tr>
	        [返回记录共有<font color="red"><%=listsize%></font>条]&nbsp;&nbsp;&nbsp;
	        
			<span > 
					<input type="button" onclick="window.open('poiDoc.exportToExcel.action')" value="批量导出Excel"/> </a> 
			</span>
	                <td align="center"><span><a href="index.jsp" >返回主界面</a></span></td>
     </tr>
 

	

</center>
</body>
<script type="text/javascript">
indexPage='${page.currentPage}';
</script>
</html>