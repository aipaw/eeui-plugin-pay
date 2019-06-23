//
//  UMSPPPayUnifyPayPlugin.h
//  UMSPosPay
//
//  Created by SunXP on 17/4/25.
//  Copyright © 2017年 ChinaUMS. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  支付渠道
 *
 *  @param CHANNEL_WEIXIN   微信支付
 *  @param CHANNEL_ALIPAY  支付宝支付
 *  @param CHANNEL_UMSPAY 全民付移动支付
 *  @param CHANNEL_CLOUDPAY 云闪付支付
 */
FOUNDATION_EXTERN NSString *const CHANNEL_WEIXIN;
FOUNDATION_EXTERN NSString *const CHANNEL_ALIPAY;
FOUNDATION_EXTERN NSString *const CHANNEL_UMSPAY;
FOUNDATION_EXTERN NSString *const CHANNEL_CLOUDPAY;

typedef void(^TransactionResultBlock)(NSString *resultCode,  NSString *resultInfo);

@interface UMSPPPayUnifyPayPlugin : NSObject

/**
 *  商户下单支付接口
 *
 *  @param payChannel   支付渠道
 *  @param payData       订单信息:appPayRequest对应的json字符串
 *  @param callbackBlock 交易结果回调Block
 */
+ (void)payWithPayChannel:(NSString *)payChannel payData:(NSString *)payData callbackBlock:(TransactionResultBlock)callbackBlock;

/**
 *  微信支付配置参数
 *
 *  @param appId   商户注册的微信支付appId
  *  @return YES：成功 NO：失败
 *  需在AppDelegate的didFinishLaunchingWithOptions方法中调用
 */
+ (BOOL)registerApp:(NSString *)appId;

/**
 *  微信支付配置参数
 *
 *  @param url   App处理的openUrl
 *  @return YES：成功 NO：失败
 *  需在AppDelegate中的方法中调用：
 *  iOS9.0之前版本：- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
 *                          - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
 *  iOS9.0之后版本：- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options
 */
+ (BOOL)handleOpenURL:(NSURL *)url;


/**
 云闪付处理

 @param url App处理的openUrl
 @return YES：成功 NO：失败
 */
+ (BOOL)cloudPayHandleOpenURL:(NSURL *)url;

@end
