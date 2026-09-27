/**
 * InfraVoice — Core BRICS Data Registry & Synthetic Datasets
 * Covers 5 BRICS Nations: Brazil, Russia, India, China, South Africa
 * Includes demographic data, infrastructure coverage indices, citizen requests,
 * clustered demand hotspots, gap analyses, development recommendations, and DPI impact metrics.
 */

const BRICS_DATA = {
  india: {
    code: 'india',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR (₹)',
    currencySymbol: '₹',
    usdRate: 83.5,
    nationalPlan: 'PM GatiShakti & Jal Jeevan Mission',
    stats: {
      totalRequests: 2847,
      activeHotspots: 18,
      criticalGaps: 12,
      activeProjects: 9,
      populationReached: '4.2M',
      dataConfidence: '94.2%'
    },
    demographics: {
      totalPopulation: '1.428 Billion',
      ruralPercentage: 65.2,
      urbanPercentage: 34.8,
      density: '435 per km²',
      vulnerabilityIndex: 'Medium-High',
      keyLanguages: ['Hindi (hi)', 'Tamil (ta)', 'Telugu (te)', 'Bengali (bn)', 'Marathi (mr)', 'English (en)']
    },
    infrastructureIndices: {
      pipedWaterCoverage: 41.5,
      reliableGridPower: 78.2,
      pavedRoadDensity: 64.0,
      primaryHealthAccess: 52.8,
      digitalConnectivity: 68.4
    },
    mapCenter: [20.5937, 78.9629],
    mapZoom: 5,
    hotspots: [
      {
        id: 'in-hotspot-001',
        name: 'Tamil Nadu Rural Water Deficit Corridor',
        region: 'Tamil Nadu (Madurai - Dindigul - Tirunelveli)',
        category: 'water',
        severity: 'critical',
        requests: 312,
        population: 142000,
        trend: 'increasing',
        lat: 9.9252,
        lng: 78.1198,
        radius: 28000,
        languages: ['ta', 'en'],
        summary: 'Chronic groundwater depletion and broken piped networks across 28 village panchayats.',
        topConcern: 'Drinking water contamination and 4-day tanker waiting intervals'
      },
      {
        id: 'in-hotspot-002',
        name: 'Delhi-NCR Peripheral Transit Chokepoint',
        region: 'National Capital Region (Najafgarh - Bahadurgarh)',
        category: 'transport',
        severity: 'high',
        requests: 245,
        population: 320000,
        trend: 'increasing',
        lat: 28.6139,
        lng: 77.2090,
        radius: 22000,
        languages: ['hi', 'en'],
        summary: 'Severe lack of last-mile feeder buses to nearest metro corridors; 90 min average commute delay.',
        topConcern: 'Inadequate metro feeder lines and overcrowded terminal junctions'
      },
      {
        id: 'in-hotspot-003',
        name: 'Maharashtra Marathwada Agri-Solar Grid Gap',
        region: 'Maharashtra (Beed - Jalna - Aurangabad)',
        category: 'energy',
        severity: 'critical',
        requests: 189,
        population: 89000,
        trend: 'stable',
        lat: 19.8762,
        lng: 75.3433,
        radius: 25000,
        languages: ['mr', 'hi'],
        summary: 'Frequent 8-hour daily power blackouts during critical rabi irrigation cycles.',
        topConcern: 'Unreliable agricultural feeder lines damaging crop yield'
      },
      {
        id: 'in-hotspot-004',
        name: 'Bihar Kosi Basin Flood-Resilient Road Links',
        region: 'Bihar (Saharsa - Supaul - Madhepura)',
        category: 'roads',
        severity: 'high',
        requests: 178,
        population: 215000,
        trend: 'increasing',
        lat: 25.8835,
        lng: 86.6006,
        radius: 30000,
        languages: ['hi', 'mai'],
        summary: 'Annual monsoon inundation washes away unpaved village causeways, isolating 60+ hamlets.',
        topConcern: 'Complete monsoon cutoff from district hospitals and primary schools'
      },
      {
        id: 'in-hotspot-005',
        name: 'Bengaluru Tech Corridor Feeder Transit',
        region: 'Karnataka (Outer Ring Road - Sarjapur)',
        category: 'transport',
        severity: 'medium',
        requests: 142,
        population: 180000,
        trend: 'stable',
        lat: 12.9249,
        lng: 77.6748,
        radius: 18000,
        languages: ['kn', 'en', 'hi'],
        summary: 'High congestion on arterial arteries with missing dedicated bus rapid transit lanes.',
        topConcern: 'Commute times exceeding 2 hours during peak work shifts'
      }
    ],
    requests: [
      {
        id: 'REQ-IN-1092',
        timestamp: '15 mins ago',
        channel: 'IVR Voice',
        rawText: 'எங்கள் கிராமத்தில் கடந்த 3 வாரங்களாக குடிநீர் குழாய் பழுதடைந்துள்ளது. 200 குடும்பங்கள் தண்ணீர் இல்லாமல் தவிக்கிறோம்.',
        translatedText: 'Our village water pipeline has been broken for 3 weeks. Over 200 families are suffering without potable drinking water.',
        language: 'ta',
        languageName: 'Tamil',
        location: 'Madurai District, Tamil Nadu',
        category: 'water',
        subcategory: 'piped_supply',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 1200,
        sentiment: 'Distress / Urgent',
        status: 'Aggregated into Hotspot #001'
      },
      {
        id: 'REQ-IN-1091',
        timestamp: '42 mins ago',
        channel: 'WhatsApp Business',
        rawText: 'नजफगढ़ से द्वारका मोड़ तक सुबह के समय कोई बस नहीं मिलती। छात्र और मजदूर घंटों खड़े रहते हैं।',
        translatedText: 'No morning feeder buses operate between Najafgarh and Dwarka Mor. Students and workers stand waiting for hours.',
        language: 'hi',
        languageName: 'Hindi',
        location: 'West Delhi, NCR',
        category: 'transport',
        subcategory: 'feeder_buses',
        severity: 'high',
        urgency: 'normal',
        affectedPop: 4500,
        sentiment: 'Frustration',
        status: 'Aggregated into Hotspot #002'
      },
      {
        id: 'REQ-IN-1090',
        timestamp: '1 hour ago',
        channel: 'SMS Gateway',
        rawText: 'बीड मधील शेतीसाठी दररोज 8 तास वीज पुरवठा खंडित होतो. विहिरीचे पाणी शेतात पोहोचत नाही.',
        translatedText: 'Power cuts last 8 hours daily for agriculture in Beed. Well water cannot be pumped to our fields.',
        language: 'mr',
        languageName: 'Marathi',
        location: 'Beed District, Maharashtra',
        category: 'energy',
        subcategory: 'agri_feeder',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 3200,
        sentiment: 'High Vulnerability',
        status: 'Aggregated into Hotspot #003'
      },
      {
        id: 'REQ-IN-1089',
        timestamp: '2 hours ago',
        channel: 'Web Portal',
        rawText: 'The culvert connecting Supaul to the primary health centre collapsed last monsoon. Emergency ambulances refuse to come.',
        translatedText: 'The culvert connecting Supaul to the primary health centre collapsed last monsoon. Emergency ambulances refuse to come.',
        language: 'en',
        languageName: 'English',
        location: 'Supaul, Bihar',
        category: 'roads',
        subcategory: 'flood_resilient_bridges',
        severity: 'high',
        urgency: 'urgent',
        affectedPop: 6800,
        sentiment: 'Health Safety Hazard',
        status: 'Aggregated into Hotspot #004'
      },
      {
        id: 'REQ-IN-1088',
        timestamp: '3 hours ago',
        channel: 'IVR Voice',
        rawText: 'ಸರ್ಜಾಪುರ ರಸ್ತೆಯಲ್ಲಿ ಮೆಟ್ರೋ ಲಿಂಕ್ ಇಲ್ಲದೆ ಬಸ್ಸುಗಳು ತುಂಬಾ ಕಿಕ್ಕಿರಿದಿವೆ. ಹೆಚ್ಚುವರಿ ಎಲೆಕ್ಟ್ರಿಕ್ ಬಸ್ಸುಗಳು ಬೇಕು.',
        translatedText: 'Without a metro link on Sarjapur road, buses are completely overcrowded. We need dedicated feeder electric buses.',
        language: 'kn',
        languageName: 'Kannada',
        location: 'Bengaluru South, Karnataka',
        category: 'transport',
        subcategory: 'bus_rapid_transit',
        severity: 'medium',
        urgency: 'normal',
        affectedPop: 8500,
        sentiment: 'Civic Improvement',
        status: 'Aggregated into Hotspot #005'
      }
    ],
    gaps: [
      {
        id: 'GAP-IN-01',
        title: 'Tamil Nadu Rural Water Treatment & Distribution Deficit',
        location: 'Madurai & Dindigul Districts',
        category: 'water',
        citizenDemandCount: 312,
        affectedPopulation: 142000,
        existingCoverage: '35% piped coverage (intermittent 2h supply)',
        benchmarkTarget: '100% functional tap connection (FHTC) 24/7',
        shortfallDescription: '65% of households lack treated domestic piped water; fluoride contamination documented in local borewells.',
        recommendedIntervention: 'Commission 3 decentralized reverse osmosis surface-water treatment plants with 48km secondary distribution pipelines under Jal Jeevan Mission.',
        estimatedCost: '₹145 Crores (~$17.4M USD)',
        timeline: '18 Months',
        roiRatio: '4.8x Economic & Health Multiplier'
      },
      {
        id: 'GAP-IN-02',
        title: 'Delhi-NCR Peripheral Transit Feeder Coverage',
        location: 'Najafgarh - Dwarka Sector 21 Belt',
        category: 'transport',
        citizenDemandCount: 245,
        affectedPopulation: 320000,
        existingCoverage: '4 sporadic diesel bus routes',
        benchmarkTarget: 'High-frequency 8-minute e-bus circular feeder loops',
        shortfallDescription: 'Over 120,000 daily wage earners and college students walk >2.5km to reach the nearest rapid transit metro station.',
        recommendedIntervention: 'Deploy 60 electric mini-buses across 4 dedicated circular routes with unified digital transit card integration.',
        estimatedCost: '₹62 Crores (~$7.4M USD)',
        timeline: '6 Months',
        roiRatio: '3.6x Commute Efficiency'
      },
      {
        id: 'GAP-IN-03',
        title: 'Marathwada Solar Feeder Agricultural Modernization',
        location: 'Beed & Jalna Agricultural Zone',
        category: 'energy',
        citizenDemandCount: 189,
        affectedPopulation: 89000,
        existingCoverage: 'Unmetered thermal grid with 8h daytime cuts',
        benchmarkTarget: 'Dedicated 11kV daytime solar feeder with battery backup',
        shortfallDescription: 'Grid overload causes transformer blowouts during peak harvesting, forcing farmers to operate pumps at night.',
        recommendedIntervention: 'Deploy 25MW decentralized solar agricultural feeders under PM-KUSUM Scheme with smart telemetry.',
        estimatedCost: '₹110 Crores (~$13.2M USD)',
        timeline: '12 Months',
        roiRatio: '5.2x Agricultural Productivity'
      }
    ],
    recommendations: [
      {
        id: 'REC-IN-01',
        title: 'Tamil Nadu River Basin Piped Drinking Water Network',
        category: 'water',
        priority: 'critical',
        confidenceScore: 94,
        budgetRequired: '₹145 Cr',
        usdEquivalent: '$17.4M',
        timeline: '18 Months',
        primarySponsor: 'Ministry of Jal Shakti / State Water Board',
        impactMetrics: '142,000 citizens guaranteed clean water; 60% reduction in waterborne infections',
        whySurfaced: [
          'High citizen demand: 312 validated requests in past 30 days',
          'Vulnerability match: High child malnutrition index and fluoride contamination in groundwater',
          'Existing budget alignment: Jal Jeevan Mission unallocated district tranche available',
          'High geographic concentration within a 28km contiguous cluster'
        ]
      },
      {
        id: 'REC-IN-02',
        title: 'Najafgarh Peripheral Electric Transit Feeder Deployment',
        category: 'transport',
        priority: 'high',
        confidenceScore: 89,
        budgetRequired: '₹62 Cr',
        usdEquivalent: '$7.4M',
        timeline: '6 Months',
        primarySponsor: 'Delhi Transport Infrastructure Development Corp',
        impactMetrics: 'Average commute reduced from 65 to 22 mins; 18,000 tons annual CO2 abatement',
        whySurfaced: [
          'Repeated transit choke complaints across multiple linguistic groups (Hindi, English)',
          'High demographic density: 8,400 people per sq km in target zone',
          'Immediate readiness: Terminal depot land already allocated by municipal agency'
        ]
      },
      {
        id: 'REC-IN-03',
        title: 'Kosi Basin Elevated Flood-Resilient Causeways',
        category: 'roads',
        priority: 'high',
        confidenceScore: 88,
        budgetRequired: '₹84 Cr',
        usdEquivalent: '$10.1M',
        timeline: '14 Months',
        primarySponsor: 'Rural Development Dept (PMGSY)',
        impactMetrics: 'Continuous all-weather hospital transit for 215,000 residents across 62 hamlets',
        whySurfaced: [
          'Critical life-safety hazard flagged by rural ambulance telemetry and IVR logs',
          'Demographic index shows zero secondary healthcare access during 4-month flood seasons',
          'High benefit-to-cost ratio evaluated against historical disaster relief expenditures'
        ]
      }
    ],
    impactProjects: [
      {
        id: 'PROJ-IN-01',
        name: 'Delhi Metro Outer Extension Phase IV',
        sector: 'Public Transport',
        status: 'under_construction',
        progress: 68,
        budgetSpent: '₹1,240 Cr / ₹1,820 Cr',
        citizenInputsAnalyzed: 420,
        baselineMetric: '48 min average transit time; 29% female workforce participation',
        currentProjectedMetric: '24 min transit time; +14% female transit ridership; 310k daily passengers',
        measurementMethod: 'Automated fare collection telemetry + quarterly household surveys'
      },
      {
        id: 'PROJ-IN-02',
        name: 'Vellore District Piped Water Scheme',
        sector: 'Water & Sanitation',
        status: 'completed',
        progress: 100,
        budgetSpent: '₹92 Cr / ₹95 Cr',
        citizenInputsAnalyzed: 198,
        baselineMetric: 'Water access 1 day per week via mobile diesel tankers',
        currentProjectedMetric: '24/7 piped pressurized potable water across 34 villages; 52% drop in dysentery cases',
        measurementMethod: 'IoT flow-meter telemetry and primary health center morbidity registers'
      }
    ]
  },

  brazil: {
    code: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    currency: 'BRL (R$)',
    currencySymbol: 'R$',
    usdRate: 5.4,
    nationalPlan: 'Novo PAC (Programa de Aceleração do Crescimento)',
    stats: {
      totalRequests: 2180,
      activeHotspots: 14,
      criticalGaps: 9,
      activeProjects: 7,
      populationReached: '3.1M',
      dataConfidence: '91.8%'
    },
    demographics: {
      totalPopulation: '215.3 Million',
      ruralPercentage: 12.4,
      urbanPercentage: 87.6,
      density: '25 per km²',
      vulnerabilityIndex: 'Medium',
      keyLanguages: ['Português (pt)', 'Indigenous Guaraní (gn)', 'English (en)']
    },
    infrastructureIndices: {
      pipedWaterCoverage: 84.1,
      reliableGridPower: 92.5,
      pavedRoadDensity: 48.2,
      primaryHealthAccess: 71.0,
      digitalConnectivity: 81.3
    },
    mapCenter: [-14.2350, -51.9253],
    mapZoom: 4,
    hotspots: [
      {
        id: 'br-hotspot-001',
        name: 'São Paulo Zona Leste Favela Sanitation Corridor',
        region: 'São Paulo (Itaquera - Cidade Tiradentes)',
        category: 'water',
        severity: 'critical',
        requests: 284,
        population: 195000,
        trend: 'increasing',
        lat: -23.5505,
        lng: -46.6333,
        radius: 20000,
        languages: ['pt'],
        summary: 'Untreated open sewage runoff in high-density informal settlements leading to dengue outbreaks.',
        topConcern: 'Sewage overflowing into alleys during tropical rainstorms'
      },
      {
        id: 'br-hotspot-002',
        name: 'Rio de Janeiro Baixada Fluminense Rail Feeder Deficit',
        region: 'Rio de Janeiro (Nova Iguaçu - Belford Roxo)',
        category: 'transport',
        severity: 'high',
        requests: 215,
        population: 260000,
        trend: 'increasing',
        lat: -22.7562,
        lng: -43.4608,
        radius: 24000,
        languages: ['pt'],
        summary: 'Frequent commuter train breakdowns and missing feeder minibus integration to industrial hubs.',
        topConcern: '3-hour daily roundtrip commute times for essential workers'
      },
      {
        id: 'br-hotspot-003',
        name: 'Amazonas Manaus Riverine Solar Microgrid Deficit',
        region: 'Amazonas (Coari - Tefé River Basin)',
        category: 'energy',
        severity: 'critical',
        requests: 162,
        population: 48000,
        trend: 'stable',
        lat: -3.1190,
        lng: -60.0217,
        radius: 35000,
        languages: ['pt', 'gn'],
        summary: 'Remote riverine communities dependent on expensive, polluting diesel generators operating 4h/day.',
        topConcern: 'Vaccine refrigeration failure at riverside primary health posts'
      },
      {
        id: 'br-hotspot-004',
        name: 'Bahia Sertão Drought Emergency Cistern Network',
        region: 'Bahia (Juazeiro - Canudos Semi-Arid)',
        category: 'water',
        severity: 'high',
        requests: 145,
        population: 72000,
        trend: 'increasing',
        lat: -9.4167,
        lng: -40.5000,
        radius: 28000,
        languages: ['pt'],
        summary: 'Severe drought depleting communal cisterns; rural smallholders unable to sustain family livestock.',
        topConcern: 'Exhaustion of emergency municipal water tanker deliveries'
      }
    ],
    requests: [
      {
        id: 'REQ-BR-201',
        timestamp: '25 mins ago',
        channel: 'WhatsApp Business',
        rawText: 'O esgoto a céu aberto na Rua das Palmeiras transborda toda vez que chove. As crianças estão ficando doentes.',
        translatedText: 'The open sewer on Rua das Palmeiras overflows whenever it rains. Our children are getting sick with infections.',
        language: 'pt',
        languageName: 'Portuguese',
        location: 'Cidade Tiradentes, São Paulo',
        category: 'water',
        subcategory: 'sanitation_drainage',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 3400,
        sentiment: 'Public Health Alarm',
        status: 'Aggregated into Hotspot #001'
      },
      {
        id: 'REQ-BR-202',
        timestamp: '1 hour ago',
        channel: 'IVR Voice',
        rawText: 'O trem da SuperVia atrasou mais de 50 minutos hoje em Belford Roxo. Perdemos o turno da fábrica.',
        translatedText: 'The SuperVia train was delayed by over 50 minutes today at Belford Roxo. We lost our factory work shifts.',
        language: 'pt',
        languageName: 'Portuguese',
        location: 'Baixada Fluminense, Rio de Janeiro',
        category: 'transport',
        subcategory: 'commuter_rail',
        severity: 'high',
        urgency: 'normal',
        affectedPop: 12000,
        sentiment: 'Economic Productivity Loss',
        status: 'Aggregated into Hotspot #002'
      },
      {
        id: 'REQ-BR-203',
        timestamp: '3 hours ago',
        channel: 'Web Portal',
        rawText: 'O posto de saúde comunitário no Tefé está sem combustível para o gerador de vacinas há 5 dias.',
        translatedText: 'The community health clinic in Tefé has been out of fuel for the vaccine generator for 5 days.',
        language: 'pt',
        languageName: 'Portuguese',
        location: 'Tefé, Amazonas',
        category: 'energy',
        subcategory: 'solar_clinic_microgrid',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 1800,
        sentiment: 'Critical Health Risk',
        status: 'Aggregated into Hotspot #003'
      }
    ],
    gaps: [
      {
        id: 'GAP-BR-01',
        title: 'São Paulo Peripheral Favela Sanitation & Stormwater Network',
        location: 'Itaquera & Cidade Tiradentes',
        category: 'water',
        citizenDemandCount: 284,
        affectedPopulation: 195000,
        existingCoverage: '42% formal wastewater collection',
        benchmarkTarget: '100% universalized wastewater interception and slope containment',
        shortfallDescription: 'Over 110,000 residents live in precarious drainage basins subject to raw sewage discharge and flash mudslides.',
        recommendedIntervention: 'Install modular compact gravity-sewer interceptors and micro-drainage channels under the Novo PAC Urbanization fund.',
        estimatedCost: 'R$ 88 Million (~$16.3M USD)',
        timeline: '15 Months',
        roiRatio: '4.2x Health & Property Protection'
      },
      {
        id: 'GAP-BR-02',
        title: 'Amazon Riverine Off-Grid Clinic Solar Telemetry',
        location: 'Middle Solimões Basin, Amazonas',
        category: 'energy',
        citizenDemandCount: 162,
        affectedPopulation: 48000,
        existingCoverage: 'Intermittent diesel gen-sets (4 hours/night)',
        benchmarkTarget: '100% 24/7 photovoltaic microgrid with lithium battery storage',
        shortfallDescription: 'Vaccines spoil and emergency nighttime maternal deliveries are carried out under flashlights.',
        recommendedIntervention: 'Deploy 40 centralized 15kW solar-plus-storage containerized microgrids at riverside health and educational centers.',
        estimatedCost: 'R$ 34 Million (~$6.3M USD)',
        timeline: '8 Months',
        roiRatio: '5.8x Life-Safety & Carbon Reduction'
      }
    ],
    recommendations: [
      {
        id: 'REC-BR-01',
        title: 'Zona Leste Micro-Sanitation & Flood Defense System',
        category: 'water',
        priority: 'critical',
        confidenceScore: 93,
        budgetRequired: 'R$ 88M',
        usdEquivalent: '$16.3M',
        timeline: '15 Months',
        primarySponsor: 'Ministério das Cidades / SABESP',
        impactMetrics: '195,000 residents protected from sewage flooding; 74% decrease in waterborne leptospirosis',
        whySurfaced: [
          'High citizen complaint concentration: 284 audio & WhatsApp messages',
          'Heavy seasonal rainfall alerts mapped against landslide risk census tracks',
          'Matches Novo PAC federal infrastructure funding prioritization guidelines'
        ]
      },
      {
        id: 'REC-BR-02',
        title: 'Amazonas Solar Telemetry for Rural Primary Health Posts',
        category: 'energy',
        priority: 'high',
        confidenceScore: 91,
        budgetRequired: 'R$ 34M',
        usdEquivalent: '$6.3M',
        timeline: '8 Months',
        primarySponsor: 'Ministério de Minas e Energia (Luz para Todos)',
        impactMetrics: '48,000 riverine residents gain 24/7 cold-chain clinical care and satellite communications',
        whySurfaced: [
          'Critical vulnerability in maternal and infant immunization cold chains',
          'Eliminates R$ 1.8M in annual subsidized diesel transportation costs'
        ]
      }
    ],
    impactProjects: [
      {
        id: 'PROJ-BR-01',
        name: 'Baixada Fluminense Rapid Bus Interconnector',
        sector: 'Transport',
        status: 'under_construction',
        progress: 54,
        budgetSpent: 'R$ 180M / R$ 320M',
        citizenInputsAnalyzed: 310,
        baselineMetric: '85 minute average commuter delay; 3 transit transfers',
        currentProjectedMetric: '35 minute direct corridor; serving 140,000 daily passengers',
        measurementMethod: 'GPS bus transponders + bi-weekly commuter satisfaction app polling'
      }
    ]
  },

  russia: {
    code: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    currency: 'RUB (₽)',
    currencySymbol: '₽',
    usdRate: 92.0,
    nationalPlan: 'Comprehensive Plan for Modernization of Trunk Infrastructure',
    stats: {
      totalRequests: 1740,
      activeHotspots: 11,
      criticalGaps: 7,
      activeProjects: 6,
      populationReached: '2.4M',
      dataConfidence: '90.5%'
    },
    demographics: {
      totalPopulation: '144.4 Million',
      ruralPercentage: 25.1,
      urbanPercentage: 74.9,
      density: '8.5 per km²',
      vulnerabilityIndex: 'Low-Medium',
      keyLanguages: ['Русский (ru)', 'Tatar (tt)', 'Yakut (sah)', 'English (en)']
    },
    infrastructureIndices: {
      pipedWaterCoverage: 89.0,
      reliableGridPower: 95.8,
      pavedRoadDensity: 53.4,
      primaryHealthAccess: 78.5,
      digitalConnectivity: 86.2
    },
    mapCenter: [61.5240, 105.3188],
    mapZoom: 3,
    hotspots: [
      {
        id: 'ru-hotspot-001',
        name: 'Yakutsk Permafrost Heating & Pipe Insulation Corridor',
        region: 'Sakha Republic (Yakutsk - Pokrovsk)',
        category: 'energy',
        severity: 'critical',
        requests: 210,
        population: 85000,
        trend: 'increasing',
        lat: 62.0355,
        lng: 129.6755,
        radius: 35000,
        languages: ['ru', 'sah'],
        summary: 'Permafrost ground shifting causing fractures in communal district heating mains at -45°C.',
        topConcern: 'Catastrophic district radiator freeze-ups during sub-zero winter peaks'
      },
      {
        id: 'ru-hotspot-002',
        name: 'Krasnoyarsk Clean Air & Urban Gas Heating Transition',
        region: 'Siberian Federal District (Krasnoyarsk Industrial)',
        category: 'energy',
        severity: 'high',
        requests: 184,
        population: 240000,
        trend: 'stable',
        lat: 56.0153,
        lng: 92.8932,
        radius: 25000,
        languages: ['ru'],
        summary: 'Heavy winter thermal inversions trapping brown-coal soot from outdated residential boilers.',
        topConcern: 'Black sky emergency warnings impacting child respiratory health'
      },
      {
        id: 'ru-hotspot-003',
        name: 'Vladivostok Peripheral Logistics & Port Bypass Road',
        region: 'Primorsky Krai (Artyom - Vladivostok Port)',
        category: 'roads',
        severity: 'medium',
        requests: 138,
        population: 175000,
        trend: 'increasing',
        lat: 43.1198,
        lng: 131.8869,
        radius: 28000,
        languages: ['ru'],
        summary: 'Heavy container trucks congesting suburban residential thoroughfares with heavy road degradation.',
        topConcern: 'Severe structural potholes and traffic bottlenecks on cargo corridors'
      }
    ],
    requests: [
      {
        id: 'REQ-RU-301',
        timestamp: '30 mins ago',
        channel: 'Web Portal',
        rawText: 'В микрорайоне Марха теплотрасса просела из-за оттаивания грунта. Температура в квартирах упала до +12°C при морозе -40°C.',
        translatedText: 'In Markha microdistrict, the heating main sagged due to soil thaw. Indoor temperature has dropped to +12°C while it is -40°C outside.',
        language: 'ru',
        languageName: 'Russian',
        location: 'Yakutsk, Sakha Republic',
        category: 'energy',
        subcategory: 'district_heating',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 4200,
        sentiment: 'Severe Winter Emergency',
        status: 'Aggregated into Hotspot #001'
      },
      {
        id: 'REQ-RU-302',
        timestamp: '2 hours ago',
        channel: 'SMS Gateway',
        rawText: 'Опять режим черного неба в Красноярске. Частный сектор топит углем, дышать невозможно.',
        translatedText: 'Black sky regime declared again in Krasnoyarsk. The private sector burns raw coal; air is unbreathable.',
        language: 'ru',
        languageName: 'Russian',
        location: 'Krasnoyarsk, Siberia',
        category: 'energy',
        subcategory: 'clean_heat_transition',
        severity: 'high',
        urgency: 'normal',
        affectedPop: 15000,
        sentiment: 'Environmental Concern',
        status: 'Aggregated into Hotspot #002'
      }
    ],
    gaps: [
      {
        id: 'GAP-RU-01',
        title: 'Yakutia Cryo-Resilient District Heating Modernization',
        location: 'Yakutsk Urban Okrug',
        category: 'energy',
        citizenDemandCount: 210,
        affectedPopulation: 85000,
        existingCoverage: 'Rigid elevated steel mains on thawing pilings',
        benchmarkTarget: 'Flexible insulated polyurethane cryo-compensating mains',
        shortfallDescription: '38km of Soviet-era thermal pipelines are tilting as subsoil permafrost thaws, risking winter freeze-bursts.',
        recommendedIntervention: 'Reconstruct 38km of district heating with thermopile refrigeration foundation supports and automated leak sensors.',
        estimatedCost: '₽ 2.1 Billion (~$22.8M USD)',
        timeline: '12 Months',
        roiRatio: '4.6x Disaster Prevention Multiplier'
      }
    ],
    recommendations: [
      {
        id: 'REC-RU-01',
        title: 'Sub-Arctic Flexible Cryo-Insulated Heating Pipeline Replacement',
        category: 'energy',
        priority: 'critical',
        confidenceScore: 95,
        budgetRequired: '₽ 2.1B',
        usdEquivalent: '$22.8M',
        timeline: '12 Months',
        primarySponsor: 'Ministry of Construction, Housing and Utilities (Minstroy)',
        impactMetrics: 'Guaranteed winter heating security for 85,000 Arctic citizens; zero burst outages',
        whySurfaced: [
          'High life-critical hazard: freeze risks at -45°C ambient temperatures',
          'Demographic concentration: municipal hospitals and schools directly attached to failing line',
          'Federal regional development subsidies earmarked for Far East modernization'
        ]
      }
    ],
    impactProjects: [
      {
        id: 'PROJ-RU-01',
        name: 'Siberian Smart Gasification Pilot',
        sector: 'Energy & Environment',
        status: 'under_construction',
        progress: 42,
        budgetSpent: '₽ 1.4B / ₽ 3.2B',
        citizenInputsAnalyzed: 260,
        baselineMetric: '142 days per year exceeding PM2.5 hazardous particulate thresholds',
        currentProjectedMetric: '65% drop in residential soot emissions across 18,000 households',
        measurementMethod: 'Automated air monitoring stations + gas consumption telemetry'
      }
    ]
  },

  china: {
    code: 'china',
    name: 'China',
    flag: '🇨🇳',
    currency: 'CNY (¥)',
    currencySymbol: '¥',
    usdRate: 7.2,
    nationalPlan: '14th Five-Year Plan for Public Infrastructure & Digital Village Initiative',
    stats: {
      totalRequests: 3410,
      activeHotspots: 22,
      criticalGaps: 14,
      activeProjects: 12,
      populationReached: '6.8M',
      dataConfidence: '96.1%'
    },
    demographics: {
      totalPopulation: '1.412 Billion',
      ruralPercentage: 35.4,
      urbanPercentage: 64.6,
      density: '150 per km²',
      vulnerabilityIndex: 'Low-Medium',
      keyLanguages: ['Mandarin Chinese (zh)', 'Cantonese (yue)', 'Tibetan (bo)', 'Uyghur (ug)', 'English (en)']
    },
    infrastructureIndices: {
      pipedWaterCoverage: 91.2,
      reliableGridPower: 98.7,
      pavedRoadDensity: 88.5,
      primaryHealthAccess: 84.0,
      digitalConnectivity: 94.6
    },
    mapCenter: [35.8617, 104.1954],
    mapZoom: 4,
    hotspots: [
      {
        id: 'cn-hotspot-001',
        name: 'Sichuan Mountain Rural Cold-Chain Logistics Hub',
        region: 'Sichuan (Liangshan - Ya\'an Corridor)',
        category: 'digital',
        severity: 'high',
        requests: 340,
        population: 280000,
        trend: 'increasing',
        lat: 27.8864,
        lng: 102.2673,
        radius: 32000,
        languages: ['zh'],
        summary: 'Mountain citrus and tea farmers suffer 35% spoilage due to missing refrigerated village pickup depots.',
        topConcern: 'Agricultural spoilage before products reach high-speed rail freight terminals'
      },
      {
        id: 'cn-hotspot-002',
        name: 'Guizhou Rural Telemedicine Broadband Interconnect',
        region: 'Guizhou (Bijie - Qianxinan Mountain Area)',
        category: 'health',
        severity: 'critical',
        requests: 265,
        population: 160000,
        trend: 'stable',
        lat: 27.3017,
        lng: 105.2863,
        radius: 28000,
        languages: ['zh'],
        summary: 'Village health clinics lack high-speed optical bandwidth for provincial remote diagnostic links.',
        topConcern: 'Delayed ultrasound and ECG triage forcing elderly to travel 6 hours to city hospitals'
      },
      {
        id: 'cn-hotspot-003',
        name: 'Henan Rural Agricultural Water Drainage & Retention Canals',
        region: 'Henan (Zhoukou - Zhumadian Plains)',
        category: 'water',
        severity: 'high',
        requests: 220,
        population: 310000,
        trend: 'increasing',
        lat: 33.6253,
        lng: 114.6497,
        radius: 26000,
        languages: ['zh'],
        summary: 'Silting in secondary agricultural irrigation canals causing localized field ponding during summer storms.',
        topConcern: 'Crop root rot in wheat and soybean planting clusters'
      }
    ],
    requests: [
      {
        id: 'REQ-CN-401',
        timestamp: '18 mins ago',
        channel: 'WeChat Mini-App',
        rawText: '凉山农户的水果采摘后没有冷库储存，运到县城坏了一半，急需在乡里建设保鲜冷链物流点。',
        translatedText: 'Fruit picked by Liangshan farmers has no cold storage; half rots before reaching the county town. We urgently need village refrigerated cold-chain depots.',
        language: 'zh',
        languageName: 'Chinese (Mandarin)',
        location: 'Liangshan Prefecture, Sichuan',
        category: 'digital',
        subcategory: 'cold_chain_logistics',
        severity: 'high',
        urgency: 'urgent',
        affectedPop: 5600,
        sentiment: 'Farmer Livelihood Urgency',
        status: 'Aggregated into Hotspot #001'
      },
      {
        id: 'REQ-CN-402',
        timestamp: '1 hour ago',
        channel: 'Web Portal',
        rawText: '乡卫生院的网络带宽不足，省人民医院的远程会诊视频总是卡顿，老人做B超无法实时传回专家诊断。',
        translatedText: 'The village health clinic bandwidth is insufficient; telemedicine video calls with provincial hospital lag, preventing real-time ultrasound expert diagnosis.',
        language: 'zh',
        languageName: 'Chinese (Mandarin)',
        location: 'Bijie, Guizhou',
        category: 'health',
        subcategory: 'telemedicine_broadband',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 3800,
        sentiment: 'Healthcare Access Bottleneck',
        status: 'Aggregated into Hotspot #002'
      }
    ],
    gaps: [
      {
        id: 'GAP-CN-01',
        title: 'Liangshan Mountain Cold-Chain Village Depot Network',
        location: 'Liangshan Yi Autonomous Prefecture, Sichuan',
        category: 'digital',
        citizenDemandCount: 340,
        affectedPopulation: 280000,
        existingCoverage: 'Centralized county cold storage only (45km transit)',
        benchmarkTarget: 'Pre-cooling mobile refrigerated hubs within 5km of every farming collective',
        shortfallDescription: 'Perishable specialty mountain produce experiences 35% transit wastage before entering wholesale national platforms.',
        recommendedIntervention: 'Construct 24 smart modular solar-powered cold-chain collection centers integrated with National Rural Revitalization logistics.',
        estimatedCost: '¥ 65 Million (~$9.0M USD)',
        timeline: '9 Months',
        roiRatio: '6.4x Farm Household Income Increase'
      }
    ],
    recommendations: [
      {
        id: 'REC-CN-01',
        title: 'Smart Solar-Powered Village Cold-Chain Hub Deployment',
        category: 'digital',
        priority: 'high',
        confidenceScore: 96,
        budgetRequired: '¥ 65M',
        usdEquivalent: '$9.0M',
        timeline: '9 Months',
        primarySponsor: 'Ministry of Agriculture and Rural Affairs / China Post Logistics',
        impactMetrics: 'Reduces produce spoilage from 35% to under 6%; adds ¥ 1,400 per rural family income annually',
        whySurfaced: [
          'Direct alignment with 14th Five-Year Plan Rural Revitalization key targets',
          '340 verified citizen requests submitted through digital public services mini-programs',
          'Logistics route already connects to national high-speed expressway network'
        ]
      }
    ],
    impactProjects: [
      {
        id: 'PROJ-CN-01',
        name: 'Guizhou Mountain 5G Telemedicine Clinic Linkage',
        sector: 'Digital Health Infrastructure',
        status: 'completed',
        progress: 100,
        budgetSpent: '¥ 48M / ¥ 50M',
        citizenInputsAnalyzed: 380,
        baselineMetric: 'Patients had to travel 120km to provincial center for cardiovascular scans',
        currentProjectedMetric: 'Same-day remote specialist diagnosis for 160,000 mountain residents; 98.4% satisfaction',
        measurementMethod: 'Telemedicine session logs + municipal health insurance reimbursement records'
      }
    ]
  },

  southafrica: {
    code: 'southafrica',
    name: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR (R)',
    currencySymbol: 'R',
    usdRate: 18.2,
    nationalPlan: 'National Development Plan 2030 (NDP) & Infrastructure South Africa',
    stats: {
      totalRequests: 1950,
      activeHotspots: 13,
      criticalGaps: 8,
      activeProjects: 6,
      populationReached: '2.8M',
      dataConfidence: '92.4%'
    },
    demographics: {
      totalPopulation: '60.6 Million',
      ruralPercentage: 32.6,
      urbanPercentage: 67.4,
      density: '50 per km²',
      vulnerabilityIndex: 'High',
      keyLanguages: ['isiZulu (zu)', 'isiXhosa (xh)', 'Afrikaans (af)', 'English (en)', 'Sesotho (st)']
    },
    infrastructureIndices: {
      pipedWaterCoverage: 76.5,
      reliableGridPower: 64.2,
      pavedRoadDensity: 58.0,
      primaryHealthAccess: 62.4,
      digitalConnectivity: 72.8
    },
    mapCenter: [-30.5595, 22.9375],
    mapZoom: 5,
    hotspots: [
      {
        id: 'za-hotspot-001',
        name: 'Soweto & Johannesburg South Substation Reliability Zone',
        region: 'Gauteng (Soweto - Diepkloof - Meadowlands)',
        category: 'energy',
        severity: 'critical',
        requests: 310,
        population: 340000,
        trend: 'increasing',
        lat: -26.2485,
        lng: 27.8540,
        radius: 22000,
        languages: ['zu', 'en', 'st'],
        summary: 'Frequent substation explosions and secondary load shedding exceeding 10 hours daily.',
        topConcern: 'Loss of refrigerated life-saving insulin and small business closures'
      },
      {
        id: 'za-hotspot-002',
        name: 'Cape Flats Safe Commuter Transit & High-Mast Lighting',
        region: 'Western Cape (Khayelitsha - Mitchells Plain)',
        category: 'transport',
        severity: 'critical',
        requests: 255,
        population: 410000,
        trend: 'increasing',
        lat: -34.0381,
        lng: 18.6657,
        radius: 20000,
        languages: ['xh', 'en', 'af'],
        summary: 'Commuters attacked walking to unlit railway stations; broken Metrorail signaling.',
        topConcern: 'Severe pedestrian security risks for early morning and evening domestic workers'
      },
      {
        id: 'za-hotspot-003',
        name: 'Eastern Cape Rural School Sanitation & Rainwater Harvesting',
        region: 'Eastern Cape (OR Tambo District - Mthatha)',
        category: 'water',
        severity: 'high',
        requests: 182,
        population: 95000,
        trend: 'stable',
        lat: -31.5889,
        lng: 28.7844,
        radius: 30000,
        languages: ['xh', 'en'],
        summary: 'Rural primary schools still relying on dangerous pit latrines without safe on-site drinking water.',
        topConcern: 'Child safety hazards and elevated absenteeism during dry months'
      },
      {
        id: 'za-hotspot-004',
        name: 'Durban Coastal Stormwater Drainage Reconstruction',
        region: 'KwaZulu-Natal (eThekwini Coastal Belt)',
        category: 'roads',
        severity: 'high',
        requests: 164,
        population: 220000,
        trend: 'increasing',
        lat: -29.8587,
        lng: 31.0218,
        radius: 24000,
        languages: ['zu', 'en'],
        summary: 'Unrepaired stormwater culverts from recent floods causing roadway collapse and raw runoff.',
        topConcern: 'Road severance cutting off industrial transit to Durban harbour'
      }
    ],
    requests: [
      {
        id: 'REQ-ZA-501',
        timestamp: '12 mins ago',
        channel: 'WhatsApp Business',
        rawText: 'Isiteshi samandla saseDiepkloof siqhume izolo ebusuku. Asinawo ugesi futhi ukudla kwethu kuyonakala efrijini.',
        translatedText: 'The Diepkloof electrical substation exploded last night. We have no power and all our food is spoiling in the fridge.',
        language: 'zu',
        languageName: 'isiZulu',
        location: 'Diepkloof, Soweto, Gauteng',
        category: 'energy',
        subcategory: 'substation_grid_reinforcement',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 8200,
        sentiment: 'Severe Distress / Grid Collapse',
        status: 'Aggregated into Hotspot #001'
      },
      {
        id: 'REQ-ZA-502',
        timestamp: '45 mins ago',
        channel: 'IVR Voice',
        rawText: 'Kufuneka izibane ezinde eKhayelitsha. Abantu bayaphangwa ekuseni xa besiya esitishini sikaloliwe.',
        translatedText: 'We need high-mast streetlights in Khayelitsha. People are getting robbed every morning walking to the railway station.',
        language: 'xh',
        languageName: 'isiXhosa',
        location: 'Khayelitsha, Cape Town',
        category: 'transport',
        subcategory: 'public_lighting_security',
        severity: 'critical',
        urgency: 'urgent',
        affectedPop: 14000,
        sentiment: 'Personal Safety Alarm',
        status: 'Aggregated into Hotspot #002'
      },
      {
        id: 'REQ-ZA-503',
        timestamp: '2 hours ago',
        channel: 'SMS Gateway',
        rawText: 'Our school in Mthatha has no running water. Children must bring 5L water bottles from home everyday.',
        translatedText: 'Our school in Mthatha has no running water. Children must bring 5L water bottles from home everyday.',
        language: 'en',
        languageName: 'English',
        location: 'OR Tambo District, Eastern Cape',
        category: 'water',
        subcategory: 'school_sanitation',
        severity: 'high',
        urgency: 'normal',
        affectedPop: 950,
        sentiment: 'Basic Dignity / Child Well-being',
        status: 'Aggregated into Hotspot #003'
      }
    ],
    gaps: [
      {
        id: 'GAP-ZA-01',
        title: 'Soweto Substation & Microgrid Resiliency Overhaul',
        location: 'Soweto & Johannesburg South',
        category: 'energy',
        citizenDemandCount: 310,
        affectedPopulation: 340000,
        existingCoverage: 'Failing 40-year-old overloaded oil transformers',
        benchmarkTarget: 'Modular smart dry-type transformers with microgrid isolation',
        shortfallDescription: 'Recurring transformer explosions cause unannounced 72-hour blackouts across 12 township zones.',
        recommendedIntervention: 'Install 6 reinforced 88/11kV substations with automated smart-meter load balancers under City Power Emergency Capital tranche.',
        estimatedCost: 'R 210 Million (~$11.5M USD)',
        timeline: '10 Months',
        roiRatio: '4.9x Commercial & Vital Health Protection'
      },
      {
        id: 'GAP-ZA-02',
        title: 'Khayelitsha Safe Transit Corridors & Solar High-Mast Lighting',
        location: 'Khayelitsha & Mitchells Plain, Cape Town',
        category: 'transport',
        citizenDemandCount: 255,
        affectedPopulation: 410000,
        existingCoverage: 'Unlit pedestrian dirt tracks to commuter rail halts',
        benchmarkTarget: 'Paved, illuminated, CCTV-monitored non-motorized transport (NMT) paths',
        shortfallDescription: 'Vulnerable domestic workers face severe assault risks along 14km of unlit pedestrian transit accessways.',
        recommendedIntervention: 'Install 85 solar high-mast lighting towers and construct 18km of paved, barrier-protected pedestrian walking lanes.',
        estimatedCost: 'R 95 Million (~$5.2M USD)',
        timeline: '8 Months',
        roiRatio: '5.5x Citizen Safety & Social Equity'
      }
    ],
    recommendations: [
      {
        id: 'REC-ZA-01',
        title: 'Soweto Substation Reinforcement & Mini-Grid Stabilization',
        category: 'energy',
        priority: 'critical',
        confidenceScore: 94,
        budgetRequired: 'R 210M',
        usdEquivalent: '$11.5M',
        timeline: '10 Months',
        primarySponsor: 'Eskom / City Power / Presidential Climate Commission',
        impactMetrics: 'Restores stable electricity for 340,000 residents; eliminates 85% of unplanned substation trips',
        whySurfaced: [
          'Record high volume of distress inputs across isiZulu, English, and Sesotho',
          'Direct threat to community clinics, water pumping stations, and local retail',
          'Eligible for South Africa Just Energy Transition Investment Plan (JET-IP) funds'
        ]
      },
      {
        id: 'REC-ZA-02',
        title: 'Khayelitsha Pedestrian Transit Safety Infrastructure',
        category: 'transport',
        priority: 'critical',
        confidenceScore: 92,
        budgetRequired: 'R 95M',
        usdEquivalent: '$5.2M',
        timeline: '8 Months',
        primarySponsor: 'City of Cape Town / PRASA',
        impactMetrics: '410,000 township commuters gain safe access; 68% projected decrease in early-morning violent crime',
        whySurfaced: [
          'High concentration of severe personal security alarms logged via IVR and WhatsApp',
          'Complements national rail service reactivation along the Central Line corridor'
        ]
      }
    ],
    impactProjects: [
      {
        id: 'PROJ-ZA-01',
        name: 'Eastern Cape Safe School Sanitation Initiative',
        sector: 'Water & Education',
        status: 'under_construction',
        progress: 76,
        budgetSpent: 'R 120M / R 155M',
        citizenInputsAnalyzed: 280,
        baselineMetric: '84 rural schools using uncovered pit toilets; 0 rainwater storage tanks',
        currentProjectedMetric: '62 schools equipped with safe flush-biogas toilets and 20,000L rainwater systems',
        measurementMethod: 'Independent school governing body verifications + sanitary inspection visits'
      }
    ]
  }
};

