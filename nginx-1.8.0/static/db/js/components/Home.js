require('../../less/home.less');
require('slick-carousel/slick/slick.less');
var request = require('superagent');
var React = require('react');
var Slick = require('react-slick');
var AnimatedNumber = require('react-animated-number');
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var CartBtn = require('./CartBtn.js');
var HomeUtil = require('../utils/HomeUtil.js');

var ProductGroup = require('./ProductGroup.js');

var HomeCarousel = React.createClass({
	render: function() {
		var slickSettings = {
			dots: true,
			arrows: false,
			infinite: true,
			speed: 800,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			show:false
		};

		return (
			<div className="home-carousel">
				<Slick {...slickSettings}>
					<div className="home-carousel-item">
						<a href="/allproducts?categoryId=15&filterType=process">
							<img src="../../images/8.jpg" className="home-carousel-img"/>
						</a>
					</div>
					<div className="home-carousel-item">
						<a href="/helpCenterContent?id=1-2">
							<img src="../../images/7.png" className="home-carousel-img"/>
						</a>
					</div>
					<div className="home-carousel-item">
						<a href="/helpCenterContent?id=1-4">
							<img src="../../images/5.png" className="home-carousel-img"/>
						</a>
					</div>
					<div className="home-carousel-item">
						<a href="/shareIntro">
							<img src="../../images/6.jpg" className="home-carousel-img"/>
						</a>
					</div>
					
				</Slick>
			</div>
			);
	}
});

var HomeCount = React.createClass({
	render: function () {
		var nums = ('' + this.props.registNum).split('').map(function(item, index){
			return <span key={index} className="home-count-num">{item}</span>
		})
		return (
			<div className="home-count">
				<span>
					累计注册人数：
				</span>
				<AnimatedNumber component="text" value={this.props.registNum} className="home-count-num"
	            duration={500}
	            stepPrecision={0}
	            />
			</div>
		);
	}
})

var HomeNav = React.createClass({
	render: function() {
		return (
			<div className="home-nav">
				<Link to="/allproducts?filterType=process&isPk=1" className="home-nav-item">
					<span className="home-nav-item-icon">
						P
					</span>
					<span className="home-nav-item-text">
						PK
					</span>
				</Link>
				<Link to="/allproducts?filterType=process&isQuick=1" className="home-nav-item">
					<span className="home-nav-item-icon">
						速
					</span>
					<span className="home-nav-item-text">
						速开专区
					</span>
				</Link>
				<Link to="/allproducts?filterType=process&moneyLimit=10" className="home-nav-item">
					<span className="home-nav-item-icon">
						十
					</span>
					<span className="home-nav-item-text">
						十元专区
					</span>
				</Link>
				<div  className="home-nav-item" onClick={this._clickHandle}>
					<span className="home-nav-item-icon">
						新
					</span>
					<span className="home-nav-item-text">
						新手教程
					</span>
				</div>
			</div>
		);
	},
	_clickHandle :function(){
		window.location = 'http://www.rabbitpre.com/m/nYnY7f3';
	}
});

var Home = React.createClass({
	getInitialState: function() {
		return {
			groups:[],
			registNum: 0,
			isSubscribeShow:false
		}
	},

	componentDidMount: function() {
		HomeUtil.home(function (res) {
			this.setState(res)
		}.bind(this))
		this.interval = setInterval(() => this._getTotalBuy(), 3000);
		if(this.props.location.query.serialNum){
			var data = {};
			data.serialNum = this.props.location.query.serialNum;
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
			HomeUtil.invitationHandler(data);
		}
	},
	componentWillReceiveProps: function(nextProps) {
	    clearInterval(this.interval)
	    this.interval = setInterval(() => this._getTotalBuy(), 3000);
	  },

	_getTotalBuy: function() {
		HomeUtil.getTotalBuy(function (res) {
			this.setState({
				registNum: res
			})
		}.bind(this))
	},
	_showHandler : function(res){
		this.setState({
			show:res
		});
	},
	_showSubscribe: function (b) {
		this.setState({
			isSubscribeShow: b
		})
	},
	render: function() {
		var groups = this.state.groups.map(function(item, index) {
			return <ProductGroup key={index} {...item}/>
		});

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="home">
						<HomeCarousel />
						{/*<HomeCount registNum={this.state.registNum} />*/}
						<HomeNav />
						<Navi />
						{groups}

						<CartBtn />
						{this.state.isSubscribeShow?
						<div className="home-hidden-subscribe">
							<img className='home-hidden-subscribe-image' src='../../images/subscribe.png' />
							<button className='home-hidden-subscribe-button' onClick={this._showSubscribe.bind(this, false)}>先逛逛~</button>
						</div>
						:null}
					</div>
				</div>
			</div>
			);
	}
});

module.exports = Home;