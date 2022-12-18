import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import api from '../../../services/api';
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Select from '../../../components/Select';

import warningIcon from '../../../assets/images/icons/warning.svg';

import './styles.css';
import Button from '../../../components/Button';

function EditProducts(match) {
  const history = useHistory();
  const { id } = match.match.params;

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isActive, setIsActive] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  function formIsValid (e:any){
    e.preventDefault();

    const form = {
      name: e.target.name.value,
      code: e.target.code.value,
      quantity: e.target.quantity.value,
      isActive: e.target.isActive.value,
      category: e.target.category.value
    };

    if(form.name === ''){
      return false;
    }else if(form.code === ''){
      return false;
    }else if(!form.quantity){
      return false;
    }else if(!form.isActive){
      return false;
    }else if(!form.category){
      return false;
    }else{
      return true;
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

  async function handleFindCategoryById() {
    const {data} = await api.get('/products/'+id);
    if(data.length !== 0){
      setName(data[0].name);
      setCode(data[0].code);
      setQuantity(data[0].quantity);
      setIsActive(data[0].is_active === 1 ? 'Ativo' : 'Inativo');
      setCategory(data[0].category_id);
      return data;
    }else{
      alert('Categoria não encontrada! ');
      history.push('/product');
    }
  }

  function handleEditProduct(e: FormEvent) {
    e.preventDefault();
      if(formIsValid(e)){
        api.patch('/products/'+id, {
          category_id: category,
          name: name,
          code: code,
          quantity: quantity,
          is_active: isActive === 'Ativo' ? true : false
        }).then(() => {
          history.push('/product');
        }).catch(() => {
          alert('Erro na edição');
        })
    }else{
      alert('Edição invalida!');
    }
  }
  useEffect(() =>{
    handleFindCategoryById();
    handleListCategories();
  },[]);

  return (
    <div id="page-product-edit-form" className="container">
      <PageHeader 
        text="Edição de Produto."
        whereTo='/product'
        />
      
      
      <main>
        <form onSubmit={handleEditProduct}>
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
              name="isActive" 
              label="Ativo"
              value={isActive}
              onChange={(e) => { setIsActive(e.target.value) }}
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
            <Button name='Editar Produto' type='submit'/>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default EditProducts;