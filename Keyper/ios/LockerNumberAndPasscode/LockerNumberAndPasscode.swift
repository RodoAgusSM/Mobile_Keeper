//
//  LockerNumberAndPasscode.swift
//  LockerNumberAndPasscode
//
//  Created by Rodolfo Agustin Silva Messano on 14/5/23.
//

import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      let valuesData = ValuesData(numberTitle: "Key", number: "73", passcodeTitle: "Passcode" ,  passcode: "1234")
      return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData)
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let valuesData = ValuesData(numberTitle: "Key", number: "73", passcodeTitle: "Passcode" ,  passcode: "1234")
      let entry = SimpleEntry(date: Date(), configuration: configuration, data: valuesData)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []
      let userDefaults = UserDefaults.init(suiteName: "group.keyper");
      let jsonText = userDefaults!.value(forKey: "lockerNumberAndPasscode") as? String;
      let jsonData = Data(jsonText?.utf8 ?? "".utf8)
      let valuesData = try! JSONDecoder().decode(ValuesData.self, from: jsonData);

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
          let entry = SimpleEntry(date: entryDate, configuration: configuration, data: valuesData)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct ValuesData: Codable {
  let numberTitle: String
  let number: String
  let passcodeTitle: String
  let passcode: String
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let data: ValuesData
}

struct LockerNumberAndPasscodeEntryView : View {
    var entry: Provider.Entry

  var plumPurple = Color(UIColor(red: 0.306, green: 0.157, blue: 0.365, alpha: 1))
  var deepCerise = Color(UIColor(red: 0.863, green: 0.259, blue: 0.557, alpha: 1))
  var papayaWhite = Color(UIColor(red: 1.000, green: 0.937, blue: 0.839, alpha: 1))
  //var melon = Color(UIColor(red: 0.996, green: 0.702, blue: 0.694, alpha: 1))
  //var floralWhite = Color(UIColor(red: 0.996, green: 0.976, blue: 0.937, alpha: 1))
  //var peach = Color(UIColor(red: 1.000, green: 0.886, blue: 0.702, alpha: 1))
  
  @Environment(\.widgetFamily) var family

  var body: some View {
    HStack(spacing: 20) {
      if family == .systemSmall {
        VStack(alignment: .leading) {
          Text(entry.data.numberTitle).bold().font(.system(size: 16)).foregroundColor(deepCerise)
          Text(String(entry.data.number))
            .bold()
            .font(.system(size: 40))
            .foregroundColor(plumPurple)
          Text(entry.data.passcodeTitle).bold().font(.system(size: 16)).foregroundColor(deepCerise)
          Text(String(entry.data.passcode))
            .bold()
            .font(.system(size: 40))
            .foregroundColor(plumPurple)
        }
      }
      else if family == .systemMedium {
        HStack() {
          VStack(alignment: .center) {
            Text(entry.data.numberTitle).bold().font(.system(size: 20)).foregroundColor(deepCerise)
            Text(String(entry.data.number))
              .bold()
              .font(.system(size: 40))
              .foregroundColor(plumPurple)
          }.frame(
              maxWidth: .infinity,
              maxHeight: .infinity
            )
          Divider().overlay(deepCerise).frame(height: 120)
          VStack(alignment: .center) {
            Text(entry.data.passcodeTitle).bold().font(.system(size: 20)).foregroundColor(deepCerise)
            Text(String(entry.data.passcode))
              .bold()
              .font(.system(size: 40))
              .foregroundColor(plumPurple)
          }.frame(
            maxWidth: .infinity,
            maxHeight: .infinity
          )
        }
      }
    }.frame(
      maxWidth: .infinity,
      maxHeight: .infinity
    ).background(papayaWhite)
  }
}

struct LockerNumberAndPasscode: Widget {
    let kind: String = "LockerNumberAndPasscode"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            LockerNumberAndPasscodeEntryView(entry: entry)
        }
        .configurationDisplayName("Locker information")
        .description("Widget to view the locker number and passcode.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct LockerNumberAndPasscode_Previews: PreviewProvider {
    static var previews: some View {
      let valuesData = ValuesData(numberTitle: "Key", number: "73", passcodeTitle: "Passcode" ,  passcode: "1234")
      LockerNumberAndPasscodeEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
