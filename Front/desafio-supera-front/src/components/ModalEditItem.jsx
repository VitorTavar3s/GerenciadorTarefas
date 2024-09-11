import React, { useState, useEffect } from 'react';

const ModalEditItem = ({ isOpen, onClose, onSave, item }) => {
    const [titulo, setTitulo] = useState('');
    const [estado, setEstado] = useState('Pendente');
    const [prioridade, setPrioridade] = useState(false);

    useEffect(() => {
        if (item) {
            setTitulo(item.titulo);
            setEstado(item.estado);
            setPrioridade(item.prioridade);
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: item.id, titulo, estado, prioridade });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Item</h2>
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

export default ModalEditItem;