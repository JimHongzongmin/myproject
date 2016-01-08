/**
 * 一键生成表格类
 * 
 * @returns {Commtable}
 */
var Commtable = function() {
	this.block = null; // 生成表格的区域，必须参数
	this.head = null; // 表头，必须参数
	/**
	 * 非必要参数，根据需求传入
	 */
	this.service = null; // 后台服务类名称
	this.method = null; // 后台服务类方法
	this.info = null; // 后台服务类查询参数
	this.returnTrFun = null; // 行回调函数，非必须参数
	this.fullFill = true; // 是否用空行充满表格，默认为true，非必须参数
	this.pageBar = true; // 是否需要分页栏，默认为true，非必须参数
	this.colStyle = null; // 列的自由化定制
	this.queryComplete = null; // 查询完成后的回调函数,可以从eiInfo中获取到各自放入的其他数据
	this.queryBefore = null; // 查询之前回调函数，可以在翻页等操作之前操作
	this.loadingView = null; // 是否需要显示等待loading条
	this.noCount = null; // 是否计算总记录数，对于记录集过大的查询应避免查询总记录数
	this.data = null;
	/**
	 * 内部参数，不要直接调用
	 */
	this.pageSize = 0; // 每页数据条数，默认为10，非必须参数
	this.pageIndex = 0; // 当前页数，默认为1，非必须参数
	this.pageNum = 0; // 总页数，内部参数
	this.hasConstruct = false; // 是否已初始化，内部参数
	this.selectedTr = null; // 选中的行 可以调用table.selectedRow()方法取得，内部参数
	this.rows = null; // 所有行 可以调用table.getRows()方法取得，内部参数
	this.tableHead = null; // 表格表头 调用table.getTableHead()方法取得，内部参数
	this.tableBody = null; // 表格表体 调用table.getTableBody()方法取得，内部参数
	this.pageSizeSelect = null; // 每页记录数下拉框
	this.firstButton = null; // 首页按钮
	this.nextButton = null; // 下一页按钮
	this.prevButton = null; // 上一页按钮
	this.lastButton = null; // 尾页按钮
	this.pageNumInput = null; // 当前页输入框
	this.pageNumLabel = null; // 总页数Label
	this.recordSizeLabel = null; // 总记录数
	this.loadingTr = null; // 显示查询中loading样式
	this.startRecursion = null; // 是否开启递归
	this.noDataBar = null; // 显示查询无结果样式
	this.showDataBar = null; // 是否显示无查询结果的样式
	this.noTip = null; // 是否显示Tip提示
};

/**
 * 生成表格初始化方法
 * 
 * @param param
 */
Commtable.prototype.init = function(param) {
	// 初始化完成的表, 不允许重复调用此方法
	if (this.hasConstruct) {
		return;
	}
	this.hasConstruct = true;
	this.block = param["block"];
	this.pageSize = param["pageSize"];
	if (this.pageSize == null) {
		this.pageSize = 20;
	}
	this.pageIndex = param["pageIndex"];
	if (this.pageIndex == null) {
		this.pageIndex = 1;
	}
	this.pageNum = 0;
	this.service = param["service"];
	this.method = param["method"];
	this.info = param["info"];

	this.head = param["head"];
	this.returnTrFun = param["returnTrFun"];
	this.fullFill = param["fullFill"];
	if (this.fullFill == null) {
		this.fullFill = true;
	}
	this.pageBar = param["pageBar"];
	if (this.pageBar == null) {
		this.pageBar = true;
	}
	if (!this.pageBar) {
		this.pageSize = 20;
	}
	this.queryComplete = param["queryComplete"];
	this.queryBefore = param["queryBefore"];
	this.loadingView = param["loadingView"];
	if (this.loadingView == null) {
		this.loadingView = false;
	}
	this.noCount = param["noCount"];
	if (this.noCount == null) {
		this.noCount = false;
	}
	this.startRecursion = false;
	this.showDataBar = param["showDataBar"];
	if (this.showDataBar == null) {
		this.showDataBar = true;
	}
	this.noTip = param["noTip"];
	if (this.noTip == null) {
		this.noTip = false;
	}
	this.construct();
	// 构建完成,如果传入了service method info, 则开始查询
	if (this.service != null && this.method != null && this.info != null) {
		this.query();
	}
};

