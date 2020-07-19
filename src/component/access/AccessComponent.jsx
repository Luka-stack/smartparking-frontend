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


class AccessComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            dateFrom: "",
            dateTo: "",
            title: "",
            message: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "-1") {
            this.setState({ title: "Create Access" });
            return
        }

        this.setState({ title: "Update Access" });

        AccessDataService.getAccessById(this.state.id).then(
            response => this.setState({
                dateFrom: response.data.dateFrom,
                dateTo: response.data.dateTo,
            })
        );
    }

    onSubmit(values) {
        let access = {
            id: this.state.id,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
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
        let { dateFrom, dateTo } = this.state;

        return (
            <Container component='main' maxWidth="xs">
                <CssBaseline />
                
                <div className="EditPaper">
                    <Typography component="h1" variant="h4" style={{margin: "10px"}}>
                        { this.state.title }
                    </Typography>

                    <Formik
                        initialValues={{ dateFrom, dateTo }}
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
                                            id="dateFrom"
                                            label="In Force From"
                                            name="dateFrom"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={props.values.dateFrom}
                                            onChange={props.handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField 
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="dateTo"
                                            label="In Force To"
                                            name="dateTo"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={props.values.dateTo}
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
                            <Link to="/accesses">View Access Records</Link>
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

export default AccessComponent