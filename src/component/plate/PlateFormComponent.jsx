import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PlateDataService from '../../service/PlateDataService';
import PlateFormView from './PlateFormComponent.view';


const PlateForm = (props) => {

    const [plate, setPlate] = useState();

    const [refrenceId, setRefernceId] = useState(0);
    const [firstLoad, setLoad] = useState(true);
    const [message, setMessage] = useState(false);
    const [title, setTitle] = useState("Create");

    const load = () => {
        if (props.match.params.id !== "-1") {    
            PlateDataService.getPlateById(props.match.params.id).then(
                response => setPlate(response.data)
            );

            setTitle("Update");
        }
        else {
            setPlate("");
        }
    }

    const onSubmit = vars => {
        if (props.match.params.id === "-1") {
            PlateDataService.createPlate(vars).then(
                response => {
                    setPlate("");
                    setRefernceId(response.data.id);
                    setMessage(true);
                }
            )
        } 
        else {
            plate.firstName = vars.firstName
            plate.lastName = vars.lastName
            plate.plateNum = vars.plateNum
            PlateDataService.updatePlate(props.match.params.id , plate).then(
                () => props.history.push(`/plates/details/${props.match.params.id}`)
            )
        }
    }

    if (firstLoad) {
        load();
        setLoad(false);
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="mt-5 col-md-5">

                <div className="mt-2 mb-3 text-center">
                    <h3 className="display-4">{title} Owner</h3>
                    {message &&
                        <div className="alert alert-success hideMe" role="alert">
                            Successfully added Plate Onwer.&nbsp;
                            <Link to={`/plates/details/${refrenceId}`} className="alert-link">
                                Go to details page.
                            </Link>
                        </div>
                    }
                </div>

                {!firstLoad && 
                    <PlateFormView plate={plate} submit={onSubmit} />
                }
                
                <div className="container mt-3 text-center">
                    <Link to="/plates">View Owners Records</Link>
                    <br />
                    {props.match.params.id !== "-1" &&
                        <Link to={ `/plates/details/${props.match.params.id}` }>
                            View Plate Owner Detail
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default PlateForm;