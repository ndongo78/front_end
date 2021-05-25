import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/Css/App.css';
import Home from './components/Home';
import Register from './components/backend/Register';
import Login from './components/backend/Login';
import Navbar from './components/Navbar';
import Produits from './components/Produits';
import Contact from './components/Contact';
import Cart from './components/Cart';
import GlobalProvider from './components/Globals/Global';
import Admin from './components/backend/Admin';
import Client from './components/backend/Client';
import Modifier from './components/backend/Modifier';
import PostCategory from './components/backend/PostCategory';
import PostArticle from './components/backend/PostArticle';
import Footer from './components/footer/Footer';
import Payement from './components/backend/Payement';
import Detail from './components/backend/Detail';
import Chaussures from './components/backend/Chaussures';
import Vetements from './components/backend/Vetements';
import Accessoires from './components/backend/Accessoires';
import UpdateInfos from './components/backend/UpdateInfos';
import Paypal from './components/backend/Paypal';
import Commandes from './components/backend/Commandes';
import Favorite from './components/backend/Favorite';
import Remboursement from './components/backend/Remboursement';
import MesCommandes from './components/backend/MesCommandes';
import Messages from './components/backend/Messages';
import ResetPassword from './components/backend/ResetPassword';
import MesClients from './components/backend/MesClients';
import Promo from './components/backend/Promo';
import ModifierPassword from './components/backend/ModifierPassword';




const App=()=> {
  return (
    <>
    <Router>
      <GlobalProvider>
      <Navbar />
      <Switch>
        <Route path='/' exact  component={Home}/>
        <Route path='/product'  component={Produits}/>
        <Route path='/contact' component={Contact} />
        <Route path='/cart' component={Cart} />
        {/* route user login */}
        <Route path='/register'   component={Register}/>
        <Route path='/login'   component={Login}/>
        <Route path='/reset'   component={ResetPassword}/>
        {/* //route client */}
        <Route path='/moncompte' component={Client}/> 
        <Route path='/modifierInfos' component={UpdateInfos}/> 
        <Route path='/payement'  component={Payement} />
        <Route path='/paypal'  component={Paypal} />
        <Route path='/mesCommandes'  component={Commandes} />
        <Route path='/mesFavorite'  component={Favorite} />
        <Route path='/mesRemboursement'  component={Remboursement} />
          {/* route pour le crud   */}
          <Route path='/admin' component={Admin}/>
          <Route path='/commande' component={MesCommandes}/>
        <Route path='/ediitArticle/:id' component={Modifier}/>
        <Route path='/createCategory' component={PostCategory}/>
        <Route path='/createArticle' component={PostArticle}/>
        <Route path='/:id/product'  component={Detail} />
        <Route path='/chaussure'  component={Chaussures} />
        <Route path='/vetement'  component={Vetements} />
        <Route path='/accessoire'  component={Accessoires} />
        <Route path='/messages'  component={Messages} />
        <Route path='/mesclients'  component={MesClients} />
        <Route path='/promo'  component={Promo} />
        <Route path='/api/password/reset/mail/:id/:react_token'  component={ModifierPassword} />
        
        
      </Switch>
      </GlobalProvider>
      <Footer/>
    </Router>
    
    </>
  );
}

export default App;
