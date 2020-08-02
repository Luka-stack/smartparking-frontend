import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccessDataService from '../../service/AccessDataService';
import AccessListView from './AccessListComponent.view';
import { CircularProgress } from '@material-ui/core';


const AccessList = () => {

    const [accesses, setAccesses] = useState([]);
    const [firstLoad, setLoad] = useState(true);
    let isLoading = true;

    const refresh = () => {
        AccessDataService.getAllAccesses().then(
            response => setAccesses(response.data)
        )
    }

    const deleteClicked = (id) => {
        if (window.confirm('Are you sure you wish to delete this access?')) {
            AccessDataService.deleteAccessById(id).then(
                () => refresh()
            )
        }
    }

    if (firstLoad) {
        refresh()
        setLoad(false);
    }

    if (accesses !== "") isLoading = false;

    return (
        <div className="d-flex justify-content-center">

        <div className="col-md-10">

            <div className="mt-5 mb-5 d-flex justify-content-center">
                <div className="w-50 text-center">
                    <h3 className="display-4">Parking Accesses</h3>
                    <Link to="/accesses/-1" className="btn btn-outline-success addButton">
                        Add Parking Access
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <AccessListView accesses={accesses} deleteClicked={deleteClicked}/>
            )}
        </div>
    </div>
    )
}

export default AccessList;