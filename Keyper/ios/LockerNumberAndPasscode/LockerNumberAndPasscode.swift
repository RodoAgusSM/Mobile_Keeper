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

    var redColor = Color(UIColor(displayP3Red: 1, green: 15/255, blue: 83/255, alpha: 1))
  
  @Environment(\.widgetFamily) var family

  var body: some View {
    HStack(spacing: 20) {
      VStack(alignment: .leading) {
        Text(entry.data.numberTitle).bold().font(.system(size: 12)).foregroundColor(redColor)
        Text(String(entry.data.number))
          .bold()
          .font(.system(size: 50))
          .foregroundColor(Color.black)
          .shadow(color: .gray, radius: 15, x: 7, y: 7)
          .minimumScaleFactor(0.5)
        Text(entry.data.passcodeTitle).bold().font(.system(size: 12)).foregroundColor(redColor)
        Text(String(entry.data.passcode))
          .bold()
          .font(.system(size: 50))
          .foregroundColor(Color.black)
          .shadow(color: .gray, radius: 15, x: 7, y: 7)
          .minimumScaleFactor(0.5)
      }
      if family == .systemMedium {
        VStack(alignment: .center) {
          Text("Last Updated")
            .bold()
            .font(.system(size: 12))
            .foregroundColor(redColor)
            .shadow(color: .gray, radius: 15, x: 7, y: 7)
            .minimumScaleFactor(0.5)
          Text("Today")
            .bold()
            .font(.system(size: 40))
            .foregroundColor(Color.black)
            .shadow(color: .gray, radius: 15, x: 7, y: 7)
            .minimumScaleFactor(0.5)
        }
      }
    }.padding(.all, 10)
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
    }
}

struct LockerNumberAndPasscode_Previews: PreviewProvider {
    static var previews: some View {
      let valuesData = ValuesData(numberTitle: "Key", number: "73", passcodeTitle: "Passcode" ,  passcode: "1234")
      LockerNumberAndPasscodeEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
