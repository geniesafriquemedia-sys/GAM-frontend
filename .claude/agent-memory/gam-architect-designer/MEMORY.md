# GAM Architect Agent Memory

Key architectural facts and recurring pitfalls discovered across sessions.
See topic files for details.

## Backend Pitfalls

- DRF SessionAuthentication CSRF trap: any view with `permission_classes = [AllowAny]`
  that accepts POST will still get a 403 if `SessionAuthentication` is in the global
  `DEFAULT_AUTHENTICATION_CLASSES`. Fix: set `authentication_classes = []` on the view.
  Affected: `apps/advertising/views.py` TrackAdView (fixed 2026-02-25).
  See: debugging.md#csrf-403-on-allowany-post

- django-filters OrderingFilter alias mismatch: fields tuple format is
  `(model_field, query_param_alias)`. If alias differs from field name, the frontend
  query param will 400. In `apps/editorial/filters.py` `views_count` was aliased as
  `views` — corrected to `views_count` for both ArticleFilter and VideoFilter (2026-02-25).
  See: debugging.md#ordering-400-alias-mismatch

## Key Settings

- DRF global auth: JWT + SessionAuthentication (base.py line 229)
- DRF global permission: IsAuthenticatedOrReadOnly (base.py line 233)
- ArticleViewSet filter_backends: DjangoFilterBackend ONLY (views.py line 178)
  — DRF OrderingFilter backend is NOT active; ordering goes through ArticleFilter.
