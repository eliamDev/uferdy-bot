// Diccionario de traducción de nombres a códigos
const ITEM_TRANSLATIONS = {
    // Bastones Malditos
    'baston infortunio': 'T4_2H_CURSEDSTAFF',
    'baston maldito': 'T4_2H_CURSEDSTAFF',
    'bastón infortunio': 'T4_2H_CURSEDSTAFF',
    'bastón maldito': 'T4_2H_CURSEDSTAFF',
    'infortunio': 'T4_2H_CURSEDSTAFF',
    
    // Bastones Arcanos
    'baston arcano': 'T4_2H_ARCANESTAFF',
    'bastón arcano': 'T4_2H_ARCANESTAFF',
    'arcano': 'T4_2H_ARCANESTAFF',
    
    // Bastones de Fuego
    'baston fuego': 'T4_2H_FIRESTAFF',
    'bastón fuego': 'T4_2H_FIRESTAFF',
    'fuego': 'T4_2H_FIRESTAFF',
    
    // Bastones de Hielo
    'baston hielo': 'T4_2H_FROSTSTAFF',
    'bastón hielo': 'T4_2H_FROSTSTAFF',
    'hielo': 'T4_2H_FROSTSTAFF',
    'escarcha': 'T4_2H_FROSTSTAFF',
    
    // Bastones Sagrados
    'baston sagrado': 'T4_2H_HOLYSTAFF',
    'bastón sagrado': 'T4_2H_HOLYSTAFF',
    'sagrado': 'T4_2H_HOLYSTAFF',
    'divino': 'T4_2H_HOLYSTAFF',
    
    // Bastones de Naturaleza
    'baston naturaleza': 'T4_2H_NATURESTAFF',
    'bastón naturaleza': 'T4_2H_NATURESTAFF',
    'naturaleza': 'T4_2H_NATURESTAFF',
    
    // Espadas
    'espada': 'T4_MAIN_SWORD',
    'sword': 'T4_MAIN_SWORD',
    'espada ancha': 'T4_2H_CLAYMORE',
    'claymore': 'T4_2H_CLAYMORE',
    
    // Hachas
    'hacha': 'T4_MAIN_AXE',
    'axe': 'T4_MAIN_AXE',
    'hacha batalla': 'T4_2H_AXE',
    'hacha de batalla': 'T4_2H_AXE',
    'gran hacha': 'T4_2H_AXE',
    
    // Mazos
    'mazo': 'T4_MAIN_MACE',
    'mace': 'T4_MAIN_MACE',
    'martillo': 'T4_2H_HAMMER',
    'hammer': 'T4_2H_HAMMER',
    'martillo guerra': 'T4_2H_HAMMER',
    
    // Dagas
    'daga': 'T4_MAIN_DAGGER',
    'dagger': 'T4_MAIN_DAGGER',
    'cuchilla': 'T4_MAIN_DAGGER',
    
    // Lanzas
    'lanza': 'T4_2H_SPEAR',
    'spear': 'T4_2H_SPEAR',
    'pica': 'T4_2H_SPEAR',
    
    // Arcos
    'arco': 'T4_2H_BOW',
    'bow': 'T4_2H_BOW',
    'arco guerra': 'T4_2H_WARBOW',
    'arco de guerra': 'T4_2H_WARBOW',
    'ballesta': 'T4_2H_CROSSBOW',
    'crossbow': 'T4_2H_CROSSBOW',
    
    // Bolsas
    'bolsa': 'T4_BAG',
    'bag': 'T4_BAG',
    'mochila': 'T4_BAG',
    
    // Armaduras de Tela
    'capucha tela': 'T4_HEAD_CLOTH_SET1',
    'casco tela': 'T4_HEAD_CLOTH_SET1',
    'pechera tela': 'T4_ARMOR_CLOTH_SET1',
    'armadura tela': 'T4_ARMOR_CLOTH_SET1',
    'zapatos tela': 'T4_SHOES_CLOTH_SET1',
    'tunica': 'T4_ARMOR_CLOTH_SET1',
    'túnica': 'T4_ARMOR_CLOTH_SET1',
    
    // Armaduras de Cuero
    'capucha cuero': 'T4_HEAD_LEATHER_SET1',
    'casco cuero': 'T4_HEAD_LEATHER_SET1',
    'pechera cuero': 'T4_ARMOR_LEATHER_SET1',
    'armadura cuero': 'T4_ARMOR_LEATHER_SET1',
    'botas cuero': 'T4_SHOES_LEATHER_SET1',
    'chaqueta cuero': 'T4_ARMOR_LEATHER_SET1',
    
    // Armaduras de Placas
    'casco placas': 'T4_HEAD_PLATE_SET1',
    'casco placa': 'T4_HEAD_PLATE_SET1',
    'pechera placas': 'T4_ARMOR_PLATE_SET1',
    'pechera placa': 'T4_ARMOR_PLATE_SET1',
    'armadura placas': 'T4_ARMOR_PLATE_SET1',
    'botas placas': 'T4_SHOES_PLATE_SET1',
    'botas placa': 'T4_SHOES_PLATE_SET1',
    'armadura completa': 'T4_ARMOR_PLATE_SET1',
    
    // Recursos
    'fibra': 'T4_FIBER',
    'madera': 'T4_WOOD',
    'tronco': 'T4_WOOD',
    'piedra': 'T4_ROCK',
    'roca': 'T4_ROCK',
    'mineral': 'T4_ORE',
    'mena': 'T4_ORE',
    'cuero': 'T4_HIDE',
    'piel': 'T4_HIDE',
    
    // Materiales Refinados
    'tela': 'T4_CLOTH',
    'tabla': 'T4_PLANKS',
    'tablas': 'T4_PLANKS',
    'bloque piedra': 'T4_STONEBLOCK',
    'bloque': 'T4_STONEBLOCK',
    'lingote': 'T4_METALBAR',
    'barra metal': 'T4_METALBAR',
    'cuero curtido': 'T4_LEATHER',
    'hueso tallado': 'T4_ARTEFACT_2H_SCYTHE_HELL',
    'hueso': 'T4_ARTEFACT_2H_SCYTHE_HELL',
    
    // Comidas
    'guiso ternera': 'T8_MEAL_SOUP',
    'guiso de ternera': 'T8_MEAL_SOUP',
    'sopa': 'T4_MEAL_SOUP',
    'estofado': 'T4_MEAL_STEW',
    'pan': 'T4_MEAL_BREAD',
    'pastel': 'T4_MEAL_PIE',
    'ensalada': 'T4_MEAL_SALAD',
    'omelette': 'T4_MEAL_OMELETTE',
    'tortilla': 'T4_MEAL_OMELETTE',
    'pescado asado': 'T4_MEAL_FISH',
    'pollo asado': 'T4_MEAL_ROAST',
    'asado': 'T4_MEAL_ROAST',
    
    // Pociones
    'pocion vida': 'T4_POTION_HEAL',
    'poción vida': 'T4_POTION_HEAL',
    'pocion salud': 'T4_POTION_HEAL',
    'pocion energia': 'T4_POTION_ENERGY',
    'poción energía': 'T4_POTION_ENERGY',
    'pocion mana': 'T4_POTION_ENERGY',
    'pocion gigante': 'T4_POTION_STONESKIN',
    'poción gigante': 'T4_POTION_STONESKIN',
    
    // Capas
    'capa': 'T4_CAPE',
    'cape': 'T4_CAPE',
    
    // Monturas
    'caballo': 'T3_MOUNT_HORSE',
    'horse': 'T3_MOUNT_HORSE',
    'buey': 'T4_MOUNT_OX',
    'ox': 'T4_MOUNT_OX',
    'toro': 'T4_MOUNT_OX',
    'armadillo': 'T5_MOUNT_ARMORED_HORSE',
    'caballo blindado': 'T5_MOUNT_ARMORED_HORSE',
    
    // Herramientas
    'pico': 'T4_TOOL_PICKAXE',
    'pickaxe': 'T4_TOOL_PICKAXE',
    'hacha talar': 'T4_TOOL_AXE',
    'hoz': 'T4_TOOL_SICKLE',
    'sickle': 'T4_TOOL_SICKLE',
    'cuchillo desollar': 'T4_TOOL_KNIFE',
    'cuchillo': 'T4_TOOL_KNIFE',
    'martillo herrero': 'T4_TOOL_HAMMER',
    
    // Accesorios
    'anillo': 'T4_RING',
    'ring': 'T4_RING',
    'collar': 'T4_NECKLACE',
    'necklace': 'T4_NECKLACE',
    'amuleto': 'T4_NECKLACE',
    'brazalete': 'T4_BRACELET',
    'bracelet': 'T4_BRACELET',
    'pulsera': 'T4_BRACELET'
};

