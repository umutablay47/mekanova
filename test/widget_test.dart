import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mekanova/main.dart';

void main() {
  testWidgets('Yakındaki mekanlar başlığı görünür', (WidgetTester tester) async {
    await tester.pumpWidget(const MekanovaApp());

    expect(find.text('Yakındaki mekanlar'), findsOneWidget);
    expect(find.byType(ListView), findsOneWidget);
  });
}
