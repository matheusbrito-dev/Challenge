import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logoGti.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

function Landing(){
  return (
    <div id='page-landing'>

      <div id='page-landing-content' className='container'>

        <div className='logo-container'>
          <img src={logoImg} alt='ChallengeLogo'/>
          <h2>Plataforma de gerenciamento de produtos.</h2>
        </div>  

        <img 
          src={landingImg} 
          alt='Plataforma de gerenciamento'
          className='landing-image'
        />

        <div className='buttons-container'>
          
          <Link to='/product' className='products'>
              <img src={studyIcon} alt='Produtos'/>
              Produtos
          </Link>

          <Link to='/category' className='categories'>
              <img src={giveClassesIcon} alt='Categorias'/>
              Categorias
          </Link>

        </div>

        <span className='impact-text'>
          Gerenciando seus produtos com qualidade.<img src={purpleHeartIcon} alt='Coração Roxo'/>  
        </span>

      </div>

    </div>
  )
}

export default Landing;