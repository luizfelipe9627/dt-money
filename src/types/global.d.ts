// Criado um tipo global chamado Transaction.
type Transaction = {
  description: string;
  price: number;
  category: string;
  date: string;
  type: string | null;
};

type Transactions = Transaction[]; // Criado um tipo global chamado Transactions do tipo array de Transaction.
