import styled from 'styled-components';

const PDFTableStyles = styled.div`
  p {
    color: #454545;
  }
  table {
    width: 100%;
    background: ${props => props.theme.white};
    margin: 0;
    border: 1px solid rgba(34,36,38,.15);
    box-shadow: none;
    border-radius: .285rem .285rem 0 0;
    text-align: left;
    color: rgba(0,0,0,.87);
    border-collapse: separate;
    border-spacing: 0;
    font-size: .875em;
  }

  table thead {
    text-align: left;
    box-shadow: none;
    background: #FAFAFA;  
    tr {
      th {
        cursor: aFAFAFA;  
        //background: ${props => props.theme.tableBackgroundColor};
        background: ${props => props.theme.blue};
        text-align: inherit;
        color: ${props => props.theme.white};
        padding: .92857143em .78571429em;
        vertical-align: inherit;
        font-style: none;
        font-weight: 500;
        text-transform: none;
        border-bottom: 1px solid rgba(34,36,38,.1);
        border-left: 1px solid rgba(34,36,38,.1);
        .table-icon {
          margin-left: 0.5em;
        }
      }
      th span {
        text-decoration: underline;
      }
      th:first-child {
        border-radius: .285rem 0 0 0;
        border-left: none
      }
      th:last-child{ 
        border-radius: 0 .285rem 0 0;
      }
      th:nth-child(2) {
        text-align: left;
      }
    }
  }

  table tbody {
    tr {
      td {
        background: ${props => props.theme.white};
        padding: 0.78571429em 0.78571429em;
        border-left: 1px solid rgba(34,36,38,.1);
        border-top: 1px solid rgba(34,36,38,.1);
        font-size: 13px;
      }
      td:first-child {
        border-left: none;
      }
      td:nth-child(2) {
        text-align: left;
      }
    }
    tr:first-child {
      td {
        border-top: none;
      }
    }
  }

  table tfoot {
    .total {
      font-weight: 900;
    }
    tr td {
        background: ${props => props.theme.white};
        padding: 0.78571429em 0.78571429em;
        border-left: 1px solid rgba(34,36,38,.1);
        border-top: 1px solid rgba(34,36,38,.1);
        font-weight: 700;
    }
    tr td:first-child {
      border-left: none;
      border-radius: 0 0 0 3px;
    }
    tr td:last-child {
      border-radius: 0 0 .285rem 0;
    }
    tr td:nth-child(3) {
      text-align: right;
    }
    tr th {
        cursor: auto;
        text-align: inherit;
        color: rgba(0,0,0,.87);
        padding: .92857143em .78571429em;
        vertical-align: inherit;
        font-style: none;
        font-weight: 700;
        text-transform: none;
        border-top: 1px solid rgba(34,36,38,.1);

    }
  }

`;

export default PDFTableStyles;