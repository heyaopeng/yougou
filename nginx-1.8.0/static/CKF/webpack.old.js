var path = require('path');
var webpack = require('webpack');
var I18nPlugin = require('i18n-webpack-plugin');
var languages = {
	'en_US': null,
	'zh_CN': require('./js/i18n/zh_CN.json'),
	'vi_VN': null
};

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.keys(languages).map(function(language) {
	return {
		name: language,
		entry: {
			error: './js/error.js',
			businessCollege: './js/businessCollege.js',
			basConfirm: './js/basConfirm.js',
			basDeliver: './js/basDeliver.js',
			basStock: './js/basStock.js',
			basSettle: './js/basSettle.js',
			basHistory: './js/basHistory.js',
			basBillAccount: './js/basBillAccount.js',
			basWithdraw: './js/basWithdraw.js',
			basWithdrawHistory: './js/basWithdrawHistory.js',
			basWithdrawDetail: './js/basWithdrawDetail.js',
			basPrintTable: './js/basPrintTable.js',
			cart: './js/cart.js',
			entry: './js/entry.js',
			index: './js/index.js',
			favouriteProduct: './js/favouriteProduct.js',
			pay: './js/pay.js',
			payFail: './js/payFail.js',
			paySuccess: './js/paySuccess.js',
			productDetail: './js/productDetail.js',
			payOrder: './js/payOrder.js',
			refundApply: './js/refundApply.js',
			refundAwb: './js/refundAwb.js',
			refundDetail: './js/refundDetail.js',
			refundWaiting: './js/refundWaiting.js',
			rank: './js/rank.js',
			search: './js/search.js',
			search2: './js/search2.js',
			userAddress: './js/userAddress.js',
			userCenter: './js/userCenter.js',
			userComment: './js/userComment.js',
			userOrder: './js/userOrder.js',
			userOrderDetail: './js/userOrderDetail.js',
			userProfile: './js/userProfile.js',
			internationalFashion: './js/internationalFashion.js',
			securityCenter: './js/securityCenter.js',
			refundApplication: './js/refundApplication.js',
			refundFinish: './js/refundFinish.js',
			refundProcessing: './js/refundProcessing.js',
			bulletinsAll: './js/bulletinsAll.js',
			bulletinsDetail: './js/bulletinsDetail.js',
			feedbackCenter: './js/feedbackCenter.js',
			billHistory: './js/billHistory.js',
			billDetail: './js/billDetail.js',
			recharge: './js/recharge.js',
			withdraw: './js/withdraw.js',
			transactionHistory: './js/transactionHistory.js',
			withdrawHistory: './js/withdrawHistory.js',
			rechargeHistory: './js/rechargeHistory.js',
			paySuccessLine: './js/paySuccessLine.js',
			payLine: './js/payLine.js',
			sign: './js/sign.js',
			resetPw: './js/resetPw.js',
			userProtocol: './js/userProtocol.js',
			helpCenter: './js/helpCenter.js',
			mBasSign: './js/mBasSign.js',
			mBasConfirm: './js/mBasConfirm.js',
			mBasConfirmIn: './js/mBasConfirmIn.js',
			mBasSearch: './js/mBasSearch.js',
			mBasDelivery: './js/mBasDelivery.js',
			mBasStock: './js/mBasStock.js',
			mBasStockIn: './js/mBasStockIn.js',
			mBasSettle: './js/mBasSettle.js',
			channel:'./js/channel.js',
			channel2:'./js/channel2.js',
			withdrawDetail: './js/withdrawDetail.js',
			channel3: './js/channel3.js',
			channel4:'./js/channel4.js',
			hd1:'./js/hd1.js'
		},
		output: {
			path: path.join(__dirname, 'build'),
			filename: language + '.[name].js',
			publicPath: './build/'
		},
		module: {
			loaders: [{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader', {
					publicPath: './'
				})
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
					publicPath: './'
				})
			}, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?v=[\d.]+)?(\?[a-z0-9#-]+)?$/,
				loader: 'file-loader'
			}, {
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192'
			}, {
				test: /\.handlebars$/,
				loader: 'handlebars-loader',
				query: {
					helperDirs: [__dirname + '/js/hbs/helpers']
				}
			}]
		},
		plugins: [
			// new webpack.optimize.UglifyJsPlugin(),
			new I18nPlugin(
				languages[language]
			),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				// Handlebars: 'handlebars/runtime'
				Handlebars: __dirname + '/js/hbs/handlebars.runtime-v4.0.4.js'
			}),
			new webpack.DefinePlugin({
				'require.specified': 'require.resolve',
				'ENV': {
					// 'debug': true
					'debug': false
				}
			}),
			new ExtractTextPlugin('[name].css')
		]
	};
});