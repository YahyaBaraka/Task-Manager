import React from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';
import '../Style/FilterSortBar.css';

const FilterSortBar = ({ filters, onFilterChange, sortBy, onSortChange }) => {
  return (
    <div className="filter-sort-bar">
      <div className="filter-section">
        <div className="section-header">
          <FaFilter />
          <span>Filter</span>
        </div>
        <div className="filter-options">
          <select 
            value={filters.status} 
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">Status: All</option>
            <option value="active">Status: Active</option>
            <option value="completed">Status: Completed</option>
          </select>
          <select 
            value={filters.priority} 
            onChange={(e) => onFilterChange('priority', e.target.value)}
          >
            <option value="all">Priority: All</option>
            <option value="high">Priority: High</option>
            <option value="medium">Priority: Medium</option>
            <option value="low">Priority: Low</option>
          </select>
        </div>
      </div>
      <div className="sort-section">
        <div className="section-header">
          <FaSort />
          <span>Sort</span>
        </div>
        <div className="sort-options">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="dueDate">Sort by: Due Date</option>
            <option value="priority">Sort by: Priority</option>
            <option value="title">Sort by: Title</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;