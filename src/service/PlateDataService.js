import axios from 'axios';


class PlateDataService {

    getAllPlates() {
        return axios.get('/api/plates');
    }

    getPlateById(id) {
        return axios.get(`/api/plates/${id}`);
    }

    createPlate(plate) {
        return axios.post('/api/plates', plate);
    }

    updatePlate(id, plate) {
        return axios.put(`/api/plates/${id}`, plate);
    }

}

export default new PlateDataService();