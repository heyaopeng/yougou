require('../../less/product-group.less');
var React = require('react');
var Link = require('react-router').Link;
var ProductItem = require('./ProductItem.js');

var ProductGroup = React.createClass({
	getInitialState: function() {
		return {
			show:false
		}
	},
	render: function() {
		var items = this.props.terms.map(function(item, index) {
			return <ProductItem key={index} {...item}/>;
		});

		return (
			<div className={'product-group' + (this.props.displayType === 'horizontal' ? ' product-group-hor': '')}>
				<div className="product-group-header">
					{this.props.groupName}
					{
						this.props.tag==='pointArea'?
						<span className='product-group-header-note'  onClick={this._showHandler.bind(this,true)}>(了解积分专区)</span>
						:null
					}
					{
						this.props.tag==='pointArea'?
							<Link to='/allproducts?categoryId=15&filterType=process' className="product-group-header-link">
								更多
							</Link>
						:
							this.props.tag==='homeHot'?
								<Link to='/allproducts' className="product-group-header-link">
									更多
								</Link>
							:
								this.props.tag==='quick'?
									<Link to='/allproducts?filterType=process&isQuick=1' className="product-group-header-link">
										更多
									</Link>
								:    null
					}

					
				</div>
				<div className="product-group-body">
					{items}
				</div>
				{this.state.show?
				<div className="home-hidden-subscribe" onClick={this._showHandler.bind(this,false)}>
					<img className='home-hidden-subscribe-image1' src='../../images/point-desc.png' />
				</div>
				:null}
			</div>
		);
	},
	_showHandler : function(res){
		this.setState({
			show:res
		});
	}
});

module.exports = ProductGroup;