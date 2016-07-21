<?php 
namespace Common\Model;

/**
 * 登录记录
 */
class CommonLoginRecordModel extends BaseModel
{
	public function addResult()
	{
		$this->created=time();
		return parent::addResult();
	}
	/**
	 * 日志查询
	 * @param  String $keyword 关键词
	 * @param  [type] $sdate   开始日期
	 * @param  [type] $edate   结束日期
	 * @return 
	 */
	public function pageLis($keyword,$sdate,$edate)
	{
		$map=array();
		if(!empty($keyword)){
			$map['a.name']=array('like',"%$keyword%");
		}
		if(!empty($sdate)){
			$map['m.created'][]=array('egt',strtotime($sdate));
		}
		if(!empty($edate)){
			$map['m.created'][]=array('ELT',strtotime($edate)+24*60*60);
		}
		if(count($map['m.created'])==0){
			unset($map['m.created']);
		}
		$this->alias('m')->join('common_admin a on a.id=m.admin_id')
		->field('m.*,a.name');
		$p=parent::_getPageData($this,$map,'m.id desc');
		return $p;
	}
}