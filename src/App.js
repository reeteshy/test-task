import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import FormData from "./FormData";
import FormDataList from "./FormDataList";

function App() {
  return (
   <>
    <Router>
      <ul>
        <li><Link to="/" >User List</Link></li>
        <li><Link to="/form" >Form</Link></li>
      </ul>
      <Routes>
        <Route path='/' element={<FormDataList />}> </Route>
        <Route path='/form' element={<FormData />} > </Route>
      </Routes>
    </Router>
   </>
  );
}

export default App;
