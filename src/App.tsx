import "./App.css";
import { CodeDiff } from "./CodeDiff";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Covered Code</h1>
      </header>

      <main>
        <CodeDiff />
      </main>
    </div>
  );
}

export default App;