/**
 * Data Sources Configuration Registry
 * Demonstrates transparent Data Governance & separation of Demo vs Planned Connectors
 */
const DATA_SOURCES_REGISTRY = [
  {
    id: 'src-citizen-voice',
    name: 'Citizen Voice Intake (IVRS & Telephony)',
    category: 'Citizen Data',
    status: 'demo',
    badgeText: 'Active Demo Engine',
    description: 'Toll-free interactive voice response gateway simulating multi-dialect speech capture.',
    supportedLanguages: ['ta', 'hi', 'pt', 'ru', 'zh', 'zu', 'xh', 'en'],
    updateFrequency: 'Real-time Webhook (Simulated)',
    readyForGroqWhisper: true
  },
  {
    id: 'src-citizen-messaging',
    name: 'Citizen Messaging (WhatsApp / SMS / Mini-Apps)',
    category: 'Citizen Data',
    status: 'demo',
    badgeText: 'Active Demo Engine',
    description: 'Conversational chatbot and webhook connectors aggregating text feedback across popular messaging apps.',
    supportedLanguages: ['All BRICS Official Languages'],
    updateFrequency: 'Sub-minute batches',
    readyForGroqWhisper: false
  },
  {
    id: 'src-gov-census',
    name: 'National Census & Demographic Statistics',
    category: 'Demographic Data',
    status: 'planned',
    badgeText: 'Planned API Connector',
    description: 'Standardized demographic layers providing population count, age distribution, poverty index, and rural/urban classification.',
    sources: ['IBGE (Brazil)', 'Rosstat (Russia)', 'Census of India', 'National Bureau of Statistics (China)', 'Stats SA (South Africa)'],
    updateFrequency: 'Periodic Census Revisions',
    readyForGroqWhisper: false
  },
  {
    id: 'src-infra-registry',
    name: 'National Infrastructure Asset Registries',
    category: 'Infrastructure Data',
    status: 'planned',
    badgeText: 'Planned API Connector',
    description: 'Geospatial GIS registries of existing roads, water treatment plants, electrical substations, and clinics.',
    sources: ['PM GatiShakti Portal', 'Novo PAC Registry', 'State Infrastructure Registry Russia', 'Ministry of Transport China', 'Infrastructure SA'],
    updateFrequency: 'Monthly Cadence',
    readyForGroqWhisper: false
  },
  {
    id: 'src-investment-plans',
    name: 'Public Investment & Budget Expenditure Portals',
    category: 'Investment Data',
    status: 'planned',
    badgeText: 'Planned API Connector',
    description: 'Official budget line allocations, active tenders, and approved development tranches for financial alignment.',
    sources: ['Ministry of Finance Portals across BRICS Nations'],
    updateFrequency: 'Quarterly Fiscal Cycles',
    readyForGroqWhisper: false
  }
];

