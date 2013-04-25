$(".cooktag").live("click", function() {
	var tagvalue = $(this).html();
	var typevalue = $(this).attr("info");
	if ($(this).hasClass('tied')) {
		dbclicktag(tagvalue);
		tageffect(tagvalue, 'del');
	} else {
		addTagInfo(tagvalue, typevalue);
	}
})

// 输入框输入标签信息
$("#taginfo").live('blur', function(event) {
	var inputvalue = $.trim($(this).val());
	$(this).val(' ');
	var tagarr = inputvalue.split(' ');
	if (tagarr.length) {
		for ( var i = 0; i < tagarr.length; i++) {
			var tagvalue = tagarr[i];
			if (tagvalue == '')
				continue;
			if (tagvalue.length > 0) {
				if (tagvalue.length <= 10) {
					$(this).val(' ');
					var typevalue = $(this).attr("info");
					addTagInfo(tagvalue, typevalue);
				} else {
					showerrorinfo('Tips', 'Tag is too long');
				}
			}
		}
	}
})

/**
 * @desc: 循环添加标签信息
 * @param: string
 */
function addTagInfo(tag, type) {
	var bool = checktaginfo(tag);
	if (bool) {
		tageffect(tag, 'add');
		if (type == 'cook') {
			var html = '<span class="mpad bime">'
					+ tag
					+ ' <input type="hidden" name="tagname" value="'
					+ tag
					+ '"><a href="javascript:void(0);" class="ic_lcox"></a></span>';
		} else {
			var html = '<span class="mpad">'
					+ tag
					+ ' <input type="hidden" name="tagname" value="'
					+ tag
					+ '"><a href="javascript:void(0);" class="ic_lcox"></a></span>';
		}
		$(".intput").before(html);
		$(this).addClass("tied");
	}
}

function checktaginfo(tagname) {
	var bool = false;
	var tagstr = $(".mpad").length;
	/*
	 * if(tagstr < 6) {
	 */
	if (tagstr > 0) {
		for ( var i = 0; i < tagstr; i++) {
			var tagvalue = $(".mpad").find("input").eq(i).val();
			if (tagvalue == tagname) {
				showerrorinfo('Tips', 'duplicate tag！');
				return bool;
			}
		}
		bool = true;
	} else {
		bool = true;
	}
	return bool;
}

/**
 * @desc: 添加标签不同效果
 * @return: null
 */
function tageffect(tagname, type) {
	var tagstr = $(".cooktag").length;
	if (tagstr > 0) {
		for ( var i = 0; i < tagstr; i++) {
			var tagvalue = $(".cooktag").eq(i).html();
			if (tagname == tagvalue) {
				if (type == 'add') {
					$(".cooktag").eq(i).addClass("tied");
				} else {
					$(".cooktag").eq(i).removeClass("tied");
				}
			}
		}
	}
}

/**
 * @desc:再次点击标签取消标签信息
 * @return: null
 */
function dbclicktag(tagname) {
	var mpadstr = $(".mpad").length;
	if (mpadstr > 0) {
		for ( var i = 0; i < mpadstr; i++) {
			var tagvalue = $(".mpad").find("input").eq(i).val();
			if (tagvalue == tagname) {
				$(".mpad").find("input").eq(i).parent().remove();
			}
		}
	}
}

/**
 * @desc: 获取标签信息
 * @return:
 */
function gettaginfo() {
	var taglen = $(".mpad").length;
	var tagvalue = '';
	if (taglen > 0) {
		for ( var i = 0; i < taglen; i++) {
			var char = ((taglen - 1) == i) ? '' : ',';
			var tagval = $(".mpad").find("input").eq(i).val();
			tagvalue += tagval + char;
		}
	}
	return tagvalue;
}

/**
 * @desc: 删除标签信息
 * @return: boolean
 */
$(".ic_lcox").live("click", function() {
	var tagname = $(this).parent().find("input").val();
	tageffect(tagname, 'del');
	$(this).parent().remove();
})