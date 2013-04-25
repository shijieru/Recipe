$(window).ready(function(){
	//收藏
	$("#shoucangInfo").click(function(){
		var scValue = $("#shoucangValue").val(); //scValue的值：0：未登陆，1：未收藏，2：收藏
		$("#caidan").addClass("hidden");
		$("#newcaidan").addClass("hidden");
		if(scValue == 0)
		{
            logindialog();
		}else if(scValue == 1)
		{
		    var id = 'favoritdl'
		    var h = $(window).height() / 2 - 150;
		    var w = $(window).width() / 2 - 300;
		    $("#favoritdl").css('top',h);
		    $("#favoritdl").css('left',w);
			$("#favoritdl").dialog({
			    resizable:false,
			    draggable:false,
			    modal:true
			});

			 $(".dlclose").live("click",function(){
			  //  $("#"+id).remove();
			    $("#"+id).dialog("close");
			});

			 $("#favoritdl_close").live("click",function(){
			   // $("#"+id).remove();
			    $("#"+id).dialog("close");
			});
			var cookid = $("#shoucangInfo").attr("data-id");
			$.ajax({
				type:'post',
				url:'/uajax/addDelCollectInfo/'+Math.random(),
				data:'&cookid='+cookid+"&status=0",
				dataType:'json',
				success:function(msg)
				{
					if(msg.data == 'NoLogin')
					{
						logindialog();
					}else if(msg.data == 'HAS')
					{
						alert('此菜谱已收藏！');
					}else if(msg.data == 'EMPTYINFO')
					{
						alert('菜谱不存在！');
					}else if(msg.data == 'ERROR')
					{
						alert('收藏失败！');
					}else
					{
						$("#shoucangValue").val('2');
						$("#shoucangInfo").removeClass("btnsc");
						$("#shoucangInfo").addClass("btnysc");
						$("#shoucangInfo").html("已收藏");
						$("#collectsnum").html(parseInt($("#collectsnum").html()) + 1);
						$("#shoucangTag").removeClass("hidden");

						var userimage = $("#comment_container").find('.coimg > a > img').attr('src');
						var username = $("#comment_container").find('.coimg > a > img').attr('alt');
    					var userurl = $("#comment_container").find('.coimg > a').attr('href');
						html	= '<a href="'+userurl+'" rel="nofollow" target="_blank" title="'+username+'"><img alt="'+username+'" src="'+userimage+'"></a>';
						$("#collectUser").prepend(html);
						if($("#collectUser a").size() > 16)
						{
							$("#collectUser a:last").remove();
						}
					}
				}
			})
		}
	})
	if ($("a[rel='recipe_img']").length > 0)
    {
        $("a[rel='recipe_img']").colorbox();
    }
	//已收藏鼠标移动上面显示，隐藏	end
	$(".shoucanginfoaction").live("mouseover mouseout",function(event){
		var scValue = $("#shoucangValue").val();
		var cookid = $(this).attr("data-id");
		if(scValue == 2)
		{
			if(event.type == 'mouseover')
			{
				$("#shoucangbiaoqian").removeClass("hidden");
			}else
			{
				$("#shoucangbiaoqian").addClass("hidden");
			}
		}
	});
	//登陆__隐藏
	$(".scengx").click(function(){
		$(this).parent().addClass("hidden");
	})
	//点击加入菜单__弹出显示
	$(".btnjdb").click(function(){
		$("#shoucangTag").addClass("hidden");
		$("#newcaidan").dialog("close");
		$("#newcaidan").addClass("hidden");
		var cook_id = $("#shoucangInfo").attr("data-id");
		$("#error_area").html("");
		$("#caidanTitleError").html("");
		$.ajax({
			type: 'post',
			url: '/uajax/getcaidan',
			data: 'cookid='+cook_id,
			dataType: 'json',
			success: function(msg)
			{
				if(msg.data == "nologin")
				{
                    logindialog();
				}else if(msg.data == "nocook")
				{
					showerrorinfo('提示', '此菜谱信息不存在！');
				}else if(msg.status == 'OK')
				{
					var h = $(window).height() / 2 - 150;
			    	var w = $(window).width() / 2 - 300;
					if(msg.data == '')
					{
						$("#newcaidan").css('top',h);
			    		$("#newcaidan").css('left',w);
						$("#newcaidan").dialog({
					        resizable:false,
					        draggable:false,
					        modal:true
				    	});
						$("#newcaidan").removeClass("hidden");
						$("#caidan").addClass("hidden");
					}else
					{
						$("#caidan").css('top',h);
			    		$("#caidan").css('left',w);
						$("#caidan").dialog({
					        resizable:false,
					        draggable:false,
					        modal:true
				    	});
						$(".menuzi").html(msg.data);
						$("#caidan").removeClass("hidden");
					}
				}
			}
		})
	})
	//添加菜单分组信息
	$("#doLogin").live('click',function(){
		var caidangroupid = $("input[name=caidangroup]:checked").val();
		var cook_id = $("#shoucangInfo").attr("data-id");
		var caipuid = $("#caidanid").val();
		if(caidangroupid)
		{
			$.ajax({
				type: 'post',
				url: '/uajax/addCaidanGroup',
				data: 'cdgroupid='+caidangroupid+'&cookid='+cook_id+"&caipuid="+caipuid,
				dataType: 'json',
				success: function(msg)
				{
					if(msg.data == 'OK')
					{
						$("#caidanGroupDialogIndex").dialog('close');
					}else if(msg.data == 'Fail')
					{
						showerrorinfo('提示', '菜单分组添加失败！');
						$("#caidanGroupDialogIndex").dialog('close');
					}else
					{
						logindialog();
					}
				}
			})
		}else
		{
			$("#caidanGroupDialogIndex").dialog('close');
		}
	})
	//创建一个新的菜单
	$(".createCaiDan").click(function(){
		var h = $(window).height() / 2 - 150;
    	var w = $(window).width() / 2 - 300;
    	$("#newcaidan").css('top',h);
    	$("#newcaidan").css('left',w);
		 $("#newcaidan").dialog({
	        resizable:false,
	        draggable:false,
	        modal:true
	    });
	    $("#caidanTitle").val('菜单标题(必填)');
	    $("#caidanjieshao").val('菜单介绍');
		$("#caidan").dialog("close");
		$("#newcaidan").removeClass("hidden");
		$("#caidanGroupDialogIndex").remove();
	})
	//点击收藏_隐藏标签的弹出框
	$("#quxiao").click(function(){
		$(this).parent().parent().addClass("hidden");
	})
	//显示的菜单__隐藏
	$(".scengx").click(function(){
		$(this).parent().addClass("hidden");
	})
	//隐藏菜单分组信息
	$(".caidangroup").live('click', function(){
		$("#caidanGroupDialogIndex").remove();
	});
	//其他N道菜谱信息
	$(".otoxer2").click(function(){
		if($(".othereci").hasClass("hidden"))
		{
			$(this).removeClass('otoxer2').addClass('otoxer');
			$(".othereci").removeClass("hidden");
		}else
		{
			$(this).removeClass('otoxer').addClass('otoxer2');
			$(".othereci").addClass("hidden");
		}
	})
	$("#cooktagInput").click(function(){
		$(this).find('input').focus();
	})
})
//取消收藏
$("#exitshoucang").click(function(){
	var cookid = $("#shoucangInfo").attr("data-id");
	$.ajax({
		type: 'post',
		url: '/uajax/addDelCollectInfo',
		data: 'cookid='+cookid+'&&status=1',
		dataType: 'json',
		success: function(msg)
		{
			if(msg.data == 'NoLogin')
			{
				logindialog();
			}else if(msg.data == 'OK')
			{
			        //$("#favoritdl").remove();
			        $("#favoritdl").dialog("close");
				$("#shoucangValue").val('1');
				$("#shoucangInfo").removeClass("btnysc");
				$("#shoucangInfo").addClass("btnsc");
				$("#shoucangbiaoqian").addClass("hidden");
				$("#shoucangInfo").html("收藏");
				$("#collectsnum").html(parseInt($("#collectsnum").html()) - 1);
				var username = $("#comment_container").find('.coimg > a > img').attr('alt');
    			$("#collectUser a[title="+username+"]").remove();
			}else
			{
				showerrorinfo('提示', '取消收藏失败！');
			}
		}
	})
})

