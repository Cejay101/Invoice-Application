import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useTheme } from "../hooks/useTheme";
import { useFetch } from "../hooks/useFetch";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const arrayOfdays = [1, 7, 14, 22, 30];
const payment = arrayOfdays.map((day) => ({
  value: `${day}`,
  label: `Net ${day} day`,
}));
const paymentTermdays = [...payment];

export default function NewInvoice({ createInvoice, edit }) {
  const { mode } = useTheme();
  const { postData, data, isPending, err } = useFetch(
    "http://localhost:3000/Data",
    "POST"
  );
  // console.log(edit.id)
  const { putData } = useFetch(
    `http://localhost:3000/Data/${edit ? edit.id : ""}`,
    "PUT"
  );

  // Form states
  const [senderStreetAddress, setSenderStreetAddress] = useState("");
  const [open, setOpen] = useState(true);
  const [senderCity, setSenderCity] = useState("");
  const [senderPostalCode, setSenderPostalCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiverStreetAddress, setReceiverStreetAddress] = useState("");
  const [receiverCity, setReceiverCity] = useState("");
  const [receiverPostalCode, setReceiverPostalCode] = useState("");
  const [receiverCountry, setReceiverCountry] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(() => {
    const currentDate = new Date();
    const defaultDate = new Date(currentDate.setDate(currentDate.getDate()));
    return defaultDate.toISOString().substr(0, 10);
  });
  const [paymentTermsOptions, setPaymentTermsOptions] = useState(
    paymentTermdays[2]
  );

  useEffect(() => {
    if (paymentTermsOptions && paymentTermsOptions.value) {
      const currentDate = new Date();
      const defaultDate = new Date(
        currentDate.setDate(
          currentDate.getDate() + parseInt(paymentTermsOptions.value)
        )
      );
      setInvoiceDate(defaultDate.toISOString().substr(0, 10));
    }
  }, [paymentTermsOptions]);

  const [projectDescription, setProjectDescription] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState("");

  const [error, setError] = useState(false);

  const Post = (status) => {
    postData({
      id:
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
        Math.floor(Math.random() * 9000 + 1000),
      createdAt: new Date().toISOString().slice(0, 10),
      paymentDue: invoiceDate,
      description: projectDescription,
      paymentTerms: Number(paymentTermsOptions.value),
      clientName: receiverName,
      clientEmail: receiverEmail,
      status: status,
      senderAddress: {
        street: senderStreetAddress,
        city: senderCity,
        postCode: senderPostalCode,
        country: senderCountry,
      },
      clientAddress: {
        street: receiverStreetAddress,
        city: receiverCity,
        postCode: receiverPostalCode,
        country: receiverCountry,
      },
      items: items,
      total: total,
    });
  };
  const Put = (status) => {
    putData({
      createdAt: new Date().toISOString().slice(0, 10),
      paymentDue: InvoiceDue,
      description: ProjectDescription,
      paymentTerms: Number(paymentTermsOptions.value),
      clientName: ReceiverName,
      clientEmail: ReceiverEmail,
      status: status,
      senderAddress: {
        street: senderStreet,
        city: SenderCity,
        postCode: SenderpostCode,
        country: SenderCountry,
      },
      clientAddress: {
        street: ReceiverStreet,
        city: ReceiverCity,
        postCode: ReceiverpostCode,
        country: ReceiverCity,
      },
      items: items,
      total: total,
    });
  };

  const handleItemChange = (index, field, value) => {
    // Update the corresponding state variable based on the changed field
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    setTotal(getTotalSum());
  };

  const handleItemDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setTotal(getTotalSum());
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setItems([...items, { itemName: "", quantity: "", price: "", total: "" }]);

    setTotal(getTotalSum());
  };
  const getTotalSum = () => {
    return items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.total;
    }, 0);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const hasValidData =
      total &&
      senderStreetAddress &&
      senderCity &&
      senderPostalCode &&
      senderCountry &&
      receiverName &&
      receiverEmail &&
      receiverStreetAddress &&
      receiverCity &&
      receiverPostalCode &&
      receiverCountry &&
      invoiceDate &&
      projectDescription;

    console.log({
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
      projectDescription,
    });
    console.log(hasValidData);
    if (!hasValidData) {
      setError(true);
    } else {
      Post("pending");
    }
  };
  const handleDiscard = () => {
    setOpen(false);
  };
  const handleDraft = () => {
    Post("draft");
  };
  const handleEdit = () => {
    Put("pending");
  };
  const errorMessage = "Can't be empty";

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
      //  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "var(--white)",
    }),
  };

  const useEditableInput = (initialValue, edit) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      if (edit) {
        setValue(edit);
      } else {
        setValue(initialValue);
      }
    }, [edit, initialValue]);

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return [value, handleChange];
  };

  ///Edit Form
  const [senderStreet, handleSenderStreetChange] = useEditableInput(
    "",
    edit ? edit.senderAddress.street : ""
  );
  const [SenderCity, handleSenderCityChange] = useEditableInput(
    "",
    edit ? edit.senderAddress.city : ""
  );
  const [SenderpostCode, handleSenderpostCodeChange] = useEditableInput(
    "",
    edit ? edit.senderAddress.postCode : ""
  );
  const [SenderCountry, handleSenderCountryChange] = useEditableInput(
    "",
    edit ? edit.senderAddress.country : ""
  );
  const [ReceiverName, handleReceiverNameChange] = useEditableInput(
    "",
    edit ? edit.clientName : ""
  );
  const [ReceiverEmail, handleReceiverEmailChange] = useEditableInput(
    "",
    edit ? edit.clientEmail : ""
  );
  const [ReceiverStreet, handleReceiverStreetChange] = useEditableInput(
    "",
    edit ? edit.clientAddress.street : ""
  );
  const [ReceiverCity, handleReceiverCityChange] = useEditableInput(
    "",
    edit ? edit.clientAddress.city : ""
  );
  const [ReceiverpostCode, handleReceiverpostCodeChange] = useEditableInput(
    "",
    edit ? edit.clientAddress.postCode : ""
  );
  const [ReceiverCountry, handleReceiverCountryChange] = useEditableInput(
    "",
    edit ? edit.clientAddress.country : ""
  );
  const [ProjectDescription, handleProjectDescriptionChange] = useEditableInput(
    "",
    edit ? edit.description : ""
  );
  const [InvoiceDue, handleInvoiceDueChange] = useEditableInput(
    "",
    edit ? edit.paymentDue : ""
  );
  return (
    <aside className={mode}>
      <div
        className={`add-invoice ${mode} ${createInvoice ? "display" : "hide"} `}
      >
        {
          // edit &&

          <form>
            <h2>{edit ? `Edit #${edit.id}` : "New Invoice"}</h2>
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
                onChange={handleSenderStreetChange}
                value={senderStreet}
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
                  onChange={handleSenderCityChange}
                  value={SenderCity}
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
                  onChange={handleSenderpostCodeChange}
                  value={SenderpostCode}
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
                  onChange={handleSenderCountryChange}
                  value={SenderCountry}
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
                onChange={handleReceiverNameChange}
                value={ReceiverName}
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
                onChange={handleReceiverEmailChange}
                value={ReceiverEmail}
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
                onChange={handleReceiverStreetChange}
                value={ReceiverStreet}
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
                  onChange={handleReceiverCityChange}
                  value={ReceiverCity}
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
                  onChange={handleReceiverpostCodeChange}
                  value={ReceiverpostCode}
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
                  onChange={handleReceiverCountryChange}
                  value={ReceiverCountry}
                />
              </label>
            </div>
            <label>
              <span>Invoice Due Date</span>

              <input
                type="date"
                placeholder="date"
                onChange={handleInvoiceDueChange}
                value={InvoiceDue}
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
                onChange={handleProjectDescriptionChange}
                value={ProjectDescription}
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
                      onChange={(e) => {
                        const qty = Number(e.target.value);
                        const total = qty * item.price; // Calculate total
                        handleItemChange(index, "quantity", qty);
                        handleItemChange(index, "total", total); // Set total value
                      }}
                      value={item.quantity}
                    />
                  </label>
                  <label className="price">
                    <span>Price</span>
                    <input
                      type="number"
                      onChange={(e) => {
                        const price = Number(e.target.value);
                        const total = price * item.quantity; // Calculate total
                        handleItemChange(index, "price", price);
                        handleItemChange(index, "total", total); // Set total value
                      }}
                      value={item.price}
                    />
                  </label>
                  <label className="total">
                    <span>Total</span>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleItemChange(index, "total", e.target.value)
                      }
                      value={item.total}
                    />
                  </label>
                  <FontAwesomeIcon
                    className="trash"
                    icon={faTrash}
                    onClick={() => handleItemDelete(index)}
                  />
                </div>
              ))}
              <span className="span sum-total">
                <span>Sum Total:</span>

                <span>£{getTotalSum()}</span>
              </span>
              <button className="add-item" onClick={handleAddItem}>
                + Add New Item
              </button>
            </div>
            <div className="changes">
              <button onClick={handleDiscard}>Discard</button>
              {!edit && (
                <button
                  style={{ background: mode === "light" ? "#363A52" : "" }}
                  onClick={handleDraft}
                >
                  Save as Draft
                </button>
              )}
              {edit ? (
                <button onClick={handleEdit}>Save Changes</button>
              ) : (
                <button onClick={handleSave}>Save & Send</button>
              )}
            </div>
          </form>
        }
      </div>
    </aside>
  );
}