// Función para parsear tier del input del usuario
function parseTierFromInput(itemName) {
    // Primero buscar números con tier/t prefix
    const tierMatch = itemName.match(/(?:t|tier\s*)?(\d)(?:\.(\d))?/i);
    if (tierMatch) {
        const tier = tierMatch[1];
        const enchantment = tierMatch[2];
        if (enchantment) {
            return `T${tier}.${enchantment}`;
        }
        return `T${tier}`;
    }
    
    // Buscar nombres de tier en español
    const tierNames = {
        'principiante': 'T1',
        'novato': 'T2',
        'aprendiz': 'T3',
        'iniciado': 'T4',
        'adepto': 'T5',
        'experto': 'T6',
        'maestro': 'T7',
        'gran maestro': 'T8'
    };
    
    const lowerName = itemName.toLowerCase();
    for (const [tierName, tierCode] of Object.entries(tierNames)) {
        if (lowerName.includes(tierName)) {
            return tierCode;
        }
    }
    
    return null;
}

// Función para calcular distancia de Levenshtein (búsqueda fuzzy)
function levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + substitutionCost
            );
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Función para traducir nombre a código
function translateItemName(itemName) {
    const normalizedName = itemName.toLowerCase().trim();
    
    // Buscar coincidencia exacta
    if (ITEM_TRANSLATIONS[normalizedName]) {
        return ITEM_TRANSLATIONS[normalizedName];
    }
    
    // Extraer tier si está presente
    const extractedTier = parseTierFromInput(normalizedName);
    const nameWithoutTier = normalizedName.replace(/(?:t|tier\s*)?(\d)(?:\.(\d))?/i, '').trim();
    
    // Para items con enchantment (ej: "infortunio 4.2"), solo usar el tier base (T4) para el código del item
    let baseTier = null;
    if (extractedTier) {
        baseTier = extractedTier.split('.')[0]; // "T4.2" -> "T4"
    }
    
    // Buscar coincidencia exacta sin tier
    if (ITEM_TRANSLATIONS[nameWithoutTier]) {
        const baseCode = ITEM_TRANSLATIONS[nameWithoutTier];
        if (baseTier) {
            return baseCode.replace(/T\d/, baseTier);
        }
        return baseCode;
    }
    
    // Buscar coincidencia parcial
    for (const [key, value] of Object.entries(ITEM_TRANSLATIONS)) {
        if (normalizedName.includes(key) || key.includes(normalizedName)) {
            if (baseTier) {
                return value.replace(/T\d/, baseTier);
            }
            return value;
        }
    }
    
    // Búsqueda fuzzy - encontrar la coincidencia más cercana
    let bestMatch = null;
    let bestDistance = Infinity;
    const maxDistance = 3; // Máximo 3 caracteres de diferencia
    
    for (const [key, value] of Object.entries(ITEM_TRANSLATIONS)) {
        const distance = levenshteinDistance(nameWithoutTier || normalizedName, key);
        if (distance < bestDistance && distance <= maxDistance) {
            bestDistance = distance;
            bestMatch = value;
        }
    }
    
    if (bestMatch && baseTier) {
        return bestMatch.replace(/T\d/, baseTier);
    } else if (bestMatch) {
        return bestMatch;
    }
    
    // Si no encuentra traducción, devolver el nombre original (puede ser código ya)
    return itemName;
}

