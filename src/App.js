import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Layout from "./components/Layout";
import Tokens from "./pages/Tokens";
import Inscribe from "./pages/Inscribe";
import Transactions from "./pages/Transactions";
import Token from "./pages/Token";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Home/>}/>

        <Route path={'/accounts'} element={<Accounts/>}/>
        <Route path={'/inscribe'} element={<Inscribe/>}/>
        <Route path={'/tokens'} element={<Tokens/>}/>
        <Route path={'/tokens/:tick'} element={<Token/>}/>
        <Route path={'/indexer'} element={<Transactions/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
