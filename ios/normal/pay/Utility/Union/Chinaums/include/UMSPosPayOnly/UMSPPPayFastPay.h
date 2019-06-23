//
//  libUMSFastPay.h
//  UMSPosPay
//
//  Created by xxw on 15-3-11.
//  Copyright (c) 2015年 ChinaUMS. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  远程快捷、Apple Pay
 */
@interface UMSPPPayFastPay : NSObject

/**
 *  交易结果回调Block
 *
 *  @param errCode 错误码
 *  @param errInfo 错误信息
 */
typedef void(^TransactionResultBlock)(NSString *errCode,NSString *errInfo);

/**
 *  商户下单支付接口
 *
 *  @param orderInfo     订单信息
 *  @param callbackBlock 交易结果回调Block
 */
+ (void)payOrder:(NSString *)orderInfo
        callBack:(TransactionResultBlock)callbackBlock;

@end
