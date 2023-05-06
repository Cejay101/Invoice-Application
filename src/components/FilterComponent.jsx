import React, { useState } from "react";
import "./FilterComponent.css";
import { useTheme } from "../hooks/useTheme";

export default function FilterComponent({ onFilterChange }) {
  const filterList = ["all", "draft", "pending", "paid"];
  const [selectedFilter, setSelectedFilter] = useState("all");
 const {mode}=useTheme();
  const handleFilterChange = (event) => {
    const { value } = event.target;
    setSelectedFilter(value);

    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  return (
    <div
      className={`filter-selector ${mode}`}
      style={{ background: mode === "light" ? "#eaecf8" : "" }}
    >
      {filterList.map((filter) => (
        <label key={filter}>
          <input
            type="radio"
            name="filter"
            value={filter}
            checked={selectedFilter === filter}
            onChange={handleFilterChange}
          />
          <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
        </label>
      ))}
    </div>
  );
}
