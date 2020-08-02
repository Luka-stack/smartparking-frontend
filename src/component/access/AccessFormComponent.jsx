import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import AccessDataService from '../../service/AccessDataService';
import PlateDataService from '../../service/PlateDataService';
import AccessFormView from './AccessFormComponent.view';


const AccessForm = (props) => {

    const [access, setAccess] = useState();
    const [refreneId, setId] = useState();
    const [plates, setPlates] = useState([]);

    const [firstLoad, setLoad] = useState(true);
    const [message, setMessage] = useState(false);
    const [title, setTitle] = useState("Create");
    
    const load = () => {
        if (props.match.params.id !== "-1") {    
            AccessDataService.getAccessById(props.match.params.id).then(
                response => setAccess(response.data)
            );

            setTitle("Update");
        }
        else {
            setAccess("");
        }

        PlateDataService.getAllPlates().then(
            response => setPlates(response.data)
        );
    }

    const onSubmit = vars => {
        vars.plate = JSON.parse(vars.plate)
        if (props.match.params.id === "-1") {
            AccessDataService.createAccess(vars).then(
                response => {
                    setId(response.data.plate.id);
                    setAccess("");
                    setMessage(true);
                }
            )
        } 
        else {
            access.dateFrom = vars.dateFrom
            access.dateTo = vars.dateTo
            access.plate = vars.plate
            AccessDataService.updateAccess(props.match.params.id, access).then(
                response => {
                    setId(response.data.plate.id);;
                    setMessage(true);
                }
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
                    <h3 className="display-4">{title} Access</h3>
                    {message &&
                        <div className="alert alert-success hideMe" role="alert">
                            Access Successfully Saved.&nbsp;
                            <Link to={`/plates/details/${refreneId}`} className="alert-link">
                                Go to details page.
                            </Link>
                        </div>
                    }
                </div>

                <AccessFormView access={access} plates={plates} submit={onSubmit} />

                <div className="container mt-3 text-center">
                    <Link to="/accesses">View Access Records</Link>
                    <br />
                    {props.match.params.id !== "-1" &&
                        <Link to={ `/plates/details/${props.match.params.id}` }>
                            View Plate Detail
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default AccessForm;