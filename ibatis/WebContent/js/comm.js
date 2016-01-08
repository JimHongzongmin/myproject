/*
文件名: comm.js
功  能: 主要进行数据校验、还有一些通用的JS方法
作  者：邓林
*/
//利用Javascript中每个对象(Object)的prototype属性我们可以为Javascript中的内置对象添加我们自己的方法和属性。
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}
/**
* 重写javascript的replaceAll方法
*/
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

String.prototype.parseXML = function () {
    var xmlobject;
    try {
        if (window.ActiveXObject) { // for ie
            xmlobject = new ActiveXObject("Microsoft.XMLDOM");
            xmlobject.async = "false";
            xmlobject.loadXML(this);
        } else {
            var parser = new DOMParser();
            xmlobject = parser.parseFromString(this, "text/xml");
        }
    } catch (e) {
        alert("parse xml error");
        return null;
    }
    return xmlobject;
};

/**
* 日期字符串转为Date对象
*/
String.prototype.parseDate = function () {
    var str1 = this.split(" ");
    var str2 = str1[0].split("-");
    var year = str2[0];
    var month = str2[1];
    var day = str2[2];
    if (day === undefined) {
        day = "01";
    }

    var hour = 0;
    var minute = 0;
    var second = 0;
    if (str1[1]) {
        var str3 = str1[1].split(":");
        var hour = str3[0];
        var minute = str3[1];
        if (minute === undefined) {
            minute = "00";
        }
        var second = str3[2];
        if (second === undefined) {
            second = "00";
        }
    }
    return new Date(Date.parse(month + "-" + day + "-" + year + " " + hour + ":" + minute + ":" + second));
}

/**
* 判断数组中对象是否存在
*/
Array.prototype.isExist = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}
/**
* 删除数组中某个index的元素
*/
Array.prototype.remove = function (dx) {
    if (!isNaN(dx) && dx < this.length) {
        this.splice(dx, 1);
    }
}

/**
* 查找指定元素的索引
*/
Array.prototype.indexOfValue = function (value) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            index = i;
            break;
        }
    }
    return index;
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 // 月份
        "d+": this.getDate(),                    // 日
        "h+": this.getHours(),                   // 小时
        "m+": this.getMinutes(),                 // 分
        "s+": this.getSeconds(),                 // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// -------------------------------
// 函数名：notNull(i_field,i_value)
// 功能介绍：检查输入是否为非空
// 参数说明：数据项，输入的对应值
// 返回值 ：非空--true,0--false
// -------------------------------
function notNull(i_field, obj) {
    var i_value = obj.value;
    if (i_value == "" || i_value == null) {
        alert("'" + i_field + "' 不可为空！");
        obj.focus();
        return false;
    }
    return true;
}

// -------------------------------
// 函数名：isNotNull(value)
// 功能介绍：检查输入值是否为非空
// 参数说明：数据项，输入的对应值
// 返回值 ：非空--true,空--false
// -------------------------------
function isNotNull(value) {
    if (value == "" || value == null) {
        return false;
    }
    return true;
}


// -------------------------------
// 函数名：Clear(obj)
// 功能介绍：清空页面内容
// 参数说明：对象
//  
// -------------------------------
function Clear(obj) {
    obj.value = "";
}
// -------------------------------
// 函数名：shieldKeyword()
// 功能介绍：屏蔽掉关键的按键
// 参数说明：事件对象
//  
// -------------------------------
function shieldKeyword() {
    if (event.keyCode == 122 || event.keyCode == 117) {
        // 屏蔽F11和F6
        window.event.keyCode = 0;
        window.event.returnValue = false;
    }
}

