import { useTransactions } from "../context/TransactionsContext";

const useData = () => {
  const { transactions } = useTransactions();

  const getMonthName = (monthNumber: string) => {
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
    const monthIndex = parseInt(monthNumber, 10) - 1;
    return months[monthIndex];
  };

  const getLastEntry = () => {
    const lastDayFilter = transactions.filter(
      (transaction) => transaction.type === "entry",
    );
    const lastEntry = lastDayFilter.length > 0 ? lastDayFilter[0] : null;
    const lastDayEntry = lastEntry?.date.split("/")[0];
    const lastMonthEntry = lastEntry?.date.split("/")[1];
    const monthName = lastMonthEntry ? getMonthName(lastMonthEntry) : "";

    return lastEntry
      ? `Última entrada em ${lastDayEntry} de ${monthName}`
      : "Nenhuma entrada registrada";
  };

  const getLastOutput = () => {
    const lastDayFilter = transactions.filter(
      (transaction) => transaction.type === "output",
    );
    const lastOutput = lastDayFilter.length > 0 ? lastDayFilter[0] : null;
    const lastDayOutput = lastOutput?.date.split("/")[0];
    const lastMonthOutput = lastOutput?.date.split("/")[1];
    const monthName = lastMonthOutput ? getMonthName(lastMonthOutput) : "";

    return lastOutput
      ? `Última saída em ${lastDayOutput} de ${monthName}`
      : "Nenhuma saída registrada";
  };

  const getStartAndEndDate = () => {
    const firstDate = transactions[transactions.length - 1]?.date;
    const lastDate = transactions[0]?.date;

    return firstDate && lastDate
      ? `De ${firstDate} até ${lastDate}`
      : "Nenhuma transação registrada";
  };

  return { getLastEntry, getLastOutput, getStartAndEndDate };
};

export default useData;
