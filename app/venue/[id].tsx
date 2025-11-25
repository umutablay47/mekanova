import { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Tables } from '../../src/types/database';
import OccupancyBadge from '../../src/components/OccupancyBadge';

type MenuItem = Tables<'menu_items'>;

const VenueDetail = () => {
  const { id } = useLocalSearchParams();
  const [venue, setVenue] = useState<Tables<'venues'> | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      const { data: venueData, error: venueError } = await supabase
        .from('venues')
        .select('*')
        .eq('id', id)
        .single();

      if (venueData) {
        setVenue(venueData);
      }

      const { data: menuData, error: menuError } = await supabase
        .from('menu_items')
        .select('*')
        .eq('venue_id', id);

      if (menuData) {
        setMenu(menuData);
      }

      setLoading(false);
    };

    if (id) {
      fetchVenueDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!venue) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Mekan bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: venue.name,
          headerStyle: { backgroundColor: '#111' },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.venueName}>{venue.name}</Text>
        <Text style={styles.venueType}>{venue.type}</Text>
        <Text style={styles.venueAddress}>{venue.address}</Text>
        <View style={styles.occupancyContainer}>
          <OccupancyBadge occupancy={venue.current_occupancy_percent || 0} />
        </View>

        <Text style={styles.menuTitle}>Menü</Text>
        {menu.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <View>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
            <Text style={styles.menuItemPrice}>
              {item.price} {item.currency}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() => router.push(`/reservation/${venue.id}`)}
      >
        <Text style={styles.reserveButtonText}>Rezervasyon Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  venueName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  venueType: {
    color: '#aaa',
    fontSize: 18,
    marginTop: 5,
  },
  venueAddress: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 10,
  },
  occupancyContainer: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  menuTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  menuItem: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  menuItemPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reserveButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reserveButtonText: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default VenueDetail;