/**
 * 构建表格区域
 */
Commtable.prototype.construct = function() {
	var commtable = this;
	var tableBlank = this.block;
	// 表格宽度
	var width = tableBlank.width();
	// 表格头高度
	var headDivHeight = 27;
	// 生成表格头div
	var headDiv = $("<div class='table-headbar' style='position: relative; width: " + (width + 1) + "px; height: " + headDivHeight + "px;'></div>");
	tableBlank.append(headDiv);
	// 生成表格头table
	var tableHead = $("<table class='table' style='position: relative; width: 100%;' cellpadding='0'></table>");
	headDiv.append(tableHead);
	// 生成表格头thead
	this.tableHead = $("<thead class='thead'></thead>");
	tableHead.append(this.tableHead);
	// 生成表格头tr
	var tableHead_head_tr = $("<tr></tr>");
	this.tableHead.append(tableHead_head_tr);
	// 生成表格头th
	for ( var col in this.head) {
		tableHead_head_tr.append("<th colkey='" + col + "' width='" + this.head[col].width + "'>" + this.head[col].title + "</th>");
	}

	// 表体高度, 计算得出，需要考虑是否有分页栏、按钮栏
	var bodyDivHeight = 0;
	if (this.pageBar) {
		bodyDivHeight = tableBlank.height() - 27 - 30;
	} else {
		bodyDivHeight = tableBlank.height() - 27;
	}
	// 生成表体div
	var bodyDiv = $("<div class='table-bodyBar' style='position: relative; width: " + (width + 1) + "px; height: " + bodyDivHeight + "px;'></div>");
	tableBlank.append(bodyDiv);
	// 生成表体body
	var tableBody = $("<table class='table' style='position: relative; width: 100%;' cellpadding='0'></table>");
	bodyDiv.append(tableBody);
	// 生成表体tbody
	this.tableBody = $("<tbody></tbody>");
	tableBody.append(this.tableBody);

	// 如果需要分页栏
	if (this.pageBar) {
		// 生成分页栏div
		var pageDiv = $("<div style='position: relative; width: " + width + "px' class='normal-font'></div>");
		if (this.block.hasClass("panel-bottom")) {
			pageDiv.addClass("panel-bottom")
		}
		// 生成分页栏左边栏
		var pageDiv_divLeft = $("<div></div>");
		pageDiv.append(pageDiv_divLeft);

		this.firstButton = $("<button class='page-button'>首页</button>");
		this.firstButton.bind("click", function() {
			commtable.pageFirst();
		});

		this.prevButton = $("<button class='page-button'>上页</button>");
		this.prevButton.bind("click", function() {
			commtable.pagePrevious();
		});

		this.pageNumInput = $("<input class='page-input ime' onfocus='this.select();' onkeypress='limitInt();' value='0' maxlength='4'/>");
		this.pageNumInput.bind("keypress", function(event) {
			if (event.keyCode == 13) {
				commtable.toPageNum();
				return false;
			}
		});

		var pageNumSplit = $("<span style='margin-left: 5px;'>/</span>");
		this.pageNumLabel = $("<label style='margin-left: 5px; padding-right: 5px; display: inline-block'>0</label>");

		this.nextButton = $("<button class='page-button'>下页</button>");
		this.nextButton.bind("click", function() {
			commtable.pageNext();
		});

		this.lastButton = $("<button class='page-button'>尾页</button>");
		this.lastButton.bind("click", function() {
			commtable.pageLast();
		});

		this.pageSizeSelect = $("<select class='pagesize-select normal-font'></select>");
		this.pageSizeSelect.append("<option value='20'>每页20条记录</option>");
		this.pageSizeSelect.append("<option value='60'>每页60条记录</option>");
		this.pageSizeSelect.append("<option value='100'>每页100条记录</option>");
		this.pageSizeSelect.bind("change", function() {
			commtable.changeTablePage($(this));
		});
		this.pageSizeSelect.val(this.pageSize);

		// 生成分页栏右边栏
		var pageDiv_divRight = $("<div></div>");

		this.recordSizeLabel = $("<span>0</span>");
		var recordLabel = $("<span style='font-weight: bold; margin-right: 5px;'></span>");
		recordLabel.append("<span>共有</span>").append(this.recordSizeLabel).append("<span>条记录</span>");

		if (width >= 480 || width < 300) {
			pageDiv.addClass("table-pagebar");

			pageDiv_divLeft.addClass("pagediv-left");

			if (width >= 280) {
				pageDiv_divLeft.append(this.firstButton);
			}
			pageDiv_divLeft.append(this.prevButton);
			pageDiv_divLeft.append(this.pageNumInput);
			pageDiv_divLeft.append(pageNumSplit);
			pageDiv_divLeft.append(this.pageNumLabel);
			pageDiv_divLeft.append(this.nextButton);

			if (width >= 280) {
				pageDiv_divLeft.append(this.lastButton);
			} else {
				pageDiv_divLeft.css({
					float : "none",
					paddingLeft : "0px",
					margin : "0 auto",
					width : "170px"
				});
			}

			if (width >= 480) {
				pageDiv_divLeft.append(this.pageSizeSelect);
				if (!this.noCount) {
					pageDiv.append(pageDiv_divRight);
					pageDiv_divRight.append(recordLabel);
				}
			}

			pageDiv_divRight.addClass("pagediv-right");
		} else {
			bodyDiv.height(bodyDiv.height() - 15);
			pageDiv.append(pageDiv_divRight);
			pageDiv.addClass("table-pagebar-short");

			pageDiv_divLeft.addClass("pagediv-left-short");
			var div1 = $("<div style='display: inline-block; width: 40%; text-align: left'></div>");
			div1.append(this.firstButton);
			div1.append(this.prevButton);
			pageDiv_divLeft.append(div1);

			var div2 = $("<div style='display: inline-block; width: 20%; text-align: center'></div>");
			this.pageNumInput.css("margin", "0");
			div2.append(this.pageNumInput);
			div2.append(pageNumSplit);
			div2.append(this.pageNumLabel);
			pageDiv_divLeft.append(div2);

			var div3 = $("<div style='display: inline-block; width: 40%; text-align: right'></div>");
			this.nextButton.css("margin", "0 5px 0 0");
			this.lastButton.css("margin", "0 5px 0 0");
			div3.append(this.nextButton);
			div3.append(this.lastButton);
			pageDiv_divLeft.append(div3);

			pageDiv_divRight.addClass("pagediv-right-short");
			pageDiv_divRight.append(this.pageSizeSelect);
			this.pageSizeSelect.css("float", "left");
			recordLabel.css("float", "right");

			if (!this.noCount) {
				pageDiv_divRight.append(recordLabel);
			}
		}

		tableBlank.append(pageDiv);
		this.disable();
	}
};

