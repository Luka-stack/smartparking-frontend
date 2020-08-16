import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const AccessFormView = (props) => {

    const { handleSubmit, register, errors } = useForm();

    if (!props.access && props.access !== "") {
        return <CircularProgress />;
    }

    return (
        <form onSubmit={handleSubmit(props.submit)} id="former">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <TextField
                            required
                            fullWidth
                            type="date"
                            variant="outlined"
                            name="dateFrom"
                            label="In Force From"
                            helperText="Please select start date"
                            inputRef={register}
                            defaultValue={props.access.dateFrom}
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
                            name="dateTo"
                            label="In Force To"
                            helperText="Please select end date"
                            inputRef={register}
                            defaultValue={props.access.dateTo}
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
                    name="plate"
                    label="Access Owner"
                    helperText="Please select access owner"
                    inputRef={register}
                    SelectProps={{
                        native: true,
                    }}
                    >      
                        {props.access.plate? (
                            <option key={props.access.plate.id} value={JSON.stringify(props.access.plate)}>
                                {props.access.plate?.lastName} &nbsp;
                                {props.access.plate?.firstName} - &nbsp;
                                {props.access.plate?.plateNum}
                            </option>
                        ) : (
                            <option></option>
                        )}

                        {props.plates?.filter((plate) => {
                            if (props.access.plate) {
                                return plate.id !== props.access.plate.id
                            }
                            return true;
                        }).map((option) => (
                            <option key={option.id} value={JSON.stringify(option)}>
                                {option.lastName} {option.firstName} - {option.plateNum}
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
        </form>
    )
}

export default AccessFormView;