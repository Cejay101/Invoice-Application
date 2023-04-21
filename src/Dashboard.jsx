import React, { useState } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const{filterOpen, setFilterOpen} =useState(false)
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="title">
          <h2>Invoices</h2>
          <p>There are 7 total invoice</p>
        </div>
        <div className="title-side">
          <div className="filter">
            <p>Filter by status </p>
            <FontAwesomeIcon className="filter-icon" icon={faAngleUp} />
          </div>
          <div className="new-invoice">
            <div>
            <FontAwesomeIcon icon={filterOpen? faAngleDown:faAngleUp} />
              </div>
            <p>New Invoice</p>
          </div>
        </div>
      </header>
      <main></main>
    </div>
  );
}
