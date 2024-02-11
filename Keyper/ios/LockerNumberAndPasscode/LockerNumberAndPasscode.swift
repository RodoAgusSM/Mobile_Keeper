//
//  LockerNumberAndPasscode.swift
//  LockerNumberAndPasscode
//
//  Created by Rodolfo Agustin Silva Messano on 11/2/24.
//

import WidgetKit
import SwiftUI

struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        let valuesData = ValuesData(numberTitle: "Locker", number: "#73", passcodeTitle: "Passcode" ,  passcode: "1234")
        return SimpleEntry(date: Date(), configuration: ConfigurationAppIntent(), data: valuesData)
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
        let valuesData = ValuesData(numberTitle: "Locker", number: "#73", passcodeTitle: "Passcode" ,  passcode: "1234")
        return SimpleEntry(date: Date(), configuration: configuration, data: valuesData)
    }

    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
        var entries: [SimpleEntry] = []
        let userDefaults = UserDefaults.init(suiteName: "group.keyper")
        let jsonText = userDefaults!.value(forKey: "lockerNumberAndPasscode") as? String
        let jsonData = Data(jsonText?.utf8 ?? "".utf8)
        let valuesData = try! JSONDecoder().decode(ValuesData.self, from: jsonData)

        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, configuration: configuration, data: valuesData)
            entries.append(entry)
        }

        return Timeline(entries: entries, policy: .atEnd)
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
    let configuration: ConfigurationAppIntent
    let data: ValuesData
}

struct LockerNumberAndPasscodeEntryView : View {
    var entry: Provider.Entry

    var plumPurple = Color(UIColor(red: 0.306, green: 0.157, blue: 0.365, alpha: 1))
    var deepCerise = Color(UIColor(red: 0.863, green: 0.259, blue: 0.557, alpha: 1))
    var papayaWhite = Color(UIColor(red: 1.000, green: 0.937, blue: 0.839, alpha: 1))

    @Environment(\.widgetFamily) var family

    var body: some View {
        GeometryReader { geometry in
            HStack(spacing: 0) {
                if family == .systemSmall {
                    VStack(alignment: .leading, spacing: 0) {
                        Text(entry.data.numberTitle).bold().font(.system(size: 16)).foregroundColor(deepCerise)
                        Text(String(entry.data.number))
                            .bold()
                            .font(.system(size: 36))
                            .foregroundColor(plumPurple)
                            .padding(.bottom, 4)
                        Text(entry.data.passcodeTitle).bold().font(.system(size: 16)).foregroundColor(deepCerise)
                        Text(String(entry.data.passcode))
                            .bold()
                            .font(.system(size: 36))
                            .foregroundColor(plumPurple)
                    }
                } else if family == .systemMedium {
                    HStack() {
                        VStack(alignment: .center, spacing: 0) {
                            Text(entry.data.numberTitle).bold().font(.system(size: 16)).foregroundColor(deepCerise)
                            Text(String(entry.data.number))
                                .bold()
                                .font(.system(size: 40))
                                .foregroundColor(plumPurple)
                                .padding(.bottom, 4)
                        }.frame(
                            maxWidth: .infinity,
                            maxHeight: .infinity
                        )
                        Divider().overlay(deepCerise).frame(height: 120)
                        VStack(alignment: .center, spacing: 0) {
                            Text(entry.data.passcodeTitle).bold().font(.system(size: 16)).foregroundColor(deepCerise)
                            Text(String(entry.data.passcode))
                                .bold()
                                .font(.system(size: 40))
                                .foregroundColor(plumPurple)
                                .padding(.bottom, 4)
                        }.frame(
                            maxWidth: .infinity,
                            maxHeight: .infinity
                        )
                    }
                }
            }
            .frame(width: geometry.size.width, height: geometry.size.height) // Ensure the frame covers the entire widget area
            .containerBackground(for: .widget) {
                papayaWhite
            }
        }
    }
}

struct LockerNumberAndPasscode: Widget {
    let kind: String = "LockerNumberAndPasscode"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
            LockerNumberAndPasscodeEntryView(entry: entry)
        }
        .configurationDisplayName("Locker information")
        .description("Widget to view the locker number and passcode.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct LockerNumberAndPasscode_Previews: PreviewProvider {
    static var previews: some View {
        let valuesData = ValuesData(numberTitle: "Locker", number: "# 73", passcodeTitle: "Passcode" ,  passcode: "1234")
        LockerNumberAndPasscodeEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationAppIntent(), data: valuesData))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
