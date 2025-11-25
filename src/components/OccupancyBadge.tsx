import { StyleSheet, Text, View } from 'react-native';

type OccupancyBadgeProps = {
  occupancy: number;
};

const OccupancyBadge = ({ occupancy }: OccupancyBadgeProps) => {
  const getOccupancyStatus = () => {
    if (occupancy <= 40) {
      return { text: 'Sakin', color: 'green' };
    } else if (occupancy <= 70) {
      return { text: 'Normal', color: 'orange' };
    } else {
      return { text: 'Yoğun', color: 'red' };
    }
  };

  const { text, color } = getOccupancyStatus();

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default OccupancyBadge;
