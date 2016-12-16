require('../../less/showlist.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var UserShowListUtil = require('../utils/UserShowListUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');


var ShowListItem = React.createClass({
	render: function() {
		var image  = this.props.images.map(function(item,index){
			return (
				<span key={index}> <img className="showlist-item-images-col" src={item}/></span>
			);
		}.bind(this));
		return (
			<div className="showlist-item">
				<div >
					<img className="showlist-item-thumb" src={this.props.userImage}/>
				</div>
				<div className="showlist-item-content">
					<div className="showlist-item-nickname">
						{this.props.nickName}
					</div>

					<div className="showlist-item-info">
						<span>
							{this.props.ipAddr}
						</span>
						<span>
						{this.props.timeStr}
						</span>
					</div>

					<div className='showlist-item-title'>
						<span className="pull-left">
							{this.props.title}
						</span>
					</div>
					<div className='showlist-item-images' >
						{image}
					</div>
				</div>
			</div>
			);
	}
});

var UserShowList = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: 0,
			userShowList: []
		}
	},

	componentDidMount: function() {
		this.props.location.query.pageNum = 1;
		UserShowListUtil.recordList(this.props.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				userShowList: res.userShowList,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		UserShowListUtil.recordList(nextProps.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				userShowList: res.userShowList,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.userShowList.map((item, index) => {
			return <ShowListItem {...item} key={index}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='showlist'>
						<ScrollLoad
							containerHeight={window.innerHeight-50}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>

							{items}

                            {
                                this.state.hasNextPage ?
                                null
                                :
                                <div className="text-center">
                                    ~~已显示全部
                                </div>
                            }

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
            UserShowListUtil.recordList(q, function(res) {
                var nState = _.assign({}, this.state);
                nState.userShowList = nState.userShowList.concat(res.userShowList);
                this.setState({
                    loading: false,
                    hasNextPage: res.hasNextPage,
                    userShowList: nState.userShowList,
                    pageNum: res.pageNum
                });
            }.bind(this));
		}
	}
});

module.exports = UserShowList;