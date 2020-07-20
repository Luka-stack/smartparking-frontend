import axios from 'axios';


class PlateDataService {

    getAllPlates() {
        return axios.get('/api/plate');
    }

    getPlateById(id) {
        return axios.get(`/api/plate/${id}`);
    }

    createPlate(plate) {
        return axios.post('/api/plate', plate);
    }

    updatePlate(id, plate) {
        return axios.put(`/api/plate/${id}`, plate);
    }

}

export default new PlateDataService();