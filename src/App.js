import './App.css';
import RootView from './pages/root/root';
import CreateView from './pages/create/create';
import ValidateView from './pages/validate/validate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/create/:id'>
            <CreateView />
          </Route>
          <Route path='/create'>
            <CreateView />
          </Route>
          <Route path='/validate/:id'>
            <ValidateView />
          </Route>
          <Route path='/'>
            <RootView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
