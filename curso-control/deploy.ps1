# Deploy curso-control a carpeta de red (Intranet)
# Uso:  .\deploy.ps1
# Destino: \\172.16.0.41\intranet\curso_ia_2026

$ErrorActionPreference = "Stop"

$ProjectDir  = $PSScriptRoot
$DestDir     = "\\172.16.0.41\intranet\curso_ia_2026"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  DEPLOY - Curso IA 2026 (Intranet)"       -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar acceso a la carpeta de red
Write-Host "[1/4] Verificando acceso a $DestDir ..." -ForegroundColor Yellow
if (-not (Test-Path $DestDir)) {
    Write-Host "  X No se puede acceder a $DestDir" -ForegroundColor Red
    Write-Host "  Verifica la conexion de red y permisos." -ForegroundColor Red
    exit 1
}
Write-Host "  OK - Acceso verificado" -ForegroundColor Green

# 2. Build de produccion
Write-Host "[2/4] Ejecutando build de produccion ..." -ForegroundColor Yellow
Push-Location $ProjectDir
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  X Error en el build" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host "  OK - Build completado" -ForegroundColor Green

# 3. Verificar que existe la carpeta dist
$DistDir = Join-Path $ProjectDir "dist"
if (-not (Test-Path $DistDir)) {
    Write-Host "  X No se encuentra la carpeta dist/" -ForegroundColor Red
    exit 1
}

# 4. Copiar al destino
Write-Host "[3/4] Copiando archivos a $DestDir ..." -ForegroundColor Yellow

# Borrar contenido antiguo
Get-ChildItem -Path $DestDir -Recurse -Force | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Copiar nuevos archivos (incluye web.config desde public/)
Copy-Item -Path (Join-Path $DistDir "*") -Destination $DestDir -Recurse -Force

Write-Host "  OK - Archivos copiados" -ForegroundColor Green

# 5. Resumen
$fileCount = (Get-ChildItem -Path $DestDir -Recurse -File).Count
$totalSize = [math]::Round(((Get-ChildItem -Path $DestDir -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB), 2)

Write-Host ""
Write-Host "[4/4] Deploy completado!" -ForegroundColor Green
Write-Host "  Archivos: $fileCount" -ForegroundColor DarkGray
Write-Host "  Tamano:   $totalSize MB" -ForegroundColor DarkGray
Write-Host "  Destino:  $DestDir" -ForegroundColor DarkGray
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
