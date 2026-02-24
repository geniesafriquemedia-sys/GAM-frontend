# 🔒 Pull Request Backend - Implémentation Sécurité Django/Wagtail

## 📋 Checklist des modifications à apporter

### ✅ À faire dans le repository backend

---

## 1. 📦 Dépendances de Sécurité à Installer

```bash
# Requirements à ajouter dans requirements.txt ou Pipfile

# Sécurité
django-csp==3.8              # Content Security Policy
django-ratelimit==4.1.0      # Rate limiting
django-defender==0.9.7       # Brute force protection
django-cors-headers==4.3.1   # CORS configuration
django-environ==0.11.2       # Environment variables
whitenoise==6.6.0           # Static files security

# Monitoring
sentry-sdk==1.40.0          # Error tracking
django-extensions==3.2.3     # Debug tools

# Tests de sécurité
bandit==1.7.5               # Security linter
safety==3.0.1               # Dependency scanner
```

---

## 2. ⚙️ Configuration Django Settings

### `settings/base.py` ou `settings.py`

```python
import environ
from pathlib import Path

# Environment variables
env = environ.Env(
    DEBUG=(bool, False)
)

# SECURITY SETTINGS
# ================

# 1. DEBUG (CRITICAL)
DEBUG = env('DEBUG', default=False)  # MUST be False in production

# 2. SECRET_KEY
SECRET_KEY = env('SECRET_KEY')  # Must be in .env, never in code

# 3. ALLOWED_HOSTS
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[
    'api.geniesdafriquemedia.com',
    'geniesdafriquemedia.com',
])

# 4. SECURE HEADERS
SECURE_SSL_REDIRECT = env.bool('SECURE_SSL_REDIRECT', default=True)
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# 5. SESSION SECURITY
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_AGE = 3600  # 1 hour

# 6. CSRF PROTECTION
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS', default=[
    'https://geniesdafriquemedia.com',
    'https://api.geniesdafriquemedia.com',
])

# 7. CORS CONFIGURATION
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[
    'https://geniesdafriquemedia.com',
])
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# 8. CONTENT SECURITY POLICY
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", "'unsafe-eval'")
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
CSP_IMG_SRC = ("'self'", "data:", "https:")
CSP_FONT_SRC = ("'self'", "data:")
CSP_CONNECT_SRC = ("'self'",)
CSP_FRAME_ANCESTORS = ("'none'",)
CSP_BASE_URI = ("'self'",)
CSP_FORM_ACTION = ("'self'",)

# 9. PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 12}  # Minimum 12 caractères
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# 10. RATE LIMITING (django-ratelimit)
RATELIMIT_ENABLE = True
RATELIMIT_USE_CACHE = 'default'

# 11. DJANGO DEFENDER
DEFENDER_REDIS_URL = env('REDIS_URL', default='redis://localhost:6379/0')
DEFENDER_LOCK_OUT_BY_IP_AND_USERNAME = True
DEFENDER_COOLOFF_TIME = 300  # 5 minutes
DEFENDER_LOGIN_FAILURE_LIMIT = 5
DEFENDER_BEHIND_REVERSE_PROXY = True
DEFENDER_DISABLE_IP_LOCKOUT = False

# 12. DATABASE SECURITY
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT', default='5432'),
        'CONN_MAX_AGE': 600,
        'OPTIONS': {
            'sslmode': 'require',  # Force SSL
        },
    }
}

# 13. LOGGING
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs/django.log',
            'maxBytes': 1024 * 1024 * 15,  # 15MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'security': {
            'level': 'WARNING',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs/security.log',
            'maxBytes': 1024 * 1024 * 15,
            'backupCount': 10,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django.security': {
            'handlers': ['security'],
            'level': 'WARNING',
            'propagate': False,
        },
        'django': {
            'handlers': ['file'],
            'level': 'WARNING',
            'propagate': True,
        },
    },
}

# 14. SENTRY (Error Monitoring)
if not DEBUG:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration
    
    sentry_sdk.init(
        dsn=env('SENTRY_DSN'),
        integrations=[DjangoIntegration()],
        traces_sample_rate=0.1,
        send_default_pii=False,
        environment=env('ENVIRONMENT', default='production'),
    )

# 15. MIDDLEWARE (ordre important)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Static files
    'csp.middleware.CSPMiddleware',  # CSP
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'defender.middleware.FailedLoginMiddleware',  # Django Defender
]
```

---

## 3. 🛡️ Middleware Personnalisé de Sécurité

### Créer `middleware/security.py`

