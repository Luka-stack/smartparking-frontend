import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";  


const PlateFormView = (props) => {

    const { handleSubmit, register, errors } = useForm();

    if (!props.plate && props.plate !== "") {
        return <CircularProgress />;
    }

    return (
        <form onSubmit={handleSubmit(props.submit)} id="former">
            <div className="form-group">
                <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    label="Plate Number"
                    name="plateNum"
                    inputRef={register}
                    defaultValue={props.plate.plateNum}
                />
            </div>
            <div className="row">
            
                <div className="col-md-6">
                    <div className="form-group">
                        <TextField 
                            variant="outlined"
                            required
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            inputRef={register}
                            defaultValue={props.plate.lastName}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <TextField 
                            variant="outlined"
                            required
                            fullWidth
                            label="First Name"
                            name="firstName"
                            inputRef={register}
                            defaultValue={props.plate.firstName}
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
        </form>
    )
}

export default PlateFormView;