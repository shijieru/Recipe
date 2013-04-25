

/**
 * @desc: 导航菜单信息caidandelbanner
**/
$(".cdoard").live("mouseover mouseout", function(event){
	if(event.type == 'mouseover')
	{
		$(this).find(".bu_edite").removeClass("hidden");
		$(this).find(".bu_delete").removeClass("hidden");
	}
	else
	{
		$(this).find(".bu_edite").addClass("hidden");
		$(this).find(".bu_delete").addClass("hidden");
	}
})

/**
 * @desc: 导航菜谱信息
 * @time: 2012-06-30
**/
$(".myone").live("mouseover mouseout", function(event){
	if(event.type == 'mouseover')
	{
		$(this).find(".bu_edite").removeClass("hidden");
		$(this).find(".bu_delete").removeClass("hidden");
	}else
	{
		$(this).find(".bu_edite").addClass("hidden");
		$(this).find(".bu_delete").addClass("hidden");
	}
})

/**
* 美食日记编辑按钮
*/
$(".dmone").live("mouseover mouseout", function(event){
	if(event.type == 'mouseover')
	{
		$(this).find(".bu_edite").removeClass("hidden");
		$(this).find(".bu_delete").removeClass("hidden");
	}else
	{
		$(this).find(".bu_edite").addClass("hidden");
		$(this).find(".bu_delete").addClass("hidden");
	}
})

/**
* @desc: 美食日记删除
*/

$(".dietDelBtn").click(function(){
	var diet_id = $(this).attr("diet_id");
	$.fn.confirm({
		msg:'确定删除这条美食日记？',
		callback:function(){
			$.ajax({
				type:"post",
				url:"/uajax/delDiet",
				data:"id="+diet_id,
				dataType:"json",
				async: false,
				success: function(msg)
				{
					if(msg.data == "OK")
					{
						//$("#diet_div_" + diet_id).remove();
						window.location.reload();
					}
					else
					{
						showerrorinfo('提示',"删除失败！");
					}
				}
			})
		}
	})
})
/**
 * @desc: 菜单删除信息
**/
$(".caidandelbanner").click(function(){
	var caidanid = $(this).attr("caidanid");
	$.fn.confirm({
		msg:'确定删除这个菜单？',
		callback:function(){
			$.ajax({
				type:"post",
				url:"/uajax/getDelcaidan",
				data:"caidanid="+caidanid,
				dataType:"json",
				async: false,
				success: function(msg)
				{
					if(msg.data.flag == "Success")
					{
						window.location.reload();
					}else
					{
						showerrorinfo('提示',"删除失败！");
					}
				}
			})
		}
	})
	
})

/**
 * @desc: 导航菜谱信息删除
 * @time:2012-06-30
**/
$(".caipudelbanner").click(function(){
	var cookid = $(this).attr("cookid");
	var uid = $(this).attr("uid");
	$.fn.confirm({
		msg:'确定删除这个菜谱？',
		callback:function(){
			$.ajax({
				type:"post",
				url:"/uajax/actionDelCaipu",
				data:"cookid="+cookid+"&uid="+uid,
				dataType:"json",
				async: false,
				success: function(msg)
				{
					if(msg.data.flag == "Success")
					{
						window.location.reload();
					}else
					{
						showerrorinfo('提示',"删除失败！");
					}
				}
			})
		}
	})
})

/**
 * @desc: 优惠信息_编辑
 * @time: 2012-07-02
**/
$(".editdiscount").live('click',function(){
	var id = $(this).attr("disnum");
	$("#disinfo"+id).hide();
	$("#showdisinfo"+id).show();
	$("#showaction"+id).hide();
})
/**
 * @desc: 优惠信息_取消
 * @time: 2012-07-02
**/
$(".exitinfo").live('click',function(){
	var id = $(this).attr("disnum");
	$("#disinfo"+id).show();
	$("#showdisinfo"+id).hide();
	$("#showaction"+id).show();
})

/**
 * @desc: 优惠信息提交
 * @time: 2012-07-02
**/
$(".saveinfo").live('click',function(){
	var id = $(this).attr('disnum');
	var descText =  $('#showmydescription'+id).val();
	$.ajax({
		type:"post",
		url:"/uajax/actionEditInfo",
		data:"id="+id+"&desctext="+descText,
		dataType:"json",
		async: false,
		success: function(msg)
		{
			if(msg.data.flag == "Success")
			{
				$('#disinfo'+id).html(descText);
				$("#showmydescription"+id).html(descText);
				$("#disinfo"+id).show();
				$("#showdisinfo"+id).hide();
				$("#showaction"+id).show();
			}else
			{
				showerrorinfo('提示',"删除失败！");
			}
		}
	})
})

/**
 * @desc: 优惠信息_删除
 * @time: 2012-07-02
**/
$(".delinfo").live('click',function(){
	var id = $(this).attr("disnum");
	$.ajax({
		type:"post",
		url:"/uajax/actionDelInfo",
		data:"id="+id,
		dataType:"json",
		async: false,
		success: function(msg)
		{
			if(msg.data.flag == "Success")
			{
				$("#youhui"+id).remove();
			}else
			{
				showerrorinfo('提示',"删除失败！");
			}
		}
	})
})

/**
 * @desc: 优惠信息_新添加一栏
 * @time: 2012-07-02
**/
$("#addDisInfo").live("click", function(){
	var html = '<div id="addshowinfo" class="togdesc"><textarea name="" cols="36" rows="8" class="reldesc" id="addTextareaInfo"></textarea><br/><input type="button" name="subinfo" id="addInfo" value="保存优惠信息"/>　<a href="javascript:void(0)" id="addDelInfo">取消</a></div>';
	$(this).parent().hide();
	$(this).parent().before(html);
})
/**
 * @desc: 优惠信息_添加信息之后_取消
**/
$("#addDelInfo").live("click", function(){
	$(".pvs").show();
	$("#addshowinfo").remove();
})

