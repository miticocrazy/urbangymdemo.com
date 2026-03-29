# Urban Gym Miranda de Ebro

Sitio estático listo para publicarse en GitHub Pages y enseñarse como web final de Urban Gym.

## Abrir la demo

1. Abre `index.html` en el navegador.
2. Si prefieres servirla localmente, ejecuta:

```bash
cd /Users/miticocrazy/Downloads/urbangym-propuesta-premium
python3 -m http.server 4173
```

Luego entra en `http://localhost:4173`.

## Qué incluye

- Hero orientado a cliente final.
- Estética urbana y callejera.
- Datos reales del negocio: direcciones, WhatsApp e Instagram.
- Horarios reales de clases.
- Bloque de instalaciones con fotos reales.
- Sección de suplementación y ofertas.
- Tarifas visibles.
- Newsletter, mapa y contacto.

## GitHub Pages

He dejado el proyecto preparado para GitHub Pages siguiendo la guía oficial:

1. Usa el repositorio `urbangymdemo.com`.
2. Sube el contenido de esta carpeta a ese repositorio.
3. En GitHub entra en `Settings > Pages`.
4. En `Build and deployment`, elige `Deploy from a branch`.
5. Selecciona la rama `main` y la carpeta `/root`.
6. Espera unos minutos a que GitHub publique el sitio.

La URL de publicación por defecto será:

`https://miticocrazy.github.io/urbangymdemo.com/`

Si más adelante quieres usar un dominio propio, podrás configurarlo desde GitHub Pages.

Comandos útiles:

```bash
cd /Users/miticocrazy/Downloads/urbangym-propuesta-premium
git branch -M main
git remote add origin https://github.com/miticocrazy/urbangymdemo.com.git
git push -u origin main
```

## Nota

El archivo `.nojekyll` está incluido para que GitHub Pages sirva esta web estática directamente sin intentar procesarla con Jekyll.

## Material real

Cuando tengas fotos o vídeos, colócalos dentro de `media/` siguiendo esta estructura:

- `media/video/`
- `media/gallery/`
- `media/supplements/`
- `media/hero/`

Puedes mantener los nombres placeholder o poner los tuyos y luego yo te actualizo las referencias para dejarlo fino.
