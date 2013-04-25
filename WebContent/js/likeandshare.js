/**
 * @desc: 美食日记__喜欢效果
 * @time:2012-07-02
 * userimage 获得登陆用户logo
 * username 获得登陆用户name
 * userurl 获得登陆用户url
 * 点击‘赞’后立即显示用户图片
**/
$(".like").live("click", function(){        
	if ($(this).hasClass('dialike')){ return false;}
	if ($(this).hasClass('dialike2')){ return false;}
	var dietid = $(this).attr("dietid");
    var userimage = $("#comment_container").find('.coimg > a > img').attr('src');
    var username = $("#comment_container").find('.coimg > a > img').attr('alt');
    var userurl = $("#comment_container").find('.coimg > a').attr('href');
	params="dietid="+dietid;
	$.ajax({
		type : 'post',
		url : '/uajax/addfavNum',
		data : params,
		dataType : 'json',
		success : function(msg) 
		{
			if(msg.data.flag == 'NoLogin')
			{
				logindialog();
			}else if(msg.data.flag == 'OK')
			{
                $(".creno").parent().attr('class','xrenzan clearfix');
                var hasnum = '';
				hasnum= $(".creno").parent().find('h3 a').html();
                if(hasnum && $(".creno").parent().attr('class') == 'xrenzan clearfix')
                {
                    newnum    = new Number(hasnum.substr(1,hasnum.length-2));
                    $(".creno").parent().find('h3 a').html('('+(++newnum)+')');
                }
                if($(".creno > a").html())
                {
                    $(".creno > a").first().before("<a href='"+userurl+"' title='"+username+"' target='_blank'><img alt='"+username+"' src='"+userimage+"' /></a>");
                }
                else
                {
                    $(".creno").append("<a href='"+userurl+"' title='"+username+"' target='_blank'><img alt='"+username+"' src='"+userimage+"' /></a>");
                }
                
				if ($("#like"+dietid).hasClass('dilike'))
				{
					$("#like"+dietid).removeClass('dilike').addClass('dialike');
				}
				/*if ($("#like"+dietid).hasClass('dilike2'))
				{
					$("#like"+dietid).removeClass('dilike2').addClass('dialike2');
				}*/
				$("#like"+dietid).html('<a href="javascript:void(0);">赞'+msg.data.favs+'</a>');$(this).html('<a href="javascript:void(0);">赞'+msg.data.favs+'</a>');
			}
		}
	})
	$(window).bind("scroll", showMoreDiet);
})

/**
 * @desc: 分享显示和隐藏
 * @time: 2012-07-02
**/
$(".share").live("mouseover mouseout", function(event){
	if(event.type == 'mouseover')
	{
		$("#shareinfo").removeClass("hidden");
	}else
	{
		$("#shareinfo").addClass("hidden");
	}
})


/**
 * @desc: 美食日记页面——》分享隐藏，显示
**/
$(".difenx").live('mouseover mouseout', function(event){
	var id = $(this).attr("id");
	if(event.type == 'mouseover')
	{
		$("#share"+id).removeClass("hidden");
	}else
	{
		$("#share"+id).addClass("hidden");
	}
})
$(".guanzhu").live('click', function(){
	var userid = $(this).attr("userid");
	//没关系
	var info = 'add';
	var bool = $(this).hasClass("careadd");
	if(!bool)
	{
		//我的好友.相互关注
		info = 'del';
		bool = $(this).hasClass("careyed carehxd");
	}
	var params = "userid="+userid+"&info="+info;
	$.ajax({
		type : 'post',
		url : '/uajax/addDelFriend',
		data : params,
		dataType : 'json',
		success : function(msg) 
		{
			if(msg.data.flag == 'NoLogin')
			{
				logindialog();
			}else if(msg.data.flag == 'Success')
			{
				if(msg.data.status == 0 || msg.data.status == -1)
				{
					$("#guanzhu"+userid).removeClass("carehxd");
					$("#guanzhu"+userid).removeClass("careyed");
					$("#guanzhu"+userid).addClass("careadd");
					$("#guanzhu"+userid).attr("title", '+关注');
				}else if(msg.data.status == 1)
				{
					$("#guanzhu"+userid).removeClass("carehxd");
					$("#guanzhu"+userid).removeClass("careadd");
					$("#guanzhu"+userid).addClass("careyed");
					$("#guanzhu"+userid).attr("title", '取消关注');
				}else
				{
					$("#guanzhu"+userid).removeClass("careyed");
					$("#guanzhu"+userid).removeClass("careadd");
					$("#guanzhu"+userid).addClass("carehxd");
					$("#guanzhu"+userid).attr("title", '取消关注');
				}
			}
		}
	})
})

