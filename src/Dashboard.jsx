import React, { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useTheme } from "./hooks/useTheme";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import NewInvoice from "./components/NewInvoice";

export default function Dashboard() {
  const { filterOpen, setFilterOpen } = useState(false);
  const [createInvoice, setCreateInvoice] = useState(false);
  const { data, isPending, error } = useFetch("http://localhost:3000/Data");
  const { mode } = useTheme();

  // console.log(senderStreetAddress)
  const handleNewInvoice = () => {
    setCreateInvoice(!createInvoice);
  };
  useEffect(() => {}, [createInvoice]);
  return (
    <div className={`dashboard ${mode}`}>
      <header className="dashboard-header">
        <div className="title">
          <h2>Invoices</h2>
          {data && <p>{`There are ${data.length} total invoice`}</p>}
        </div>
        <div className="title-side">
          <div className="filter">
            <p>Filter by status </p>
            <FontAwesomeIcon
              className="icon"
              icon={filterOpen ? faAngleUp : faAngleDown}
            />
          </div>

          <div onClick={handleNewInvoice} className="new-invoice">
            <div>
              <FontAwesomeIcon className="icon" icon={faPlus} />
            </div>
            <p>New Invoice</p>
          </div>
        </div>
      </header>
      <main>
        {isPending && <div>Loading ....</div>}
        {error && <div>{error}</div>}
        {data && (
          <ul className="invoices">
            {data.map((invoice) => (
              <li key={invoice.id} className="invoice">
                <p className="id">#{invoice.id}</p>
                <p>
                  Due
                  {` ${new Date(invoice.paymentDue).toDateString().slice(3)}`}
                </p>
                <p>{invoice.clientName}</p>
                <p className="total">€{invoice.total}</p>
                <div
                  className="status"
                  style={{
                    color:
                      invoice.status === "paid"
                        ? "var(--green)"
                        : invoice.status === "pending"
                        ? "var(--orange)"
                        : "var(--white)",
                    background:
                      invoice.status === "paid"
                        ? "#3f833f30"
                        : invoice.status === "pending"
                        ? "#ff8c0030"
                        : "#ffffff30",
                  }}
                >
                  <div
                    className="dot"
                    style={{
                      background:
                        invoice.status === "paid"
                          ? "var(--green)"
                          : invoice.status === "pending"
                          ? "var(--orange)"
                          : "var(--white)",
                    }}
                  ></div>
                  <p>
                    {" "}
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </p>
                </div>
                <FontAwesomeIcon className="icon" icon={faAngleRight} />
              </li>
            ))}
          </ul>
        )}
      </main>
      <div
        onClick={() => {
          setCreateInvoice(false);
        }}
        className={`${createInvoice ? "overlay" : "hide"}`}
      ></div>
      {<NewInvoice createInvoice={createInvoice} />}
    </div>
  );
}
