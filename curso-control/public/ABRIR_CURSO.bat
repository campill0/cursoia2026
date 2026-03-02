@echo off
title Curso C.O.N.T.R.O.L. - IA 2026
echo.
echo  ==========================================
echo   Curso de Introduccion a la IA 2026
echo   Framework C.O.N.T.R.O.L.
echo  ==========================================
echo.
echo  Abriendo el navegador...
echo  (No cierres esta ventana mientras uses el curso)
echo.
echo  Para cerrar, pulsa Ctrl+C o cierra esta ventana.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$port = 8080; " ^
  "$used = $true; " ^
  "while ($used) { " ^
  "  try { " ^
  "    $l = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port); " ^
  "    $l.Start(); $l.Stop(); $used = $false " ^
  "  } catch { $port++ } " ^
  "}; " ^
  "$root = '%~dp0'.TrimEnd('\'); " ^
  "$http = [System.Net.HttpListener]::new(); " ^
  "$prefix = \"http://localhost:$port/\"; " ^
  "$http.Prefixes.Add($prefix); " ^
  "$http.Start(); " ^
  "Write-Host \"  Servidor activo en $prefix\" -F Green; " ^
  "Write-Host \"  Carpeta: $root\" -F DarkGray; " ^
  "Start-Process $prefix; " ^
  "$mime = @{ '.html'='text/html'; '.js'='application/javascript'; '.css'='text/css'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.webp'='image/webp'; '.svg'='image/svg+xml'; '.json'='application/json'; '.ico'='image/x-icon'; '.woff'='font/woff'; '.woff2'='font/woff2'; '.ttf'='font/ttf'; '.md'='text/plain'; '.map'='application/json' }; " ^
  "while ($http.IsListening) { " ^
  "  $ctx = $http.GetContext(); " ^
  "  $url = $ctx.Request.Url.LocalPath; " ^
  "  if ($url -eq '/') { $url = '/index.html' }; " ^
  "  $file = Join-Path $root ($url.TrimStart('/').Replace('/', '\')); " ^
  "  if (Test-Path $file -PathType Leaf) { " ^
  "    $ext = [IO.Path]::GetExtension($file).ToLower(); " ^
  "    $ct = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }; " ^
  "    $ctx.Response.ContentType = $ct; " ^
  "    $ctx.Response.StatusCode = 200; " ^
  "    $bytes = [IO.File]::ReadAllBytes($file); " ^
  "    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length); " ^
  "  } else { " ^
  "    $ctx.Response.StatusCode = 404; " ^
  "    $bytes = [Text.Encoding]::UTF8.GetBytes('Not found'); " ^
  "    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length); " ^
  "  }; " ^
  "  $ctx.Response.Close(); " ^
  "}"
