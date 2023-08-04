import React, { useState } from 'react';
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai';

interface Column {
  header: string;
  key: string;
}

interface DataEntry {
  [key: string]: string | number;
}

interface TableProps {
  columns: Column[];
  data: DataEntry[];
  setData: React.Dispatch<React.SetStateAction<DataEntry[]>>;
}

const Table: React.FC<TableProps> = ({ columns, data, setData }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
    key: null,
    direction: null,
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newEntry, setNewEntry] = useState<DataEntry>({});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 5;

  const sortTable = (key: string) => {
    let direction: string = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = (): DataEntry[] => {
    if (!sortConfig.key) {
      return data;
    }
  
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof DataEntry];
      const bValue = b[sortConfig.key as keyof DataEntry];
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  
    return sorted;
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = (): DataEntry[] => {
    return sortedData().filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const totalPages: number = Math.ceil(filteredData().length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageData = (): DataEntry[] => {
    const startIdx: number = (currentPage - 1) * itemsPerPage;
    const endIdx: number = startIdx + itemsPerPage;
    return filteredData().slice(startIdx, endIdx);
  };

  const handleRowSelection = (rowIndex: number) => {
    const index: number = selectedRows.indexOf(rowIndex);
    if (index === -1) {
      setSelectedRows([...selectedRows, rowIndex]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowIndex));
    }
  };

  const handleSingleDelete = () => {
    if (selectedRows.length !== 1) return;

    const indexToRemove: number = selectedRows[0];
    const updatedData: DataEntry[] = [...data];
    updatedData.splice(indexToRemove, 1);

    setData(updatedData);
    setSelectedRows([]);
  };

  const handleMultipleDelete = () => {
    if (selectedRows.length === 0) return;

    const indicesToRemove: number[] = [...selectedRows].sort((a, b) => b - a);
    const updatedData: DataEntry[] = [...data];

    indicesToRemove.forEach((index) => {
      updatedData.splice(index, 1);
    });

    setData(updatedData);
    setSelectedRows([]);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry((prevEntry) => ({ ...prevEntry, [name]: value }));
  };

  const handleAddEntry = () => {
    const updatedData: DataEntry[] = [...data, newEntry];
    setData(updatedData);
    setNewEntry({});
    setShowForm(false);
  };


  const convertToCSV = (data: DataEntry[]): string => {
    const csvRows: string[] = [];

    // Add the header row with column names
    const headerRow = columns.map((column) => column.header);
    csvRows.push(headerRow.join(','));

    // Add the data rows
    data.forEach((row) => {
      const csvRow = columns.map((column) => row[column.key]);
      csvRows.push(csvRow.join(','));
    });

    // Combine all rows into a single CSV string
    return csvRows.join('\n');
  };

  const handleDownload = () => {
    // Convert the data to CSV format
    const csvData = convertToCSV(data);

    // Create a Blob object with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Generate a download link for the Blob object
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'table_data.csv';

    // Append the anchor element to the document and click it to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up by removing the anchor element and revoking the URL
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };
  
  return (
    <section className="table-container">
    {showForm ? (
      <form className="form-container" style={{alignItems: 'start'}} onSubmit={handleAddEntry}>
        <h3>Add People</h3>
        <div className='form-container-columns'>
          {columns.map((column, index) => (
            <div key={index} className="form-group">
              <label htmlFor={column.key}>{column.header}:</label>
              <input
                type="text"
                id={column.key}
                name={column.key}
                value={newEntry[column.key] || ''}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
        <div className="actions">
          <button type="submit">Add</button>
          <button type="button" onClick={handleFormToggle}>Cancel</button>
        </div>
      </form>
    ) : (
      <>
        <div className='table-header'>
          <h4>People</h4>
          <div className="actions">
           <button onClick={handleSingleDelete} disabled={selectedRows.length !== 1} data-testid={`delete-button`}>
              Delete Selected
            </button>
            <button onClick={handleMultipleDelete} disabled={selectedRows.length === 0}>
              Delete Multiple
            </button>
            <button onClick={handleDownload}><AiOutlineDownload /> Download</button>
            <button onClick={handleFormToggle}><AiOutlinePlus/> Add Entry</button>
          </div>
       
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <table>
          <thead>
            <tr>
              <th></th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => sortTable(column.key)}
                  className={sortConfig.key === column.key ? (sortConfig.direction || '') : ''}
                  data-testid={`table-header-${column.key}`} // Add test ID for table header
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getPageData().map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleRowSelection(rowIndex)}
                    data-testid={`delete-checkbox-${rowIndex}`} // Add test ID for delete checkbox
                  />
                </td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} data-testid={`table-cell-${rowIndex}-${column.key}`}> {/* Add test ID for table cell */}
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
      </>
    )}
  </section>
  
  );
};

export default Table;
