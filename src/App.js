import MiApi from "./components/MiApi";

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top border-bottom border-secondary mb-2">
        <div className="container">
          <a className="navbar-brand text-uppercase fs-3" href="/">Banderas del Mundo App</a>
        </div>
      </nav>
      <MiApi />
      <footer className='fixed-bottom mt-3 bg-dark fs-4 text-light text-center border-top border-secondary'>
        <p className="m-0">@CamiloAraya</p>
      </footer>
    </div>
  );
}

export default App;
