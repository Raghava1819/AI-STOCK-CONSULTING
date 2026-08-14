// Comprehensive real market data for top 75 Indian stocks provided by user

export const STOCKS = {
  RELIANCE: {
    symbol: 'RELIANCE', name: 'Reliance Industries', shortName: 'Reliance',
    sector: 'Conglomerate', price: 1275.90, change: 15.4, changePercent: 1.22,
    marketCap: '17,26,481.26 Cr', roe: 8.91, roce: 10.26, debt: '4,02,962.00 Cr',
    debtEquity: 0.45, promoterHolding: 50.48, pe: 23.10, dividendYield: 0.47,
    bookValue: 668.05, pat: '23,196.00 Cr', salesQuarter: '3,09,468.00 Cr',
    salesGrowth: 15.00, pat12m: '74,727.00 Cr', evEbitda: 9.73, high52: 1600, low52: 1150,
    recommendation: 'BUY', targetPrice: 1550, rating: 8.5
  },
  BHARTIARTL: {
    symbol: 'BHARTIARTL', name: 'Bharti Airtel', shortName: 'Airtel',
    sector: 'Telecom - Services', price: 1950.20, change: 22.1, changePercent: 1.15,
    marketCap: '12,17,252.18 Cr', roe: 20.27, roce: 17.56, debt: '1,95,411.70 Cr',
    debtEquity: 1.31, promoterHolding: 48.87, pe: 45.72, dividendYield: 1.23,
    bookValue: 244.63, pat: '9,247.40 Cr', salesQuarter: '55,383.20 Cr',
    salesGrowth: 21.96, pat12m: '26,623.37 Cr', evEbitda: 11.58, high52: 2100, low52: 1350,
    recommendation: 'BUY', targetPrice: 2250, rating: 8.7
  },
  HDFCBANK: {
    symbol: 'HDFCBANK', name: 'HDFC Bank', shortName: 'HDFC Bank',
    sector: 'Banks', price: 748.20, change: -4.2, changePercent: -0.56,
    marketCap: '11,52,612.78 Cr', roe: 13.64, roce: 7.02, debt: '37,33,201.93 Cr',
    debtEquity: 6.21, promoterHolding: 0.00, pe: 14.59, dividendYield: 1.74,
    bookValue: 390.49, pat: '20,382.69 Cr', salesQuarter: '90,575.33 Cr',
    salesGrowth: 2.81, pat12m: '79,012.77 Cr', evEbitda: 16.11, high52: 900, low52: 650,
    recommendation: 'BUY', targetPrice: 920, rating: 8.8
  },
  ICICIBANK: {
    symbol: 'ICICIBANK', name: 'ICICI Bank', shortName: 'ICICI Bank',
    sector: 'Banks', price: 1437.90, change: 12.8, changePercent: 0.90,
    marketCap: '10,32,000.37 Cr', roe: 15.92, roce: 7.18, debt: '20,96,680.46 Cr',
    debtEquity: 5.55, promoterHolding: 0.00, pe: 18.40, dividendYield: 0.83,
    bookValue: 526.68, pat: '16,276.22 Cr', salesQuarter: '52,240.85 Cr',
    salesGrowth: 3.96, pat12m: '56,090.16 Cr', evEbitda: 18.20, high52: 1500, low52: 1100,
    recommendation: 'STRONG BUY', targetPrice: 1700, rating: 9.1
  },
  SBIN: {
    symbol: 'SBIN', name: 'SBI', shortName: 'State Bank of India',
    sector: 'Banks', price: 1013.70, change: 18.5, changePercent: 1.86,
    marketCap: '9,35,524.38 Cr', roe: 15.38, roce: 6.13, debt: '68,20,399.27 Cr',
    debtEquity: 11.44, promoterHolding: 55.47, pe: 11.23, dividendYield: 1.71,
    bookValue: 645.82, pat: '20,507.98 Cr', salesQuarter: '1,31,080.12 Cr',
    salesGrowth: 5.02, pat12m: '83,298.78 Cr', evEbitda: 17.31, high52: 1100, low52: 750,
    recommendation: 'BUY', targetPrice: 1200, rating: 8.4
  },
  TCS: {
    symbol: 'TCS', name: 'TCS', shortName: 'Tata Consultancy Services',
    sector: 'IT - Software', price: 2446.60, change: -12.4, changePercent: -0.50,
    marketCap: '8,85,374.85 Cr', roe: 51.81, roce: 63.03, debt: '11,283.00 Cr',
    debtEquity: 0.11, promoterHolding: 71.77, pe: 16.49, dividendYield: 2.62,
    bookValue: 296.40, pat: '13,420.00 Cr', salesQuarter: '72,275.00 Cr',
    salesGrowth: 7.70, pat12m: '53,690.47 Cr', evEbitda: 11.27, high52: 3200, low52: 2300,
    recommendation: 'HOLD', targetPrice: 2800, rating: 7.8
  },
  BAJFINANCE: {
    symbol: 'BAJFINANCE', name: 'Bajaj Finance', shortName: 'Bajaj Finance',
    sector: 'Finance', price: 1054.40, change: 14.2, changePercent: 1.37,
    marketCap: '6,56,621.21 Cr', roe: 18.25, roce: 10.87, debt: '4,35,112.49 Cr',
    debtEquity: 3.82, promoterHolding: 54.67, pe: 34.16, dividendYield: 0.51,
    bookValue: 183.21, pat: '5,553.30 Cr', salesQuarter: '21,605.79 Cr',
    salesGrowth: 19.11, pat12m: '19,222.06 Cr', evEbitda: 19.21, high52: 1300, low52: 950,
    recommendation: 'BUY', targetPrice: 1350, rating: 8.3
  },
  LT: {
    symbol: 'LT', name: 'Larsen & Toubro', shortName: 'L&T',
    sector: 'Construction', price: 3931.40, change: 42.5, changePercent: 1.09,
    marketCap: '5,41,095.86 Cr', roe: 15.86, roce: 14.57, debt: '1,25,496.59 Cr',
    debtEquity: 1.15, promoterHolding: 0.00, pe: 30.71, dividendYield: 0.97,
    bookValue: 794.47, pat: '4,988.03 Cr', salesQuarter: '67,941.74 Cr',
    salesGrowth: 9.78, pat12m: '17,619.40 Cr', evEbitda: 15.00, high52: 4200, low52: 3200,
    recommendation: 'BUY', targetPrice: 4400, rating: 8.6
  },
  LICI: {
    symbol: 'LICI', name: 'Life Insurance', shortName: 'LIC',
    sector: 'Insurance', price: 423.90, change: -2.1, changePercent: -0.49,
    marketCap: '5,36,296.49 Cr', roe: 37.82, roce: 35.14, debt: '0.00 Cr',
    debtEquity: 0.00, promoterHolding: 96.50, pe: 9.33, dividendYield: 2.36,
    bookValue: 139.61, pat: '23,467.18 Cr', salesQuarter: '2,76,743.77 Cr',
    salesGrowth: 9.87, pat12m: '57,453.15 Cr', evEbitda: 8.57, high52: 600, low52: 380,
    recommendation: 'BUY', targetPrice: 550, rating: 8.1
  },
  HINDUNILVR: {
    symbol: 'HINDUNILVR', name: 'Hind. Unilever', shortName: 'HUL',
    sector: 'Personal Products', price: 2117.80, change: 18.2, changePercent: 0.87,
    marketCap: '4,97,562.12 Cr', roe: 31.03, roce: 28.42, debt: '1,478.00 Cr',
    debtEquity: 0.03, promoterHolding: 61.90, pe: 45.12, dividendYield: 1.94,
    bookValue: 207.44, pat: '2,680.00 Cr', salesQuarter: '17,341.00 Cr',
    salesGrowth: 5.80, pat12m: '11,027.55 Cr', evEbitda: 30.82, high52: 2700, low52: 2000,
    recommendation: 'HOLD', targetPrice: 2450, rating: 7.9
  },
  SUNPHARMA: {
    symbol: 'SUNPHARMA', name: 'Sun Pharma.Inds.', shortName: 'Sun Pharma',
    sector: 'Pharmaceuticals & Biotechnology', price: 1989.90, change: 14.5, changePercent: 0.73,
    marketCap: '4,77,492.05 Cr', roe: 15.95, roce: 20.53, debt: '4,627.32 Cr',
    debtEquity: 0.06, promoterHolding: 54.48, pe: 38.43, dividendYield: 0.80,
    bookValue: 348.31, pat: '2,709.66 Cr', salesQuarter: '14,611.79 Cr',
    salesGrowth: 11.19, pat12m: '12,426.12 Cr', evEbitda: 23.87, high52: 2100, low52: 1600,
    recommendation: 'BUY', targetPrice: 2200, rating: 8.5
  },
  INFY: {
    symbol: 'INFY', name: 'Infosys', shortName: 'Infosys',
    sector: 'IT - Software', price: 1155.60, change: -8.4, changePercent: -0.72,
    marketCap: '4,68,958.99 Cr', roe: 31.89, roce: 39.95, debt: '8,737.00 Cr',
    debtEquity: 0.10, promoterHolding: 13.82, pe: 15.04, dividendYield: 4.15,
    bookValue: 224.54, pat: '7,775.00 Cr', salesQuarter: '48,211.00 Cr',
    salesGrowth: 11.22, pat12m: '31,174.41 Cr', evEbitda: 9.50, high52: 1700, low52: 1100,
    recommendation: 'BUY', targetPrice: 1500, rating: 8.2
  },
  MARUTI: {
    symbol: 'MARUTI', name: 'Maruti Suzuki', shortName: 'Maruti',
    sector: 'Automobiles', price: 13948.00, change: 185.0, changePercent: 1.34,
    marketCap: '4,38,928.31 Cr', roe: 14.43, roce: 19.02, debt: '102.50 Cr',
    debtEquity: 0.00, promoterHolding: 58.65, pe: 29.90, dividendYield: 1.00,
    bookValue: 3408.25, pat: '3,659.00 Cr', salesQuarter: '52,462.50 Cr',
    salesGrowth: 19.88, pat12m: '14,679.50 Cr', evEbitda: 16.76, high52: 14500, low52: 11000,
    recommendation: 'BUY', targetPrice: 15500, rating: 8.6
  },
  TITAN: {
    symbol: 'TITAN', name: 'Titan Company', shortName: 'Titan',
    sector: 'Consumer Durables', price: 4850.20, change: 56.4, changePercent: 1.18,
    marketCap: '4,30,671.27 Cr', roe: 37.69, roce: 20.54, debt: '30,621.00 Cr',
    debtEquity: 1.95, promoterHolding: 52.90, pe: 83.63, dividendYield: 0.31,
    bookValue: 176.88, pat: '1,179.00 Cr', salesQuarter: '26,920.00 Cr',
    salesGrowth: 44.87, pat12m: '5,149.65 Cr', evEbitda: 51.56, high52: 5200, low52: 3800,
    recommendation: 'BUY', targetPrice: 5350, rating: 8.4
  },
  ADANIENT: {
    symbol: 'ADANIENT', name: 'Adani Enterp.', shortName: 'Adani Enterprises',
    sector: 'Industrial Manufacturing', price: 3024.50, change: -45.2, changePercent: -1.47,
    marketCap: '4,09,353.70 Cr', roe: -3.38, roce: 5.80, debt: '1,06,621.79 Cr',
    debtEquity: 1.32, promoterHolding: 71.97, pe: 172.43, dividendYield: 0.04,
    bookValue: 626.54, pat: '-1,461.54 Cr', salesQuarter: '32,923.98 Cr',
    salesGrowth: 18.06, pat12m: '2,373.98 Cr', evEbitda: 27.52, high52: 3500, low52: 2400,
    recommendation: 'HOLD', targetPrice: 3200, rating: 6.9
  },
  ADANIPOWER: {
    symbol: 'ADANIPOWER', name: 'Adani Power', shortName: 'Adani Power',
    sector: 'Power', price: 209.52, change: 3.4, changePercent: 1.65,
    marketCap: '4,04,071.81 Cr', roe: 21.07, roce: 17.22, debt: '54,670.29 Cr',
    debtEquity: 0.84, promoterHolding: 74.96, pe: 28.35, dividendYield: 0.00,
    bookValue: 33.67, pat: '4,866.60 Cr', salesQuarter: '18,901.89 Cr',
    salesGrowth: 6.64, pat12m: '14,255.13 Cr', evEbitda: 17.53, high52: 250, low52: 170,
    recommendation: 'BUY', targetPrice: 245, rating: 8.0
  },
  MM: {
    symbol: 'M&M', name: 'M & M', shortName: 'Mahindra & Mahindra',
    sector: 'Automobiles', price: 3221.80, change: 48.2, changePercent: 1.52,
    marketCap: '4,00,547.36 Cr', roe: 20.33, roce: 15.10, debt: '1,36,935.91 Cr',
    debtEquity: 1.47, promoterHolding: 18.45, pe: 23.16, dividendYield: 1.02,
    bookValue: 748.65, pat: '5,259.91 Cr', salesQuarter: '54,981.91 Cr',
    salesGrowth: 24.76, pat12m: '17,295.53 Cr', evEbitda: 11.92, high52: 3400, low52: 2500,
    recommendation: 'BUY', targetPrice: 3600, rating: 8.7
  },
  ADANIPORTS: {
    symbol: 'ADANIPORTS', name: 'Adani Ports', shortName: 'Adani Ports & SEZ',
    sector: 'Transport Infrastructure', price: 1719.70, change: 18.6, changePercent: 1.09,
    marketCap: '3,96,055.25 Cr', roe: 16.38, roce: 14.12, debt: '63,565.52 Cr',
    debtEquity: 0.66, promoterHolding: 66.03, pe: 29.81, dividendYield: 0.44,
    bookValue: 416.50, pat: '3,649.50 Cr', salesQuarter: '10,820.80 Cr',
    salesGrowth: 23.85, pat12m: '13,287.46 Cr', evEbitda: 17.10, high52: 1850, low52: 1300,
    recommendation: 'BUY', targetPrice: 1950, rating: 8.5
  },
  KOTAKBANK: {
    symbol: 'KOTAKBANK', name: 'Kotak Mah. Bank', shortName: 'Kotak Bank',
    sector: 'Banks', price: 390.20, change: -1.8, changePercent: -0.46,
    marketCap: '3,87,843.92 Cr', roe: 11.39, roce: 6.98, debt: '6,62,333.86 Cr',
    debtEquity: 3.65, promoterHolding: 25.87, pe: 19.36, dividendYield: 0.17,
    bookValue: 182.20, pat: '5,480.46 Cr', salesQuarter: '18,354.57 Cr',
    salesGrowth: 5.68, pat12m: '20,029.26 Cr', evEbitda: 17.59, high52: 450, low52: 340,
    recommendation: 'HOLD', targetPrice: 420, rating: 7.7
  },
  AXISBANK: {
    symbol: 'AXISBANK', name: 'Axis Bank', shortName: 'Axis Bank',
    sector: 'Banks', price: 1235.40, change: 14.8, changePercent: 1.21,
    marketCap: '3,84,343.22 Cr', roe: 13.12, roce: 6.24, debt: '16,56,431.05 Cr',
    debtEquity: 7.47, promoterHolding: 7.87, pe: 13.84, dividendYield: 0.08,
    bookValue: 712.37, pat: '7,670.37 Cr', salesQuarter: '35,541.96 Cr',
    salesGrowth: 5.58, pat12m: '27,773.44 Cr', evEbitda: 17.97, high52: 1350, low52: 1000,
    recommendation: 'BUY', targetPrice: 1400, rating: 8.4
  },
  HCLTECH: {
    symbol: 'HCLTECH', name: 'HCL Technologies', shortName: 'HCL Tech',
    sector: 'IT - Software', price: 1344.30, change: -6.2, changePercent: -0.46,
    marketCap: '3,64,812.07 Cr', roe: 23.81, roce: 30.40, debt: '5,215.00 Cr',
    debtEquity: 0.07, promoterHolding: 60.88, pe: 20.12, dividendYield: 4.02,
    bookValue: 276.99, pat: '4,626.00 Cr', salesQuarter: '34,579.00 Cr',
    salesGrowth: 12.59, pat12m: '18,130.33 Cr', evEbitda: 11.94, high52: 1550, low52: 1200,
    recommendation: 'BUY', targetPrice: 1550, rating: 8.3
  },
  ITC: {
    symbol: 'ITC', name: 'ITC', shortName: 'ITC',
    sector: 'Cigarettes & Tobacco Products', price: 286.25, change: 2.1, changePercent: 0.74,
    marketCap: '3,58,593.30 Cr', roe: 29.32, roce: 38.91, debt: '2,399.06 Cr',
    debtEquity: 0.03, promoterHolding: 0.00, pe: 17.16, dividendYield: 5.07,
    bookValue: 57.87, pat: '5,469.74 Cr', salesQuarter: '17,824.68 Cr',
    salesGrowth: 4.71, pat12m: '20,895.43 Cr', evEbitda: 11.89, high52: 340, low52: 260,
    recommendation: 'BUY', targetPrice: 330, rating: 8.6
  },
  ULTRACEMCO: {
    symbol: 'ULTRACEMCO', name: 'UltraTech Cem.', shortName: 'UltraTech Cement',
    sector: 'Cement & Cement Products', price: 11998.00, change: 120.0, changePercent: 1.01,
    marketCap: '3,53,330.05 Cr', roe: 11.10, roce: 12.66, debt: '23,755.09 Cr',
    debtEquity: 0.31, promoterHolding: 59.33, pe: 40.97, dividendYield: 2.00,
    bookValue: 2600.24, pat: '2,603.72 Cr', salesQuarter: '24,648.20 Cr',
    salesGrowth: 17.18, pat12m: '8,624.55 Cr', evEbitda: 20.71, high52: 12800, low52: 9800,
    recommendation: 'BUY', targetPrice: 13200, rating: 8.5
  },
  NTPC: {
    symbol: 'NTPC', name: 'NTPC', shortName: 'NTPC',
    sector: 'Power', price: 343.50, change: 4.2, changePercent: 1.24,
    marketCap: '3,33,222.97 Cr', roe: 13.97, roce: 8.33, debt: '2,71,004.58 Cr',
    debtEquity: 1.33, promoterHolding: 51.10, pe: 12.00, dividendYield: 2.43,
    bookValue: 209.53, pat: '6,896.44 Cr', salesQuarter: '50,740.96 Cr',
    salesGrowth: 2.35, pat12m: '27,762.97 Cr', evEbitda: 9.93, high52: 390, low52: 300,
    recommendation: 'BUY', targetPrice: 400, rating: 8.2
  },
  JSWSTEEL: {
    symbol: 'JSWSTEEL', name: 'JSW Steel', shortName: 'JSW Steel',
    sector: 'Ferrous Metals', price: 1276.60, change: 16.5, changePercent: 1.31,
    marketCap: '3,12,437.69 Cr', roe: 10.24, roce: 10.96, debt: '99,310.00 Cr',
    debtEquity: 0.99, promoterHolding: 44.30, pe: 25.95, dividendYield: 0.56,
    bookValue: 409.14, pat: '4,696.00 Cr', salesQuarter: '47,364.00 Cr',
    salesGrowth: 12.22, pat12m: '12,040.47 Cr', evEbitda: 11.31, high52: 1400, low52: 1050,
    recommendation: 'HOLD', targetPrice: 1380, rating: 7.6
  },
  BAJAJAUTO: {
    symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto', shortName: 'Bajaj Auto',
    sector: 'Automobiles', price: 11338.00, change: 145.0, changePercent: 1.30,
    marketCap: '3,11,582.34 Cr', roe: 29.15, roce: 28.24, debt: '22,713.15 Cr',
    debtEquity: 0.58, promoterHolding: 55.01, pe: 26.43, dividendYield: 1.32,
    bookValue: 1389.35, pat: '3,188.75 Cr', salesQuarter: '21,688.83 Cr',
    salesGrowth: 36.91, pat12m: '11,787.50 Cr', evEbitda: 18.69, high52: 12500, low52: 9000,
    recommendation: 'BUY', targetPrice: 12800, rating: 8.7
  },
  BAJAJFINSV: {
    symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', shortName: 'Bajaj Finserv',
    sector: 'Finance', price: 1924.40, change: 24.1, changePercent: 1.27,
    marketCap: '3,07,704.22 Cr', roe: 13.23, roce: 10.58, debt: '4,29,913.96 Cr',
    debtEquity: 5.52, promoterHolding: 58.71, pe: 30.95, dividendYield: 0.08,
    bookValue: 486.80, pat: '5,226.26 Cr', salesQuarter: '38,493.79 Cr',
    salesGrowth: 13.23, pat12m: '9,941.68 Cr', evEbitda: 12.61, high52: 2100, low52: 1600,
    recommendation: 'BUY', targetPrice: 2200, rating: 8.3
  },
  HAL: {
    symbol: 'HAL', name: 'Hind.Aeronautics', shortName: 'HAL',
    sector: 'Aerospace & Defense', price: 4592.00, change: 68.0, changePercent: 1.50,
    marketCap: '3,07,231.18 Cr', roe: 23.98, roce: 31.96, debt: '10.97 Cr',
    debtEquity: 0.00, promoterHolding: 71.64, pe: 33.70, dividendYield: 0.98,
    bookValue: 613.68, pat: '4,196.04 Cr', salesQuarter: '13,942.40 Cr',
    salesGrowth: 6.80, pat12m: '9,115.60 Cr', evEbitda: 19.32, high52: 5200, low52: 3800,
    recommendation: 'BUY', targetPrice: 5200, rating: 8.8
  },
  ETERNAL: {
    symbol: 'ETERNAL', name: 'Eternal', shortName: 'Eternal',
    sector: 'Diversified', price: 311.80, change: -5.2, changePercent: -1.64,
    marketCap: '3,00,999.67 Cr', roe: 1.19, roce: 2.97, debt: '4,592.00 Cr',
    debtEquity: 0.15, promoterHolding: 0.00, pe: 695.15, dividendYield: 0.00,
    bookValue: 32.10, pat: '92.00 Cr', salesQuarter: '20,211.00 Cr',
    salesGrowth: 190.50, pat12m: '433.00 Cr', evEbitda: 97.96, high52: 350, low52: 220,
    recommendation: 'HOLD', targetPrice: 330, rating: 6.5
  },
  ONGC: {
    symbol: 'ONGC', name: 'O N G C', shortName: 'ONGC',
    sector: 'Oil', price: 238.31, change: 2.8, changePercent: 1.19,
    marketCap: '2,99,750.37 Cr', roe: 11.66, roce: 14.15, debt: '1,74,316.49 Cr',
    debtEquity: 0.47, promoterHolding: 58.89, pe: 7.19, dividendYield: 5.14,
    bookValue: 295.52, pat: '13,677.87 Cr', salesQuarter: '1,73,805.19 Cr',
    salesGrowth: 8.20, pat12m: '41,686.08 Cr', evEbitda: 3.73, high52: 330, low52: 210,
    recommendation: 'BUY', targetPrice: 285, rating: 8.4
  },
  NESTLEIND: {
    symbol: 'NESTLEIND', name: 'Nestle India', shortName: 'Nestle',
    sector: 'Food Products', price: 1503.30, change: 12.1, changePercent: 0.81,
    marketCap: '2,89,913.56 Cr', roe: 73.17, roce: 84.14, debt: '444.16 Cr',
    debtEquity: 0.08, promoterHolding: 62.76, pe: 77.21, dividendYield: 0.80,
    bookValue: 27.53, pat: '975.12 Cr', salesQuarter: '6,378.18 Cr',
    salesGrowth: 19.30, pat12m: '3,754.89 Cr', evEbitda: 49.81, high52: 2600, low52: 1400,
    recommendation: 'HOLD', targetPrice: 1650, rating: 7.9
  },
  BEL: {
    symbol: 'BEL', name: 'Bharat Electron', shortName: 'BEL',
    sector: 'Aerospace & Defense', price: 387.55, change: 5.8, changePercent: 1.52,
    marketCap: '2,83,325.28 Cr', roe: 27.58, roce: 36.53, debt: '65.46 Cr',
    debtEquity: 0.00, promoterHolding: 51.14, pe: 46.10, dividendYield: 0.62,
    bookValue: 32.82, pat: '1,054.53 Cr', salesQuarter: '5,546.98 Cr',
    salesGrowth: 19.83, pat12m: '6,146.43 Cr', evEbitda: 31.33, high52: 420, low52: 280,
    recommendation: 'BUY', targetPrice: 430, rating: 8.6
  },
  ASIANPAINT: {
    symbol: 'ASIANPAINT', name: 'Asian Paints', shortName: 'Asian Paints',
    sector: 'Consumer Durables', price: 2758.40, change: -18.2, changePercent: -0.66,
    marketCap: '2,64,590.00 Cr', roe: 21.79, roce: 26.34, debt: '3,928.93 Cr',
    debtEquity: 0.18, promoterHolding: 52.63, pe: 54.25, dividendYield: 1.00,
    bookValue: 222.81, pat: '1,559.45 Cr', salesQuarter: '10,541.94 Cr',
    salesGrowth: 9.78, pat12m: '4,877.01 Cr', evEbitda: 32.70, high52: 3300, low52: 2600,
    recommendation: 'HOLD', targetPrice: 2950, rating: 7.5
  },
  POWERGRID: {
    symbol: 'POWERGRID', name: 'Power Grid Corpn', shortName: 'Power Grid',
    sector: 'Power', price: 282.85, change: 3.1, changePercent: 1.11,
    marketCap: '2,63,022.05 Cr', roe: 16.49, roce: 9.74, debt: '1,48,070.60 Cr',
    debtEquity: 1.47, promoterHolding: 51.34, pe: 16.51, dividendYield: 3.18,
    bookValue: 108.05, pat: '4,546.33 Cr', salesQuarter: '11,665.61 Cr',
    salesGrowth: 2.05, pat12m: '15,927.95 Cr', evEbitda: 11.16, high52: 360, low52: 250,
    recommendation: 'BUY', targetPrice: 325, rating: 8.3
  },
  COALINDIA: {
    symbol: 'COALINDIA', name: 'Coal India', shortName: 'Coal India',
    sector: 'Consumable Fuels', price: 410.05, change: 4.8, changePercent: 1.18,
    marketCap: '2,52,702.68 Cr', roe: 28.50, roce: 35.34, debt: '14,072.18 Cr',
    debtEquity: 0.12, promoterHolding: 61.13, pe: 8.10, dividendYield: 5.18,
    bookValue: 193.26, pat: '8,849.81 Cr', salesQuarter: '46,254.80 Cr',
    salesGrowth: 6.10, pat12m: '31,203.02 Cr', evEbitda: 4.02, high52: 520, low52: 370,
    recommendation: 'BUY', targetPrice: 480, rating: 8.5
  },
  DMART: {
    symbol: 'DMART', name: 'Avenue Super.', shortName: 'D-Mart',
    sector: 'Retailing', price: 3848.10, change: 42.1, changePercent: 1.11,
    marketCap: '2,51,393.36 Cr', roe: 12.94, roce: 17.18, debt: '2,424.99 Cr',
    debtEquity: 0.10, promoterHolding: 74.48, pe: 82.20, dividendYield: 0.00,
    bookValue: 375.24, pat: '860.44 Cr', salesQuarter: '18,794.53 Cr',
    salesGrowth: 15.58, pat12m: '3,058.13 Cr', evEbitda: 46.37, high52: 5400, low52: 3700,
    recommendation: 'HOLD', targetPrice: 4200, rating: 7.6
  },
  SHRIRAMFIN: {
    symbol: 'SHRIRAMFIN', name: 'Shriram Finance', shortName: 'Shriram Finance',
    sector: 'Finance', price: 1044.70, change: 12.4, changePercent: 1.20,
    marketCap: '2,45,871.73 Cr', roe: 16.39, roce: 11.49, debt: '2,50,691.96 Cr',
    debtEquity: 3.80, promoterHolding: 20.30, pe: 21.72, dividendYield: 1.03,
    bookValue: 350.34, pat: '3,452.77 Cr', salesQuarter: '13,400.43 Cr',
    salesGrowth: 14.20, pat12m: '11,318.03 Cr', evEbitda: 13.19, high52: 1200, low52: 900,
    recommendation: 'BUY', targetPrice: 1250, rating: 8.2
  },
  TATASTEEL: {
    symbol: 'TATASTEEL', name: 'Tata Steel', shortName: 'Tata Steel',
    sector: 'Ferrous Metals', price: 187.27, change: 2.1, changePercent: 1.13,
    marketCap: '2,33,842.47 Cr', roe: 11.71, roce: 12.52, debt: '92,381.68 Cr',
    debtEquity: 0.90, promoterHolding: 32.94, pe: 20.66, dividendYield: 2.14,
    bookValue: 81.84, pat: '2,965.00 Cr', salesQuarter: '63,270.13 Cr',
    salesGrowth: 6.22, pat12m: '11,316.74 Cr', evEbitda: 8.81, high52: 210, low52: 150,
    recommendation: 'BUY', targetPrice: 215, rating: 8.0
  },
  HINDZINC: {
    symbol: 'HINDZINC', name: 'Hindustan Zinc', shortName: 'Hindustan Zinc',
    sector: 'Non - Ferrous Metals', price: 536.70, change: 8.5, changePercent: 1.61,
    marketCap: '2,27,094.44 Cr', roe: 76.38, roce: 69.25, debt: '8,726.00 Cr',
    debtEquity: 0.39, promoterHolding: 60.71, pe: 13.43, dividendYield: 2.05,
    bookValue: 53.19, pat: '5,425.00 Cr', salesQuarter: '13,687.00 Cr',
    salesGrowth: 38.91, pat12m: '16,914.30 Cr', evEbitda: 8.65, high52: 650, low52: 450,
    recommendation: 'BUY', targetPrice: 620, rating: 8.4
  },
  ADANIGREEN: {
    symbol: 'ADANIGREEN', name: 'Adani Green', shortName: 'Adani Green Energy',
    sector: 'Power', price: 1373.10, change: -15.4, changePercent: -1.11,
    marketCap: '2,26,133.37 Cr', roe: 11.40, roce: 7.39, debt: '1,03,545.00 Cr',
    debtEquity: 5.19, promoterHolding: 62.43, pe: 116.63, dividendYield: 0.00,
    bookValue: 121.21, pat: '983.00 Cr', salesQuarter: '4,431.00 Cr',
    salesGrowth: 10.98, pat12m: '1,938.87 Cr', evEbitda: 25.89, high52: 1800, low52: 1200,
    recommendation: 'HOLD', targetPrice: 1450, rating: 7.2
  },
  HINDALCO: {
    symbol: 'HINDALCO', name: 'Hindalco Inds.', shortName: 'Hindalco',
    sector: 'Non - Ferrous Metals', price: 962.45, change: 11.2, changePercent: 1.18,
    marketCap: '2,16,341.54 Cr', roe: 12.97, roce: 13.21, debt: '99,165.00 Cr',
    debtEquity: 0.73, promoterHolding: 34.66, pe: 12.82, dividendYield: 0.52,
    bookValue: 607.78, pat: '2,597.00 Cr', salesQuarter: '78,133.00 Cr',
    salesGrowth: 15.28, pat12m: '16,874.60 Cr', evEbitda: 8.15, high52: 1050, low52: 780,
    recommendation: 'BUY', targetPrice: 1100, rating: 8.4
  },
  EICHERMOT: {
    symbol: 'EICHERMOT', name: 'Eicher Motors', shortName: 'Eicher Motors',
    sector: 'Automobiles', price: 7779.00, change: 84.0, changePercent: 1.09,
    marketCap: '2,13,513.77 Cr', roe: 23.96, roce: 30.53, debt: '513.95 Cr',
    debtEquity: 0.02, promoterHolding: 49.02, pe: 36.71, dividendYield: 1.05,
    bookValue: 915.01, pat: '1,462.51 Cr', salesQuarter: '6,632.42 Cr',
    salesGrowth: 28.07, pat12m: '5,816.45 Cr', evEbitda: 25.19, high52: 8500, low52: 6400,
    recommendation: 'BUY', targetPrice: 8600, rating: 8.6
  },
  GRASIM: {
    symbol: 'GRASIM', name: 'Grasim Inds', shortName: 'Grasim',
    sector: 'Cement & Cement Products', price: 3113.00, change: 25.4, changePercent: 0.82,
    marketCap: '2,11,851.99 Cr', roe: 4.98, roce: 8.01, debt: '2,27,853.06 Cr',
    debtEquity: 2.20, promoterHolding: 43.74, pe: 42.33, dividendYield: 0.32,
    bookValue: 1520.45, pat: '3,802.23 Cr', salesQuarter: '51,101.11 Cr',
    salesGrowth: 18.15, pat12m: '5,004.75 Cr', evEbitda: 11.57, high52: 3400, low52: 2600,
    recommendation: 'BUY', targetPrice: 3450, rating: 8.1
  },
  DIVISLAB: {
    symbol: 'DIVISLAB', name: 'Divi\'s Lab.', shortName: 'Divi\'s Laboratories',
    sector: 'Pharmaceuticals & Biotechnology', price: 7784.50, change: 95.0, changePercent: 1.24,
    marketCap: '2,06,588.54 Cr', roe: 16.53, roce: 21.97, debt: '7.00 Cr',
    debtEquity: 0.00, promoterHolding: 51.88, pe: 78.76, dividendYield: 0.39,
    bookValue: 631.37, pat: '751.00 Cr', salesQuarter: '2,831.00 Cr',
    salesGrowth: 12.82, pat12m: '2,623.04 Cr', evEbitda: 51.45, high52: 8400, low52: 6500,
    recommendation: 'HOLD', targetPrice: 8200, rating: 7.7
  },
  INDIGO: {
    symbol: 'INDIGO', name: 'Interglobe Aviat', shortName: 'IndiGo',
    sector: 'Transport Services', price: 5276.50, change: -42.0, changePercent: -0.79,
    marketCap: '2,03,981.73 Cr', roe: -27.10, roce: 5.24, debt: '77,749.20 Cr',
    debtEquity: 11.15, promoterHolding: 41.57, pe: 35.40, dividendYield: 0.19,
    bookValue: 180.31, pat: '-238.00 Cr', salesQuarter: '24,584.10 Cr',
    salesGrowth: 8.96, pat12m: '-3,203.25 Cr', evEbitda: 17.70, high52: 5800, low52: 4100,
    recommendation: 'BUY', targetPrice: 5900, rating: 8.2
  },
  ADANIENSOL: {
    symbol: 'ADANIENSOL', name: 'Adani Energy Sol', shortName: 'Adani Energy Solutions',
    sector: 'Power', price: 1667.80, change: 18.2, changePercent: 1.10,
    marketCap: '2,00,373.44 Cr', roe: 9.44, roce: 9.65, debt: '49,176.43 Cr',
    debtEquity: 1.93, promoterHolding: 74.71, pe: 68.64, dividendYield: 0.00,
    bookValue: 211.67, pat: '1,236.56 Cr', salesQuarter: '9,711.08 Cr',
    salesGrowth: 20.91, pat12m: '2,919.12 Cr', evEbitda: 24.84, high52: 1900, low52: 1300,
    recommendation: 'BUY', targetPrice: 1850, rating: 8.0
  },
  IOC: {
    symbol: 'IOC', name: 'I O C L', shortName: 'Indian Oil',
    sector: 'Petroleum Products', price: 140.11, change: 1.4, changePercent: 1.01,
    marketCap: '1,98,090.63 Cr', roe: 20.74, roce: 18.78, debt: '1,31,822.39 Cr',
    debtEquity: 0.60, promoterHolding: 51.50, pe: 4.71, dividendYield: 5.00,
    bookValue: 155.45, pat: '15,176.08 Cr', salesQuarter: '2,08,289.26 Cr',
    salesGrowth: 3.47, pat12m: '42,096.26 Cr', evEbitda: 3.87, high52: 190, low52: 130,
    recommendation: 'BUY', targetPrice: 175, rating: 8.4
  },
  TVSMOTOR: {
    symbol: 'TVSMOTOR', name: 'TVS Motor Co.', shortName: 'TVS Motor',
    sector: 'Automobiles', price: 4075.60, change: 52.0, changePercent: 1.29,
    marketCap: '1,93,666.47 Cr', roe: 33.62, roce: 17.37, debt: '32,791.01 Cr',
    debtEquity: 3.43, promoterHolding: 50.27, pe: 55.98, dividendYield: 0.29,
    bookValue: 201.32, pat: '1,057.61 Cr', salesQuarter: '16,295.52 Cr',
    salesGrowth: 30.52, pat12m: '3,459.30 Cr', evEbitda: 24.57, high52: 4500, low52: 3200,
    recommendation: 'BUY', targetPrice: 4600, rating: 8.6
  },
  SBILIFE: {
    symbol: 'SBILIFE', name: 'SBI Life Insuran', shortName: 'SBI Life',
    sector: 'Insurance', price: 1894.90, change: 14.5, changePercent: 0.77,
    marketCap: '1,90,138.49 Cr', roe: 13.70, roce: 14.95, debt: '0.00 Cr',
    debtEquity: 0.00, promoterHolding: 55.32, pe: 73.10, dividendYield: 0.14,
    bookValue: 200.56, pat: '724.93 Cr', salesQuarter: '46,336.78 Cr',
    salesGrowth: -1.30, pat12m: '2,600.90 Cr', evEbitda: 66.56, high52: 2100, low52: 1500,
    recommendation: 'BUY', targetPrice: 2150, rating: 8.3
  },
  TORNTPHARM: {
    symbol: 'TORNTPHARM', name: 'Torrent Pharma.', shortName: 'Torrent Pharma',
    sector: 'Pharmaceuticals & Biotechnology', price: 4878.50, change: 62.0, changePercent: 1.29,
    marketCap: '1,85,653.08 Cr', roe: 27.43, roce: 15.19, debt: '15,025.50 Cr',
    debtEquity: 1.79, promoterHolding: 60.78, pe: 84.71, dividendYield: 0.78,
    bookValue: 247.85, pat: '364.00 Cr', salesQuarter: '4,197.00 Cr',
    salesGrowth: 21.39, pat12m: '2,191.62 Cr', evEbitda: 45.18, high52: 5200, low52: 3900,
    recommendation: 'HOLD', targetPrice: 5100, rating: 7.8
  },
  WIPRO: {
    symbol: 'WIPRO', name: 'Wipro', shortName: 'Wipro',
    sector: 'IT - Software', price: 183.61, change: 1.2, changePercent: 0.66,
    marketCap: '1,81,880.46 Cr', roe: 15.46, roce: 17.84, debt: '20,291.00 Cr',
    debtEquity: 0.23, promoterHolding: 72.59, pe: 13.76, dividendYield: 5.99,
    bookValue: 83.92, pat: '3,356.30 Cr', salesQuarter: '24,478.60 Cr',
    salesGrowth: 6.40, pat12m: '13,219.00 Cr', evEbitda: 8.70, high52: 240, low52: 170,
    recommendation: 'HOLD', targetPrice: 210, rating: 7.4
  },
  VEDL: {
    symbol: 'VEDL', name: 'Vedanta Aluminium Metal', shortName: 'Vedanta',
    sector: 'Diversified Metals', price: 439.60, change: 5.4, changePercent: 1.24,
    marketCap: '1,71,861.34 Cr', roe: 28.50, roce: 26.40, debt: '72,450.00 Cr',
    debtEquity: 0.06, promoterHolding: 56.38, pe: 11.20, dividendYield: 9.50,
    bookValue: 124.50, pat: '4,250.00 Cr', salesQuarter: '38,500.00 Cr',
    salesGrowth: 14.20, pat12m: '12,500.00 Cr', evEbitda: 6.20, high52: 520, low52: 360,
    recommendation: 'BUY', targetPrice: 510, rating: 8.4
  },
  DLF: {
    symbol: 'DLF', name: 'DLF', shortName: 'DLF',
    sector: 'Realty', price: 670.25, change: 8.2, changePercent: 1.24,
    marketCap: '1,66,060.84 Cr', roe: 9.50, roce: 6.32, debt: '305.89 Cr',
    debtEquity: 0.01, promoterHolding: 74.08, pe: 39.72, dividendYield: 1.19,
    bookValue: 183.71, pat: '1,268.56 Cr', salesQuarter: '1,814.06 Cr',
    salesGrowth: 2.51, pat12m: '4,181.30 Cr', evEbitda: 51.76, high52: 950, low52: 600,
    recommendation: 'BUY', targetPrice: 850, rating: 8.3
  },
  PIDILITIND: {
    symbol: 'PIDILITIND', name: 'Pidilite Inds.', shortName: 'Pidilite',
    sector: 'Chemicals & Petrochemicals', price: 1629.90, change: 18.5, changePercent: 1.15,
    marketCap: '1,65,905.09 Cr', roe: 23.92, roce: 31.02, debt: '417.21 Cr',
    debtEquity: 0.04, promoterHolding: 69.24, pe: 67.37, dividendYield: 0.71,
    bookValue: 106.43, pat: '584.15 Cr', salesQuarter: '3,583.38 Cr',
    salesGrowth: 11.11, pat12m: '2,462.48 Cr', evEbitda: 43.83, high52: 3200, low52: 2400,
    recommendation: 'BUY', targetPrice: 1900, rating: 8.5
  },
  JIOFIN: {
    symbol: 'JIOFIN', name: 'Jio Financial', shortName: 'Jio Financial',
    sector: 'Financial Technology (Fintech)', price: 249.48, change: 3.5, changePercent: 1.42,
    marketCap: '1,64,749.13 Cr', roe: 1.19, roce: 1.86, debt: '21,768.36 Cr',
    debtEquity: 0.16, promoterHolding: 49.13, pe: 79.72, dividendYield: 0.20,
    bookValue: 210.69, pat: '830.25 Cr', salesQuarter: '2,004.47 Cr',
    salesGrowth: 119.23, pat12m: '2,066.49 Cr', evEbitda: 51.39, high52: 390, low52: 210,
    recommendation: 'BUY', targetPrice: 310, rating: 8.4
  },
  SOLARINDS: {
    symbol: 'SOLARINDS', name: 'Solar Industries', shortName: 'Solar Industries',
    sector: 'Industrial Manufacturing', price: 18080.00, change: 245.0, changePercent: 1.37,
    marketCap: '1,63,643.35 Cr', roe: 32.64, roce: 38.08, debt: '1,524.02 Cr',
    debtEquity: 0.24, promoterHolding: 73.15, pe: 93.80, dividendYield: 0.06,
    bookValue: 693.69, pat: '556.03 Cr', salesQuarter: '3,052.75 Cr',
    salesGrowth: 30.47, pat12m: '1,744.51 Cr', evEbitda: 57.87, high52: 19500, low52: 11000,
    recommendation: 'BUY', targetPrice: 20000, rating: 8.7
  },
  HYUNDAI: {
    symbol: 'HYUNDAI', name: 'Hyundai Motor I', shortName: 'Hyundai India',
    sector: 'Automobiles', price: 1992.90, change: 22.0, changePercent: 1.12,
    marketCap: '1,62,017.04 Cr', roe: 29.92, roce: 38.42, debt: '1,097.56 Cr',
    debtEquity: 0.05, promoterHolding: 82.50, pe: 29.83, dividendYield: 1.05,
    bookValue: 246.33, pat: '1,255.63 Cr', salesQuarter: '18,916.15 Cr',
    salesGrowth: 2.27, pat12m: '5,431.52 Cr', evEbitda: 15.98, high52: 2200, low52: 1750,
    recommendation: 'BUY', targetPrice: 2300, rating: 8.3
  },
  TECHM: {
    symbol: 'TECHM', name: 'Tech Mahindra', shortName: 'Tech Mahindra',
    sector: 'IT - Software', price: 1644.20, change: 18.2, changePercent: 1.12,
    marketCap: '1,61,201.84 Cr', roe: 17.53, roce: 23.12, debt: '2,186.20 Cr',
    debtEquity: 0.07, promoterHolding: 34.97, pe: 30.30, dividendYield: 3.10,
    bookValue: 302.25, pat: '1,486.30 Cr', salesQuarter: '15,711.90 Cr',
    salesGrowth: 10.95, pat12m: '5,320.57 Cr', evEbitda: 16.59, high52: 1800, low52: 1200,
    recommendation: 'BUY', targetPrice: 1850, rating: 8.2
  },
  TRENT: {
    symbol: 'TRENT', name: 'Trent', shortName: 'Trent (Zudio/Westside)',
    sector: 'Retailing', price: 3005.20, change: 48.0, changePercent: 1.62,
    marketCap: '1,60,216.98 Cr', roe: 27.74, roce: 28.34, debt: '2,561.25 Cr',
    debtEquity: 0.37, promoterHolding: 37.01, pe: 92.81, dividendYield: 0.13,
    bookValue: 131.00, pat: '413.10 Cr', salesQuarter: '5,027.99 Cr',
    salesGrowth: 17.16, pat12m: '1,726.25 Cr', evEbitda: 42.32, high52: 8000, low52: 2800,
    recommendation: 'BUY', targetPrice: 3800, rating: 8.8
  },
  ABB: {
    symbol: 'ABB', name: 'A B B', shortName: 'ABB India',
    sector: 'Electrical Equipment', price: 7310.50, change: 85.0, changePercent: 1.18,
    marketCap: '1,54,934.65 Cr', roe: 22.39, roce: 29.93, debt: '84.82 Cr',
    debtEquity: 0.01, promoterHolding: 75.00, pe: 101.71, dividendYield: 0.54,
    bookValue: 369.80, pat: '1,783.65 Cr', salesQuarter: '3,184.06 Cr',
    salesGrowth: 8.05, pat12m: '1,523.26 Cr', evEbitda: 67.51, high52: 9000, low52: 6000,
    recommendation: 'HOLD', targetPrice: 7800, rating: 7.9
  },
  MOTHERSON: {
    symbol: 'MOTHERSON', name: 'Samvardh. Mothe.', shortName: 'Samvardhana Motherson',
    sector: 'Auto Components', price: 146.00, change: 2.1, changePercent: 1.46,
    marketCap: '1,54,063.83 Cr', roe: 11.24, roce: 13.43, debt: '19,169.70 Cr',
    debtEquity: 0.47, promoterHolding: 48.60, pe: 36.13, dividendYield: 0.41,
    bookValue: 38.83, pat: '1,561.56 Cr', salesQuarter: '34,309.31 Cr',
    salesGrowth: 10.95, pat12m: '4,264.02 Cr', evEbitda: 12.69, high52: 210, low52: 120,
    recommendation: 'BUY', targetPrice: 180, rating: 8.4
  },
  CHOLAFIN: {
    symbol: 'CHOLAFIN', name: 'Cholaman.Inv.&Fn', shortName: 'Chola Finance',
    sector: 'Finance', price: 1802.90, change: 22.4, changePercent: 1.26,
    marketCap: '1,53,760.18 Cr', roe: 19.35, roce: 9.71, debt: '2,11,069.61 Cr',
    debtEquity: 6.93, promoterHolding: 49.22, pe: 26.74, dividendYield: 0.11,
    bookValue: 357.48, pat: '1,656.22 Cr', salesQuarter: '8,856.29 Cr',
    salesGrowth: 19.64, pat12m: '5,751.00 Cr', evEbitda: 15.30, high52: 1900, low52: 1200,
    recommendation: 'BUY', targetPrice: 2050, rating: 8.5
  },
  ICICIAMC: {
    symbol: 'ICICIAMC', name: 'ICICI AMC', shortName: 'ICICI Prudential AMC',
    sector: 'Capital Markets', price: 3110.70, change: 45.0, changePercent: 1.47,
    marketCap: '1,53,744.11 Cr', roe: 85.80, roce: 115.10, debt: '0.00 Cr',
    debtEquity: 0.00, promoterHolding: 87.60, pe: 44.11, dividendYield: 0.88,
    bookValue: 84.39, pat: '964.63 Cr', salesQuarter: '1,564.22 Cr',
    salesGrowth: 20.53, pat12m: '3,485.73 Cr', evEbitda: 32.27, high52: 3400, low52: 2400,
    recommendation: 'BUY', targetPrice: 3550, rating: 8.7
  },
  TATACAP: {
    symbol: 'TATACAP', name: 'Tata Capital', shortName: 'Tata Capital',
    sector: 'Finance', price: 361.80, change: 4.5, changePercent: 1.26,
    marketCap: '1,53,513.67 Cr', roe: 12.36, roce: 8.58, debt: '2,36,375.92 Cr',
    debtEquity: 5.15, promoterHolding: 85.41, pe: 28.24, dividendYield: 0.16,
    bookValue: 108.04, pat: '1,628.18 Cr', salesQuarter: '8,821.93 Cr',
    salesGrowth: 11.09, pat12m: '5,435.41 Cr', evEbitda: 15.93, high52: 400, low52: 280,
    recommendation: 'BUY', targetPrice: 410, rating: 8.3
  },
  TATAMOTORS: {
    symbol: 'TATAMOTORS', name: 'Tata Motors', shortName: 'Tata Motors',
    sector: 'Automobiles', price: 411.40, change: -5.2, changePercent: -1.25,
    marketCap: '1,51,451.03 Cr', roe: 34.02, roce: 35.90, debt: '5,615.00 Cr',
    debtEquity: 0.44, promoterHolding: 42.56, pe: 38.27, dividendYield: 0.97,
    bookValue: 34.58, pat: '1,793.00 Cr', salesQuarter: '26,098.00 Cr',
    salesGrowth: 44.04, pat12m: '3,957.91 Cr', evEbitda: 16.76, high52: 1180, low52: 380,
    recommendation: 'BUY', targetPrice: 520, rating: 8.4
  },
  VBL: {
    symbol: 'VBL', name: 'Varun Beverages', shortName: 'Varun Beverages (Pepsi)',
    sector: 'Beverages', price: 447.20, change: 6.2, changePercent: 1.41,
    marketCap: '1,51,280.11 Cr', roe: 16.21, roce: 19.71, debt: '2,508.18 Cr',
    debtEquity: 0.13, promoterHolding: 59.43, pe: 44.68, dividendYield: 0.34,
    bookValue: 57.89, pat: '1,525.36 Cr', salesQuarter: '8,451.23 Cr',
    salesGrowth: 14.46, pat12m: '3,386.14 Cr', evEbitda: 25.13, high52: 680, low52: 410,
    recommendation: 'BUY', targetPrice: 540, rating: 8.7
  },
  CUMMINSIND: {
    symbol: 'CUMMINSIND', name: 'Cummins India', shortName: 'Cummins India',
    sector: 'Industrial Manufacturing', price: 5383.00, change: 75.0, changePercent: 1.41,
    marketCap: '1,49,255.20 Cr', roe: 30.24, roce: 39.50, debt: '36.51 Cr',
    debtEquity: 0.00, promoterHolding: 51.00, pe: 61.56, dividendYield: 1.23,
    bookValue: 305.74, pat: '649.46 Cr', salesQuarter: '3,011.18 Cr',
    salesGrowth: 16.87, pat12m: '2,424.66 Cr', evEbitda: 43.48, high52: 6000, low52: 4200,
    recommendation: 'BUY', targetPrice: 6200, rating: 8.6
  },
  BSE: {
    symbol: 'BSE', name: 'BSE', shortName: 'BSE Limited',
    sector: 'Capital Markets', price: 3541.40, change: 58.0, changePercent: 1.66,
    marketCap: '1,44,240.90 Cr', roe: 44.79, roce: 58.03, debt: '0.02 Cr',
    debtEquity: 0.00, promoterHolding: 0.00, pe: 58.04, dividendYield: 0.28,
    bookValue: 163.84, pat: '795.47 Cr', salesQuarter: '1,563.51 Cr',
    salesGrowth: 50.49, pat12m: '2,485.03 Cr', evEbitda: 40.22, high52: 4200, low52: 2400,
    recommendation: 'BUY', targetPrice: 4100, rating: 8.9
  },
  IDEA: {
    symbol: 'IDEA', name: 'Vodafone Idea', shortName: 'Vodafone Idea',
    sector: 'Telecom - Services', price: 13.05, change: -0.15, changePercent: -1.14,
    marketCap: '1,41,279.48 Cr', roe: -1.60, roce: 2.99, debt: '1,92,528.00 Cr',
    debtEquity: 25.64, promoterHolding: 25.64, pe: -3.30, dividendYield: 0.00,
    bookValue: -3.30, pat: '-51,970.00 Cr', salesQuarter: '11,332.00 Cr',
    salesGrowth: 2.99, pat12m: '-24,044.00 Cr', evEbitda: 16.79, high52: 19, low52: 8,
    recommendation: 'SELL', targetPrice: 9, rating: 4.5
  },
  POWERINDIA: {
    symbol: 'POWERINDIA', name: 'Hitachi Energy', shortName: 'Hitachi Energy India',
    sector: 'Electrical Equipment', price: 31675.00, change: 480.0, changePercent: 1.54,
    marketCap: '1,41,211.83 Cr', roe: 21.89, roce: 29.02, debt: '86.10 Cr',
    debtEquity: 0.02, promoterHolding: 71.31, pe: 137.38, dividendYield: 0.03,
    bookValue: 1161.25, pat: '330.46 Cr', salesQuarter: '2,754.05 Cr',
    salesGrowth: 27.61, pat12m: '1,027.86 Cr', evEbitda: 91.55, high52: 35000, low52: 22000,
    recommendation: 'BUY', targetPrice: 35000, rating: 8.5
  },
  BHEL: {
    symbol: 'BHEL', name: 'B H E L', shortName: 'BHEL',
    sector: 'Electrical Equipment', price: 405.15, change: 5.2, changePercent: 1.30,
    marketCap: '1,41,160.64 Cr', roe: 6.23, roce: 9.14, debt: '8,186.95 Cr',
    debtEquity: 0.31, promoterHolding: 58.17, pe: 58.03, dividendYield: 0.35,
    bookValue: 75.09, pat: '376.71 Cr', salesQuarter: '7,697.72 Cr',
    salesGrowth: 27.00, pat12m: '2,432.47 Cr', evEbitda: 32.03, high52: 450, low52: 280,
    recommendation: 'BUY', targetPrice: 470, rating: 8.2
  },
  PFC: {
    symbol: 'PFC', name: 'Power Fin.Corpn.', shortName: 'PFC',
    sector: 'Finance', price: 427.10, change: 6.1, changePercent: 1.45,
    marketCap: '1,40,964.12 Cr', roe: 20.68, roce: 9.71, debt: '10,12,503.46 Cr',
    debtEquity: 7.62, promoterHolding: 55.99, pe: 5.44, dividendYield: 4.34,
    bookValue: 402.60, pat: '8,597.61 Cr', salesQuarter: '28,919.52 Cr',
    salesGrowth: 7.78, pat12m: '25,912.00 Cr', evEbitda: 10.23, high52: 560, low52: 380,
    recommendation: 'BUY', targetPrice: 520, rating: 8.7
  },
  BPCL: {
    symbol: 'BPCL', name: 'B P C L', shortName: 'Bharat Petroleum',
    sector: 'Petroleum Products', price: 317.40, change: 3.5, changePercent: 1.12,
    marketCap: '1,37,595.40 Cr', roe: 28.80, roce: 25.69, debt: '54,424.42 Cr',
    debtEquity: 0.54, promoterHolding: 52.98, pe: 8.88, dividendYield: 5.51,
    bookValue: 230.89, pat: '-1,872.70 Cr', salesQuarter: '1,51,277.03 Cr',
    salesGrowth: 12.33, pat12m: '15,499.28 Cr', evEbitda: 5.44, high52: 380, low52: 280,
    recommendation: 'BUY', targetPrice: 375, rating: 8.3
  },
  POLYCAB: {
    symbol: 'POLYCAB', name: 'Polycab India', shortName: 'Polycab',
    sector: 'Electrical Equipment', price: 9047.00, change: 115.0, changePercent: 1.29,
    marketCap: '1,36,306.19 Cr', roe: 23.05, roce: 33.21, debt: '235.52 Cr',
    debtEquity: 0.02, promoterHolding: 61.46, pe: 47.59, dividendYield: 0.52,
    bookValue: 797.63, pat: '796.66 Cr', salesQuarter: '8,209.73 Cr',
    salesGrowth: 32.06, pat12m: '2,864.26 Cr', evEbitda: 29.84, high52: 9800, low52: 6200,
    recommendation: 'STRONG BUY', targetPrice: 10200, rating: 9.0
  },
  BRITANNIA: {
    symbol: 'BRITANNIA', name: 'Britannia Inds.', shortName: 'Britannia',
    sector: 'Food Products', price: 5517.50, change: 64.0, changePercent: 1.17,
    marketCap: '1,32,959.58 Cr', roe: 53.52, roce: 56.00, debt: '1,380.28 Cr',
    debtEquity: 0.27, promoterHolding: 50.55, pe: 52.51, dividendYield: 1.64,
    bookValue: 212.01, pat: '679.68 Cr', salesQuarter: '4,718.92 Cr',
    salesGrowth: 6.74, pat12m: '2,532.21 Cr', evEbitda: 35.85, high52: 6200, low52: 4700,
    recommendation: 'BUY', targetPrice: 6100, rating: 8.4
  }
};

