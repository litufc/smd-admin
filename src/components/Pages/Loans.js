import React, { Component } from 'react';
import { compose } from 'recompose';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import Typography from '@material-ui/core/Typography';

import LoanTabs from '../Tabs/LoanTabs';
import LoanDataTable from '../DataTables/LoanDataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class LoansPageBase extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.listener = this.props.firebase
        .getAdmin()
        .onSnapshot(doc => {
            const data = doc.data();
            this.setState({place: data.place})
            this.getKeyLoans()
            this.getResourceLoans()
        })
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
    this.listener()
  }

  returnKey = (loan) => {
    //Alterar a chave: Indisponível => Disponível - user: deletar
    const now = moment().format('HH:mm')
    this.props.firebase
    .updateKeyDeletingUser(loan.keyId)
    .then(() => {
      //Alterar o devolutionTime do Loan
      this.props.firebase.updateKeyLoan(loan.id, now)
      .then(() => {
        //Snackbar deu certo
      })
      .catch(error => {
        //Snackbar deu errado
      })
    })
    .catch(error => {
      //Snackbar deu errado
    })
  }

  returnResource = (loan) => {
    //Alterar o recurso: Indisponível => Disponível - user: deletar
    const now = moment().format('HH:mm')
    this.props.firebase
    .updateResourceDeletingUser(loan.resourceId)
    .then(() => {
      //Alterar o devolutionTime do Loan
      this.props.firebase.updateResourceLoan(loan.id, now)
      .then(() => {
        //Snackbar deu certo
      })
      .catch(error => {
        //Snackbar deu errado
      })
    })
    .catch(error => {
      //Snackbar deu errado
    })
  }

  render() {
    console.log(this.state.keyLoans)

    const keyColumns = [
      {title: 'Data do Empréstimo', field: 'date'},
      {title: 'Chave', field: 'key'},
      {title: 'Usuário', field: 'name'},
      {title: 'Código do Usuário', field: 'code'},
      {title: 'Telefone do Usuário', field: 'phone'},
      {title: 'Curso do Usuário', field: 'course'},
      {title: 'Local', field: 'place'},
      {title: 'Hora de Saída', field: 'loanTime'},
      {title: 'Hora da Chegada', field: 'devolutionTime'}
    ]

    const resourceColumns = [
      {title: 'Data do Empréstimo', field: 'date'},
      {title: 'Recurso', field: 'resource'},
      {title: 'Usuário', field: 'name'},
      {title: 'Código do Usuário', field: 'code'},
      {title: 'Telefone do Usuário', field: 'phone'},
      {title: 'Curso do Usuário', field: 'course'},
      {title: 'Local', field: 'place'},
      {title: 'Hora de Saída', field: 'loanTime'},
      {title: 'Hora da Chegada', field: 'devolutionTime'}
    ]

    const keyList =
    <LoanDataTable 
      columns={keyColumns}
      data={this.state.keyLoans}
      title='Histórico de Empréstimos de Chaves'
      type='Empréstimo de Chave'
      place={this.state.place}
      return={this.returnKey}
    />

    const resourceList =
    <LoanDataTable 
      columns={resourceColumns}
      data={this.state.resourceLoans}
      title='Histórico de Empréstimos de Recursos'
      type='Empréstimo de Recurso'
      place={this.state.place}
      return={this.returnResource}
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