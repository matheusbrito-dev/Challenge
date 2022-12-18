import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import api from '../../../services/api';

import './styles.css';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';

import warningIcon from '../../../assets/images/icons/warning.svg';
import Button from '../../../components/Button';

function CreateCategories() {
  const history = useHistory();

  const [name, setName] = useState('');

  function handleCreateCategory(e: FormEvent) {
    e.preventDefault();
      if(formIsValid(e)){
        api.post('/categories', {
          name,
        }).then(() => {
          alert('Cadastro realizado com sucesso!');
    
          history.push('/category');
        }).catch(() => {
          alert('Erro no cadastro!');
        })
    }else{
      alert('Cadastro invalido!');
    }
  }
    
  function formIsValid (e:any){
    e.preventDefault();

    const form = {
      name: e.target.name.value
    };

    if(form.name === ''){
      return false;
    }else{
      return true;
    }
  }

  return (
    <div id="page-categories-form" className="container">
      <PageHeader 
        text="Nova Categoria."
        whereTo='/category'
      />

      <main>
        <form onSubmit={handleCreateCategory}>
          <fieldset>
            <legend>Dados do produto</legend>

            <Input 
              name="name" 
              label="Nome da Categoria" 
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <Button name='Adicionar Categoria' type='submit'/>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CreateCategories;