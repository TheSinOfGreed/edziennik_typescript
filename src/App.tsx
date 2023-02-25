import LogIn from './pages/LogIn';


import React from 'react';
import { Route, Routes, useLocation, Outlet, Navigate} from 'react-router-dom';


function App(): JSX.Element {

  const location = useLocation();

  function Layout (): JSX.Element {
    return (
        <>
          {/* <Navbar/> */}
          <div id='layoutSidenav'>
            {/* <SideNav/> */}
            <div id='layoutSidenav_content'>
                  {/* <Outlet /> */}
                  {/* <Footer /> */}
            </div>
          </div>
        </>
    )
}

  return (
    <div className={"App " + (location.pathname === '/' ? '' : 'sb-nav-fixed main-body')}>
        <Routes>
          {/* elementy posiadajace toolbary itd */}
            <Route path="/home" element={sessionStorage.getItem('18062002') != null ? <Layout /> : <Navigate to="/"/>}>
              {/* <Route index element={<Home />} /> */}
              {/* <Route exact path="oceny" element={<Oceny/>} />
              <Route exact path="frekwencja" element={<Frekwencja/>} />
              <Route exact path="uwagi" element={<Uwagi/>} />
              <Route exact path="praceDomowe" element={<PracaDomowa/>} />
              <Route exact path="sprawdziany" element={<Sprawdziany/>} /> */}

              {/* DYREKTOR  */}
              {/* <Route path="dyrektor" element={<Hub/>}/>
              <Route path="dyrektor/generujToken" element={<GenerujToken/>} /> */}
                
            </Route>
            {/* elementy NIE posiadajace toolbary itd */}
            <Route path="/" element={sessionStorage.getItem('18062002') != null ? <Navigate to="/home"/> : <LogIn/>} />
            {/* <Route path="/registration" element={sessionStorage.getItem('18062002') != null ? <Navigate to="/home"/> : <Registration />} /> */}
        </Routes>
    </div>
  );
}

export default App;