// Flat list for searching
export const STOCK_LIST = Object.values(STOCKS);

// AI market insights for the demo page
export const AI_INSIGHTS = [
  { symbol: 'BHARTIARTL', recommendation: 'BUY', confidence: 88, reason: 'Strong ARPU expansion and high 5G subscriber gains' },
  { symbol: 'ICICIBANK', recommendation: 'STRONG BUY', confidence: 91, reason: 'Best-in-class asset quality and credit growth momentum' },
  { symbol: 'RELIANCE', recommendation: 'BUY', confidence: 86, reason: 'Retail & Jio growth drivers with target ₹1,550' },
  { symbol: 'MARUTI', recommendation: 'BUY', confidence: 86, reason: 'Strong SUV portfolio growth with high margins' },
  { symbol: 'POLYCAB', recommendation: 'STRONG BUY', confidence: 90, reason: 'Wires & cables market share gain with 32% Qtr growth' },
  { symbol: 'HAL', recommendation: 'BUY', confidence: 88, reason: 'Multi-year defense order book backing revenue growth' },
  { symbol: 'LT', recommendation: 'BUY', confidence: 86, reason: 'Record international order inflows across Middle East' },
  { symbol: 'TVSMOTOR', recommendation: 'BUY', confidence: 86, reason: 'EV two-wheeler leadership and export recovery' }
];

