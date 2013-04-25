$(window).ready(
		function() {
			// JS_PlaceHolder();
			$("#zhuliao").click(function() {
				var html = addCaiLiaoInfo("main");
				$(this).parent().before(html);
			})
			$("#cooktagInput").click(function() {
				$(this).find('input').focus();
			})
			$("#fuliao").click(function() {
				var html = addCaiLiaoInfo("aux");
				$(this).parent().before(html);
			})
			$("#addBuZhou").click(function() {
				var html = addBuZhou();

				$(this).parent().before(html);
				resortStepPosition();
			})
			$(".ic_up").live('click', function() {
				var curStep = $(this).parents("div:first");
				var prevStep = curStep.prev();
				var nextStep = curStep.next();
				var curStepNum = curStep.find('.umber').text();
				if (curStepNum > 1) {
					curStep.insertBefore(prevStep);
					resortStepPosition();
				}
			})
			$(".ic_dw")
					.live(
							'click',
							function() {
								var curStep = $(this).parents("div:first");
								var prevStep = curStep.prev();
								var nextStep = curStep.next();
								if ($('div.nsetp').index(
										$(this).parents('div.nsetp')) != $(
										'div.nsetp').size() - 1) {
									curStep.insertAfter(nextStep);
									resortStepPosition();
								}
							})
			$(".ic_ad").live('click', function() {
				// actionInputFile();
				var html = addBuZhou();
				$(this).parents("div:first").after(html);
				resortStepPosition();
			})
			$(".wrng").live("click", function() {
				$(this).parent().parent().remove();
			})
			$(".ic_close").live("click", function() {
				var steplen = ($(".nsetp").length);
				if (steplen > 1) {
					$(this).parents("div:first").remove();
					resortStepPosition();
				}
			})
			$(".nsetp").live("mouseover mouseout", function(event) {
				if (event.type == "mouseout") {
					$(this).children('.sxgj').addClass("hidden");
				} else {
					$(this).children('.sxgj').removeClass("hidden");
				}
			})
			$(".mbs").live("mouseover mouseout", function(event) {
				if (event.type == "mouseout") {
					$(this).children('.sxgj').addClass("hidden");
				} else {
					$(this).children('.sxgj').removeClass("hidden");
				}
			})
		})

function addCaiLiaoInfo(str) {
	return '<div class="mct clearfix mbs"><span class="liao"><input type="text" class="liaoext r3 fcbm" name="'
			+ str
			+ 'Ingredient" value="" /></span><span class="liang"><input type="text" class="liangext r3 fcbm" name="'
			+ str
			+ 'Amount" value="" /></span><span class="sxgj hidden"><a href="javascript:void(0);" class="wrng">x</a></span></div>';
}

function addBuZhou() {
	var html = '<div class="nsetp mbm clearfix">'
	html += '<span class="tjbz mrl">'
	html += '<input type="file" name="stepPics" value="" />'
	html += '</span>'
	html += '<span class="umber rl3">1</span>'
	html += '<span class="bzmw mrs"><textarea name="stepDescription" class="steptext r3 fcbm"></textarea></span>'
	html += '<span class="sxgj hidden">'
	html += '<a href="javascript:void(0);" class="ic_up">up</a>'
	html += '<a href="javascript:void(0);" class="ic_dw">dw</a>'
	html += ' <a href="javascript:void(0);" class="ic_ad">+</a>'
	html += ' <a href="javascript:void(0);" class="ic_close">x</a>'
	html += '</span>'
	html += '</div>'
	return html;
}

function actionInputFile() {
	$(".tjbz").find("div").remove();
	$(".tjbz")
			.html(
					'<div class="setp_images" style="widht:140px; height:90px;"><img src="" style="width:140px; height:89px;display:none;"/></div>');
}

function resortStepPosition() {
	var pos = 1;
	$("span.umber").each(function() {
		$(this).text(pos);
		pos++;
	})
}

function uploadInfos() {
	var cookName = $("#cook_name").val();
	var cook_diff = $("#cook_difficulty").val();
	var cook_costtime = $("#costtime").val();

	if (cookName == '') {
		showErrorTips('No recipe title');
		backToTop();
		return false;
	}
	if (cookName.length > 30) {
		showErrorTips('Too long recipe title');
		backToTop();
		return false;
	}
	var coverImageUrl = $("#coverImageUrl").val();
	if (coverImageUrl == '') {
		showErrorTips('No cover image');
		backToTop();
		return false;
	}

	var stepleng = ($(".nsetp").length);
	var stepinfo = '';
	if (stepleng > 0) {
		for ( var i = 0; i < stepleng; i++) {
			stepinfo += $(".nsetp").find("textarea").eq(i).val();
		}
		if (stepinfo == '') {
			showErrorTips('No detailed step description');
			backToTop();
			return false;
		}
	}

	if (cook_diff == '' || cook_costtime == '') {
		var str = cook_diff == '' ? 'Please choose cook difficulty'
				: 'Please choose cook time';
		showErrorTips(str);
		backToTop();
		return false;
	}
	$("#uploadCaipuInfo").html("Creating...");
	$("#uploadCaipuInfo").attr('disabled', "true");
	$("#recipeform").submit();
}

function showErrorTips(tips) {
	$("#upwrongtips").html(tips).show();
}
function backToTop(num) {
	var num = typeof num == 'undefined' ? 0 : num;
	if (num == 0) {
		t = $(document).scrollTop();
		num = t;
	}
	var t = $(document).scrollTop();
	$(document).scrollTop(t - num);
}

$('#imgUploadSucc .tjbz mrl').mouseover(function() {
	$('#imgUploadSucc .zpclose').show();
});
$('#imgUploadSucc .tjbz mrl').mouseout(function() {
	$('#imgUploadSucc .zpclose').hide();
});
$('#imgUploadSucc .zpclose').live('click', function() {
	$('#imgUploadSucc').hide();
	$('#imgUploadNow').show();
	$('#img').val('');
	$('#imgUploadNow div[specid=uploadspecid]').attr('id', 'uploadDishImage');
	$("#tipInfos").show();
	$(".iload").hide();
	$('#coverImageUrl').val("");
	editUploadImg($('#imgUploadNow div[specid=uploadspecid]'));
});

$('.upimgsucc').live("mouseover", function() {
	$(this).find("span").show();
});
$('.upimgsucc').live("mouseout", function() {
	$(this).find("span").hide();
});

$('.reclose').live(
		'click',
		function() {
			$(this).parent().find("img").val('');
			$(this).parent().hide();
			$(this).parent().prev().show();
			$(this).parent().prev().children().find(
					"div[class='icross2 hover']").show();
			$(this).parent().prev().children().find("div[class='icross2']")
					.show();
			$(this).parent().prev().find("div[class='iloading']").hide();
			$(this).parent().find("input[name='setpImages[]']").val("");

		});
