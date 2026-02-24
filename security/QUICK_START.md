# 🚀 Guide de Démarrage Rapide - Sécurité GAM

## ✅ Configuration Immédiate (5 minutes)

### 1. Activer les Headers de Sécurité
Les headers sont déjà configurés dans `next.config.ts` ✅

### 2. Tester le Middleware
Le middleware est actif et protège automatiquement contre :
- ✅ Rate limiting (100 req/min par IP)
- ✅ IP blocking
- ✅ Request tracking

### 3. Lancer un Audit de Sécurité

**Windows/PowerShell :**
```powershell
.\security\scripts\check-vulnerabilities.ps1
```

**Linux/Mac :**
```bash
bash security/scripts/security-audit.sh
```

### 4. Installer les Outils de Sécurité

```bash
# Snyk (scan de vulnérabilités)
npm install -g snyk
snyk auth

# OWASP Dependency Check
npm install -g npm-audit-resolver

# Helmet (headers supplémentaires si besoin)
npm install helmet
```

---

## 📊 Commandes Rapides

### Audit NPM
```bash
npm audit
npm audit fix
```

### Scan Snyk
```bash
snyk test
snyk monitor  # Monitoring continu
```

### Vérifier les Outdated Packages
```bash
npm outdated
```

### Générer un Rapport de Sécurité
```bash
npm run security:audit  # Voir package.json.security
```

---

## 🔒 Checklist Post-Installation

- [ ] Copier `security/dependabot.yml` vers `.github/dependabot.yml`
- [ ] Copier `security/github-actions-security.yml` vers `.github/workflows/security.yml`
- [ ] Configurer les secrets GitHub (SNYK_TOKEN, etc.)
- [ ] Activer Dependabot dans les settings GitHub
- [ ] Configurer les alertes de sécurité GitHub
- [ ] Ajouter `.env.local` dans `.gitignore` (déjà fait ✅)
- [ ] Vérifier que les API keys ne sont pas commitées
- [ ] Tester le rate limiting en local
- [ ] Vérifier les headers avec https://securityheaders.com

---

## 🎯 Prochaines Étapes (Backend)

1. **Django/Wagtail** :
   - Installer `django-csp`
   - Configurer `django-ratelimit`
   - Activer `django-defender`
   - Configurer CORS correctement

2. **Base de données** :
   - Chiffrer les données sensibles
   - Activer SSL pour PostgreSQL
   - Configurer les backups chiffrés

3. **Infrastructure** :
   - Configurer un WAF (Web Application Firewall)
   - Activer fail2ban sur le serveur
   - Mettre en place un monitoring (Sentry, LogRocket)

---

## 📞 Support

- **Documentation complète** : `SECURITY.md`
- **Checklist détaillée** : `security/SECURITY_CHECKLIST.md`
- **Guide d'implémentation** : `security/IMPLEMENTATION_GUIDE.md`
- **Backend** : `security/backend-security.md`

---

## ⚠️ Important

**NE JAMAIS COMMITER** :
- `.env.local`
- `.env.production`
- Clés API
- Secrets
- Tokens
- Certificats SSL

**Toujours vérifier avant un commit** :
```bash
git diff --cached | grep -i "api_key\|password\|secret\|token"
```
