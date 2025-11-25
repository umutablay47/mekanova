import { useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '../../src/contexts/SessionContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReservationForm = () => {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [peopleCount, setPeopleCount] = useState('2');
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [error, setError] = useState('');

  const handleReservation = async () => {
    if (!session) {
      setError('Rezervasyon yapmak için giriş yapmalısınız.');
      return;
    }

    if (!peopleCount || parseInt(peopleCount, 10) <= 0) {
      setError('Kişi sayısı geçerli bir sayı olmalıdır.');
      return;
    }

    const { error } = await supabase.from('reservations').insert({
      venue_id: Number(id),
      user_id: session.user.id,
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0],
      people_count: parseInt(peopleCount, 10),
      note,
    });

    if (error) {
      setError('Rezervasyon oluşturulamadı.');
    } else {
      Alert.alert(
        'Rezervasyon alındı',
        'Rezervasyonun onaylandığında bildirim alacaksın.',
        [{ text: 'Tamam', onPress: () => router.replace('/reservations') }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Rezervasyon Yap',
          headerStyle: { backgroundColor: '#111' },
          headerTintColor: '#fff',
        }}
      />
      <Text style={styles.label}>Tarih</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(Platform.OS === 'ios');
            setDate(currentDate);
          }}
        />
      )}

      <Text style={styles.label}>Saat</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            const currentTime = selectedTime || time;
            setShowTimePicker(Platform.OS === 'ios');
            setTime(currentTime);
          }}
        />
      )}

      <Text style={styles.label}>Kişi sayısı</Text>
      <TextInput
        style={styles.input}
        value={peopleCount}
        onChangeText={setPeopleCount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Not (isteğe bağlı)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={note}
        onChangeText={setNote}
        multiline
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>Rezervasyonu Tamamla</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default ReservationForm;
