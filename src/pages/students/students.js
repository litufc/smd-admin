import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export default class Students extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography variant="h4">
                            Lista de Alunos
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary">
                            Adicionar Aluno por Formulário
                        </Button>
                        <Button variant="contained" color="secondary">
                            Adicionar Alunos por Planilha
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}