import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccessDataService from '../../service/AccessDataService';
import PlateDataService from '../../service/PlateDataService';


const AccessForm = (props) => {

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [plate, setPlate] = useState("");
    const [plates, setPlates] = useState([]);

    const [firstLoad, setLoad] = useState(true);
    const [message, setMessage] = useState(false);
    const [title, setTitle] = useState("Create");

    const dateFromChanged = event => setDateFrom(event.target.value);
    const dateToChanged = event => setDateTo(event.target.value);
    const plateChanged = event => setPlate(JSON.parse(event.target.value));
    
    const load = () => {
        if (props.match.params.id !== "-1") {    
            AccessDataService.getAccessById(props.match.params.id).then(
                response => {
                    setDateFrom(response.data.dateFrom);
                    setDateTo(response.data.dateTo);
                    setPlate(response.data.plate);
                }
            );

            setTitle("Update");
        }

        PlateDataService.getAllPlates().then(
            response => setPlates(response.data)
        )
    }

    const handleSubmit = vars => {
        if (props.match.params.id === "-1") {
            AccessDataService.createAccess(vars).then(
                () => {
                    setDateFrom("");
                    setDateTo("");
                    setMessage(true);
                }
            )
        } 
        else {
            AccessDataService.updateAccess(props.match.params.id , vars).then(
                () => setMessage(true)
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
                            <Link to={`/plates/details/${plate.id}`} className="alert-link">
                                Go to details page.
                            </Link>
                        </div>
                    }
                </div>

                <Formik
                    initialValues={{ dateFrom, dateTo, plate }}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField
                                        required
                                        fullWidth
                                        type="date"
                                        variant="outlined"
                                        id="dateFrom"
                                        name="dateFrom"
                                        label="In Force From"
                                        helperText="Please select start date"
                                        value={dateFrom}
                                        onChange={dateFromChanged}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField 
                                        required
                                        fullWidth
                                        type="date"
                                        variant="outlined"
                                        id="dateTo"
                                        name="dateTo"
                                        label="In Force To"
                                        helperText="Please select end date"
                                        value={dateTo}
                                        onChange={dateToChanged}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="form-group">
                            <TextField
                                required
                                fullWidth
                                select
                                variant="outlined"
                                id="plateNum"
                                name="plateNum"
                                label="Access Owner"
                                helperText="Please select access owner"
                                //value={plate}
                                onChange={plateChanged}
                                SelectProps={{
                                    native: true,
                                }}
                                >   
                                    <option key={plate.id} value={JSON.stringify(plate)}>
                                        {plate.firstName} &nbsp;
                                        {plate.lastName} - &nbsp;
                                        {plate.plateNum}
                                    </option>

                                    {plates?.map(option => (
                                        <option key={option.id} value={JSON.stringify(option)}>
                                            {option.firstName} {option.lastName} - {option.plateNum}
                                        </option>
                                    ))}
                                </TextField>
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