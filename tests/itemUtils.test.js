const {
    translateItemName,
    getItemDisplayName,
    parseTierFromInput,
    levenshteinDistance
} = require('../utils/itemUtils');

describe('parseTierFromInput', () => {
    test('should parse tier from input with enchantment', () => {
        expect(parseTierFromInput('infortunio 4.2')).toBe('T4.2');
        expect(parseTierFromInput('capa 8.1')).toBe('T8.1');
    });

    test('should parse tier from input with T prefix', () => {
        expect(parseTierFromInput('capa t3')).toBe('T3');
        expect(parseTierFromInput('bolsa T5')).toBe('T5');
    });

    test('should parse tier from input with tier word', () => {
        expect(parseTierFromInput('espada tier 6')).toBe('T6');
        expect(parseTierFromInput('arco tier7')).toBe('T7');
    });

    test('should parse enchantments with T prefix', () => {
        expect(parseTierFromInput('bolsa t4.3')).toBe('T4.3');
        expect(parseTierFromInput('T6.1 capa')).toBe('T6.1');
    });

    test('should parse tier names in Spanish', () => {
        expect(parseTierFromInput('hueso tallado del maestro')).toBe('T7');
        expect(parseTierFromInput('capa del experto')).toBe('T6');
        expect(parseTierFromInput('bolsa del iniciado')).toBe('T4');
        expect(parseTierFromInput('item del gran maestro')).toBe('T8');
    });

    test('should return null for input without tier', () => {
        expect(parseTierFromInput('infortunio')).toBeNull();
        expect(parseTierFromInput('capa')).toBeNull();
    });
});

describe('levenshteinDistance', () => {
    test('should calculate correct distance for identical strings', () => {
        expect(levenshteinDistance('test', 'test')).toBe(0);
    });

    test('should calculate correct distance for different strings', () => {
        expect(levenshteinDistance('test', 'tast')).toBe(1);
        expect(levenshteinDistance('infortunio', 'infotunio')).toBe(1); // 'r' -> '' (1 deletion)
    });

    test('should calculate correct distance for completely different strings', () => {
        expect(levenshteinDistance('abc', 'xyz')).toBe(3);
    });
});

describe('translateItemName', () => {
    test('should translate exact matches', () => {
        expect(translateItemName('infortunio')).toBe('T4_2H_CURSEDSTAFF');
        expect(translateItemName('capa')).toBe('T4_CAPE');
        expect(translateItemName('bolsa')).toBe('T4_BAG');
    });

    test('should translate with tier parsing', () => {
        expect(translateItemName('infortunio 4.2')).toBe('T4_2H_CURSEDSTAFF'); // 4.2 -> T4 (base tier)
        expect(translateItemName('infortunio 8.1')).toBe('T8_2H_CURSEDSTAFF'); // 8.1 -> T8 (base tier)
        expect(translateItemName('capa t3')).toBe('T3_CAPE');
        expect(translateItemName('bolsa T6')).toBe('T6_BAG');
    });

    test('should handle fuzzy matching', () => {
        expect(translateItemName('infotunio')).toBe('T4_2H_CURSEDSTAFF'); // typo
        expect(translateItemName('infotunio 5.2')).toBe('T5_2H_CURSEDSTAFF'); // typo with tier
    });

    test('should handle partial matches', () => {
        expect(translateItemName('baston infortunio')).toBe('T4_2H_CURSEDSTAFF');
        expect(translateItemName('bastón maldito')).toBe('T4_2H_CURSEDSTAFF');
    });

    test('should translate food items', () => {
        expect(translateItemName('guiso de ternera')).toBe('T8_MEAL_SOUP');
        expect(translateItemName('guiso ternera 8.2')).toBe('T8_MEAL_SOUP');
        expect(translateItemName('sopa')).toBe('T4_MEAL_SOUP');
    });

    test('should return original if no translation found', () => {
        expect(translateItemName('T4_UNKNOWN_ITEM')).toBe('T4_UNKNOWN_ITEM');
        expect(translateItemName('itemdesconocido')).toBe('itemdesconocido');
    });

    test('should handle case insensitive', () => {
        expect(translateItemName('INFORTUNIO')).toBe('T4_2H_CURSEDSTAFF');
        expect(translateItemName('InFoRtUnIo')).toBe('T4_2H_CURSEDSTAFF');
    });

    test('should handle enchantments correctly (extract base tier only)', () => {
        expect(translateItemName('infortunio 4.2')).toBe('T4_2H_CURSEDSTAFF'); // 4.2 -> T4
        expect(translateItemName('capa 6.3')).toBe('T6_CAPE'); // 6.3 -> T6
        expect(translateItemName('bolsa 8.1')).toBe('T8_BAG'); // 8.1 -> T8
    });

    test('should handle tier names in Spanish', () => {
        expect(translateItemName('hueso tallado del maestro')).toBe('T7_ARTEFACT_2H_SCYTHE_HELL');
        expect(translateItemName('hueso tallado tier 6')).toBe('T6_ARTEFACT_2H_SCYTHE_HELL');
        expect(translateItemName('capa del experto')).toBe('T6_CAPE');
    });
});

describe('getItemDisplayName', () => {
    test('should return proper display names for weapons', () => {
        expect(getItemDisplayName('T4_2H_CURSEDSTAFF')).toBe('Bastón de Infortunio del Iniciado');
        expect(getItemDisplayName('T5_2H_CURSEDSTAFF')).toBe('Bastón de Infortunio del Adepto');
        expect(getItemDisplayName('T8_2H_CURSEDSTAFF')).toBe('Bastón de Infortunio del Gran Maestro');
    });

    test('should return proper display names for different tiers', () => {
        expect(getItemDisplayName('T3_CAPE')).toBe('Capa del Aprendiz');
        expect(getItemDisplayName('T4_BAG')).toBe('Bolsa del Iniciado');
        expect(getItemDisplayName('T6_BAG')).toBe('Bolsa del Experto');
    });

    test('should return proper display names for food', () => {
        expect(getItemDisplayName('T8_MEAL_SOUP')).toBe('Sopa del Gran Maestro');
        expect(getItemDisplayName('T4_MEAL_SOUP')).toBe('Sopa del Iniciado');
    });

    test('should return original code for unknown items', () => {
        expect(getItemDisplayName('T4_UNKNOWN_ITEM')).toBe('UNKNOWN_ITEM del Iniciado'); // La función sí procesa T4_
        expect(getItemDisplayName('INVALID_CODE')).toBe('INVALID_CODE'); // Sin formato T#_ devuelve original
    });

    test('should handle all tier names', () => {
        expect(getItemDisplayName('T1_BAG')).toBe('Bolsa del Principiante');
        expect(getItemDisplayName('T2_BAG')).toBe('Bolsa del Novato');
        expect(getItemDisplayName('T3_BAG')).toBe('Bolsa del Aprendiz');
        expect(getItemDisplayName('T4_BAG')).toBe('Bolsa del Iniciado');
        expect(getItemDisplayName('T5_BAG')).toBe('Bolsa del Adepto');
        expect(getItemDisplayName('T6_BAG')).toBe('Bolsa del Experto');
        expect(getItemDisplayName('T7_BAG')).toBe('Bolsa del Maestro');
        expect(getItemDisplayName('T8_BAG')).toBe('Bolsa del Gran Maestro');
    });
});