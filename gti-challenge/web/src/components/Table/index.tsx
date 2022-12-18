import React from "react";
import './styles.css'; 
import trashIcon from '../../assets/images/icons/trash-icon.svg';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface PageHeaderProps{
  data?: any;
  columns: any;
  hover?: boolean;
  striped?: boolean;
  clickDelete?: any;
  clickEdit?: any;
}

const Table: React.FC<PageHeaderProps> = (props) => {
  const deleteClick = (id) => {
    props.clickDelete(id);
  }
  const editClick = (id) => {
    props.clickEdit(id);
  }
  const setCapslock = (columnText:string) => {
    return columnText.toUpperCase();
  }
  return(
    <div id='container-table'>
      {props.data ?
        <>
          <table className="table-box">
            <thead className="table-header">
              <tr>
                {props.columns.map((head:any) =>(
                  <th>{setCapslock(head.title)}</th>
                ))}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {props.data.map((row:any)=>(
                <tr className={`${props.hover && "hover"} ${props.striped && "striped"}`}>
                  {props.columns.map((col:any)=>(
                    <td>
                      {row[col.field]}
                    </td> 
                  ))}
                  <td>
                    <button 
                      onClick={() => {
                        deleteClick(row.id)
                      }} 
                      type="button">
                        <img src={trashIcon} alt='Delete'/>
                    </button>
                    <button onClick={() => {
                        editClick(row.id)
                      }}  
                      type="button">
                      <EditOutlinedIcon fontSize="large"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      : 
        <>
          <p>Nenhum produto encontrado</p>
        </>
      }
    </div>
  );
}
Table.defaultProps={
  data: null,
  hover: false,
  striped: false,
  clickDelete: () => {},
  clickEdit: () => {},
}

export default Table;