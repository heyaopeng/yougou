var React = require('react');

var NotFound = React.createClass({

	render: function() {
		return (
			<div className="row">
				<div className="col-xs-12">
					<h1 className="text-center">
						未发现页面 (404)
					</h1>
				</div>
			</div>
			);
	}
});

module.exports = NotFound;