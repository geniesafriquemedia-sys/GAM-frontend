# 🌐 Configuration Cloudflare DNS - Guide Pas à Pas

## Domaine : geniesdafriquemedia.com

---

## 📋 ÉTAPE 1 : Accéder à Cloudflare DNS

1. Allez sur : **https://dash.cloudflare.com**
2. Connectez-vous à votre compte
3. Sélectionnez le domaine : **geniesdafriquemedia.com**
4. Dans le menu de gauche, cliquez sur **DNS**
5. Vous verrez **DNS > Records**

---

## 📋 ÉTAPE 2 : Ajouter les Enregistrements DNS

### ⚠️ NOTE IMPORTANTE
Pour l'instant, nous allons créer les enregistrements **sans les vraies valeurs Railway**.  
Vous les remplacerez une fois que Railway vous donnera les CNAME.

---

## 🔧 Enregistrements à Créer

### 1️⃣ **Enregistrement A pour le Root Domain (Temporaire)**

| Champ | Valeur |
|-------|--------|
| **Type** | `A` |
| **Name** | `@` |
| **IPv4 address** | `162.220.232.99` |
| **Proxy status** | ☁️ **Proxied** (Orange Cloud) |
| **TTL** | `Auto` |

**Comment faire :**
1. Cliquez sur **"+ Add record"**
2. Type : Sélectionnez `A`
3. Name : Tapez `@`
4. IPv4 address : Tapez `162.220.232.99`
5. Proxy status : **Activez le cloud orange** (Proxied)
6. Cliquez sur **"Save"**

---

### 2️⃣ **Enregistrement CNAME pour www**

| Champ | Valeur |
|-------|--------|
| **Type** | `CNAME` |
| **Name** | `www` |
| **Target** | `geniesdafriquemedia.com` |
| **Proxy status** | ☁️ **Proxied** (Orange Cloud) |
| **TTL** | `Auto` |

**Comment faire :**
1. Cliquez sur **"+ Add record"**
2. Type : Sélectionnez `CNAME`
3. Name : Tapez `www`
4. Target : Tapez `geniesdafriquemedia.com`
5. Proxy status : **Activez le cloud orange** (Proxied)
6. Cliquez sur **"Save"**

---

### 3️⃣ **Enregistrement CNAME pour api (Temporaire)**

| Champ | Valeur |
|-------|--------|
| **Type** | `CNAME` |
| **Name** | `api` |
| **Target** | `geniesdafriquemedia.com` |
| **Proxy status** | ☁️ **Proxied** (Orange Cloud) |
| **TTL** | `Auto` |

**Comment faire :**
1. Cliquez sur **"+ Add record"**
2. Type : Sélectionnez `CNAME`
3. Name : Tapez `api`
4. Target : Tapez `geniesdafriquemedia.com` (temporaire)
5. Proxy status : **Activez le cloud orange** (Proxied)
6. Cliquez sur **"Save"**

---

## 📧 ÉTAPE 3 : Enregistrements Email (Anti-Spoofing)

### 4️⃣ **SPF Record**

| Champ | Valeur |
|-------|--------|
| **Type** | `TXT` |
| **Name** | `@` |
| **Content** | `v=spf1 -all` |
| **TTL** | `Auto` |

**Comment faire :**
1. Cliquez sur **"+ Add record"**
2. Type : Sélectionnez `TXT`
3. Name : Tapez `@`
4. Content : Tapez `v=spf1 -all`
5. Cliquez sur **"Save"**

---

### 5️⃣ **DMARC Record**

| Champ | Valeur |
|-------|--------|
| **Type** | `TXT` |
| **Name** | `_dmarc` |
| **Content** | `v=DMARC1; p=reject; rua=mailto:dmarc@geniesdafriquemedia.com` |
| **TTL** | `Auto` |

**Comment faire :**
1. Cliquez sur **"+ Add record"**
2. Type : Sélectionnez `TXT`
3. Name : Tapez `_dmarc`
4. Content : Tapez `v=DMARC1; p=reject; rua=mailto:dmarc@geniesdafriquemedia.com`
5. Cliquez sur **"Save"**

---

## ✅ RÉSUMÉ - Enregistrements DNS Créés

Après ces étapes, vous devriez avoir **5 enregistrements** :

| Type | Name | Target/Content | Proxy |
|------|------|----------------|-------|
| A | @ | 162.220.232.99 | ☁️ Proxied |
| CNAME | www | geniesdafriquemedia.com | ☁️ Proxied |
| CNAME | api | geniesdafriquemedia.com | ☁️ Proxied |
| TXT | @ | v=spf1 -all | - |
| TXT | _dmarc | v=DMARC1; p=reject; rua=... | - |

---

## 🔐 ÉTAPE 4 : Configuration SSL/TLS

1. Dans Cloudflare, allez dans **SSL/TLS** → **Overview**
2. Mode de chiffrement : Sélectionnez **"Full (strict)"**
3. Allez dans **SSL/TLS** → **Edge Certificates**
4. Activez :
   - ✅ **Always Use HTTPS**
   - ✅ **Automatic HTTPS Rewrites**
   - ✅ **Minimum TLS Version : 1.2**

---

## 🎯 ÉTAPE 5 : Page Rules (Redirections)

### Redirection www → non-www (Optionnel)

1. Allez dans **Rules** → **Page Rules**
2. Cliquez sur **"Create Page Rule"**
3. URL : `www.geniesdafriquemedia.com/*`
4. Setting : **Forwarding URL** (301 - Permanent Redirect)
5. Destination : `https://geniesdafriquemedia.com/$1`
6. Cliquez sur **"Save and Deploy"**

---

## ⏭️ PROCHAINE ÉTAPE

Une fois ces enregistrements DNS créés dans Cloudflare :

1. ✅ **Allez sur Railway** pour ajouter les custom domains
2. ✅ **Railway vous donnera les vrais CNAME**
3. ✅ **Revenez sur Cloudflare** pour mettre à jour les enregistrements @ et api avec les vrais CNAME

---

## 📞 Besoin d'Aide ?

Si vous voyez des erreurs ou avez des questions, partagez une capture d'écran !

---

**Date de création** : 2026-02-23
