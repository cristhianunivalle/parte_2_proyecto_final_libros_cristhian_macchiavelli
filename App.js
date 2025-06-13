import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { storage, ref, uploadBytes, getDownloadURL } from './firebaseConfig';

const OBJECT_PATH = 'profile/avatar.png';   // siempre sobreescribimos la misma ruta

export default function ProfilePhotoScreen() {
  const [uri, setUri]   = useState(null);
  const [busy, setBusy] = useState(false);

  // 1 · Descarga inicial (si la imagen ya existe)
  useEffect(() => {
    (async () => {
      try {
        const url = await getDownloadURL(ref(storage, OBJECT_PATH));
        setUri(url);
      } catch {
        /* no existe aún */
      }
    })();
  }, []);

  // 2 · Elegir y subir
  const pickAndUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso', 'Necesitamos acceso a la galería.');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.85 });
    if (res.canceled) return;

    try {
      setBusy(true);
      const blob = await (await fetch(res.assets[0].uri)).blob();
      await uploadBytes(ref(storage, OBJECT_PATH), blob);
      const url  = await getDownloadURL(ref(storage, OBJECT_PATH));
      setUri(url + '?t=' + Date.now());               // evita caché vieja
      Alert.alert('Éxito', 'Foto actualizada');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo subir la imagen');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Image
          source={
            uri
              ? { uri }
              : require('./assets/avatar-placeholder.png') // pon cualquier imagen local
          }
          style={styles.avatar}
        />
        {busy && <ActivityIndicator size="large" style={styles.spinner} />}
      </View>

      <Button title="Cambiar foto" onPress={pickAndUpload} disabled={busy} />
      <View style={{ marginTop: 16 }}>
        <Button
          title="PARTE 2 PROYECTO FINAL CRISTHIAN MACCHIAVELLI FIREBASE EMULATOR STORAGE BUCKET " disabled
          accessibilityLabel={'SDK ' + Constants.expoVersion}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root:  { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fffaf2' },
  card:  { borderRadius: 120, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6 },
  avatar:{ width: 240, height: 240, backgroundColor: '#f7fbff' },
  spinner:{ position: 'absolute', alignSelf: 'center', top: '45%' },
});
