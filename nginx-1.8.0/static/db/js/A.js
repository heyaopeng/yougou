var browserHistory = require('react-router').browserHistory;
var request = require('superagent');

function isSignedIn() {
	return localStorage.getItem('jwt') !== null;
}

module.exports = {
	ajaxLoading: function() {
		return function(req) {
			req.once('request', function() {
				if (document.getElementById('ck-loading') !== null) {
					document.getElementById('ck-loading').style.display = 'block';
				}
			});

			req.once('end', function() {
				if (document.getElementById('ck-loading') !== null) {
					document.getElementById('ck-loading').style.display = 'none';
				}
			});
		};
	},

	ajaxAuth: function() {
		return function(req) {
			req.set('x-requested-with', 'XMLHttpRequest'); 
			req.set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
			req.on('response', function(res) {
				var r = JSON.parse(res.text)
				if (r.status === '401') {
					localStorage.removeItem('jwt');
					localStorage.removeItem('uid');
					localStorage.setItem('pathname_in_401', location.pathname + location.search)

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
						})

					// request
					// 	.get('/duobao-user-web/weiXinLogin')
					// 	.end(function(err, res) {
					// 		if (err) {
					// 			return err
					// 		}

					// 		res = JSON.parse(res.text)
					// 		if(res.result === 'success') { 
					// 			window.location = localStorage.getItem('pathname_in_401')
					// 		}
					// 		else {
					// 			alert('网络繁忙，请稍后再试')
					// 		}
					// 	})

					// browserHistory.push({
					// 	pathname: '/signin',
					// 	state: {
					// 		nextPathname: location.pathname + location.search
					// 	}
					// });
				}
			});
		};
	},

	setJWT: function(t) {
		localStorage.setItem('jwt', t);
	},

	getJWT: function() {
		return localStorage.getItem('jwt');
	},

	setUser: function(u) {
		localStorage.setItem('uid', u);
	},

	getUser: function() {
		return localStorage.getItem('uid');
	},

	requireAuth: function(nextState, replace) {

		if (!isSignedIn()) {
			localStorage.setItem('wx_path_state', nextState.location.pathname);
			sessionStorage.setItem('uc_path_state', nextState.location.pathname);

			// 感觉有点懵逼的逻辑
			localStorage.setItem('pathname_in_401', location.pathname + location.search)
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
				})
		}
	},

	timestampToDate: function(ts) {
		var d = new Date(ts);
		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	}
};