// Función para obtener nombre para mostrar del item
function getItemDisplayName(itemCode) {
    const tierNames = {
        'T1': 'Principiante',
        'T2': 'Novato', 
        'T3': 'Aprendiz',
        'T4': 'Iniciado',
        'T5': 'Adepto',
        'T6': 'Experto',
        'T7': 'Maestro',
        'T8': 'Gran Maestro'
    };
    
    const baseNames = {
        // Bastones
        '2H_CURSEDSTAFF': 'Bastón de Infortunio',
        '2H_ARCANESTAFF': 'Bastón Arcano',
        '2H_FIRESTAFF': 'Bastón de Fuego',
        '2H_FROSTSTAFF': 'Bastón de Hielo',
        '2H_HOLYSTAFF': 'Bastón Sagrado',
        '2H_NATURESTAFF': 'Bastón de Naturaleza',
        
        // Armas Cuerpo a Cuerpo
        'MAIN_SWORD': 'Espada',
        '2H_CLAYMORE': 'Espada Ancha',
        'MAIN_AXE': 'Hacha',
        '2H_AXE': 'Hacha de Batalla',
        'MAIN_MACE': 'Mazo',
        '2H_HAMMER': 'Martillo de Guerra',
        'MAIN_DAGGER': 'Daga',
        '2H_SPEAR': 'Lanza',
        
        // Arcos
        '2H_BOW': 'Arco',
        '2H_WARBOW': 'Arco de Guerra',
        '2H_CROSSBOW': 'Ballesta',
        
        // Armaduras
        'HEAD_CLOTH_SET1': 'Capucha de Tela',
        'ARMOR_CLOTH_SET1': 'Túnica',
        'SHOES_CLOTH_SET1': 'Zapatos de Tela',
        'HEAD_LEATHER_SET1': 'Capucha de Cuero',
        'ARMOR_LEATHER_SET1': 'Chaqueta de Cuero',
        'SHOES_LEATHER_SET1': 'Botas de Cuero',
        'HEAD_PLATE_SET1': 'Casco de Placas',
        'ARMOR_PLATE_SET1': 'Armadura de Placas',
        'SHOES_PLATE_SET1': 'Botas de Placas',
        
        // Recursos y Materiales
        'FIBER': 'Fibra',
        'WOOD': 'Madera',
        'ROCK': 'Piedra',
        'ORE': 'Mineral',
        'HIDE': 'Cuero',
        'CLOTH': 'Tela',
        'PLANKS': 'Tablas',
        'STONEBLOCK': 'Bloque de Piedra',
        'METALBAR': 'Lingote',
        'LEATHER': 'Cuero Curtido',
        'ARTEFACT_2H_SCYTHE_HELL': 'Hueso Tallado',
        
        // Comidas
        'MEAL_SOUP': 'Sopa',
        'MEAL_STEW': 'Estofado',
        'MEAL_BREAD': 'Pan',
        'MEAL_PIE': 'Pastel',
        'MEAL_SALAD': 'Ensalada',
        'MEAL_OMELETTE': 'Tortilla',
        'MEAL_FISH': 'Pescado Asado',
        'MEAL_ROAST': 'Asado',
        
        // Pociones
        'POTION_HEAL': 'Poción de Vida',
        'POTION_ENERGY': 'Poción de Energía',
        'POTION_STONESKIN': 'Poción Gigante',
        
        // Otros
        'BAG': 'Bolsa',
        'CAPE': 'Capa',
        'MOUNT_HORSE': 'Caballo',
        'MOUNT_OX': 'Buey',
        'MOUNT_ARMORED_HORSE': 'Caballo Blindado',
        'TOOL_PICKAXE': 'Pico',
        'TOOL_AXE': 'Hacha de Talar',
        'TOOL_SICKLE': 'Hoz',
        'TOOL_KNIFE': 'Cuchillo de Desollar',
        'TOOL_HAMMER': 'Martillo de Herrero',
        'RING': 'Anillo',
        'NECKLACE': 'Collar',
        'BRACELET': 'Brazalete'
    };
    
    // Extraer tier y tipo del código
    const tierMatch = itemCode.match(/^(T\d+)_(.+)$/);
    if (tierMatch) {
        const tier = tierMatch[1];
        const itemType = tierMatch[2];
        
        const tierName = tierNames[tier] || tier;
        const baseName = baseNames[itemType] || itemType;
        
        return `${baseName} del ${tierName}`;
    }
    
    return itemCode;
}

