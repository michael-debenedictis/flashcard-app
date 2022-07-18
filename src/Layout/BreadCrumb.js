import React from "react";
import { Link } from 'react-router-dom';

function BreadCrumb() {
    return (
        <div>
            <Link to='/' >
                Home
            </Link>
        </div>
    )
}

export default BreadCrumb;