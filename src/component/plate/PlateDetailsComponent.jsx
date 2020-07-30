import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Container } from '@material-ui/core';
import PlateDataService from '../../service/PlateDataService';
import AccessDataService from '../../service/AccessDataService';


class PlateDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            plateNum: "",
            accesses: []
        }

        console.log(this.state.id);

        this.refreshPlate = this.refreshPlate.bind(this);
        this.deletePlateClicked = this.deletePlateClicked.bind(this);
        this.updatePlateClicked = this.updatePlateClicked.bind(this);
        this.deleteAccessClicked = this.deleteAccessClicked.bind(this);
        this.updateAccessClicked = this.updateAccessClicked.bind(this);
    }

    componentDidMount() {
        this.refreshPlate();
    }

    deletePlateClicked(id) {
        if (window.confirm('Are you sure you wish to delete this access?')) {
            AccessDataService.deleteAccess(id).then(
                () => {
                    this.setState({ message: 'Successfully deleted access.'});
                    this.props.history.push('/plates');
                }
            )
        }
    }

    updatePlateClicked(id) {
        this.props.history.push(`/plates/${id}`);
    }

    deleteAccessClicked(id) {
        if (window.confirm('Are you sure you wish to delete this access?')) {
            AccessDataService.deleteAccess(id).then(
                () => {
                    this.setState({ message: 'Successfully deleted access.'});
                    this.refreshPlate();
                }
            )
        }
    }

    updateAccessClicked(id) {
        this.props.history.push(`/accesses/${id}`);
    }

    createAccessClicked() {
        this.props.history.push('/accesses/-1');
    }

    refreshPlate() {
        PlateDataService.getPlateById(this.state.id).then(
            response => this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                plateNum: response.data.plateNum,
                accesses: response.data.accesses
            })
        )
    }

    render() {
        return (
            <Container>
                <div className="jumbotron mb-5 p-3 row p-md-5 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <div className="card-body d-flex flex-column align-items-center">
                            <h1 className="display-5"> License Plate </h1>
                            <h2 className="font-italic"> { this.state.plateNum.split(/([0-9]+)/)[0] } </h2>
                            <h2 className="font-italic"> { this.state.plateNum.split(/([0-9]+)/)[1] } </h2>
                        </div>
                    </div>
                    <div className="col-md-6 px-0">
                        <div className="card-body d-flex flex-column align-items-center">
                            <h1 className="display-5"> Plate Owner </h1>
                            <h3 className="font-italic"> { this.state.lastName } </h3>
                            <h3 className="font-italic"> { this.state.firstName } </h3>
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <button type="button" className="btn btn-danger" style={{width: "100%"}}
                                    onClick={() => this.deletePlateClicked(this.state.id)}
                                >
                                    Delete This Entity
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <button type="button" className="btn btn-primary" style={{width: "100%"}}
                                    onClick={() => this.updatePlateClicked(this.state.id)}
                                >
                                    Update This Entity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="col-md-12 text-center">
                        <h3 className="display-4">Accesses
                            <IconButton aria-label="update" style={{padding: "1px 5px"}}
                                onClick={() => this.createAccessClicked()}>
                                <AddBoxIcon fontSize="large"/>
                            </IconButton>
                        </h3>
                    </div>

                    {this.state.accesses.length == 0 ? (
                        <div className="col-md-12 text-center">
                            <h3 className="display-5">Not Accesses Yet</h3>
                        </div>
                    ) : (
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" colspan="2"></th>
                                    <th scope="col">In Force Since</th>
                                    <th scope="col">In Force Until</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.accesses.map(row => (
                                    <tr>
                                        <td></td><td></td>
                                        <td>{row.dateFrom}</td>
                                        <td>{row.dateTo}</td>
                                        <td>
                                            <IconButton aria-label="delete" style={{padding: "1px 5px"}}
                                                onClick={() => this.deleteAccessClicked(row.id)}
                                            >
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                            &nbsp;&nbsp;
                                            <IconButton aria-label="update" style={{padding: "1px 5px"}}
                                                onClick={() => this.updatePlateClicked(row.id)}
                                            >
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </Container>
        )
    }
}

export default PlateDetailsComponent