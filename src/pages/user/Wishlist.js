import React from 'react'
import UserNav from '../../component/nav/UserNav';

const Wishlist = () => {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"><UserNav/></div>
            <div className="col">wishlist page</div>
          </div>
        </div>
      );
}

export default Wishlist