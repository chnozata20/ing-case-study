import { css } from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    width: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #F5F5F5;
  }

  .employee-list-container {
    padding: 1rem;
    width: 100%;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .list-title {
    margin: 0;
    font-size: var(--font-size-page-title, 24px);
    font-weight: var(--font-weight-bold, 700);
    color: var(--primary-color, #FF6600);
  }

  .list-subtitle {
    color: var(--text-color-light, #999999);
    font-size: var(--font-size-secondary, 12px);
    margin-top: 0.25rem;
  }

  .list-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .search-container {
    flex: 1;
    max-width: 350px;
  }

  .controls-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .add-button-container {
    display: flex;
    justify-content: flex-end;
  }
  
  /* Dialog styling */
  .employee-info {
    margin-top: 0.75rem;
    font-weight: var(--font-weight-bold, 700);
    color: var(--primary-color, #FF6600);
    font-size: 1.1rem;
    text-align: center;
    padding: 0.5rem;
    background-color: #FFF8F3;
    border-radius: 4px;
    border: 1px solid #FFE0CC;
  }

  @media (max-width: 1200px) {
    .list-actions {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }

    .search-container {
      max-width: 100%;
    }
    
    .controls-container {
      justify-content: space-between;
    }
    
    .list-title {
      font-size: var(--font-size-page-title, 22px);
    }
  }
`; 