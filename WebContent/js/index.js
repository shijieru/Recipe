$(document).ready(function(){
	JS_HoverToggle();
	JS_PlaceHolder();
	if($('.autoshow').size() > 1)
	{
		$('.autoshow').hide();
		$('.autoshow:gt(0)').show();
    	setInterval('autoshowdirect()',4000);
	}
})
function ShowMorePros(self, id)
{
	var times	= $(self).attr('times');
	$.ajax(
    {
        type	: 'post',
        url	: '/ajax/getProUserList/' + id +'/' + times,
        data	: '',
        dataType: 'html',
        success	: function(msg)
        {
            $("#viplist").html(msg);
            $(self).attr('times', (parseInt(times) + 1));
        }
    })
}
function chVipUserLists(obj)
{
	obj	= $(obj);
	$.ajax(
	{
		url	: '/ajax/getProUserList',
		type	: 'post',
		success	:function (msg)
		{
			if(msg!='')
			{
				obj.parents('.gourmet').find('.clearfix').remove();
				obj.parents('.gourmet').append(msg);
			}
			else
			{
				return false;
			}
		}
	})
}
function autoshowdirect()
{
	var total	= $('.autoshow').size();
	var objnum	= $('.autoshow').index($('.autoshow:visible'));
	var nextnum	= new Number(objnum)+1;
	if(objnum==total-1)
	{
		$('.autoshow:visible').hide();
		$('.autoshow:first').show();
	}
	else
	{
		$('.autoshow:visible').hide();
		$('.autoshow:eq('+nextnum+')').show();
	}
}