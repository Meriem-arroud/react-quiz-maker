import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizForm from './QuizForm'
import QuizResult from './QuizResult';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={QuizForm} />
          <Route path="/quiz-result" component={QuizResult} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
