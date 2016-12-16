require('../../less/share-intro.less');
var React = require('react');
var Navi = require('./Navi.js');
var ShareIntro = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='share-intro'>
						<img className='share-intro-image'  src='../../images/share/share-intro.png' />
						<a href='/share' className='share-intro-button' >
							立即分享赚钱
						</a>
						<Navi />
					</div>
				</div>
			</div>
		);
	},
});

module.exports = ShareIntro;