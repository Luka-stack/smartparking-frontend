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
import AccessDataService from '../../service/AccessDataService';


class ListAccessesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accesses: [],
            message: null
        }

        this.refreshAccesses = this.refreshAccesses.bind(this);
        this.deleteAccessClicked = this.deleteAccessClicked.bind(this);
        this.addAccessClicked = this.addAccessClicked.bind(this);
    }

    componentDidMount() {
        this.refreshAccesses();
    }

    refreshAccesses() {
        AccessDataService.getAllAccesses().then(
            response => {
                this.setState({ accesses: response.data });
            }
        )
    }

    deleteAccessClicked(id) {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            AccessDataService.deleteAccess(id).then(
                () => {
                    this.setState({ message: `Successfully deleted access.`});
                    this.refreshAccesses();
                }
            )
        }
    }
    
    updateAccessClicked(id) {
        this.props.history.push(`/accesses/${id}`);
    }

    addAccessClicked() {
        this.props.history.push(`/accesses/-1`);
    }

    render() {
        return (
            
            <div>
            <nav className="navbar navbar-dark">
                <Link to="/plates" className="btn btn-secondary btn-lg navButton">
                    Plate Directory
                </Link>
                <Link to="/accesses" className="btn btn-primary btn-lg navButton">
                    Parking Accesses
                </Link>
            </nav>
            
            <div className="Paper">

                <Typography component="h1" variant="h4">
                    Access Directory <br />
                    <button type="button" className="btn btn-outline-success addButton"
                        onClick={() => this.addAccessClicked()}
                    >
                        New Access
                    </button>
                </Typography>

                <TableContainer
                    style={{ width: "80%", margin: "15px 10px" }}
                    component={Paper}
                >
                    <Table className="Table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>Access Owner</b></TableCell>
                                <TableCell align="center"><b>In Force Since</b></TableCell>
                                <TableCell align="center"><b>In Force To</b></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.accesses?.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.plate.firstName} {row.plate.lastName}</TableCell>
                                    <TableCell align="center">{row.dateFrom}</TableCell>
                                    <TableCell align="center">{row.dateTo}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" style={{padding: "1px 5px"}}
                                            onClick={() => this.deleteAccessClicked(row.id)}
                                        >
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton aria-label="update" style={{padding: "1px 5px"}}
                                            onClick={() => this.updateAccessClicked(row.id)}
                                        >
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
        </div>
        )
    }
}

export default ListAccessesComponent