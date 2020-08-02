import React, { useState } from 'react';
import PlateDataService from '../../service/PlateDataService';
import AccessDataService from '../../service/AccessDataService';
import PlateDetialsView from './PlateDetailsComponent.view';


const PlateDetails = (props) => {

    const [plate, setPlate] = useState();
    const [firstLoad, setLoad] = useState(true);
    let isLoading = true;

    const refresh = () => {
        PlateDataService.getPlateById(props.match.params.id).then(
            response => {
                console.log(response)
                setPlate(response.data)
            }
        )        
    }

    if (firstLoad) {
        refresh();
        setLoad(false);
    }

    const deletePlate = (id) => {
        if (window.confirm('Are you sure you wish to delete this plate?')) {
            PlateDataService.deletePlateById(id).then(
                () => props.history.push('/plates')
            )
        }
    }

    const deleteAccess = (id) => {
        if (window.confirm('Are you sure you wish to delete this access?')) {
            AccessDataService.deleteAccessById(id).then(
                () => refresh()
            )
        }
    }

    return (
        <PlateDetialsView plate={plate} deletePlate={deletePlate} deleteAccess={deleteAccess}/>
    )
}

export default PlateDetails;