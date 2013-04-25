if ($("#comment_container").length) {
	var $cm_id = $("#page_cm_id").attr('val');
	var $cm_type = $("#page_cm_id").attr('ctype');
	var comment_responseTPL = Tempo.prepare('comment_container');
	showComments(0);
}
function showComments(offset) {
	$.getJSON('/ajax/getCommentsList/' + $cm_type + '/' + $cm_id + '/' + offset
			+ '?' + Math.random(), function(result) {
		if (offset == 0 && result.data.total > 10) {
			initCommentsPages(result.data.total);
		}
		if (result.data.total <= 10) {
			comment_responseTPL.starting();
			comment_responseTPL.render(result.data);
			STK.pageletM.start();
		}
	});
}
function initCommentsPages(total) {
	$("#cm_pages").pagination(total, {
		num_edge_entries : 1,
		num_display_entries : 4,
		callback : pageSelCallback,
		items_per_page : 10
	});
}
function goToPage(total, offset) {
	$("#cm_pages").pagination(total, {
		num_edge_entries : 1,
		num_display_entries : 4,
		current_page : offset,
		callback : pageSelCallback,
		items_per_page : 10
	});
}
function pageSelCallback(offset, jq) {
	comment_responseTPL.starting();
	$.getJSON('/ajax/getCommentsList/' + $cm_type + '/' + $cm_id + '/' + offset
			+ '?' + Math.random(), function(result) {
		comment_responseTPL.render(result.data);
		STK.pageletM.start();
	});
}

function reply(nick, uname, uid, cid) {
	var comm_con = $("#comment_container");
	var comm = comm_con.find('textarea');
	if (comm.length > 0) {
		comm.focus();
		comm.val('@' + nick + ' ');
		comm.parent().find("input[name=cm_pid]").val(cid);
		comm.parent().find("input[name=cm_touid]").val(uid);
		comm.parent().find("input[name=cm_tounick]").val(nick);
		comm.parent().find("input[name=cm_touname]").val(uname);
	} else {
		document.location = "#comment";
	}
}

function clearComment() {
	var comm_con = $("#comment_container");
	var comm = comm_con.find('textarea');
	comm.focus();
	comm.val('');
	comm.parent().find("input[name=cm_pid]").val(0);
	comm.parent().find("input[name=cm_touid]").val(0);
	comm.parent().find("input[name=cm_tounick]").val('');
	comm.parent().find("input[name=cm_touname]").val('');
}

