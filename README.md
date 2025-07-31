# uferdyBot

Bot de Discord para Albion Online que proporciona información sobre jugadores, guilds y kills.

## Configuración

1. Instala las dependencias:
```bash
npm install
```

2. Crea un archivo `.env` basado en `.env.example` y completa los valores:
```
DISCORD_TOKEN=tu_token_de_discord_aqui
CLIENT_ID=tu_client_id_aqui
GUILD_ID=tu_guild_id_aqui
```

3. Despliega los comandos:
```bash
node deploy-commands.js
```

4. Inicia el bot:
```bash
npm start
```

## Comandos

### `/albion player <nombre>`
Busca información de un jugador específico.

### `/albion guild <nombre>`
Busca información de una guild específica.

### `/albion kills <nombre> [limite]`
Muestra las últimas kills de un jugador (máximo 10).

## Desarrollo

Para ejecutar en modo desarrollo:
```bash
npm run dev
```

## Características

- Búsqueda de jugadores y guilds
- Información detallada con embeds
- Historial de kills recientes
- Manejo de errores
- API oficial de Albion Online