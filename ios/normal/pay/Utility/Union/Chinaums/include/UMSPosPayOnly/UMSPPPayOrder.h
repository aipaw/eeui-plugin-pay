//
//  UMSOrder.h
//  UMSPosPay
//
//  Created by chinaums on 15/11/2.
//  Copyright © 2015年 ChinaUMS. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UMSPPPayOrder : NSObject

/*!
 @property
 @abstract 接入模式，1-POS通近场，2-远程快捷，3-Apple Pay
 */
@property (nonatomic, copy) NSString *mode;

/*!
 @property
 @abstract 交易类型，01-支付，11-预授权
 */
@property (nonatomic, copy) NSString *transactionType;

/*!
 @property
 @abstract 银商商户号
 */
@property (nonatomic, copy) NSString *merchantId;

/*!
 @property
 @abstract 银商代理商户号
 */
@property (nonatomic, copy) NSString *agentMerchantId;

/*!
 @property
 @abstract 苹果商户号
 */
@property (nonatomic, copy) NSString *appleMerchantId;

/*!
 @property
 @abstract 商户用户号
 */
@property (nonatomic, copy) NSString *merchantUserId;

/*!
 @property
 @abstract 用户手机号
 */
@property (nonatomic, copy) NSString *mobile;

/*!
 @property
 @abstract 商户支付结果通知Url
 */
@property (nonatomic, copy) NSString *notifyUrl;

/*!
 @property
 @abstract 支付原金额，必填，单位：分
 */
@property (nonatomic, copy) NSString *amount;

/*!
 @property
 @abstract 支付描述
 */
@property (nonatomic, copy) NSString *productName;

/*!
 @property
 @abstract 指定扣款介质
 @discussion
 样式:"机构号,介质类型,使用模式"。示例:"0000,2,0"
 机构号:由银商分配。mode为3时,固定为"0000"。
 介质类型:0-借记卡,1-贷记卡,2-借记卡&&贷记卡。
 使用模式:0-指定仅可使用,1-指定默认使用。mode为3时,固定为"0"。
 */
@property (nonatomic, copy) NSString *specifiedPaymentMedium;

/*!
 @property
 @abstract 添加介质，可空
 @discussion
 样式:"机构号,介质类型"。示例:"0000,2,0"
 机构号:由银商分配。mode为3时,固定为"0000"。
 介质类型:0-借记卡,1-贷记卡,2-借记卡&&贷记卡。
 */
@property (nonatomic, copy) NSString *specifiedAdditionMedium;

/*!
 @property
 @abstract 商户订单号
 */
@property (nonatomic, copy) NSString *merOrderId;

/**
 *  C扫B二维码链接
 */
@property (nonatomic, copy) NSString *scanCodeUrl;

/**
  *  快捷支付的交易时间
  */
@property (nonatomic, copy) NSString *orderTimeOut;

/*!
 @method
 @abstract   检查支付参数是否正确
 @discussion 若支付参数缺失，或者参数格式不对，则返NO，否则返YES
 @result     检查结果
 */
- (BOOL)checkParameters;

/*!
 @method
 @abstract   获取支付传入的字符串
 @discussion key="value"形式,以&连接
 @result     支付传入的字符串
 */
- (NSString *)description;

/*!
 @method
 @abstract   获取参与签名的字符串
 @discussion key=value形式,以&连接
 @result     参与签名的字符串
 */
- (NSString *)signOriginString;

@end
