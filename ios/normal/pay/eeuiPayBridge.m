//
//  eeuiPayBridge.m
//  eeuiApp
//
//  Created by 高一 on 2019/1/6.
//

#import "eeuiPayBridge.h"
#import "eeuiPayModule.h"

@interface eeuiPayBridge ()

@property (nonatomic, strong) eeuiPayModule *pay;

@end

@implementation eeuiPayBridge

- (void)initialize
{
    if (self.pay == nil) {
        self.pay = [[eeuiPayModule alloc] init];
    }
}

- (void)weixin:(NSDictionary *)payData callback:(WXModuleKeepAliveCallback)callback
{
    [self.pay weixin:payData callback:callback];
}

- (void)alipay:(NSString*)payData callback:(WXModuleKeepAliveCallback)callback
{
    [self.pay alipay:payData callback:callback];
}

@end
