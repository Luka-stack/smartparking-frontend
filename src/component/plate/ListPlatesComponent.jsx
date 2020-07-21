import React, { Component } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import PlateDataService from '../../service/PlateDataService';


class ListPlatesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plates: [],
            message: null
        }

        this.refreshPlates = this.refreshPlates.bind(this);
        this.deletePlateClicked = this.deletePlateClicked.bind(this);
        this.addPlateClicked = this.addPlateClicked.bind(this);
    }

    componentDidMount() {
        this.refreshPlates();
    }

    refreshPlates() {
        PlateDataService.getAllPlates().then(
            response => {
                this.setState({ plates: response.data });
            }
        )
    }

    deletePlateClicked(id) {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            PlateDataService.deletePlate(id).then(
                () => {
                    this.setState({ message: `Successfully deleted plate.`});
                    this.refreshPlates();
                }
            )
        }
    }
    
    updatePlateClicked(id) {
        this.props.history.push(`/plates/${id}`);
    }

    addPlateClicked() {
        this.props.history.push(`/plates/-1`);
    }

    render() {
        return (
            <div>
            <nav className="navbar navbar-dark">
                <Link to="/plates" className="btn btn-primary btn-lg navButton">
                    Plate Owners Directory
                </Link>
                <Link to="/accesses" className="btn btn-secondary btn-lg navButton">
                    Parking Accesses
                </Link>
            </nav>
            
            <div className="Paper">

                <Typography component="h1" variant="h4">
                    Plate Directory <br />
                    <button type="button" className="btn btn-outline-success addButton"
                        onClick={() => this.addPlateClicked()}
                    >
                        Create Plate Owner
                    </button>
                </Typography>

                {this.state.plates.length == 0 ? (
                    <Typography component="h1" variant="h4">
                        <br /> No owners yet
                    </Typography>
                ) : (
                    <TableContainer
                        style={{ width: "80%", margin: "15px 10px" }}
                        component={Paper}
                    >
                        <Table className="Table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><b>First Name</b></TableCell>
                                    <TableCell align="center"><b>Last Name</b></TableCell>
                                    <TableCell align="center"><b>Plate</b></TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.state.plates?.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.firstName}</TableCell>
                                        <TableCell align="center">{row.lastName}</TableCell>
                                        <TableCell align="center">{row.plateStr}</TableCell>
                                        <TableCell align="center">
                                            <IconButton aria-label="delete" style={{padding: "1px 5px"}}
                                                onClick={() => this.deletePlateClicked(row.id)}
                                            >
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                            <IconButton aria-label="update" style={{padding: "1px 5px"}}
                                                onClick={() => this.updatePlateClicked(row.id)}
                                            >
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
        )
    }
}

export default ListPlatesComponent