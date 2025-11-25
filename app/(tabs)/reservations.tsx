import { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSession } from '../../src/contexts/SessionContext';
import ReservationCard from '../../src/components/ReservationCard';
import { Tables } from '../../src/types/database';

type ReservationWithVenue = Tables<'reservations'> & {
  venues: { name: string } | null;
};

const Reservations = () => {
  const { session } = useSession();
  const [reservations, setReservations] = useState<ReservationWithVenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (session) {
        const { data, error } = await supabase
          .from('reservations')
          .select('*, venues (name)')
          .eq('user_id', session.user.id);

        if (data) {
          setReservations(data as ReservationWithVenue[]);
        }
      }
      setLoading(false);
    };

    fetchReservations();
  }, [session]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rezervasyonlarım</Text>
      <FlatList
        data={reservations}
        renderItem={({ item }) => <ReservationCard reservation={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz rezervasyonunuz yok.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Reservations;
