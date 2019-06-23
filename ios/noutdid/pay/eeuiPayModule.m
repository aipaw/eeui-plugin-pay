
#import "eeuiPayModule.h"
#import <AlipaySDK/AlipaySDK.h>
#import "WXApi.h"
#import "UMSPPPayUnifyPayPlugin.h"
#import <WeexPluginLoader/WeexPluginLoader.h>

static WXModuleKeepAliveCallback alipayCallback;
static WXModuleKeepAliveCallback weixinCallback;

@implementation eeuiPayModule

WX_PlUGIN_EXPORT_MODULE(pay, eeuiPayModule)
WX_EXPORT_METHOD(@selector(weixin:callback:))
WX_EXPORT_METHOD(@selector(alipay:callback:))
WX_EXPORT_METHOD(@selector(union_weixin:))
WX_EXPORT_METHOD(@selector(union_alipay:))

+ (void)alipayHandleOpenURL:(NSURL *) url
{
    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
        [eeuiPayModule onAlipayResp:resultDic];
    }];
}

+ (BOOL)weixinHandleOpenURL:(NSURL *) url
{
    return [WXApi handleOpenURL:url delegate:(id<WXApiDelegate>)[[eeuiPayModule alloc] init]];
}

//支付宝结果回调
+ (void)onAlipayResp:(NSDictionary *)result
{
    NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
    if (result != nil) {
        [data setObject:result[@"resultStatus"] forKey:@"status"];
        [data setObject:result[@"result"] forKey:@"result"];
        if ([data[@"status"] isEqualToString:@"9000"] && !result[@"memo"]) {
            [data setObject:@"支付成功" forKey:@"memo"];
        }else{
            [data setObject:result[@"memo"] forKey:@"memo"];
        }
    }
    if (alipayCallback != nil) {
        alipayCallback(data, NO);
        alipayCallback = nil;
    }
}

// 微信支付结果回调
- (void)onResp:(BaseResp *)resp
{
    if (weixinCallback != nil) {
        NSString *msg;
        if (resp.errCode == 0) {
            msg = @"支付成功";
        }else if (resp.errCode == -1) {
            msg = @"可能的原因：签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常等";
        }else if (resp.errCode == -2) {
            msg = @"用户取消";
        }else{
            return;
        }
        weixinCallback(@{@"status":@(resp.errCode), @"msg":msg}, NO);
        weixinCallback = nil;
    }
}

/*******************************************************************************************/
/*******************************************************************************************/
/*******************************************************************************************/

//官方微信支付
- (void)weixin:(NSString *)payData callback:(WXModuleKeepAliveCallback)callback
{
    NSError *err;
    NSMutableDictionary *dic = nil;
    if ([payData isKindOfClass:[NSDictionary class]]) {
        dic = (NSMutableDictionary *)payData;
    }else{
        NSData *jsonData = [payData dataUsingEncoding:NSUTF8StringEncoding];
        dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
    }
    if (!err && dic[@"appid"]) {
        [WXApi registerApp:dic[@"appid"]];
    }else{
        weixinCallback(@{@"status":@(-999), @"msg":@"注册微信支付失败"}, NO);
        return;
    }
    //
    weixinCallback = callback;
    PayReq *req  = [[PayReq alloc] init];
    req.partnerId = [WXConvert NSString:dic[@"partnerid"]];
    req.prepayId = [WXConvert NSString:dic[@"prepayid"]];
    req.package = [WXConvert NSString:dic[@"package"]];
    req.nonceStr = [WXConvert NSString:dic[@"noncestr"]];
    req.timeStamp = [dic[@"timestamp"] intValue];
    req.sign = [WXConvert NSString:dic[@"sign"]];
    if (![WXApi sendReq:req]) {
        if (weixinCallback != nil) {
            weixinCallback(@{@"status":@(-999), @"msg":@"启动微信支付失败"}, NO);
            weixinCallback = nil;
        }
    }
}

//官方支付宝支付
- (void)alipay:(NSString*)payData callback:(WXModuleKeepAliveCallback)callback
{
    NSString *fromScheme = @"";
    NSDictionary *infoDicNew = [NSBundle mainBundle].infoDictionary;
    for (NSDictionary *object in infoDicNew[@"CFBundleURLTypes"]) {
        if ([object[@"CFBundleURLName"] isEqualToString:@"eeuiAppName"]) {
            fromScheme = object[@"CFBundleURLSchemes"][0];
            break;
        }
    }
    alipayCallback = callback;
    [[AlipaySDK defaultService] payOrder:payData fromScheme:fromScheme callback:^(NSDictionary *resultDic) {
        [eeuiPayModule onAlipayResp:resultDic];
    }];
}

//银联微信支付（无回调功能）
- (void)union_weixin:(NSString*)payData
{
    NSData *jsonData = [payData dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
    if (!err && dic[@"appid"]) {
        [UMSPPPayUnifyPayPlugin registerApp:dic[@"appid"]];
    }else{
        weixinCallback(@{@"status":@(-999), @"msg":@"注册微信支付失败"}, NO);
        return;
    }
    [UMSPPPayUnifyPayPlugin payWithPayChannel:CHANNEL_WEIXIN payData:payData callbackBlock:^(NSString *resultCode, NSString *resultInfo) {

    }];
}

//银联支付宝支付（无回调功能）
- (void)union_alipay:(NSString*)payData
{
    [UMSPPPayUnifyPayPlugin payWithPayChannel:CHANNEL_ALIPAY payData:payData callbackBlock:^(NSString *resultCode, NSString *resultInfo) {

    }];
}

@end
