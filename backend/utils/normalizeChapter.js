function normalizeChapter(chText) {
    if (!chText) return null;

    // Remove "Chapter" and trim
    chText = chText.replace(/chapter/i, "").trim();

    // Case 1: Decimal chapter written like "262 - 88"
    if (/^\d+\s*-\s*\d+$/.test(chText)) {
        const parts = chText.split("-").map(p => p.trim());
        return parseFloat(`${parts[0]}.${parts[1]}`); // 262.88
    }

    // Case 2: Normal chapter number
    const match = chText.match(/(\d+(\.\d+)?)/);
    if (!match) return null;

    const num = parseFloat(match[1]);
    if (num > 2000) return null; // sanity check
    return num;
}


module.exports = normalizeChapter