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
	semana;
	melhorDia;
	constructor(transacoes: Transacao[]) {
		this.transacoes = transacoes;
		this.total = this.setTotal();
		this.pagamento = this.setPagamento();
		this.status = this.setStatus();
		this.semana = this.setSemana();
		this.melhorDia = this.setMelhorDia();
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
	private setSemana() {
		const semana = {
			["Domingo"]: 0,
			["Segunda"]: 0,
			["Terça"]: 0,
			["Quarta"]: 0,
			["Quinta"]: 0,
			["Sexta"]: 0,
			["Sábado"]: 0,
		};
		//poderia fazer com o metodo reduce ou forEach
		for (let i = 0; i < this.transacoes.length; i++) {
			const day = this.transacoes[i].data.getDay();
			if (day === 0) semana["Domingo"] += 1;
			if (day === 1) semana["Segunda"] += 1;
			if (day === 2) semana["Terça"] += 1;
			if (day === 3) semana["Quarta"] += 1;
			if (day === 4) semana["Quinta"] += 1;
			if (day === 5) semana["Sexta"] += 1;
			if (day === 6) semana["Sábado"] += 1;
		}
		return semana;
	}
	private setMelhorDia() {
		return Object.entries(this.semana).sort((a, b) => {
			return b[1] - a[1];
		})[0];
	}
}
