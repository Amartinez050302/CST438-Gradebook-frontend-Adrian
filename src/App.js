import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddAssignment from './components/AddAssignment'; 
import EditAssignment from './components/EditAssignment';

function App() {
  return (
    <div className="App">
      <h2>Gradebook</h2>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ListAssignment} />
            <Route exact path="/gradeAssignment/:id" component={GradeAssignment} />
            <Route exact path="/addAssignment" component={AddAssignment} /> {/* Route for adding assignments */}
            <Route exact path="/editAssignment/:id" component={EditAssignment} /> {/* Route for editing assignments */}
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;