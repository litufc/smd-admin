import React, { Component } from 'react';
import { compose } from 'recompose';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import Typography from '@material-ui/core/Typography';

import LoanTabs from '../Tabs/LoanTabs';
import RequestDataTable from '../DataTables/RequestDataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class RequestsPageBase extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.listener = this.props.firebase
        .getAdmin()
        .onSnapshot(doc => {
            const data = doc.data();
            console.log(data.place)
            this.getKeyRequests(data.place)
            this.getResourceRequests(data.place)
        })
    }

    getKeyRequests = (place) => {
        this.props.firebase
            .getKeyRequests(place)
            .onSnapshot(querySnapshot => {
                const keyRequests = []
                querySnapshot.forEach(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    keyRequests.push({id, ...data})
                });
                this.setState({keyRequests: keyRequests})
            }, error => {
            this.setState({ error });
            })
    }

    getResourceRequests = (place) => {
        this.props.firebase
        .getResourceRequests(place)
        .onSnapshot(querySnapshot => {
            const resourceRequests = []
            querySnapshot.forEach(doc => {
                const id = doc.id;
                const data = doc.data();
                resourceRequests.push({id, ...data})
            });
            this.setState({resourceRequests: resourceRequests})
        }, error => {
        this.setState({ error });
        })
    }

    componentWillUnmount() {
        this.listener()
    }

    acceptKeyRequest = (request) => {
        const timeFormat = 'HH:mm'
        const dateFormat = 'DD/MM/YYYY'
        //Criar um objeto empréstimo e colocá-lo na lista
        const loan = {
            date: moment().format(dateFormat),
            key: request.key,
            name: request.user,
            code: request.code,
            phone: request.phone,
            course: request.course,
            place: request.place,
            loanTime: moment().format(timeFormat),
            devolutionTime: '',
            timestamp: moment().unix(),
            keyId: request.keyId
        }
        this.props.firebase
            .addKeyLoan(loan)
            .then(() => {
                //Chave: Disponível => Indisponível - user: Nome do Usuário
                const id = request.keyId
                const name = request.key
                const place = request.place
                const user = request.user //nome do usuário que pegou a chave
                const key = {
                    id: id,
                    name: name,
                    place: place,
                    status: false,
                    user: user
                }
                this.props.firebase
                    .updateKey(key)
                    .then(() => {
                        this.deleteKeyRequest(request)
                    })
                    .catch(error => {
                        //Snackbar deu errado
                    })
            })
            .catch(error => {
                //Snackbar deu errado
            })
    }

    deleteKeyRequest = (request) => {
        this.props.firebase
            .deleteKeyRequest(request.id, request.place)
    }

    acceptResourceRequest = (request) => {
        const timeFormat = 'HH:mm'
        const dateFormat = 'DD/MM/YYYY'
        //Criar um objeto empréstimo e colocá-lo na lista
        const loan = {
            date: moment().format(dateFormat),
            resource: request.resource,
            name: request.user,
            code: request.code,
            phone: request.phone,
            course: request.course,
            place: request.place,
            loanTime: moment().format(timeFormat),
            devolutionTime: '',
            timestamp: moment().unix(),
            resourceId: request.resourceId
        }
        this.props.firebase
            .addResourceLoan(loan)
            .then(() => {
                //Recurso: Disponível => Indisponível - user: Nome do Usuário
                const id = request.resourceId
                const name = request.resource
                const place = request.place
                const user = request.user //nome do usuário que pegou o recurso
                const resource = {
                    id: id,
                    name: name,
                    place: place,
                    status: false,
                    user: user
                }
                this.props.firebase
                    .updateResource(resource)
                    .then(() => {
                        this.deleteResourceRequest(request)
                    })
                    .catch(error => {
                        //Snackbar deu errado
                    })
            })
            .catch(error => {
                //Snackbar deu errado
            })
    }

    deleteResourceRequest = (request) => {
        this.props.firebase
            .deleteResourceRequest(request.id, request.place)
    }

    render() {

        const keyColumns = [
            {title: 'Chave', field: 'key'},
            {title: 'Nome do Usuário', field: 'user'},
            {title: 'Código do Usuário', field: 'code'},
            {title: 'Telefone do Usuário', field: 'phone'},
            {title: 'Curso do Usuário', field: 'course'}
        ]

        const resourceColumns = [
            {title: 'Recurso', field: 'resource'},
            {title: 'Nome do Usuário', field: 'user'},
            {title: 'Código do Usuário', field: 'code'},
            {title: 'Telefone do Usuário', field: 'phone'},
            {title: 'Curso do Usuário', field: 'course'}
        ]

        const keyList =
        <RequestDataTable 
            columns={keyColumns}
            data={this.state.keyRequests}
            title='Pedidos de Empréstimos de Chaves'
            type='Pedidos de Chave'
            accept={this.acceptKeyRequest}
            negate={this.deleteKeyRequest}
        />

        const resourceList =
        <RequestDataTable 
            columns={resourceColumns}
            data={this.state.resourceRequests}
            title='Pedidos de Empréstimos de Recursos'
            type='Pedidos de Recurso'
            accept={this.acceptResourceRequest}
            negate={this.deleteResourceRequest}
        />

        const list =
        <LoanTabs 
            keys={keyList}
            resources={resourceList}
        />

        return(
        <div>
            <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
                Pedidos de Empréstimos
            </Typography>
            {list}
        </div>
        )
    }
}

const condition = authUser => !!authUser;

const RequestsPage = compose(
  withAuthorization(condition),
  withFirebase,
)(RequestsPageBase);

export default RequestsPage;