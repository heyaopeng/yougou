import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import '../less/A.less';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
//var A  = require('./A.js')
const rootRoute = {
	//onEnter: A.requireAuth,
	childRoutes: [{
		path: '/',
		component: require('./components/App.js'),
		indexRoute: {
			component: require('./components/Home.js')
		},
		childRoutes: [
			require('./routes/Page.js'),
			require('./routes/Detail.js'),
			require('./routes/DetailChart.js'),
			require('./routes/DetailDescription.js'),
			require('./routes/PostShare.js'),
			require('./routes/AllProducts.js'),
			require('./routes/TreasureRecord.js'),
			require('./routes/WinRecord.js'),
			require('./routes/Announcement.js'),
			require('./routes/AccountCenter.js'),
			require('./routes/Share.js'),
			require('./routes/Commission.js'),
			require('./routes/Invitation.js'),
			require('./routes/UserCenter.js'),
			require('./routes/Address.js'),
			require('./routes/EditAddr.js'),
			require('./routes/EditInfo.js'),
			require('./routes/RecordDetail.js'),
			require('./routes/CommonRecordDetail.js'),
			require('./routes/ShowList.js'),
			require('./routes/JoinList.js'),
			require('./routes/LuckyList.js'),
			require('./routes/UserHome.js'),
			require('./routes/UserShowList.js'),
			require('./routes/Cart.js'),
			require('./routes/Order.js'),
			require('./routes/Payment.js'),
			require('./routes/Withdraw.js'),
			require('./routes/WithdrawList.js'),
			require('./routes/StoreApplication.js'),
			require('./routes/ApplicationResult.js'),
			require('./routes/HelpCenter.js'),
			require('./routes/HelpCenterContent.js'),
			require('./routes/WXScan.js'),
			require('./routes/CashCoupon.js'),
			require('./routes/CouponDetail.js'),
			require('./routes/CashCouponBalance.js'),
			require('./routes/CouponWithdraw.js'),
			require('./routes/CouponWithdrawList.js'),
			require('./routes/TermReal.js'),
			require('./routes/RecentOpen.js'),
			require('./routes/WaitingOpen.js'),
			require('./routes/PaymentResult.js'),
			require('./routes/WXSignIn.js'),
			require('./routes/PaymentAlipay.js'),
			require('./routes/ShareIntro.js'),
			require('./routes/ChouJiang.js'),
			require('./routes/PreDetail.js'),

			{
				path: '*',
				component: require('./components/NotFound.js')
			}
		]
	}]
};

render(
	<Router
	history={browserHistory}
	routes={rootRoute}
	/>,
	document.getElementById('app')
	);
