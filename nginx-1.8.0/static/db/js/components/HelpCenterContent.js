require('../../less/help-center-content.less');
var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var HelpCenterContent = React.createClass({
	getInitialState: function() {
		return {
			id: this.props.location.query.id 
		}
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
				<ScrollLoad containerHeight={window.innerHeight-51}>
					<div className='help-center-content'>
						{
							this.state.id==='1-1'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC优购的产品是正品吗？
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>UC优购严格控制产品供应链，保证所有产品都是由正规厂家提供的，如有货品质量疑问，请马上联系客服人员，敬请用户进行监督，谢谢亲们的配合。
										</div>
									</div>
								</div>
							:
							this.state.id==='1-2'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											什么是UC优购
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>UC优购，是一个以众筹为模式销售各类商品的平台。其引入了一元众筹购物的概念，用户只需一元参与，就有机会获得一件商品。具体玩法是：商品按照一元一人次的概念，将总价分成若干份，每参与一人次即可获得一个摇奖号，当商品到达总人次时，系统结合福利彩票时时彩，通过公式公平公正的计算出幸运号，拥有该号码的用户即可获得该件商品。
										</div>
									</div>
								</div>
							:
							this.state.id==='1-3'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC优购有几种玩法及形式
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>UC优购按照购买面额及开奖方式一种分为四种形式的玩法。分别是1元专区，10元专区，PK专区，速开专区。下面对每种形式的玩法进行说明：
	   										<div>1.一元专区：一元专区是UC优购最传统的玩法，设置起始购买份额为1份，每次增加份额的增量为1。</div>
	   										<div>2.十元专区：十元专区是在一元专区上进行升级，针对总份额较大的产品，如汽车，昂贵电子产品，奢侈品，设置起始购买份额为10份，每次增加份额的增量为10。</div>
	    									<div>3.PK专区：是在十元专区基础上的变形，对于价格适中的产品进行，为了满足用户快速进行UC购物的情景，特定设置起始份额为商品总份额的50%，无增量，即每次购买只能购买一半份额，总参与人数为两人，称之为PK专区。</div>
	    									<div>4.速开专区：UC优购是公平公正的众筹平台，其开奖公式是用最后购买的五十个份额及福利彩票时时彩作为两个随机数，以确保开奖的公平性。为了考虑时时彩开奖周期的问题，满足用户快速开奖UC的情景，部分商品会开设速开专区，将开奖公式中的时时彩参数剔除，满额之后立即根据最后购买的五十个份额所对应的购买时间进行开奖。</div>
										</div>
									</div>
								</div>
								:
							this.state.id==='1-4'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC优购公正公平吗
										</div>
										<a href="/termReal?termId=101"><div className="button">
											查看范例
										</div></a>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>公平、公正是UC优购平台生存的根本。一元众筹的幸运号是由预设的公式计算得出，公式中的两个参数是不受认为控制的，具有完全随机性。计算公式：[(数值A+数值B)÷商品总需份额]取余数+10000001(固定值)
											<div>数值A：该商品满额时最后50条参与记录时间之和精确到毫秒。</div>
											<div>数值B：广东高频十一选五最新开奖结果拼接数字后四位,例如最新一期开奖为03,08,05,11,10，那么数值B为1110。</div>
											<div>在UC优购的计算公式中，我们加入了下一期广东福利彩票快乐十分开奖结果，所谓下一期开奖结果，是指与商品满额时间距离大于两分钟的广东福利彩票快乐十分最近一期开奖结果，这个结果是不可能被预知的，因此没办法做到人为干扰开奖结果。任何一个摇奖号码，都有可能成为最终的幸运号。</div>
											<div>公平公正和透明的原则是UC优购的核心，敬请用户关注我们的开奖结果是否属实，UC优购再次对您的支持表示衷心的感谢，祝您购买愉快~！</div>
										</div>
									</div>
								</div>
								:
							this.state.id==='1-5'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											如何参加一元众筹
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>进入商城后，选择自己喜欢的商品，加入购物车，然后选择参与份额，提交订单后可通过微信支付，佣金支付，U币支付等方式完成支付，即可获得份额对应数量的摇奖号，等待满额开奖后即可获得商品。是不是很简单呢？赶快喊小伙伴来参与吧~
										</div>
									</div>
								</div>
								:
							this.state.id==='1-6'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											什么是U币
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>1）U币的作用：
											   <div>U币是UC优购平台的代币，一个U币相当于一块钱面额的人民币，在支付的时候可选择U币支付。</div>
											 <div>2）U币的来源：</div>
											    <div>U币可通过以下两种来源获得：</div>
											    <div>1.商城支付优惠活动期间，用户使用非U币的方式完成支付之后，即可获得相当于支付金额2-3%数量的U币。</div>
											    <div>2.用户每次进行购买时候，如果商品竞争激烈导致库存不足，则购买失败的份额将转化成等额的U币发放到用户的U币账户中。</div>
										</div>
									</div>
								</div>
								:
							this.state.id==='1-7'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											怎样查看是否中奖以及如何领取获奖产品
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>当商品所在期数已达到满额后，用户可以进入用户中心，查看自己的购买记录，并且可以点击商品详情查看开奖进程。当商品完成开奖，如果用户所得摇奖号与开奖幸运号一致，则用户可以再用户中心的中奖记录查看并且领取所得商品。
										</div>
									</div>
								</div>
								:
							this.state.id==='1-8'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											如果一件商品很久没有达到总需人次怎么办
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>若某件商品的所有份额从开始分配的日期算起，90天（汽车分类的产品除外，时间为180天）仍未分配完毕，则UC优购平台将取消该件商品的UC活动，并且向用户退换等额的U币，所退还的U币将在3个工作日内退换到用户的U币账户中，请用户注意查收。
										</div>
									</div>
								</div>
								:
							this.state.id==='1-9'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC优购提醒您：保护自身利益，避免损失
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<div><span>答：</span>1.各种形式的合购，合资，私下交易等都具有一定的风险性，请大家切勿参与。</div>
											<div>2.凡是以“高中奖率，内部员工，系统存在漏洞”等信息进行代购的，均属于诈骗行为，请用户切勿相信。</div>
											<div>3.UC优购官方工作人员在任何时候都不会想用户索取账户密码等信息，请大家注意保护自己的信息安全。</div>
											<div>4.当您获得商品之后，UC优购不会以私信或者qq的形式通知您获得商品，更不会以任何理由要求您缴纳任何其他费用，请知悉及注意。</div>
											<div>5.如有问题，请第一时间联系UC优购的电话客服：15902023879，客服工作时间为9:00-18:00。</div>
											<div>感谢大家一直以来的信任与支持，希望大家在UC优购常获惊喜，祝各位好运。</div>
										</div>
									</div>
								</div>
								:
							this.state.id==='2-1'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC优购支持哪些支付方式
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>目前UC优购平台支持微信支付，U币支付，佣金支付等三种方式。
										</div>
									</div>
								</div>
								:
							this.state.id==='2-2'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											U币是否可以提现
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>很抱歉，U币无法进行提现，请您根据实际情况合理进行U币的使用，完成UC活动，感谢您的支持与配合。
										</div>
									</div>
								</div>
								:
							this.state.id==='3-1'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC获得的商品什么时候发货
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>获得UC商品后请您尽快提交收货地址，超过7天未确认收货地址，视为主动放弃该商品（系统不会默认您的“收货地址”中的收货信息，每次获得UC商品后都需要确认收货地址）。一般商品派发的周期为10个工作日以内。如您对于派发周期较为介意，建议您慎重参与。
										</div>
									</div>
								</div>
								:
							this.state.id==='3-2'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											我需要付快递费用吗？
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>UC优购的产品在中奖后的派发，是不收取用户物流费用的。但如因用户个人原因导致快递无法正常派件，二次配送则由用户自行承担物流运输费用。
										</div>
									</div>
								</div>
								:
							this.state.id==='3-3'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											我可以修改已确认的收货地址吗？
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>获得UC商品后一旦确认收货地址，将无法进行二次修改。请您慎重填写！如因用户个人原因导致快递无法正常派件，二次配送则由用户自行承担物流运输费用。
										</div>
									</div>
								</div>
								:
							this.state.id==='3-4'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											我可以挑选商品的颜色以及型号吗？
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>用户获得的UC商品均按参与时商品的名称来寄送，如颜色等属性没有显性说明，则随机进行派送。
										</div>
									</div>
								</div>
								:
							this.state.id==='3-5'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											关于物流方面的售后
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>"如您的商品在快递运输过程中损坏或遗失，请立即联系客服电话：15902023879,。客服会与物流工作人员核实，确认索赔后即可重新安排商品寄送事宜。
												温馨提醒：快递损件，必须先验收无误，发现问题后拒收，联系客服处理。确认签收后发现商品损坏，物流方面是不予处理的哦！"
										</div>
									</div>
								</div>
								:
							this.state.id==='3-6'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											签收时需注意哪些问题
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<div><span>答：</span>1）签收时请慎重，尽量本人签收，签收时务必仔细检查商品，如：外包装是否被开封，商品是否破损，配件是否确实，功能是否正常。在确保无误后再签收，以免产生不必要的纠纷。如有任何疑问，请及时联系客服解决：15902023879。如因用户未仔细检查商品即签收后产生的纠纷，UC优购概不负责，仅承担协调处理的义务；</div>
											<div>2）用户所获商品，相关商品质量及保修问题请直接联系生产厂家；</div>
											<div>3）若因您的地址填写错误、联系方式填写有误等情况导致商品无法完成投递或被退回，所产生的额外费用及后果由用户负责；</div>
											<div>4）如因不可抗拒的自然灾害：如地震，洪水等，所造成的商品配送延迟，UC优购不承担责任；</div>
											<div>5）温馨提醒：如商品已签收，则说明商品配送正确无误且不存在影响使用的因素，元UC有权不受理换货申请。</div>
										</div>
									</div>
								</div>
								:
							this.state.id==='3-7'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC获得的商品有发票吗
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>用户在UC优购获得的商品，均无发票提供。单UC优购所有商品均从正规渠道采购，100%正品，可享受厂家所提供的全国联保服务，您无需担心对售后处理有任何影响。
										</div>
									</div>
								</div>
								:
							this.state.id==='3-8'?
								<div className="help-center-content-item">
									<div className="help-center-content-item-ques">
										<div className="icon fa fa-question-circle-o"></div>
										<div className="text">
											UC获得的商品如何进行保修
										</div>
									</div>
									<div className="help-center-content-item-ans">
										
										<div className="text">
											<span>答：</span>UC优购所有商品均从正规渠道采购，100%正品，可享受厂家所提供的全国联保服务。售后标准均依照产品的售后标准进行。【如产品遇到质量问题，建议第一时间联系该产品的官方指定售后维修点；若您遇到无法自行联系处理的，可以联系客服协助处理，客服电话：15902023879】
										</div>
									</div>
								</div>
								:null
						}
						</div>
						</ScrollLoad>
						
						<Navi />
					
				</div>
			</div>
			);
	}
});

module.exports = HelpCenterContent;