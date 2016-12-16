require('../../less/announcement.less');
var AnnouncementUtil = require('../utils/AnnouncementUtil.js');

var React = require('react');
var Navi = require('./Navi.js');

var AnnouncementListItem = React.createClass({
	render: function(){
		return(
			<div className='announcement-list-item'>
				<div className='announcement-list-item-detail'>
					<p className='announcement-list-item-detail-top'>
						<span className='announcement-list-item-detail-top-title'>{this.props.item.title}</span>
						<span className='announcement-list-item-detail-top-createtime'>{this.props.item.createTimeStr}</span>
					</p>
					<p className='announcement-list-item-detail-content'>
						<span className='announcement-list-item-detail-message'>
							{this.props.item.messageUrl}
						</span>
					</p>
				</div>
			</div>
		);
	}
});

var Announcement = React.createClass({

	getInitialState: function() {
		return {
			hasNextPage: false,
			pageNum: -1,
			announcement: []
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		AnnouncementUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		var list = this.state.announcement.map(function(item,index){
			return <AnnouncementListItem item={item} key={index} />;
		}.bind(this));
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='announcement'>
						<div className='annoucement-list'>
							{list}
						</div>
						<Navi />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Announcement;