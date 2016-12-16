require('../../less/term-real.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var TermRealUtil = require('../utils/TermRealUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');

var Top = React.createClass({
	render:function(){
		return(
			<div className='term-real-top'>
				<div>开奖结果：</div>
				<div className='term-real-top-number'>{this.props.data.isOpen===true?'幸运号码：' + this.props.data.result:'等待揭晓'}</div>
			</div>
		);
	}
});

var Formula = React.createClass({
	render:function(){
		return(
			<div className='term-real-formula'>
				<div>计算公式：</div>
				<div className='term-real-formula-text'>[(数值A+数值B)÷商品总需份额]取余数+10000001(固定值)</div>
			</div>
		);
	}
});

var NumberA = React.createClass({
	render:function(){
		return(
			<div className='term-real-numberA'>
				<div>数值A</div>
				<div>= 该商品满额时最后50条参与记录时间之和(精确到毫秒)</div>
				<div className='term-real-numberA-number'>= {this.props.data.numberACount}</div>
				<div className='term-real-numberA-button pull-right' onClick={this._clickHandler}>展开<span className='fa fa-angle-down'></span></div>
			</div>
		);
	},
	_clickHandler:function(){
		this.props._clickHandler();
	}
});

var NumberAList = React.createClass({
	render:function(){
		var list = this.props.data.numberA.map(function(item,index){
			return (
				<div key={index} className='term-real-numberAList-item ' >
					<div className='term-real-numberAList-item-name'>{item.name}</div>
					<div className='term-real-numberAList-item-time'>{item.timeStr}</div>
					<div className='term-real-numberAList-item-data'>{item.transferData}</div>
				</div>
			);
		}.bind(this));
		return(
			<div className={'term-real-numberAList '+ (!this.props.data.show?'active':'')} >
				<div className='term-real-numberAList-meta' >
					<div className='term-real-numberAList-meta-name'>会员账号</div>
					<div className='term-real-numberAList-meta-time'>购买时间</div>
					<div className='term-real-numberAList-meta-data'>转换数据</div>
				</div>
				{list}
			</div>
		);
	}
});

var NumberB = React.createClass({
	render:function(){
		return(
			<div className='term-real-numberB'>
				<div>数值B</div>
				<div>= 最近一期中国福利彩票“广东快乐十分”开奖结果后两位数字</div>
				{this.props.data.isNeedCaiPiao?<div className='term-real-numberB-caipiao'>第{this.props.data.caiPiao.termId}期{this.props.data.isOpen?'(开奖结果：'+this.props.data.caiPiao.openCode+')':''}</div>:null}
				{this.props.data.isNeedCaiPiao?<div className='term-real-numberB-number red'>= {this.props.data.isOpen?this.props.data.numberB:'正在开奖中...'}</div>:<div className='term-real-numberB-number red'>= {'本期不含快乐十分开奖'}</div>}
			</div>
		);
	}
});

var TermReal = React.createClass({

	getInitialState: function(){
		return {
			show:false,
			isOpen: false,
			numberA: [],
			numberACount : 0,
			numberB:0,
			isNeedCaiPiao:true,
			caiPiao:{},
			result:10000000
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		TermRealUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='term-real'>
						<Top data = {this.state}/>
						<Formula/>
						<NumberA data = {this.state} _clickHandler={this._clickHandler}/>
						<NumberAList data = {this.state}/>
						<NumberB data = {this.state}/>
						<Navi />
					</div>
				</div>
			</div>
		);
	},
	_clickHandler:function(){
		this.setState({
				show:!this.state.show
			}
		);
		console.log(this.state.show);
	}
});

module.exports = TermReal;