import axios from 'axios';


class PlateDataService {

    async retrieveAllPlates() {
        return await axios.get('/api/plate');
    }

    async retrievePlateById(id) {
        return await axios.get(`/api/plate/${id}`);
    }

    async createPlate(plate) {
        return await axios.post('/api/plate', plate);
    }

    async updatePlate(id, plate) {
        return await axios.put(`/api/plate/${id}`, plate);
    }

}

export default new PlateDataService();