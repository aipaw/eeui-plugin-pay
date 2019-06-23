//
//  libUMSPosPay.h
//  libUMSPosPay
//
//  Created by Bohan on 2/11/15.
//  Copyright (c) 2015 ChinaUMS. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol UMSPosPayPluginDelegate <NSObject>

- (void)onActivityResultErrCode:(NSString *)errCode errInfo:(NSString *)errInfo;

@end

@interface UMSPPPayPosPay : NSObject

/**
 *  启动插件接口
 *
 *  @param info           支付信息
 *  @param delegate       调用插件回调代理
 */
+ (void)callUMSPosPayPluginWithPaymentInfo:(NSString *)info
                                  delegate:(id<UMSPosPayPluginDelegate>)delegate;

@end