// Agregar axios para las llamadas a la API
const axios = require('axios');

// Cache simple para evitar llamadas repetidas
const itemCodeCache = new Map();

// Función para probar si un código de item existe en la API
async function testItemExists(itemCode) {
    try {
        const url = `https://west.albion-online-data.com/api/v2/stats/prices/${itemCode}.json?locations=Caerleon`;
        const response = await axios.get(url);
        return response.data && response.data.length > 0;
    } catch (error) {
        return false;
    }
}

// Patrones de códigos de items comunes en Albion Online
const ITEM_PATTERNS = {
    // Bastones
    'infortunio': ['2H_CURSEDSTAFF', 'MAIN_CURSEDSTAFF'],
    'arcano': ['2H_ARCANESTAFF', 'MAIN_ARCANESTAFF'],
    'fuego': ['2H_FIRESTAFF', 'MAIN_FIRESTAFF'],
    'hielo': ['2H_FROSTSTAFF', 'MAIN_FROSTSTAFF'],
    'escarcha': ['2H_FROSTSTAFF', 'MAIN_FROSTSTAFF'],
    'sagrado': ['2H_HOLYSTAFF', 'MAIN_HOLYSTAFF'],
    'divino': ['2H_HOLYSTAFF', 'MAIN_HOLYSTAFF'],
    'naturaleza': ['2H_NATURESTAFF', 'MAIN_NATURESTAFF'],
    
    // Armas
    'espada': ['MAIN_SWORD', '2H_CLAYMORE', '2H_DUALSWORD'],
    'hacha': ['MAIN_AXE', '2H_AXE'],
    'mazo': ['MAIN_MACE'],
    'martillo': ['2H_HAMMER'],
    'daga': ['MAIN_DAGGER', '2H_DAGGERPAIR'],
    'lanza': ['2H_SPEAR', 'MAIN_SPEAR'],
    'arco': ['2H_BOW', '2H_WARBOW', '2H_LONGBOW'],
    'ballesta': ['2H_CROSSBOW', 'MAIN_1HCROSSBOW'],
    
    // Armaduras
    'casco': ['HEAD_CLOTH_SET1', 'HEAD_LEATHER_SET1', 'HEAD_PLATE_SET1'],
    'capucha': ['HEAD_CLOTH_SET1', 'HEAD_LEATHER_SET1'],
    'armadura': ['ARMOR_CLOTH_SET1', 'ARMOR_LEATHER_SET1', 'ARMOR_PLATE_SET1'],
    'pechera': ['ARMOR_CLOTH_SET1', 'ARMOR_LEATHER_SET1', 'ARMOR_PLATE_SET1'],
    'botas': ['SHOES_CLOTH_SET1', 'SHOES_LEATHER_SET1', 'SHOES_PLATE_SET1'],
    'zapatos': ['SHOES_CLOTH_SET1'],
    
    // Recursos
    'fibra': ['FIBER'],
    'madera': ['WOOD'],
    'tronco': ['WOOD'],
    'piedra': ['ROCK'],
    'roca': ['ROCK'],
    'mineral': ['ORE'],
    'mena': ['ORE'],
    'cuero': ['HIDE', 'LEATHER'],
    'piel': ['HIDE'],
    
    // Materiales Refinados
    'tela': ['CLOTH'],
    'tabla': ['PLANKS'],
    'tablas': ['PLANKS'],
    'bloque': ['STONEBLOCK'],
    'lingote': ['METALBAR'],
    'barra': ['METALBAR'],
    
    // Comidas
    'sopa': ['MEAL_SOUP'],
    'guiso': ['MEAL_SOUP', 'MEAL_STEW'],
    'ternera': ['MEAL_SOUP', 'MEAL_STEW', 'MEAL_MEAT'],
    'estofado': ['MEAL_STEW'],
    'pan': ['MEAL_BREAD'],
    'pastel': ['MEAL_PIE'],
    'ensalada': ['MEAL_SALAD'],
    'tortilla': ['MEAL_OMELETTE'],
    'omelette': ['MEAL_OMELETTE'],
    'pescado': ['MEAL_FISH'],
    'asado': ['MEAL_ROAST'],
    'pollo': ['MEAL_ROAST'],
    'carne': ['MEAL_MEAT', 'MEAL_ROAST', 'MEAL_STEW'],
    
    // Items especiales
    'bolsa': ['BAG'],
    'mochila': ['BAG'],
    'capa': ['CAPE'],
    'caballo': ['MOUNT_HORSE'],
    'buey': ['MOUNT_OX'],
    'toro': ['MOUNT_OX'],
    
    // Artefactos - patterns más comunes
    'hueso': ['ARTEFACT_2H_SCYTHE_HELL', 'ARTEFACT_MAIN_SCYTHE_HELL', 'ARTEFACT_OFF_SCYTHE_HELL'],
    'tallado': ['ARTEFACT_2H_SCYTHE_HELL', 'ARTEFACT_MAIN_SCYTHE_HELL'],
    
    // Pociones
    'pocion': ['POTION_HEAL', 'POTION_ENERGY', 'POTION_STONESKIN'],
    'poción': ['POTION_HEAL', 'POTION_ENERGY', 'POTION_STONESKIN']
};

