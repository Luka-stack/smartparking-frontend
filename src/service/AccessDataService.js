import axios from 'axios';


class AccessDataService {

    async getAllAccesses() {
        return await axios.get('/api/accesses');
    }

    async getAccessById(id) {
        return await axios.get(`/api/accesses/${id}`);
    }

    async createAccess(access) {
        return await axios.post('/api/accesses', access);
    }

    async updateAccess(id, access) {
        return await axios.put(`/api/accesses/${id}`, access);
    }

    async deleteAccessById(id) {
        return await axios.delete(`/api/accesses/${id}`);
    }
}

export default new AccessDataService();