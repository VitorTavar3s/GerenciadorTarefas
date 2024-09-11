import React, { useState, useEffect } from 'react';
import '../styles/modalEditLista.css';

const ModalEditLista = ({ isOpen, onClose, onSave, lista }) => {
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        if (lista) {
            setTitulo(lista.titulo);
        }
    }, [lista]);

    const handleSubmit = () => {
        onSave({ ...lista, titulo });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Lista</h2>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Novo título da lista"
                />
                <button onClick={handleSubmit}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default ModalEditLista;