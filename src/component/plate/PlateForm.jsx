import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PlateDataService from '../../service/PlateDataService';


const PlateForm = (props) => {

    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [plateNum, setPlateNum] = useState("");

    const [firstLoad, setLoad] = useState(true);
    const [message, setMessage] = useState(false);
    const [title, setTitle] = useState("Create");

    const firstNameChanged = event => setFirstName(event.target.value);
    const lastNameChanged = event => setLastName(event.target.value);
    const plateNumChanged = event => setPlateNum(event.target.value);
    
    const load = () => {
        if (props.match.params.id !== "-1") {    
            PlateDataService.getPlateById(props.match.params.id).then(
                response => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setPlateNum(response.data.plateNum);
                    setId(response.data.id);
                }
            );

            setTitle("Update");
        }
    }

    const handleSubmit = vars => {
        if (props.match.params.id === "-1") {
            PlateDataService.createPlate(vars).then(
                response => {
                    setFirstName("");
                    setLastName("");
                    setPlateNum("");
                    setId(response.data.id);
                    setMessage(true);
                }
            )
        } 
        else {
            PlateDataService.updatePlate(props.match.params.id , vars).then(
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
                            <Link to={`/plates/details/${id}`} className="alert-link">
                                Go to details page.
                            </Link>
                        </div>
                    }
                </div>

                <Formik
                    initialValues={{ firstName, lastName, plateNum }}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="form-group">
                            <TextField 
                                variant="outlined"
                                required
                                fullWidth
                                id="plateNum"
                                label="Plate Number"
                                name="plateNum"
                                value={plateNum}
                                onChange={plateNumChanged}
                            />
                        </div>
                        <div className="row">
                        
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField 
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        value={lastName}
                                        onChange={lastNameChanged}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField 
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        value={firstName}
                                        onChange={firstNameChanged}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Form>
                </Formik>
                <div className="container mt-3 text-center">
                    <Link to="/accesses">View Owners Records</Link>
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