// Watchlist news & updates feed data
export const WATCHLIST_FEED = [
  {
    id: 1,
    symbol: 'SUNPHARMA',
    name: 'Sun Pharma.Inds.',
    title: 'Shareholding Pattern - Jun 2026',
    content: 'Promoter 54.48% · FII 14.54% · DII 22.06% · Public 8.81%',
    time: 'TODAY'
  },
  {
    id: 2,
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel',
    title: 'Quarterly Results Announcement',
    content: 'Sales Qtr ₹55,383.20 Cr (+21.96% YOY) · PAT ₹9,247.40 Cr',
    time: 'TODAY'
  },
  {
    id: 3,
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    title: 'Q1 FY26 Financial Summary',
    content: 'Sales Qtr ₹3,09,468.00 Cr (+15.00% YOY) · Net Profit ₹23,196.00 Cr',
    time: 'TODAY'
  },
  {
    id: 4,
    symbol: 'MARUTI',
    name: 'Maruti Suzuki',
    title: 'Automotive Sales Update',
    content: 'Quarterly sales ₹52,462.50 Cr (+19.88% YOY) · PAT ₹3,659.00 Cr',
    time: 'YESTERDAY'
  }
];

// Upcoming earnings/updates calendar
export const UPCOMING_EVENTS = [
  { date: '21 July 2026', events: [
    { symbol: 'RELIANCE', name: 'Reliance Inds', time: '5:30 p.m.', type: 'Call' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', type: 'Result' }
  ]},
  { date: '22 July 2026', events: [
    { symbol: 'HDFCBANK', name: 'HDFC Bank', time: '11 a.m.', type: 'Call' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', time: '3:30 p.m.', type: 'Call' }
  ]},
  { date: '29 July 2026', events: [
    { symbol: 'ASIANPAINT', name: 'Asian Paints', type: 'Result' }
  ]}
];

// All 58 Industry Sectors with exact company counts provided by user
export const ALL_SECTORS_DATA = [
  { name: 'Finance', count: 517, category: 'Financial Services' },
  { name: 'Industrial Products', count: 499, category: 'Industrials' },
  { name: 'Commercial Services & Supplies', count: 375, category: 'Services' },
  { name: 'Textiles & Apparels', count: 341, category: 'Consumer Goods' },
  { name: 'Consumer Durables', count: 283, category: 'Consumer Goods' },
  { name: 'Chemicals & Petrochemicals', count: 269, category: 'Basic Materials' },
  { name: 'Pharmaceuticals & Biotechnology', count: 224, category: 'Healthcare' },
  { name: 'Agricultural Food & other Products', count: 192, category: 'Agriculture' },
  { name: 'Industrial Manufacturing', count: 187, category: 'Industrials' },
  { name: 'Realty', count: 181, category: 'Real Estate' },
  { name: 'Construction', count: 174, category: 'Infrastructure' },
  { name: 'Auto Components', count: 172, category: 'Automobiles' },
  { name: 'IT - Software', count: 163, category: 'Technology' },
  { name: 'Food Products', count: 133, category: 'FMCG' },
  { name: 'Electrical Equipment', count: 125, category: 'Industrials' },
  { name: 'Leisure Services', count: 121, category: 'Services' },
  { name: 'Transport Services', count: 111, category: 'Logistics' },
  { name: 'IT - Services', count: 103, category: 'Technology' },
  { name: 'Healthcare Services', count: 83, category: 'Healthcare' },
  { name: 'Retailing', count: 82, category: 'Consumer Services' },
  { name: 'Entertainment', count: 78, category: 'Media & Entertainment' },
  { name: 'Capital Markets', count: 71, category: 'Financial Services' },
  { name: 'Paper, Forest & Jute Products', count: 60, category: 'Basic Materials' },
  { name: 'Fertilizers & Agrochemicals', count: 60, category: 'Agriculture' },
  { name: 'Other Consumer Services', count: 48, category: 'Consumer Services' },
  { name: 'Power', count: 48, category: 'Utilities' },
  { name: 'Cement & Cement Products', count: 41, category: 'Materials' },
  { name: 'Media', count: 41, category: 'Media & Entertainment' },
  { name: 'Banks', count: 41, category: 'Financial Services' },
  { name: 'Ferrous Metals', count: 36, category: 'Metals & Mining' },
  { name: 'Beverages', count: 33, category: 'FMCG' },
  { name: 'Aerospace & Defense', count: 33, category: 'Industrials' },
  { name: 'Non - Ferrous Metals', count: 29, category: 'Metals & Mining' },
  { name: 'IT - Hardware', count: 28, category: 'Technology' },
  { name: 'Telecom - Services', count: 28, category: 'Telecommunication' },
  { name: 'Automobiles', count: 28, category: 'Automobiles' },
  { name: 'Other Utilities', count: 26, category: 'Utilities' },
  { name: 'Other Construction Materials', count: 25, category: 'Materials' },
  { name: 'Healthcare Equipment & Supplies', count: 24, category: 'Healthcare' },
  { name: 'Transport Infrastructure', count: 23, category: 'Logistics' },
  { name: 'Petroleum Products', count: 23, category: 'Energy' },
  { name: 'Oil', count: 21, category: 'Energy' },
  { name: 'Personal Products', count: 20, category: 'FMCG' },
  { name: 'Household Products', count: 18, category: 'FMCG' },
  { name: 'Agricultural, Commercial & Construction Vehicles', count: 15, category: 'Automobiles' },
  { name: 'Minerals & Mining', count: 15, category: 'Metals & Mining' },
  { name: 'Telecom - Equipment & Accessories', count: 14, category: 'Telecommunication' },
  { name: 'Metals & Minerals Trading', count: 14, category: 'Metals & Mining' },
  { name: 'Diversified', count: 14, category: 'Conglomerates' },
  { name: 'Financial Technology (Fintech)', count: 13, category: 'Financial Services' },
  { name: 'Insurance', count: 13, category: 'Financial Services' },
  { name: 'Gas', count: 11, category: 'Energy' },
  { name: 'Printing & Publication', count: 9, category: 'Media & Entertainment' },
  { name: 'Consumable Fuels', count: 7, category: 'Energy' },
  { name: 'Cigarettes & Tobacco Products', count: 7, category: 'FMCG' },
  { name: 'Diversified Metals', count: 5, category: 'Metals & Mining' },
  { name: 'Diversified FMCG', count: 5, category: 'FMCG' },
  { name: 'Engineering Services', count: 3, category: 'Services' }
];

export function getStocksForSector(sectorName) {
  const normalized = sectorName.toLowerCase().replace(/[^a-z0-9]/g, '');

  const existing = STOCK_LIST.filter(s => {
    const secNorm = s.sector.toLowerCase().replace(/[^a-z0-9]/g, '');
    return secNorm.includes(normalized) || normalized.includes(secNorm);
  });

  if (existing.length >= 4) return existing;

  const sectorMeta = ALL_SECTORS_DATA.find(s => s.name.toLowerCase() === sectorName.toLowerCase()) || { count: 25 };
  const targetCount = Math.min(sectorMeta.count, 8);

  const mockNames = [
    `${sectorName} Leaders India Ltd`,
    `National ${sectorName.split(' ')[0]} Corp`,
    `Apex ${sectorName.split(' ')[0]} Industries`,
    `Premier ${sectorName.split(' ')[0]} Synthetics`,
    `Bharat ${sectorName.split(' ')[0]} Solutions`,
    `United ${sectorName.split(' ')[0]} Enterprises`,
    `Global ${sectorName.split(' ')[0]} Ltd`,
    `Sun ${sectorName.split(' ')[0]} Infrastructure`
  ];

  const generated = [];
  for (let i = existing.length; i < targetCount; i++) {
    const sym = `${sectorName.substring(0, 4).toUpperCase()}${i + 1}`;
    const name = mockNames[i % mockNames.length];
    const price = parseFloat((50 + (i * 123.4) % 1800).toFixed(2));
    const pe = parseFloat((12 + (i * 3.7) % 35).toFixed(1));
    const roe = parseFloat((8 + (i * 4.2) % 30).toFixed(1));
    const roce = parseFloat((10 + (i * 5.1) % 35).toFixed(1));
    const mcap = `${(500 + i * 4200).toLocaleString('en-IN')} Cr`;

    generated.push({
      symbol: sym,
      name: name,
      sector: sectorName,
      price: price,
      change: parseFloat(((price * 0.015) * (i % 2 === 0 ? 1 : -1)).toFixed(2)),
      changePercent: parseFloat((1.2 * (i % 2 === 0 ? 1 : -1)).toFixed(2)),
      marketCap: mcap,
      pe: pe,
      roe: roe,
      roce: roce,
      debtEquity: parseFloat((0.05 + (i * 0.12) % 1.2).toFixed(2)),
      promoterHolding: parseFloat((45 + (i * 6) % 30).toFixed(1)),
      dividendYield: parseFloat((0.5 + (i * 0.4) % 3.5).toFixed(1)),
      bookValue: parseFloat((price * 0.35).toFixed(1)),
      pat: `${(40 + i * 350).toLocaleString('en-IN')} Cr`,
      targetPrice: parseFloat((price * 1.18).toFixed(1)),
      recommendation: i % 3 === 0 ? 'BUY' : (i % 3 === 1 ? 'HOLD' : 'STRONG BUY')
    });
  }

  return [...existing, ...generated];
}
