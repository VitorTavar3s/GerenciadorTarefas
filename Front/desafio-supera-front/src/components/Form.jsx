import React, { useState } from 'react';
import '../styles/form.css';

const Form = ({ onSubmit }) => {
    const [titulo, setTitulo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ titulo });
        setTitulo('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Nome da lista"
            />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default Form;