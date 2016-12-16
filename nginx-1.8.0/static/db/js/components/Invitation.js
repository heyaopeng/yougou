require('../../less/invite.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var browserHistory = require('react-router').browserHistory;
var InvitationUtil = require('../utils/InvitationUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CenterTab = React.createClass({
	render: function()	{
		var props = this.props;
		return(
			<div className="invitation-tab">
				<Link to='/commission' className='invitation-tab-item'>
					佣金明细
				</Link>
				<Link to='/invitation' className='invitation-tab-item active'>
					邀请好友明细
				</Link>
			</div>
		);
	},
});


var Meta = React.createClass({
	render : function(){
		return(
			<div className='invitation-meta'>
				<div className='invitation-meta-item'>
					用户
				</div>
				<div className='invitation-meta-item'>
					昵称
				</div>
				<div className='invitation-meta-item'>
					时间
				</div>
			</div>
		);
	}
});

var Log = React.createClass({
	render : function(){

		var list = this.props.invitation.map(function(item,index){
			return (
				<tr key={index} className='invitation-log-table-body-col'>
					<td className='invitation-log-table-body-col-item'>
						{item.userProfile.name?item.userProfile.name:null}
					</td>
					<td className='invitation-log-table-body-col-item'>
						{item.userProfile.nickName}
					</td>
					<td className='invitation-log-table-body-col-item'>
						{item.timeStr}
					</td>
				</tr>
			);
		}.bind(this));

		return(
			<table className='invitation-log-table'>
				<tbody className='invitation-log-table-body'>
					{list}
				</tbody>
			</table>
		);
	}
});

var Invitation = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: -1,
			invitation: [],
		};
	},

	componentDidMount : function(){
		this.props.location.query.pageNum=1;
		var q = this.props.location.query;
		InvitationUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		InvitationUtil.getData(nextProps.location.query, function(res) {
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='invitation'>
						<CenterTab/>
						<Meta/>
						<ScrollLoad
							containerHeight={window.innerHeight-130}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>
							<div className='invitation-log'>
								<Log invitation={this.state.invitation}/>
							</div>
							{
                                this.state.hasNextPage ?
                                null
                                :
                                <div className="text-center">
                                    已显示全部
                                </div>
                            }
						</ScrollLoad>
						<Navi />
					</div>
				</div>
			</div>
		)},
	_loadMore: function() {
		if (this.state.hasNextPage) {
			this.setState({
				loading: true
			});
			var q = _.assign({}, this.props.location.query)
			q.pageNum = this.state.pageNum + 1
			InvitationUtil.getData(q, function(res) {
				var nState = _.assign({}, this.state);
				nState.invitation = nState.invitation.concat(res.invitation);
				this.setState({
					loading: false,
					hasNextPage: res.hasNextPage,
					invitation: nState.invitation,
					pageNum: res.pageNum
				});
			}.bind(this));
		}
	}
});

module.exports = Invitation;