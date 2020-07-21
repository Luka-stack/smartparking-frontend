import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import PlateDataService from '../../service/PlateDataService';


class PlateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            plateStr: "",
            title: "",
            message: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "-1") {
            this.setState({ title: "Create Plate" });
            return
        }

        this.setState({ title: "Update Plate" });

        PlateDataService.getPlateById(this.state.id).then(
            response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                plateStr: response.data.plateStr
            })
        );
    }

    onSubmit(values) {
        let plate = {
            id: this.state.id,
            firstName: values.firstName,
            lastName: values.lastName,
            plateStr: values.plateStr
        }

        if (this.state.id === "-1") {
            PlateDataService.createPlate(plate).then(
                () => this.props.history.push('/plates')
            )
        } else {
            PlateDataService.updatePlate(this.state.id, plate).then(
                () => this.props.history.push(`/plates/${this.state.id}`)
            )

            this.setState({ message: "Plate Successfully Updated" });
        }
    }

    render() {
        let { firstName, lastName, plateStr } = this.state;

        return (
            <Container component='main' maxWidth="xs">
                <CssBaseline />
                
                <div className="EditPaper">
                    <Typography component="h1" variant="h4" style={{margin: "10px"}}>
                        { this.state.title }
                    </Typography>

                    <Formik
                        initialValues={{ firstName, lastName, plateStr }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                    >
                        {props => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="plateStr"
                                            label="Plate"
                                            name="plateStr"
                                            value={props.values.plateStr}
                                            onChange={props.handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            value={props.values.lastName}
                                            onChange={props.handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            name="firstName"
                                            value={props.values.firstName}
                                            onChange={props.handleChange}
                                        />
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
                            <Link to="/plates">View Plate Records</Link>
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

export default PlateComponent