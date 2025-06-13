# 📚 Parte 2 BookReview App

*Proyecto final -- Parte 2 -- Cambio foto de perfil con emulador Firebase – Módulo 5 · Diplomado de Desarrollo de Aplicaciones Móviles*  
**Universidad Univalle** – Autor: **Cristhian Macchiavelli Ortuño**

---

## 📑 Descripción general

Aplicación **React Native (Expo)** que muestra un *screen* donde el usuario visualiza su **foto de perfil** y puede **cambiarla en tiempo real**.  
La imagen se almacena en **Firebase Storage** y se sirve desde **Firebase Hosting**, ambos ejecutados **en local** mediante la **Firebase Local Emulator Suite**. Este flujo permite probar toda la funcionalidad **sin tocar producción** y con soporte **offline**.

Tecnologías principales: **React Native (Expo)** · **npm** · **Firebase** · **VS Code**

---

## 1 · Clonar el proyecto

git clone https://github.com/cristhianunivalle/parte_2_proyecto_final_libros_cristhian_macchiavelli.git
cd parte_2_proyecto_final_libros_cristhian_macchiavelli


## 2 · Instalar dependencias

npm install


## 3 · Configurar y lanzar el emulador Firebase
1. Ve a la carpeta **`emulator_firebase/`** (y sacala del proyecto).  
2. Ajusta puertos en **`firebase.json`** si ya usas 5000/5001/9199 en otro proceso.  
3. Arranca la suite (Functions + Hosting + Storage):
   
   firebase emulators:start --only functions,hosting,storage
   
4. Copia la **IP LAN** de tu PC (ej. `192.168.0.50`).  
   Abre `src/firebaseConfig.js` en el proyecto principal y reemplaza:
   js
   const LOCAL_IP = 'TU_IP_LAN_AQUÍ';
   
   > • Cambia los puertos si modificaste `firebase.json`.  
   > • Reinicia Expo cada vez que cambies esta IP.

## 4 · Ejecutar en Expo

npx expo start

Selecciona **LAN** en Metro y escanea el QR con **Expo Go**.

---

## 5 · Estructura del repositorio (extracto)
| Carpeta              | Propósito                                                         |
|----------------------|-------------------------------------------------------------------|
| `src/`               | Código fuente React Native                                        |
| `emulator_firebase/` | Configuración y reglas del emulador (Functions, Hosting, Storage) |
| `assets/`            | Recursos gráficos (placeholder avatar, iconos)                    |
| `capturas_pantalla/` | Screenshots (Firebase UI, app)                                    |
| `video/`             | Screencast completo                                               |

---

## 6 · Firebase (estado esperado)
| Servicio/Bucket                         | Estado |
|-----------------------------------------|:------:|
| Authentication                          | ✅ |
| Firestore                               | ✅ |
| Bucket (`pruebadiplomado2.appspot.com`) | ✅ |
| Storage                                 | ✅ |
| Funcionamiento offline                  | ✅ |

---

## 7 · Flujo de trabajo
1. **Expo App** solicita permiso de galería.  
2. El usuario selecciona una imagen → se convierte a **Blob**.  
3. Se sube a `profile/avatar.png` en el **Storage Emulator**.  
4. La app obtiene el **downloadURL** y refresca el componente **`<Image>`**.  
5. En **Firebase UI** (<http://localhost:4001/storage>) puedes inspeccionar la subida.

---

## 8 · Reglas de Storage (desarrollo)
ruby
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // abierto solo para testing local
    }
  }
}

> ⚠️ **No uses estas reglas en producción**.

---

## 9 · Capturas y vídeo
> En la carpeta **`capturas_pantalla/`** encontrará capturas de:  
> • Consola Firebase (Storage, Hosting, reglas)  
> • UI del emulador de Firebase en local  
> • Pantallas de la aplicación corriendo en Expo Go  
>
> En **`video/`** se incluye un screencast que muestra la funcionalidad completa.

---

## 10 · Recursos adicionales
| Carpeta              | Contenido                   |
|----------------------|-----------------------------|
| `capturas_pantalla/` | Screenshots (Firebase, app) |
| `video/`             | Demo de la aplicación       |

---

**¡Listo!** Sigue los pasos y en pocos minutos tendrás la BookReview App Parte 2 funcionando totalmente en local con carga y visualización de foto de perfil.
