import React, {useState, useEffect} from "react";
import api from "../../../services/api";
import { useHistory } from 'react-router-dom'

import './styles.css';
import PageHeader from "../../../components/PageHeader";
import Table from "../../../components/Table";

function ListProducts (){

  const history = useHistory();

  const[tableData, setTableData] = useState([]);
  async function handleListProducts() {
    const {data} = await api.get('products');

    const formatedData = data.map((dataValues) => {
      return({
        active: dataValues.is_active === 1 ? 'Ativo' : 'Inativo',
        ...dataValues,
      })
    
    });
    setTableData(formatedData);
  }
  async function handleDelete(id) {
    api.delete('/products/'+id)
    .then(() => {
      alert('O produto foi deletado com sucesso!');
      handleListProducts();
    }).catch(() => {
      alert('Erro ao deletar!');
    })
  }
  async function handleEdit(id) {
    history.push(`/product/edit/${id}`)
  }
  useEffect(() =>{
    handleListProducts();
  },[])

  const columns=[
    {title:'Id', field:'id'},
    {title:'Nome', field:'name'},
    {title:'Código', field:'code'},
    {title:'Quantidade', field:'quantity'},
    {title:'Ativo', field:'active'},
    {title:'Categoria', field:'name_category'},
  ]
  return(
    <div id='page-list-products' className="container">
      <PageHeader text={"Lista de Produtos"} whereTo='/'/>
      <main>
        
        <div className="button-box">
          <button onClick={()=>{history.push('/product/create')}} className="button-add">
            Novo produto
          </button>
        </div>
        <Table 
          data={tableData} 
          columns={columns} 
          hover={true} 
          striped={true}
          clickDelete={(id)=>{
            handleDelete(id);
          }}
          clickEdit={(id)=>{
            handleEdit(id);
          }}
        />
      </main>
    </div>
  );
}
export default ListProducts;