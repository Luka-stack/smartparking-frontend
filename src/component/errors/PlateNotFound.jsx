import React from 'react';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';


const PlateNotFound = (props) => {

    return (

        <div class="d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
            <h1 class="m-3 pr-3 align-top border-right inline-block align-content-center">
                <WarningTwoToneIcon fontSize="large"/>
            </h1>
            <div class="inline-block align-middle">
                <h2 class="font-weight-normal lead">The {props.entity} you requested was not found.</h2>
            </div>
        </div>
    )
}

export default PlateNotFound;