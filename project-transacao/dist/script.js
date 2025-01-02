import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!data)
        return;
    const transacoes = data.map(normalizarTransacao);
    transacoes.forEach((item) => {
        console.log(item.data.getHours);
    });
}
handleData();
//# sourceMappingURL=script.js.map