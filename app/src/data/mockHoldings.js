// Mock holdings data. LTP and today's % change are real NSE closing
// figures as of 11 Aug 2026; qty/avgPrice are illustrative purchase
// history, not real transactions.

export const mockHoldings = [
  { id: "h1", symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", qty: 10, avgPrice: 2200.0, ltp: 2445.7, dayChangePct: 0.82, folderIds: [] },
  { id: "h2", symbol: "INFY", name: "Infosys Ltd", sector: "IT", qty: 20, avgPrice: 1320.0, ltp: 1185.7, dayChangePct: 0.23, folderIds: [] },
  { id: "h3", symbol: "WIPRO", name: "Wipro Ltd", sector: "IT", qty: 100, avgPrice: 165.0, ltp: 183.64, dayChangePct: 0.3, folderIds: [] },
  { id: "h4", symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking", qty: 40, avgPrice: 680.0, ltp: 729.0, dayChangePct: -0.27, folderIds: [] },
  { id: "h5", symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking", qty: 15, avgPrice: 1500.0, ltp: 1423.2, dayChangePct: 0.15, folderIds: [] },
  { id: "h6", symbol: "SBIN", name: "State Bank of India", sector: "Banking", qty: 25, avgPrice: 950.0, ltp: 1066.9, dayChangePct: -0.38, folderIds: [] },
  { id: "h7", symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking", qty: 60, avgPrice: 420.0, ltp: 389.7, dayChangePct: -0.96, folderIds: [] },
  { id: "h8", symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", sector: "FMCG", qty: 10, avgPrice: 2350.0, ltp: 2075.0, dayChangePct: 0.81, folderIds: [] },
  { id: "h9", symbol: "ITC", name: "ITC Ltd", sector: "FMCG", qty: 100, avgPrice: 250.0, ltp: 280.45, dayChangePct: -0.76, folderIds: [] },
  { id: "h10", symbol: "NESTLEIND", name: "Nestle India Ltd", sector: "FMCG", qty: 15, avgPrice: 1400.0, ltp: 1493.2, dayChangePct: -2.32, folderIds: [] },
  { id: "h11", symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries", sector: "Pharma", qty: 12, avgPrice: 1700.0, ltp: 1952.3, dayChangePct: 0.42, folderIds: [] },
  { id: "h12", symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", sector: "Pharma", qty: 18, avgPrice: 1280.0, ltp: 1160.4, dayChangePct: -0.99, folderIds: [] },
  { id: "h13", symbol: "CIPLA", name: "Cipla Ltd", sector: "Pharma", qty: 15, avgPrice: 1350.0, ltp: 1473.2, dayChangePct: 0.46, folderIds: [] },
  { id: "h14", symbol: "MARUTI", name: "Maruti Suzuki India Ltd", sector: "Auto", qty: 2, avgPrice: 12500.0, ltp: 13980.0, dayChangePct: -0.71, folderIds: [] },
  { id: "h15", symbol: "TATAMOTORS", name: "Tata Motors Ltd", sector: "Auto", qty: 45, avgPrice: 520.0, ltp: 459.0, dayChangePct: 1.3, folderIds: [] },
];
