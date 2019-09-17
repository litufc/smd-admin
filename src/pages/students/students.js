import React, { Component } from 'react';
import  { FirebaseContext } from '../../firebase/firebase-module';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ListTemplate from '../../components/list/list';

export default class Students extends Component {
    constructor(props){
        super(props);
        this.state = {
            students: []
        }
    }

    render(){
        return(
            <FirebaseContext.Consumer>
                {firebase => {
                    return <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <Typography variant="h4">
                                        Lista de Alunos
                                    </Typography>
                                    <ListTemplate students={this.state.students}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" onClick={() => firebase.registerStudent({name: 'Adrian Junior', code: '398533', course: 'Noturno', phone: '(85)996649522', email: 'adrianrfpj@gmail.com'})}>
                                        Adicionar Aluno por Formulário
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        Adicionar Alunos por Planilha
                                    </Button>
                                </Grid>
                            </Grid>
                }}
            </FirebaseContext.Consumer>
        )
    }
}