$("#updatetaginfo").click(function(){
		    var id = 'favoritdl'
		    var h = $(window).height() / 2 - 150;
		    var w = $(window).width() / 2 - 300;
		    $("#favoritdl").css('top',h);
		    $("#favoritdl").css('left',w);
			$("#favoritdl").dialog({
			    resizable:false,
			    draggable:false,
			    modal:true
			});

			 $(".dlclose").live("click",function(){
			  //  $("#"+id).remove();
			    $("#"+id).dialog("close");
			});

			 $("#favoritdl_close").live("click",function(){
			   // $("#"+id).remove();
			    $("#"+id).dialog("close");
			});
			var cookid = $("#shoucangInfo").attr("data-id");
			$.ajax({
				type:'post',
				url:'/uajax/addDelCollectInfo',
				data:'&cookid='+cookid+"&status=0",
				dataType:'json',
				success:function(msg)
				{
					if(msg.data == 'NoLogin')
					{
						logindialog();
					}else if(msg.data == 'HAS')
					{
						alert('此菜谱已收藏！');
					}else if(msg.data == 'EMPTYINFO')
					{
						alert('菜谱不存在！');
					}else if(msg.data == 'ERROR')
					{
						alert('收藏失败！');
					}else
					{
						$("#shoucangValue").val('2');
						$("#shoucangInfo").removeClass("btnsc");
						$("#shoucangInfo").addClass("btnysc");
						$("#shoucangInfo").html("已收藏");
						$("#collectsnum").html(parseInt($("#collectsnum").html()) + 1);
						$("#shoucangTag").removeClass("hidden");

						var userimage = $("#comment_container").find('.coimg > a > img').attr('src');
						var username = $("#comment_container").find('.coimg > a > img').attr('alt');
    					var userurl = $("#comment_container").find('.coimg > a').attr('href');
						html	= '<a href="'+userurl+'" rel="nofollow" target="_blank" title="'+username+'"><img alt="'+username+'" src="'+userimage+'"></a>';
						$("#collectUser").prepend(html);
						if($("#collectUser a").size() > 16)
						{
							$("#collectUser a:last").remove();
						}
					}
				}
			})
})
function showNextCaipu(obj)
{
	var cook_id	= $("#page_cm_id").attr('val');
	var user_id	= $("#page_cm_id").attr('uid');
	var offset	= parseInt($("#otherCaipusList").attr('val'));
	var max		= parseInt($("#otherCaipusList").attr('max'));
    if (offset == 1)
    {
        $("#left_btn").attr('class','btn_next obtn blef');
    }
	if (offset <= 0) return false;
    if ((offset + 1)* 4 >= max)
    {
        $("#right_btn").attr('class','btn_pre2 obtn brigh');
    }
    if((offset)* 4 >= max)
    {
		return false;
    }
    $(".othloading").show();
	$.ajax({
		type: 'post',
		url: '/ajax/getOtherCaipus/' + user_id + '/' + cook_id + '/' + offset,
		dataType: 'json',
		success: function(msg)
		{
			if (msg.data != '')
			{
				offset	= offset + 1;
				$("#otherCaipusList").attr('val', offset);
				$("#otherCaipusList").html(msg.data);
			}

		}
	})
	$(".othloading").fadeOut();
}
function showPrevCaipu(obj)
{
	var cook_id	= $("#page_cm_id").attr('val');
	var user_id	= $("#page_cm_id").attr('uid');
	var offset	= parseInt($("#otherCaipusList").attr('val'));
	var max		= parseInt($("#otherCaipusList").attr('max'));
	if (offset > 1)
    {
        $("#right_btn").attr('class','btn_pre obtn brigh');
    }
	if ((offset - 2) <= 0)
	{
		offset = 0;
	}
	else
	{
		offset = offset - 2;
	}
	if (offset < 0)
    {
        return false;
    }
    if (offset < 2)
    {
        $("#left_btn").attr('class','btn_next2 obtn blef');
    }
    $(".othloading").show();
	$.ajax({
		type: 'post',
		url: '/ajax/getOtherCaipus/' + user_id + '/' + cook_id + '/' + offset,
		dataType: 'json',
		success: function(msg)
		{
			if (msg.data != '')
			{
				offset	= offset == 0 ? 1 : offset;
				$("#otherCaipusList").attr('val', offset);
				$("#otherCaipusList").html(msg.data);
			}

		}
	})
    $(".othloading").fadeOut();
}
function showOtherCaipu()
{
	var cookid = $("#shoucangInfo").attr("data-id");
	$("#othercaipusdiv").toggle();
}

