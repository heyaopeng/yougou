var React = require('react');
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;
var WXSignIn = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},

	componentDidMount: function() {
		var c = this.props.location.query.code;
		
		request
			.get('/duobao-user-web/weiXinCallback')
			.query({
				code: c
			})
			.end(function(err, res) {
				if (err) {
					return err;
				}
				console.log(res);
				/*browserHistory.replace({
					pathname: localStorage.getItem('wx_login_path')
				});*/
				window.location = localStorage.getItem('wx_login_path');
				return ;
			}.bind(this));
	},

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<h1 className="text-center">处理中，请稍候...</h1>
				</div>
			</div>
			);
	}
});

module.exports = WXSignIn;
