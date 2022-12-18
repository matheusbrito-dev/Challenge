import React from "react";
import { Link } from "react-router-dom";

import './styles.css';

import logoImg from '../../assets/images/logoGti.svg';
import backIcon from "../../assets/images/icons/back.svg";

interface PageHeaderProps{
  children?: JSX.Element|JSX.Element[];
  text: string;
  whereTo?: string | undefined;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return(
    <header className="page-header">
      <div className="top-bar-container"> 
        <Link to={{pathname: props.whereTo}}>
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImg} alt="GTILogo" />
      </div>

      <div className="header-content">
        <strong>{props.text}</strong>

        {props.children}
      </div>
    </header> 
  );
}

PageHeader.defaultProps={
  whereTo: '/',
}

export default PageHeader;
