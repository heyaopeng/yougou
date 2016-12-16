var React = require('react')
var Link = require('react-router').Link

var CartBtn = (props) => {
	return (
		<Link to="/cart" style={{
			position: 'fixed',
			zIndex: 9999,
			bottom: '60px',
			right: '25px',
			backgroundColor: 'rgb(226, 64, 61)',
			color: '#fff',
			display: 'block',
			width: '50px',
			height: '50px',
			borderRadius: '50%',
			boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
			fontSize: '18px'
		}}>
			<span className="fa fa-cart-plus" style={{
				position: 'absolute',
				width: '18px',
				height: '18px',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				margin: 'auto'
			}}/>
		</Link>
		)
}

module.exports = CartBtn