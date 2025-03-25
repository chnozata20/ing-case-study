import { css } from 'lit';

export const tableStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .data-table-wrapper {
    background: white;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .data-table-header {
    background-color: #FFFFFF;
    border-bottom: 1px solid #EAEAEA;
  }

  .data-table-header th {
    padding: 1rem;
    text-align: left;
    font-weight: var(--font-weight-medium, 500);
    color: var(--primary-color, #FF6600);
    white-space: nowrap;
    font-size: var(--font-size-table-header, 14px);
  }

  .data-table-header th:first-child {
    width: 30px;
    padding-left: 1rem;
    text-align: center;
  }
  
  .data-table-header th:last-child {
    width: 100px;
    text-align: center;
  }

  .data-table-body td {
    padding: 0.8rem 1rem;
    border-bottom: 1px solid #EAEAEA;
    font-size: var(--font-size-table-content, 14px);
    color: var(--text-color, #333333);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .data-table-body td:first-child {
    width: 30px;
    padding-left: 1rem;
    text-align: center;
  }
  
  .data-table-body td:last-child {
    width: 100px;
    text-align: center;
  }

  .data-table-body tr:nth-child(even) {
    background-color: #F9F9F9;
  }

  .data-table-body tr:last-child td {
    border-bottom: none;
  }

  .data-table-body tr:hover {
    background-color: #F5F5F5;
  }

  .row-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  /* Tablo sütun genişlikleri */
  .col-firstName { width: 10%; }
  .col-lastName { width: 10%; }
  .col-startDate { width: 12%; }
  .col-birthDate { width: 10%; }
  .col-phone { width: 15%; }
  .col-email { width: 15%; }
  .col-department { width: 10%; }
  .col-position { width: 10%; }
  .col-select { width: 40px; }
  .col-actions { width: 100px; }

  .checkbox-cell {
    width: 40px;
    text-align: center;
  }
  
  .checkbox-cell input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: var(--primary-color, #FF6600);
  }

  .action-cell {
    width: 100px;
    text-align: right;
  }

  .action-button {
    color: var(--primary-color, #FF6600);
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 0.25rem;
    font-size: var(--font-size-icon, 16px);
  }

  .action-button:hover {
    color: #E65800;
  }

  @media (max-width: 1200px) {
    .data-table {
      display: block;
      overflow-x: auto;
    }
    
    .data-table-body td,
    .data-table-header th {
      font-size: var(--font-size-table-content, 13px);
    }
  }
`; 