// -------------------------------
// 函数名：validateIdCard(obj)
// 功能介绍：身份证号验证
// 参数说明：身份证号的控件名称
// 合法返回 true 否则 false
// -------------------------------
function validateIdCard(objValue) {
    var birthday = "";
    var zjhm1 = "";
    var zjhm2 = "";
    var s = "";
    objValue = objValue.trim();
    objValue = objValue.toUpperCase();
    var zjhm = objValue;
    if (!(zjhm.length == 15 || zjhm.length == 18)) {
        alert("身份证长度不对,请检查！");
        return false;
    }
    zjhm1 = zjhm;
    if (zjhm.length == 18) {
        zjhm1 = zjhm.substr(0, 17);
        zjhm2 = zjhm.substr(17, 1);
    }
    re = new RegExp("[^0-9]");
    if (s = zjhm1.match(re)) {
        alert("身份证输入的值中含有非法字符'" + s + "'请检查！");
        return false;
    }
    // 取出生日期
    if (zjhm.length == 15) {
        birthday = "19" + zjhm.substr(6, 6);
    }
    else {
        re = new RegExp("[^0-9A-Z]");
        if (s = zjhm2.match(re)) { // 18位身份证对末位要求数字或字符
            alert("输入的值中含有非法字符'" + s + "'请检查！");
            return false;
        }
        birthday = zjhm.substr(6, 8);
    }

    birthday = birthday.substr(0, 4) + "-" + birthday.substr(4, 2) + "-" + birthday.substr(6, 2);

    if (isDateBirthday("身份证号码出生日期", birthday) == 0) { // 检查日期的合法性
        return false;
    }
    if (zjhm.length == 18) {
        return (sfzCheck(zjhm)); // 对18位长的身份证进行末位校验
    }
    return true;
}
// -------------------------------
// 函数名：isDateBirthday(i_field,thedate)
// 功能介绍：校验字符串是否为日期格式
// 参数说明：数据项，输入的字符串
// 返回值 ：1-是日期，false-不是
// -------------------------------

function isDateBirthday(i_field, thedate) {
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    var r = thedate.match(reg);
    if (r == null) {
        alert("'" + i_field + "' 含非法字符！");
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[4]);
    var newStr = d.getFullYear() + r[2] + (d.getMonth() + 1) + r[2] + d.getDate();
    var newDate = r[1] + r[2] + (r[3] - 0) + r[2] + (r[4] - 0);
    if (newStr == newDate) {
        return true;
    }
    alert("" + i_field + "不对！");
    return false;
}

function isDateModel(thedate) {
    if (thedate != null) {
        thedate = thedate.trim();
        if (thedate.length == 0) {
            return true;
        }
        if (thedate.length != 7 && thedate.length != 10 && thedate.length != 13 && thedate.length != 19) {
            return false;
        }
    } else {
        return false;
    }
    var reg;
    if (thedate.length == 7) {
        reg = /^\d{4}-\d{2}$/;
    } else if (thedate.length == 10) {
        reg = /^\d{4}-\d{2}-\d{2}$/;
    } else if (thedate.length == 13) {
        reg = /^\d{4}-\d{2}-\d{2}\s{1}\d{2}$/;
    } else if (thedate.length == 19) {
        reg = /^\d{4}-\d{2}-\d{2}\s{1}\d{2}:\d{2}:\d{2}$/;
    }
    var r = thedate.match(reg);
    if (r == null) {// 格式不对直接返回
        return false;
    }
    var d = thedate.parseDate(); // 转成Date
    var validDate = "";
    if (thedate.length == 7) {
        validDate = d.Format("yyyy-MM"); // 转成字符串
    } else if (thedate.length == 10) {
        validDate = d.Format("yyyy-MM-dd"); // 转成字符串
    } else if (thedate.length == 13) {
        validDate = d.Format("yyyy-MM-dd hh"); // 转成字符串
    } else if (thedate.length == 19) {
        validDate = d.Format("yyyy-MM-dd hh:mm:ss"); // 转成字符串
    }
    if (thedate != validDate) {// 2次转换后若与原先的字符串不一致，则说明日期不合法
        return false;
    }
    return true;


    // var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    // var r = thedate.match(reg);
    // if (r==null) {
    // return false;
    // }
    // var d= new Date(r[1],r[3]-1,r[4]);
    // var newStr=d.getFullYear()+r[2]+(d.getMonth()+1)+r[2]+d.getDate();
    // var newDate=r[1]+r[2]+(r[3]-0)+r[2]+(r[4]-0);
    // if (newStr==newDate) {
    // return true;
    // }
    // return false;
}

