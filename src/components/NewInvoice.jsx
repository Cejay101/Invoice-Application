import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useTheme } from "../hooks/useTheme";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const paymentTermdays =[{
  value:"Net 1 day",label:"Net 1 day"},
  {value:"Net 7 day",label:"Net 7 days"},
  {value:"Net 14 day",label:"Net 14 days"},
  {value:"Net 30 day",label:"Net 30 days"},
]

export default function NewInvoice({createInvoice}) {
  const { mode } = useTheme();
  // Form states
  const [senderStreetAddress, setSenderStreetAddress] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostalCode, setSenderPostalCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiverStreetAddress, setReceiverStreetAddress] = useState("");
  const [receiverCity, setReceiverCity] = useState("");
  const [receiverPostalCode, setReceiverPostalCode] = useState("");
  const [receiverCountry, setReceiverCountry] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [paymentTermsOptions, setPaymentTermsOptions] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState("");
  const [items, setItems] = useState([]);

  const [error, setError] = useState(false)
  const detail = {
    items,
    senderStreetAddress,
    senderCity,
    senderPostalCode,
    senderCountry,
    receiverName,
    receiverEmail,
    receiverStreetAddress,
    receiverCity,
    receiverPostalCode,
    receiverCountry,
    invoiceDate,
    paymentTerms,
    projectDescription,
    itemName,
    quantity,
    price,
    total,
  };

  const handleItemChange = (index, field, value) => {
    // Update the corresponding state variable based on the changed field
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleItemDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setItems([...items, { itemName: "", quantity: 0, price: 0 }]);
  };

  const handleSubmit =()=>{
    console.log({items});
if(items ||
    senderStreetAddress ||
    senderCity ||
    senderPostalCode ||
    senderCountry ||
    receiverName ||
    receiverEmail ||
    receiverStreetAddress ||
    receiverCity ||
    receiverPostalCode ||
    receiverCountry ||
    invoiceDate ||
    paymentTerms ||
    projectDescription ||
    itemName ||
    quantity ||
    price ||
    total === "") setError(true)
  }
  const errorMessage ="Can't be empty"

  //  styling options of the paymentTerms 
 const customSelectStyles = {
   control: (provided, state) => ({
     ...provided,
     backgroundColor: "var(--light-background)",
     border: "1px solid #ffffff10",
   }),
   option: (provided, state) => ({
     ...provided,
     color: "var(--white)",
     backgroundColor: "var(--light-background)",
   }),
   singleValue: (provided, state) => ({
     ...provided,
     color: "var(--white)",
   }),
   menu: (provided, state) => ({
     ...provided,
     backgroundColor: "var(--light-background)",
     boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
   }),
   input: (provided, state) => ({
     ...provided,
     color: "var(--white)",
   }),
 };
  return (
    <aside>
      <div
        className={`add-invoice ${mode} ${createInvoice ? "display" : "hide"} `}
      >
        <form onSubmit={handleSubmit}>
          <h2> New Invoice</h2>
          <h3>Bill From</h3>
          <label>
            <span className="span">
              <span>Street Address</span>

              {senderStreetAddress === "" && error && (
                <p className="error-message">{errorMessage}</p>
              )}
            </span>
            <input
              type="text"
              onChange={(e) => setSenderStreetAddress(e.target.value)}
              value={senderStreetAddress}
              required
            />
          </label>
          <div className="location">
            <label>
              <span className="span">
                <span>City</span>
                {senderCity === "" && error && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </span>
              <input
                type="text"
                onChange={(e) => setSenderCity(e.target.value)}
                required
                value={senderCity}
              />
            </label>
            <label>
              <span className="span">
                <span>Postal Code</span>
                {senderPostalCode === "" && error && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </span>
              <input
                type="text"
                onChange={(e) => setSenderPostalCode(e.target.value)}
                required
                value={senderPostalCode}
              />
            </label>
            <label>
              <span className="span">
                <span>Country</span>
                {senderCountry === "" && error && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </span>
              <input
                type="text"
                onChange={(e) => setSenderCountry(e.target.value)}
                required
                value={senderCountry}
              />
            </label>
          </div>
          <h3>Bill To</h3>
          <label>
            <span className="span">
              <span>Client's Name</span>
              {receiverName === "" && error && (
                <p className="error-message">{errorMessage}</p>
              )}
            </span>
            <input
              type="text"
              onChange={(e) => setReceiverName(e.target.value)}
              required
              value={receiverName}
            />
          </label>
          <label>
            <span className="span">
              <span>Client's Email</span>
              {receiverEmail === "" && error && (
                <p className="error-message">{errorMessage}</p>
              )}
            </span>
            <input
              type="email"
              onChange={(e) => setReceiverEmail(e.target.value)}
              required
              value={receiverEmail}
            />
          </label>
          <label>
            <span className="span">
              <span>Street Address</span>
              {receiverStreetAddress === "" && error && (
                <p className="error-message">{errorMessage}</p>
              )}
            </span>
            <input
              type="text"
              onChange={(e) => setReceiverStreetAddress(e.target.value)}
              required
              value={receiverStreetAddress}
            />
          </label>
          <div className="location">
            <label>
              <span className="span">
                <span>City</span>
                {receiverCity === "" && error && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </span>
              <input
                type="text"
                onChange={(e) => setReceiverCity(e.target.value)}
                required
                value={receiverCity}
              />
            </label>
            <label>
              <span className="span">
                <span>Postal Code</span>
                {receiverPostalCode === "" && error && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </span>
              <input
                type="text"
                onChange={(e) => setReceiverPostalCode(e.target.value)}
                required
                value={receiverPostalCode}
              />
            </label>
            <label>
              <span className="span">
                <span>Country</span>
                {receiverCountry === "" && error && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </span>
              <input
                type="text"
                onChange={(e) => setReceiverCountry(e.target.value)}
                required
                value={receiverCountry}
              />
            </label>
          </div>
          <label>
            <span>Invoice Date</span>

            <input
              type="date"
              placeholder="date"
              onChange={(e) => setInvoiceDate(e.target.value)}
              value={invoiceDate}
              />
          </label>
          <label>
            <span>Payment Terms</span>

            <Select
              className="payment-terms"
              styles={customSelectStyles}
              onChange={(option) => setPaymentTermsOptions(option)}
              defaultValue={paymentTermdays[2]}
              options={paymentTermdays}
            />
          </label>
          <label>
            <span className="span">
              <span>Project Description</span>
              {projectDescription === "" && error && (
                <p className="error-message">{errorMessage}</p>
              )}
            </span>
            <input
              type="text"
              onChange={(e) => setProjectDescription(e.target.value)}
              required
              value={projectDescription}
            />
          </label>
          <h2 style={{ fontSize: "1.2rem", color: "gray" }}>Item List</h2>
          <div>
            {items.map((item, index) => (
              <div className="item-list" key={index}>
                <label className="item-name">
                  <span>Item Name</span>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleItemChange(index, "itemName", e.target.value)
                    }
                    value={item.itemName}
                  />
                </label>
                <label className="qty">
                  <span>Qty.</span>
                  <input
                    type="number"
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    value={item.quantity}
                  />
                </label>
                <label className="price">
                  <span>Price</span>
                  <input
                    type="number"
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    value={item.price}
                  />
                </label>
                <label className="total">
                  <span>Total</span>
                  <p>{item.quantity * item.price}</p>
                </label>
                <FontAwesomeIcon
                  className="trash"
                  icon={faTrash}
                  onClick={() => handleItemDelete(index)}
                />
              </div>
            ))}
            <button className="add-item" onClick={handleAddItem}>
              + Add New Item
            </button>
          </div>
          <div className="changes">
            <button onClick={handleSubmit}>Discard</button>
            <button onClick={handleSubmit}>Save as Draft</button>
            <button onClick={handleSubmit}>Save & Send</button>
          </div>
        </form>
      </div>
    </aside>
  );
}
