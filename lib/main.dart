import 'package:flutter/material.dart';

void main() {
  runApp(const MekanovaApp());
}

class MekanovaApp extends StatelessWidget {
  const MekanovaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mekanova',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: Colors.black,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.white,
          brightness: Brightness.dark,
          background: Colors.black,
        ),
        useMaterial3: true,
        textTheme: const TextTheme(
          headlineSmall: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w700,
            color: Colors.white,
            letterSpacing: 0.2,
          ),
          bodyMedium: TextStyle(fontSize: 14, color: Colors.white70),
        ),
      ),
      home: const MekanovaHomePage(),
    );
  }
}

class MekanovaHomePage extends StatelessWidget {
  const MekanovaHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final demoVenues = [
      {
        'name': 'Luna Roof Bar',
        'type': 'Roof / Teras',
        'distance': '450 m',
        'occupancy': 'Yoğun',
      },
      {
        'name': 'Noir Meyhane',
        'type': 'Meyhane',
        'distance': '1.2 km',
        'occupancy': 'Normal',
      },
      {
        'name': 'Mono Cocktail',
        'type': 'Kokteyl Bar',
        'distance': '2.0 km',
        'occupancy': 'Sakin',
      },
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
        title: const Text(
          'Mekanova',
          style: TextStyle(
            fontWeight: FontWeight.w700,
            letterSpacing: 1.0,
          ),
        ),
        centerTitle: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Yakındaki mekanlar',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: const [
                  Icon(Icons.location_on_outlined, size: 16, color: Colors.white70),
                  SizedBox(width: 4),
                  Text(
                    'Konum: Otomatik algılanıyor',
                    style: TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.separated(
                  itemCount: demoVenues.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final venue = demoVenues[index];
                    return _VenueCard(
                      name: venue['name']!,
                      type: venue['type']!,
                      distance: venue['distance']!,
                      occupancy: venue['occupancy']!,
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _VenueCard extends StatelessWidget {
  final String name;
  final String type;
  final String distance;
  final String occupancy;

  const _VenueCard({
    required this.name,
    required this.type,
    required this.distance,
    required this.occupancy,
  });

  Color _badgeColor() {
    switch (occupancy) {
      case 'Sakin':
        return Colors.greenAccent;
      case 'Normal':
        return Colors.orangeAccent;
      case 'Yoğun':
      default:
        return Colors.redAccent;
    }
  }

  String _badgeLabel() {
    switch (occupancy) {
      case 'Sakin':
      case 'Normal':
      case 'Yoğun':
        return occupancy;
      default:
        return 'Bilinmiyor';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.04),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      padding: const EdgeInsets.all(14),
      child: Row(
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.white24),
            ),
            child: const Icon(Icons.local_bar, size: 26, color: Colors.white70),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  type,
                  style: const TextStyle(fontSize: 13, color: Colors.white70),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(Icons.place_outlined, size: 14, color: Colors.white54),
                    const SizedBox(width: 4),
                    Text(
                      distance,
                      style: const TextStyle(fontSize: 12, color: Colors.white54),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: _badgeColor().withOpacity(0.9)),
            ),
            child: Text(
              _badgeLabel(),
              style: TextStyle(
                fontSize: 11,
                color: _badgeColor(),
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
