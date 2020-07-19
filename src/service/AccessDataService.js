import axios from 'axios';


class AccessDataService {

    async getAllAccesses() {
        return await axios.get('/api/access');
    }

    async getAccessById(id) {
        return await axios.get(`/api/access/${id}`);
    }

    async createAccess(access) {
        return await axios.post('/api/access', access);
    }

    async updateAccess(id, access) {
        return await axios.put(`/api/access/${id}`, access);
    }
}

export default new AccessDataService();