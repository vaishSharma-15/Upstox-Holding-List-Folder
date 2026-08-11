// Mock holdings data. LTP and today's % change are real NSE closing
// figures from 11 Aug 2026 (the last completed trading session); qty/
// avgPrice are illustrative purchase history, not real transactions.
//
// Note: Tata Motors demerged in Oct/Nov 2025 into Tata Motors Passenger
// Vehicles (TMPV) and a separately-listed commercial vehicle business —
// the old TATAMOTORS combined entity no longer exists, so it's been
// swapped for Bajaj Auto here.

export const mockHoldings = [
  { id: "h1", symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", qty: 10, avgPrice: 2200.0, ltp: 2445.7, dayChangePct: 0.81, folderIds: [] },
  { id: "h2", symbol: "INFY", name: "Infosys Ltd", sector: "IT", qty: 20, avgPrice: 1320.0, ltp: 1191.7, dayChangePct: 0.74, folderIds: [] },
  { id: "h3", symbol: "WIPRO", name: "Wipro Ltd", sector: "IT", qty: 100, avgPrice: 165.0, ltp: 183.64, dayChangePct: -1.0, folderIds: [] },
  { id: "h4", symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking", qty: 40, avgPrice: 680.0, ltp: 729.0, dayChangePct: -0.27, folderIds: [] },
  { id: "h5", symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking", qty: 15, avgPrice: 1500.0, ltp: 1422.8, dayChangePct: -0.63, folderIds: [] },
  { id: "h6", symbol: "SBIN", name: "State Bank of India", sector: "Banking", qty: 25, avgPrice: 950.0, ltp: 1066.0, dayChangePct: -0.47, folderIds: [] },
  { id: "h7", symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking", qty: 60, avgPrice: 420.0, ltp: 390.25, dayChangePct: -0.01, folderIds: [] },
  { id: "h8", symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", sector: "FMCG", qty: 10, avgPrice: 2350.0, ltp: 2096.0, dayChangePct: 0.79, folderIds: [] },
  { id: "h9", symbol: "ITC", name: "ITC Ltd", sector: "FMCG", qty: 100, avgPrice: 250.0, ltp: 280.65, dayChangePct: -0.71, folderIds: [] },
  { id: "h10", symbol: "NESTLEIND", name: "Nestle India Ltd", sector: "FMCG", qty: 15, avgPrice: 1400.0, ltp: 1493.2, dayChangePct: -2.32, folderIds: [] },
  { id: "h11", symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries", sector: "Pharma", qty: 12, avgPrice: 1700.0, ltp: 1954.0, dayChangePct: 0.49, folderIds: [] },
  { id: "h12", symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", sector: "Pharma", qty: 18, avgPrice: 1280.0, ltp: 1160.4, dayChangePct: -0.99, folderIds: [] },
  { id: "h13", symbol: "CIPLA", name: "Cipla Ltd", sector: "Pharma", qty: 15, avgPrice: 1350.0, ltp: 1463.0, dayChangePct: -0.32, folderIds: [] },
  { id: "h14", symbol: "MARUTI", name: "Maruti Suzuki India Ltd", sector: "Auto", qty: 2, avgPrice: 12500.0, ltp: 14097.0, dayChangePct: 0.43, folderIds: [] },
  { id: "h15", symbol: "BAJAJ-AUTO", name: "Bajaj Auto Ltd", sector: "Auto", qty: 2, avgPrice: 10500.0, ltp: 11681.0, dayChangePct: 0.16, folderIds: [] },
];
