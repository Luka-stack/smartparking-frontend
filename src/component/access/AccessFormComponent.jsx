import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import AccessDataService from '../../service/AccessDataService';
import PlateDataService from '../../service/PlateDataService';


class AccessFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            dateFrom: "",
            dateTo: "",
            //plate: Object,
            plate: "",
            plates: [],
            title: "",
            message: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        PlateDataService.getAllPlates().then(
            response => this.setState({ plates: response.data })
        )

        if (this.state.id === "-1") {
            this.setState({ title: "Create Access" });
            return
        }

        this.setState({ title: "Update Access" });

        AccessDataService.getAccessById(this.state.id).then(
            response => this.setState({
                dateFrom: response.data.dateFrom,
                dateTo: response.data.dateTo,
                plate: response.data.plate
            })
        );
    }

    onSubmit(values) {
        let access = {
            id: this.state.id,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
            plate: JSON.parse(values.plate)
        }

        if (this.state.id === "-1") {
            AccessDataService.createAccess(access).then(
                () => this.props.history.push('/accesses')
            )
        } else {
            AccessDataService.updateAccess(this.state.id, access).then(
                () => this.props.history.push(`/accesses/${this.state.id}`)
            )

            this.setState({ message: "Access Successfully Updated" });
        }
    }

    render() {
        let { dateFrom, dateTo, plate } = this.state;

        this.state.plates = this.state.plates.filter(item => {
            return item.id != this.state.plate.id
        })

        return (
            <Container component='main' maxWidth="xs">
                <CssBaseline />
                
                <div className="EditPaper">
                    <Typography component="h1" variant="h4" style={{margin: "10px"}}>
                        { this.state.title }
                    </Typography>

                    <Formik
                        initialValues={{ dateFrom, dateTo, plate }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                    >
                        {props => (
                            <Form>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="date"
                                            variant="outlined"
                                            id="dateFrom"
                                            name="dateFrom"
                                            label="In Force From"
                                            helperText="Please select start date"
                                            value={props.values.dateFrom}
                                            onChange={props.handleChange}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            required
                                            fullWidth
                                            type="date"
                                            variant="outlined"
                                            id="dateTo"
                                            name="dateTo"
                                            label="In Force To"
                                            helperText="Please select end date"
                                            value={props.values.dateTo}
                                            onChange={props.handleChange}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            select
                                            variant="outlined"
                                            id="plateStr"
                                            name="plate"
                                            label="Access Owner"
                                            helperText="Please select access owner"
                                            //value={props.values.plate}
                                            onChange={props.handleChange}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            >   
                                                <option selected key={this.state.plate.id} value={JSON.stringify(this.state.plate)}>
                                                    {this.state.plate.firstName} &nbsp;
                                                    {this.state.plate.lastName} - &nbsp;
                                                    {this.state.plate.plateStr}
                                                </option>

                                                {this.state.plates?.map(option => (
                                                    <option key={option.id} value={JSON.stringify(option)}>
                                                        {option.firstName} {option.lastName} - {option.plateStr}
                                                    </option>
                                                ))}
                                        </TextField>
                                    </Grid>
                                </Grid> 

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{margin: "24px 0px 16px"}}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/accesses">View Access Records</Link>
                            <br />
                            {this.state.id != -1 &&
                                <Link to={ `/plates/details/${this.state.id}` }>View Plate Detail</Link>
                            }
                        </Grid>
                    </Grid>
                    {this.state.message &&
                        <div className="alert alert-success animated fadeOut">
                            { this.state.message }
                        </div>
                    }
                </div>
            </Container>
        )
    }
}

export default AccessFormComponent