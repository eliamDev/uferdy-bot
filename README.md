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
Busca información detallada de un jugador específico.
- **Parámetros:** `nombre` - Nombre del jugador a buscar
- **Información mostrada:** Nivel, fama total, guild, alliance, kills, deaths

### `/albion guild <nombre>`
Busca información detallada de una guild específica.
- **Parámetros:** `nombre` - Nombre de la guild a buscar
- **Información mostrada:** Miembros, alliance, fama total, kills, deaths

### `/albion kills <nombre> [limite]`
Muestra las últimas kills de un jugador.
- **Parámetros:** 
  - `nombre` - Nombre del jugador
  - `limite` - Número de kills a mostrar (opcional, máximo 10, por defecto 5)
- **Información mostrada:** Víctima, arma usada, IP, ubicación, fecha

### `/albion search <query>`
Busca objetos en Albion Online usando la API oficial.
- **Parámetros:** `query` - Nombre o parte del nombre del objeto a buscar
- **Información mostrada:** Lista de objetos coincidentes con nombres localizados

## Desarrollo

Para ejecutar en modo desarrollo:
```bash
npm run dev
```

## Características

- 🔍 **Búsqueda de jugadores y guilds** - Información completa de estadísticas
- 📊 **Embeds informativos** - Presentación visual atractiva de los datos
- ⚔️ **Historial de kills** - Últimas PvP kills con detalles completos
- 🛡️ **Búsqueda de objetos** - Encuentra cualquier objeto del juego con nombres localizados
- 🌐 **API oficial de Albion Online** - Datos actualizados y precisos
- ❌ **Manejo robusto de errores** - Respuestas informativas cuando algo falla
- 🔒 **Canales autorizados** - Control de acceso por servidor
- 🚀 **Despliegue en Railway** - Alta disponibilidad y rendimiento
- 📝 **Logging completo** - Seguimiento de uso y errores para mejoras continuas

## Documentación Legal

- 📋 [**Términos de Servicio**](https://tu-usuario.github.io/botDiscord/terms) - Condiciones de uso del bot
- 🔐 [**Política de Privacidad**](https://tu-usuario.github.io/botDiscord/privacy) - Cómo manejamos tus datos

> **Nota:** Reemplaza `tu-usuario` en los enlaces con tu nombre de usuario de GitHub una vez que hayas habilitado GitHub Pages.