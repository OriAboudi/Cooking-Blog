import './App.css';
import { DataProvider } from './context/dataContext';
import { UsersProvider } from './context/userContext';
import AppRouters from './routers/appRouters';

function App() {

  //todo: API Get all categories with recipes

  return (
    <div className='container-xxl'>
      <UsersProvider>
        <DataProvider>

          <AppRouters />
        </DataProvider>
      </UsersProvider>

    </div>
  );
}

export default App;
