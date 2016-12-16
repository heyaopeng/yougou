var React = require('react');

var ErrorMessage = React.createClass({
	render: function() {

		if (!this.props.error || this.props.error.trim() === '') {
			return null;
		}
		return (
			<div className="alert alert-danger">
				{this.props.error}
			</div>
			);
	}
});

module.exports = ErrorMessage;