// -------------------------------
// 函数名：sfzCheck(hm)
// 功能介绍：对18位长的身份证进行末位校验
// 参数说明：身份证号码
// 返回值 ：true符合,false不符合
// -------------------------------
function sfzCheck(hm) {
    var w = new Array();
    var ll_sum;
    var ll_i;
    var ls_check;
    w[0] = 7;
    w[1] = 9;
    w[2] = 10;
    w[3] = 5;
    w[4] = 8;
    w[5] = 4;
    w[6] = 2;
    w[7] = 1;
    w[8] = 6;
    w[9] = 3;
    w[10] = 7;
    w[11] = 9;
    w[12] = 10;
    w[13] = 5;
    w[14] = 8;
    w[15] = 4;
    w[16] = 2;
    ll_sum = 0;
    for (ll_i = 0; ll_i <= 16; ll_i++) {
        ll_sum = ll_sum + (hm.substr(ll_i, 1) - 0) * w[ll_i];

    }
    ll_sum = ll_sum % 11;
    switch (ll_sum) {
        case 0:
            ls_check = "1";
            break;
        case 1:
            ls_check = "0";
            break;
        case 2:
            ls_check = "X";
            break;
        case 3:
            ls_check = "9";
            break;
        case 4:
            ls_check = "8";
            break;
        case 5:
            ls_check = "7";
            break;
        case 6:
            ls_check = "6";
            break;
        case 7:
            ls_check = "5";
            break;
        case 8:
            ls_check = "4";
            break;
        case 9:
            ls_check = "3";
            break;
        case 10:
            ls_check = "2";
            break;
    }
    if (hm.substr(17, 1) != ls_check) {
        alert("身份证校验错误！------ 末位应该:" + ls_check + " 实际:" + hm.substr(17, 1));
        return false;
    }
    return true;
}

// 15位转18位身份证号码
function id15to18(zjhm) {
    var strJiaoYan = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var intQuan = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var ll_sum = 0;
    var i;
    zjhm = zjhm.substring(0, 6) + "19" + zjhm.substring(6);
    for (i = 0; i <= 16; i++) {
        ll_sum = ll_sum + (parseFloat(zjhm.substr(i, 1))) * intQuan[i];
    }
    ll_sum = ll_sum % 11;
    zjhm = zjhm + strJiaoYan[ll_sum];
    return zjhm;
}

// -------------------------------
// 函数名：isNum(i_field,value)
// 功能介绍：检查输入字符串是否为数字
// 参数说明：数据项，输入的对应值
// 返回值 ：true-是,false-非
// -------------------------------
function isNum(i_field, value) {
    var value = obj.value;
    var i_value = value.trim();
    re = new RegExp("[^0-9.]");
    var s;
    if (s = i_value.match(re)) {
        alert("'" + i_field + "' 中含有非法字符 '" + s + "' ！");
        obj.focus();
        return false;
    }
    return true;
}

function isNumberCheck(value) {
    var i_value = value.trim();
    re = new RegExp("[^0-9]");
    var s;
    if (s = i_value.match(re)) {
        return false;
    }
    return true;
}

// -------------------------------
// 函数名：validateEmail(email)
// 功能介绍：检查输入字符串是否是正确的电子邮件格式。
// 参数说明：数据项，输入的对应值
// 返回值 ：true-是,false-非
// -------------------------------
function validateEmail(email) {
    invalid = "";
    if (email.trim() == "") {
        invalid = "请输入您的Email地址。";
    } else {
        if ((email.indexOf("@") == -1) || (email.indexOf(".") == -1))
            invalid += "\n\nEmail地址不合法。应当包含'@'和'.'；例如('.com')。请检查后再递交。";

        if (email.indexOf("your email here") > -1)
            invalid += "\n\nEmail地址不合法，请检测您的Email地址，在域名内应当包含'@'和'.'；例如('.com')。";

        if (email.indexOf("\\") > -1)
            invalid += "\n\nEmail地址不合法，含有非法字符(\\)。";

        if (email.indexOf("/") > -1)
            invalid += "\n\nEmail地址不合法，含有非法字符(/)。";

        if (email.indexOf("'") > -1)
            invalid += "\n\nEmail地址不合法，含有非法字符(')。";

        if (email.indexOf("!") > -1)
            invalid += "\n\nEmail地址不合法，含有非法字符(!)。";

        if ((email.indexOf(",") > -1) || (email.indexOf(";") > -1))
            invalid += "\n\n只输入一个Email地址，不要含有分号和逗号。";

        if (email.indexOf("?subject") > -1)
            invalid += "\n\n不要加入'?subject=...'。";
    }
    if (invalid == "") {
        return true;
    } else {
        alert("输入的Email可能包含错误：" + invalid);
        return false;
    }
}

// -------------------------------
// 函数名：checkIp
// 功能介绍：检验输入的IP格式是否正确。
// 参数说明：输入的对应值
// 返回值 ：true-是,false-非
// -------------------------------
function checkIp(value) {
    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = value.match(exp);
    if (reg == null) {
        return false;
    }
    return true;
}

// 数组中的重复元素
function isRepeat(arr) {
    return /(\x0f[^\x0f]+\x0f)[\s\S]*\1/.test("\x0f" + arr.join("\x0f\x0f") + "\x0f");
}

