import React, { useState } from 'react';
import PlateDataService from '../../service/PlateDataService';
import PlateTable from './PlateTable';


const PlateList = () => {

    const [plates, setPlates] = useState();
    const [firstLoad, setLoad] = useState(true);
    let isLoading = true;

    const refreshPlates = () => {
        PlateDataService.getAllPlates().then(
            response => setPlates(response.data)
        )
    }

    const deletePlate = (id) => {
        if (window.confirm('Are you sure you wish to delete this plate?')) {
            PlateDataService.deletePlateById(id).then(
                () => refreshPlates()
            )
        }
    }

    if (firstLoad) {
        refreshPlates()
        setLoad(false);
    }

    return (
        <div className="d-flex justify-content-center">

            <div className="col-md-10">

                <div className="mt-5 mb-5 d-flex justify-content-center">
                    <div className="w-50 text-center">
                        <h3 className="display-4">Plate Owners</h3>
                        <button type="button" className="btn btn-outline-success addButton">
                            Create Plate Owner
                        </button>
                    </div>
                </div>

                <PlateTable plates={plates} deletePlate={deletePlate}/>
            </div>
        </div>
    )
}

export default PlateList;