/**
 * 查询
 */
Commtable.prototype.query = function(service, method, info) {
	if (arguments.length == 3) {
		this.pageIndex = 1;
		this.pageNum = 1;
		this.service = service;
		this.method = method;
		this.info = info;
	} else if (arguments.length == 2) {
		this.pageIndex = 1;
		this.pageNum = 1;
		this.info = service;
		this.colStyle = method;
	} else if (arguments.length == 1) {
		this.pageIndex = 1;
		this.pageNum = 1;
		this.info = service;
		this.colStyle = null;
	}
	if (this.service == null || this.method == null || this.info == null) {
		alert("表格尚未设置Service后台");
		return;
	}

	// 查询前调用自定义前置方法
	if (this.queryBefore) {
		this.queryBefore();
	}

	this.info.set("pageSize", this.pageSize);
	this.info.set("pageIndex", this.pageIndex);
	this.info.set("noCount", this.noCount);
	if (this.noDataBar != null) {
		this.noDataBar.remove();
	}

	// 有分页栏时，先禁用分页栏按钮
	if (this.pageBar) {
		this.disable();
	}

	// 不是递归调用的查询，先隐藏掉所有的行，当查询完成后，若下一页有数据，则清空后再填充，若下一页没有数据，则显示上一页数据，并置状态为末页
	if (!this.startRecursion) {
		this.getTableBody().find(">tr").hide();
		// 不需要分页栏时，默认开启递归查询，当第二批数据载入时，不会清空或隐藏掉之前的查询结果数据
		if (!this.pageBar) {
			// 查询之前清空表格
			this.getTableBody().empty();
			this.startRecursion = true;
		}
	}
	// 没有else，也就是说当不需要分页栏时是使用分批载入所有数据的查询方式，在第一批数据查询后，置this.startRecursion = true
	// 开启递归，当下一次查询发生前不会清空表格之前查询出来的数据，而是会继续根据查询结果填充表格

	// 需要显示loading,或不用分页栏的默认显示loading样式
	if (this.loadingView || !this.pageBar) {
		if (this.loadingTr == null) {
			this.loadingTr = $("<tr style='background-color: #C3C3C3;'><td align='center' colspan='" + this.getTableHead().find(">tr:first>th").length + "'><div class='loading'></div></td></tr>");
		}
		this.getTableBody().append(this.loadingTr);
		this.getTableBody().parent().parent().scrollTop(this.getTableBody().height());
	}

	var commtable = this;
	EiCommunicator.send(this.service, this.method, this.info, {
		onSuccess : function(eiInfo) {
			commtable.fillData(eiInfo);
		},
		onFail : function(eMsg) {
			if (eMsg && typeof (eMsg) === "string" && eMsg.indexOf(":") != -1) {
				openDialogInfo(eMsg.split(":")[1]);
			} else {
				openDialogInfo("内部错误");
			}
		}
	}, false, true);// false-接收返回的报错信息，true-异步
};