// 验证数字,字母,下划线
function check(val) {
    var reg = /^([a-zA-Z]|\d|_)*$/;
    if (!reg.test(val)) {
        return false;
    }
    return true;
}

// 验证输入框不能输入特殊字符串
function specialStr(val) {
    // var pattern = new
    // RegExp("[`~!\"@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？%+\\-\\\\《》－＝·｜]|\\s");
    var pattern = new RegExp("[`~!\"@#$^&*()=|{}':;'\\[\\]<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？%+\\-\\\\《》－＝·｜]|\\s");
    if (pattern.exec(val)) {
        return false;
    }
    return true;
}

// 数字和浮点型数字的校验
function isfloat(oNum) {
    if (!oNum) return false;
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum)) return false;
    try {
        if (parseFloat(oNum) != oNum) return false;
    } catch (ex) {
        return false;
    }
    return true;
}

function isJwd(jwd) {
    var reg = /^((\d|[1-9]\d|1[0-7]\d)(\.\d{1,6})$)/;
    var r = jwd.match(reg);
    if (r == null) {
        return false;
    }
    return true;
}

// 检查密码安全性
function checkPassword() {
    var password = document.getElementById("password1").value;
    var code = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    var regCh = /[^\x00-\xff]/;
    var lblpassword = document.getElementById("lblpassword");
    lblpassword.innerHTML = "";
    if (regCh.test(password)) {
        jQuery("#pwdView").show();
        lblpassword.innerHTML = "密码不能包含中文!";
        return false;
    }
    var lblpassword = document.getElementById("lblpassword");
    if (password.length <= 10) {
        jQuery("#pwdView").show();
        lblpassword.innerHTML = "密码必须大于10位!";
        return false;
    }
    var isContianNumberChar = false; // 是否包含数字
    var isContianChar = false; // 是否包含大小写字母
    var isContianOtherChar = false; // 是否包含特殊字符

    for (var index = 0; index < password.length; index++) {

        if (code.substring(0, 20).indexOf(password.substring(index, index + 1)) > -1) {
            isContianNumberChar = true;
            break;
        }
    }

    for (var index = 0; index < password.length; index++) {
        if (code.substring(20, code.length).indexOf(password.substring(index, index + 1)) > -1) {
            isContianChar = true;
            break;
        }
    }

    for (var index = 0; index < password.length; index++) {
        if (code.indexOf(password.substring(index, index + 1)) < 0) {
            isContianOtherChar = true;
            break;
        }
    }
    if (!isContianNumberChar) {
        jQuery("#pwdView").show();
        lblpassword.innerHTML = "密码必须包含数字!";
        return false;
    }
    if (!isContianChar) {
        jQuery("#pwdView").show();
        lblpassword.innerHTML = "密码必须包含字母!";
        return false;
    }

    if (!isContianOtherChar) {
        jQuery("#pwdView").show();
        lblpassword.innerHTML = "密码必须包含特殊字符!";
        return false;
    }
    jQuery("#pwdView").hide();
    return true;
}

/**
* 字符串替换
* 
* @param index
*            替换字符串的位置
* @param res
*            原字符串
* @param str
*            更换的字符
* @return 返回按键的KEYCODE
*/
function replaceIndex(index, res, str) {
    return res.substring(0, index) + str + res.substring(index + 1);
}

/**
* 获得按键的键值(兼容IE和Firefox)
* 
* @param evt
*            按键事件 空格(32),小数点(46),-(45),退格(8),Delete(46),Tab键(9),方向键(37-40)
* @return 返回按键的KEYCODE
*/
function realKeyCode(evt) {
    var key = evt.keyCode ? evt.keyCode : (evt.which ? evt.which : evt.charCode);
    return key;
}
/**
* 限制键盘只能输入整数，即0-9(keycode: 48-57) 注册到onkeypress
*/
function limitInt() {
    var acEvent = window.event ? window.event : arguments.callee.caller.arguments[0];
    var key = realKeyCode(acEvent);
    if (key < 48 || key > 57) {
        invalKey(acEvent);
    }
}
/**
* 限制键盘只能输入数字，即0-9(keycode: 48-57)和.
*/
function limitNum() {
    var acEvent = window.event ? window.event : arguments.callee.caller.arguments[0];
    var key = realKeyCode(acEvent);
    if ((key < 48 || key > 57) && key != 46) {
        invalKey(acEvent);
    }
}
/**
* 限制键盘只能输入数字，字母a-z(97-122) A-Z(65-90)
*/
function limitChar() {
    var acEvent = window.event ? window.event : arguments.callee.caller.arguments[0];
    var key = realKeyCode(acEvent);
    if ((key < 48 || key > 57) && (key < 65 || key > 90) && (key < 97 || key > 122)) {
        invalKey(acEvent);
    }
}
/**
* 限制键盘只能输入数字，字母，空格， - ， .
*/
function limitSpeChar() {
    var acEvent = window.event ? window.event : arguments.callee.caller.arguments[0];
    var key = realKeyCode(acEvent);
    if ((key < 48 || key > 57) && (key < 65 || key > 90) && (key < 97 || key > 122) && key != 32 && key != 45 && key != 46) {
        invalKey(acEvent);
    }
}
/**
* 使键盘按键无效(兼容IE和Firefox)
* 
* @param evt
*            按键事件
*/
function invalKey(evt) {
    if (window.event) {
        evt.returnValue = false; // for ie
    } else {
        evt.preventDefault(); // for firefox
    }
}
/**
* 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
*/
function isIDCardNo(card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
        return false;
    }
    return true;
}

