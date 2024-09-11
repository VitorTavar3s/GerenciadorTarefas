import axios from "axios";

const api = axios.create({baseURL:'http://localhost:8080'});

export const getListas = () => api.get('/listas');
export const getListaById = (id) => api.get(`/listas/${id}`);
export const createLista = (lista) => api.post('/listas', lista);
export const updateLista = (id, lista) => api.put(`/listas/${id}`, lista);
export const deleteLista = (id) => api.delete(`/listas/${id}`);

export const createItem = (idLista,item) => api.post(`/listas/${idLista}/itens`,item);
export const updateItem = (idLista,item) => api.put(`/listas/${idLista}/itens/${item.id}`,item);
export const deleteItem = (idLista,itemId) =>api.delete(`/listas/${idLista}/itens/${itemId}`);