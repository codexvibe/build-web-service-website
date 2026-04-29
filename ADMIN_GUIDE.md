# 🛠️ Guide d'Administration : ProServices

Ce guide est destiné à l'administrateur de la plateforme **ProServices**.

---

## 🏗️ Structure des Données (Supabase)

La plateforme utilise principalement deux tables dans Supabase :

### 1. `service_requests` (Les Leads)
C'est ici que sont stockées toutes les demandes envoyées via le formulaire du site.
- **`status`** : Peut être `pending` (par défaut), `contacted`, `in_progress`, ou `completed`.
- **`budget`** : Calculé automatiquement selon les options choisies par le client.

### 2. `admins` (L'Équipe)
Contient la liste des personnes ayant accès au dashboard.
- **`name`** : Nom de l'administrateur.
- **`passcode`** : Le code secret utilisé pour se connecter.

---

## 🖥️ Utilisation du Dashboard "AgencyHub"

Accédez à l'interface via `/admin` avec votre code secret.

### Gestion des Demandes
- **Visualisation** : Cliquez sur une demande à gauche pour voir les détails complets à droite.
- **Actions** : Vous pouvez changer le statut d'un projet ou le supprimer définitivement.
- **WhatsApp** : Un bouton direct permet de lancer une discussion avec le client sans enregistrer son numéro.

### Statistiques
- L'onglet **Analytiques** vous donne une vision globale de la répartition de vos services (Vitrine, E-commerce, etc.).

---

## 📸 Identité Visuelle
Le logo du site est situé dans `public/logo.png`. Pour le changer, remplacez simplement ce fichier par un nouveau portant le même nom.

---

## 🔒 Sécurité
- Le site utilise un système de session sécurisé par JWT.
- RLS (Row Level Security) est activé sur Supabase pour protéger vos données.

> [!IMPORTANT]
> **Production** : Assurez-vous que les variables d'environnement `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont correctement configurées dans votre hébergeur (Vercel/Netlify).
