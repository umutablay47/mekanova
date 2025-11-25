import { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import VenueCard from '../../src/components/VenueCard';
import { Tables } from '../../src/types/database';
import { Stack } from 'expo-router';

const Home = () => {
  const [venues, setVenues] = useState<Tables<'venues'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      const { data, error } = await supabase.from('venues').select('*');
      if (data) {
        setVenues(data);
      }
      setLoading(false);
    };

    fetchVenues();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Mekanova',
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: '#111' },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Yakındaki mekanlar</Text>
        <View style={styles.location}>
          <MaterialIcons name="location-on" size={16} color="#fff" />
          <Text style={styles.locationText}>Konum: Otomatik algılanıyor</Text>
        </View>
      </View>
      <FlatList
        data={venues}
        renderItem={({ item }) => <VenueCard venue={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    color: '#fff',
    marginLeft: 5,
  },
  list: {
    paddingBottom: 20,
  },
});

export default Home;
