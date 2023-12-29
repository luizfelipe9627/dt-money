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
    // Passando o contexto do TransactionsProvider para os componentes filhos, ou seja, todos os componentes que estão dentro do TransactionsProvider terão acesso aos valores do contexto.
    <TransactionsProvider>
      {/* Passando o contexto do ModalProvider para os componentes filhos, ou seja, todos os componentes que estão dentro do ModalProvider terão acesso aos valores do contexto. */}
      <ModalProvider>
        {/* Passando o contexto do ButtonSelectedProvider para os componentes filhos, ou seja, todos os componentes que estão dentro do ButtonSelectedProvider terão acesso aos valores do contexto. */}
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
