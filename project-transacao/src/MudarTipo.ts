/**
 * Recebe string '1.299,50' e retorna number 1299.50
 * @param moeda
 * @returns number is null
 */
export default function MudarTipo(moeda: string): number | null {
	//remove todos os pontos que tiver e nao apenas o primeiro(como no replace default)
	const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
	return isNaN(numero) ? null : numero;
}
