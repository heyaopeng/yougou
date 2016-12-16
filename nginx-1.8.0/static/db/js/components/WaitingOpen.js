require('../../less/waiting-open.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var WaitingOpenUtil = require('../utils/WaitingOpenUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CountDown = require('./CountDown.js');
var ProductItem = React.createClass({
	getInitialState: function(){
		return {
			term : this.props
		};
	},
	render: function() {
		return (
			<div className="recent-open-item">
				<a href={"/detail?termId=" + (this.state.term.termId)}>
					<img src={this.state.term.productImage} className="recent-open-item-img"/>
				</a>

				{
					this.state.term.tag ?
					<span className="recent-open-item-tag">
						{this.state.term.tag}
					</span>
					: null
				}
				
				<div className="recent-open-item-info">
					<div className="recent-open-item-title">
						{this.state.term.productTitle}
					</div>
				</div>
				<div className='recent-open-item-button'>
					<button className='recent-open-item-button-open' onClick={this._handleOpen.bind(this,this.state.term.termId)}>1</button>
				</div>
				<div className='recent-open-item-button'>
					<button className='recent-open-item-button-test' onClick={this._handleOpenTest.bind(this,this.state.term.termId)}>2</button>
				</div>
			</div>
		);
	},
	_handleOpen:function(termId){
		var q = {};
		q.termId=termId;
		WaitingOpenUtil.open(q,function(res){
			var description = ""; 
			for(var i in res){ 
				var property=res[i]; 
				description+=i+" = "+property+"\n"; 
			} 
		 	alert(description); 
		}.bind(this));
	},
	_handleOpenTest:function(termId){
		var q = {};
		q.termId=termId;
		WaitingOpenUtil.openTest(q,function(res){
			var description = ""; 
			for(var i in res){ 
				var property=res[i]; 
				description+=i+" = "+property+"\n"; 
			} 
		 	alert(description);
		}.bind(this));
	}
});

var WaitingOpen = React.createClass({

	getInitialState: function(){
		return {
			loading: false,
			hasNextPage: false,
			pageNum: 0,
			terms: []
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		WaitingOpenUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		var q = this.props.location.query;
		WaitingOpenUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		var list = this.state.terms.map(function(item, index) {
			return <ProductItem key={index} {...item} />
		});
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='recent-open'>
						<ScrollLoad
							containerHeight={window.innerHeight-55}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>

							{list}
						</ScrollLoad>
						
						<Navi />
					</div>
				</div>
			</div>
		);
	},
	_loadMore: function() {
		if (this.state.hasNextPage) {
			this.setState({
				loading: true
			});
			var q = _.assign({}, this.props.location.query)
			q.pageNum = this.state.pageNum + 1
			WaitingOpenUtil.getData(q, function(res) {
				var nState = _.assign({}, this.state);
				nState.terms = nState.terms.concat(res.terms);
				this.setState({
					loading: false,
					hasNextPage: res.hasNextPage,
					terms: nState.terms,
					pageNum: res.pageNum
				});
			}.bind(this));
		}
	},
});

module.exports = WaitingOpen;