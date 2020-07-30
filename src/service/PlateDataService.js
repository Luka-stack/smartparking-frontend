import axios from 'axios';


class PlateDataService {

    async getAllPlates() {
        return await axios.get('/api/plates');
    }

    async getPlateById(id) {
        return await axios.get(`/api/plates/${id}`);
    }

    async createPlate(plate) {
        return await axios.post('/api/plates', plate);
    }

    async updatePlate(id, plate) {
        return await axios.put(`/api/plates/${id}`, plate);
    }

    async deletePlateById(id) {
        return await axios.delete(`/api/plates/${id}`);
    }

}

export default new PlateDataService();