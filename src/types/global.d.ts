type Transaction = {
  description: string;
  price: number;
  category: string;
  date: string;
  type: string | null;
};

type Transactions = Transaction[];
