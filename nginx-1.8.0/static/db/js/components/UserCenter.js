require('../../less/user-center.less');

var React = require('react');
var Navi = require('./Navi.js');
var UserCenterUtil = require('../utils/UserCenterUtil.js');
var Link = require('react-router').Link;
var Top = React.createClass({
	render : function(){
		return (
			<div className='usercenter-top'>
				<img className='usercenter-top-background'  src='../../images/userCenter/top.jpg' />
				<Link to="/editInfo" >
					<span className='usercenter-top-setting fa fa-cog pull-right'></span>
				</Link>
				<div className='usercenter-top-data'>
					<div className='usercenter-top-data-info'>
						<div className='usercenter-top-data-info-item'>
							<img className='usercenter-top-data-info-item-image' src={this.props.data.image}/>
						</div>
						<div className='usercenter-top-data-info-item'>
							<div className='usercenter-top-data-info-item-text'>{this.props.data.nickName} {this.props.data.phone}</div>
							<div className='usercenter-top-data-info-item-text'>
								<span className='fa fa-question-circle-o usercenter-top-data-info-item-fa'  onClick={this.props._showHandler.bind(this,true)}></span>
								<span>积分：{this.props.data.points}</span>
								<span className='usercenter-top-data-info-item-button' onClick={this.props._pointSignin}>签到</span>
							</div>
						</div>
					</div>
				</div>

				<a href="/share" >
					<span className='usercenter-top-share fa fa-share-alt pull-right'></span>
				</a>
			</div>
		);
	}
});

var MoneyData = React.createClass({
	render : function(){
		return(
			<div className='usercenter-money'>
				<div className='usercenter-money-block'>
					<div className='usercenter-money-block-text'>
						<div className='usercenter-money-block-text-item'>
							U币
						</div>
						<div className='usercenter-money-block-text-item red'>
							{this.props.data.balance}
						</div>
					</div>
					<div className='usercenter-money-block-text'>
						<div className='usercenter-money-block-text-item'>
							佣金
						</div>
						<div className='usercenter-money-block-text-item red'>
							{this.props.data.commission}
						</div>
					</div>
				</div>
				<div className='usercenter-money-block'>
					<Link to="/withdraw" className='usercenter-money-block-button btn btn-primary button'>
						提现
					</Link>
					<Link to="/withdrawList" className='usercenter-money-block-button btn btn-primary button'>
						提现记录
					</Link>
				</div>
			</div>
		);
	}
});

var IconList = React.createClass({
	render : function(){
		return (
			<div className='usercenter-navi'>
				<div className='usercenter-navi-item'>
					<Link to="/treasurerecord">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/list.png' />
					<div className='usercenter-navi-item-text'>参与记录</div>
					</Link>
				</div>
				<div className='usercenter-navi-item left'>
					<Link to="/winrecord">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/gift.png' />
					<div className='usercenter-navi-item-text'>获奖记录</div>
					</Link>
				</div>
				<div className='usercenter-navi-item left'>
					<Link to="/cart">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/cart.png' />
					<div className='usercenter-navi-item-text'>购物车</div>
					</Link>
				</div>
				<div className='usercenter-navi-item'>
					<Link to="/accountcenter">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/card.png' />
					<div className='usercenter-navi-item-text'>账户明细</div>
					</Link>
				</div>
				<div className='usercenter-navi-item left'>
					<Link to="/userShowlist">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/camera.png' />
					<div className='usercenter-navi-item-text'>我的晒单</div>
					</Link>
				</div>
				<div className='usercenter-navi-item left'>
					<a href="/share">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/coin.png' />
					<div className='usercenter-navi-item-text'>推广赚钱</div>
					</a>
				</div>
				<div className='usercenter-navi-item bottom'>
					<Link to="/address">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/car.png' />
					<div className='usercenter-navi-item-text'>收货地址</div>
					</Link>
				</div>
				<div className='usercenter-navi-item left bottom'>
					<Link to="/announcement">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/notice.png' />
					<div className='usercenter-navi-item-text'>系统公告</div>
					</Link>
				</div>
				<div className='usercenter-navi-item left bottom'>
					<Link to="/helpcenter">
					<img className='usercenter-navi-item-image'  src='../../images/userCenter/question.png' />
					<div className='usercenter-navi-item-text'>常见问题</div>
					</Link>
				</div>
			</div>
		);
	}
});

var UserCenter = React.createClass({
	getInitialState :function(){
		return {
			nickName: "",
			points : 0,
			balance : 0.00,
			commission: 0.00,
			show:false
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		UserCenterUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='usercenter'>
						<Top data={this.state} _pointSignin = {this._pointSignin} _showHandler={this._showHandler}/>
						<MoneyData data={this.state}/>
						<IconList/>
						{this.state.show?
						<div className="usercenter-hidden" onClick={this._showHandler.bind(this,false)}>
							<img className='usercenter-hidden-image' src='../../images/point-desc.png' />
						</div>
						:null}
						<Navi />
					</div>
				</div>
			</div>
		);
	},
	_showHandler : function(res){
		this.setState({
			show:res
		});
	},
	_pointSignin : function(){
		UserCenterUtil.pointSignin(function(res){
			if(res.result==='existed'){
				alert("客官，今天已经签到了哦~");
				return ;
			}else{
				this.setState({
					points:res.result
				});
			}
			
		}.bind(this));
	}
});

module.exports = UserCenter;