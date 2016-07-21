var active_class = 'active';
$('.tablelist > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){
	var th_checked = this.checked;
	$(this).closest('table').find('tbody > tr').each(function(){
		var row = this;
		if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
		else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
	});
});
$('.tablelist tbody tr:odd').addClass('odd');
var common={};
common.c={};
/*
参数解释：
title	标题
url		请求的url
id		需要操作的数据id
w		弹出层宽度（缺省调默认值）
h		弹出层高度（缺省调默认值）
*/
function layer_show(title,url,w,h,full){
	if (title == null || title == '') {
		title=false;
	};
	if (url == null || url == '') {
		url="404.html";
	};
	if (w == null || w == '') {
		w=800;
	};
	if (h == null || h == '') {
		h=($(window).height() - 50);
	};
	var index=layer.open({
		type: 2,
		area: [w+'px', h +'px'],
		fix: false, //不固定
		maxmin: true,
		shade:0.4,
		title: title,
		skin: 'layui-layer-molv',
		content: url
	});
	if(full){
		layer.full(index);
	}
}
/*关闭弹出框口*/
function layer_close(){
	var index = layer.getFrameIndex(window.name);
	layer.close(index);
	location.reload();
}

$('.tablelist').on('click', 'td input[type=checkbox]' , function(){
	var $row = $(this).closest('tr');
	if($row.is('.detail-row ')) return;
	if(this.checked) $row.addClass(active_class);
	else $row.removeClass(active_class);
});

var alert_error=function (msg,fuc) {
	layer.msg(msg, {'icon': 2},fuc);
};

var alert_success=function (msg,fuc) {
	layer.msg(msg+'&nbsp;', {'icon': 1},fuc);
};
/**
 * 公共操作方法
 * @param  string tip 操作提示文本
 * @param  string id  操作数据编号
 * @param  string url 操作执行地址
 * @return {[type]}     [description]
 */
 var common_opt=function(tip,id,url){
 	layer.confirm(tip,function(index){
 		$.post(url, {'id': id}, function(d) {
 			if(d.status==1){
 				alert_success(d.info,function () {
 					location.reload();
 				});
 			}else{
 				alert_error(d.info);
 			}
 		});
 	});
 }
 function self_del(id){
 	common_opt('确定要删除吗？',id,"{:U('del')}");
 }

 var data_dels=function () {
 	var lis=$('.table input[type="checkbox"]:checked');
 	if(lis.size()>0){
 		layer.confirm('你确定要删除选中数据吗？',function(index){
 			var ids=[];
 			$.each(lis,function(index, el) {
 				ids.push($(el).val());
 			});
 			$.post(common.c.del_url, {'ids': ids}, function(d) {
 				if(d.status==1){
 					alert_success(d.info,function () {
 						location.reload();
 					});
 				}else{
 					alert_error(d.info);
 				}
 			});
 		});
 	}else{
 		layer.alert('请选择你要删除的数据！');
 	}
 }