//
//  RNSharedWidget.m
//  Keyper
//
//  Created by Rodolfo Agustin Silva Messano on 14/5/23.
//

#import <Foundation/Foundation.h>
#import "RNSharedWidget.h"
#import "Keyper-Swift.h"

@implementation RNSharedWidget

NSUserDefaults *sharedDefaults;
NSString *appGroup = @"group.keyper";

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RNSharedWidget)

RCT_EXPORT_METHOD(setData: (NSString *)key: (NSString * )data: (RCTResponseSenderBlock)callback) {
  
  sharedDefaults = [[NSUserDefaults alloc]initWithSuiteName:appGroup];
  
  if(sharedDefaults == nil) {
    callback(@[@0]);
    return;
  }

  [sharedDefaults setValue:data forKey:key];
  if (@available(iOS 14, *)) {
    [WidgetKitHelper reloadAllTimelines];
  } else {
      // Fallback on earlier versions
  }
  callback(@[[NSNull null]]);
}

@end
