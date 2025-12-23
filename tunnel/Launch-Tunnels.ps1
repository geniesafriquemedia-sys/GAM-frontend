<#
.SYNOPSIS
    Lance les tunnels Cloudflare pour GAM (Frontend et Backend)
.DESCRIPTION
    Ce script lance deux tunnels cloudflared ephemeres et deploie les Workers
    Cloudflare avec les URLs de tunnel comme secrets.
.NOTES
    Compte Cloudflare: Geniesafriquemedia@gmail.com
    Prerequis: cloudflared et wrangler installes
#>

param(
    [switch]$SkipDeploy,
    [int]$FrontendPort = 3000,
    [int]$BackendPort = 8000
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogDir = Join-Path $ScriptDir "logs"

# Couleurs pour la console
function Write-Info { param($msg) Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Warning { param($msg) Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Error { param($msg) Write-Host "[ERROR] $msg" -ForegroundColor Red }

# Banner
Write-Host @"

   ██████╗  █████╗ ███╗   ███╗
  ██╔════╝ ██╔══██╗████╗ ████║
  ██║  ███╗███████║██╔████╔██║
  ██║   ██║██╔══██║██║╚██╔╝██║
  ╚██████╔╝██║  ██║██║ ╚═╝ ██║
   ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
  Genies Afrique Medias - Tunnel Launcher

"@ -ForegroundColor Magenta

# Creer le dossier de logs
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

# Verifier cloudflared
Write-Info "Verification de cloudflared..."
$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue
if (!$cloudflared) {
    Write-Error "cloudflared n'est pas installe ou pas dans le PATH"
    Write-Host "Installez-le depuis: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/"
    exit 1
}
Write-Success "cloudflared trouve: $($cloudflared.Source)"

# Verifier wrangler
Write-Info "Verification de wrangler..."
$wrangler = Get-Command wrangler -ErrorAction SilentlyContinue
if (!$wrangler) {
    Write-Warning "wrangler n'est pas installe. Installation via npm..."
    npm install -g wrangler
}
Write-Success "wrangler disponible"

# Fonction pour extraire l'URL du tunnel depuis les logs
function Get-TunnelUrl {
    param(
        [string]$LogFile,
        [int]$TimeoutSeconds = 30
    )

    $startTime = Get-Date
    while ((Get-Date) - $startTime -lt [TimeSpan]::FromSeconds($TimeoutSeconds)) {
        if (Test-Path $LogFile) {
            $content = Get-Content $LogFile -Raw -ErrorAction SilentlyContinue
            if ($content -match "https://[a-z0-9-]+\.trycloudflare\.com") {
                return $matches[0]
            }
        }
        Start-Sleep -Milliseconds 500
    }
    return $null
}

# Nettoyer les anciens processus cloudflared
Write-Info "Nettoyage des anciens tunnels..."
Get-Process cloudflared -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Log files
$FrontendLog = Join-Path $LogDir "frontend-tunnel.log"
$BackendLog = Join-Path $LogDir "backend-tunnel.log"

# Lancer le tunnel Frontend
Write-Info "Lancement du tunnel Frontend (port $FrontendPort)..."
$frontendProcess = Start-Process -FilePath "cloudflared" `
    -ArgumentList "tunnel", "--url", "http://localhost:$FrontendPort" `
    -RedirectStandardError $FrontendLog `
    -PassThru -WindowStyle Hidden

Write-Info "Attente de l'URL du tunnel Frontend..."
$FrontendTunnelUrl = Get-TunnelUrl -LogFile $FrontendLog -TimeoutSeconds 30
if (!$FrontendTunnelUrl) {
    Write-Error "Impossible d'obtenir l'URL du tunnel Frontend"
    Write-Host "Verifiez le log: $FrontendLog"
    exit 1
}
Write-Success "Frontend Tunnel: $FrontendTunnelUrl"

# Lancer le tunnel Backend
Write-Info "Lancement du tunnel Backend (port $BackendPort)..."
$backendProcess = Start-Process -FilePath "cloudflared" `
    -ArgumentList "tunnel", "--url", "http://localhost:$BackendPort" `
    -RedirectStandardError $BackendLog `
    -PassThru -WindowStyle Hidden

Write-Info "Attente de l'URL du tunnel Backend..."
$BackendTunnelUrl = Get-TunnelUrl -LogFile $BackendLog -TimeoutSeconds 30
if (!$BackendTunnelUrl) {
    Write-Error "Impossible d'obtenir l'URL du tunnel Backend"
    Write-Host "Verifiez le log: $BackendLog"
    exit 1
}
Write-Success "Backend Tunnel: $BackendTunnelUrl"

# Deployer les Workers (si pas skipped)
if (!$SkipDeploy) {
    Write-Info "Deploiement des Workers Cloudflare..."

    # Deployer le Worker Backend
    Write-Info "Deploiement du Worker Backend..."
    Push-Location (Join-Path $ScriptDir "backend-proxy")
    try {
        # Definir le secret TUNNEL_URL (echo envoie au pipeline, Write-Host non!)
        Write-Host $BackendTunnelUrl
        echo $BackendTunnelUrl | wrangler secret put TUNNEL_URL
        # Deployer
        wrangler deploy
        Write-Success "Worker Backend deploye"
    }
    catch {
        Write-Warning "Erreur lors du deploiement Backend: $_"
    }
    Pop-Location

    # Deployer le Worker Frontend
    Write-Info "Deploiement du Worker Frontend..."
    Push-Location (Join-Path $ScriptDir "frontend-proxy")
    try {
        # Definir le secret TUNNEL_URL (echo envoie au pipeline, Write-Host non!)
        Write-Host $FrontendTunnelUrl
        echo $FrontendTunnelUrl | wrangler secret put TUNNEL_URL
        # Deployer
        wrangler deploy
        Write-Success "Worker Frontend deploye"
    }
    catch {
        Write-Warning "Erreur lors du deploiement Frontend: $_"
    }
    Pop-Location
}

# Afficher le resume
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "                    TUNNELS GAM ACTIFS                         " -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "  Tunnels Ephemeres (directs):" -ForegroundColor Yellow
Write-Host "    Frontend: $FrontendTunnelUrl" -ForegroundColor White
Write-Host "    Backend:  $BackendTunnelUrl" -ForegroundColor White
Write-Host ""
Write-Host "  Workers Cloudflare (stables):" -ForegroundColor Yellow
Write-Host "    Frontend: https://gam-tunnel-front.geniesafriquemedia.workers.dev" -ForegroundColor Cyan
Write-Host "    Backend:  https://gam-tunnel-back.geniesafriquemedia.workers.dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "  Appuyez sur Ctrl+C pour arreter les tunnels" -ForegroundColor Gray
Write-Host ""

# Sauvegarder les URLs dans un fichier pour reference
$urlsFile = Join-Path $ScriptDir "current-urls.txt"
@"
# GAM Tunnel URLs - $(Get-Date)
FRONTEND_TUNNEL=$FrontendTunnelUrl
BACKEND_TUNNEL=$BackendTunnelUrl
FRONTEND_WORKER=https://gam-tunnel-front.geniesafriquemedia.workers.dev
BACKEND_WORKER=https://gam-tunnel-back.geniesafriquemedia.workers.dev
"@ | Set-Content $urlsFile

# Attendre que l'utilisateur arrete le script
try {
    while ($true) {
        # Verifier que les processus sont toujours en vie
        if ($frontendProcess.HasExited) {
            Write-Warning "Le tunnel Frontend s'est arrete"
        }
        if ($backendProcess.HasExited) {
            Write-Warning "Le tunnel Backend s'est arrete"
        }
        Start-Sleep -Seconds 5
    }
}
finally {
    Write-Info "Arret des tunnels..."
    $frontendProcess | Stop-Process -Force -ErrorAction SilentlyContinue
    $backendProcess | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Success "Tunnels arretes"
}