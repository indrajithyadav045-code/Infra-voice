# InfraVoice Data Models Specification

**BRICS Citizen Infrastructure Intelligence Platform**
**Entity Schemas | JSON Payloads | Data Dictionaries**

---

## 1. Citizen Request Entity

```typescript
interface CitizenRequest {
  id: string;                   // Unique identifier, e.g. "REQ-IN-1092"
  timestamp: string;            // ISO timestamp or relative display, e.g. "15 mins ago"
  channel: string;              // "IVR Voice" | "WhatsApp Business" | "SMS Gateway" | "Web Portal"
  rawText: string;              // Verbatim native transcript or message text
  translatedText: string;       // Standardized English translation / analytical summary
  language: string;             // ISO 639-1 code: "ta" | "hi" | "pt" | "ru" | "zh" | "zu" | "xh" | "en"
  languageName: string;         // Human readable language name
  location: string;             // Administrative division, e.g. "Madurai District, Tamil Nadu"
  latitude?: number;            // Optional coordinates
  longitude?: number;           // Optional coordinates
  category: string;             // "water" | "transport" | "energy" | "roads" | "health" | "digital"
  subcategory: string;          // Specific issue typology, e.g. "piped_potable_supply"
  severity: "critical" | "high" | "medium" | "low";
  urgency: "urgent" | "normal" | "low";
  affectedPop: number;          // Estimated localized citizen count
  sentiment: string;            // Citizen distress classification
  status: string;               // Assigned cluster / hotspot assignment
}
```

---

## 2. Demand Hotspot Entity

```typescript
interface DemandHotspot {
  id: string;                   // Hotspot identifier, e.g. "in-hotspot-001"
  name: string;                 // Descriptive name, e.g. "Tamil Nadu Rural Water Deficit Corridor"
  region: string;               // Geographic bounds / contiguous districts
  category: string;             // Primary infrastructure sector
  severity: "critical" | "high" | "medium";
  requests: number;             // Count of clustered citizen inputs
  population: number;           // Total population in affected cluster
  trend: "increasing" | "stable" | "decreasing";
  lat: number;                  // Centroid latitude
  lng: number;                  // Centroid longitude
  radius: number;               // Geospatial radius in meters for mapping
  languages: string[];          // Linguistic representations in cluster, e.g. ["ta", "en"]
  summary: string;              // Synthesized narrative of root failure
  topConcern: string;           // Key citizen grievance
}
```

---

## 3. Infrastructure Gap Entity

```typescript
interface InfrastructureGap {
  id: string;                   // Gap identifier, e.g. "GAP-IN-01"
  title: string;                // Gap title
  location: string;             // Target district or corridor
  category: string;             // Infrastructure sector
  citizenDemandCount: number;   // Number of validated citizen requests
  affectedPopulation: number;   // Total population experiencing gap
  existingCoverage: string;     // Ground status assessment
  benchmarkTarget: string;      // National service standard
  shortfallDescription: string; // Detailed deficit narrative
  recommendedIntervention: string; // Proposed capital intervention
  estimatedCost: string;        // Cost in national currency + USD equivalent
  timeline: string;             // Implementation duration, e.g. "18 Months"
  roiRatio: string;             // Socio-economic return multiplier
}
```

---

## 4. Development Policy Recommendation Entity

```typescript
interface PolicyRecommendation {
  id: string;                   // e.g. "REC-IN-01"
  title: string;                // Strategic project name
  category: string;             // Primary sector
  priority: "critical" | "high" | "medium";
  confidenceScore: number;      // AI confidence percentage (0 - 100)
  budgetRequired: string;       // Local currency budget
  usdEquivalent: string;        // USD benchmark
  timeline: string;             // Estimated delivery time
  primarySponsor: string;       // Sponsoring government agency / ministry
  impactMetrics: string;        // Quantified citizen outcome
  whySurfaced: string[];        // Audit-ready explainability checklist
}
```

---

## 5. DPI Impact Project Entity

```typescript
interface ImpactProject {
  id: string;                   // Project identifier, e.g. "PROJ-IN-01"
  name: string;                 // Project title
  sector: string;               // Infrastructure domain
  status: "planning" | "approved" | "under_construction" | "completed";
  progress: number;             // Completion percentage (0 - 100)
  budgetSpent: string;          // Current vs allocated capital
  citizenInputsAnalyzed: number;// Citizen feedback points incorporated
  baselineMetric: string;       // Ground truth before intervention
  currentProjectedMetric: string; // Measurable outcome after delivery
  measurementMethod: string;    // Verification methodology (telemetry / surveys)
}
```
