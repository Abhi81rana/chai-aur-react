
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Header from "./components/Header";
import CustomerForm from "./components/CustomerForm";
import ItemsEditor from "./components/ItemsEditor";
import Summary from "./components/Summary";
import InvoicePreview from "./components/InvoicePreview";

import "./App.css";

const STORAGE_KEY = "invoice-generator-data";

const defaultCustomer = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const getDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const createInvoiceNumber = () => {
  const date = getDate(new Date()).replaceAll("-", "");
  const random = Math.floor(1000 + Math.random() * 9000);

  return `INV-${date}-${random}`;
};

const getDefaultDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return getDate(date);
};

const createDefaultItems = () => [
  {
    id: crypto.randomUUID(),
    name: "Web Development",
    quantity: "1",
    price: "15000",
  },
  {
    id: crypto.randomUUID(),
    name: "UI/UX Design",
    quantity: "1",
    price: "8000",
  },
];

// Load saved data before first render

const loadInitialData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    const data = JSON.parse(saved);

    if (
      !data.customer ||
      !Array.isArray(data.items) ||
      data.items.length === 0 ||
      ![0, 5, 12, 18, 28].includes(data.gst)
    ) {
      return null;
    }

    const validItems = data.items.every(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string"
    );

    if (!validItems) return null;

    return data;
  } catch (error) {
    console.error("LocalStorage loading error:", error);
    return null;
  }
};