/**
 * 填充数据
 */
Commtable.prototype.fillData = function(eiInfo) {
	// 有异常时，报出异常，终止查询
	if (eiInfo.status == -2) {
		openDialogInfo(eiInfo.msg);
		return;
	}

	// 有loading样式时先删除loading样式
	if (this.loadingView || !this.pageBar) {
		this.getTableBody().find(">tr:last").remove();
	}

	var commtable = this;

	// 查询回传数据
	this.data = eiInfo.get("data");
	// 记录总数
	var dataCount = eiInfo.get("dataCount");

	// 当不计算总页数时，查询前不可预知下一页是否有数据
	if (this.noCount) {

		// 查询完成，没有数据
		if (this.data.length == 0) {
			// 显示原先的数据
			this.getTableBody().find(">tr").show();
			// 页数回置
			this.pageIndex--;
			// 若有分页栏，反禁用分页栏按钮
			if (this.pageBar) {
				this.enable();
				this.setPageButtonStatus(this.data);
			}
			// 如果不是回调函数引起的查询，并且不是翻页引起的查询，也就是说当是一次新的查询没有数据时，需要清空表格
			if (!this.startRecursion && this.pageIndex == 0) {
				// 更新当前页数
				this.pageNumInput.val("0");
				// 更新总页数
				this.pageNumLabel.text("0");
				this.getTableBody().empty();
			}
			// 查询完成后，回调自定义结束函数
			if (this.queryComplete) {
				this.queryComplete(eiInfo);
			}
			if (this.data.length == 0) {
				if (this.showDataBar) {
					if (this.noDataBar == null) {
						this.noDataBar = $("<label class='tr_even normal-font' style='position: absolute; left: 1px; right: 0px; top: 1px; height: 28px; line-height: 28px; text-align: center; font-weight: bold; color: #F19D10'>查询无结果</label>");
					}
					this.getTableBody().parent().parent().append(this.noDataBar);
				}
			}
			return;
		}
		if (this.pageIndex == 1 && this.data.length == 0) {
			this.pageIndex = 0;
			this.pageNum = 0;
		} else {
			if (this.pageNum < this.pageIndex) {
				this.pageNum = this.pageIndex;
			}
		}
	} else {
		this.pageNum = +Math.ceil(dataCount / this.pageSize);
		if (this.pageNum == 0) {
			this.pageIndex = 0;
		}
	}
	// 不是回调引起的查询，清空表格
	if (!this.startRecursion) {
		this.getTableBody().empty();
	}
	this.selectedTr = null;

	if (this.pageBar) {
		// 更新当前页数
		this.pageNumInput.val(this.pageIndex + "");
		// 更新总页数
		this.pageNumLabel.text(this.pageNum + "");
		// 更新总记录数
		this.recordSizeLabel.text(dataCount + "");
	}
	// 需要定制化列样式，先改表头
	if (this.colStyle != null) {
		this.getTableHead().find(">tr:first>th").each(function() {
			var colkey = $(this).attr("colkey");
			var styleWidth = commtable.colStyle[colkey];
			if (styleWidth == 0) {
				$(this).hide();
			} else {
				$(this).show();
				$(this).attr("width", styleWidth);
			}
		});
	}

	var tableBody_body_tr = null;
	jQuery.each(this.data, function(index, val) {
		tableBody_body_tr = $("<tr class='" + (index % 2 == 0 ? "tr_odd" : "tr_even") + "'></tr>");
		tableBody_body_tr.bind("click", function() {
			commtable.selectArow($(this));
		});
		commtable.getTableBody().append(tableBody_body_tr);
		for ( var xscol in commtable.head) {
			if (val[xscol] || typeof (val[xscol]) != "undefined") {
				var colValue = val[xscol] === null ? "" : val[xscol];
				var td = $("<td class='textIndent'></td>");
				td.append("<div class='overflowCut'>" + colValue + "</div>");
				if(!commtable.noTip){
					commtable.tdTip(td, colValue);
				}
				var tdWidth = null;
				if (commtable.colStyle != null) {
					tdWidth = commtable.colStyle[xscol];
				} else {
					tdWidth = commtable.head[xscol].width;
				}
				td.attr("width", tdWidth);
				if (tdWidth == 0) {
					td.hide();
				}
				tableBody_body_tr.append(td);
				if (commtable.head[xscol].cache) {
					tableBody_body_tr.prop(xscol, colValue);
				}
				val[xscol] = undefined;
			}
		}
		for ( var col in val) {
			if (val[col] !== undefined) {
				var colValue = val[col] === null ? "" : val[col];
				tableBody_body_tr.prop(col, colValue);
			}
		}

		if (commtable.returnTrFun) {
			commtable.returnTrFun(tableBody_body_tr);
		}
	});
	var queryNoData = false;
	// 若有分页栏，则查询结束，重置分页按钮状态，并调用回调函数
	if (this.pageBar) {
		// 填满表格
		if (this.fullFill) {
			var rowNumber = this.data.length;
			if (rowNumber < this.pageSize) {
				for ( var i = 0; i < (this.pageSize - rowNumber); i++) {
					tableBody_body_tr = $("<tr class='" + (i % 2 == 0 ? "tr_odd" : "tr_even") + "'></tr>");
					this.getTableBody().append(tableBody_body_tr);
					for ( var col in this.head) {
						var td = $("<td width='" + this.head[col].width + "'><div>&nbsp;</div></td>");
						var tdWidth = null;
						if (this.colStyle != null) {
							tdWidth = this.colStyle[col];
						} else {
							tdWidth = this.head[col].width
						}
						td.attr("width", tdWidth);
						if (tdWidth == 0) {
							td.hide();
						}
						tableBody_body_tr.append(td);
					}
				}
			}
		}
		this.enable();
		this.setPageButtonStatus(this.data);
		queryNoData = true;
	} else {
		// 不需要分页栏时，如果数据未全部载入，则继续做下一页的查询
		if (this.startRecursion && this.getRows().length < dataCount) {
			this.pageNext();
			return;
		}
		// 若数据已经全部载入，则结束递归，并调用回调函数
		this.startRecursion = false;
		queryNoData = true;
		this.getTableBody().parent().parent().scrollTop(0);
	}
	// 清除表头复选框的选中状态
	this.getTableHead().find("tr>th").each(function() {
		if ($(this).find("input[type='checkbox']").length > 0) {
			$(this).find("input[type='checkbox']").prop("checked", false);
		}
	});
	if (this.queryComplete) {
		this.queryComplete(eiInfo);
	}
	if (this.data.length == 0) {
		if (this.showDataBar) {
			if (this.noDataBar == null) {
				this.noDataBar = $("<label class='tr_even normal-font' style='position: absolute; left: 1px; right: 0px; top: 1px; height: 28px; line-height: 28px; text-align: center; font-weight: bold; color: #F19D10'>查询无结果</label>");
			}
			this.getTableBody().parent().parent().append(this.noDataBar);
		}
	}
};

