var React = require('react');
var request = require('superagent');
var Loading = require('./Loading.js');

function gg(cb) {
	request
		.get('/duobao-user-web/isLogin')
		.end(function(err, res) {
			if (err) {
				return err
			}

			if (res.text === 'false') {
				localStorage.setItem('wx_login_path', window.location.pathname + window.location.search)
				window.location = '/duobao-user-web/weiXinLogin'
				return
			}

			cb()
		})
}

var App = React.createClass({

	getInitialState: function() {
		return {
			loading: false,
			//checkingLogin: true
		};
	},

	/*componentDidMount: function() {
		this.setState({
			checkingLogin: true
		})
		gg(() => {
			this.setState({
				checkingLogin: false
			})
		})
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.props.location.pathname !== nextProps.location.pathname) {
			this.setState({
				checkingLogin: true
			})
			gg(() => {
				this.setState({
					checkingLogin: false
				})
			})
		}
	},*/

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			sessionStorage.setItem('prev_path', this.props.location.pathname)
		}
	},

	render: function() {
		return (
			<div id="ck-container" className={this.state.loading ? 'loading' : ''}>
				{/*<div className="container-fluid">
					{this.state.checkingLogin ? null : this.props.children}
				</div>*/}
				<div className="container-fluid">
					{this.props.children}
				</div>
				<Loading />
			</div>
			);
	}
});

module.exports = App;