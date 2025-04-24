📱 JitCall App

Una aplicación móvil desarrollada con **Ionic + Angular**, que permite autenticación de usuarios, gestión de datos en **Firebase Firestore**, envío de **notificaciones push** y la integración de **videollamadas con Jitsi Meet**.

---

🚀 Características

- 🔐 Autenticación de usuarios con **Firebase Auth**
- 🗃️ Almacenamiento de datos en **Firestore**
- 🔔 Notificaciones en tiempo real con **Firebase Cloud Messaging (FCM)**
- 📹 Videollamadas mediante **Jitsi Meet**
- 💡 Arquitectura modular y escalable con Angular

---

🛠️ Tecnologías utilizadas

| Tecnología      | Descripción                      |
|----------------|----------------------------------|
| Ionic Framework | UI móvil híbrido con Angular     |
| Angular         | Framework frontend               |
| Firebase Auth   | Autenticación segura             |
| Firestore       | Base de datos NoSQL en tiempo real |
| FCM             | Notificaciones push              |
| Jitsi Meet      | API para videollamadas seguras   |

---

📦 Instalación

1. Clona el repositorio
```bat
git clone https://github.com/CleiverMejia/JitCall-App.git
cd JitCall-App
```

2. Instala las dependencias
```bat
npm install
```
3. Configura Firebase

Crea un archivo src/environments/environment.ts y añade tus credenciales de Firebase:

```js
export const environment = {
  production: false,
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_DOMINIO.firebaseapp.com',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_BUCKET.appspot.com',
    messagingSenderId: 'TU_MESSAGING_ID',
    appId: 'TU_APP_ID',
  }
};
```