/**
 * 中断递归查询
 */
Commtable.prototype.stopQuery = function() {
	this.startRecursion = false;
}

/**
 * 查询时禁用按钮
 */
Commtable.prototype.disable = function() {
	this.pageSizeSelect.prop("disabled", true);
	this.firstButton.prop("disabled", true);
	this.firstButton.addClass("page-button-disabled");
	this.prevButton.prop("disabled", true);
	this.prevButton.addClass("page-button-disabled");
	this.nextButton.prop("disabled", true);
	this.nextButton.addClass("page-button-disabled");
	this.lastButton.prop("disabled", true);
	this.lastButton.addClass("page-button-disabled");
	this.pageNumInput.prop("disabled", true);
};

/**
 * 查询完重置按钮禁用状态
 */
Commtable.prototype.enable = function() {
	this.pageSizeSelect.prop("disabled", false);
	this.firstButton.prop("disabled", false);
	this.firstButton.removeClass("page-button-disabled");
	this.prevButton.prop("disabled", false);
	this.prevButton.removeClass("page-button-disabled");
	this.nextButton.prop("disabled", false);
	this.nextButton.removeClass("page-button-disabled");
	this.lastButton.prop("disabled", false);
	this.lastButton.removeClass("page-button-disabled");
	this.pageNumInput.prop("disabled", false);
};

