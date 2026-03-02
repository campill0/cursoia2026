# Genera un ZIP portable del curso listo para compartir
# Uso:  .\package.ps1

$ErrorActionPreference = "Stop"

$ProjectDir = $PSScriptRoot
$DistDir    = Join-Path $ProjectDir "dist"
$ZipName    = "Curso_IA_2026.zip"
$ZipPath    = Join-Path $ProjectDir $ZipName

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  EMPAQUETAR - Curso IA 2026 (ZIP)"        -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Build de produccion
Write-Host "[1/3] Ejecutando build de produccion ..." -ForegroundColor Yellow
Push-Location $ProjectDir
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  X Error en el build" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host "  OK - Build completado" -ForegroundColor Green

# 2. Eliminar ZIP anterior si existe
if (Test-Path $ZipPath) {
    Remove-Item $ZipPath -Force
    Write-Host "  -> ZIP anterior eliminado" -ForegroundColor DarkGray
}

# 3. Crear ZIP
Write-Host "[2/3] Creando $ZipName ..." -ForegroundColor Yellow
Compress-Archive -Path (Join-Path $DistDir "*") -DestinationPath $ZipPath -Force
Write-Host "  OK - ZIP creado" -ForegroundColor Green

# 4. Resumen
$zipSize = [math]::Round((Get-Item $ZipPath).Length / 1MB, 2)

Write-Host ""
Write-Host "[3/3] Listo!" -ForegroundColor Green
Write-Host "  Archivo: $ZipPath" -ForegroundColor DarkGray
Write-Host "  Tamano:  $zipSize MB" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  El alumno solo tiene que:" -ForegroundColor White
Write-Host "    1. Descomprimir el ZIP" -ForegroundColor White
Write-Host "    2. Doble clic en ABRIR_CURSO.bat" -ForegroundColor White
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
