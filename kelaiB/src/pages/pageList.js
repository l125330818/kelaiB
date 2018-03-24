/**
 * Created by luojie on 2017/10/11.
 * 注册页面路由
 */
import Enhance from "../components/mixin/Enhance";
const pages = [
	{
		key:"shopApply",//店铺申请
		module:Enhance(require("../pages/shop/shopApply").default)
	},
	{
		key:"login",//登录
		module:Enhance(require("../pages/login").default)
	},
	{
		key:"shopApplyBaseInfo",//店铺申请基本信息
		module:Enhance(require("../pages/shop/shopApplyBaseInfo").default)
	},
	{
		key:"shopAuth",//店铺认证
		module:Enhance(require("../pages/shop/shopAuth").default)
	},
	{
		key:"fillBusinessLicense",//填写执照信息
		module:Enhance(require("../pages/shop/fillBusinessLicense").default)
	},
	{
		key:"fillLegalPerson",//填写法人信息
		module:Enhance(require("../pages/shop/fillLegalPerson").default)
	},
	{
		key:"fillOtherLicence",//填写许可证信息
		module:Enhance(require("../pages/shop/fillOtherLicence").default)
	},
	{
		key:"hideReceiptRedPacket",//藏小票红包
		module:Enhance(require("../pages/redPacket/hideReceiptRedPacket").default)
	},
	{
		key:"hideARRedPacket",//藏AR红包
		module:Enhance(require("../pages/redPacket/hideARRedPacket").default)
	},
	{
		key:"payNow",//立即支付
		module:Enhance(require("../pages/pay/payNow").default)
	},
	{
		key:"hideConsumeRedPacket",//消费返现订单
		module:Enhance(require("../pages/redPacket/hideConsumeRedPacket").default)
	},
	{
		key:"shopBaseInfo",//店铺基本信息
		module:Enhance(require("../pages/shop/shopBaseInfo").default)
	},
	{
		key:"userCommentList",//用户评价列表
		module:Enhance(require("../pages/shop/userCommentList").default)
	},
	{
		key:"editPic",//店铺图片编辑
		module:Enhance(require("../pages/shop/editPic").default)
	},
    {
        key:"cashbackDetail",//返现详情
        module:Enhance(require("../pages/activity/cashbackDetail").default)
    },


	{
        key:"redPacketDetail",//红包
        module:Enhance(require("../pages/activity/redPacketDetail").default)
    },
	{
		key:"activityRedPacketDetail",//红包详情
		module:Enhance(require("../pages/activity/activityRedPacketDetail").default)
	},
	// {
	// 	key:"selectShopSite",//选择店铺地址
	// 	module:Enhance(require("../pages/shop/selectShopSite").default)
	// },
	{
		key:"setDiscountCoupon",//设置优惠券
		module:Enhance(require("../pages/activity/setDiscountCoupon").default)
	},
    {
        key:"hideRedPacketDetail",//明细消费返现/红包详情
        module:Enhance(require("../pages/activity/hideRedPacketDetail").default)
    },
    {
        key:"bindPhone",//绑定手机
        module:Enhance(require("../pages/register/bindPhone").default)
    },
    {
        key:"shopperDetail",//顾客信息
        module:Enhance(require("../pages/analyze/shopperDetail").default)
    },
	{
		key:"history",//来店历史
		module:Enhance(require("../pages/analyze/history").default)
	},
    {
        key:"withDraw",//提现
        module:Enhance(require("../pages/activity/withDraw").default)
    },

	{
        key:"withDrawSuccess",//提现成功/支付成功
        module:Enhance(require("../pages/activity/withDrawSuccess").default)
    },
	{
		key:"reduxDemo1",//提现成功/支付成功
		module:Enhance(require("../reduxDemo/reduxDemo1").default)
	},
	{
		key:"activityViewImage",//图片库预览图片
		module:Enhance(require("../pages/activity/activityViewImage").default)
	},
	{
		key:"guidePage",//引导页
		module:Enhance(require("../pages/register/guidePage").default)
	},

	{
		key:"renewValidity",//设置-续费
		module:Enhance(require("./setting/renewValidity").default)
	},
	{
		key:"aboutUs",//设置-关于我们
		module:Enhance(require("./setting/aboutUs").default)
	},

	{
		key:"employeeDetail",//设置-员工详情
		module:Enhance(require("./setting/employeeDetail").default)
	},
	{
		key:"alterPassword",//设置-修改密码-验证码
		module:Enhance(require("./setting/alterPassword").default)
	},
	{
		key:"alterDrawPassword",//设置-修改密码
		module:Enhance(require("./setting/alterDrawPassword").default)
	},
	{
		key:"defaultPage",//缺省页
		module:Enhance(require("./setting/defaultPage").default)
	},
	{
		key:"inputDiscountCoupon",//输入优惠券码
		module:Enhance(require("./activity/inputDiscountCoupon").default)
	},



	{
		key:"scanCodeSucceed",//扫码提示
		module:Enhance(require("../components/ysUI/dialog/scanCodeSucceed").default)
	},

    {
        key:"payPassword",//数字键盘
        module:Enhance(require("../components/ysUI/dialog/payPassword").default)
    },
	{
		key:"employeeManagement",//店员管理
		module:Enhance(require("../pages/setting/employeeManagement").default)
	},
	{
		key:"feedback",//反馈中心
		module:Enhance(require("../pages/setting/feedback").default)
	},
	{
		key:"launch",//反馈中心
		module:Enhance(require("../pages/launch").default)
	},
];

const obj = {};
pages.map((item)=>{
	obj[item.key] = {screen:item.module};
});

export default obj;