/**
 * This jQuery plugin displays pagination links inside the selected elements.
 * 
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int}
 *            maxentries Number of entries to paginate
 * @param {Object}
 *            opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts) {
	opts = jQuery.extend({
		items_per_page : 10,
		num_display_entries : 10,
		current_page : 0,
		num_edge_entries : 0,
		link_to : "javascript:void(0)",
		prev_text : "Previous",
		next_text : "Next",
		ellipse_text : "...",
		prev_show_always : false,
		next_show_always : false,
		callback : function() {
			return false;
		}
	}, opts || {});

	return this
			.each(function() {

				function numPages() {
					return Math.ceil(maxentries / opts.items_per_page);
				}

				function getInterval() {
					var ne_half = Math.ceil(opts.num_display_entries / 2);
					var np = numPages();
					var upper_limit = np - opts.num_display_entries;
					var start = current_page > ne_half ? Math.max(Math.min(
							current_page - ne_half, upper_limit), 0) : 0;
					var end = current_page > ne_half ? Math.min(current_page
							+ ne_half, np) : Math.min(opts.num_display_entries,
							np);
					return [ start, end ];
				}

				/**
				 * ������������������������������
				 * 
				 * @������ {int} page_id ������������
				 */
				function pageSelected(page_id, evt) {
					current_page = page_id;
					drawLinks();
					var continuePropagation = opts.callback(page_id, panel);
					if (!continuePropagation) {
						if (evt.stopPropagation) {
							evt.stopPropagation();
						} else {
							evt.cancelBubble = true;
						}
					}
					return continuePropagation;
				}

				/**
				 * ������������������������������������������������
				 */
				function drawLinks() {
					panel.empty();
					var interval = getInterval();
					var np = numPages();
					// ������������������������������������������������������������page_id���pageSelected���
					var getClickHandler = function(page_id) {
						return function(evt) {
							return pageSelected(page_id, evt);
						}
					}
					// ���������������������������������������(������������������������������span������)
					var appendItem = function(page_id, appendopts) {
						page_id = page_id < 0 ? 0 : (page_id < np ? page_id
								: np - 1); // ������page id���
						appendopts = jQuery.extend({
							text : page_id + 1,
							classes : ""
						}, appendopts || {});
						if (page_id == current_page) {
							var lnk = jQuery("<span class='current'>"
									+ (appendopts.text) + "</span>");
						} else {
							var lnk = jQuery(
									"<span class='floblock'><a >"
											+ (appendopts.text) + "</a></span>")
									.bind("click", getClickHandler(page_id))
									.attr(
											'href',
											opts.link_to.replace(/__id__/,
													page_id));
						}
						if (appendopts.classes) {
							lnk.addClass(appendopts.classes);
						}
						panel.append(lnk);
					}
					// ������"Previous"-������
					if (opts.prev_text
							&& (current_page > 0 || opts.prev_show_always)) {
						appendItem(current_page - 1, {
							text : opts.prev_text,
							classes : "prev"
						});
					}
					// ���������������
					if (interval[0] > 0 && opts.num_edge_entries > 0) {
						var end = Math.min(opts.num_edge_entries, interval[0]);
						for ( var i = 0; i < end; i++) {
							appendItem(i);
						}
						if (opts.num_edge_entries < interval[0]
								&& opts.ellipse_text) {
							jQuery(
									"<span class='floblock'>"
											+ opts.ellipse_text + "</span>")
									.appendTo(panel);
						}
					}
					// ������������������������
					for ( var i = interval[0]; i < interval[1]; i++) {
						appendItem(i);
					}
					// ���������������
					if (interval[1] < np && opts.num_edge_entries > 0) {
						if (np - opts.num_edge_entries > interval[1]
								&& opts.ellipse_text) {
							jQuery(
									"<span class='floblock'>"
											+ opts.ellipse_text + "</span>")
									.appendTo(panel);
						}
						var begin = Math.max(np - opts.num_edge_entries,
								interval[1]);
						for ( var i = begin; i < np; i++) {
							appendItem(i);
						}

					}
					// ������ "Next"-������
					if (opts.next_text
							&& (current_page < np - 1 || opts.next_show_always)) {
						appendItem(current_page + 1, {
							text : opts.next_text,
							classes : "next"
						});
					}
				}

				// ������������������current_page
				var current_page = opts.current_page;
				// ������������������������������������������������
				maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
				opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1
						: opts.items_per_page;
				// ������DOM���������������������������������������������������
				var panel = jQuery(this);
				// ���������������������������
				this.selectPage = function(page_id) {
					pageSelected(page_id);
				}
				this.prevPage = function() {
					if (current_page > 0) {
						pageSelected(current_page - 1);
						return true;
					} else {
						return false;
					}
				}
				this.nextPage = function() {
					if (current_page < numPages() - 1) {
						pageSelected(current_page + 1);
						return true;
					} else {
						return false;
					}
				}
				// ������������������������������������
				drawLinks();
				// ������������
				opts.callback(current_page, this);
			});
}
function delcomment(commentid, type) {
	if (commentid == '' || type == '') {
		return false;
	}
	params = '&commentid=' + commentid + '&type=' + type;
	$.fn.confirm({
		msg : '���������������������������������',
		callback : function() {
			$.ajax({
				type : "post",
				url : "/uajax/delCommend",
				data : params,
				dataType : "json",
				async : false,
				success : function(msg) {
					if (msg.data.info == 'NoLogin') {
						logindialog();
					} else if (msg.data.info == 'OK') {
						$(".cm_totals").text(msg.data.tot);
						$('#' + commentid).remove();
						// window.location.reload();
					} else {
						showerrorinfo('������������',
								'���������������������������');
					}
				}
			})
		}
	})
}