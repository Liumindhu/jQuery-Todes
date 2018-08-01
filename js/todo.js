// 	要求:运用阶段二所学的jquery的知识实现如动态图所示效果
// 经典案例todos 参考http://todomvc.com/examples/jquery/#/all
// 	页面已给出（todos案例(jQuery).html）,直接写jquery部分，请把jQuery代码写到js目录中的todo.js文件
// 功能描述:
// 1 在类名为.new-todo的input输入内容后,按回车键会将内容添加到下方的.todo-list的ul列表中,形成一条任务
// 2 当类名为.new-todo的input中无内容时,按回车键会弹出提示框,用于提醒用户输入内容
// 3 类名为.todo-list的ul列表中可以有重复内容,但不能添加空内容
// 4 每条任务前方默认有空心圈,点击时,可以在打钩样式和空心样式反复切换
// 5 当鼠标滑过任务时,任务右侧的'删除'按钮显示出来
// 6 当点击删除按钮时,当前任务从列表中删除
// 7 当添加任务/删除任务/勾选任务前面的空心圆/点击类名为toggle-all的input时,左下角类名为.todo-count的span中的数字会相应发生变化
// 8 双击类名为.todo-list的ul中的每条任务,会切换为编辑状态,可以直接修改内容.按回车键确认修改或者点击其他位置确认修改
// 9 右下角ClearAll按钮 清空ul列表中的所有任务
// 10 当鼠标位于clearAll按钮时,按钮样式和鼠标手势会发生变化
// 11 类名为toggle-all的input的作用是,当点击后 任务列表中的所有任务都处于已完成的状态(打钩),并且可以来回切换
// 12 当任务处于已完成状态时,任务内容有样式变化(如横线)
//
// 注意:左下角的类名为.todo-count的span中的数字表示未完成的任务数量
// 当任务左侧的空心圆为打钩状态时,表示当前任务已经完成
// 所有的jquery代码写在todo.js中
//
// 使用的技术:jquery操作DOM的方法 全选和反选
// keydown click dblclick事件
// 动态创建元素 切换类名

