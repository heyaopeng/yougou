var path = require("path");
var webpack = require("webpack");
var I18nPlugin = require("i18n-webpack-plugin");
var languages = {
	"en_US": null,
	"zh_CN": require("./js/i18n/zh_CN.json"),
	"vi_VN": require("./js/i18n/zh_CN.json")
};
module.exports = Object.keys(languages).map(function(language) {
	return {
		name: language,
		entry: {
			addBanner: "./js/addBanner.js",
			addComment: "./js/addComment.js",
			announcement: "./js/announcement.js",
			announcementDetail: "./js/announcementDetail.js",
			announcementList: "./js/announcementList.js",
			applyDisput: "./js/applyDisput.js",
			backendRefundHandle: "./js/backendRefundHandle.js",
			backendReturnHandle: "./js/backendReturnHandle.js",
			boundPhone: "./js/boundPhone.js",
			cart: "./js/cart.js",
			commentList: "./js/commentList.js",
			favouritePro: "./js/favouritePro.js",
			feedback: "./js/feedback.js",
			feedbackList: "./js/feedbackList.js",
			financialAccountSet: "./js/financialAccountSet.js",
			forgetpaswd: "./js/forgetpaswd.js",
			login: "./js/login.js",
			modifyApplyDispute: "./js/modifyApplyDispute.js",
			myAddress: "./js/myAddress.js",
			orderDetail: "./js/orderDetail.js",
			orderProcedure: "./js/orderProcedure.js",
			page1: "./js/page1.js",
			pay: "./js/pay.js",
			productDetail: "./js/productDetail.js",
			recharge: "./js/recharge.js",
			rechargeHistory: "./js/rechargeHistory.js",
			refundCountdown: "./js/refundCountdown.js",
			refundHandling: "./js/refundHandling.js",
			refundMessage: "./js/refundMessage.js",
			register: "./js/register.js",
			resetpaswd: "./js/resetpaswd.js",
			returnAddress: "./js/returnAddress.js",
			returnHandling: "./js/returnHandling.js",
			securityCenter: "./js/securityCenter.js",
			securityQuestion: "./js/securityQuestion.js",
			securityReset: "./js/securityReset.js",
			shippingTplGradient: "./js/shippingTplGradient.js",
			shippingTplGradientUpdate: "./js/shippingTplGradientUpdate.js",
			shippingTplRenewal: "./js/shippingTplRenewal.js",
			shippingTplRenewalUpdate: "./js/shippingTplRenewalUpdate.js",
			storeBannerList: "./js/storeBannerList",
			transactionHistory: "./js/transactionHistory.js",
			userProfile: "./js/userProfile.js",
			verification: "./js/verification.js",
			withdraw: "./js/withdraw.js",
			withdrawHistory: "./js/withdrawHistory.js",
			usersManage: "./js/usersManage.js",
			receivableRecord: "./js/receivableRecord.js",
			rolesManage: "./js/rolesManage.js",
			updateRole: "./js/updateRole.js",
			permissionManage: "./js/permissionManage.js",
			updatePermission: "./js/updatePermission.js",
			updateUser: "./js/updateUser.js",
			othersData: "./js/data/othersData.js",
			userData: "./js/data/userData.js",
			tradingData: './js/data/tradingData.js',
			productData: './js/data/productData.js',
			updateMyPwd: './js/updateMyPwd.js',
			rankingData: './js/data/rankingData.js',
			rolesManage:'./js/rolesManage.js',
			backendBannerList: "./js/backendBannerList",
			modifyPhone: "./js/modifyPhone"
		},
		output: {
			path: path.join(__dirname, "js/build"),
			filename: language + ".[name].js",
			publicPath: './js/build'
		},
		plugins: [
			new I18nPlugin(
				languages[language]
			),
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery",
				// change to use a npm module
				Handlebars: 'handlebars/runtime',
				moment: 'moment/moment'
			}),
			new webpack.DefinePlugin({
				"require.specified": "require.resolve"
			})
		]
	};
});