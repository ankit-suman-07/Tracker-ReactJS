import { ExpenseComp } from './components/ExpenseComp';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <main  >
      <div className="main-page">

        <ExpenseComp />
        <Footer />

      </div>
    </main>
  );
}

export default App;
