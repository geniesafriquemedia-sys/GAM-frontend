# Scripts Backend GAM

## populate_ads.py

Script pour peupler la base de données avec des publicités initiales.

### Utilisation

```bash
# Depuis le backend Django
python manage.py shell < scripts/populate_ads.py

# Ou directement
python scripts/populate_ads.py
```

### Configuration Docker

Le script est exécuté automatiquement lors du déploiement via le Dockerfile.

### Images

Les images proviennent d'Unsplash (libres de droits) avec des catégories appropriées pour un média africain.
