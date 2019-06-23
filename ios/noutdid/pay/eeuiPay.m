//
//  eeuiPay.m
//  Pods
//
//  Created by 高一 on 2019/3/2.
//

#import "eeuiPay.h"
#import "eeuiPayModule.h"
#import "eeuiPayBridge.h"
#import "WeexInitManager.h"

WEEX_PLUGIN_INIT(eeuiPay)
@implementation eeuiPay

+ (instancetype) sharedManager {
    static dispatch_once_t onceToken;
    static eeuiPay *instance;
    dispatch_once(&onceToken, ^{
        instance = [[eeuiPay alloc] init];
    });
    return instance;
}

- (void) openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options
{
    if ([url.host isEqualToString:@"safepay"]) {
        // 支付宝处理支付结果
        [eeuiPayModule alipayHandleOpenURL:url];
    }else if ([url.host isEqualToString:@"pay"]) {
        // 微信支付处理支付结果
        [eeuiPayModule weixinHandleOpenURL:url];
    }
}

- (void) setJSCallModule:(JSCallCommon *)callCommon webView:(WKWebView*)webView
{
    [callCommon setJSCallAssign:webView name:@"pay" bridge:[[eeuiPayBridge alloc] init]];
}

@end