$(function () {
	// 1 在类名为.new-todo的input输入内容后,按回车键会将内容添加到下方的.todo-list的ul列表中,形成一条任务
	// 2 当类名为.new-todo的input中无内容时,按回车键会弹出提示框,用于提醒用户输入内容
	// 3 类名为.todo-list的ul列表中可以有重复内容,但不能添加空内容
	var length = 0;
	var len1;
	var len2;
		$(".new-todo").keydown(function (event) {
			if (event.keyCode==13) {
				if ($(".new-todo").val().length == 0) {
					alert("请填写内容");
					}else {
					createList();
					isAllChecked();
					isEmpty();
					//7 当添加任务.todo-count的span中的数字会相应发生变化
					length = $("ul").find(".toggle:not(:checked)").length;
					// console.log($("ul").find(".toggle:not(:checked)"));
					// console.log(length);
					$(".todo-count strong").text(length);
					//回车后清空输入框
					$(".new-todo").val("");
				}


			}
		});


	// 4 每条任务前方默认有空心圈,点击时,可以在打钩样式和空心样式反复切换（checkbox本来就具有这样的功能）
	/* 错误点
	 $("ul").click(function () {
		 $(this).find(":checkbox").click(function () {
			 console.log("hah");
		 })
	 	console.log(1);
		if($(this).is(":checked")) {
			$(this).parent("li").addClass("completed");
		}
	});
	*/
	/*正确*/
	$("ul").on("click","input",function () {
		// console.log(1);
		if($(this).prop("checked") == true) {
			$(this).parent().parent().addClass("completed");
			// console.log($(this).parent());
		}else {
			$(this).parent().parent().removeClass("completed");
		}
		isAllChecked();
		//7 勾选任务前面的空心圆.todo-count的span中的数字会相应发生变化
		length = $("ul").find(".toggle:not(:checked)").length;
		$(".todo-count strong").text(length);
	});

	// 5 当鼠标滑过任务时,任务右侧的'删除'按钮显示出来 css实现该功能
	//思考：前面写了$("ul>li")就获取不到!!!
	//已解决：因为li是动态创建的元素，第一种点击事件不适合用，所以改成on触发
	/* 错误点
	$("ul").mouseover(function () {
		// 6 当点击删除按钮时,当前任务从列表中删除
		// $(this).find(".destroy").css("display","block").click(function () {
		// 	// $(this).css("backgroundColor","red");
		// 	$(this).parent().parent().remove();
		// });
		console.log($("ul>li"));

		// console.log(1);
	});
	$("ul").mouseout(function () {
		$(this).find(".destroy").css("display","none");
	});
	*/
	/*正确*/
	$("ul").on("mouseover","li",function () {
		$(this).find(".destroy").css("display","block");
	});
	$("ul").on("mouseout","li",function () {
		$(this).find(".destroy").css("display","none");
	});


	// 6 当点击删除按钮时,当前任务从列表中删除 这样的另外写就获取不到
	/*同5的错误点
	$(".destroy").click(function () {
		$(this).css("backgroundColor","red");
		// $(this).parent().parent().remove();
	});
	*/
	/*正确*/
	$("ul").on("click","button",function () {
		// console.log(2);
		$(this).parent().parent().remove();
		isAllChecked();
		isEmpty();
		//7 删除任务.todo-count的span中的数字会相应发生变化
		length = $("ul").find(".toggle:not(:checked)").length;
		$(".todo-count strong").text(length);
	});

	// 7 当添加任务/删除任务/勾选任务前面的空心圆/点击类名为toggle-all的input时,左下角类名为.todo-count的span中的数字会相应发生变化

	// 8 双击类名为.todo-list的ul中的每条任务,会切换为编辑状态,可以直接修改内容.按回车键确认修改或者点击其他位置确认修改
	$("ul").on("dblclick","li",function () {
		//
		// console.log(1);
		$(this).addClass("editing");
		$(this).find("label").css("display","none");
		$(this).find(".view").css("display","block");
		//双击之后，是文本框获得焦点在内容的后面
		var t = $(this).find("label").text();
		$(this).find(".edit").val("").focus().val(t);
		});
	//8 按回车键确认修改
	$("ul").on("keydown","input.edit",function (event) {
		if (event.keyCode == 13) {
			if ($("this").val() == "") {
				alert("请填写内容");
			}else {
				$(this).parent().parent().removeClass("editing");
				$(this).parent().find("label").css("display","block").text($(this).val());
				$(this).parent().css("display","block");
			}
			$('.new-todo').focus();
		}
	});
	//8 点击其他位置确认修改 即失去焦点的时候
	$("ul").on("blur","input.edit",function () {
		if ($(this).val() == "") {
			$(this).parent().parent().remove();
			//7 勾选任务前面的空心圆.todo-count的span中的数字会相应发生变化
			length = $("ul").find(".toggle:not(:checked)").length;
			$(".todo-count strong").text(length);
		}else{
			$(this).parent().parent().removeClass("editing");
			$(this).parent().find("label").css("display","block").text($(this).val());
			$(this).parent().css("display","block");
		}
		$('.new-todo').focus();
	});


	// 9 右下角ClearAll按钮 清空ul列表中的所有任务
	$(".clear-All").click(function () {
		$("ul").empty();
		//7 下标的数字为0
		$(".todo-count strong").text(0);
	})


	// 10 当鼠标位于clearAll按钮时,按钮样式和鼠标手势会发生变化（这里css可以实现，注释css代码，用js实现）
	$(".clear-All").mouseover(function () {
		$(this).css({"textDecoration":"underline","cursor":"pointer","color":"lightpink"});
	})
	$(".clear-All").mouseout(function () {
		$(this).css({"textDecoration":"none","cursor":"","color":"#4d4d4d"});

	})

	// 11 类名为toggle-all的input的作用是,当点击后 任务列表中的所有任务都处于已完成的状态(打钩),并且可以来回切换
	$(".toggle-all").click(function () {
		var isCheck = $(this).prop("checked");
		// console.log(isCheck);
		$("ul>li").find("input:checkbox").prop("checked",isCheck);
		var checkedObj = $('ul>li').find('input:checkbox');
		if(isCheck) {
			$("ul>li").addClass("completed");
		}else {
			$("ul>li").removeClass("completed");
		}
		isAllChecked();
		isEmpty();
		//7 勾选任务前面的空心圆.todo-count的span中的数字会相应发生变化
		length = $("ul").find(".toggle:not(:checked)").length;
		$(".todo-count strong").text(length);
	});



	// $("ul").dblclick(function () {
	// 	console.log(1);
	// });
	//创建列表
	//思考：为什么一定要定义，而不能写$(".todo-list li div")这样的呢？因为会出现重复创建的情况。这样可以确保一定是在刚刚创建的li下面添加的元素，而不会还找到前面已经创建过的元素添加
	function createList() {
		var liObj = $("<li></li>");
		$(".todo-list").append(liObj);
		var divObj = $("<div class='view'></div>");
		liObj.append(divObj);
		var inputObj = $("<input type='checkbox'>");
		inputObj.addClass(("toggle"));
		divObj.append(inputObj);
		divObj.append($("<label>"+$(".new-todo").val()+"</label>"));
		divObj.append($("<button class='destroy'></button>"));
		var editObj = $("<input class='edit' value='"+$(".new-todo").val()+"'></input>");
		divObj.append(editObj);
	}

	function isAllChecked() {
		len1 = $("ul").children().length;
		len2 = $("ul").find(":checked").length;
		if (len1 == len2) {
			$(".toggle-all").prop("checked",true);
		}else {
			$(".toggle-all").prop("checked",false);
		}
	}

	//当ul中没有列表的时候，隐藏.toggle_all
	function isEmpty() {
		if ($("ul").children().length != 0) {
			$(".toggle-all").css("display","block");
		}else {
			$(".toggle-all").css("display","none");
		}
	}


});