// Helper functions for state retrieval and data manipulation
function getCountryData(countryCode) {
  const code = (countryCode || 'india').toLowerCase();
  return BRICS_DATA[code] || BRICS_DATA.india;
}

function getAllCountries() {
  return Object.values(BRICS_DATA).map(c => ({
    code: c.code,
    name: c.name,
    flag: c.flag,
    currency: c.currency,
    nationalPlan: c.nationalPlan,
    totalRequests: c.stats.totalRequests,
    activeHotspots: c.stats.activeHotspots,
    criticalGaps: c.stats.criticalGaps
  }));
}

// In-browser local storage persistence for citizen submitted requests
function getStoredRequests(countryCode) {
  const code = (countryCode || 'india').toLowerCase();
  const storageKey = `infravoice_requests_${code}`;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('LocalStorage access error', e);
  }
  return [];
}

function saveStoredRequest(countryCode, newRequest) {
  const code = (countryCode || 'india').toLowerCase();
  const storageKey = `infravoice_requests_${code}`;
  const existing = getStoredRequests(code);
  existing.unshift(newRequest);
  try {
    localStorage.setItem(storageKey, JSON.stringify(existing));
  } catch (e) {
    console.warn('LocalStorage save error', e);
  }
  return existing;
}

// Export for Node.js if in commonjs or attach to window if in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BRICS_DATA,
    DATA_SOURCES_REGISTRY,
    getCountryData,
    getAllCountries
  };
} else if (typeof window !== 'undefined') {
  window.BRICS_DATA = BRICS_DATA;
  window.DATA_SOURCES_REGISTRY = DATA_SOURCES_REGISTRY;
  window.getCountryData = getCountryData;
  window.getAllCountries = getAllCountries;
  window.getStoredRequests = getStoredRequests;
  window.saveStoredRequest = saveStoredRequest;
}
