$(document).ready(function() {
	var $global_search_tips = 'Search for user, recipe, diary';
	if ($("#global_search_inpt").length > 0) {
		$("#global_search_inpt").focus(function() {
			if ($(this).val() == $global_search_tips) {
				$(this).val('');
			}
		}).blur(function() {
			if ($(this).val() == '') {
				$(this).val($global_search_tips);
			}
		})
	}

})

function Search() {
	var url = $("#searchForm").attr('action');
	if ($("#global_search_inpt").val() == ''
			|| $("#global_search_inpt").val() == 'Search recipe, user, diary') {
		$("#global_search_inpt").val('Search recipe, user, diary');
		location.href = url + buildURL('');
		return false;
	} else {
		location.href = url + buildURL($("#global_search_inpt").val());
	}
	return false;
}
function JS_HoverToggle() {
	$('[JS_SHT]').hover(JS_hoverShow, JS_hoverHide);
	function JS_hoverShow() {
		obj = $(this);
		$('[JS_DHT=' + obj.attr('JS_SHT') + ']').show();
	}
	function JS_hoverHide() {
		obj = $(this);
		$('[JS_DHT=' + obj.attr('JS_SHT') + ']').hide();
	}
}
function JS_PlaceHolder() {
	$('input[JS_PHN]').live('blur', JS_placeBlur);
	$('input[JS_PHN]').live('focus', JS_placeFocus);
	function JS_placeBlur() {
		var obj = $(this);
		if (obj.val() == '' || $.trim(obj.val()) == '') {
			obj.val(obj.attr('JS_PHN'));
		}
	}
	function JS_placeFocus() {
		var obj = $(this);
		if (obj.val() == obj.attr('JS_PHN')
				|| $.trim(obj.val()) == obj.attr('JS_PHN')) {
			obj.val('');
		}
	}
}

function JS_CheckEmail() {
	var errtag = true;
	var email = arguments[0];
	var suc = arguments[1];
	var err = arguments[2];
	var emalr = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
	var checktype = arguments[3];
	if (email == '') {
		err('Please input email address');
		return false;
	}
	if (emalr.test(email)) {
		// don't using json
		arguments[1]();
		if (arguments[3]) {
			$
					.ajax({
						type : 'post',
						url : '/ajax/checkmail',
						data : '&email=' + email,
						async : false,
						dataType : 'json',
						success : function(msg) {
							if (msg.status == 'OK') {
								if (msg.data == 'OK') {
									if (checktype == 'login') {
										errtag = false;
										err('This email not registered<a href="register.do" target="_self">Join in</a>');
									} else if (checktype == 'register') {

										errtag = true;
										suc();
									} else if (checktype == 'haveBinding') {
										errtag = false;
										err('This email is not registered, cannot bind');
									}
								} else {
									if (checktype == 'login') {
										errtag = true;
										suc();
									} else if (checktype == 'register') {
										errtag = false;
										err('This email has been registered');
									} else if (checktype == 'haveBinding') {
										errtag = true;
										suc();
									}
								}
							} else {
								errtag = false;
								err('Please input email address in a right way');
							}
						}
					})
			return errtag;
		} else {
			if (arguments[1] != undefined && $.isFunction(arguments[1])) {
				arguments[1]();
			}
			return true;
		}
	} else {
		if (arguments[2] != undefined && $.isFunction(arguments[2])) {
			arguments[2]('Please input email address in a right way');
		}
		return false;
	}
}

