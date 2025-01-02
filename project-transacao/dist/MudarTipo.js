export default function MudarTipo(moeda) {
    const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
    return isNaN(numero) ? null : numero;
}
//# sourceMappingURL=MudarTipo.js.map