var React = require('react');

var ScrollLoad = React.createClass({
	propTypes: {
		containerHeight: React.PropTypes.number,
		loading: React.PropTypes.bool,
		onReachBottom: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			containerHeight: 100,
			loading: false
		};
	},
	
	render: function() {
		return (
			<div id="scroll-load" className="scroll-load" ref="wrap" onScroll={this._handleScroll} style={{
				height: this.props.containerHeight + 'px',
				overflowY: 'scroll',
				overflowX: 'hidden',
				WebkitOverflowScrolling: 'touch'
			}}>
				<div className="scroll-load-inner clearfix" ref="inner">
					{this.props.children}
				</div>
			</div>
			);
	},

	_handleScroll: function(e) {
		if (e.target.scrollTop >= (this.refs.inner.clientHeight - this.props.containerHeight) && !this.props.loading) {
			if (this.props.onReachBottom && typeof this.props.onReachBottom === 'function') {	
				this.props.onReachBottom();
			}
		}
	}
});

module.exports = ScrollLoad;