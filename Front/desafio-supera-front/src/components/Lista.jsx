import React, { useEffect, useState } from 'react';
import { getListas, getListaById, updateLista,deleteLista, createItem, updateItem, deleteItem } from '../services/api';
import ModalItem from './ModalItem';
import ModalEditItem from './ModalEditItem';
import ModalEditLista from './ModalEditLista';

const Lista = () => {
    const [listas, setListas] = useState([]);
    const [expandedListaId, setExpandedListaId] = useState(null);
    const [isAdicionarModalOpen, setIsAdicionarModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [isEditarListaModalOpen, setIsEditarListaModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentListId, setCurrentListId] = useState(null);
    const [filtroPrioridade, setFiltroPrioridade] = useState('todos');

    useEffect(() => {
        getListas()
            .then(response => {
                setListas(response.data); 
            })
            .catch(error => console.error('Erro ao buscar listas:', error));
    }, []);

    const handleListaClick = (id) => {
        if (expandedListaId === id) {
            setExpandedListaId(null);
            return;
        }

        
        getListaById(id)
            .then(response => {
                setListas(prevListas =>
                    prevListas.map(lista =>
                        lista.id === id ? { ...lista, itens: response.data.itens } : lista
                    )
                );
                setExpandedListaId(id);           
            })
            .catch(error => {
                console.error('Erro ao buscar lista por ID:', error);              
            });
    };


    const handleAdicionarItem = (listaId) => {
        setCurrentListId(listaId);
        setIsAdicionarModalOpen(true)
    };

    const handleEditItem = (item) => {
        setCurrentListId(item.listaId);
        setCurrentItem(item); 
        setIsEditarModalOpen(true);
    };
    const handleEditLista = (listaId) => {
        setCurrentListId(listaId);
        setIsEditarListaModalOpen(true);
    };


    const handleSaveAdicionar = (item) => {
        createItem(currentListId, item)
            .then(response => {
                setListas(prevListas =>
                    prevListas.map(lista =>
                        lista.id === currentListId
                            ? { ...lista, itens: [...lista.itens, response.data] }
                            : lista
                    )
                );
            })
            .catch(error => console.error('Erro ao adicionar item:', error));
    };

    const handleSaveEditar = (item) => {
        updateItem(currentListId, item)
            .then(response => {
                setListas(prevListas =>
                    prevListas.map(lista =>
                        lista.id === currentListId
                            ? { ...lista, itens: lista.itens.map(it =>
                                it.id === item.id ? response.data : it
                            ) }
                            : lista
                    )
                );
            })
            .catch(error => console.error('Erro ao atualizar item:', error));
    };
    
    const handleDeleteItem = (itemId,listaId) => {
        const confirmDelete = window.confirm("Deseja mesmo excluir o item?");
        if (confirmDelete) {
        deleteItem(listaId,itemId)
            .then(() => {
                setListas(prevListas =>
                    prevListas.map(lista =>
                        ({
                            ...lista,
                            itens: lista.itens.filter(item => item.id !== itemId)
                        })
                    )
                );
            })
            .catch(error => console.error('Erro ao deletar item:', error));
        }
    };

    const handleDeleteLista = (listaId) => {
        const confirmDelete = window.confirm("Deseja mesmo excluir esta lista?");
        if (confirmDelete) {
            deleteLista(listaId)
                .then(() => {
                    setListas(prevListas => prevListas.filter(lista => lista.id !== listaId));
                    console.log('Lista deletada com sucesso');
                })
                .catch(error => console.error('Erro ao deletar lista:', error));
        }
    };

    const handleSaveEditarLista = (listaAtualizada) => {
        console.log('Lista Atualizada:', listaAtualizada);
    console.log('Current List ID:', currentListId);
        updateLista(currentListId, listaAtualizada)
            .then(response => {
                setListas(prevListas =>
                    prevListas.map(lista =>
                        lista.id === currentListId ? response.data : lista
                    )
                );
            })
            .catch(error => console.error('Erro ao atualizar lista:', error));
    };

    const filtrarItens = (itens) => {
        if (filtroPrioridade === 'alta') {
            return itens.filter(item => item.prioridade);
        }
        return itens;
    };
    

    return (
        <div className='container'>
            <h1>Listas de Tarefas</h1>
            <div className='filtro-prioridade'>
                <label htmlFor='prioridade'>Filtrar por Prioridade: </label>
                <select
                    id='prioridade'
                    value={filtroPrioridade}
                    onChange={(e) => setFiltroPrioridade(e.target.value)}
                >
                    <option value='todos'>Todos</option>
                    <option value='alta'>Prioridade Alta</option>
                </select>
            </div>
            <ul className='lista'>
            {listas.length > 0 ? (
                        listas.map(lista => (
                            <li key={lista.id} className='lista-item'>
                                <div className='lista-header' onClick={() => handleListaClick(lista.id)}>
                                <h2>{lista.titulo}</h2>
                                <button className='action-button' onClick={() => handleAdicionarItem(lista.id)}><i className='material-icons'>add</i>Adicionar Item</button>
                                <button className='action-button' onClick={() => handleEditLista(lista.id)}><i className='material-icons'>edit</i></button>
                                <button className='action-button' onClick={() => handleDeleteLista(lista.id)}><i className='material-icons'>delete</i></button>
                                </div>
                                {expandedListaId === lista.id && (
                                    <ul className='item-list'>
                                        {lista.itens.length > 0 ? (
                                            filtrarItens(lista.itens).map(item => (
                                                <li key={item.id} className='item'>
                                                     <span>{item.titulo}</span> -  
                                                     <span>{item.estado}</span> -
                                                     <span className={item.prioridade ? 'item-priority' : ''}>
                                                        {item.prioridade ? 'Prioridade Alta' : 'Prioridade Normal'}
                                                        <button className='action-button' onClick={() => handleEditItem({...item, listaId: lista.id})}><i className='material-icons'>edit</i></button>
                                                        <button className='action-button' onClick={() => handleDeleteItem(item.id,lista.id)}><i className='material-icons'>delete</i></button>
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <p>Nenhum item encontrado.</p>
                                        )}
                                    </ul>
                                    
                                )}
                            </li>
                        ))
                    ) : (
                        <p>Nenhuma lista encontrada.</p>
                    )}  
            </ul>
            <ModalItem
                isOpen={isAdicionarModalOpen}
                onClose={() => setIsAdicionarModalOpen(false)}
                onSave={handleSaveAdicionar}
            />
            <ModalEditItem
                isOpen={isEditarModalOpen}
                onClose={() => setIsEditarModalOpen(false)}
                onSave={handleSaveEditar}
                item={currentItem}
            />
            <ModalEditLista
                isOpen={isEditarListaModalOpen}
                onClose={() => setIsEditarListaModalOpen(false)}
                onSave={handleSaveEditarLista}
                lista={listas.find(lista => lista.id === currentListId)}
            />
        </div>
    );
};

export default Lista;
