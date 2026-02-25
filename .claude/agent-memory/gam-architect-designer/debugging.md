# GAM Debugging Notes

## csrf-403-on-allowany-post

**Symptom:** `POST /api/v1/advertising/track/` returns 403 Forbidden even though the
view has `permission_classes = [AllowAny]`.

**Root cause:** DRF's `SessionAuthentication` enforces CSRF on all unsafe HTTP methods
(POST, PUT, PATCH, DELETE) regardless of the view's `permission_classes`. The CSRF check
happens inside the authentication class, before permission evaluation. If the client
sends no CSRF token, `SessionAuthentication.enforce_csrf()` raises `PermissionDenied`
(403) before AllowAny can allow the request through.

**Global setting (base.py lines 229-232):**
```python
'DEFAULT_AUTHENTICATION_CLASSES': [
    'rest_framework_simplejwt.authentication.JWTAuthentication',
    'rest_framework.authentication.SessionAuthentication',  # enforces CSRF on POST
],
```

**Fix:** Set `authentication_classes = []` on the view to disable all authentication
(and therefore CSRF enforcement) for that endpoint.

```python
class TrackAdView(APIView):
    authentication_classes = []   # disables CSRF from SessionAuthentication
    permission_classes = [AllowAny]
```

**Pattern to watch for:** Any public write endpoint (newsletter subscribe, contact form,
ad tracking, KPI tracking) that is called from a browser without CSRF headers will hit
this if SessionAuthentication remains in the global list.

---

## ordering-400-alias-mismatch

**Symptom:** `GET /api/v1/editorial/articles/?ordering=-views_count` returns 400 Bad
Request. The field `views_count` exists on the Article model.

**Root cause:** `ArticleViewSet` sets `filter_backends = [DjangoFilterBackend]` only.
DRF's own `OrderingFilter` backend is NOT active for this viewset. All ordering is
handled by `django_filters.OrderingFilter` declared inside `ArticleFilter`.

The `django_filters.OrderingFilter` `fields` tuple uses the format
`(model_field_name, query_param_alias)`. The original code had:
```python
('views_count', 'views'),   # alias was 'views', not 'views_count'
```

So `?ordering=-views_count` was an unknown alias -> 400. The correct alias is
`views_count` to match what the frontend sends.

**Fix (filters.py):**
```python
ordering = django_filters.OrderingFilter(
    fields=(
        ('published_at', 'published_at'),
        ('created_at', 'created_at'),
        ('views_count', 'views_count'),   # alias now matches field name
        ('reading_time', 'reading_time'),
        ('title', 'title'),
    )
)
```

Applied to both `ArticleFilter` and `VideoFilter`.

**Rule of thumb:** Keep the alias identical to the model field name unless there is a
deliberate reason to expose a different public name. Mismatches between alias and field
name are silent until a client sends the field name directly.
