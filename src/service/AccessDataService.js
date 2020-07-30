import axios from 'axios';


class AccessDataService {

    async getAllAccesses() {
        return await axios.get('/api/accesses');
    }

    async getAccessById(id) {
        return axios.get(`/api/accesses/${id}`);
    }

    async createAccess(access) {
        return axios.post('/api/accesses', access);
    }

    async updateAccess(id, access) {
        return axios.put(`/api/accesses/${id}`, access);
    }

    async deleteAccessById(id) {
        return axios.delete(`/api/accesses/${id}`);
    }
}

export default new AccessDataService();