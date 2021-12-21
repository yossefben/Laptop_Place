import httpService from "./httpService";
import { URL_API } from "../config.json";

export function addFavCard(id) {
  return httpService.patch(`${URL_API}/favCards/add/${id}`);
}

export function createCard(card) {
  return httpService.post(`${URL_API}/cards/add`, card);
}

export function deleteCard(id) {
  return httpService.delete(`${URL_API}/cards/del/${id}`);
}

export function editCard({ _id, ...body }) {
  return httpService.put(`${URL_API}/cards/edit/${_id}`, body);
}

export function getAllCards() {
  return httpService.get(`${URL_API}/cards/all`);
}

export function getCard(id) {
  return httpService.get(`${URL_API}/cards/single/${id}`);
}

export function getMyFavCards() {
  return httpService.get(`${URL_API}/favCards/myFavs`);
}

export function getMyCards() {
  return httpService.get(`${URL_API}/cards/myCards`);
}

export function RemoveFavCard(id) {
  return httpService.patch(`${URL_API}/favCards/remove/${id}`);
}

export function searchCards(e) {
  return httpService.get(`${URL_API}/cards/search?q=${e}`);
}

const usersService = {
  addFavCard,
  createCard,
  deleteCard,
  editCard,
  getMyCards,
  getCard,
  getAllCards,
  RemoveFavCard,
  searchCards,
};

export default usersService;