/**
* 
*/
var Gis = function () { };
Gis.Fun = {
    DW: "dw",
    KXGJ: "kxgj",
    KXSB: "kxsb"
};
/**
* 通讯代理类
*/
var CommProxy = function () { };
CommProxy.Screen = {
    Screen1: "screen1",
    Screen2: "screen2"
};
CommProxy.call = function (screen, funcName, EiInfo, callBack, notFocus) {
    if (screen === CommProxy.Screen.Screen1 || screen === CommProxy.Screen.Screen2) {
        CommProxy.send(screen, funcName, EiInfo, callBack, notFocus);
    } else {
        alert("不能向不支持的屏幕号发送数据");
    }
};
CommProxy.send = function (screen, funcName, EiInfo, callBack, notFocus) {
    var mode = getCookie("screenmode");
    if (mode == 2) {
        if (screen === CommProxy.Screen.Screen1) {
            eval("var EiInfoReturn=window.opener.shell." + funcName + "(EiInfo); window.opener.focus();");
        } else {
            try {
                var debug = window.parent.secWindow.length;
            } catch (e) {
                if (window.confirm("2屏不存在，需要打开2屏吗？")) {
                    window.parent.openSecScreen();
                    return;
                }
            }
            eval("var EiInfoReturn=window.parent.secWindow." + funcName + "(EiInfo); if(" + notFocus + "===undefined) { window.parent.secWindow.focus(); }");
        }
    } else {
        if (screen === CommProxy.Screen.Screen1) {
            eval("var EiInfoReturn=window.parent.frames['shell']." + funcName + "(EiInfo);");
        } else {
            eval("var EiInfoReturn=window.parent.frames['shellGis']." + funcName + "(EiInfo);");
        }
    }
    if (typeof callBack === "string") {
        eval(callBack + "(EiInfoReturn)");
    } else if (typeof callBack === "function") {
        callBack(EiInfoReturn);
    }
};
//调用一屏幕菜单功能
CommProxy.menu = function (screen, funcName, EiInfo, callBack) {
    if (screen === CommProxy.Screen.Screen1) {
        eval("var EiInfoReturn=window.opener." + funcName + "(EiInfo); window.opener.focus();");
    }
    if (typeof callBack === "string") {
        eval(callBack + "(EiInfoReturn)");
    } else if (typeof callBack === "function") {
        callBack(EiInfoReturn);
    }
}
// window.opener
CommProxy.gisFun = function (params) {
    var eiInfo = new EiInfo();
    var ymh = getYmh();
    params.ymh = ymh;
    params.num = { "SP": params.sp, "KK": params.kk, "DJ": params.dj };
    eiInfo.set("public", params);
    CommProxy.call(CommProxy.Screen.Screen2, "publicFun", eiInfo);
}

function getYmh() {
    var reg = new RegExp("(^|&)efFormEname=([^&]*)(&|$)", "i");
    var r = window.location.href.split("?")[1].match(reg);
    return unescape(r[2]);
}

function locationTo(ymh) {
    window.location.href = "DispatchAction.do?efFormEname=" + ymh;
}

