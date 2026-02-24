#!/usr/bin/env pwsh
# Script PowerShell pour vérifier les vulnérabilités de sécurité

Write-Host "🔒 GAM Security Audit - Frontend" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# 1. NPM Audit
Write-Host "📦 Running npm audit..." -ForegroundColor Yellow
npm audit --json > security/reports/npm-audit.json
$npmAuditResult = npm audit
Write-Host $npmAuditResult

# 2. Check for outdated packages
Write-Host ""
Write-Host "📌 Checking outdated packages..." -ForegroundColor Yellow
npm outdated

# 3. Check for known vulnerable dependencies
Write-Host ""
Write-Host "🔍 Checking dependencies with Snyk (if installed)..." -ForegroundColor Yellow
if (Get-Command snyk -ErrorAction SilentlyContinue) {
    snyk test --json > security/reports/snyk-report.json
    snyk test
} else {
    Write-Host "⚠️  Snyk not installed. Run: npm install -g snyk" -ForegroundColor Red
}

# 4. Check environment variables
Write-Host ""
Write-Host "🔐 Checking environment variables..." -ForegroundColor Yellow
if (Test-Path .env.local) {
    Write-Host "✅ .env.local found" -ForegroundColor Green
    
    # Vérifier les variables sensibles
    $envContent = Get-Content .env.local -Raw
    
    if ($envContent -match "API_KEY|SECRET|PASSWORD|TOKEN") {
        Write-Host "⚠️  Warning: Sensitive data detected in .env.local" -ForegroundColor Yellow
        Write-Host "   Make sure .env.local is in .gitignore" -ForegroundColor Yellow
    }
    
    if ($envContent -match "http://") {
        Write-Host "⚠️  Warning: HTTP URLs found (should use HTTPS)" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  .env.local not found" -ForegroundColor Red
}

# 5. Check for hardcoded secrets in code
Write-Host ""
Write-Host "🔎 Scanning for hardcoded secrets..." -ForegroundColor Yellow
$secretPatterns = @(
    'api[_-]?key',
    'password',
    'secret',
    'token',
    'private[_-]?key'
)

foreach ($pattern in $secretPatterns) {
    $matches = Select-String -Path "src/**/*.ts","src/**/*.tsx" -Pattern $pattern -CaseSensitive:$false
    if ($matches) {
        Write-Host "⚠️  Potential secret found: $pattern" -ForegroundColor Yellow
        $matches | ForEach-Object { Write-Host "   $($_.Path):$($_.LineNumber)" -ForegroundColor Gray }
    }
}

# 6. Check security headers
Write-Host ""
Write-Host "🛡️  Checking security headers configuration..." -ForegroundColor Yellow
if (Test-Path "security/security-headers.config.ts") {
    Write-Host "✅ Security headers configured" -ForegroundColor Green
} else {
    Write-Host "❌ Security headers not configured" -ForegroundColor Red
}

# 7. Check middleware
Write-Host ""
Write-Host "🚧 Checking middleware..." -ForegroundColor Yellow
if (Test-Path "src/middleware.ts") {
    Write-Host "✅ Middleware file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  No middleware.ts found" -ForegroundColor Yellow
}

# 8. Generate report
Write-Host ""
Write-Host "📊 Generating security report..." -ForegroundColor Yellow

$report = @{
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    npmAudit = $npmAuditResult
    checksPerformed = @(
        "npm audit",
        "outdated packages",
        "snyk scan",
        "environment variables",
        "hardcoded secrets",
        "security headers",
        "middleware"
    )
}

$report | ConvertTo-Json -Depth 10 | Out-File "security/reports/security-audit-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"

Write-Host ""
Write-Host "✅ Security audit completed!" -ForegroundColor Green
Write-Host "📄 Reports saved in security/reports/" -ForegroundColor Cyan
