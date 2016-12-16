require('../../less/navi.less');

var React = require('react');
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;

var Navi = React.createClass({
	render: function() {
		return (
			<div className="navi">
				<IndexLink to="/" className="navi-item" activeClassName="active">
					<i className="fa fa-home"/>
					主页
				</IndexLink>
				<Link to={{
					pathname: '/allproducts',
					query: {
						filterType: 'process'
					}
				}} className="navi-item" activeClassName="active">
					<i className="fa fa-th-large"/>
					全部商品
				</Link>
				<Link to={{
					pathname: '/recentOpen',
					query: {
						filterType: 'process'
					}
				}} className="navi-item" activeClassName="active">
					<i className="fa fa-tachometer"/>
					最新揭晓
				</Link>
				{/*<Link to={{
					pathname: '/showList',
					query: {
						filterType: 'process'
					}
				}} className="navi-item" activeClassName="active">
					<i className="fa fa-heart-o"/>
					晒单
				</Link>*/}
				<Link to={{
					pathname: '/usercenter',
					query: {
						filterType: 'process'
					}
				}} className="navi-item" activeClassName="active">
					<i className="fa fa-user"/>
					个人中心
				</Link>
			</div>
			);
	}
});

module.exports = Navi;