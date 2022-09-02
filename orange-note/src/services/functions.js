import { toast } from "react-toastify";
import api from "./connection";

async function get(resource, token) {
  try {
    const response = await api.get(resource, {
      headers: {
        token,
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return error.response.data;
  }
}

async function post(resource, data, token) {
  try {
    const response = await api.post(resource, data, {
      headers: {
        token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
}

async function patch(resource, data, token) {
  try {
    const response = await api.patch(resource, data, {
      headers: {
        token,
      },
    });

    return { data: response.data, ok: response.ok };
  } catch (error) {
    return toast.error(error.message);
  }
}

async function del(resource, token) {
  try {
    const response = await api.delete(resource, {
      headers: {
        token,
      },
    });

    return { data: response.data, ok: response.ok };
  } catch (error) {
    return toast.error(error.message);
  }
}

export {
  get,
  post,
  patch,
  del,
};
