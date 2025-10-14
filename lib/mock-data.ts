// Mock data for the fraud detection ML pipeline

export interface Transaction {
  transaction_id: string
  user_id: string
  amount: number
  merchant_id: string
  timestamp: Date
  location: string
  fraud_label: boolean
  fraud_score?: number
}

export interface ModelMetrics {
  model_id: string
  auc_score: number
  precision: number
  recall: number
  false_positive_rate: number
  timestamp: Date
  version: string
}

export interface DriftMonitoring {
  feature_name: string
  statistical_test: string
  p_value: number
  drift_detected: boolean
  action_taken: string
  timestamp: Date
}

// Generate mock transactions
export const mockTransactions: Transaction[] = Array.from({ length: 100 }, (_, i) => ({
  transaction_id: `TXN-${String(i + 1).padStart(6, "0")}`,
  user_id: `USER-${Math.floor(Math.random() * 1000)}`,
  amount: Math.random() * 5000 + 10,
  merchant_id: `MERCH-${Math.floor(Math.random() * 500)}`,
  timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  location: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"][Math.floor(Math.random() * 6)],
  fraud_label: Math.random() > 0.95,
  fraud_score: Math.random(),
}))

// Generate mock model metrics over time
export const mockModelMetrics: ModelMetrics[] = Array.from({ length: 30 }, (_, i) => ({
  model_id: `MODEL-v${Math.floor(i / 5) + 1}`,
  auc_score: 0.88 + Math.random() * 0.08,
  precision: 0.85 + Math.random() * 0.1,
  recall: 0.82 + Math.random() * 0.12,
  false_positive_rate: 0.02 + Math.random() * 0.03,
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  version: `v${Math.floor(i / 5) + 1}.${i % 5}`,
}))

// Generate mock drift monitoring data
export const mockDriftData: DriftMonitoring[] = [
  {
    feature_name: "transaction_amount",
    statistical_test: "Kolmogorov-Smirnov",
    p_value: 0.12,
    drift_detected: false,
    action_taken: "None",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    feature_name: "transaction_frequency",
    statistical_test: "Chi-Square",
    p_value: 0.03,
    drift_detected: true,
    action_taken: "Recalibration triggered",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    feature_name: "merchant_category",
    statistical_test: "Population Stability Index",
    p_value: 0.08,
    drift_detected: false,
    action_taken: "None",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    feature_name: "time_of_day",
    statistical_test: "Wasserstein Distance",
    p_value: 0.15,
    drift_detected: false,
    action_taken: "None",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    feature_name: "location_entropy",
    statistical_test: "Kolmogorov-Smirnov",
    p_value: 0.02,
    drift_detected: true,
    action_taken: "Alert sent to team",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
]

// KPI data for dashboard
export const kpiData = {
  totalTransactions: 289432,
  fraudDetected: 4231,
  falsePositives: 127,
  currentAUC: 0.9347,
  modelVersion: "v3.2",
  lastRetrained: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  avgProcessingTime: 23.4,
  uptime: 99.97,
}

// Time series data for charts
export const generateTimeSeriesData = (days: number, baseValue: number, variance: number) => {
  return Array.from({ length: days * 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (days * 24 - i) * 60 * 60 * 1000),
    value: baseValue + (Math.random() - 0.5) * variance,
  }))
}

export const transactionVolumeData = generateTimeSeriesData(7, 12000, 3000)
export const fraudRateData = generateTimeSeriesData(7, 1.5, 0.8)
export const aucScoreData = generateTimeSeriesData(7, 0.93, 0.03)
