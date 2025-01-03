type TransacaoValor = Transacao & { valor: number }; //o type recebe a tipagem de transacao e é modificado o valor de um dado no objeto, assim recebe o novo valor
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
	return transacao.valor !== null; //se for diferente de null retorna true, se nao false
}

export default class Estatisticas {
	private transacoes;
	total;
	constructor(transacoes: Transacao[]) {
		this.transacoes = transacoes;
		this.total = this.setTotal();
	}
	private setTotal() {
		// usar type predicate para criar uma funcao de callback de filtro na qual indica que se a funcao for passada,
		//o novo objeto nao vai ter a possibilidade de ter valor null
		return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
			return acc + item.valor;
		}, 0);
	}
}