// Función para buscar código de item dinámicamente
async function findItemCodeDynamic(itemName) {
    const cacheKey = itemName.toLowerCase().trim();
    
    // Verificar cache primero
    if (itemCodeCache.has(cacheKey)) {
        return itemCodeCache.get(cacheKey);
    }
    
    const normalizedName = cacheKey;
    const extractedTier = parseTierFromInput(normalizedName);
    const baseTier = extractedTier ? extractedTier.split('.')[0] : 'T4'; // Default T4
    const nameWithoutTier = normalizedName.replace(/(?:t|tier\s*)?(\d)(?:\.(\d))?/i, '').trim();
    const nameWithoutArticles = nameWithoutTier.replace(/\b(del|de|la|el)\b/g, '').trim();
    
    // Buscar en patrones conocidos
    for (const [keyword, patterns] of Object.entries(ITEM_PATTERNS)) {
        if (nameWithoutArticles.includes(keyword)) {
            for (const pattern of patterns) {
                const itemCode = `${baseTier}_${pattern}`;
                
                // Probar si el item existe en la API
                if (await testItemExists(itemCode)) {
                    itemCodeCache.set(cacheKey, itemCode);
                    return itemCode;
                }
            }
        }
    }
    
    // Si no encuentra nada, usar búsqueda fuzzy en keywords
    let bestMatch = null;
    let bestDistance = Infinity;
    
    for (const keyword of Object.keys(ITEM_PATTERNS)) {
        const distance = levenshteinDistance(nameWithoutArticles, keyword);
        if (distance < bestDistance && distance <= 2) {
            bestDistance = distance;
            bestMatch = keyword;
        }
    }
    
    if (bestMatch) {
        for (const pattern of ITEM_PATTERNS[bestMatch]) {
            const itemCode = `${baseTier}_${pattern}`;
            if (await testItemExists(itemCode)) {
                itemCodeCache.set(cacheKey, itemCode);
                return itemCode;
            }
        }
    }
    
    // Si no encuentra nada, devolver el input original
    itemCodeCache.set(cacheKey, itemName);
    return itemName;
}

// Nueva función de traducción que usa la API
async function translateItemNameDynamic(itemName) {
    return await findItemCodeDynamic(itemName);
}

module.exports = {
    translateItemName,
    translateItemNameDynamic,
    getItemDisplayName,
    parseTierFromInput,
    levenshteinDistance,
    findItemCodeDynamic,
    testItemExists,
    ITEM_TRANSLATIONS
};