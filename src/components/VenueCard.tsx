import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import OccupancyBadge from './OccupancyBadge';
import { Tables } from '../types/database';
import { useRouter } from 'expo-router';

type VenueCardProps = {
  venue: Tables<'venues'>;
};

const VenueCard = ({ venue }: VenueCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/venue/${venue.id}`)}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name="local-bar" size={32} color="#fff" />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.type}>{venue.type}</Text>
        <Text style={styles.city}>{venue.city}</Text>
      </View>
      <OccupancyBadge occupancy={venue.current_occupancy_percent || 0} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  type: {
    color: '#aaa',
    fontSize: 14,
  },
  city: {
    color: '#aaa',
    fontSize: 12,
  },
});

export default VenueCard;
