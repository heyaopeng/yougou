require('../../less/loading.less');
var React = require('react');

var Loading = React.createClass({
	render: function() {
		return (
			<div className="loading" id="ck-loading">
				<div className="sk-fading-circle">
					<div className="sk-circle1 sk-circle"></div>
					<div className="sk-circle2 sk-circle"></div>
					<div className="sk-circle3 sk-circle"></div>
					<div className="sk-circle4 sk-circle"></div>
					<div className="sk-circle5 sk-circle"></div>
					<div className="sk-circle6 sk-circle"></div>
					<div className="sk-circle7 sk-circle"></div>
					<div className="sk-circle8 sk-circle"></div>
					<div className="sk-circle9 sk-circle"></div>
					<div className="sk-circle10 sk-circle"></div>
					<div className="sk-circle11 sk-circle"></div>
					<div className="sk-circle12 sk-circle"></div>
				</div>
			</div>
			);
	}
});

module.exports = Loading;