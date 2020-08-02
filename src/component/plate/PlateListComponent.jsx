import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";  
import PlateDataService from '../../service/PlateDataService';
import PlateListView from './PlateListComponent.view';


const PlateList = () => {

    const [plates, setPlates] = useState("");
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

    if (plates !== "") isLoading = false;

    return (
        <div className="d-flex justify-content-center">

            <div className="col-md-10">

                <div className="mt-5 mb-5 d-flex justify-content-center">
                    <div className="w-50 text-center">
                        <h3 className="display-4">Plate Owners</h3>
                        <Link to="/plates/-1" className="btn btn-outline-success addButton">
                            Create Plate Owner
                        </Link>
                    </div>
                </div>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <PlateListView plates={plates} deletePlate={deletePlate}/>
                )}
            </div>
        </div>
    )
}

export default PlateList;