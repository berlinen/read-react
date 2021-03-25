import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function Home() {
  return  (
    <div>Home</div>
  )
}

function About() {
  return  (
    <div>Abouts</div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
