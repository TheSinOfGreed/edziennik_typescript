import React from 'react';
import HomePlanZajec from '../components_special/Home_plan_zajec';
import '../styles/Home.css';


const Home: React.FC = () => {
  return (
    <main>
        <div className="container-fluid px-4">
            <h1 className="mt-4">Menu</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Plan zajęć</li>
            </ol>

            <div className="row">
            <div className="col-xl-4 col-md-4">
                  <div className="card border-success mb-4">
                  <div className="card-header">Prace domowe dziś</div>
                  <div className="card-body text-success">
                      <p className="card-text">-</p>
                  </div>
                  </div>
            </div>
            <div className="col-xl-4 col-md-4">
                  <div className="card border-warning mb-4">
                  <div className="card-header">Kartkówki dziś</div>
                  <div className="card-body text-warning">
                      <p className="card-text">-</p>
                  </div>
                  </div>
              </div>
              <div className="col-xl-4 col-md-4">
                  <div className="card border-danger mb-4">
                  <div className="card-header">Sprawdziany dziś</div>
                  <div className="card-body text-danger">
                      <p className="card-text">-</p>
                  </div>
                  </div>
              </div>
            </div>
            
            <HomePlanZajec />
        </div>
    </main>
  )
}

export default Home