$(".uc_guanzhu").live('click',function(){
	var userid = $(this).attr("userid");
	//没关系
	var info = 'add';
	var bool = $(this).hasClass("baddf");
	if(!bool)
	{
		//我的好友.相互关注
		info = 'del';
		bool = $(this).hasClass("barightf baeachf");
	}
	var params = "userid="+userid+"&info="+info;
	$.ajax({
		type : 'post',
		url : '/uajax/addDelFriend',
		data : params,
		dataType : 'json',
		success : function(msg) 
		{
			if(msg.data.flag == 'NoLogin')
			{
				logindialog();
			}else if(msg.data.flag == 'Success')
			{
				if(msg.data.status == 0 || msg.data.status == -1)
				{
					$("#guanzhu"+userid).removeClass("barightf");
					$("#guanzhu"+userid).removeClass("baeachf");
					$("#guanzhu"+userid).addClass("baddf");
					$("#guanzhu"+userid).attr("title", '关注');
				}else if(msg.data.status == 1)
				{
					$("#guanzhu"+userid).removeClass("baeachf");
					$("#guanzhu"+userid).removeClass("baddf");
					$("#guanzhu"+userid).addClass("barightf");
					$("#guanzhu"+userid).attr("title", '取消关注');
				}else
				{
					$("#guanzhu"+userid).removeClass("barightf");
					$("#guanzhu"+userid).removeClass("baddf");
					$("#guanzhu"+userid).addClass("baeachf");
					$("#guanzhu"+userid).attr("title", '取消关注');
				}
			}
		}
	})
})

/**
 * @desc:新浪微博邀请信息
 * @time:2012-09-21
**/
$("#useryaoqinginfo").click(function(){
	var type = $(this).attr("type");
	var params = 'type='+type;
	$.ajax({
		type : 'post',
		url : '/uajax/sendyaoqing',
		data : params,
		dataType : 'json',
		success : function(msg) 
		{
			if(msg.data.info == 'NOLOGIN')
			{
				logindialog();
			}else if(msg.data.info == 'OK')
			{
				showerrorinfo('提示信息', '邀请成功，微博已发送！');
			}else if(msg.data.info == 'Fail')
			{
				showerrorinfo('提示信息', '邀请失败，请重新使用微博账号登陆！');
			}
		}
	})
})

/**
 *      关注功能
 *      2013－03－21
 */
//newgz jiaf    newgz quxiaof
$(".newgzz").live('click', function(){
	var userid = $(this).attr("userid");
	//没关系
	var info = 'add';
	var bool = $(this).hasClass("careadd2");
	if(!bool)
	{
		//我的好友.相互关注
		info = 'del';
		bool = $(this).hasClass("quxiaof");
	}
	var params = "userid="+userid+"&info="+info;
	$.ajax({
		type : 'post',
		url : '/uajax/addDelFriend',
		data : params,
		dataType : 'json',
		success : function(msg)
		{
			if(msg.data.flag == 'NoLogin')
			{
				logindialog();
			}else if(msg.data.flag == 'Success')
			{
				if(msg.data.status == 0 || msg.data.status == -1)
				{
					$("#guanzhu"+userid).removeClass("careyed2");
					$("#guanzhu"+userid).removeClass("carehxd");
					$("#guanzhu"+userid).addClass("careadd2").html('+关注');
					$("#guanzhu"+userid).attr("title", '+关注');
					$("#guanzhu"+userid).attr("onmouseout", '$(this).removeClass("carehqxd").html("+关注")');
					$("#guanzhu"+userid).removeAttr("onmouseover");
				}else if(msg.data.status == 1)
				{
					$("#guanzhu"+userid).removeClass("careadd2");
					$("#guanzhu"+userid).removeClass("carehxd");
					$("#guanzhu"+userid).addClass("careyed2").html('已关注');
					$("#guanzhu"+userid).attr("title", '取消关注');
					$("#guanzhu"+userid).attr("onmouseover", '$(this).addClass("carehqxd").html("取消关注")');
					$("#guanzhu"+userid).attr("onmouseout", '$(this).removeClass("carehqxd").html("已关注")');
					$("#guanzhu"+userid).attr("onclick", '$(this).removeClass("carehqxd").html("")');
				}else
				{
					$("#guanzhu"+userid).removeClass("careadd2");
					$("#guanzhu"+userid).removeClass("careyed2");
					$("#guanzhu"+userid).addClass("careyed2").html('互相关注');
					$("#guanzhu"+userid).attr("title", '取消关注');
					$("#guanzhu"+userid).attr("onmouseover", '$(this).addClass("carehqxd").html("取消关注")');
					$("#guanzhu"+userid).attr("onmouseout", '$(this).html("互相关注")');
					$("#guanzhu"+userid).attr("onclick", '$(this).removeClass("carehqxd").html("")');
				}
			}
		}
	})
})

	//list页面赞
	$('.likeId a').click(function(){
		var obj	= $(this);
		if(parseInt(obj.attr('dishid')))
		{
			var id		= obj.attr('dishid');
			var params	= "&d_id="+id;
			$.ajax({
				type : 'post',
				url	 : '/uajax/addDishFav',
				data : params,
				dataType : 'json',
				success : function(msg){
					if(msg.data.flag == 'NoLogin')
					{
						logindialog();
					}
					else
					{
						if(msg.status == 'OK')
						{
							obj.html('已喜欢('+parseInt(msg.data.favs)+')');
							obj.removeClass('btnilike').addClass('btndilike');
						}
					}
				}
			});
		}
	});