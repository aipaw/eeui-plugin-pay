package app.eeui.pay.ui.module;

import app.eeui.framework.extend.view.ExtendWebView;
import app.eeui.framework.extend.view.webviewBridge.JsCallback;
import app.eeui.framework.ui.eeui;
import app.eeui.pay.ui.entry.eeui_pay;

public class WebModule {

    private static eeui_pay __obj;

    private static eeui_pay myApp() {
        if (__obj == null) {
            __obj = new eeui_pay();
        }
        return __obj;
    }

    /***************************************************************************************************/
    /***************************************************************************************************/
    /***************************************************************************************************/

    /**
     * 官方微信支付
     *
     * @param payData
     * @param callback
     */
    public static void weixin(ExtendWebView webView, String payData, JsCallback callback) {
        myApp().weixin(webView.getContext(), payData, eeui.MCallback(callback));
    }

    /**
     * 官方支付宝支付
     *
     * @param payData
     * @param callback
     */
    public static void alipay(ExtendWebView webView, String payData, JsCallback callback) {
        myApp().alipay(webView.getContext(), payData, eeui.MCallback(callback));
    }

    /**
     * 银联微信支付（无回调功能）
     *
     * @param payData
     */
    public static void union_weixin(ExtendWebView webView, String payData) {
        myApp().union_weixin(webView.getContext(), payData);
    }

    /**
     * 银联支付宝支付（无回调功能）
     *
     * @param payData
     */
    public static void union_alipay(ExtendWebView webView, String payData) {
        myApp().union_alipay(webView.getContext(), payData);
    }

}

