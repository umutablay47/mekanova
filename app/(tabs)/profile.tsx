import { useState, useEffect } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSession } from '../../src/contexts/SessionContext';
import { Tables } from '../../src/types/database';
import { useRouter } from 'expo-router';

type Profile = Tables<'profiles'>;

const ProfileScreen = () => {
  const { session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (data) {
          setProfile(data);
          setNickname(data.nickname || '');
          setAge(data.age?.toString() || '');
          setGender(data.gender || '');
          setCity(data.city || '');
        }
      }
    };
    fetchProfile();
  }, [session]);

  const handleUpdate = async () => {
    if (session) {
      const { error } = await supabase
        .from('profiles')
        .update({
          nickname,
          age: parseInt(age, 10) || null,
          gender,
          city,
        })
        .eq('id', session.user.id);

      if (error) {
        Alert.alert('Hata', 'Profil güncellenemedi.');
      } else {
        Alert.alert('Başarılı', 'Profiliniz güncellendi.');
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı adı"
        placeholderTextColor="#888"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Yaş"
        placeholderTextColor="#888"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cinsiyet"
        placeholderTextColor="#888"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Şehir"
        placeholderTextColor="#888"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Güncelle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
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
  logoutButton: {
    backgroundColor: '#ff3b30',
  },
});

export default ProfileScreen;
