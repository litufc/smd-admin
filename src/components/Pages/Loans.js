import React, { Component } from 'react';
import { compose } from 'recompose';

import Typography from '@material-ui/core/Typography';

import LoanTabs from '../LoanTabs';
import DataTable from '../DataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class LoansPageBase extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getKeyLoans()
    this.getResourceLoans()
  }

  getKeyLoans = () => {
    this.keyListener = this.props.firebase
        .getKeyLoans()
        .onSnapshot(querySnapshot => {
            this.keyLoans = []
            querySnapshot.forEach(doc => {
                const id = doc.id;
                const data = doc.data();
                this.keyLoans.push({id, ...data})
            });
            this.setState({keyLoans: this.keyLoans})
        }, error => {
        this.setState({ error });
        })
  }

  getResourceLoans = () => {
    this.resourceListener = this.props.firebase
    .getResourceLoans()
    .onSnapshot(querySnapshot => {
        this.resourceLoans = []
        querySnapshot.forEach(doc => {
            const id = doc.id;
            const data = doc.data();
            this.resourceLoans.push({id, ...data})
        });
        this.setState({resourceLoans: this.resourceLoans})
    }, error => {
      this.setState({ error });
    })
  }

  componentWillUnmount() {
    this.keyListener()
    this.resourceListener()
  }

  render() {

    const keyColumns = [
      {title: 'Data do Empréstimo', field: 'date'},
      {title: 'Chave', field: 'key'},
      {title: 'Usuário', field: 'name'},
      {title: 'Código do Usuário', field: 'code'},
      {title: 'Telefone do Usuário', field: 'phone'},
      {title: 'Hora de Saída', field: 'loanTime'},
      {title: 'Hora da Chegada', field: 'devolutionTime'}
    ]

    const resourceColumns = [
      {title: 'Data do Empréstimo', field: 'date'},
      {title: 'Recurso', field: 'resource'},
      {title: 'Usuário', field: 'name'},
      {title: 'Código do Usuário', field: 'code'},
      {title: 'Telefone do Usuário', field: 'phone'},
      {title: 'Hora de Saída', field: 'loanTime'},
      {title: 'Hora da Chegada', field: 'devolutionTime'}
    ]

    const keyList =
    <DataTable 
      columns={keyColumns}
      data={this.state.keyLoans}
      title='Histórico de Empréstimos de Chaves'
      type='Empréstimo de Chave'
    />

    const resourceList =
    <DataTable 
      columns={resourceColumns}
      data={this.state.resourceLoans}
      title='Histórico de Empréstimos de Recursos'
      type='Empréstimo de Recurso'
    />

    const list =
    <LoanTabs 
      keys={keyList}
      resources={resourceList}
    />

    return(
      <div>
        <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
          Empréstimos
        </Typography>
        {list}
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const LoansPage = compose(
  withAuthorization(condition),
  withFirebase,
)(LoansPageBase);

export default LoansPage;