require('../../less/all-products.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var ProductItem = require('./ProductItem.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var AllProductsUtil = require('../utils/AllProductsUtil.js');

var AllProductsCats = React.createClass({
	render: function() {
		if (!this.props.showCat) {
			return null;
		}

		var cats = this.props.cats.map(function(item, index) {
			return (
				<Link key={index} to={{
					pathname: '/allproducts',
					query: {
						categoryId: item.categoryId,
						filterType: this.props.filterType
					}
				}} className="all-prod-cat">
					<span className="all-prod-cat-icon">
						{item.category.slice(0, 1)}
					</span>
					{item.category}
				</Link>
				);
		}, this)

		return (
			<div className="all-prod-cats" onClick={this.props.toggleCat}>
				<div className="all-prod-cats-wrap">
					<Link to={{
						pathname: '/allproducts',
						query: {
							filterType: this.props.filterType
						}
					}} className="all-prod-cat">
						<span className="all-prod-cat-icon">
							全
						</span>
						全部分类
					</Link>
					<Link to={{
						pathname: '/allproducts',
						query: {
							moneyLimit: 1,
							filterType: this.props.filterType
						}
					}} className="all-prod-cat">
						<span className="all-prod-cat-icon">
							一
						</span>
						一元专区
					</Link>
					<Link to={{
						pathname: '/allproducts',
						query: {
							moneyLimit: 10,
							filterType: this.props.filterType
						}
					}} className="all-prod-cat">
						<span className="all-prod-cat-icon">
							十
						</span>
						十元专区
					</Link>
					<Link to={{
						pathname: '/allproducts',
						query: {
							isQuick: 1,
							filterType: this.props.filterType
						}
					}} className="all-prod-cat">
						<span className="all-prod-cat-icon">
							速
						</span>
						速开专区
					</Link>
					<Link to={{
						pathname: '/allproducts',
						query: {
							isPk: 1,
							filterType: this.props.filterType
						}
					}} className="all-prod-cat">
						<span className="all-prod-cat-icon">
							PK
						</span>
						PK专区
					</Link>
					{cats}
				</div>
			</div>
			);
	}
});

var AllProductsTab = React.createClass({
	getInitialState: function() {
		return {
			showCat: false
		}
	},

	render: function() {
		var filterType = this.props.query.filterType || 'process'

		return (
			<div className="all-prod-tab">
				<AllProductsCats showCat={this.state.showCat} filterType={filterType} cats={this.props.cats} toggleCat={this._toggleCat}/>
				<div className={'all-prod-tab-item'} onClick={this._toggleCat}>
					<span className="fa fa-list-ul"/> 分类
				</div>
				<div className={'all-prod-tab-item' + (filterType === 'process' ? ' active' : '')}
					onClick={this._tap.bind(this, {
						filterType: 'process'
					})}>
					进度
				</div>
				<div className={'all-prod-tab-item' + (filterType === 'newest' ? ' active' : '')}
					onClick={this._tap.bind(this, {
						filterType: 'newest'
					})}>
					最新
				</div>
				<div className={'all-prod-tab-item' + (filterType.slice(0,5) === 'price' ? ' active' : '')}
					onClick={this._tap.bind(this, {
						filterType: (filterType === 'priceAsc' ? 'priceDesc' : 'priceAsc')
					})}>
					<span className={'all-prod-tab-price' + 
						(filterType === 'priceAsc' ? ' all-prod-tab-price-asc' : '') +
						(filterType === 'priceDesc' ? ' all-prod-tab-price-desc' : '')
						}>
						价格
					</span>
				</div>
			</div>
			)
	},

	_toggleCat: function() {
		this.setState({
			showCat: !this.state.showCat
		})
	},

	_tap: function(q) {
		var query = this.props.query;
		query.filterType=q.filterType;
		browserHistory.replace({
			pathname: '/allproducts',
			query: query
		})
	}
});

var AllProducts = React.createClass({
	getInitialState: function() {
		return {
			cats: [],
			terms: [],
			hasNextPage: false,
			pageNum: 0
		}
	},

	componentDidMount: function() {
		var prevPath = sessionStorage.getItem('prev_path')
		var cache = sessionStorage.getItem('all_products_cache')
		var scroll = sessionStorage.getItem('all_products_scroll')
		if (prevPath && prevPath === '/detail' && cache) {
			cache = JSON.parse(cache)
			this.setState(cache)
			setTimeout(function() {
				document.getElementById('scroll-load').scrollTop = Number(scroll)
			}, 0)
		}
		else {
			this._getData(this.props.location.query)
		}
	},

	componentWillUnmount: function() {
		sessionStorage.setItem('all_products_scroll', document.getElementById('scroll-load').scrollTop)
		sessionStorage.setItem('all_products_cache', JSON.stringify(this.state))
	},

	componentWillReceiveProps: function(nextProps) {
		this._getData(nextProps.location.query)
	},

	render: function() {
		var terms = this.state.terms.map(function(item, index) {
			return <ProductItem key={index} {...item} />
		});

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="all-prod">
						<AllProductsTab query={this.props.location.query} cats={this.state.cats}/>
						<ScrollLoad
							containerHeight={window.innerHeight-91}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>

							<div className="all-prod-items">
								{terms}
							</div>

                            {
                                this.state.hasNextPage ?
                                null
                                :
                                <div className="text-center">
                                    ~~已显示全部
                                </div>
                            }

						</ScrollLoad>
						
						<Navi />
					</div>
				</div>
			</div>
			);
	},

	_getData: function(q) {
		AllProductsUtil.allProducts(q, function(res) {
			this.setState(res);
		}.bind(this))
	},
	_loadMore: function() {
		if (this.state.hasNextPage) {

            this.setState({
                loading: true
            });
            var q = _.assign({}, this.props.location.query)
            q.pageNum = this.state.pageNum + 1
            AllProductsUtil.allProducts(q, function(res) {
                var nState = _.assign({}, this.state);
                nState.terms = nState.terms.concat(res.terms);
                this.setState({
                    loading: false,
                    hasNextPage: res.hasNextPage,
                    terms: nState.terms,
                    pageNum: res.pageNum
                });
            }.bind(this));
		}
	}
});

module.exports = AllProducts;