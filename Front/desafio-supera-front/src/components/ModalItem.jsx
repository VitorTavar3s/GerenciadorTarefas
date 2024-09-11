import React, { useState } from 'react';
import '../styles/modalItem.css';

const ModalItem = ({ isOpen, onClose, onSave }) => {
    const [titulo, setTitulo] = useState('');
    const [estado, setEstado] = useState('Pendente');
    const [prioridade, setPrioridade] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ titulo, estado, prioridade });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar Novo Item</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Estado:
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="Pendente">Pendente</option>
                            <option value="Em Progresso">Em Progresso</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                    </label>
                    <label>
                        Prioridade:
                        <input
                            type="checkbox"
                            checked={prioridade}
                            onChange={(e) => setPrioridade(e.target.checked)}
                        />
                    </label>
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalItem;