/**
 * 根据页数禁用分页按钮
 */
Commtable.prototype.setPageButtonStatus = function(data) {
	if (this.noCount) {
		if (this.pageIndex == 0) {
			this.firstButton.prop("disabled", true);
			this.firstButton.addClass("page-button-disabled");
			this.prevButton.prop("disabled", true);
			this.prevButton.addClass("page-button-disabled");
			this.nextButton.prop("disabled", true);
			this.nextButton.addClass("page-button-disabled");
		} else if (this.pageIndex == 1) {
			this.firstButton.prop("disabled", true);
			this.firstButton.addClass("page-button-disabled");
			this.prevButton.prop("disabled", true);
			this.prevButton.addClass("page-button-disabled");
			if (data.length != this.pageSize) {
				this.nextButton.prop("disabled", true);
				this.nextButton.addClass("page-button-disabled");
			} else {
				this.nextButton.prop("disabled", false);
				this.nextButton.removeClass("page-button-disabled");
			}
		} else if (data.length != this.pageSize) {
			this.firstButton.prop("disabled", false);
			this.firstButton.removeClass("page-button-disabled");
			this.prevButton.prop("disabled", false);
			this.prevButton.removeClass("page-button-disabled");
			this.nextButton.prop("disabled", true);
			this.nextButton.addClass("page-button-disabled");
		} else {
			this.firstButton.prop("disabled", false);
			this.firstButton.removeClass("page-button-disabled");
			this.prevButton.prop("disabled", false);
			this.prevButton.removeClass("page-button-disabled");
			this.nextButton.prop("disabled", false);
			this.nextButton.removeClass("page-button-disabled");
		}
		this.lastButton.prop("disabled", true);
		this.lastButton.addClass("page-button-disabled");
	} else {
		if (this.pageNum < 2) {
			this.firstButton.prop("disabled", true);
			this.firstButton.addClass("page-button-disabled");
			this.prevButton.prop("disabled", true);
			this.prevButton.addClass("page-button-disabled");
			this.nextButton.prop("disabled", true);
			this.nextButton.addClass("page-button-disabled");
			this.lastButton.prop("disabled", true);
			this.lastButton.addClass("page-button-disabled");
		} else {
			if (this.pageIndex == 1) {
				this.firstButton.prop("disabled", true);
				this.firstButton.addClass("page-button-disabled");
				this.prevButton.prop("disabled", true);
				this.prevButton.addClass("page-button-disabled");
			} else if (this.pageIndex == this.pageNum) {
				this.nextButton.prop("disabled", true);
				this.nextButton.addClass("page-button-disabled");
				this.lastButton.prop("disabled", true);
				this.lastButton.addClass("page-button-disabled");
			}
		}
	}
};

/**
 * 获得选中的行
 * 
 * @returns
 */