$("#addInfo").live("click", function(){
	var desctext = $("#addTextareaInfo").val();
	$.ajax({
		type:"post",
		url:"/uajax/actionAddInfo",
		data:"desctext="+desctext,
		dataType:"json",
		async: false,
		success: function(msg)
		{
			if(msg.data.flag == "Success")
			{
				$("#addshowinfo").remove();
				$(".pvs").show();
				var id = msg.data.insertid;
				var html = addhtml(id, desctext);
				$('.pvs').before(html);
			}else
			{
				showerrorinfo('提示',"删除失败！");
			}
		}
	})
})
/**
 * @desc: 生成显示的html代码
 * 
 * @time: 2012-07-02
 * @param: int id
 * @param: int desc
 * @returns {String}
 * @author: jack
**/
function addhtml(id, desc)
{
	var html = '<div id="youhui'+id+'" class="pfob libufo">'
		   html += '<p id="disinfo'+id+'">'+desc+'</p>'
		   html += '<span id="showaction'+id+'" class="pedit pvm dblok">'
		       html += '<a class="editdiscount" disnum="'+id+'" href="javascript:void(0)">编辑</a>'
		       html += '　<a href="javascript:void(0)" disnum="'+id+'" class="delinfo">删除</a>'
		   html += '</span>'
		   html += '<div id="showdisinfo'+id+'" class="togdesc" style="display: none;">'
		       html += '<textarea name="" cols="36" rows="8" class="reldesc" id="showmydescription'+id+'">'+desc+'</textarea><br/>'
		       html += '<input type="button" name="subinfo" disnum="'+id+'" value="保存优惠信息" class="saveinfo"/>　<a href="javascript:void(0)" disnum="'+id+'" class="exitinfo">取消</a>'
		   html += '</div>'
	   html += '</div>'
	return html;
}
/**
* 更新个人资料
*/
function doUpProfile(id)
{
	var desctext = encodeURIComponent($("#update_profile_text").val());
	//var params =  'desctext='+desctext+'&id='+id;
	var params = 'desctext='+desctext+'&id='+id;
	$.ajax({
		type: "post",
		url: "/uajax/updateUserDescription",
		data: params,
		dataType: "json",
		async: false,
		success: function(msg)
		{
			if(msg.data.flag == "Success")
			{
				$("#uchome_desc_update").toggle();
				var textDesc	= '吃货都会写介绍';
				if(msg.data.cont != '')
				{
					textDesc	= msg.data.cont;
				}
				$("#uchome_desc_full").html(textDesc).append('<a href="javascript:void(0)" onclick="upProfile('+id+')">（修改）</a>').show();
			}
			else
			{
				showerrorinfo('提示','更新失败');
			}
		}
	})
}

/**
* 生成更新个人介绍的html
*/
function upProfile(id)
{
	if ( $("#uchome_desc_update").length > 0)
	{
		$("#uchome_desc_full").hide();
		$("#uchome_desc_update").toggle();
		$("#update_profile_text").focus();
	}
}
/**
* 取消更新
*/
function cancelUpProfile()
{
	if ( $("#uchome_desc_update").length > 0)
	{
		$("#uchome_desc_full").toggle();
		$("#uchome_desc_update").toggle();
	}
}

function sendMsg(oid, uid)
{
	if (oid == 0 || uid == 0)
	{
		logindialog();
		return ;
	}
	window.location.href='/message/sendmsg/' + uid;
}

/**
 * @desc: 删除菜贴信息
 * @time: 2012-08-15
**/
$(".caitiedel").click(function(){
	var caitieid = $(this).attr("data-id");
	$.fn.confirm({
		msg:'确定删除这个菜贴？',
		callback:function(){
			$.ajax({
				type:"post",
				url:"/uajax/delCaitieInfo",
				data:"caitieid="+caitieid,
				dataType:"json",
				async: false,
				success: function(msg)
				{
					if(msg.data.info == 'NoLogin')
					{
						logindialog();
					}else if(msg.data.info == 'OK')
					{
						window.location.reload();
					}else
					{
						showerrorinfo('操作错误', '删除失败，请重试！');
					}
				}
			})
		}
	})
})

/**
 * @desc: 导航作品信息
 * @time: 2013-03-02
 *	@author cntnn11
**/
$(".opone").live("mouseover mouseout", function(event){
	if(event.type == 'mouseover')
	{
		$(this).find(".bu_edite").removeClass("hidden");
		$(this).find(".bu_delete").removeClass("hidden");
	}else
	{
		$(this).find(".bu_edite").addClass("hidden");
		$(this).find(".bu_delete").addClass("hidden");
	}
})

/**
 * @desc: 导航作品信息删除
 * @time:2012-06-30
**/
$(".dishdel").click(function(){
	var dishid	= $(this).attr("dishid");
	var cookid	= $(this).attr("cookid");
	var user_id	= $(this).attr("uid");
	$.fn.confirm({
		msg:'确定删除这个作品？',
		callback:function(){
			$.ajax({
				type:"post",
				url:"/uajax/delDish",
				data:"c_id="+cookid+"&user_id="+user_id+"&d_id="+dishid,
				dataType:"json",
				async: false,
				success: function(msg)
				{
					if(msg.data.flag == "OK")
					{
						window.location.reload();
					}else
					{
						showerrorinfo('提示',"删除失败！");
					}
				}
			})
		}
	})
})