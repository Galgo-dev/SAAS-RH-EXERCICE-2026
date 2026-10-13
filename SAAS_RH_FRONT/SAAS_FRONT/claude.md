# CLAUDE.md — rh-copilot (exercice 2 jours)
- Front : React + Vite, JavaScript (pas de TypeScript), Axios. API : Node.js 20, Express, Zod.
- Périmètre strict : uniquement les 4 endpoints de l'énoncé. Base vectorielle : Vectra (fichiers locaux). Pas d'autre BDD, pas d'auth, pas de Docker.
- Données en mémoire dans api/src/data/ (copiées de l'énoncé, ne pas les modifier).
- Tout appel LLM passe par api/src/llm.js. Température 0 pour le parsing et le RAG.
- Code simple et lisible, pas d'abstraction inutile.
- Fin de tâche : lancer la requête correspondante de requests.http et montrer le résultat.

## Git

- Dépôt : https://github.com/Galgo-dev/SAAS-RH-EXERCICE-2026.git — branche principale `main`.
- **Chaque nouvelle fonctionnalité se développe sur une nouvelle branche** (`feature/<nom-court>`,
  `docs/<nom>` pour la documentation), jamais directement sur `main`. Intégration par pull request.
- Messages de commit en français.
- Ne push jamais sans ma permission
- Ne supprime aucun commit

## Technologies
- React
- Vite
- Axios
- Node.js 20 
- Express
- Zod

### Conventions

- **Composants** : fichiers `.jsx` en `PascalCase`, un composant par fichier ; hooks en `camelCase` préfixés par `use`.
- **Services API** : fichiers `<ressource>.api.js`, une fonction par endpoint ; ils utilisent uniquement `axiosClient`.
- **Pages** : assemblent layouts et composants ; les appels de données passent par les hooks.
- **Contrôle d'accès** : les routes protégées passent par `ProtectedRoute` / `RoleRoute` ; l'API reste la source de vérité pour les droits.
- **Variables d'environnement** : préfixe `VITE_` obligatoire, lues uniquement dans `api/axiosClient.js`.
- **Accessibilité** : police de base ≥ 18 px, boutons larges, contrastes élevés, libellés explicites sur tous les champs (public d'environ 58 ans).
- **Responsive** : conception mobile d'abord, valeurs communes centralisées dans `styles/variables.css`.


## Règles du projet
- Utilise le clean code
- Ne lis jamais le .env, nis le modifié