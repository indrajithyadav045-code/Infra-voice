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

// -------------------------------------------------------------
// Comprehensive Multilingual Registry for BRICS Nations
// -------------------------------------------------------------
const BRICS_LANGUAGES = {
  india: [
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      locale: 'hi-IN',
      flag: '🇮🇳',
      popular: true,
      placeholder: 'अपनी समस्या का विवरण दें (उदा: पेयजल पाइपलाइन टूटी हुई है, बिजली कटौती, स्कूल तक पक्की सड़क नहीं है)...',
      micStatus: 'आपकी आवाज़ सुनी जा रही है... साफ़-साफ़ हिन्दी में बोलें। पूरा होने पर दोबारा क्लिक करें।',
      sampleText: 'नजफगढ़ से मेट्रो तक सुबह कोई बस नहीं चलती, स्कूल और काम के लिए बहुत दिक्कत है।',
      sampleLoc: 'Najafgarh, West Delhi',
      category: 'transport'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      locale: 'ta-IN',
      flag: '🇮🇳',
      popular: true,
      placeholder: 'உங்கள் சமூக குறையை விவரிக்கவும் (எ.கா: குடிநீர் குழாய் சேதம், மின்தடை, ஆரம்ப சுகாதார மைய சாலை பழுது)...',
      micStatus: 'உங்கள் குரல் கேட்கப்படுகிறது... தமிழில் தெளிவாகப் பேசவும். முடிந்ததும் மீண்டும் கிளிக் செய்யவும்.',
      sampleText: 'எங்கள் கிராமத்தில் கடந்த 3 வாரங்களாக குடிநீர் குழாய் பழுதடைந்துள்ளது. 200 குடும்பங்கள் தண்ணீர் இல்லாமல் தவிக்கிறோம்.',
      sampleLoc: 'Madurai District, Tamil Nadu',
      category: 'water'
    },
    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      locale: 'te-IN',
      flag: '🇮🇳',
      popular: true,
      placeholder: 'మీ ప్రాంత సమస్యను వివరించండి (ఉదా: తాగునీటి పైప్‌లైన్ లీకేజ్, వ్యవసాయ విద్యుత్ సమస్య, రహదారి గుంతలు)...',
      micStatus: 'మీ స్వరం వినబడుతోంది... తెలుగులో స్పష్టంగా మాట్లాడండి. పూర్తయిన తర్వాత మళ్లీ క్లిక్ చేయండి.',
      sampleText: 'మా గ్రామంలోని వ్యవసాయ విద్యుత్ ట్రాన్స్‌ఫార్మర్ కాలిపోయింది, 3 రోజులుగా నీరు తోడలేకపోతున్నాము.',
      sampleLoc: 'Warangal Rural, Telangana',
      category: 'energy'
    },
    {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      locale: 'bn-IN',
      flag: '🇮🇳',
      popular: true,
      placeholder: 'আপনার এলাকার সমস্যাটি জানান (যেমন: পানীয় জলের নলকূপ নষ্ট, বিদ্যুৎ বিভ্রাট, কাঁচা বাঁধ ভেঙে যাওয়া)...',
      micStatus: 'আপনার কথা রেকর্ড হচ্ছে... বাংলায় পরিষ্কারভাবে বলুন। শেষ হলে আবার প্রেস করুন।',
      sampleText: 'বর্ষার পর সুন্দরবনের মাটির বাঁধ ভেঙে গেছে, লবণাক্ত জল ঢুকে চাষের জমি ও পানীয় জল নষ্ট হচ্ছে।',
      sampleLoc: 'Sundarbans, West Bengal',
      category: 'water'
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      locale: 'mr-IN',
      flag: '🇮🇳',
      popular: true,
      placeholder: 'तुमच्या तक्रारीचे वर्णन करा (उदा: शेतासाठी वीज पुरवठा खंडित, रस्ता खराब, पिण्याच्या पाण्याची टंचाई)...',
      micStatus: 'तुमचा आवाज ऐकला जात आहे... स्पष्ट मराठीत बोला. पूर्ण झाल्यावर पुन्हा क्लिक करा.',
      sampleText: 'बीड मधील शेतीसाठी दररोज 8 तास वीज पुरवठा खंडित होतो. विहिरीचे पाणी शेतात पोहोचत नाही.',
      sampleLoc: 'Beed District, Maharashtra',
      category: 'energy'
    },
    {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      locale: 'kn-IN',
      flag: '🇮🇳',
      placeholder: 'ನಿಮ್ಮ ಗ್ರಾಮ ಅಥವಾ ಬಡಾವಣೆಯ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ (ಉದಾ: ಕುಡಿಯುವ ನೀರಿನ ಪೈಪ್ ಒಡೆದಿದೆ, ಬಸ್ ಸೌಕರ್ಯ ಕೊರತೆ)...',
      micStatus: 'ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ... ಕನ್ನಡದಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ.',
      sampleText: 'ಸರ್ಜಾಪುರ ರಸ್ತೆಯಲ್ಲಿ ಮೆಟ್ರೋ ಲಿಂಕ್ ಇಲ್ಲದೆ ಬಸ್ಸುಗಳು ತುಂಬಾ ಕಿಕ್ಕಿರಿದಿವೆ. ಹೆಚ್ಚುವರಿ ಎಲೆಕ್ಟ್ರಿಕ್ ಬಸ್ಸುಗಳು ಬೇಕು.',
      sampleLoc: 'Bengaluru South, Karnataka',
      category: 'transport'
    },
    {
      code: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      locale: 'gu-IN',
      flag: '🇮🇳',
      placeholder: 'તમારી ફરિયાદ જણાવો (દા.ત. પીવાના પાણીની સમસ્યા, રસ્તા પર ખાડા, દવાખાના સુધી એમ્બ્યુલન્સ ન પહોંચવી)...',
      micStatus: 'તમારો અવાજ રેકોર્ડ થઈ રહ્યો છે... ગુજરાતીમાં સ્પષ્ટ બોલો.',
      sampleText: 'ગામના પ્રાથમિક આરોગ્ય કેન્દ્ર સુધી પહોંચવાનો રસ્તો ચોમાસામાં ધોવાઈ ગયો છે, તાત્કાલિક રિપેરિંગ જરૂરી છે.',
      sampleLoc: 'Bhavnagar District, Gujarat',
      category: 'roads'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English (India)',
      locale: 'en-IN',
      flag: '🇮🇳',
      placeholder: 'Describe your community grievance (e.g. broken water pipeline, bridge collapse, unlit highway)...',
      micStatus: 'Listening to your voice... Speak clearly in English. Click again to finish.',
      sampleText: 'The culvert connecting Supaul to the primary health centre collapsed last monsoon. Ambulances refuse to come.',
      sampleLoc: 'Supaul, Bihar',
      category: 'roads'
    }
  ],
  brazil: [
    {
      code: 'pt',
      name: 'Português',
      nativeName: 'Português (Brasil)',
      locale: 'pt-BR',
      flag: '🇧🇷',
      popular: true,
      placeholder: 'Descreva a demanda de infraestrutura (ex: esgoto a céu aberto, posto de saúde sem energia, ponte quebrada)...',
      micStatus: 'Ouvindo sua voz... Fale claramente em português. Clique novamente para encerrar.',
      sampleText: 'O esgoto a céu aberto na Rua das Palmeiras transborda toda vez que chove. As crianças estão ficando doentes.',
      sampleLoc: 'Cidade Tiradentes, São Paulo',
      category: 'water'
    },
    {
      code: 'gn',
      name: 'Guaraní',
      nativeName: 'Avañeʼẽ (Guaraní)',
      locale: 'gn-BR',
      flag: '🇧🇷',
      popular: true,
      placeholder: 'Ehechauka nde mbaʼe jerure (táva y rehegua, tape ivaíva, tasyo mombyry)...',
      micStatus: 'Oñehendu hína nde ñeʼẽ... Eñeʼẽ porã Guaraníme. Emboty jey oparire.',
      sampleText: 'Ore tekohápe ndorekoi y potĩ rohoyʼu hag̃ua, pe ykua oñembyai ha mitãnguéra hasy.',
      sampleLoc: 'Dourados, Mato Grosso do Sul',
      category: 'water'
    },
    {
      code: 'tca',
      name: 'Tikuna',
      nativeName: 'Magüta (Tikuna)',
      locale: 'pt-BR',
      flag: '🇧🇷',
      placeholder: 'Descreva a necessidade da comunidade amazônica (energia solar, posto de saúde ou barco escolar)...',
      micStatus: 'Gravando áudio comunitário Tikuna / Português...',
      sampleText: 'O gerador solar da aldeia no Alto Solimões parou de funcionar e o posto de saúde perdeu o estoque de vacinas.',
      sampleLoc: 'Tabatinga, Alto Solimões, Amazonas',
      category: 'health'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English (Brazil)',
      locale: 'en-US',
      flag: '🇧🇷',
      placeholder: 'Describe your community infrastructure grievance in English...',
      micStatus: 'Listening... Speak clearly in English. Click again to finish.',
      sampleText: 'Overcrowded commuter ferry across Guanabara Bay needs urgent safety inspection and modernization.',
      sampleLoc: 'Niterói, Rio de Janeiro',
      category: 'transport'
    }
  ],
  russia: [
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      locale: 'ru-RU',
      flag: '🇷🇺',
      popular: true,
      placeholder: 'Опишите проблему инфраструктуры (напр., авария теплотрассы, разбитая дорога, нет освещения)...',
      micStatus: 'Идет запись голоса... Говорите четко по-русски. Нажмите еще раз для завершения.',
      sampleText: 'В микрорайоне Марха теплотрасса просела из-за оттаивания грунта. Температура в квартирах упала до +12°C.',
      sampleLoc: 'Якутск, Республика Саха',
      category: 'energy'
    },
    {
      code: 'tt',
      name: 'Tatar',
      nativeName: 'Татар теле',
      locale: 'tt-RU',
      flag: '🇷🇺',
      popular: true,
      placeholder: 'Инфраструктура проблемасын тасвирлагыз (су торбасы ярылган, юл юк, ут сүнгән)...',
      micStatus: 'Тавышыгызны тыңлыйбыз... Татарча ачык итеп сөйләгез. Тәмамлау өчен кабат басыгыз.',
      sampleText: 'Авылыбызда эчәр су торбасы ярылды, 3 көн инде чишмәдән ташыйбыз, тиз арада ремонт кирәк.',
      sampleLoc: 'Арча районы, Татарстан',
      category: 'water'
    },
    {
      code: 'sah',
      name: 'Yakut',
      nativeName: 'Саха тыла',
      locale: 'ru-RU',
      flag: '🇷🇺',
      popular: true,
      placeholder: 'Бэйэҕит нэһилиэккит кыһалҕатын суруйуҥ (сылаас суох, суол ситэри оҥоһуллубатах)...',
      micStatus: 'Куоласкыт сурулла турар... Сахалыы чуолкайдык саҥарыҥ. Бүтэрээри хаттаан баттааҥ.',
      sampleText: 'Кыһыҥҥы суол үрэх туоруур сиринэн эрдэ алдьанна, бөһүөлэккэ ас-үөл тиэйиитэ быһынна.',
      sampleLoc: 'Хаҥалас улууһа, Саха Сирэ',
      category: 'roads'
    },
    {
      code: 'ba',
      name: 'Bashkir',
      nativeName: 'Башҡортса',
      locale: 'ru-RU',
      flag: '🇷🇺',
      placeholder: 'Инфраструктура мәсьәләһен яҙығыҙ (һыу үткәргес боҙолған, юлға асфальт кәрәк)...',
      micStatus: 'Тауышығыҙ яҙҙырыла... Башҡортса асыҡ һөйләгеҙ.',
      sampleText: 'Мәктәпкә илтеүсе күпер яҙғы ташҡында зыян күрҙе, балалар урау юл менән йөрөргә мәжбүр.',
      sampleLoc: 'Бөрйән районы, Башҡортостан',
      category: 'roads'
    },
    {
      code: 'ce',
      name: 'Chechen',
      nativeName: 'Нохчийн мотт',
      locale: 'ru-RU',
      flag: '🇷🇺',
      placeholder: 'Инфраструктурин бала бийца (хи дацар, серло ца хилар, некъ телхина хилар)...',
      micStatus: 'Аз дӀаяздеш ду... Нохчийн маттахь къамел де.',
      sampleText: 'Ламанца ярташка боьду коьрта некъ латта охьадожарна дика телхина, ремонт оьшу.',
      sampleLoc: 'Итум-Кхаьлла, Нохчийн Республика',
      category: 'roads'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English (Russia)',
      locale: 'en-US',
      flag: '🇷🇺',
      placeholder: 'Describe the infrastructure deficit in English...',
      micStatus: 'Listening... Speak clearly in English.',
      sampleText: 'Permafrost thaw caused structural cracks in Arctic transit hub runways, cargo logistics heavily delayed.',
      sampleLoc: 'Norilsk, Krasnoyarsk Krai',
      category: 'transport'
    }
  ],
  china: [
    {
      code: 'zh',
      name: 'Mandarin',
      nativeName: '普通话 (中文)',
      locale: 'zh-CN',
      flag: '🇨🇳',
      popular: true,
      placeholder: '请详细描述基础设施问题（如：农村供水故障、公路损毁、农产品缺乏冷库、基站信号差）...',
      micStatus: '正在录音... 请用普通话清晰讲述。完成后再次点击即可。',
      sampleText: '凉山农户的水果采摘后没有冷库储存，运到县城坏了一半，急需在乡里建设保鲜冷链物流点。',
      sampleLoc: '凉山州昭觉县, 四川',
      category: 'digital'
    },
    {
      code: 'yue',
      name: 'Cantonese',
      nativeName: '粤语 (廣東話)',
      locale: 'zh-HK',
      flag: '🇨🇳',
      popular: true,
      placeholder: '請描述民生基建問題（例如：舊區排污渠管滲漏、跨島渡輪班次唔夠、長者醫療站供電）...',
      micStatus: '正喺度錄音... 請用粵語清晰講述。講完再點擊一次即可。',
      sampleText: '舊區唐樓排污渠管年久失修成日倒灌，每逢暴雨成條街都係污水，急需市區微改造更新。',
      sampleLoc: '深水埗 / 荔湾旧城',
      category: 'water'
    },
    {
      code: 'bo',
      name: 'Tibetan',
      nativeName: 'བོད་སྐད (Tibetan)',
      locale: 'bo-CN',
      flag: '🇨🇳',
      placeholder: 'རྨང་གཞིའི་སྒྲིག་བཀོད་ཀྱི་དཀའ་ངལ་བརྗོད་རོགས (ཆུ་མཁོ་འདོན་དང་གློག་ཤུགས)...',
      micStatus: 'སྐད་སྒྲ་ཉན་བཞིན་ཡོད... བོད་སྐད་ཀྱིས་གསལ་པོར་གསུངས་རོགས།',
      sampleText: 'དགུན་ཁར་འབྲོག་ཁུལ་གྱི་ཉི་འོད་ནུས་པའི་གློག་ཁུངས་མི་འདང་བས་སྨན་ཁང་གི་སྨན་བཅོས་འཕྲུལ་ཆས་སྤྱོད་ཐུབ་ཀྱི་མི་འདུག',
      sampleLoc: 'Nagqu, Tibet',
      category: 'energy'
    },
    {
      code: 'ug',
      name: 'Uyghur',
      nativeName: 'ئۇيغۇرچە (Uyghur)',
      locale: 'ug-CN',
      flag: '🇨🇳',
      placeholder: 'ئۇل ئەسلىھە مەسىلىسىنى تەسۋىرلەڭ (سۇ بىلەن تەمىنلەش، يول، توك)...',
      micStatus: 'ئاۋازىڭىزنى ئاڭلاۋاتىدۇ... ئۇيغۇرچە ئېنىق سۆزلەڭ.',
      sampleText: 'يېزىمىزنىڭ مېۋە ساقلاش ئۈچۈن توڭلاتقۇ ئامبىرى كەمچىل بولۇپ، يېڭى ئۈزۈملەر تېزلا بۇزۇلۇپ كېتىۋاتىدۇ.',
      sampleLoc: 'Turpan, Xinjiang',
      category: 'digital'
    },
    {
      code: 'wuu',
      name: 'Shanghainese',
      nativeName: '吴语 (上海话)',
      locale: 'zh-CN',
      flag: '🇨🇳',
      placeholder: '讲讲社区里向个基础设施问题（例如老小区加装电梯、排水管网翻新）...',
      micStatus: '正在录音... 请用吴语或普通话讲述。',
      sampleText: '老旧小区积水严重，暴雨辰光底楼人家进水，希望早点改造地下雨污排水管网。',
      sampleLoc: '杨浦区老工人新村, 上海',
      category: 'water'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English (China)',
      locale: 'en-US',
      flag: '🇨🇳',
      placeholder: 'Describe municipal or logistics infrastructure demand in English...',
      micStatus: 'Listening... Speak clearly in English.',
      sampleText: 'Cross-border rail cargo terminal experiencing customs gate bottleneck, expanding automated scanning lanes needed.',
      sampleLoc: 'Khorgos Border Terminal',
      category: 'transport'
    }
  ],
  southafrica: [
    {
      code: 'zu',
      name: 'isiZulu',
      nativeName: 'isiZulu',
      locale: 'zu-ZA',
      flag: '🇿🇦',
      popular: true,
      placeholder: 'Chaza inkinga yengqalasizinda emphakathini (isib. amapayipi amanzi aphukile, ugesi ocimayo, imigwaqo engcolile)...',
      micStatus: 'Silalele izwi lakho... Khuluma ngokucacile ngesiZulu. Chofoza futhi ukuze uqedele.',
      sampleText: 'Isiteshi sikagesi saseDiepkloof siqhume izolo ebusuku. Asinawo ugesi izinsuku ezintathu, ukudla kuyonakala.',
      sampleLoc: 'Soweto, Gauteng',
      category: 'energy'
    },
    {
      code: 'xh',
      name: 'isiXhosa',
      nativeName: 'isiXhosa',
      locale: 'xh-ZA',
      flag: '🇿🇦',
      popular: true,
      placeholder: 'Chaza ingxaki yezibonelelo zoluntu (umzekelo: izibane zendlela ezingasebenziyo, amapolisa, iikliniki)...',
      micStatus: 'Simamele ilizwi lakho... Thetha ngokucacileyo ngesiXhosa. Cofa kwakhona xa ugqibile.',
      sampleText: 'Sidinga izibane ezindleleni eziya esitishini sikaloliwe ukuze sikhuseleke ebusuku eKhayelitsha.',
      sampleLoc: 'Khayelitsha, Cape Town',
      category: 'transport'
    },
    {
      code: 'af',
      name: 'Afrikaans',
      nativeName: 'Afrikaans',
      locale: 'af-ZA',
      flag: '🇿🇦',
      popular: true,
      placeholder: 'Beskryf die infrastruktuurprobleem (bv. slaggate in hoofpad, waterpype wat bars, straatligte af)...',
      micStatus: 'Luister tans... Praat asseblief duidelik in Afrikaans. Klik weer om te voltooi.',
      sampleText: 'Die hoof watertoevoerpyp het weer gebars naby die landboukoöperasie. Die hele gemeenskap sit sonder skoon water.',
      sampleLoc: 'Bloemfontein, Vrystaat',
      category: 'water'
    },
    {
      code: 'st',
      name: 'Sesotho',
      nativeName: 'Sesotho',
      locale: 'st-ZA',
      flag: '🇿🇦',
      placeholder: 'Hlalosa bothata ba litshebeletso (mohlala: metsi a sa hloekang, motlakase o khaohang, litsela tse senyehileng)...',
      micStatus: 'Re mametse lentswe la hao... Bua ka Sesotho ka ho hlaka.',
      sampleText: 'Kliniki ya rona ya motse ha e na motlakase o tsitsitseng bakeng sa meriana ya bohlokwa le mehloli ya oksijene.',
      sampleLoc: 'Phuthaditjhaba, Free State',
      category: 'health'
    },
    {
      code: 'tn',
      name: 'Setswana',
      nativeName: 'Setswana',
      locale: 'tn-ZA',
      flag: '🇿🇦',
      placeholder: 'Tlhalosa bothata jwa mafaratlhatlha (jaaka: pompo ya metsi e e robegegeng, dipone tsa mebila)...',
      micStatus: 'Re reeditse lentswe la gago... Bua ka Setswana se se tlhapileng.',
      sampleText: 'Tsela e e yang sekolong e tletse dikhuti tse dikgolo, dibese tsa baithuti ga di kgone go feta fa pula e na.',
      sampleLoc: 'Mahikeng, North West',
      category: 'roads'
    },
    {
      code: 'nso',
      name: 'Sepedi',
      nativeName: 'Sepedi (Northern Sotho)',
      locale: 'nso-ZA',
      flag: '🇿🇦',
      placeholder: 'Hlaloša bothata bja mananeokgoparara a setšhaba...',
      micStatus: 'Re theeleditse lentswe la gago... Bolela ka Sepedi.',
      sampleText: 'Mohlodi wa meetse a go nwa o kgotlelegile ka baka la go kgaoga ga phaephe ya mantle, batho ba a lwala.',
      sampleLoc: 'Polokwane, Limpopo',
      category: 'water'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English (South Africa)',
      locale: 'en-ZA',
      flag: '🇿🇦',
      placeholder: 'Describe your community infrastructure grievance in English...',
      micStatus: 'Listening to your voice... Speak clearly in South African English. Click again to finish.',
      sampleText: 'Diepkloof substation transformer blew yesterday evening, leaving whole sector without power for 3 days.',
      sampleLoc: 'Diepkloof, Soweto',
      category: 'energy'
    }
  ]
};

