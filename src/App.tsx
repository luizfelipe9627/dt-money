import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import Transactions from "./components/Transactions/Transactions";
import { ButtonSelectedProvider } from "./context/ButtonSelectedContext";
import { ModalProvider } from "./context/ModalContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import Values from "./components/Values/Values";
import Search from "./components/Search/Search";

const App = () => {
  return (
    <TransactionsProvider>
      <ButtonSelectedProvider>
        <ModalProvider>
          <Modal />
          <Header />
        </ModalProvider>
      </ButtonSelectedProvider>
      <Values />
      <Search />
      <Transactions />
    </TransactionsProvider>
  );
};

export default App;
