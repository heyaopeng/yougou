require('../../less/product-item.less');
var React = require('react');
var Link = require('react-router').Link;

var ProductItem = React.createClass({
	render: function() {
		return (
			<div className="product-item">
				<div onClick={this._location.bind(this,"/detail?termId=" + (this.props.termId) + "&isNew=1")}>
					<img src={this.props.productImage} className="product-item-img"/>
				</div>

				{
					this.props.tag ?
					<span className="product-item-tag">
						{this.props.tag}
					</span>
					: null
				}
				
				<div className="product-item-info">
					<div className="product-item-title">
						{this.props.productTitle}
					</div>
					{
						this.props.isPoint?null:
						<div className="product-item-extra">
							<div className="product-item-amount">
								所需人次：{this.props.totalAmount}
							</div>
							<div className="product-item-percent">
								<div className="product-item-finish" style={{
									width: (this.props.currentAmount * 100 / this.props.totalAmount) + '%'
								}}/>
							</div>
							<div className="product-item-amount">
								剩余人次：{this.props.totalAmount - this.props.currentAmount}
							</div>

							<button type="button" className="product-item-btn" onClick={this._location.bind(this,"/detail?termId=" + (this.props.termId) + "&isNew=1")}>
								<span className="fa fa-cart-plus" />
							</button>
						</div>
					}
				</div>
			</div>
			);
	},
	_location : function(url){
		window.location = url;
	}
});

module.exports = ProductItem;