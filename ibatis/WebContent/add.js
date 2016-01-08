$(function(){
	inputTip([{
		jqid : s_number,
		text : "学号为16位的数字"
	},  {
		jqid : s_name,
	    text : "姓名为16位以内的数字"
	},  {
		jqid : s_age,
	    text : "年龄为3位以内的数字"
	}, 
	   {
		jqid : s_sex,
	    text : "请选择性别"
	},{
		jqid : s_dept,
	    text : "院系为16个以内的数字"
	},  {
		jqid : s_school,
	    text : "学校为16位以内的数字"
	}, {
		jqid : s_profession,
	    text : "专业为16位以内的数字"
	}
	])
})
function insertStudent(){
	//验证学号
	if(!/^[0-9]{1,12}$/.test($("#s_number").val()) || $("#s_number").val()==""){
		openDialogInfo("学号为12位以内的整数!");
	return false;
	}
	//验证姓名
	if($("#s_name").val()==""){
		openDialogInfo("请填写姓名!");
		alert($("#s_name").val());
		return false;
	}
	//验证年龄
	if(!/^\d{1,3}$/.test($("#s_age").val()) || $("#s_age").val()=="" ){
		openDialogInfo("年龄为3以内的整数!");
	return false;
	}
	//验证院系
	if($("#s_dept").val()==""){
		openDialogInfo("院系不能为空!");
		return false;
	}
	//验证学校
	if($("#s_school").val()==""){
		openDialogInfo("学校不能为空!");
		return false;
	}
	//验证专业
	if($("#s_profession").val()==""){
		openDialogInfo("专业不能为空!");
		return false;
	}
	
	$.post("student.validatorId.action",{"student.number":$("#s_number").val()},function(data){
		
	     if(!data.flag){
	   $("#body").load("student.insert.action?student.number="+$("#s_number").val()+
			            "&student.age="+$("#s_age").val().trim()+
					      "&student.name="+$("#s_name").val().trim()+
					      "&student.sex="+$("#s_sex").val().trim()+
					      "&student.dept="+$("#s_dept").val().trim()+
					      "&student.school="+$("#s_school").val().trim()+
					      "&student.profession="+$("#s_profession").val().trim());
	   openDialogInfo("增加数据成功!");
	     }
	     else{
	    	 openDialogInfo("该账户已存在!");
	     }
	   }, "json");
}

