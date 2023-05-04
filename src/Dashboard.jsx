import React, { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useTheme } from "./hooks/useTheme";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import NewInvoice from "./components/NewInvoice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { filterOpen, setFilterOpen } = useState(false);
  const [createInvoice, setCreateInvoice] = useState(false);
  const { data, isPending, err } = useFetch("http://localhost:3000/Data");
  const { mode } = useTheme();
  const invoiceDetail = () => {
    console.log("clicked");
  };
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  function formatCurrency(number) {
    return (
      "€" +
      number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  const handleInvoice = () => {
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

          <div onClick={handleInvoice} className="new-invoice">
            <div>
              <FontAwesomeIcon className="icon" icon={faPlus} />
            </div>
            <p>New Invoice</p>
          </div>
        </div>
      </header>
      <main>
        {isPending && <div>Loading ....</div>}
        {err && <div>{err}</div>}
        {data && (
          <ul className="invoices">
            {data.map((invoice) => (
              <li key={invoice.id} onClick={invoiceDetail}>
                <Link className="invoice" to={`./invoice/${invoice.id}`}>
                  <p className="id">#{invoice.id}</p>
                  <p>Due {formatDate(` ${invoice.paymentDue}`)}</p>
                  <p>{invoice.clientName}</p>
                  <p className="total">{formatCurrency(`${invoice.total}`)}</p>
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
                      {invoice.status}
                    </p>
                  </div>
                  <FontAwesomeIcon className="icon" icon={faAngleRight} />
                </Link>
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
