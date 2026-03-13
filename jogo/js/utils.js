export function embaralhar(array) {
    for (let x = array.length - 1; x > 0; x--) {
        let y = Math.floor(Math.random() * (1 + x));
        /* Só funciona no javascript: */
        [array[x], array[y]] = [array[y], array[x]];
    }
    return array;
}