/**
 * @desc:添加收藏数
 * @return:{json}
**/
function addShouCangInfo()
{
	var cook_id = $("#shoucangInfo").attr("data-id");
	var mpadstr = $(".bime").length;
	var tagname = '';
	if(mpadstr > 0)
	{
		for(var i = 0; i < mpadstr; i++)
        {
			var char = ((mpadstr-1) == i) ? ' ' : ',';
			tagname += $(".bime").find("input").eq(i).val() + char;
        }
	}
	$.ajax({
		type: 'post',
		url: '/uajax/addTagInfo',
		data: 'cookid='+cook_id+"&tags="+tagname,
		dataType: 'json',
		success: function(msg)
		{
			if(msg.data.info == "NoLogin")
			{
				logindialog();
			}else if(msg.data.info == "NoCookinfo")
			{
				showerrorinfo('菜谱信息', '没有本菜谱信息！');
			}else if(msg.data.info == 'OK')
			{
				$(".scengx").parent().addClass("hidden");
				//$("#displaytag").html(msg.data.tag);
				$("#shoucangInfo").removeClass("btnsc");
				$("#shoucangInfo").addClass("btnysc");
				$("#shoucangInfo").html("已收藏");
			}else
			{
				showerrorinfo('操作错误', '添加标签操作失败！');
			}
		}
	})
}

