import React from 'react';
import Lista from '../components/Lista'
import Form from '../components/Form';
import { createLista } from '../services/api';

const Home = () => {
    const handleCreateLista = (lista) => {
        createLista(lista)
            .then(() => window.location.reload())
            .catch(error => console.error('Erro ao criar lista:', error));
    };

    return (
        <div>
            <h1>Gerenciador de Tarefas</h1>
            <Form onSubmit={handleCreateLista} />
            <Lista />
        </div>
    );
};

export default Home;