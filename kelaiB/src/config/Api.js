const Api = {
    "weChatAuthorization":"/Merchant/WeChatAuthorization",//微信授权
    "sendVerCode":"/Merchant/SendVerCode",//发送验证码
    "verifyCodeVerification":"/Merchant/VerifyCodeVerification",//验证验证码是否正确
    "bindPhone":"/Merchant/BindPhone",//绑定手机号
    "uploadAvatar":"/Merchant/UploadImage/Avatar",//头像图片
    "uploadShopLogo":"/Merchant/UploadImage/Logo",//店铺logo
    "uploadLicense":"/Merchant/UploadImage/License",//执照上传
    "uploadARImage":"/Merchant/UploadImage/RedPacket",//ar图片上传
    "uploadTicket":"/Merchant/UploadImage/Ticket",//消费返现图片上传
    "getShopCategory":"/Merchant/GetShopCategory",//获取店铺分类
    "getShopBaseInfo":"/Merchant/GetShopBaseInfo",//通过ID获取店铺基本信息
    "editShop":"/Merchant/EditShop",//编辑店铺基本信息
    "getShopLicense":"/Merchant/GetShopLicense",//通过店铺ID获取店铺营业执照信息
    "editShopLicense":"/Merchant/EditShopLicense",//编辑店铺营业执照
    "getShopMaster":"/Merchant/GetShopMaster",//通过店铺ID获取店铺法人信息
    "editShopMaster":"/Merchant/EditShopMaster",//编辑店铺法人信息
    "getShopGrant":"/Merchant/GetShopGrant",//通过店铺ID获取店铺许可证信息
    "editShopGrant":"/Merchant/EditShopGrant",//编辑店铺许可证信息
    "getApplyShop":"/Merchant/GetApplyShop",//获取申请店铺信息
    "getShopDetail":"/Merchant/GetShopDetail",//获取店铺详情
    "getShopComment":"/Merchant/GetShopComment",//获取店铺评论信息
    "saveStoreImage":"/Merchant/SaveStoreImage",//保存店铺图片
    "getARRedPacketSet":"/Merchant/GetARRedPacketSet",//获取AR红包设置
    "aRRedPacketOrder":"/Merchant/ARRedPacketOrder",//藏AR红包
    "getTicketRedPacketSet":"/Merchant/GetTicketRedPacketSet",//获取小票红包设置
    "ticketRedPacketOrder":"/Merchant/TicketRedPacketOrder",//设置消费返现
    "getTicketValidTime":"/Merchant/GetTicketValidTime",//获取小票有效时间
    "getShopAccount":"/Merchant/GetShopAccount",//获取店铺资金账户
    "getPaySign":"/Merchant/PayRedPacket",//第三方支付获取签名

};
export default Api;