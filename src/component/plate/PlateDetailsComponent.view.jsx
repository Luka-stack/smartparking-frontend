import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from 'react-router-dom';
import PlateNotFound from '../errors/PlateNotFound';


const PlateDetailsView = (props) => {

    return (
        <>
        {props.plate? (
            <>
            <div className="mb-3 jumbotron bg-jumbotron">
                <div className="container text-center">
                    <h1 className="display-3">{props.plate.plateNum}</h1>      
                    <h2>{props.plate.lastName} {props.plate.firstName}</h2>
                </div>
            </div>

            <div className="container text-center">
                
                <div className="row">
                    <div className="m-1 col">
                        <button className="btn btn-lg btn-outline-danger"
                            onClick={() => props.deletePlate(props.plate.id)}
                        >
                            Delete This Plate Owner
                        </button>
                    </div>
                    <div className="m-1 col">
                        <Link to={`/plates/${props.plate.id}`} className="btn btn-lg btn-outline-primary">
                            Update This Plate Onwer
                        </Link>
                    </div>
                </div>
            </div>

            <hr className="solid"></hr>
            
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-10">
                        
                        <div className="m-3 text-center">
                            <h3>Related Accesses</h3>
                            <Link to="/accesses/-1" className="btn btn-outline-success">
                                Create Access
                            </Link>
                        </div>
                        
                        {props.plate.accesses.length? (
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">In Force Since</th>
                                        <th scope="col">In Force Until</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {props.plate.accesses.map(row => (
                                    <tr>
                                        <td></td>
                                        <td>{row.dateFrom}</td>
                                        <td>{row.dateTo}</td>
                                        <td>
                                            <IconButton aria-label="delete" style={{padding: "2px 5px"}}>
                                                <Link to={`/accesses/${row.id}`}>
                                                    <EditIcon fontSize="small"/>
                                                </Link>
                                            </IconButton>
                                            &nbsp;
                                            <IconButton aria-label="update" style={{padding: "2px 5px"}}
                                                onClick={() => props.deleteAccess(row.id)}
                                            >
                                                    <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}    
                                </tbody>
                            </table>
                        ) : (
                            <div>No Accesses</div>
                        )}
                    </div>
                </div>
            </div>
            </>
        ) : (
            <PlateNotFound />
        )}
        </>
    )
}

export default PlateDetailsView;