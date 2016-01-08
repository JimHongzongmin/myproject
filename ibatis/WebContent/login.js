//$(function() {
//	/*
//	 * 输入验证
//	 */
//	inputTip([ {
//		jqid : yw_dlm,
//		text : "登录名为16个以内的中文，字母，或下划线"
//	}, {
//		jqid : yw_mm,
//		text : "密码为16个以内的数字，字母，或下划线"
//	} ]);
//});
function checkSubmit()
{
	if($("#yw_dlm").val()==""){
		openDialogInfo("用户名不能为空!");
		return false ;
	}
	if($("#yw_mm").val()==""){
		openDialogInfo("密码不能为空!");
		return false;
	}else{
		document.forms[0].submit();
	}
}

/**
 * 按回车时默认是登录事件
 */
function loginClick(){
	if(window.event.keyCode == 13){
		checkSubmit();
	}
}