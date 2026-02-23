# Configuration DNS Cloudflare pour GAM

## 🎯 Domaine : geniesdafriquemedia.com

### 📋 Informations Railway

**Frontend**
- IP Statique (Outbound): `162.220.232.99`
- Région: `us-west2`
- URL Railway: `[Votre URL Railway Frontend]`

**Backend**
- URL Railway: `[Votre URL Railway Backend]`

---

## ⚙️ Configuration DNS Cloudflare

### 1️⃣ **Enregistrement pour le domaine racine (Root)** d'

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| CNAME | @ | `[votre-app].up.railway.app` | ✅ Proxied (Orange Cloud) | Auto |

**Alternative avec IP (moins recommandé car Railway peut changer l'IP) :**
| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| A | @ | `162.220.232.99` | ✅ Proxied | Auto |

---

### 2️⃣ **Enregistrement pour www**

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| CNAME | www | geniesdafriquemedia.com | ✅ Proxied | Auto |

---

### 3️⃣ **Enregistrement pour l'API Backend**

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| CNAME | api | `[votre-backend].up.railway.app` | ✅ Proxied | Auto |

---

### 4️⃣ **Enregistrements Email (Anti-Spoofing)**

#### SPF Record
| Type | Name | Content | TTL |
|------|------|---------|-----|
| TXT | @ | `v=spf1 -all` | Auto |

#### DKIM Record
| Type | Name | Content | TTL |
|------|------|---------|-----|
| TXT | _domainkey | `o=~; r=postmaster@geniesdafriquemedia.com` | Auto |

#### DMARC Record
| Type | Name | Content | TTL |
|------|------|---------|-----|
| TXT | _dmarc | `v=DMARC1; p=reject; rua=mailto:dmarc@geniesdafriquemedia.com` | Auto |

---

## 🔧 Configuration Railway (Custom Domain)

### Étapes dans Railway Dashboard :

1. **Allez dans votre projet Frontend** → Settings → Domains
2. Cliquez sur **"Add Custom Domain"**
3. Entrez : `geniesdafriquemedia.com`
4. Railway va vous donner un **CNAME target** (ex: `xxx.up.railway.app`)
5. Répétez pour `www.geniesdafriquemedia.com`

### Étapes dans Railway Dashboard (Backend) :

1. **Allez dans votre projet Backend** → Settings → Domains
2. Cliquez sur **"Add Custom Domain"**
3. Entrez : `api.geniesdafriquemedia.com`
4. Railway va générer le CNAME

---

## ✅ Vérification DNS

Après configuration, vérifiez avec ces commandes :

```bash
# Vérifier le domaine principal
nslookup geniesdafriquemedia.com

# Vérifier www
nslookup www.geniesdafriquemedia.com

# Vérifier API
nslookup api.geniesdafriquemedia.com

# Vérifier les enregistrements TXT (SPF, DMARC)
nslookup -type=TXT geniesdafriquemedia.com
nslookup -type=TXT _dmarc.geniesdafriquemedia.com
```

---

## 🌐 SSL/TLS Configuration (Cloudflare)

1. **Allez dans Cloudflare** → SSL/TLS → Overview
2. Sélectionnez **"Full (strict)"** pour le chiffrement
3. Activez **"Always Use HTTPS"**
4. Activez **"Automatic HTTPS Rewrites"**

---

## 📝 Variables d'Environnement à Mettre à Jour

Une fois le domaine configuré, mettez à jour dans Railway :

### Frontend
```env
NEXT_PUBLIC_API_URL=https://api.geniesdafriquemedia.com/api/v1
NEXT_PUBLIC_MEDIA_URL=https://api.geniesdafriquemedia.com
NEXT_PUBLIC_SITE_URL=https://geniesdafriquemedia.com
```

### Backend (Django)
```env
ALLOWED_HOSTS=api.geniesdafriquemedia.com
CORS_ALLOWED_ORIGINS=https://geniesdafriquemedia.com,https://www.geniesdafriquemedia.com
CSRF_TRUSTED_ORIGINS=https://geniesdafriquemedia.com,https://www.geniesdafriquemedia.com
```

---

## 🚀 Ordre de Configuration Recommandé

1. ✅ **Railway Frontend** : Ajouter custom domain → Obtenir CNAME
2. ✅ **Railway Backend** : Ajouter custom domain → Obtenir CNAME
3. ✅ **Cloudflare DNS** : Ajouter tous les enregistrements
4. ✅ **Attendre propagation** : 5-10 minutes
5. ✅ **Tester** : Accéder à geniesdafriquemedia.com
6. ✅ **Variables d'environnement** : Mettre à jour les URLs
7. ✅ **Redéployer** : Frontend et Backend sur Railway

---

## ⚠️ Notes Importantes

- **Proxy Cloudflare (Orange Cloud)** : Active la protection DDoS, cache CDN, et SSL automatique
- **Propagation DNS** : Peut prendre jusqu'à 24h (généralement 5-10 min)
- **SSL Railway** : Railway génère automatiquement un certificat Let's Encrypt
- **Redirection www → non-www** : Configurez dans Cloudflare Page Rules

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs Railway
2. Testez avec `curl -I https://geniesdafriquemedia.com`
3. Vérifiez le SSL avec : https://www.ssllabs.com/ssltest/

---

**Date de création** : 2026-02-23
**Dernière mise à jour** : 2026-02-23
