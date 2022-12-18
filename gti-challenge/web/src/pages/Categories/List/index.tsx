import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom'
import api from "../../../services/api";

import './styles.css';
import PageHeader from "../../../components/PageHeader";
import Table from "../../../components/Table";

function ListCategories (){
  const[tableData, setTableData] = useState([]);
  const history = useHistory();

  async function handleListCategories() {
    const {data} = await api.get('categories');
    setTableData(data);
  }
  
  async function handleDelete(id) {
    api.delete('/categories/'+id)
    .then(() => {
      alert('A categoria foi deletada com sucesso!');
      handleListCategories();
    }).catch(() => {
      alert('Erro ao deletar!');
    })
  }
  async function handleEdit(id) {
    history.push(`/category/edit/${id}`)
  }
  const columns=[
    {title:'Id', field:'id'},
    {title:'Nome', field:'name'},
  ]


  useEffect(() =>{
    handleListCategories();
  },[]);
  return(
    <div id='page-list-categories' className="container">
      <PageHeader text={"Lista de Categorias"} whereTo='/'/>
      <main>
        
        <div className="button-box">
          <button onClick={()=>{history.push('/category/create')}} className="button-add">
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
export default ListCategories;