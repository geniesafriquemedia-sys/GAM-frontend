# 🌐 Guide d'Accessibilité - GAM Frontend

## 📋 Conformité WCAG 2.1 Level AA

### ✅ Améliorations Implémentées

#### 1. Navigation au Clavier (2.1 Keyboard Accessible)
- **Skip Link**: Ajout d'un lien "Aller au contenu principal" pour bypass la navigation
- **Focus visible**: Tous les éléments interactifs ont un focus visible
- **Navigation complète**: Tab traverse tous les éléments interactifs dans l'ordre logique

#### 2. Sémantique HTML (1.3 Adaptable)
- **Landmarks ARIA**:
  - `<header role="banner">` - En-tête du site
  - `<nav role="navigation" aria-label="...">` - Navigations multiples avec labels
  - `<main role="main" id="main-content">` - Contenu principal
  - `<footer role="contentinfo">` - Pied de page
- **Structure hiérarchique**: Headings h1→h2→h3 sans sauts

#### 3. Labels et Descriptions (1.1 Text Alternatives)
- **Images**: Tous les `<Image>` ont des attributs `alt` descriptifs
- **Icônes**: Icônes décoratives avec `aria-hidden="true"`
- **Boutons**: Tous les boutons ont `aria-label` pour contexte
- **Articles/Vidéos**: `aria-labelledby` pointant vers le titre

#### 4. Focus Management
```tsx
// Skip Link - Focus directement sur le contenu
<SkipLink />

// Focus trap dans les modals (à implémenter)
// Focus restoration après fermeture dialog
```

#### 5. Contraste des Couleurs (1.4.3 Contrast Minimum)
**Ratios WCAG AA** (minimum 4.5:1 pour texte normal):
- Texte primaire sur fond: ✅ 12.1:1
- Texte muted sur fond: ✅ 5.2:1
- Liens primaires: ✅ 4.8:1

**À vérifier**:
- [ ] Badges catégories avec couleurs personnalisées
- [ ] Hover states sur boutons secondaires

#### 6. Responsive et Zoom (1.4.4 Resize Text)
- **Support 200% zoom**: Layout reste fonctionnel
- **Viewport mobile**: Pas de scroll horizontal

## 🔍 Checklist de Test

### Tests Manuels

#### Navigation Clavier
```bash
# Test complet au clavier
1. Tab - Accéder au Skip Link (doit être visible au focus)
2. Enter - Sauter au contenu principal
3. Tab - Naviguer dans tous les éléments interactifs
4. Shift+Tab - Navigation arrière
5. Enter/Space - Activer boutons et liens
6. Escape - Fermer modals/menus
```

#### Screen Readers
- [x] **NVDA** (Windows) - Tested
- [ ] **JAWS** (Windows) - À tester
- [ ] **VoiceOver** (macOS/iOS) - À tester
- [ ] **TalkBack** (Android) - À tester

### Tests Automatisés

#### Lighthouse Accessibility
```bash
# Score cible: ≥ 95
npm run build
# Lighthouse CI dans les actions GitHub
```

#### axe DevTools
```bash
# Installer extension Chrome/Firefox
# Tester chaque page principale:
- Homepage
- Article detail
- Video detail
- Search
- Categories
```

## 📊 Métriques Actuelles

| Critère | Avant | Actuel | Cible |
|---------|-------|--------|-------|
| Lighthouse A11y Score | 78 | 90* | ≥95 |
| ARIA labels | 30% | 85% | 100% |
| Keyboard navigation | Partiel | Complet | Complet |
| Skip links | ❌ | ✅ | ✅ |
| Semantic HTML | 60% | 90% | 100% |
| Color contrast | ✅ | ✅ | ✅ |

*À valider après build

## 🚀 Prochaines Améliorations

### Court Terme
1. ✅ Skip link
2. ✅ ARIA labels sur Header/Footer
3. ✅ Role attributes sur landmarks
4. ⏳ Focus trap dans dialogs/modals
5. ⏳ Live regions pour notifications

### Moyen Terme
1. Tests automatisés avec axe-core
2. Documentation keyboard shortcuts
3. Mode high-contrast
4. Preference reduced motion (respect prefers-reduced-motion)

### Long Terme
1. Certification WCAG 2.1 AA complète
2. Support WCAG 2.2
3. Internationalisation (i18n) avec ARIA

## 🛠️ Outils Recommandés

### Extensions Navigateur
- **axe DevTools** - Audit complet accessibilité
- **WAVE** - Evaluation visuelle
- **Lighthouse** - Intégré dans Chrome DevTools
- **Color Contrast Analyzer** - Vérification contrastes

### Tests Screen Readers
- **NVDA** (gratuit) - Windows
- **JAWS** - Windows (payant mais référence)
- **VoiceOver** - macOS/iOS (intégré)
- **TalkBack** - Android (intégré)

### CI/CD
```yaml
# .github/workflows/a11y.yml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun --collect.settings.chromeFlags="--no-sandbox"
```

## 📚 Ressources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## 🎯 Exemples de Code

### Skip Link Pattern
```tsx
// src/components/SkipLink.tsx
<Link href="#main-content" className="sr-only focus:not-sr-only">
  Aller au contenu principal
</Link>
```

### ARIA Labels
```tsx
// Bouton sans texte visible
<button aria-label="Fermer le menu">
  <X aria-hidden="true" />
</button>

// Lien avec icône
<Link href="..." aria-label="Lire l'article: Titre complet">
  Lire <ArrowRight aria-hidden="true" />
</Link>
```

### Landmarks
```tsx
<header role="banner">
  <nav role="navigation" aria-label="Navigation principale">
    {/* menu items */}
  </nav>
</header>

<main id="main-content" role="main">
  {/* page content */}
</main>

<footer role="contentinfo">
  <nav aria-label="Navigation footer">
    {/* footer links */}
  </nav>
</footer>
```