Commtable.prototype.selectedRow = function() {
	if (this.selectedTr != null && this.selectedTr.parent().length == 0) {
		this.selectedTr = null;
	}
	return this.selectedTr;
};

/**
 * 获得表格表头
 */
Commtable.prototype.getTableHead = function() {
	return this.tableHead;
};

/**
 * 获得表格表体
 */
Commtable.prototype.getTableBody = function() {
	return this.tableBody;
};

/**
 * 获得当前页所有行
 */
Commtable.prototype.getRows = function() {
	this.rows = this.tableBody.find(">tr");
	return this.rows;
};

/**
 * 获得某索引行
 */
Commtable.prototype.getRow = function(index) {
	var tr = this.tableBody.find(">tr").eq(index);
	return tr;
};

/**
 * 突出显示选中行
 * 
 * @param tr
 */
Commtable.prototype.selectArow = function(tr) {
	if (tr == null) {
		return;
	}
	this.tableBody.find(">tr").each(function() {
		if ($(this).prop("selected")) {
			$(this).removeClass("tr_select");
			$(this).prop("selected", false);
			return false;
		}
	});
	if (typeof tr == "number") {
		tr = this.tableBody.find(">tr").eq(tr);
	}
	if (tr.length == 0) {
		this.selectedTr = null;
	} else {
		tr.addClass("tr_select");
		tr.prop("selected", true);
		this.selectedTr = tr;
	}
};

/**
 * 每页记录条数change事件
 * 
 * @param select
 */
Commtable.prototype.changeTablePage = function(select) {
	this.pageIndex = 1;
	this.pageNum = 1;
	this.pageSize = select.val();
	this.query();
};

/**
 * 首页
 */
Commtable.prototype.pageFirst = function() {
	if (this.pageIndex == 1) {
		return false;
	}
	this.pageIndex = 1;
	this.query();
};

/**
 * 上一页
 */
Commtable.prototype.pagePrevious = function() {
	if ((this.pageIndex - 1) < 1) {
		return false;
	}
	if (!this.noCount) {
		if ((this.pageIndex - 1) > this.pageNum) {
			return false;
		}
	}
	this.pageIndex--;
	this.query();
};

/**
 * 下一页
 */
Commtable.prototype.pageNext = function() {
	if (!this.noCount) {
		if ((this.pageIndex + 1) > this.pageNum) {
			return false;
		}
		if ((this.pageIndex + 1) < 1) {
			return false;
		}
	}
	this.pageIndex++;
	this.query();
};

/**
 * 尾页
 */
Commtable.prototype.pageLast = function() {
	if (this.pageIndex == this.pageNum) {
		return false;
	}
	this.pageIndex = this.pageNum;
	this.query();
};

/**
 * 跳转至某页
 * 
 * @param button
 */
Commtable.prototype.toPageNum = function(input) {
	var inputPageNum = parseInt(this.pageNumInput.val());
	if (inputPageNum > this.pageNum) {
		inputPageNum = this.pageNum;
	} else if (inputPageNum <= 0) {
		inputPageNum = 1;
	}
	this.pageIndex = inputPageNum;
	this.query();
};

Commtable.prototype.jumpNum = function(page) {
	page = parseInt(page);
	if (page > this.pageNum) {
		this.pageNum = page;
		this.pageNumLabel.text(this.pageNum);
	}
	this.pageIndex = page;
	this.pageNumInput.val(page);
	this.query();
};
/**
 * 超出文字tip显示
 */
Commtable.prototype.tdTip = function(td, text) {
	var api = td.qtip({
		position : {
			my : "bottom left",
			at : "top left"
		},
		show : {
			event : "click",
			effect : function(offset) {
				$(this).fadeTo(200, 0.85);
			}
		},
		hide : {
			effect : function(offset) {
				$(this).slideUp(200);
			}
		},
		style : {
			classes : "tableTD-tip normal-font"
		},
		content : text
	});
	return api;
};

/**
 * 重设置表格高度
 */
Commtable.prototype.resizeHeight = function(height) {
	if (this.pageBar) {
		height = height - 27 - 30;
	} else {
		height = height - 27;
	}
	this.block.find(">div:eq(1)").height(height);
}