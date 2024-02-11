//
//  WidgetKitHelper.swift
//  Keyper
//
//  Created by Rodolfo Agustin Silva Messano on 11/2/24.
//

import WidgetKit

@available(iOS 14, *)
@objcMembers final class WidgetKitHelper: NSObject {
  
  class func reloadAllTimelines() {
#if arch(arm64) || arch(i386) || arch(x86_64)
    WidgetCenter.shared.reloadAllTimelines()
#endif
  }
}