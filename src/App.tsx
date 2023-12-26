import Header from "./components/Header/Header";
import ModalTransaction from "./components/Modal/ModalTransaction";
import Transactions from "./components/Transactions/Transactions";
import { ButtonSelectedProvider } from "./context/ButtonSelectedContext";
import { ModalProvider } from "./context/ModalContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import Values from "./components/Values/Values";
import Search from "./components/Search/Search";
import ModalOptions from "./components/Modal/ModalOptions";

const App = () => {
  return (
    <TransactionsProvider>
      <ModalProvider>
        <ButtonSelectedProvider>
          <ModalTransaction />
          <Header />
        </ButtonSelectedProvider>
        <main>
          <ModalOptions />
          <Values />
          <Search />
          <Transactions />
        </main>
      </ModalProvider>
    </TransactionsProvider>
  );
};

export default App;
