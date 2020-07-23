import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Container } from '@material-ui/core';
import PlateDataService from '../../service/PlateDataService';



class PlateDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            plateStr: "",
            accesses: []
        }
    }

    componentDidMount() {
        PlateDataService.getPlateById(this.state.id).then(
            response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                plateStr: response.data.plateStr
            })
        )
    }

    render() {
        return (
            <Container>
                <div class="jumbotron mb-5 p-3 row p-md-5 text-white rounded bg-dark">
                    <div class="col-md-6 px-0">
                        <div class="ard-body d-flex flex-column align-items-center">
                            <h1 class="display-5"> License Plate </h1>
                            <h2 class="font-italic"> {this.state.plateStr.split(/([0-9]+)/) [0]} </h2>
                            <h2 class="font-italic"> {this.state.plateStr.split(/([0-9]+)/) [1]} </h2>
                        </div>
                    </div>
                    <div class="col-md-6 px-0">
                        <div class="card-body d-flex flex-column align-items-center">
                            <h1 class="display-5"> Plate Owner </h1>
                            <h3 class="font-italic"> {this.state.lastName} </h3>
                            <h3 class="font-italic"> {this.state.firstName} </h3>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <button type="button" className="btn btn-danger" style={{width: "100%"}}>
                                    Delete This Entity
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <button type="button" className="btn btn-primary" style={{width: "100%"}}>
                                    Update This Entity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="col-md-12 text-center">
                        <h3 class="display-5">Accesses</h3>
                    </div>

                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">In Force Since</th>
                                <th scope="col">In Force Till</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>15/10/2020</td>
                            <td>15/10/2020</td>
                            <td>
                                <IconButton aria-label="delete" style={{padding: "1px 5px"}}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                                <IconButton aria-label="update" style={{padding: "1px 5px"}}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </td>
                            </tr>
                            <tr>
                            <td>15/10/2020</td>
                            <td>15/10/2020</td>
                            <td>
                                <IconButton aria-label="delete" style={{padding: "1px 5px"}}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                                <IconButton aria-label="update" style={{padding: "1px 5px"}}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </td>
                            </tr>
                            <tr>
                            <td>15/10/2020</td>
                            <td>15/10/2020</td>
                            <td>
                                <IconButton aria-label="delete" style={{padding: "1px 5px"}}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                                <IconButton aria-label="update" style={{padding: "1px 5px"}}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </Container>
        )
    }
}

export default PlateDetailsComponent