/**
 * @desc: 添加菜谱组信息
 * @param int $cid
**/
function caidanInfo(cid)
{
	var checkboxValue = $("#caidaninfo"+cid).hasClass("checkeding");
	if(checkboxValue)
	{
		$("#caidaninfo"+cid).removeClass("checkeding");
		$.ajax({
			type: 'post',
			url: '/uajax/getcaidanGroup',
			data: 'caipuid='+cid,
			dataType: 'json',
			success: function(msg)
			{
				if(msg.data != 'nodata')
				{
					var str = '<input type="hidden" name="caidanid" id="caidanid" value="'+cid+'"/>';
					tipCaidanGroup(str + msg.data);
					$("#caidanGroupDialogIndex").dialog();
				}
			}
		})
	}else
	{
		$("#caidaninfo"+cid).addClass("checkeding");
	}
}

/**
 * @desc: 添加新的菜单
 * @time: 2012-07-10
**/
function addSaveCaidan()
{
	var caidantitle = $("#caidanTitle").val();
	$("#caidanTitleError").html('');
	if(caidantitle == '' || caidantitle == '菜单标题(必填)')
	{
		$("#caidanTitleError").html('请填写菜单标题');
		return false;
	}
	var caidanjieshao = $("#caidanjieshao").val();
	var cook_id = $("#shoucangInfo").attr("data-id");
	$.ajax({
		type: 'post',
		url: '/uajax/addCaidanInfo',
		data: 'cookid='+cook_id+"&caidantitle="+caidantitle+"&caidanjieshao="+caidanjieshao,
		dataType: 'json',
		success: function(msg)
		{
			if(msg.data == "nologin")
			{
				logindialog();
			}else if(msg.data == "nocook")
			{
				showerrorinfo('温馨提示', '此菜谱信息不存在哦！');
			}else if(msg.data == 'OK')
			{
				showerrorinfo('温馨提示', '此菜单信息添加成功！');
				$('#newcaidan').dialog('close');
			}else
			{
				showerrorinfo('操作错误', '此菜单信息添加失败！');
			}
		}
	})
}


