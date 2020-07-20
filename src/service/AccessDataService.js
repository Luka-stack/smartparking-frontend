import axios from 'axios';


class AccessDataService {

    getAllAccesses() {
        return axios.get('/api/access');
    }

    getAccessById(id) {
        return axios.get(`/api/access/${id}`);
    }

    createAccess(access) {
        return axios.post('/api/access', access);
    }

    updateAccess(id, access) {
        return axios.put(`/api/access/${id}`, access);
    }
}

export default new AccessDataService();