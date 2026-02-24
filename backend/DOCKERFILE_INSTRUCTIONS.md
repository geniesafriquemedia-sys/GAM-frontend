# Instructions Dockerfile Backend

## Utiliser le script start.sh

Pour que le script `start.sh` soit exécuté automatiquement, modifiez votre `Dockerfile` :

### Option 1 : CMD dans Dockerfile

```dockerfile
# À la fin du Dockerfile
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
```

### Option 2 : ENTRYPOINT

```dockerfile
# À la fin du Dockerfile
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]
```

### Option 3 : Railway Config

Si vous utilisez Railway, vous pouvez aussi définir la commande dans `railway.json` ou dans les settings Railway :

**Start Command** :
```bash
bash start.sh
```

## Vérification

Après déploiement, vérifiez les logs Railway. Vous devriez voir :

```
🚀 Starting GAM Backend...
📊 Applying database migrations...
📦 Collecting static files...
☁️ Migrating media from Cloudinary to Supabase...
📈 Generating article views...
  ✓ Article 1... → 12,345 vues
  ✓ Article 2... → 23,456 vues
💰 Populating advertisements...
  ✓ 10 publicités créées
✅ Initialization complete!
🌐 Starting Gunicorn server...
```

## Fichiers Requis

- ✅ `start.sh` - Script de démarrage
- ✅ `scripts/generate_views.py` - Génération vues
- ✅ `scripts/populate_ads.py` - Création pubs
- ✅ Permissions exécution : `chmod +x start.sh`

## Troubleshooting

Si les scripts ne s'exécutent pas :

1. Vérifier les permissions : `chmod +x start.sh`
2. Vérifier le path dans Dockerfile : `/app/start.sh`
3. Regarder les logs Railway pour erreurs
4. Tester en local : `docker build && docker run`
