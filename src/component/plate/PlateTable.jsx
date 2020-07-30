import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreIcon from '@material-ui/icons/More';


const PlateTable = (props) => {

    return (
        <table className="table table-hover box-shadow--6dp">
            <thead>
                <tr>
                    <th></th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Plate Number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.plates?.map(row => (
                    <tr key={row.id}>
                        <td></td>
                        <td>{row.firstName}</td>
                        <td>{row.lastName}</td>
                        <td>{row.plateNum}</td>
                        <td>
                            <IconButton aria-label="more" style={{padding: "1px 5px"}}>
                                <Link to={`/plates/details/${row.id}`}>
                                    <MoreIcon fontSize="small"/>
                                </Link>
                            </IconButton>
                            &nbsp;&nbsp;
                            <IconButton aria-label="update" style={{padding: "1px 5px"}}>
                                <Link to={`/plates/${row.id}`}>
                                    <EditIcon fontSize="small"/>
                                </Link>
                            </IconButton>
                            &nbsp;&nbsp;
                            <IconButton aria-label="delete" style={{padding: "1px 5px"}}
                                onClick = {() => props.deletePlate(row.id)}
                            >
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PlateTable;