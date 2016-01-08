//全选

function selectAll(oval) {
	var chs = document.getElementsByName("ch");
	for (var i = 0; i < chs.length; i++) {
		chs[i].checked = oval;
	}
	var cha = document.getElementById("cbxReSel");
	cha.checked = false;
}

// 反选
function reSelect() {
	var chs = document.getElementsByName("ch")
	for (var i = 0; i < chs.length; i++) {
		chs[i].checked = chs[i].checked ? false : true;
	}

	var cha = document.getElementById("chxSelAll");
	cha.checked = false;
}

// function reSelect() {
// var chs = document.getElementsByName("ch");
// for ( var i = 0; i < chs.length; i++) {
// chs[i].checked = chs[i].checked ? false : true;
// }
// var cha = document.getElementById("cbxSelAll");
// cha.checked = false;
// }
function confirmDelete() {
	var ids = new Array();
	if (confirm("确认要删除？")) {
		var chs = document.getElementsByName("ch");
		for (var i = 0; i < chs.length; i++) {
			if (chs[i].checked)
				ids.push(chs[i].value);
		}
		document.getElementById("ids").value = ids;
		// document.deleteUser.submit();
		var xmlHttp;
		try {
			// Firefox, Opera 8.0+, Safari
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			// Internet Explorer
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					alert("您的浏览器不支持AJAX！");
					return false;
				}
			}
		}

		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				alert(xmlHttp.responseText);
				window.location.reload();
			}
		}
		xmlHttp.open("GET", "user.delete.action?ids=" + ids.join(), true);
		xmlHttp.send(null);

	}

}




