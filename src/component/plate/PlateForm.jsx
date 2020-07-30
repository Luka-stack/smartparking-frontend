import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PlateDataService from '../../service/PlateDataService';

const PlateForm = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [plateNum, setPlateNum] = useState("");

    const firstNameChanged = event => setFirstName(event.target.value);
    const lastNameChanged = event => setLastName(event.target.value);
    const plateNumChanged = event => setPlateNum(event.target.value);
    
    const handleSubmit = vars => {
        console.log(vars);
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="mt-5 col-md-5">

                <div className="mt-2 mb-5 text-center">
                    <h3 className="display-4">Create Owner</h3>
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
                                label="Plate"
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
            </div>
        </div>
    )
}

export default PlateForm;