```python
import logging
from django.http import JsonResponse
from django.core.cache import cache
from ipaddress import ip_address, ip_network

logger = logging.getLogger('django.security')

# Blacklist d'IPs (à externaliser en DB)
BLACKLISTED_IPS = []

# Whitelist pour API (monitoring, CI/CD, etc.)
WHITELISTED_IPS = []

class SecurityMiddleware:
    """
    Middleware de sécurité personnalisé
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # 1. IP Blocking
        client_ip = self.get_client_ip(request)
        
        if self.is_blacklisted(client_ip):
            logger.warning(f"Blocked request from blacklisted IP: {client_ip}")
            return JsonResponse({'error': 'Forbidden'}, status=403)
        
        # 2. Suspicious patterns
        if self.is_suspicious_request(request):
            logger.warning(f"Suspicious request detected from {client_ip}: {request.path}")
            return JsonResponse({'error': 'Bad Request'}, status=400)
        
        # 3. Rate limiting (simple)
        if not self.is_whitelisted(client_ip):
            if self.is_rate_limited(client_ip):
                logger.warning(f"Rate limit exceeded for IP: {client_ip}")
                return JsonResponse({'error': 'Too Many Requests'}, status=429)
        
        response = self.get_response(request)
        
        # 4. Security headers (supplémentaires)
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        return response
    
    def get_client_ip(self, request):
        """Obtenir l'IP réelle du client"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    def is_blacklisted(self, ip):
        """Vérifier si l'IP est blacklistée"""
        return ip in BLACKLISTED_IPS
    
    def is_whitelisted(self, ip):
        """Vérifier si l'IP est whitelistée"""
        return ip in WHITELISTED_IPS
    
    def is_suspicious_request(self, request):
        """Détecter les patterns suspects"""
        suspicious_patterns = [
            '../', '..\\',  # Path traversal
            '<script', 'javascript:',  # XSS
            'union select', 'drop table',  # SQL injection
            '/etc/passwd', '/proc/',  # File inclusion
        ]
        
        path = request.path.lower()
        query = request.GET.urlencode().lower()
        
        for pattern in suspicious_patterns:
            if pattern in path or pattern in query:
                return True
        
        return False
    
    def is_rate_limited(self, ip):
        """Rate limiting simple basé sur cache"""
        cache_key = f'rate_limit_{ip}'
        requests = cache.get(cache_key, 0)
        
        if requests > 100:  # Max 100 requêtes par minute
            return True
        
        cache.set(cache_key, requests + 1, 60)  # 60 secondes
        return False
```

---

## 4. 🔐 API Views avec Rate Limiting

### Dans vos views API

```python
from django_ratelimit.decorators import ratelimit
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

# Pour les vues basées sur fonctions
@ratelimit(key='ip', rate='10/m', method='GET')
def api_articles_list(request):
    # ...
    pass

# Pour les ViewSets DRF
class ArticleViewSet(viewsets.ModelViewSet):
    
    @method_decorator(ratelimit(key='ip', rate='20/m', method='GET'))
    @method_decorator(cache_page(60 * 5))  # Cache 5 minutes
    def list(self, request):
        return super().list(request)
    
    @method_decorator(ratelimit(key='ip', rate='5/m', method='POST'))
    def create(self, request):
        return super().create(request)
```

---

## 5. 📝 Fichier `.env.example`

```env
# Django
DEBUG=False
SECRET_KEY=your-secret-key-here-minimum-50-chars
ALLOWED_HOSTS=api.geniesdafriquemedia.com,geniesdafriquemedia.com
ENVIRONMENT=production

# Database
DB_NAME=gam_db
DB_USER=gam_user
DB_PASSWORD=strong-password-here
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://geniesdafriquemedia.com
CSRF_TRUSTED_ORIGINS=https://geniesdafriquemedia.com,https://api.geniesdafriquemedia.com

# Redis
REDIS_URL=redis://localhost:6379/0

# Security
SECURE_SSL_REDIRECT=True

# Sentry
SENTRY_DSN=your-sentry-dsn-here

# Supabase (si utilisé)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-anon-key-here
```

---

## 6. 🧪 Script d'Audit Sécurité Backend

### `scripts/security_audit.py`