/**
 * @desc:添加已经有的菜单信息
 * @return: json $json
**/
function addHasCaidan()
{
	var arrnochecked =[];
	var arrchecked = [];
	var arrcheckednum = [];
	$("input[name='caidan_id[]']").each(function(){
		if($(this).attr('oldchecked') == 'checked' && $(this).is(':checked') == false)
		{
			arrnochecked.push($(this).val());
		}
		if($(this).attr('oldchecked') == '' && $(this).is(':checked') == true)
		{
			arrchecked.push($(this).val());
		}
		if($(this).is(':checked') == true)
		{
			arrcheckednum.push($(this).val());
		}
	});
	var cook_id = $("#shoucangInfo").attr("data-id");
	if(arrcheckednum == '')
	{
		 $("#error_area").html('提示: 亲，你没有选择菜单哦！');
		return false;
	}
	$.ajax({
		type: 'post',
		url: '/uajax/addCaidanTitleInfo',
		data: 'cookId='+cook_id+"&arrnochecked="+arrnochecked+"&arrchecked="+arrchecked,
		dataType: 'json',
		success: function(msg)
		{
			if(msg.data == "nologin")
			{
				$("#nologinshoucang").removeClass("hidden");
			}else if(msg.data == "Fail")
			{
				showerrorinfo('提示', '此菜单信息添加失败！');
			}else if(msg.data == 'OK')
			{
				showerrorinfo('提示', '此菜单信息添加成功！');
				$('#caidan').dialog('close');
			}else
			{
				showerrorinfo('提示', '此菜单信息添加失败！');
			}
		}
	})
}

$(".deleteCook").click(function(){
	var cook_id = $(this).attr("data-id");
	var user_id	= $("#page_cm_id").attr('uid');
	$.fn.confirm({
		msg:'确定删除这个菜谱？',
		callback:function(){
			$.ajax({
				type:"post",
				url:"/uajax/actionDelCaipu",
				data:"cookid="+cook_id+"&uid="+user_id,
				dataType:"json",
				async: false,
				success: function(msg)
				{
					if(msg.data.flag == "Success")
					{
						window.location.href = '/caipu/';
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
 *@desc:点击取消，取消不同的弹出框
**/
function disHidden(id)
{
	if(id == 1)
	{
		$("#caidan").addClass("hidden");
	}else
	{
		$("#newcaidan").addClass("hidden");
	}
}
function isBaiduLogin(cid)
{
	var h  = $(window).height() / 2 - 200;
    var w  = $(window).width() / 2 - 250;
    var id = 'bdyunceng';
    var html='<div id="' + id + '" randnum="'+ parseInt(1000*Math.random()) +'" class="bdyunceng r5" style="z-index: 9999; top: '+ h +'px; left: '+ w +'px; position: fixed; width:500px;height:380px;">';
            html += '<div class="bdyuncontent clearfix" style="width:500px;height:380px;">';
                html += '<a href="javascript:void(0);" class="scengb dlclose"></a>';
                     html += '<div class="tith">';
				 	 html += '<h3>保存到百度云盘</h3>';
					 html += '</div>';
					 html += '<iframe id="bdyun_frame" src="/api/baidu_pcs/'+cid+'" height="400" width="500"></iframe>'
            html += '</div>';
        html += '</div>';
    $('body').append(html);
    $("#"+id).dialog({
        resizable:false,
        draggable:false,
        modal:true
    });
    $(".dlclose").live("click",function(){
        $("#"+id).remove();
        $("#"+id).dialog("close");
    });
}
function closeBaiduCeng()
{
	$("#bdyunceng").remove();
    $("#bdyunceng").dialog("close");
}