function JS_CheckNickname() {
	var errortag = true;
	var nickname = arguments[0];
	var su = arguments[1];
	var er = arguments[2];
	nickname = $.trim(nickname);
	$("#nickname").val(nickname);
	regnickname = /^[0-9A-Za-z_\u4E00-\u9FA5]{0,}$/;
	if (regnickname.test(nickname)) {
		if (strlen(nickname) >= 2 && strlen(nickname) <= 32) {
			$
					.ajax({
						type : 'post',
						url : '/ajax/checknickname',
						data : '&nickname=' + nickname,
						async : false,
						dataType : 'json',
						success : function(msg) {
							if (msg.status == 'OK') {
								errortag = false;
								if (er != undefined && $.isFunction(er)) {
									er('This user name is exist, please enter another');
								}
							} else {
								errortag = true;
								if (su != undefined && $.isFunction(su)) {
									su();
								}
							}
						}
					})
			return errortag;
		} else {
			if (arguments[2] != undefined && $.isFunction(arguments[2])) {
				if (strlen(nickname) > 32) {
					arguments[2]
							('Please keep user name less than 16 characters');
				} else {
					if (nickname == '') {
						arguments[2]('Please input your user name');
					} else {
						arguments[2]('user name is too short');
					}
				}
			}
			return false;
		}
	} else {
		arguments[2]('support english, figure and _');
		return false;
	}
}

function JS_CheckPassword() {
	var pwd = arguments[0];
	if (pwd != '' && pwd.length >= 6) {
		if (arguments[1] != undefined && $.isFunction(arguments[1])) {
			arguments[1]();
		}
		return true;
	} else {
		if (arguments[2] != undefined && $.isFunction(arguments[2])) {
			if (pwd == '') {
				arguments[2]('Please input password');
			} else {
				arguments[2]
						('The length should between 6-20, please donot include space');
			}
		}
		return false;
	}
}

function JS_Login() {
	var username = arguments[0];
	var passwd = arguments[1];
	var remember = arguments[2];
	var loginsce = arguments[3];
	var loginerror = arguments[4];
	$.ajax({
		type : 'post',
		url : '/ajax/login',
		data : '&username=' + username + '&passwd=' + passwd + '&rem='
				+ remember,
		dataType : 'json',
		success : function(msg) {
			if (msg.status == 'OK') {
				// if ok flush the login form
				loginsce(msg.data);
			} else {
				loginerror(msg.data);
			}
		}
	})
	return false;
}

function JS_Signup() {
	var username = arguments[0];
	var pwd = arguments[1];
	var nickname = arguments[2];
	var loginsce = arguments[3];
	var loginerror = arguments[4];
	var code = '';
	if ($("#signupcode").length > 0) {
		code = $("#signupcode").val();
	}
	$.ajax({
		type : 'post',
		url : '/ajax/signup',
		data : '&user=' + username + '&pwd=' + pwd + '&nickname=' + nickname
				+ "&code=" + code,
		dataType : 'json',
		async : false,
		success : function(msg) {
			if (msg.status == 'OK') {
				loginsce();
			} else {
				loginerror(msg.data);
			}
		}
	})
}

function isChinese(str) {
	var lst = /[u00-uFF]/;
	return !lst.test(str);
}
function strlen(str) {
	var strlength = 0;
	for (i = 0; i < str.length; i++) {
		if (isChinese(str.charAt(i)) == true)
			strlength = strlength + 2;
		else
			strlength = strlength + 1;
	}
	return strlength;
}
function loadding() {
	if (arguments[0]) {
		var obj = arguments[0];
	} else {
		return false;
	}
	var showstatus = arguments[1] != undefined && arguments[1] == false ? true
			: false;
	var loaddingimg = $('<img src="/img/loading.gif" />');
	this.stop = function() {
		obj.show();
		if (obj.prev().is('img[src=/img/loading.gif]')) {
			obj.prev().remove();
		}
	}
	this.loadding = function() {
		obj.toggle(showstatus);
		obj.before(loaddingimg);
	}
	return this;
}

