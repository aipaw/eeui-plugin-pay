

Pod::Spec.new do |s|



  s.name         = "pay"
  s.version      = "0.0.1"
  s.summary      = "eeui plugin."
  s.description  = <<-DESC
                    eeui plugin.
                   DESC

  s.homepage     = "https://eeui.app"
  s.license      = "MIT"
  s.author             = { "veryitman" => "aipaw@live.cn" }
  s.source =  { :path => '.' }
  s.source_files  = "pay", "**/**/*.{h,m,mm,c}"
  s.exclude_files = "Source/Exclude"
  s.resources = ['pay/Utility/Alipay/AlipaySDK.bundle',
                  'pay/Utility/Union/Chinaums/PosPay_Resource.bundle',
                  'pay/Utility/Union/Chinaums/UMSSecKeyboardLibResource.bundle',
                  'pay/Utility/Union/PosPay_Resource.bundle']
  s.vendored_libraries = ['pay/Utility/Union/Chinaums/libUMSPosPayOnly.a',
                          'pay/Utility/Union/UPPaymentControl/libPaymentControl.a',
                          'pay/Utility/Union/WeChat/libWeChatSDK.a']
  s.vendored_frameworks = ['pay/Utility/Alipay/AlipaySDK.framework']
  s.platform     = :ios, "8.0"
  s.requires_arc = true

  s.dependency 'WeexSDK'
  s.dependency 'eeui'
  s.dependency 'WeexPluginLoader', '~> 0.0.1.9.1'

end