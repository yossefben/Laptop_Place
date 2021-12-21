import httpService from "./httpService";
import { URL_API } from "../config.json";

export function addFavProduct(id) {
  return httpService.patch(`${URL_API}/favProducts/add/${id}`);
}

export function createProduct(product) {
  return httpService.post(`${URL_API}/products/add`, product);
}

export function deleteProduct(id) {
  return httpService.delete(`${URL_API}/products/del/${id}`);
}

export function editProduct({ _id, ...body }) {
  return httpService.put(`${URL_API}/products/edit/${_id}`, body);
}

export function getAllProducts() {
  return httpService.get(`${URL_API}/products/all`);
}

export function getMyProducts() {
  return httpService.get(`${URL_API}/products/myProducts`);
}

export function getMyFavProducts() {
  return httpService.get(`${URL_API}/favProducts/myFavs`);
}

export function getProduct(id) {
  return httpService.get(`${URL_API}/products/single/${id}`);
}

export function RemoveFavProduct(id) {
  return httpService.patch(`${URL_API}/favProducts/remove/${id}`);
}

export function searchProducts(e) {
  return httpService.get(`${URL_API}/products/search?q=${e}`);
}

export function uploadFile(file) {
  return httpService.post(`${URL_API}/upload/`, file);
}

const productsService = {
  addFavProduct,
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getMyProducts,
  getMyFavProducts,
  getProduct,
  uploadFile,
  searchProducts,
};

export default productsService;
