require('../../less/pre-detail.less');

var React = require('react');
var Navi = require('./Navi.js');
var PreDetailUtil = require('../utils/PreDetailUtil.js');
var FormUtil = require('../utils/FormUtil.js');
var fto = require('form_to_object');
var ErrorMessage = require('./ErrorMessage.js');
var browserHistory = require('react-router').browserHistory;
var errMap = {
	'empty_code': '请输入活动代码'
};

var PreDetail = React.createClass({

	getInitialState: function(){
		return {
			error: '',
			code:''
		};
	},
	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='pre-detail'>
						<img className='pre-detail-image' src='/images/preDetail.png'/>
						<div className='pre-detail-text'><span>输入口令</span></div>
						<form className='form-horizontal pre-detail-form' onSubmit={this._handleSubmit}>
							
							<div className='form-group pre-detail-form-group'>
								<input className="form-control" type="text" name="code"  onChange={this._handleChange.bind(this,'code')} onFocus={this._focus}/>
							</div>
							<ErrorMessage error={this.state.error} />
							<button type="submit" className="btn btn-primary btn-block pre-detail-button">提交</button>
						</form>
					</div>
				</div>
			</div>
			);
	},

	_handleChange : function(key,e){
		var nState = this.state;
		nState[key] = e.target.value;
		this.setState(nState);
	},

	_focus : function(){
		window.scroll(0, document.activeElement.offsetTop);
	},
	_handleSubmit : function(e){
		e.preventDefault();
		var data = fto(e.target);
		if(!data.code){
			this.setState({
				error: errMap['empty_code']
			});
			return false;
		}
		PreDetailUtil.getData(data, function(res) {
			if (res.termId!==null) {
				window.location='/detail?termId=' + res.termId;
			}else{
				alert('请输入正确的活动代码');
			}
		}.bind(this));
	}
});

module.exports = PreDetail;