function showerrorinfo(title, str) {
	var h = $(window).height() / 2 - 90;
	var w = $(window).width() / 2 - 142;
	var id = 'showerrorinfo';
	var html = '<div id="' + id + '" randnum="'
			+ parseInt(1000 * Math.random())
			+ '" class="ibdceng r5" style="z-index:9999; top:' + h
			+ 'px; left:' + w + 'px; position:fixed;display:block;">'
	html += '<div class="wrcontent">'
	html += '<a href="javascript:void(0);" class="scengb dlclose"></a>'
	html += '<div class="tith">'
	html += '<h3 class="pll">' + title + '</h3>'
	html += '</div>'
	html += '<div class="wrmword">'
	html += str;
	html += '</div>'
	html += '</div>'
	html += '</div>';
	$('body').append(html);
	$("#" + id).dialog({
		resizable : false,
		draggable : false,
		modal : true
	});
	setTimeout(function() {
		$("#" + id).dialog("close");
	}, 2000);
	$(".dlclose").live("click", function() {
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
}
function getCookies(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	var expires = new Date();
	expires.setTime(expires.getTime() + seconds);
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
			+ (expires ? '; expires=' + expires.toGMTString() : '')
			+ (path ? '; path=' + path : '/')
			+ (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
}

// jQuery.confirm
(function($) {
	var h = $(window).height() / 2 - 110;
	var w = $(window).width() / 2 - 210;
	var confirmBoxIndex = 0;
	$.fn.confirm = function(options) {
		var defaults = {
			yes : '������',
			no : '������',
			title : '������������',
			msg : 'error',
			callback : null
		};
		var opts = $.extend(defaults, options);
		confirmBoxIndex++;
		var id = "confirmBox" + confirmBoxIndex;
		var html = '<div id="' + id + '" randnum="'
				+ parseInt(1000 * Math.random())
				+ '" class="ibdceng r5" style="z-index:9999;top:' + h
				+ 'px;left:' + w + 'px;position:fixed;display:block;">';
		html += '<div class="wrcontent" style="width:415px;height:200px;">';
		html += '<a href="javascript:void();" class="dlclose scengb"></a>';
		html += '<div class="tith">';
		html += '<h3 class="pll">������</h3>';
		html += '</div>';
		html += '<div class="ltowb">';
		html += opts.msg;
		html += '</div>';
		html += '<div class="butbo">';
		html += '<button  type="button" class="yes btnqubang mrm">������</button>';
		html += '<button  type="button" class="no btnzais">������</button>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		$('body').append(html);
		var dialog = $('#' + id).dialog({
			title : opts.title,
			width : 285,
			resizable : false,
			draggable : true,
			modal : true,
			close : function(event, ui) {
				$(this).dialog('destory').remove();
			}
		});
		$(".yes").click(function() {
			$("#" + id).remove();
			$("#" + id).dialog('close');
			opts.callback();
		});
		$(".no").click(function() {
			$("#" + id).remove();
			$("#" + id).dialog('close');
		});
		$(".dlclose").click(function() {
			$("#" + id).remove();
			$("#" + id).dialog('close');
		});
		return dialog;
	};
})(jQuery);

function checkemail(checktype, emailid) {
	var checktype = arguments[0];
	if (arguments[1] == undefined) {
		var emailid = 'email';
	} else {
		var emailid = arguments[1];
	}
	return JS_CheckEmail($('#' + emailid).val(), oktip($('#' + emailid)),
			errortip($('#' + emailid)), checktype);
}

function chgCaptcha() {
	if ($("#codeimg").length > 0) {
		var t = new Date();
		$("#codeimg").attr('src', '/ajax/captcha?t=' + t.getTime());
	}
}
function checkpassword() {
	if ($("#jiaoyanma_div").length > 0) {
		$("#jiaoyanma_div")
				.html(
						'<div class="yanma ml70"><input id="signupcode" name="signupcode" value="" onblur="checkcode()" class="yzmtext r5" maxlength="4" type="text" placeholder="���������������"> <img class="czl mls mrs" width="100" height="30" id="codeimg" src="/ajax/captcha"> <a href="javascript:void(0);" onclick="chgCaptcha();">���������</a>');
	}
	if (arguments[0] == undefined) {
		var passwdid = 'passwd';
	} else {
		var passwdid = arguments[0];
	}
	return JS_CheckPassword($('#' + passwdid).val(), oktip($('#' + passwdid)),
			errortip($('#' + passwdid)));
}
function dialogchecknickname() {
	return JS_CheckNickname($('#nickname').val(), oktip($('#nickname')),
			errortip($('#nickname')));
}
function errortip(obj) {
	var text = 'Error';
	return function() {
		if (arguments[0] != undefined && arguments[0] != '') {
			text = arguments[0];
		}
		obj.parents('.iput').next().html(text).addClass('lowrong').addClass(
				'mll').removeClass('loright').removeClass('mtl15');
	}
}
function oktip(obj) {
	return function() {
		obj.parents('.iput').next().html(" ").addClass('loright')
				.addClass('mtl15').removeClass('lowrong').removeClass('mll');
	}
}
function setCookie(name, value) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + 48)
	document.cookie = name + "=" + escape(value) + "; expires="
			+ exdate.toUTCString() + "; path=/";
}
function getCookie(name) {
	var str = document.cookie.split(";")
	for ( var i = 0; i < str.length; i++) {
		var str2 = str[i].split("=");
		if (str2[0] == " " + name || str2[0] == name)
			return unescape(str2[1]);
	}
}
function showDialog(url, target, ajaxText) {
	if (!target)
		target = "div.dialog_main";
	if (!ajaxText)
		ajaxText = '<div class="dialog_content"><p class="loading">������������������������, ���������...</p></div><a href="javascript:;" title="" onclick="closedialog();" class="Closeit">������</a>';
	if (!url)
		$('#dialog_clt .dialog_main').html(ajaxText);
	$('#dialog_clt').jqm({
		ajax : url,
		modal : true,
		toTop : true,
		target : target,
		ajaxText : ajaxText,
		onShow : myjqmOnShow,
		onLoad : myjqmOnLoad
	}).jqDrag('.jqDrag').jqmShow();
	$("#dialog_sharp").css('height', '100%');
}
var api = {
	showtype : 'newwindow',
	showbangding : function(utype, uid) {
		showbangdingForm(utype, uid);
	},
	ready : function() {

	}
}
function showbangdingForm(type, uid) {
	$("#LoginDialogIndex").dialog("close");
	$("#LoginDialogIndex").remove();
	var h = $(window).height() / 2 - 150;
	var w = $(window).width() / 2 - 290;
	var url = '/uajax/bangdingmodel/' + type + '/' + uid + '/jianfei';
	$
			.get(
					url,
					function(data) {
						var sdata = '<div id="showBangdingDialog" class="bdiceng r5" style="z-index: 9999; top: '
								+ h
								+ 'px; left: '
								+ w
								+ 'px; position: fixed; display: block; ">'
								+ data;
						$('body').append(sdata);
						$("#showBangdingDialog").dialog({
							resizable : false,
							draggable : true,
							modal : true
						});
						$(".dlclose").live("click", function() {
							$("#showBangdingDialog").remove();
							$("#showBangdingDialog").dialog("close");
						});
						$("#email").focus();
					});
}
function dialogBindingSignUp() {
	var email = $('.signuplogin input[name=email]').val();
	var nickname = $('.signuplogin input[name=nickname]').val();
	var pwd = $('.signuplogin input[name=passwd]').val();
	if (checkemail('register', 'emailreg') && dialogchecknickname()
			&& checkpassword('passwdreg')) {
	} else {
		return false;
	}
	$.ajax({
		type : 'post',
		url : '/ajax/signup',
		data : 'apiuid=' + $("#api_uid").val() + '&apitype='
				+ $("#api_type").val() + '&user=' + email + '&pwd=' + pwd
				+ '&nickname=' + nickname,
		dataType : 'json',
		async : false,
		success : function(msg) {
			if (msg.status == 'OK') {
				if (msg.data === 'OK') {
					window.location.href = '/';
				} else {
					// ������������
					return false;
				}
			}
		}
	})
	return false;
}
function dialogBindingSignin() {
	var email = $('.signinlogin input[name=email]').val();
	var pwd = $('.signinlogin input[name=passwd]').val();

	if (checkemail('haveBinding') && checkpassword()) {

	} else {
		return false;
	}
	$.ajax({
		type : "POST",
		url : "/ajax/bangding",
		data : "user=" + email + "&pwd=" + pwd + "&apiuid="
				+ $("#api_uid").val() + "&apitype=" + $("#api_type").val(),
		dataType : 'json',
		success : function(obj) {
			if (obj.status == 'OK') {
				window.location.href = obj.data;
			} else {
				$('.signinlogin input[name=email]').parents('.iput').next()
						.html(obj.data).addClass('lowrong').addClass('mll')
						.removeClass('loright').removeClass('mtl15');
			}
		}
	});
}
function focusAddClass(obj) {
	$default_value = $(obj).attr("default_value");
	$value = $(obj).val();
	if ($default_value == $value) {
		$(obj).attr('value', '');
		$(obj).addClass('fcbm');
	}
}
function blurRemoveClass(obj) {
	$default_value = $(obj).attr("default_value");
	$value = $(obj).val();
	if ($value == '') {
		$(obj).attr('value', $default_value);
		$(obj).removeClass('fcbm');
	}
}
function docollectthispage() {
	var sURL = window.location.href;
	var sTitle = $('title').html();
	try {
		window.external.addFavorite(sURL, '���������');
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch (e) {
			alert("���������������������������������������������Ctrl+D������������");
		}
	}
}
function searchonchage() {
	searchContent = $("#global_search_inpt").val();
	if (searchContent.length >= 7) {
		$("#mysu").show();
		searchContentShort = searchContent.substring(0, 7) + '...';
	} else {
		if (searchContent.length == 0) {
			$("#mysu").hide();
		} else {
			$("#mysu").show();
			searchContentShort = searchContent;
		}
	}
	var str = '<span class="armtop"> </span>';
	str += '<ul>';
	str += '<li class="rt3" onclick="searchJump(\'recipe\',\'' + searchContent
			+ '\')">������<span class="fc7">���' + searchContentShort
			+ '���</span>������������</li>';
	str += '<li onclick="searchJump(\'caidan\',\'' + searchContent
			+ '\')">������<span class="fc7">���' + searchContentShort
			+ '���</span>������������</li>';
	str += '<li onclick="searchJump(\'shicai\',\'' + searchContent
			+ '\')">������<span class="fc7">���' + searchContentShort
			+ '���</span>������������</li>';
	str += '<li class="rb3" onclick="searchJump(\'user\',\'' + searchContent
			+ '\')">������<span class="fc7">���' + searchContentShort
			+ '���</span>������������</li>';

	str += '</ul>';
	$("#mysu").html(str);
}
function searchJump(searchKey, searchContent) {
	url = '/search/' + searchKey + '/' + searchContent;
	window.location.href = url;
}

/**
 * ������Sns������������������
 */

function notifySns(a) {
	var h = $(window).height() / 2 - 90;
	var w = $(window).width() / 2 - 142;
	var id = 'showerrorinfo';
	var html = '<div class="wrongceng r5" id="' + id + '" randnum="'
			+ parseInt(1000 * Math.random()) + '"style="z-index:9999;top:' + h
			+ 'px; left:' + w + 'px;position:fixed;display:block; ">'
	html += '<div class="wrcontent">'
	html += '<a href="javascript:void(0);" class="scengb dlclose"></a>'
	html += '<div class="tith">'
	html += '<h3 class="pll">������</h3>'
	html += '</div>'
	html += '<div class="tisbus pl15">'
	html += '1.���������������������������������������������������<br />2.������������������������������������<br />���������������������������������'
	html += '</div>'
	html += '<div class="tisbus pl15">'
	html += '<button type="button" onclick="javascript:checkSnsDone(\''
			+ a
			+ '\');" class="btll left r3 mrm">���������������������������</button>&nbsp;<button type="button" id="closedlg" class="btll left r3">���������������������</button>'
	html += '</div>'
	html += '</div>'
	html += '</div>'

	$('body').append(html);
	$("#" + id).dialog({
		resizable : false,
		draggable : false,
		modal : true
	});
	$(".dlclose").live("click", function() {
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
	$("#closedlg").live("click", function() {
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
}

/**
 * sina token������������
 */
function notifySinaRebd() {
	var h = $(window).height() / 2 - 90;
	var w = $(window).width() / 2 - 142;
	var id = 'showerrorinfo';
	$("#EmailForm1").submit();// ������
	var html = '<div class="wrongceng r5" id="' + id + '" randnum="'
			+ parseInt(1000 * Math.random()) + '"style="z-index:9999;top:' + h
			+ 'px; left:' + w + 'px;position:fixed;display:block; ">'
	html += '<div class="wrcontent">'
	html += '<a href="javascript:void(0);" class="scengb dlclose"></a>'
	html += '<div class="tith">'
	html += '<h3 class="pll">������</h3>'
	html += '</div>'
	html += '<div class="tisbus pl15">'
	html += '���������������������������������������������������'
	html += '</div>'
	html += '<div class="tisbus pl15">'
	html += '<a type="button"  href="/api/sina_bd" target="_blank" id="closedlg1" class="btll left r3 mrm">������������</a></button>&nbsp;<button type="button" id="closedlg" class="btll left r3">���������������������</button>'
	html += '</div>'
	html += '</div>'
	html += '</div>'

	$('body').append(html);
	$("#" + id).dialog({
		resizable : false,
		draggable : false,
		modal : true
	});
	$(".dlclose").live("click", function() {
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
	$("#closedlg").live("click", function() {
		$("#bye").val(1);
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
	$("#closedlg1").live("click", function() {
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
}
/**
 * ������������������������������
 * 
 * @author cntnn11
 * @time 2013-01-18
 */
function showinfowithbutton(con, callback) {
	var h = $(window).height() / 2 - 115;
	var w = $(window).width() / 2 - 142;
	var id = 'showinfowithbutton';
	var html = '<div class="wrongceng r5" id="' + id + '" randnum="'
			+ parseInt(1000 * Math.random()) + '" style="z-index:9999;top:' + h
			+ 'px;left:' + w + 'px;position:fixed;display:none;">';
	html += '<div class="wrcontent" style="height:100%;line-height:200%;">';
	html += '<div class="tith">';
	html += '<h3 class="pll">������</h3>';
	html += '<a href="javascript:void(0);" class="scengb dlclose"></a>';
	html += '</div>';
	html += '<div class="tisword" style="margin-top:20px;">';
	html += '<p>' + con['tip_str_staus'] + '</p>';
	html += '<p>' + con['tip_str'] + '</p>';
	html += '<p><a href="' + con['url'] + '" >' + con['tip_str_ahref']
			+ '</a></p>';
	html += '</div>';
	html += '<div class="tisbtn" style="margin-top:20px;">';
	html += '<button  type="button" class="btndl mrm" id="truebtn">������</button>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

	$('body').append(html);
	$("#" + id).dialog({
		width : 286,
		height : 220,
		resizable : false,
		draggable : false,
		modal : true
	});

	$(".dlclose").live("click", function() {
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
	$("#truebtn").live("click", function() {
		// ������callback���������������function
		if (callback) {
			callback();
		}
		$("#" + id).remove();
	});
	$("#cancelbtn").live("click", function() {
		$("#" + id).remove();
		$("#" + id).dialog("close");
	});
	$("#truebtn").focus();
}

/**
 * @ ��������������� "���������������" ��������������� time 2013-02-27
 */
$(function() {

	caipulistObj = {
		caipulist : {},
		total : '',
		containerId : "otherlike",
		step : 4,
		cur_point : 0,
		offset : 0,
		caipu_id : 0,
		makeItem : function(item) {
			if (item == undefined)
				return '';
			var temphtml = [];
			temphtml
					.push('<li><a href="/cookbook/'
							+ item.cook_id
							+ '.html" title="'
							+ item.name
							+ '" target="_blank" style="background: url('
							+ item.cook_image
							+ ') no-repeat 0 center" class="wh12590"></a><a href="/cookbook/'
							+ item.cook_id + '" target="_blank">' + item.name
							+ '</a></li>');
			temphtml = temphtml.join('');
			return (temphtml);
		},
		makeCaipuList : function() {
			$('#' + this.containerId).empty();
			for ( var i = this.cur_point * this.step; i < this.cur_point
					* this.step + this.step
					&& i < this.total; i++) {
				$('#' + this.containerId).append(
						this.makeItem(this.caipulist[i]));
			}
		},
		next : function() {

			if (this.cur_point < Math.ceil(this.total / this.step) - 1) {
				this.cur_point++;
				$("#pre_btn").children("a").removeClass("btn_pre2 blef")
						.addClass("btn_pre blef");
			}
			if (this.cur_point >= Math.ceil(this.total / this.step) - 1) {

				$("#next_btn").children("a").removeClass("btn_next brigh")
						.addClass("btn_next2 brigh");
			}
			this.makeCaipuList();
		},
		pre : function() {
			if (this.cur_point > 0) {
				this.cur_point--;
				$("#next_btn").children("a").removeClass("btn_next2 brigh")
						.addClass("btn_next brigh");
			}
			if (this.cur_point <= 0) {
				$("#pre_btn").children("a").removeClass("btn_pre blef")
						.addClass("btn_pre2 blef");
			}
			this.makeCaipuList();
		},
		init : function(json) {
			this.cur_point = 0;
			this.caipulist = json;
			this.total = json.length;
			this.makeCaipuList();
			if (this.total < this.step) {
				$("#next_btn").children("a").removeClass("btn_next brigh")
						.addClass("btn_next2 brigh");
			} else {
				$("#next_btn").show();
			}
			if (this.cur_point <= 0) {
				$("#pre_btn").children("a").removeClass("btn_pre blef")
						.addClass("btn_pre2 blef");
			} else {
				$("#pre_btn").show();
			}
		}
	};

});

/*
 * ������������������������������ time 2013-03-07
 */
$(function() {

	thirdObj = {
		bar : [ 'tx', 'sina', 'qq', 'douban' ],
		containerId : "thirdBar",
		notice : {
			"sina" : "������������",
			"tx" : "QQ������",
			"douban" : "������",
			"qq" : "������������"
		},
		vid : "sharetosns",

		makeItem : function(type, status) {
			var temphtml = [];
			if (status == 0) {
				temphtml.push('<a href="/user/share" id="ajax_' + type
						+ '" target="_blank" title="������' + this.notice[type]
						+ '������" class="sns i' + type + status + '" status="'
						+ status + '" ttype="' + type + '"></a>');
				temphtml
						.push('<input id="input_'
								+ type
								+ '" name="'
								+ this.vid
								+ '[]" value="'
								+ type
								+ '" type="checkbox"  value="sina" style="display:none">');

			} else if (status == 1) {

				temphtml.push('<a class="sns i' + type + status + '" id="ajax_'
						+ type + '" status="' + status
						+ '" title="������������" ttype="' + type + '"></a>');
				temphtml
						.push('<input id="input_'
								+ type
								+ '" name="'
								+ this.vid
								+ '[]"  value="'
								+ type
								+ '" type="checkbox"  value="sina" style="display:none">');

			} else {
				temphtml.push('<a class="sns i' + type + status + '" id="ajax_'
						+ type + '" status="' + status
						+ '" title="������������������" ttype="' + type
						+ '"></a>');
				temphtml
						.push('<input id="input_'
								+ type
								+ '" name="'
								+ this.vid
								+ '[]" value="'
								+ type
								+ '" type="checkbox" checked="checked"  value="sina" style="display:none">');
			}
			temphtml = temphtml.join('');
			return (temphtml);
		},
		makeThirdBar : function(json) {
			$('#' + this.containerId).empty();
			var status;
			for ( var i = 0; i < this.bar.length; i++) {
				status = 0;
				for ( var j = 0; j < json.length; j++) {
					if (this.bar[i] == json[j]) {
						status = 2;
						break;
					}
				}
				$('#' + this.containerId).append(
						this.makeItem(this.bar[i], status));

			}
		},
		makeTokenFlag : function(json) {
			// $('#'+this.containerId).empty();
			for ( var j = 0; j < json.length; j++) {
				if (json[j]['sina'] == 1) {
					$('#' + this.containerId).append(
							'<input type="hidden" id="sinatoken" value="1">');
				}

			}

		},
		init : function() {
			this.getThirdInfo();

		},
		notifySns : function() {
			var h = $(window).height() / 2 - 90;
			var w = $(window).width() / 2 - 142;
			var id = 'showerrorinfo';
			var html = '<div class="wrongceng r5" id="' + id + '" randnum="'
					+ parseInt(1000 * Math.random())
					+ '"style="z-index:9999;top:' + h + 'px; left:' + w
					+ 'px;position:fixed;display:block; ">'
			html += '<div class="wrcontent">'
			html += '<a href="javascript:void(0);" class="scengb dlclose"></a>'
			html += '<div class="tith">'
			html += '<h3 class="pll">������</h3>'
			html += '</div>'
			html += '<div class="tisbus pl15">'
			html += '1.���������������������������������������������������<br />2.������������������������������������<br />���������������������������������'
			html += '</div>'
			html += '<div class="tisbus pl15">'
			html += '<button type="button" onclick="thirdObj.bangDone();" class="btll left r3 mrm">���������������������������</button>&nbsp;<button type="button" id="closedlg" class="btll left r3">���������������������</button>'
			html += '</div>'
			html += '</div>'
			html += '</div>'

			$('body').append(html);
			$("#" + id).dialog({
				resizable : false,
				draggable : false,
				modal : true
			});
			$(".dlclose").live("click", function() {
				$("#" + id).remove();
				$("#" + id).dialog("close");
			});
			$("#closedlg").live("click", function() {
				$("#" + id).remove();
				$("#" + id).dialog("close");
			});
		},

		bangDone : function() {
			this.init();
			$("#showerrorinfo").dialog("close");
		},

		getThirdInfo : function() {
			$.ajax({
				type : "post",
				url : "/uajax/getThirdInfo",
				data : "username=aaa",
				dataType : 'json',
				success : function(msg) {
					if (msg.status == 'OK') {
						thirdObj.makeThirdBar(msg.data["setting"]);
						thirdObj.makeTokenFlag(msg.data['tokenflag']);
					} else {
					}
				}
			});

		}

	};
	$(".sns").live("click", function() {
		var type = $(this).attr("ttype");
		var status = $(this).attr("status");
		if (status == 2) {
			$(this).attr("status", 1);
			$(this).removeClass("i" + type + status).addClass('i' + type + 1);
			$("#input_" + type).attr("checked", false);
			$(this).attr("title", "������������������");
		}
		;
		if (status == 1) {
			$(this).attr("status", 2);
			$(this).removeClass("i" + type + status).addClass('i' + type + 2);
			$("#input_" + type).attr("checked", true);
			$(this).attr("title", "������������������");
		}
		if (status == 0) {
			thirdObj.notifySns();
		}
	});

});
