import React from 'react'
import './CustomerForm.css'

const CustomerForm = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  return (
    <div className="p-3">
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="customerName"
            placeholder="Customer name"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="MobileNumber" className="col-4">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="MobileNumber"
            placeholder="Mobile number"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm