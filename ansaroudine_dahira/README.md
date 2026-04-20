# Ansaroudine Dahira Mobile App

Cette application mobile est construite avec Flutter et Dart, en suivant la même architecture que l'application web React.

## Structure du projet

- `lib/types.dart`: Définitions des types et modèles de données
- `lib/services/`: Services API (ApiService)
- `lib/context/`: Gestion de l'état (Auth, Data) - Équivalent des Contexts React
- `lib/pages/`: Pages de l'application (Admin, Member, Public)
- `lib/layouts/`: Widgets de mise en page réutilisables

## Configuration locale

1. Assurez-vous d'avoir Flutter installé sur votre machine.
2. Clonez ce dossier.
3. Exécutez `flutter pub get` pour installer les dépendances.
4. Modifiez `lib/services/api_service.dart` si vous souhaitez pointer vers une API locale.
5. Exécutez `flutter run` pour lancer l'application.

## Dépendances principales

- `provider`: Pour la gestion de l'état.
- `http`: Pour les appels API.
- `shared_preferences`: Pour le stockage local du token JWT.
- `google_fonts`: Pour la typographie.
