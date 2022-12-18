import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import api from '../../../services/api';

import './styles.css';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';

import warningIcon from '../../../assets/images/icons/warning.svg';
import Button from '../../../components/Button';

function EditCategories(match) {
  const history = useHistory();
  const { id } = match.match.params;
  
  const [name, setName] = useState('');
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
  async function handleFindCategoryById() {
    const {data} = await api.get('/categories/'+id);
    if(data.length !== 0){
      setName(data[0].name);
      return data;
    }else{
      alert('Categoria não encontrada! ');
      history.push('/category');
    }
  }
  function handleEditCategory(e: FormEvent) {
    e.preventDefault();
      if(formIsValid(e)){
        api.patch('/categories/'+id, {
          name,
        }).then(() => {
          alert('Edit realizado com sucesso!');
    
          history.push('/category');
        }).catch(() => {
          alert('Erro no cadastro!');
        })
    }else{
      alert('Cadastro invalido!');
    }
  }
  useEffect(() =>{
    handleFindCategoryById();
  },[]);

  return (
    <div id="page-categories-form" className="container">
      <PageHeader 
        text="Nova Categoria."
        whereTo='/category'
      />

      <main>
        <form onSubmit={handleEditCategory}>
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

export default EditCategories;