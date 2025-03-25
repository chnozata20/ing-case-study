import { css } from 'lit';

export const gridStyles = css`
  /* Grid görünümü için stiller */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    margin-bottom: 1rem;
  }
  
  .employee-card {
    background: white;
    border-radius: 8px;
    padding: 1.25rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .employee-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .employee-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  
  .employee-name {
    font-weight: var(--font-weight-bold, 700);
    font-size: var(--font-size-table-content, 14px);
    color: var(--text-color, #333333);
    margin-bottom: 0.25rem;
  }
  
  .employee-position {
    font-size: var(--font-size-secondary, 12px);
    color: var(--text-color-secondary, #666666);
  }
  
  .employee-detail-row {
    display: flex;
    margin-bottom: 0.5rem;
  }
  
  .detail-label {
    font-weight: var(--font-weight-medium, 500);
    width: 110px;
    color: var(--text-color-secondary, #666666);
    font-size: var(--font-size-table-content, 14px);
  }
  
  .detail-value {
    color: var(--text-color, #333333);
    flex: 1;
    font-size: var(--font-size-table-content, 14px);
  }
  
  .phone-value, .email-value {
    color: var(--text-color-light, #999999);
    font-size: var(--font-size-secondary, 12px);
  }

  @media (max-width: 1200px) {
    .phone-value, 
    .email-value {
      font-size: var(--font-size-secondary, 11px);
    }
  }
`; 