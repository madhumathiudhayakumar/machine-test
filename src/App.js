import { BrowserRouter  } from 'react-router-dom';
import './App.css';

import AppRoutes from './routes/appRoutes';

function App() {
  return (
    <div className="App">
      	<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>      
    </div>
  );
}

export default App;
