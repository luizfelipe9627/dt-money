import { useTransactions } from "../context/TransactionsContext";

const useData = () => {
  const { transactions } = useTransactions(); // Está chamando o estado transactions do contexto TransactionsContext.

  // Criado uma função chamada getMonthName que recebe como parâmetro um número de mês, sendo essa função responsável por retornar o nome do mês.
  const getMonthName = (monthNumber: string) => {
    // Criado uma constante chamada months que recebe um array com os nomes dos meses.
    const months: string[] = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    const monthIndex = parseInt(monthNumber, 10) - 1; // Criado uma constante chamada monthIndex que recebe o número do mês menos 1, ou seja, se o número do mês for 1, então monthIndex será 0, se o número do mês for 2, então monthIndex será 1, se o número do mês for 3, então monthIndex será 2 e assim por diante.
    return months[monthIndex]; // Retorna o nome do mês de acordo com o número do mês.
  };

  // Criado uma função chamada getLastEntry que retorna a última entrada registrada.
  const getLastEntry = () => {
    // Criado uma constante chamada lastDayFilter que recebe um array com as transações filtradas pelo tipo de transação, ou seja, se o tipo da transação for entrada, então a transação será adicionada no array, senão, não será adicionada.
    const lastDayFilter = transactions.filter(
      (transaction) => transaction.type === "entry",
    );
    const lastEntry = lastDayFilter.length > 0 ? lastDayFilter[0] : null; // Criado uma constante chamada lastEntry que recebe a última entrada registrada, ou seja, se o array lastDayFilter tiver pelo menos 1 item, então lastEntry será o primeiro item do array, senão, lastEntry será null.
    const lastDayEntry = lastEntry?.date.split("/")[0]; // Criado uma constante chamada lastDayEntry que recebe o dia da última entrada registrada e está usando o split para separar a data em dia, mês e ano.
    const lastMonthEntry = lastEntry?.date.split("/")[1]; // Criado uma constante chamada lastMonthEntry que recebe o mês da última entrada registrada e está usando o split para separar a data em dia, mês e ano.
    const monthName = lastMonthEntry ? getMonthName(lastMonthEntry) : ""; // Criado uma constante chamada monthName que se o lastMonthEntry for true, então executa a função getMonthName passando como parâmetro o lastMonthEntry, senão, retorna uma string vazia.

    // Se lastEntry for true, então executa o if, senão, executa o else.
    return lastEntry
      ? `Última entrada em ${lastDayEntry} de ${monthName}`
      : "Nenhuma entrada registrada";
  };

  // Criado uma função chamada getLastOutput que retorna a última saída registrada.
  const getLastOutput = () => {
    // Criado uma constante chamada lastDayFilter que recebe um array com as transações filtradas pelo tipo de transação, ou seja, se o tipo da transação for saida, então a transação será adicionada no array, senão, não será adicionada.
    const lastDayFilter = transactions.filter(
      (transaction) => transaction.type === "output",
    );
    const lastOutput = lastDayFilter.length > 0 ? lastDayFilter[0] : null; // Criado uma constante chamada lastOutput que recebe a última saída registrada, ou seja, se o array lastDayFilter tiver pelo menos 1 item, então lastOutput será o primeiro item do array, senão, lastOutput será null.
    const lastDayOutput = lastOutput?.date.split("/")[0]; // Criado uma constante chamada lastDayOutput que recebe o dia da última saída registrada e está usando o split para separar a data em dia, mês e ano.
    const lastMonthOutput = lastOutput?.date.split("/")[1]; // Criado uma constante chamada lastMonthOutput que recebe o mês da última saída registrada e está usando o split para separar a data em dia, mês e ano.
    const monthName = lastMonthOutput ? getMonthName(lastMonthOutput) : ""; // Criado uma constante chamada monthName que se o lastMonthOutput for true, então executa a função getMonthName passando como parâmetro o lastMonthOutput, senão, retorna uma string vazia.

    // Se lastOutput for true, então executa o if, senão, executa o else.
    return lastOutput
      ? `Última saída em ${lastDayOutput} de ${monthName}`
      : "Nenhuma saída registrada";
  };

  // Criado uma função chamada getStartAndEndDate que retorna a data inicial e final.
  const getStartAndEndDate = () => {
    const firstDate = transactions[transactions.length - 1]?.date; // Criado uma constante chamada firstDate que recebe a primeira data registrada.
    const lastDate = transactions[0]?.date; // Criado uma constante chamada lastDate que recebe a última data registrada.

    // Se firstDate e lastDate for true, então executa o if, senão, executa o else.
    return firstDate && lastDate
      ? `De ${firstDate} até ${lastDate}`
      : "Nenhuma transação registrada";
  };

  return { getLastEntry, getLastOutput, getStartAndEndDate }; //  Está retornando um objeto com as funções getLastEntry, getLastOutput e getStartAndEndDate.
};

export default useData;