// Helper functions for state retrieval and data manipulation
function getCountryData(countryCode) {
  const code = (countryCode || 'india').toLowerCase();
  return BRICS_DATA[code] || BRICS_DATA.india;
}

function getCountryLanguages(countryCode) {
  const code = (countryCode || 'india').toLowerCase();
  return BRICS_LANGUAGES[code] || BRICS_LANGUAGES.india;
}

function getLanguageByCode(countryCode, langCode) {
  const langs = getCountryLanguages(countryCode);
  const found = langs.find(l => l.code === (langCode || '').toLowerCase());
  return found || langs[0];
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
    criticalGaps: c.stats.criticalGaps,
    languages: (BRICS_LANGUAGES[c.code] || []).map(l => ({
      code: l.code,
      name: l.name,
      nativeName: l.nativeName,
      locale: l.locale
    }))
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
    BRICS_LANGUAGES,
    DATA_SOURCES_REGISTRY,
    getCountryData,
    getCountryLanguages,
    getLanguageByCode,
    getAllCountries
  };
} else if (typeof window !== 'undefined') {
  window.BRICS_DATA = BRICS_DATA;
  window.BRICS_LANGUAGES = BRICS_LANGUAGES;
  window.DATA_SOURCES_REGISTRY = DATA_SOURCES_REGISTRY;
  window.getCountryData = getCountryData;
  window.getCountryLanguages = getCountryLanguages;
  window.getLanguageByCode = getLanguageByCode;
  window.getAllCountries = getAllCountries;
  window.getStoredRequests = getStoredRequests;
  window.saveStoredRequest = saveStoredRequest;
}
