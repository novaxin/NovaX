import React from 'react'
import './Navbar.css'
import { RelaodPage } from '../../Constents/constents'
import AddNote from '../AddNote/AddNote'

function Navbar() {

  return (
    <>
     <div className="container-fuild">
      <div className="row">
        <div className="col">
        <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">NovaX</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarText">

          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">recent<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/random">random</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Trending</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">leaderboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">date</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" onClick={RelaodPage} href="#">Realod</a>
            </li>

          </ul>
          <span class="navbar-text">
            <AddNote/>
          </span>
        </div>
      </nav>

        </div>
      </div>
     </div>

    </>
  )
}

export default Navbar