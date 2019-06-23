
#import <Foundation/Foundation.h>
#import "WeexSDK.h"

@interface eeuiPayModule : NSObject <WXModuleProtocol>

+ (void)alipayHandleOpenURL:(NSURL *) url;
+ (BOOL)weixinHandleOpenURL:(NSURL *) url;

- (void)weixin:(NSDictionary *)payData callback:(WXModuleKeepAliveCallback)callback;
- (void)alipay:(NSString*)payData callback:(WXModuleKeepAliveCallback)callback;
- (void)union_weixin:(NSString*)payData;
- (void)union_alipay:(NSString*)payData;
@end