function App() {
  const [initialData] = useState(loadInitialData);

  const [customer, setCustomer] = useState(
    initialData?.customer || defaultCustomer
  );

  const [items, setItems] = useState(
    initialData?.items || createDefaultItems()
  );

  const [gst, setGst] = useState(
    initialData?.gst ?? 18
  );

  const [invoiceNumber, setInvoiceNumber] = useState(
    initialData?.invoiceNumber || createInvoiceNumber()
  );

  const [invoiceDate, setInvoiceDate] = useState(
    initialData?.invoiceDate || getDate(new Date())
  );

  const [dueDate, setDueDate] = useState(
    initialData?.dueDate || getDefaultDueDate()
  );

  const [saved, setSaved] = useState(false);

  const company = {
    name: "Nexolabz Solutions",
    tagline: "Innovate • Automate • Grow",
  };

  // Save data automatically

  useEffect(() => {
    const data = {
      customer,
      items,
      gst,
      invoiceNumber,
      invoiceDate,
      dueDate,
    };

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      setSaved(true);
    } catch (error) {
      console.error("Saving error:", error);
      setSaved(false);
    }
  }, [
    customer,
    items,
    gst,
    invoiceNumber,
    invoiceDate,
    dueDate,
  ]);

  // Automatic calculations

  const subtotal = items.reduce((total, item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;

    return total + quantity * price;
  }, 0);

  const tax = (subtotal * gst) / 100;

  const grandTotal = subtotal + tax;

  const formatMoney = (amount) =>
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Validate invoice

  const validateInvoice = () => {
    if (!customer.name.trim()) {
      alert("Please enter customer name.");
      return false;
    }

    if (!customer.email.trim()) {
      alert("Please enter email address.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customer.email)) {
      alert("Please enter a valid email.");
      return false;
    }

    if (!customer.phone.trim()) {
      alert("Please enter phone number.");
      return false;
    }

    if (items.length === 0) {
      alert("Please add at least one item.");
      return false;
    }

    for (const item of items) {
      if (!item.name.trim()) {
        alert("Please enter all product names.");
        return false;
      }

      const quantity = Number(item.quantity);
      const price = Number(item.price);

      if (
        !Number.isSafeInteger(quantity) ||
        quantity < 1
      ) {
        alert("Quantity must be a positive whole number.");
        return false;
      }

      if (
        !Number.isFinite(price) ||
        price < 0
      ) {
        alert("Please enter a valid price.");
        return false;
      }
    }

    if (
      !invoiceDate ||
      !dueDate ||
      dueDate < invoiceDate
    ) {
      alert("Please check invoice and due dates.");
      return false;
    }

    return true;
  };

  // Generate and download PDF

  const downloadPDF = () => {
    if (!validateInvoice()) return;

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const blue = [19, 65, 125];
      const lightBlue = [230, 240, 255];

      // Header

      doc.setFillColor(...blue);
      doc.rect(0, 0, 210, 38, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(21);

      doc.text(company.name, 15, 17);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      doc.text(company.tagline, 15, 25);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);

      doc.text("INVOICE", 195, 17, {
        align: "right",
      });

      doc.setFontSize(9);

      doc.text(`#${invoiceNumber}`, 195, 25, {
        align: "right",
      });

      // Customer details

      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);

      doc.text("Bill To:", 15, 50);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(customer.name, 15, 58);
      doc.text(customer.email, 15, 65);
      doc.text(customer.phone, 15, 72);

      const addressLines = doc.splitTextToSize(
        customer.address || "Address not provided",
        85
      );

      doc.text(addressLines, 15, 79);

      // Dates

      doc.setFont("helvetica", "bold");

      doc.text("Invoice Date:", 125, 50);
      doc.text("Due Date:", 125, 58);
      doc.text("Status:", 125, 66);

      doc.setFont("helvetica", "normal");

      doc.text(
        new Date(invoiceDate + "T00:00:00").toLocaleDateString("en-IN"),
        195,
        50,
        { align: "right" }
      );

      doc.text(
        new Date(dueDate + "T00:00:00").toLocaleDateString("en-IN"),
        195,
        58,
        { align: "right" }
      );

      doc.text("Pending", 195, 66, {
        align: "right",
      });

      // Products table

      autoTable(doc, {
        startY: 100,

        margin: {
          left: 15,
          right: 15,
          bottom: 20,
        },

        head: [[
          "#",
          "Product / Service",
          "Quantity",
          "Price (INR)",
          "Total (INR)",
        ]],

        body: items.map((item, index) => {
          const quantity = Number(item.quantity);
          const price = Number(item.price);

          return [
            index + 1,
            item.name,
            quantity,
            formatMoney(price),
            formatMoney(quantity * price),
          ];
        }),

        theme: "grid",

        styles: {
          font: "helvetica",
          fontSize: 9,
          cellPadding: 4,
          overflow: "linebreak",
          textColor: [30, 30, 30],
          lineColor: [210, 220, 230],
        },

        headStyles: {
          fillColor: blue,
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor: [248, 250, 255],
        },

        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: "auto" },
          2: { cellWidth: 22, halign: "center" },
          3: { cellWidth: 35, halign: "right" },
          4: { cellWidth: 35, halign: "right" },
        },

        didDrawPage: () => {
          const pageNumber =
            doc.internal.getCurrentPageInfo().pageNumber;

          doc.setFontSize(8);
          doc.setTextColor(120, 120, 120);

          doc.text(
            `Invoice: ${invoiceNumber}`,
            15,
            290
          );

          doc.text(
            `Page ${pageNumber}`,
            195,
            290,
            { align: "right" }
          );
        },
      });

      // Invoice summary

      let y = doc.lastAutoTable.finalY + 15;

      if (y + 45 > 280) {
        doc.addPage();
        y = 25;
      }

      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text("Subtotal:", 140, y);

      doc.text(
        `INR ${formatMoney(subtotal)}`,
        195,
        y,
        { align: "right" }
      );

      y += 9;

      doc.text(`GST (${gst}%):`, 140, y);

      doc.text(
        `INR ${formatMoney(tax)}`,
        195,
        y,
        { align: "right" }
      );

      y += 7;

      doc.setFillColor(...lightBlue);

      doc.roundedRect(
        125,
        y,
        70,
        13,
        2,
        2,
        "F"
      );

      doc.setFont("helvetica", "bold");

      doc.text("Grand Total:", 130, y + 8);

      doc.text(
        `INR ${formatMoney(grandTotal)}`,
        190,
        y + 8,
        { align: "right" }
      );

      // Footer

      y += 25;

      if (y > 275) {
        doc.addPage();
        y = 25;
      }

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);

      doc.text(
        "Thank you for your business!",
        15,
        y
      );

      doc.save(`${invoiceNumber}.pdf`);

    } catch (error) {
      console.error("PDF generation error:", error);
      alert("PDF download failed. Please try again.");
    }
  };

  // Create new invoice

  const resetInvoice = () => {
    const confirmReset = window.confirm(
      "Create a new invoice? Current invoice details will be cleared."
    );

    if (!confirmReset) return;

    setCustomer(defaultCustomer);
    setItems(createDefaultItems());
    setGst(18);
    setInvoiceNumber(createInvoiceNumber());
    setInvoiceDate(getDate(new Date()));
    setDueDate(getDefaultDueDate());
  };

  return (
    <div className="app">

      <Header onDownload={downloadPDF} />

      <main className="dashboard">

        <div className="editor">

          <CustomerForm
            customer={customer}
            setCustomer={setCustomer}
          />

          <ItemsEditor
            items={items}
            setItems={setItems}
          />

          <Summary
            subtotal={subtotal}
            tax={tax}
            grandTotal={grandTotal}
            gst={gst}
            setGst={setGst}
          />

          <div className="action-area">

            <button
              className="generate-btn"
              onClick={downloadPDF}
            >
              ✨ Generate Invoice & Download PDF
            </button>

            <button
              className="reset-btn"
              onClick={resetInvoice}
            >
              Create New Invoice
            </button>

            <p className="save-status">
              {saved
                ? "✓ Invoice data saved in this browser"
                : "Invoice data not saved"}
            </p>

          </div>

        </div>

        <div className="preview-section">

          <InvoicePreview
            customer={customer}
            items={items}
            subtotal={subtotal}
            tax={tax}
            grandTotal={grandTotal}
            gst={gst}
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            dueDate={dueDate}
            company={company}
          />

        </div>

      </main>

    </div>
  );
}

export default App;
