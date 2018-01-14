const symbols = ["❄", "❅", "❆", "❉", "✴", "✼", "❃"];

export function generateCards(size) {
    const cards = [];
    const total = size.width * size.height / 2;
    for (let i = 0; i < total; i++) {
        const id = Math.floor((Math.random() * symbols.length));
        cards.push(symbols[id], symbols[id]);
    }
    cards.sort((a, b) => (Math.random() - 0.5));
    return cards;
}