```python
#!/usr/bin/env python
"""
Script d'audit de sécurité Django
"""

import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
django.setup()

from django.conf import settings
from django.core.management import call_command

def check_debug_mode():
    """Vérifier que DEBUG est False en production"""
    if settings.DEBUG:
        print("❌ CRITICAL: DEBUG is True in production!")
        return False
    print("✅ DEBUG is False")
    return True

def check_secret_key():
    """Vérifier que SECRET_KEY est configurée"""
    if not settings.SECRET_KEY or len(settings.SECRET_KEY) < 50:
        print("❌ CRITICAL: SECRET_KEY is weak or missing!")
        return False
    print("✅ SECRET_KEY is properly configured")
    return True

def check_allowed_hosts():
    """Vérifier ALLOWED_HOSTS"""
    if not settings.ALLOWED_HOSTS or '*' in settings.ALLOWED_HOSTS:
        print("❌ WARNING: ALLOWED_HOSTS not properly configured!")
        return False
    print(f"✅ ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
    return True

def check_security_middleware():
    """Vérifier les middleware de sécurité"""
    required_middleware = [
        'django.middleware.security.SecurityMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
    ]
    
    for mw in required_middleware:
        if mw not in settings.MIDDLEWARE:
            print(f"❌ Missing middleware: {mw}")
            return False
    
    print("✅ Security middleware properly configured")
    return True

def check_https_settings():
    """Vérifier les paramètres HTTPS"""
    checks = [
        ('SECURE_SSL_REDIRECT', getattr(settings, 'SECURE_SSL_REDIRECT', False)),
        ('SECURE_HSTS_SECONDS', getattr(settings, 'SECURE_HSTS_SECONDS', 0)),
        ('SESSION_COOKIE_SECURE', getattr(settings, 'SESSION_COOKIE_SECURE', False)),
        ('CSRF_COOKIE_SECURE', getattr(settings, 'CSRF_COOKIE_SECURE', False)),
    ]
    
    all_ok = True
    for name, value in checks:
        if not value:
            print(f"⚠️  {name} is not enabled")
            all_ok = False
        else:
            print(f"✅ {name} is enabled")
    
    return all_ok

def run_django_check():
    """Lancer les checks Django"""
    print("\n🔍 Running Django system checks...")
    call_command('check', '--deploy')

if __name__ == '__main__':
    print("🔒 GAM Backend Security Audit")
    print("=" * 50)
    
    checks = [
        check_debug_mode(),
        check_secret_key(),
        check_allowed_hosts(),
        check_security_middleware(),
        check_https_settings(),
    ]
    
    run_django_check()
    
    print("\n" + "=" * 50)
    if all(checks):
        print("✅ All security checks passed!")
        sys.exit(0)
    else:
        print("❌ Some security checks failed!")
        sys.exit(1)
```

---

## 7. 📦 Package.json pour le Backend (optionnel)

```json
{
  "name": "gam-backend-security",
  "version": "1.0.0",
  "scripts": {
    "security:audit": "python scripts/security_audit.py",
    "security:scan": "bandit -r . -ll",
    "security:deps": "safety check",
    "security:full": "npm run security:audit && npm run security:scan && npm run security:deps"
  },
  "devDependencies": {}
}
```

---

## 8. ✅ Checklist de Validation

### Avant de créer la PR Backend

- [ ] Installer toutes les dépendances de sécurité
- [ ] Configurer `settings.py` avec tous les paramètres de sécurité
- [ ] Créer le middleware de sécurité personnalisé
- [ ] Ajouter rate limiting sur toutes les API
- [ ] Créer `.env.example` complet
- [ ] Tester `python manage.py check --deploy`
- [ ] Lancer `bandit -r . -ll`
- [ ] Lancer `safety check`
- [ ] Vérifier logs de sécurité
- [ ] Tester en staging avant production

---

## 9. 📝 Message de Commit Suggéré

```bash
feat: comprehensive security implementation for Django/Wagtail backend

Security enhancements:
- Add django-csp for Content Security Policy
- Implement django-ratelimit for API protection
- Configure django-defender for brute force protection
- Add custom security middleware (IP blocking, suspicious patterns)
- Enable all Django security headers (HSTS, CSP, X-Frame-Options, etc.)
- Configure strict CORS policy
- Add Sentry for error monitoring
- Implement comprehensive logging
- Add security audit scripts
- Force HTTPS in production
- Strengthen password validation
- Configure secure session/cookie settings

Breaking changes:
- Requires new environment variables (see .env.example)
- Requires Redis for django-defender
- HTTPS now mandatory in production
```

---

## 10. 🚀 Déploiement

### Commandes après merge

```bash
# Sur le serveur de production
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python scripts/security_audit.py

# Redémarrer les services
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

---

## 📞 Support

Pour toute question sur l'implémentation :
- Frontend security: `SECURITY.md`
- Backend security: Ce document
- Quick start: `security/QUICK_START.md`

---

✅ **Prêt pour la Pull Request Backend !**
