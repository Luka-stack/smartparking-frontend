import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


const AccessListView = (props) => {

    return (
        <>
        {props.accesses.length === 0 ? (
            <div className="text-center">
                <div className="card">
                    <h3>No Accesses Yet</h3>
                </div>
            </div>
        ) : (
            <table className="table table-hover box-shadow--6dp">
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">Access Owner</th>
                        <th scope="col">In Force Since</th>
                        <th scope="col">In Force Until</th>
                    </tr>
                </thead>
                <tbody>
                    {props.accesses?.map(row => (
                        <tr key={row.id}>
                            <td></td>
                            <td>
                                <Link to={`/plates/details/${row.plate.id}`}>
                                    {row.plate.lastName} {row.plate.firstName}
                                </Link>
                            </td>
                            <td>{row.dateFrom}</td>
                            <td>{row.dateTo}</td>
                            <td>
                                <IconButton aria-label="update" style={{padding: "1px 5px"}}>
                                    <Link to={`/accesses/${row.id}`}>
                                        <EditIcon fontSize="small"/>
                                    </Link>
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton aria-label="delete" style={{padding: "1px 5px"}}
                                    onClick={ () => {props.deleteClicked(row.id)}}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}

export default AccessListView;