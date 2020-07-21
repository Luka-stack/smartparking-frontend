import axios from 'axios';


class AccessDataService {

    getAllAccesses() {
        return axios.get('/api/accesses');
    }

    getAccessById(id) {
        return axios.get(`/api/accesses/${id}`);
    }

    createAccess(access) {
        return axios.post('/api/accesses', access);
    }

    updateAccess(id, access) {
        return axios.put(`/api/accesses/${id}`, access);
    }

    deleteAccess(id) {
        return axios.delete(`/api/accesses/${id}`);
    }
}

export default new AccessDataService();