/**
* 日期控件初始化注册
*/
function regCalendar(CalParam) {
    for (var i = 0; i < CalParam.length; i++) {
        var id = CalParam[i].id;
        var jqid = CalParam[i].jqid;
        var hasTime = CalParam[i].hastime;
        var monthOnly = CalParam[i].monthOnly;
        var cal = null;
        if (jqid == null) {
            cal = $(document.getElementById(id));
        } else if (id == null) {
            cal = $(jqid);
        } else {
            alert("日期控件注册失败");
        }
        if (hasTime == null) {
            hasTime = false;
        }
        if (monthOnly == null) {
            monthOnly = false;
        }
        var value = cal.val();
        // cal.datepicker({
        // });
        if (monthOnly) {
            cal.monthpicker({
                pattern: "yyyy-mm",
                startYear: 2000,
                finalYear: 2050,
                monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
            });
        } else {
            if (hasTime) {
                cal.datetimepicker({
                    showAnim: "fadeIn",
                    changeMonth: true,
                    changeYear: true,
                    showOtherMonths: true,
                    selectOtherMonths: false,
                    firstDay: 0,
                    dateFormat: "yy-mm-dd",
                    timeFormat: "HH:mm:ss"
                });
            } else {
                cal.datepicker({
                    showAnim: "fadeOut",
                    changeMonth: true,
                    changeYear: true,
                    showOtherMonths: true,
                    selectOtherMonths: false,
                    firstDay: 0,
                    dateFormat: "yy-mm-dd"
                });
            }
        }

        cal.val(value);
    }
}

/**
* tip提示
* 
* @param param
*/
function inputTip(param) {
    for (var i = 0; i < param.length; i++) {
        var jqid = param[i].jqid;
        var text = param[i].text;
        $(jqid).qtip({
            position: {
                my: "bottom left",
                at: "top left"
            },
            show: {
                event: "focus",
                effect: function (offset) {
                    $(this).fadeTo(200, 0.85);
                }
            },
            hide: {
                event: "blur",
                effect: function (offset) {
                    $(this).slideUp(200);
                }
            },
            style: {
                classes: "tip normal-font"
            },
            content: text
        });
    }
}

var GISConst = {// gis页面用常量
    Layers: { "YXT": "影像图", // 中文名对应gisconfig.xml
        "DLKJ": "地理框架"
    },
    Device: {// 设备中英文对象
        SXT: { "en": "SP", "zh": "摄像头" },
        KK: { "en": "KK", "zh": "卡口" },
        DJ: { "en": "DJ", "zh": "电子警察" }
    }

};

/**
* 切换页面时清空二屏地图
*/
function clearGisTool() {
    try {
        CommProxy.call(CommProxy.Screen.Screen2, "clearMap", null, null, true);
    } catch (e) {
        // alert(e);
    }
}

/**
* 写入cookie
*/
function setCookie(name, value) {
    var Days = 365;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
* 读取cookie
* 
* @param name
* @returns
*/
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

/**
* 删除cookie
* 
* @param name
*/
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

/**
* 获取系统参数
* 
* @param screen
*            哪个屏幕调用 1 or 2
* @param key
*            参数KEY
* @returns
*/
function getSysParam(screen, key) {
    var mode = getCookie("screenmode");
    if (screen == 1) {
        return window.parent.sysParamsConst[key];
    } else if (screen == 2) {
        if (mode == 1) {
            return window.parent.sysParamsConst[key];
        } else {
            return window.opener.sysParamsConst[key];
        }
    }
}

/**
* 设置常用省份
* 
* @param screen
*            哪个屏幕调用 1 or 2
* @param name
*            三按钮的name属性
* @param id_ddl
*            下拉框的id
*/
function setCysf(screen, name, id_ddl) {
    $("button[name='" + name + "']").unbind();
    $("button[name='" + name + "']").eq(0).text(getSysParam(screen, "cysf1"));
    $("button[name='" + name + "']").eq(1).text(getSysParam(screen, "cysf2"));
    $("button[name='" + name + "']").eq(2).text(getSysParam(screen, "cysf3"));
    $("button[name='" + name + "']").bind("click", function () {
        $(id_ddl).val($(this).text());
    });
}

function ocxCover(dialogId) {
    var width = $(document).width();
    var height = $(document).height();
    var iframe = $("<iframe style='position: absolute; border: none; z-index: 10; filter: alpha(opacity=50);'></iframe>");
    iframe.css({
        left: 0,
        top: 0,
        width: width,
        height: height
    })
    $(document).find("body").append(iframe);
    $(document).find("body").data("ocxcover", iframe);
    $(dialogId).dialog({
        close: function () {
            var iframe = $(document).find("body").data("ocxcover");
            if (iframe !== undefined) {
                iframe.remove();
            }
        }
    });
}