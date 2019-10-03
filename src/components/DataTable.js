import React from "react";
import { forwardRef } from 'react';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import Info from '@material-ui/icons/Info';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  Info: forwardRef((props, ref) => <Info {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

 const DataTable = (props) => {

  

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        columns={props.columns}
        data={props.data}
        title={props.day}
  
        options={{
          search: true,
          pageSize: 10,
          pageSizeOptions: [10],
          exportButton: true
        }}

        localization={{
          pagination: { 
            lastTooltip: 'Última página',
            lastAriaLabel: 'Última página',
            nextTooltip: 'Próxima página',
            nextAriaLabel: 'Próxima página',
            previousTooltip: 'Página anterior',
            previousAriaLabel: 'Página anterior',
            firstTooltip: 'Primeira página',
            firstAriaLabel: 'Primeira página',
            labelRowsPerPage: 'Linhas por página:',
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{from}-{to} de {count}'
          },
          toolbar: {
            nRowsSelected: '{0} linhas selecionadas',
            searchTooltip: 'Buscar ' + props.type,
            searchPlaceholder: 'Buscar ' + props.type,
            exportName: 'Exportar para .CSV',
            exportAriaLabel: 'Exportar',
            exportTitle: 'Exportar',
            showColumnsAriaLabel: 'Mostrar Colunas',
            showColumnsTitle: 'Show Columns',
            nRowsSelected: '{0} linha(s) selecionadas',
            addRemoveColumns: 'Adicionar ou remover colunas'
          },
          header: {
            actions: 'Ações'
          },
          grouping: {
            placeholder: 'Puxar cabeçalhos...'
          },
          body: {
            emptyDataSourceMessage: 'Sem dados para mostrar',
            filterRow: {
              filterTooltip: 'Filtrar'
            },
            editRow: {
              deleteText: 'Você tem certeza que deseja excluir esse(a) ' + props.type,
              cancelTooltip: 'Cancelar',
              saveTooltip: 'Confirmar'
            },
            addTooltip: 'Adicionar ' + props.type,
            deleteTooltip: 'Excluir ' + props.type,
            editTooltip: 'Editar ' + props.type
          },
        }}

        editable={{
          onRowAdd: newData => new Promise((resolve, reject) => {
            setTimeout(() => {
              const add = () => props.add(newData, props.day)
              add()
              resolve()
            }, 1000)
          }),
          onRowUpdate: newData => new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(newData)
              const edit = () => props.edit(newData)
              edit()
              resolve()
            }, 1000)
          }),
          onRowDelete: oldData => new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(oldData.id)
              const del = () => props.delete(oldData.id)
              del()
              resolve()
            }, 1000)
          })
        }}


      />
    </div>
  )
}

export default DataTable