# Dahira Ansaroudine - Frontend Web (React)

Interface utilisateur moderne pour les membres et les administrateurs de la Dahira Ansaroudine.

## 🚀 Technologies
- **Framework**: React 18
- **Language**: TypeScript
- **Style**: Tailwind CSS
- **Animations**: Framer Motion
- **Tooling**: Vite
- **Icons**: Lucide React

## 📁 Structure du Projet
- `/src/pages` : Toutes les vues de l'application (Public, Membre, Admin).
- `/src/components` : Composants UI réutilisables.
- `/src/context` : Gestion des états globaux (Auth, Data, Notifications).
- `/src/services` : Client API (Axios/Fetch) pour communiquer avec le backend.
- `/src/types.ts` : Définitions TypeScript globales.

## 🛠 Fonctionnalités Implémentées

### 🔐 Authentification
- Connexion sécurisée avec redirection automatique selon le rôle (`ADMIN` ou `MEMBER`).
- Persistance de la session avec `localStorage`.

### 📊 Tableau de Bord Admin
- Statistiques de la Dahira.
- Gestion des documents avec options de partage avancées.
- Gestion des membres (ajout, modification, suppression).
- Gestion des actualités et de la galerie.

### 👤 Espace Membre
- Consultation des documents partagés personnellement ou avec tout le groupe.
- Inscription aux événements de la Dahira.
- Système de notifications en temps réel avec badge indicateur.
- Profil personnalisable.

## 📡 Intégration en Temps Réel
Le frontend utilise `socket.io-client` pour :
- Recevoir des notifications instantanées sans rafraîchir la page.
- Mettre à jour le compteur de notifications non lues.
- Recevoir des alertes de partage de fichiers.

## ⚙️ Configuration
Modifiez le fichier `.env` à la racine pour pointer vers votre backend :
```env
VITE_API_URL=https://backend-bjzg.onrender.com/api
```

## 📦 Commandes Utiles
- `npm run dev` : Lance le serveur de développement.
- `npm run build` : Génère les fichiers statiques pour la production (`/dist`).
- `npm run lint` : Vérifie la qualité du code.

## 🎨 Design & UX
- Design "Bento Grid" pour les tableaux de bord.
- Transitions de pages fluides avec `framer-motion`.
- Responsive design complet (optimisé pour mobile, tablette et desktop).
- Mode sombre profond avec accents vert émeraude (couleur symbolique).
