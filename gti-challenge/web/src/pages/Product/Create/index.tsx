import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Select from '../../../components/Select';

import warningIcon from '../../../assets/images/icons/warning.svg';

import Button from '../../../components/Button';

import './styles.css';

function CreateProducts() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');

  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  function handleCreateProduct(e: FormEvent) {
    e.preventDefault();
      if(formIsValid(e)){
        api.post('/products', {
          category_id: category,
          name: name,
          code: code,
          quantity: quantity,
          is_active: true
        }).then(() => {
          alert('Cadastro realizado com sucesso!');
    
          history.push('/product');
        }).catch(() => {
          alert('Erro no cadastro!');
        })
    }else{
      alert('Cadastro invalido!');
    }
  }
  async function handleListCategories() {
    const {data} = await api.get('categories');

    const formatedData = data.map((dataValues) => {
      return({
        value: dataValues.id,
        label: dataValues.name,
      })
    
    });
    setCategoryList(formatedData);
  }
  function formIsValid (e:any){
    e.preventDefault();

    const form = {
      name: e.target.name.value,
      code: e.target.code.value,
      quantity: e.target.quantity.value,
      status: e.target.status.value,
      category: e.target.category.value
    };

    if(form.name === ''){
      return false;
    }else if(form.code === ''){
      return false;
    }else if(!form.quantity){
      return false;
    }else if(!form.status){
      return false;
    }else if(!form.category){
      return false;
    }else{
      return true;
    }
  }

  useEffect(() =>{
    handleListCategories();
  },[])

  return (
    <div id="page-product-form" className="container">
      <PageHeader 
        text="Novo Produto!"
        whereTo='/product'
      />

      <main>
        <form onSubmit={handleCreateProduct}>
          <fieldset>
            <legend>Dados do produto</legend>

            <Input 
              name="name" 
              label="Nome do Produto" 
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Input 
              name="code" 
              label="Código"
              value={code}
              onChange={(e) => { setCode(e.target.value) }}
            />

            <Input 
              name="quantity" 
              label="Quantidade"
              type='number'
              value={quantity}
              onChange={(e) => { setQuantity(e.target.value) }}
            />

            <Select 
              name="status" 
              label="Status"
              value={status}
              onChange={(e) => { setStatus(e.target.value) }}
              options={[
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
              ]}
            />
            <Select 
              name="category" 
              label="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryList}
            />
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <Button name='Adicionar Produto' type='submit'/>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CreateProducts;