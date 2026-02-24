# Instructions de Déploiement Backend

## Script de Publicités

Le script `scripts/populate_ads.py` doit être exécuté au démarrage Docker.

### Option 1 : Modifier le script de démarrage

Dans votre fichier de démarrage (probablement `start.sh` ou `entrypoint.sh`), ajoutez APRÈS les migrations :

```bash
#!/bin/bash

# Migrations
python manage.py migrate --noinput

# Collecter les fichiers statiques
python manage.py collectstatic --noinput

# Migrer les médias
python manage.py migrate_media_to_supabase

# ✅ AJOUTER ICI : Peupler les publicités
python manage.py shell < scripts/populate_ads.py || echo "Ads already populated or script failed"

# Démarrer le serveur
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Option 2 : Django Management Command (Recommandé)

Créez un management command pour plus de contrôle :

```bash
# backend/apps/advertising/management/commands/populate_ads.py
```

Puis dans le script de démarrage :

```bash
python manage.py populate_ads --skip-existing
```

## Problème des Tendances

L'API retourne `[]` car aucun article n'a de `views_count` > 0.

### Solution Immédiate

Exécutez ce script Django pour générer des vues aléatoires :

```python
# scripts/generate_views.py
from apps.editorial.models import Article
import random

for article in Article.objects.filter(status='published'):
    article.views_count = random.randint(1000, 50000)
    article.save(update_fields=['views_count'])
    
print(f"✓ {Article.objects.count()} articles ont maintenant des vues")
```

Exécution :
```bash
python manage.py shell < scripts/generate_views.py
```

### Solution Permanente

Activez le tracking des vues dans l'API (déjà implémenté normalement dans `ArticleViewSet`).

## Logs Actuels

```
GET /api/v1/advertising/active/?position=HOMEPAGE_TOP HTTP/1.1" 200 2
```

Le `200 2` indique une réponse vide `[]` (2 bytes = tableau vide).

✅ **Une fois les scripts exécutés, les APIs retourneront des données.**
