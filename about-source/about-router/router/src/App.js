import './App.css';
import { Route, Link } from './Router';

function Home() {
  return  (
    <div>Home</div>
  )
}

function About() {
  return  (
    <div>About</div>
  )
}

function News(props) {
  console.log('a', props);
  return  (
    <div>News</div>
  )
}

function App() {
  return (
    <div className="App">
      <>
        <Link to="/home">home </Link>
        <Link to="/about">about </Link>
        <Link to="/news">news</Link>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about" componet={About} />
        <Route path="/news" render={props => <News {...props} /> } />
      </>
    </div>
  );
}

export default App;
