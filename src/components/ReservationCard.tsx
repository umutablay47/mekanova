import { StyleSheet, Text, View } from 'react-native';
import { Tables } from '../../src/types/database';

type ReservationWithVenue = Tables<'reservations'> & {
  venues: { name: string } | null;
};

type ReservationCardProps = {
  reservation: ReservationWithVenue;
};

const getStatusBadge = (status: string | null) => {
  switch (status) {
    case 'pending':
      return { text: 'Beklemede', color: 'orange' };
    case 'approved':
      return { text: 'Onaylandı', color: 'green' };
    case 'rejected':
      return { text: 'Reddedildi', color: 'red' };
    default:
      return { text: 'Bilinmiyor', color: 'gray' };
  }
};

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const { text, color } = getStatusBadge(reservation.status);

  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.venueName}>{reservation.venues?.name}</Text>
        <Text style={styles.info}>
          {new Date(reservation.date).toLocaleDateString()} - {reservation.time}
        </Text>
        <Text style={styles.info}>{reservation.people_count} kişi</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  details: {
    flex: 1,
  },
  venueName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReservationCard;
