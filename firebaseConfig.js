// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    connectStorageEmulator,
} from 'firebase/storage';
import { Platform } from 'react-native';

/**
 * 1. Configuración “falsa” (no se usa en el emulador, pero es obligatoria).
 *    ▸ Pon el mismo projectId que hayas usado con `firebase use` / `firebase init`
 *    ▸ Estos valores NO afectan al emulador local.
 */
const firebaseConfig = {
    apiKey: 'fake-api-key',
    authDomain: 'fake.firebaseapp.com',
    projectId: 'pruebadiplomado2',          // ← lo obtenemos con el comando en el proyecto de firebase en el cmd 'firebase use'
    storageBucket: 'pruebadiplomado2.appspot.com',
};

/** 2. Inicializa la app Firebase */
const app = initializeApp(firebaseConfig);

/** 3. Instancia de Storage */
const storage = getStorage(app);

/**
 * 4. Conecta la instancia de Storage al emulador que ya corre en 127.0.0.1:9199
 *    ▸ Android AVD ve “localhost” como 10.0.2.2
 *    ▸ iOS simulator y Expo Go en web usan “localhost”
 *    ▸ Si pruebas en un Android físico, pon la IP LAN de tu PC (ej. 192.168.0.x)
 */
const LOCAL_IP = '10.100.12.170';
const host = Platform.select({ android: LOCAL_IP, ios: LOCAL_IP, default: 'localhost' });
connectStorageEmulator(storage, host, 9199);

console.log('🚀 Storage conectado a', host + ':9199');
console.log('🚀 Bucket en uso      ', storage.app.options.storageBucket);

/** 5. Reexporta helpers que usarás en tus componentes */
export { storage, ref, uploadBytes, getDownloadURL };
