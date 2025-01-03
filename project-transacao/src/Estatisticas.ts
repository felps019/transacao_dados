import countBy from "./CountBy.js";
// o type recebe a tipagem de transacao e é modificado o valor de um dado no objeto, assim recebe o novo valor
type TransacaoValor = Transacao & { valor: number };
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
	return transacao.valor !== null; //se for diferente de null retorna true, se nao false
}

export default class Estatiscas {
	private transacoes;
	total;
	pagamento;
	status;
	constructor(transacoes: Transacao[]) {
		this.transacoes = transacoes;
		this.total = this.setTotal();
		this.pagamento = this.setPagamento();
		this.status = this.setStatus();
	}
	// usar type predicate para criar uma funcao de callback de filtro na qual indica que se a funcao for passada,
	// o novo objeto nao vai ter a possibilidade de ter valor null
	private setTotal() {
		return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
			return acc + item.valor;
		}, 0);
	}
	private setPagamento() {
		return countBy(this.transacoes.map(({ pagamento }) => pagamento));
	}
	private setStatus() {
		return countBy(this.transacoes.map(({ status }) => status));
	}
}
