import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import "./InvoiceDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import NewInvoice from "./NewInvoice";

export default function InvoiceDetail() {
  const { id } = useParams();
    const [createInvoice, setCreateInvoice] = useState(false);
   const navigate = useNavigate();
  const url = "http://localhost:3000/Data/" + id;
  const {  data, isPending, error } = useFetch(url);
  const {patchData} =useFetch(url, "PATCH") 
const {deleteData} =useFetch(url,"DELETE")
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

 const handleDelete = async () => {
   await deleteData();
   navigate("/");
 };
  const handleInvoice = () => {
    setCreateInvoice(!createInvoice);
  };

  const handleMarkAsPaid=async()=>{
    await patchData({status:"paid"})
    window.location.reload();
  }
  return (
    <div className="invoice-detail">
      {isPending && <div>Loading.....</div>}
      {error && <div>{error}</div>}
      <Link to="/" className="go-back">
        <FontAwesomeIcon
          icon={faAngleLeft}
          style={{ color: "var(--purple)" }}
        />
        Go back
      </Link>
      {data && (
        <header>
          <div className=" container state">
            <p>Status</p>
            <div
              className="status"
              style={{
                color:
                  data.status === "paid"
                    ? "var(--green)"
                    : data.status === "pending"
                    ? "var(--orange)"
                    : "var(--white)",
                background:
                  data.status === "paid"
                    ? "#3f833f30"
                    : data.status === "pending"
                    ? "#ff8c0030"
                    : "#ffffff30",
              }}
            >
              <div
                className="dot"
                style={{
                  background:
                    data.status === "paid"
                      ? "var(--green)"
                      : data.status === "pending"
                      ? "var(--orange)"
                      : "var(--white)",
                }}
              ></div>
              <p>{data.status}</p>
            </div>
            <div className="header-option">
              {data.status !== "paid" && (
                <button onClick={handleInvoice} className="edit">
                  Edit
                </button>
              )}
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
              {data.status === "pending" && (
                <button className="mark" onClick={handleMarkAsPaid}>
                  Mark as paid
                </button>
              )}
            </div>
          </div>
        </header>
      )}
      {data && (
        <main>
          <div className="container">
            <div className="location">
              <div className="id">
                <p>#{id}</p>
                <p>{data.description}</p>
              </div>
              <div className="address">
                <p>{data.senderAddress.street}</p>
                <p>{data.senderAddress.city}</p>
                <p>{data.senderAddress.postCode}</p>
                <p>{data.senderAddress.country}</p>
              </div>
            </div>
            <div className="details">
              <div className="dates">
                <div className="invoice-date">
                  <p>invoice date</p>
                  <p className="big-font">{formatDate(`${data.createdAt}`)}</p>
                </div>
                <div className="payment-due">
                  <p>Payment Due</p>
                  <p className="big-font">{formatDate(`${data.paymentDue}`)}</p>
                </div>
              </div>
              <div className="bill-to">
                <p>bill to</p>
                <p className="big-font">{data.clientName}</p>
                <div className="address">
                  <p>{data.clientAddress.street}</p>
                  <p>{data.clientAddress.city}</p>
                  <p>{data.clientAddress.postCode}</p>
                  <p>{data.clientAddress.country}</p>
                </div>
              </div>
              <div className="sent-to">
                <p>Sent to </p>
                <p className="big-font">{data.clientEmail}</p>
              </div>
            </div>
            <div className="items">
              <div className="item-list" key={Math.random()}>
                <div className="item-name">
                  <p className="title">Item Name</p>
                </div>
                <div className="qty">
                  <p className="title">QTY.</p>
                </div>
                <div className="price">
                  <p className="title">Price</p>
                </div>
                <div className="total">
                  <p className="title">Total</p>
                </div>
              </div>
              {data.items.map((item) => {
                return (
                  <div className="item-list" key={Math.random()}>
                    <div className="item-name">
                      <p className="name">{item.itemName}</p>
                    </div>
                    <div className="qty">
                      <p className="name">{item.quantity}</p>
                    </div>
                    <div className="price">
                      <p className="name">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="total">
                      <p className="name">{formatCurrency(item.total)}</p>
                    </div>
                  </div>
                );
              })}

              <div className="amount-due">
                <p className="title">Amount Due</p>
                <p className="big-font">{formatCurrency(data.total)}</p>
              </div>
            </div>
          </div>
        </main>
      )}
      <div
        onClick={() => {
          setCreateInvoice(false);
        }}
        className={`${createInvoice ? "overlay" : "hide"}`}
      ></div>
      {data && <NewInvoice createInvoice={createInvoice} edit={data} />}
    </div>
  );
}
