require('../../less/post-share.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory
var Navi = require('./Navi.js');
var fto = require('form_to_object')
var ErrorMessage = require('./ErrorMessage.js')

var PostShareUtil = require('../utils/PostShareUtil.js')

var PostShareFile = React.createClass({
	getInitialState: function() {
		return {
			src: null
		}
	},

	render: function() {
		return (
			<div className="post-share-file" onClick={this._openFileDialog}>
				{
					!this.state.src ?
					<span className="glyphicon glyphicon-plus" />
					:
					<img src={this.state.src} width="85" height="85" />
				}
				<input type="file" className="post-share-file-input" ref="aFile" onChange={this._handleFileChange} name={this.props.name}/>
			</div>
			)
	},

	_openFileDialog: function() {
		this.refs.aFile.click();
	},

	_handleFileChange: function(e) {
		var f = e.target;
		if (!/\.(jpg|jpeg|png)$/i.test(f.value)) {
			e.preventDefault();
			alert('图片格式错误');
			f.value = '';
			return false;
		}


		if (f.files && f.files[0]) {

			var reader = new FileReader();

			reader.onload = function(e) {
				this.setState({
					src: e.target.result
				});
			}.bind(this);

			reader.readAsDataURL(f.files[0]);

			if (typeof this.props.afterChange === 'function') {
				this.props.afterChange({
					index: this.props.index,
					file: f.files[0]
				})
			}
		}
	}
})

var PostShare = React.createClass({
	getInitialState: function () {
		return {
			error: '',
			images0: null,
			images1: null,
			images2: null
		}
	},

	render: function() {
		console.log(this.props.location.query.orderSerialNum);
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className="post-share">
						<form className="post-share-form" onSubmit={this._submit} encType="multipart/form-data">
							<input name="orderSerialnum"  type='hidden' className="form-control" value={this.props.location.query.orderSerialNum}/>
							<div className="form-group">
								<input name="title" className="form-control" placeholder="这一刻的想法..."/>
							</div>
							<div className="form-group post-share-files">
								<PostShareFile name="images" index="0" afterChange={this._afterChange}/>
								<PostShareFile name="images" index="1" afterChange={this._afterChange}/>
								<PostShareFile name="images" index="2" afterChange={this._afterChange}/>
							</div>
							<div className="form-group">
								<ErrorMessage error={this.state.error} />
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-danger btn-block post-share-button">
									立即晒单
								</button>
							</div>
						</form>
						<Navi />
					</div>
				</div>
			</div>
			);
	},

	_afterChange: function(info) {
		this.setState({
			[`images${info.index}`]: info.file
		})
	},

	_submit: function(e) {
		e.preventDefault()
		var data = fto(e.target)
		
		if (!data.title) {
			this.setState({
				error: '请输入标题'
			})
			return false
		}

		if (!data.images) {
			this.setState({
				error: '至少上传一张图片'
			})
			return false
		}
		var fd = new FormData()
		fd.append('title', data.title);
		fd.append('orderSerialnum',data.orderSerialnum);
		[0, 1, 2].forEach((item) => {
			if (this.state[`images${item}`]) {
				fd.append(`images`, this.state[`images${item}`])
			}
		})

		PostShareUtil.shareHandler(fd, function(res) {
			browserHistory.push({
				pathname: '/userShowList'
			});
		}.bind(this))
		return false
	}
});

module.exports = PostShare;