import axios from "axios";
import { toast } from "react-toastify";

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setDefaultCommonHeader,
};

axios.interceptors.response.use(null, (err) => {
  console.dir(err);
  const { response } = err;
  if (!response) {
    toast.error("Bad connection to server 🤢", {
      position: "top-center",
      theme: "colored",
    });
  }

  if (response && response.status === 401) {
    window.location = "/logout";
  }

  if (response && response.status >= 403) {
    toast.error("An unexpected error occurred", {
      position: "top-center",
      theme: "colored",
    });
  }
  return Promise.reject(err);
});

export function setDefaultCommonHeader(header, value) {
  axios.defaults.headers.common[header] = value;
  console.log(axios.defaults.headers.common);
}

export default httpService;
