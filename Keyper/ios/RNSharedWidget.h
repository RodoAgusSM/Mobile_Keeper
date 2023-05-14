//
//  RNSharedWidget.h
//  Keyper
//
//  Created by Rodolfo Agustin Silva Messano on 14/5/23.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RNSharedWidget : NSObject<RCTBridgeModule>

@end
