import React, { Component } from 'react';
import { compose } from 'recompose';

import Paper from '@material-ui/core/Paper';

import DataTable from '../DataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  name: '',
  place: '',
  status: true,
  editable: false,
  error: null,
  deleteDialog: false
};

class LoansPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
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
    let listItems = []
    if(this.state.keyLoans != undefined){
      listItems = this.state.keyLoans
    }

    return(
      <div>
        <h1>Histórico de Empréstimos</h1>
        <Paper style={{ height: 700, width: '100%' }}>
            <DataTable
                rowCount={listItems.length}
                rowGetter={({ index }) => listItems[index]}
                columns={[
                    {
                        width: 200,
                        label: 'Data',
                        dataKey: 'date',
                    },
                    {
                        width: 400,
                        label: 'Chave',
                        dataKey: 'key'
                    },
                    {
                        width: 420,
                        label: 'Usuário',
                        dataKey: 'name'
                    },
                    {
                        width: 200,
                        label: 'Código',
                        dataKey: 'code'
                    },
                    {
                        width: 300,
                        label: 'Telefone',
                        dataKey: 'phone'
                    },
                    {
                        width: 200,
                        label: 'Hora de Saída',
                        dataKey: 'loanTime'
                    },
                    {
                        width: 200,
                        label: 'Hora de Chegada',
                        dataKey: 'devolutionTime'
                    },
                ]}
            />
        </Paper>
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