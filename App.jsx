import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Calendar,
  Plus,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  Send,
  FileText,
  Trash2,
  Edit3,
  Clock,
  ExternalLink,
  BarChart3,
  Layers,
  Target,
  ShieldCheck,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Printer,
  Store,
  Receipt,
  Table2,
  RotateCcw,
  ClipboardCheck,
  BookOpen,
  Wallet,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from 'recharts';

const STORAGE_KEY = 'sm_command_center_v11';
const AUTH_SESSION_KEY = 'sm_command_center_unlocked_v1';
const ACCESS_PASSCODE = import.meta.env.VITE_APP_PASSCODE || 'SM2026';

const ANNUAL_YEARS = [2024, 2025, 2026, 2027, 2028];

const DEFAULT_WEEK_LABELS = {
  W1: '1–7 Nov',
  W2: '8–14 Nov',
  W3: '15–21 Nov',
  W4: '22–28 Nov',
  W5: '29–30 Nov'
};

const MONTHS_TEMPLATE = [
  { key: 'jan', label: 'JANUARY', days: 31 },
  { key: 'feb', label: 'FEBRUARY', days: 28 },
  { key: 'mar', label: 'MARET', days: 31 },
  { key: 'apr', label: 'APRIL', days: 30 },
  { key: 'may', label: 'MEI', days: 31 },
  { key: 'jun', label: 'JUNE', days: 30 },
  { key: 'jul', label: 'JULY', days: 31 },
  { key: 'aug', label: 'AGUSTUS', days: 31 },
  { key: 'sep', label: 'SEPTEMBER', days: 30 },
  { key: 'oct', label: 'OCTOBER', days: 31 },
  { key: 'nov', label: 'NOVEMBER', days: 30 },
  { key: 'dec', label: 'DESEMBER', days: 31 }
];

const PROGRAM_PAKET_OPTIONS = [
  'DINNER + SHOPPING',
  'LUNCH + SHOPPING',
  'SHOPPING ONLY',
  'EVENT TEATER',
  'EVENT + BELANJA',
  'BELANJA + MELUKIS GERABAH',
  'BELANJA + MEMBATIK',
  'DINNER ONLY',
  'LUNCH ONLY'
];

const INITIAL_PICS = [
  { id: 'pic-1', posisi: 'MANAGER', nama: 'CHOKI DASYAT', status: 'Active' },
  { id: 'pic-2', posisi: 'LEADER', nama: 'VACANT', status: 'Vacant' },
  { id: 'pic-3', posisi: 'GUIDE', nama: 'NADIA', status: 'Active' },
  { id: 'pic-4', posisi: 'T & T', nama: 'VACANT', status: 'Vacant' },
  { id: 'pic-5', posisi: 'DRIVER', nama: 'NADA', status: 'Active' },
  { id: 'pic-6', posisi: 'EVENT', nama: 'SELVIA', status: 'Active' },
  { id: 'pic-7', posisi: 'EVENT', nama: 'DHIMAS', status: 'Active' },
  { id: 'pic-9', posisi: 'GOVERMENT', nama: 'LINDA', status: 'Active' },
  { id: 'pic-10', posisi: 'B2B', nama: 'VACANT', status: 'Vacant' },
  { id: 'pic-11', posisi: 'CRM', nama: 'ARVA', status: 'Active' },
  { id: 'pic-12', posisi: 'MAGANG', nama: 'FAHMI', status: 'Active' },
  { id: 'pic-13', posisi: 'HELPER', nama: 'DHARMA', status: 'Active' },
  { id: 'pic-14', posisi: 'ADMIN & ASISTEN', nama: 'WINDA', status: 'Active' }
];

const INITIAL_KPI_SCORECARDS = [
  {
    id: 'sc-manager',
    picName: 'CHOKI DASYAT',
    posisi: 'MANAGER',
    periodeLabel: 'BULANAN',
    summaryLabel: 'TOTAL',
    rows: [
      { id: 'm-1', indikator: 'REVENUE', bobot: 40, target: 3628357876, actual: 654461361, isCurrency: true },
      { id: 'm-2', indikator: 'TRAFFIC', bobot: 60, target: 12433, actual: 5091, isCurrency: false }
    ]
  },
  {
    id: 'sc-guide',
    picName: 'NADIA',
    posisi: 'GUIDE',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'g-1', indikator: 'REVENUE', bobot: 50, target: 290268630, actual: 117227200, isCurrency: true },
      { id: 'g-2', indikator: 'TRAFFIC', bobot: 50, target: 995, actual: 2642, isCurrency: false }
    ]
  },
  {
    id: 'sc-event-selvia',
    picName: 'SELVIA',
    posisi: 'EVENT',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'es-1', indikator: 'REVENUE', bobot: 50, target: 290268630, actual: 189411850, isCurrency: true },
      { id: 'es-2', indikator: 'TRAFFIC', bobot: 50, target: 995, actual: 409, isCurrency: false }
    ]
  },
  {
    id: 'sc-event-dhimas',
    picName: 'DHIMAS',
    posisi: 'EVENT',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'ed-1', indikator: 'DEALING MITRA EVENT', bobot: 100, target: 20, actual: 8, isCurrency: false }
    ]
  },
  {
    id: 'sc-gov-linda',
    picName: 'LINDA',
    posisi: 'GOVERMENT',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'gl-1', indikator: 'REVENUE', bobot: 70, target: 290268630, actual: 20682000, isCurrency: true },
      { id: 'gl-2', indikator: 'TRAFFIC', bobot: 30, target: 995, actual: 51, isCurrency: false }
    ]
  },
  {
    id: 'sc-crm-arva',
    picName: 'ARVA',
    posisi: 'CRM',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'c-1', indikator: 'PENYELESAIAN CRM', bobot: 100, target: 620, actual: 176, isCurrency: false }
    ]
  },
  {
    id: 'sc-magang-fahmi',
    picName: 'FAHMI',
    posisi: 'MAGANG',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'fg-1', indikator: 'NEW DATABASE TRAVEL', bobot: 100, target: 250, actual: 126, isCurrency: false }
    ]
  },
  {
    id: 'sc-helper-dharma',
    picName: 'DHARMA',
    posisi: 'HELPER',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'd-1', indikator: 'SERVICE TRAILING', bobot: 100, target: 10, actual: 4, isCurrency: false }
    ]
  },
  {
    id: 'sc-admin-winda',
    picName: 'WINDA',
    posisi: 'ADMIN & ASISTEN',
    periodeLabel: 'BULANAN',
    summaryLabel: '',
    rows: [
      { id: 'w-1', indikator: 'KETERLAKSANAAN GOALS', bobot: 25, target: 100, actual: 30, isPercentValue: true },
      { id: 'w-2', indikator: 'KETERLAKSANAAN SO', bobot: 25, target: 100, actual: 29, isPercentValue: true },
      { id: 'w-3', indikator: 'KETERLAKSANAAN SI', bobot: 50, target: 100, actual: 14, isPercentValue: true }
    ]
  }
];

const INITIAL_STRATEGI_INISIATIF = [
  {
    id: 'si-1-1',
    no: '1.1',
    so: 'Optimasi Peningkatan Traffic Saran Dari Guide',
    bobot: 20,
    pic: 'Nadia',
    rows: [
      { id: '1-1-a', si: 'WhatsApp Personal Mitra Guide', target: 260, actual: 175 },
      { id: '1-1-b', si: 'Talk to Guide Bali', target: 26, actual: 52 },
      { id: '1-1-c', si: 'Blast Mitra Visit To Bali', target: 100, actual: 70 }
    ]
  },
  {
    id: 'si-1-2',
    no: '1.2',
    so: 'Optimasi Peningkatan Traffic Saran Dari Travel',
    bobot: 25,
    pic: 'Vacant',
    rows: [
      { id: '1-2-a', si: 'WhatsApp Personal Mitra', target: 0, actual: 0 },
      { id: '1-2-b', si: 'New Database', target: 0, actual: 0 },
      { id: '1-2-c', si: 'Meeting Mitra', target: 0, actual: 0 }
    ]
  },
  {
    id: 'si-1-3',
    no: '1.3',
    so: 'Optimasi Peningkatan Traffic Saran Dari Driver',
    bobot: 20,
    pic: 'Vacant',
    rows: [
      { id: '1-3-a', si: 'WhatsApp Personal Mitra Driver', target: 0, actual: 0 },
      { id: '1-3-b', si: 'Talk To Driver', target: 0, actual: 0 }
    ]
  },
  {
    id: 'si-1-4',
    no: '1.4',
    so: 'Optimasi Peningkatan Traffic Event',
    bobot: 20,
    pic: 'Selvia',
    rows: [
      { id: '1-4-a', si: 'Blast Database Event', target: 0, actual: 0 },
      { id: '1-4-b', si: 'Penyelenggaraan Event', target: 0, actual: 0 }
    ]
  },
  {
    id: 'si-1-5',
    no: '1.5',
    so: 'Optimasi Peningkatan Traffic Event',
    bobot: 25,
    pic: 'Dhimas',
    rows: [
      { id: '1-5-a', si: 'New Database event', target: 0, actual: 0 },
      { id: '1-5-b', si: 'Meeting EO', target: 0, actual: 0 }
    ]
  },
  {
    id: 'si-1-6',
    no: '1.6',
    so: 'Optimasi Peningkatan Traffic Saran Dari B2B',
    bobot: 25,
    pic: 'Vacant',
    rows: [
      { id: '1-6-a', si: 'WhatsApp Personal Mitra', target: 0, actual: 0 },
      { id: '1-6-b', si: 'New Database', target: 0, actual: 0 },
      { id: '1-6-c', si: 'Meeting Mitra', target: 0, actual: 0 }
    ]
  },
  {
    id: 'si-1-7',
    no: '1.7',
    so: 'Optimasi Peningkatan Traffic Saran Dari Goverment',
    bobot: 25,
    pic: 'Linda',
    rows: [
      { id: '1-7-a', si: 'WhatsApp Personal Mitra Pemerintahan', target: 0, actual: 0 },
      { id: '1-7-b', si: 'Meeting Pemerintahan', target: 0, actual: 0 }
    ]
  },
  {
    id: 'si-1-8',
    no: '1.8',
    so: 'Optimasi Peningkatan Traffic Lihat Trailing',
    bobot: 20,
    pic: 'Dharma',
    rows: [
      { id: '1-8-a', si: 'Check Trailing', target: 0, actual: 0 },
      { id: '1-8-b', si: 'Service Trailing', target: 0, actual: 0 },
      { id: '1-8-c', si: 'Foto bus rombongan', target: 0, actual: 0 }
    ]
  },
  {
    id: 'si-1-9',
    no: '1.9',
    so: 'Optimasi Peningkatan Traffic Saran Dari Travel',
    bobot: 25,
    pic: 'MAGANG',
    rows: [
      { id: '1-9-a', si: 'New Database Travel (Fahmi Magang)', target: 0, actual: 0 },
      { id: '1-9-b', si: 'Share Voucher Daybus (Fahmi Magang)', target: 0, actual: 0 }
    ]
  }
];

const createEmptyMonthMap = (defaultVal = 0) =>
  MONTHS_TEMPLATE.reduce((acc, m) => ({ ...acc, [m.key]: defaultVal }), {});

const buildYearRows = (customOverrides = {}) => [
  {
    id: 'ar-1',
    item: 'TARGET SALES STORE',
    type: 'input',
    format: 'currency',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-1'] || {}) }
  },
  {
    id: 'ar-2',
    item: 'ACTUAL SALES STORE',
    type: 'input',
    format: 'currency',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-2'] || {}) }
  },
  {
    id: 'ar-3',
    item: 'TRAFFIC PENGUNJUNG',
    type: 'input',
    format: 'number',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-3'] || {}) }
  },
  {
    id: 'ar-4',
    item: 'TRANSAKSI',
    type: 'input',
    format: 'number',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-4'] || {}) }
  },
  {
    id: 'ar-5',
    item: 'TRANSAKSI ROMBONGAN',
    type: 'input',
    format: 'number',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-5'] || {}) }
  },
  {
    id: 'ar-6',
    item: 'BASKET SIZE ALL',
    type: 'formula',
    formula: 'basket_size_all',
    format: 'currency',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-7',
    item: 'ALL BUDGET SALES',
    type: 'input',
    format: 'currency',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-7'] || {}) }
  },
  {
    id: 'ar-8',
    item: 'BUDGET IMPACT VS REVENUE',
    type: 'formula',
    formula: 'budget_impact',
    format: 'percent',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-9',
    item: 'KONTRIBUSI TRANSAKSI ROMBONGAN VS STORE',
    type: 'formula',
    formula: 'contrib_trx_rombongan',
    format: 'percent',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-10',
    item: 'REGISTRASI DRIVER',
    type: 'input',
    format: 'number',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-10'] || {}) }
  },
  {
    id: 'ar-11',
    item: 'ACTUAL SALES ROMBONGAN',
    type: 'input',
    format: 'currency',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-11'] || {}) }
  },
  {
    id: 'ar-12',
    item: 'ACTUAL KOMISI TRAVEL',
    type: 'input',
    format: 'currency',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-12'] || {}) }
  },
  {
    id: 'ar-13',
    item: 'ACTUAL % KOMISI VS TOTAL BELANJA DRIVER',
    type: 'formula',
    formula: 'komisi_vs_driver',
    format: 'percent',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-14',
    item: 'KONSTRIBUSI SALES ROMBONGAN vs SALES STORE',
    type: 'formula',
    formula: 'contrib_rombongan_vs_sales',
    format: 'percent',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-15',
    item: 'TARGET SALES OFFLINE',
    type: 'input',
    format: 'currency',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-15'] || {}) }
  },
  {
    id: 'ar-16',
    item: 'ACHIEVEMENT SALES OFFLINE',
    type: 'input',
    format: 'currency',
    values: { ...createEmptyMonthMap(0), ...(customOverrides['ar-16'] || {}) }
  },
  {
    id: 'ar-17',
    item: 'PERSENTASE ACHIEVEMENT OFFLINE',
    type: 'formula',
    formula: 'pct_offline',
    format: 'percent',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-18',
    item: 'KONSTRIBUSI SALES OFFLINE vs SALES STORE',
    type: 'formula',
    formula: 'contrib_offline_vs_store',
    format: 'percent',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-19',
    item: 'LINK ACTIVITY TEAM',
    type: 'text',
    format: 'text',
    values: { ...createEmptyMonthMap(''), ...(customOverrides['ar-19'] || {}) }
  }
];

const INITIAL_ANNUAL_BY_YEAR = {
  2024: buildYearRows(),
  2025: buildYearRows(),
  2026: buildYearRows({
    'ar-1': {
      jan: 11035508986,
      feb: 6131785266,
      mar: 12965918988,
      apr: 4923923445,
      may: 9371184304,
      jun: 10405273316,
      jul: 11253511071,
      aug: 9213309267,
      sep: 9449338312,
      oct: 9077991691
    },
    'ar-2': {
      jan: 6065185960,
      feb: 3288294648,
      mar: 5272968813,
      apr: 3903394090,
      may: 4861314523,
      jun: 4431189141,
      jul: 4372321694,
      aug: 4354220796,
      sep: 3223215545,
      oct: 3544965525
    },
    'ar-3': {
      jan: 35393,
      feb: 31646,
      mar: 21304,
      apr: 23071,
      may: 25424,
      jun: 23705,
      jul: 21510,
      aug: 21920,
      sep: 18306,
      oct: 19473
    },
    'ar-4': {
      jan: 14809,
      feb: 8697,
      mar: 10315,
      apr: 10242,
      may: 11323,
      jun: 10445,
      jul: 9357,
      aug: 10409,
      sep: 8032,
      oct: 8597
    },
    'ar-5': {
      jan: 5348,
      feb: 2841,
      mar: 1265,
      apr: 2457,
      may: 2191,
      jun: 1036,
      jul: 902,
      aug: 685,
      sep: 902,
      oct: 981
    },
    'ar-7': {
      jan: 450367000,
      feb: 433114000,
      mar: 455030000,
      apr: 480451000,
      may: 492815000,
      jun: 421598000,
      jul: 448102000,
      aug: 416992000,
      sep: 393802000,
      oct: 422255000
    },
    'ar-10': {
      jan: 1121,
      feb: 925,
      mar: 1091,
      apr: 925,
      may: 1001,
      jun: 1039,
      jul: 1087,
      aug: 1230,
      sep: 919,
      oct: 945
    },
    'ar-11': {
      jan: 146409550,
      feb: 221472600,
      mar: 34234060,
      apr: 423411910,
      may: 241965065,
      jun: 754629764,
      jul: 111769180,
      aug: 182784680,
      sep: 229540881,
      oct: 206788981
    },
    'ar-12': {
      jan: 173568522,
      feb: 120288848,
      mar: 113004602,
      apr: 118124181,
      may: 148083838,
      jun: 114415838,
      jul: 117114861,
      aug: 155105131,
      sep: 281480347,
      oct: 272328841
    },
    'ar-15': {
      jan: 2948509222,
      feb: 1532940291,
      mar: 3940828192,
      apr: 1223721117,
      may: 2494405914,
      jun: 2746277944,
      jul: 2914413707,
      aug: 2461987532,
      sep: 2526254720,
      oct: 2327273673
    },
    'ar-16': {
      jan: 1479333485,
      feb: 1090915359,
      mar: 949222612,
      apr: 1113726802,
      may: 1712738531,
      jun: 934150247,
      jul: 926823839,
      aug: 1232462729,
      sep: 808285720,
      oct: 1025251987
    }
  }),
  2027: buildYearRows(),
  2028: buildYearRows()
};

const INITIAL_ACQUISITIONS = [];

const INITIAL_WEEKLY_METRICS = [
  { minggu: 'W1', label: '1–7 Nov', revenue: 30000000, traffic: 200, transaksi: 53 },
  { minggu: 'W2', label: '8–14 Nov', revenue: 18000000, traffic: 120, transaksi: 32 },
  { minggu: 'W3', label: '15–21 Nov', revenue: 57960580, traffic: 890, transaksi: 120 },
  { minggu: 'W4', label: '22–28 Nov', revenue: 38450000, traffic: 710, transaksi: 76 },
  { minggu: 'W5', label: '29–30 Nov', revenue: 87000000, traffic: 800, transaksi: 145 }
];

const INITIAL_POS_METRICS = [
  { minggu: 'W1', label: '1–7 Nov', revenuePos: 0, trafficPos: 0, transaksiPos: 0 },
  { minggu: 'W2', label: '8–14 Nov', revenuePos: 0, trafficPos: 0, transaksiPos: 0 },
  { minggu: 'W3', label: '15–21 Nov', revenuePos: 0, trafficPos: 0, transaksiPos: 0 },
  { minggu: 'W4', label: '22–28 Nov', revenuePos: 0, trafficPos: 0, transaksiPos: 0 },
  { minggu: 'W5', label: '29–30 Nov', revenuePos: 0, trafficPos: 0, transaksiPos: 0 }
];

const INITIAL_TASKS = [
  {
    id: 'task-1',
    judul: 'Rekap capaian harian & mingguan (W3), update progres Goals, SO, dan SI',
    pic: 'WINDA',
    kanal: 'ADMIN & ASISTEN',
    tanggal: '2026-11-23',
    waktu: '09:00',
    prioritas: 'High',
    status: 'In Progress',
    progress: 40
  },
  {
    id: 'task-2',
    judul: 'Follow up teknis & venue A Celebration of Confidence & Creativity (29 Nov)',
    pic: 'DHIMAS',
    kanal: 'EVENT',
    tanggal: '2026-11-29',
    waktu: '15:00',
    prioritas: 'Critical',
    status: 'In Progress',
    progress: 70
  }
];

const INITIAL_MOMS = [
  {
    id: 'mom-1',
    tanggal: '2026-11-20',
    minggu: 'W3',
    judul: 'Evaluasi Schedule Rombongan & Strategi Inisiatif November 2026',
    peserta: 'CHOKI DASYAT, NADIA, SELVIA, DHIMAS, LINDA, ARVA, FAHMI, DHARMA, WINDA',
    poinPembahasan: 'Koordinasi jadwal rombongan, kesiapan venue Teater Saba & Belanja, serta percepatan pencapaian target KPI dan Strategi Inisiatif.',
    actionItem: 'Konfirmasi teknis event tanggal 29 November & update capaian actual mingguan',
    picAction: 'WINDA',
    deadline: '2026-11-25',
    convertedToTask: false
  }
];

const INITIAL_CHECKLISTS = [
  { id: 'chk-1', pic: 'NADIA', kategori: 'Mitra Guide', item: 'Follow up WA personal mitra guide aktif & konfirmasi bus masuk', done: true },
  { id: 'chk-2', pic: 'SELVIA', kategori: 'Event & Rombongan', item: 'Cek kesiapan paket event/rombongan & blast database event', done: true },
  { id: 'chk-3', pic: 'DHIMAS', kategori: 'EO & Dealing', item: 'Update progres dealing mitra event & jadwal meeting EO', done: false },
  { id: 'chk-4', pic: 'LINDA', kategori: 'Government', item: 'Follow up agenda instansi/pemerintahan & kunjungan rombongan', done: false },
  { id: 'chk-5', pic: 'ARVA', kategori: 'CRM', item: 'Rekap penyelesaian follow up CRM & konversi prospek', done: true },
  { id: 'chk-6', pic: 'FAHMI', kategori: 'Database & Voucher', item: 'Input new database travel & distribusi voucher daybus', done: false },
  { id: 'chk-7', pic: 'DHARMA', kategori: 'Trailing & Area', item: 'Cek trailing, dokumentasi bus rombongan & service area', done: false },
  { id: 'chk-8', pic: 'WINDA', kategori: 'Admin & Rekap', item: 'Sinkronisasi rekap harian, target MTD, dan action item MOM', done: true }
];

const INITIAL_PLAYBOOKS = [
  {
    id: 'pb-1',
    judul: 'SOP Penyambutan & Briefing Rombongan / Bus Wisata',
    kanal: 'GUIDE & HELPER',
    ringkasan: 'Pastikan konfirmasi ETA bus 1 jam sebelum tiba, sambutan di drop-off, arahan program paket (Dinner/Lunch/Shopping/Event), dan dokumentasi foto rombongan.'
  },
  {
    id: 'pb-2',
    judul: 'Panduan Follow Up Mitra Guide, Travel & EO',
    kanal: 'PARTNERSHIP & EVENT',
    ringkasan: 'Lakukan personal touch via WA sebelum jadwal kunjungan/event, siapkan skema komisi/benefit yang jelas, dan catat seluruh feedback mitra di CRM/MOM.'
  },
  {
    id: 'pb-3',
    judul: 'Alur Pengajuan Anggaran & Aktivasi Event (EAF)',
    kanal: 'ADMIN & EVENT',
    ringkasan: 'Susun rincian kebutuhan acara/promosi, estimasi pax/revenue, dan jadwal pelaksanaan sebelum diajukan agar approval berjalan tepat waktu.'
  }
];

const INITIAL_EAF_RECORDS = [
  {
    id: 'eaf-1',
    kode: 'EAF-NOV-01',
    tanggal: '2026-11-18',
    judul: 'Aktivasi Event & Pendukung Rombongan November',
    pengaju: 'SELVIA',
    kanal: 'EVENT',
    estimasiBudget: 12500000,
    estimasiRevenue: 85000000,
    status: 'Approved'
  },
  {
    id: 'eaf-2',
    kode: 'EAF-NOV-02',
    tanggal: '2026-11-22',
    judul: 'Kebutuhan Materi & Kunjungan Mitra Travel / Pemerintahan',
    pengaju: 'LINDA',
    kanal: 'GOVERMENT',
    estimasiBudget: 4500000,
    estimasiRevenue: 45000000,
    status: 'Pending'
  }
];

const formatIDR = (val) => {
  const num = Number(val || 0);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
};

const formatNum = (val) => {
  return new Intl.NumberFormat('id-ID').format(Number(val || 0));
};

const formatCompactId = (val) => {
  const num = Number(val || 0);
  if (Math.abs(num) >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2).replace('.', ',')} M`;
  if (Math.abs(num) >= 1_000_000) return `${(num / 1_000_000).toFixed(2).replace('.', ',')} jt`;
  if (Math.abs(num) >= 1_000) return `${(num / 1_000).toFixed(1).replace('.', ',')} rb`;
  return formatNum(num);
};

const formatCellVal = (val, row) => {
  const num = Number(val || 0);
  if (row?.isCurrency) return formatNum(num);
  if (row?.isPercentValue) return `${num}%`;
  return formatNum(num);
};

const formatAnnualCell = (val, fmt) => {
  if (fmt === 'text') return val || '-';
  const num = Number(val || 0);
  if (fmt === 'currency') return formatNum(num);
  if (fmt === 'percent') return `${num.toFixed(2)}%`;
  return formatNum(num);
};

const calcPctChange = (current, previous) => {
  const curr = Number(current || 0);
  const prev = Number(previous || 0);
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Number((((curr - prev) / Math.abs(prev)) * 100).toFixed(1));
};

const calcBasketSize = (revenueVal, transaksiVal) => {
  const rev = Number(revenueVal || 0);
  const trx = Number(transaksiVal || 0);
  if (trx <= 0) return 0;
  return Math.round(rev / trx);
};

const calcAutoTargetMtd = (targetVal, daysInMonth, dayNumber) => {
  const tgt = Number(targetVal || 0);
  const days = Math.max(1, Number(daysInMonth || 30));
  const day = Math.min(days, Math.max(1, Number(dayNumber || 1)));
  return Math.round((tgt / days) * day);
};

const calcStrategiPerform = (actualVal, targetVal, bobotVal) => {
  const act = Number(actualVal || 0);
  const tgt = Number(targetVal || 0);
  const bbt = Number(bobotVal || 0);

  if (tgt > 0) {
    const ratioPct = (act / tgt) * 100;
    let factor = 0;
    if (ratioPct >= 100) factor = 1;
    else if (ratioPct >= 90) factor = 0.75;
    else if (ratioPct >= 75) factor = 0.5;
    else if (act > 0) factor = 0.25;
    return Number((bbt * factor).toFixed(1));
  }

  return act > 0 ? bbt : 0;
};

const evaluateAnnualFormula = (formulaKey, getMetric) => {
  const actualStore = getMetric('ar-2');
  const trxAll = getMetric('ar-4');
  const trxRombongan = getMetric('ar-5');
  const budgetSales = getMetric('ar-7');
  const salesRombongan = getMetric('ar-11');
  const komisiTravel = getMetric('ar-12');
  const targetOffline = getMetric('ar-15');
  const achOffline = getMetric('ar-16');

  switch (formulaKey) {
    case 'basket_size_all':
      return trxAll > 0 ? Math.round(actualStore / trxAll) : 0;
    case 'budget_impact':
      return actualStore > 0 ? Number(((budgetSales / actualStore) * 100).toFixed(2)) : 0;
    case 'contrib_trx_rombongan':
      return trxAll > 0 ? Number(((trxRombongan / trxAll) * 100).toFixed(2)) : 0;
    case 'komisi_vs_driver':
      return salesRombongan > 0 ? Number(((komisiTravel / salesRombongan) * 100).toFixed(2)) : 0;
    case 'contrib_rombongan_vs_sales':
      return actualStore > 0 ? Number(((salesRombongan / actualStore) * 100).toFixed(2)) : 0;
    case 'pct_offline':
      return targetOffline > 0 ? Number(((achOffline / targetOffline) * 100).toFixed(2)) : 0;
    case 'contrib_offline_vs_store':
      return actualStore > 0 ? Number(((achOffline / actualStore) * 100).toFixed(2)) : 0;
    default:
      return 0;
  }
};

const shiftIsoDate = (isoDateStr, deltaDays) => {
  const base = new Date(`${isoDateStr || '2026-11-23'}T00:00:00`);
  if (Number.isNaN(base.getTime())) return '2026-11-22';
  base.setDate(base.getDate() + deltaDays);
  const y = base.getFullYear();
  const m = String(base.getMonth() + 1).padStart(2, '0');
  const d = String(base.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const diffDaysInclusive = (startStr, endStr) => {
  const s = new Date(`${startStr || '2026-11-01'}T00:00:00`);
  const e = new Date(`${endStr || '2026-11-23'}T00:00:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 1;
  const ms = e.getTime() - s.getTime();
  return Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)) + 1);
};

const buildGoogleCalendarUrl = (title, dateStr, timeStr, details, location = 'Teater Saba & Belanja') => {
  const cleanDate = (dateStr || '2026-11-23').replace(/-/g, '');
  const rawTime = (timeStr || '09:00').split('-')[0].trim().replace('.', ':');
  const cleanTime = (rawTime.includes(':') ? rawTime : '09:00').padStart(5, '0').replace(':', '') + '00';
  const endHourNum = (parseInt(cleanTime.slice(0, 2), 10) + 1) % 24;
  const endHour = String(endHourNum).padStart(2, '0');
  const endMin = cleanTime.slice(2, 4);
  const startDT = `${cleanDate}T${cleanTime}`;
  const endDT = `${cleanDate}T${endHour}${endMin}00`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDT}/${endDT}`,
    details: details || '',
    location
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [passInput, setPassInput] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [workspaceSubTab, setWorkspaceSubTab] = useState('checklist');
  const [selectedPicWorkspace, setSelectedPicWorkspace] = useState('ALL');
  const [periodMode, setPeriodMode] = useState('mingguan');
  const [selectedWeek, setSelectedWeek] = useState('ALL');
  const [customStart, setCustomStart] = useState('2026-11-01');
  const [customEnd, setCustomEnd] = useState('2026-11-23');
  const [selectedKanalFilter, setSelectedKanalFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [mtdDaysInMonth, setMtdDaysInMonth] = useState(30);
  const [mtdCurrentDay, setMtdCurrentDay] = useState(23);

  const [selectedAnnualYear, setSelectedAnnualYear] = useState(2026);
  const [selectedAnnualChartRowId, setSelectedAnnualChartRowId] = useState('ar-2');
  const [selectedAnnualCompareRowId, setSelectedAnnualCompareRowId] = useState('ar-1');

  const [pics, setPics] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.pics || INITIAL_PICS;
    } catch {
      return INITIAL_PICS;
    }
  });

  const [scorecards, setScorecards] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.scorecards || INITIAL_KPI_SCORECARDS;
    } catch {
      return INITIAL_KPI_SCORECARDS;
    }
  });

  const [strategiInisiatif, setStrategiInisiatif] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.strategiInisiatif || INITIAL_STRATEGI_INISIATIF;
    } catch {
      return INITIAL_STRATEGI_INISIATIF;
    }
  });

  const [annualByYear, setAnnualByYear] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved?.annualByYear) return saved.annualByYear;
      return INITIAL_ANNUAL_BY_YEAR;
    } catch {
      return INITIAL_ANNUAL_BY_YEAR;
    }
  });

  const [acquisitions, setAcquisitions] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.acquisitions || INITIAL_ACQUISITIONS;
    } catch {
      return INITIAL_ACQUISITIONS;
    }
  });

  const [weeklyMetrics, setWeeklyMetrics] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.weeklyMetrics || INITIAL_WEEKLY_METRICS;
    } catch {
      return INITIAL_WEEKLY_METRICS;
    }
  });

  const [posMetrics, setPosMetrics] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.posMetrics || INITIAL_POS_METRICS;
    } catch {
      return INITIAL_POS_METRICS;
    }
  });

  const [posManualForm, setPosManualForm] = useState({
    minggu: 'W4',
    revenuePos: 0,
    trafficPos: 0,
    transaksiPos: 0
  });

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.tasks || INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [moms, setMoms] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.moms || INITIAL_MOMS;
    } catch {
      return INITIAL_MOMS;
    }
  });

  const [checklists, setChecklists] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.checklists || INITIAL_CHECKLISTS;
    } catch {
      return INITIAL_CHECKLISTS;
    }
  });

  const [playbooks, setPlaybooks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.playbooks || INITIAL_PLAYBOOKS;
    } catch {
      return INITIAL_PLAYBOOKS;
    }
  });

  const [eafRecords, setEafRecords] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.eafRecords || INITIAL_EAF_RECORDS;
    } catch {
      return INITIAL_EAF_RECORDS;
    }
  });

  const [newChecklist, setNewChecklist] = useState({
    pic: 'NADIA',
    kategori: 'Follow Up Mitra',
    item: ''
  });

  const [newPlaybook, setNewPlaybook] = useState({
    judul: '',
    kanal: 'GUIDE',
    ringkasan: ''
  });

  const [newEaf, setNewEaf] = useState({
    kode: '',
    tanggal: '2026-11-24',
    judul: '',
    pengaju: 'SELVIA',
    kanal: 'EVENT',
    estimasiBudget: 0,
    estimasiRevenue: 0,
    status: 'Pending'
  });

  const [lastSavedAt, setLastSavedAt] = useState(() => new Date().toLocaleTimeString('id-ID'));

  const [formAcq, setFormAcq] = useState({
    tanggal: '2026-11-23',
    minggu: 'W4',
    waktu: '14:00',
    kanal: 'GUIDE',
    pic: 'NADIA',
    instansi: '',
    program: 'DINNER + SHOPPING',
    venue: 'THE KERANJANG BALI',
    partner: '',
    transport: 'BUS',
    pax: 0,
    revenue: 0,
    transaksi: 0,
    noHp: ''
  });

  const [newPicPos, setNewPicPos] = useState('');
  const [newPicName, setNewPicName] = useState('');
  const [editingPicId, setEditingPicId] = useState(null);
  const [editingPicName, setEditingPicName] = useState('');

  const [newTask, setNewTask] = useState({
    judul: '',
    pic: 'NADIA',
    kanal: 'GUIDE',
    tanggal: '2026-11-24',
    waktu: '10:00',
    prioritas: 'High',
    status: 'In Progress',
    progress: 25
  });

  const [newMom, setNewMom] = useState({
    tanggal: '2026-11-23',
    minggu: 'W4',
    judul: '',
    peserta: 'CHOKI DASYAT, WINDA',
    poinPembahasan: '',
    actionItem: '',
    picAction: 'WINDA',
    deadline: '2026-11-25'
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: 'Halo! AI Strategist aktif & siap dipakai. Tanya saya soal perbandingan W1–W5, annual report THE KERANJANG BALI (2024–2028), funnel konversi sales, kesimpulan bulanan, EAF, checklist SPV/PIC, skor KPI, Strategi Inisiatif (SI), posisi VACANT, atau rencana aksi 7 hari.'
    }
  ]);

  useEffect(() => {
    try {
      const payload = {
        pics,
        scorecards,
        strategiInisiatif,
        annualByYear,
        acquisitions,
        weeklyMetrics,
        posMetrics,
        tasks,
        moms,
        checklists,
        playbooks,
        eafRecords
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedAt(new Date().toLocaleTimeString('id-ID'));
    } catch (e) {
      console.error('Gagal menyimpan data lokal:', e);
    }
  }, [
    pics,
    scorecards,
    strategiInisiatif,
    annualByYear,
    acquisitions,
    weeklyMetrics,
    posMetrics,
    tasks,
    moms,
    checklists,
    playbooks,
    eafRecords
  ]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passInput.trim() === ACCESS_PASSCODE) {
      setIsUnlocked(true);
      setAuthError('');
      setPassInput('');
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch {
        // ignore
      }
    } else {
      setAuthError('Kata sandi salah. Silakan periksa kembali kode akses tim Anda.');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch {
      // ignore
    }
  };

  const handleUpdateWeekLabel = (mingguKey, newLabel) => {
    setWeeklyMetrics((prev) =>
      prev.map((w) => (w.minggu === mingguKey ? { ...w, label: newLabel } : w))
    );
    setPosMetrics((prev) =>
      prev.map((w) => (w.minggu === mingguKey ? { ...w, label: newLabel } : w))
    );
  };

  const handleResetWeekLabels = () => {
    setWeeklyMetrics((prev) =>
      prev.map((w) => ({ ...w, label: DEFAULT_WEEK_LABELS[w.minggu] || w.label }))
    );
    setPosMetrics((prev) =>
      prev.map((w) => ({ ...w, label: DEFAULT_WEEK_LABELS[w.minggu] || w.label }))
    );
  };

  const handleResetDashboardMetrics = () => {
    setWeeklyMetrics(INITIAL_WEEKLY_METRICS);
    setPosMetrics(INITIAL_POS_METRICS);
    setAcquisitions(INITIAL_ACQUISITIONS);
    setSelectedWeek('ALL');
  };

  const currentYearMonths = useMemo(() => {
    const isLeap =
      (selectedAnnualYear % 4 === 0 && selectedAnnualYear % 100 !== 0) ||
      selectedAnnualYear % 400 === 0;
    return MONTHS_TEMPLATE.map((m) =>
      m.key === 'feb' ? { ...m, days: isLeap ? 29 : 28 } : m
    );
  }, [selectedAnnualYear]);

  const activeAnnualRows = useMemo(() => {
    const baseYearRows = annualByYear[selectedAnnualYear] || buildYearRows();
    const hasLinkRow = baseYearRows.some((r) => r.id === 'ar-19');
    if (hasLinkRow) {
      return baseYearRows.map((r) =>
        r.id === 'ar-14'
          ? { ...r, item: 'KONSTRIBUSI SALES ROMBONGAN vs SALES STORE' }
          : r.id === 'ar-17'
          ? { ...r, item: 'PERSENTASE ACHIEVEMENT OFFLINE' }
          : r.id === 'ar-18'
          ? { ...r, item: 'KONSTRIBUSI SALES OFFLINE vs SALES STORE' }
          : r
      );
    }
    return [...baseYearRows, buildYearRows().find((r) => r.id === 'ar-19')];
  }, [annualByYear, selectedAnnualYear]);

  const handleUpdateAnnualCell = (rowId, monthKey, val) => {
    setAnnualByYear((prev) => {
      const yearRows = prev[selectedAnnualYear] || buildYearRows();
      const updatedRows = yearRows.map((r) =>
        r.id === rowId
          ? {
              ...r,
              values: {
                ...r.values,
                [monthKey]: r.type === 'text' ? String(val ?? '') : Number(val || 0)
              }
            }
          : r
      );
      return {
        ...prev,
        [selectedAnnualYear]: updatedRows
      };
    });
  };

  const handleResetActiveYear = () => {
    setAnnualByYear((prev) => ({
      ...prev,
      [selectedAnnualYear]: INITIAL_ANNUAL_BY_YEAR[selectedAnnualYear] || buildYearRows()
    }));
  };

  const computedAnnualReport = useMemo(() => {
    const getMonthVal = (id, mKey) => {
      const found = activeAnnualRows.find((r) => r.id === id);
      return Number(found?.values?.[mKey] || 0);
    };

    const annualInputTotals = {};
    activeAnnualRows.forEach((r) => {
      if (r.type === 'input') {
        annualInputTotals[r.id] = currentYearMonths.reduce(
          (sum, m) => sum + Number(r.values?.[m.key] || 0),
          0
        );
      }
    });

    const getAnnualSum = (id) => Number(annualInputTotals[id] || 0);

    return activeAnnualRows.map((row) => {
      const monthComputed = {};
      currentYearMonths.forEach((m) => {
        const mk = m.key;
        if (row.type === 'text') {
          monthComputed[mk] = String(row.values?.[mk] || '');
        } else if (row.type === 'input') {
          monthComputed[mk] = Number(row.values?.[mk] || 0);
        } else {
          monthComputed[mk] = evaluateAnnualFormula(row.formula, (id) => getMonthVal(id, mk));
        }
      });

      let totalColValue = 0;
      if (row.type === 'text') {
        const filledCount = currentYearMonths.filter(
          (m) => String(row.values?.[m.key] || '').trim().length > 0
        ).length;
        totalColValue = `${filledCount}/12 Bulan`;
      } else if (row.type === 'input') {
        totalColValue = getAnnualSum(row.id);
      } else {
        totalColValue = evaluateAnnualFormula(row.formula, getAnnualSum);
      }

      return {
        ...row,
        computedValues: monthComputed,
        totalValue: totalColValue
      };
    });
  }, [activeAnnualRows, currentYearMonths]);

  const numericAnnualRows = useMemo(
    () => computedAnnualReport.filter((r) => r.type !== 'text'),
    [computedAnnualReport]
  );

  const annualTotalsMap = useMemo(() => {
    return numericAnnualRows.reduce((acc, r) => {
      acc[r.id] = Number(r.totalValue || 0);
      return acc;
    }, {});
  }, [numericAnnualRows]);

  const annualChartData = useMemo(() => {
    const primaryRow =
      numericAnnualRows.find((r) => r.id === selectedAnnualChartRowId) || numericAnnualRows[1];
    const secondaryRow =
      selectedAnnualCompareRowId === 'NONE'
        ? null
        : numericAnnualRows.find((r) => r.id === selectedAnnualCompareRowId) || null;

    return {
      primaryRow,
      secondaryRow,
      series: currentYearMonths.map((m) => ({
        bulan: m.label.slice(0, 3),
        bulanPenuh: m.label,
        primaryVal: Number(primaryRow?.computedValues?.[m.key] || 0),
        secondaryVal: secondaryRow ? Number(secondaryRow?.computedValues?.[m.key] || 0) : 0
      }))
    };
  }, [numericAnnualRows, selectedAnnualChartRowId, selectedAnnualCompareRowId, currentYearMonths]);

  const handleUpdatePosRow = (mingguKey, field, val) => {
    setPosMetrics((prev) =>
      prev.map((w) => (w.minggu === mingguKey ? { ...w, [field]: Number(val || 0) } : w))
    );
  };

  const handleApplyPosManualInput = (e) => {
    e.preventDefault();
    const addRev = Number(posManualForm.revenuePos || 0);
    const addTraf = Number(posManualForm.trafficPos || 0);
    const addTrx = Number(posManualForm.transaksiPos || 0);

    setPosMetrics((prev) =>
      prev.map((w) =>
        w.minggu === posManualForm.minggu
          ? {
              ...w,
              revenuePos: Number(w.revenuePos || 0) + addRev,
              trafficPos: Number(w.trafficPos || 0) + addTraf,
              transaksiPos: Number(w.transaksiPos || 0) + addTrx
            }
          : w
      )
    );

    setPosManualForm((prev) => ({
      ...prev,
      revenuePos: 0,
      trafficPos: 0,
      transaksiPos: 0
    }));
  };

  const posSummary = useMemo(() => {
    if (periodMode === 'tahunan') {
      const revAnnual = Number(annualTotalsMap['ar-2'] || 0);
      const trafAnnual = Number(annualTotalsMap['ar-3'] || 0);
      const trxAnnual = Number(annualTotalsMap['ar-4'] || 0);
      return {
        revenuePos: revAnnual,
        trafficPos: trafAnnual,
        transaksiPos: trxAnnual,
        basketSize: calcBasketSize(revAnnual, trxAnnual),
        labelBand: `Annual Store ${selectedAnnualYear}`
      };
    }

    if (selectedWeek !== 'ALL') {
      const curr = posMetrics.find((w) => w.minggu === selectedWeek) || {
        minggu: selectedWeek,
        label: '',
        revenuePos: 0,
        trafficPos: 0,
        transaksiPos: 0
      };
      const rev = Number(curr.revenuePos || 0);
      const traf = Number(curr.trafficPos || 0);
      const trx = Number(curr.transaksiPos || 0);
      return {
        revenuePos: rev,
        trafficPos: traf,
        transaksiPos: trx,
        basketSize: calcBasketSize(rev, trx),
        labelBand: curr.label ? `${curr.minggu} • ${curr.label}` : curr.minggu
      };
    }

    const totalRev = posMetrics.reduce((s, w) => s + Number(w.revenuePos || 0), 0);
    const totalTraf = posMetrics.reduce((s, w) => s + Number(w.trafficPos || 0), 0);
    const totalTrx = posMetrics.reduce((s, w) => s + Number(w.transaksiPos || 0), 0);

    return {
      revenuePos: totalRev,
      trafficPos: totalTraf,
      transaksiPos: totalTrx,
      basketSize: calcBasketSize(totalRev, totalTrx),
      labelBand:
        periodMode === 'bulanan'
          ? 'Bulanan POS (W1–W5)'
          : periodMode === 'mingguan'
          ? 'Total POS W1–W5'
          : 'POS Periode Aktif'
    };
  }, [posMetrics, selectedWeek, periodMode, annualTotalsMap, selectedAnnualYear]);

  const handleSelectKanal = (kanalVal) => {
    const matchedPic = pics.find((p) => p.posisi.toUpperCase() === kanalVal.toUpperCase());
    setFormAcq((prev) => ({
      ...prev,
      kanal: kanalVal,
      pic: matchedPic ? matchedPic.nama : prev.pic
    }));
  };

  const handleAddAcquisition = (e) => {
    e.preventDefault();
    if (!formAcq.instansi.trim()) return;
    const revNum = Number(formAcq.revenue || 0);
    const trxNum = Number(formAcq.transaksi || 0);
    const paxNum = Number(formAcq.pax || 0);
    const cleanProgram = formAcq.program.trim() ? formAcq.program.trim().toUpperCase() : '-';

    const newItem = {
      id: `acq-${Date.now()}`,
      ...formAcq,
      program: cleanProgram,
      pax: paxNum,
      revenue: revNum,
      transaksi: trxNum
    };

    setAcquisitions((prev) => [newItem, ...prev]);
    setWeeklyMetrics((prev) =>
      prev.map((w) =>
        w.minggu === formAcq.minggu
          ? {
              ...w,
              revenue: Number(w.revenue || 0) + revNum,
              traffic: Number(w.traffic || 0) + paxNum,
              transaksi: Number(w.transaksi || 0) + trxNum
            }
          : w
      )
    );

    setFormAcq((prev) => ({
      ...prev,
      instansi: '',
      partner: '',
      pax: 0,
      revenue: 0,
      transaksi: 0,
      noHp: ''
    }));
  };

  const handleDeleteAcquisition = (id) => {
    const targetItem = acquisitions.find((item) => item.id === id);
    setAcquisitions((prev) => prev.filter((item) => item.id !== id));
    if (targetItem) {
      setWeeklyMetrics((prev) =>
        prev.map((w) =>
          w.minggu === targetItem.minggu
            ? {
                ...w,
                revenue: Math.max(0, Number(w.revenue || 0) - Number(targetItem.revenue || 0)),
                traffic: Math.max(0, Number(w.traffic || 0) - Number(targetItem.pax || 0)),
                transaksi: Math.max(0, Number(w.transaksi || 0) - Number(targetItem.transaksi || 0))
              }
            : w
        )
      );
    }
  };

  const filteredAcquisitions = useMemo(() => {
    return acquisitions.filter((row) => {
      const matchKanal =
        selectedKanalFilter === 'ALL' ||
        row.kanal.toUpperCase() === selectedKanalFilter.toUpperCase();
      const matchWeek =
        selectedWeek === 'ALL' || row.minggu.toUpperCase() === selectedWeek.toUpperCase();
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        row.instansi.toLowerCase().includes(q) ||
        row.pic.toLowerCase().includes(q) ||
        row.kanal.toLowerCase().includes(q) ||
        row.program.toLowerCase().includes(q) ||
        (row.partner || '').toLowerCase().includes(q);

      const activeMonthPrefix = (customEnd || '2026-11-23').slice(0, 7);
      let matchDate = true;
      if (periodMode === 'harian') {
        matchDate = row.tanggal === customEnd;
      } else if (periodMode === 'custom') {
        matchDate = row.tanggal >= customStart && row.tanggal <= customEnd;
      } else if (periodMode === 'bulanan') {
        matchDate = row.tanggal.startsWith(activeMonthPrefix);
      } else if (periodMode === 'tahunan') {
        matchDate = row.tanggal.startsWith(String(selectedAnnualYear));
      }
      return matchKanal && matchWeek && matchSearch && matchDate;
    });
  }, [acquisitions, selectedKanalFilter, selectedWeek, searchQuery, periodMode, customStart, customEnd, selectedAnnualYear]);

  const comparisonRows = useMemo(() => {
    return weeklyMetrics.map((item, idx) => {
      const prev = idx > 0 ? weeklyMetrics[idx - 1] : null;
      return {
        ...item,
        revGrowth: prev ? calcPctChange(item.revenue, prev.revenue) : 0,
        trafGrowth: prev ? calcPctChange(item.traffic, prev.traffic) : 0,
        trxGrowth: prev ? calcPctChange(item.transaksi, prev.transaksi) : 0
      };
    });
  }, [weeklyMetrics]);

  const mainSummary = useMemo(() => {
    if (periodMode === 'harian') {
      const targetDate = customEnd || '2026-11-23';
      const prevDateStr = shiftIsoDate(targetDate, -1);
      const dayItems = acquisitions.filter((a) => a.tanggal === targetDate);
      const prevItems = acquisitions.filter((a) => a.tanggal === prevDateStr);

      const rev = dayItems.reduce((s, x) => s + Number(x.revenue || 0), 0);
      const traf = dayItems.reduce((s, x) => s + Number(x.pax || 0), 0);
      const trx = dayItems.reduce((s, x) => s + Number(x.transaksi || 0), 0);

      const prevRev = prevItems.reduce((s, x) => s + Number(x.revenue || 0), 0);
      const prevTraf = prevItems.reduce((s, x) => s + Number(x.pax || 0), 0);
      const prevTrx = prevItems.reduce((s, x) => s + Number(x.transaksi || 0), 0);

      return {
        revenue: rev,
        traffic: traf,
        transaksi: trx,
        revPct: calcPctChange(rev, prevRev),
        trafPct: calcPctChange(traf, prevTraf),
        trxPct: calcPctChange(trx, prevTrx),
        labelBand: `Harian (${targetDate})`,
        compareNote: `vs ${prevDateStr}`
      };
    }

    if (periodMode === 'custom') {
      const rangeDays = diffDaysInclusive(customStart, customEnd);
      const prevEnd = shiftIsoDate(customStart, -1);
      const prevStart = shiftIsoDate(prevEnd, -(rangeDays - 1));

      const rangeItems = acquisitions.filter(
        (a) => a.tanggal >= customStart && a.tanggal <= customEnd
      );
      const prevRangeItems = acquisitions.filter(
        (a) => a.tanggal >= prevStart && a.tanggal <= prevEnd
      );

      const rev = rangeItems.reduce((s, x) => s + Number(x.revenue || 0), 0);
      const traf = rangeItems.reduce((s, x) => s + Number(x.pax || 0), 0);
      const trx = rangeItems.reduce((s, x) => s + Number(x.transaksi || 0), 0);

      const prevRev = prevRangeItems.reduce((s, x) => s + Number(x.revenue || 0), 0);
      const prevTraf = prevRangeItems.reduce((s, x) => s + Number(x.pax || 0), 0);
      const prevTrx = prevRangeItems.reduce((s, x) => s + Number(x.transaksi || 0), 0);

      return {
        revenue: rev,
        traffic: traf,
        transaksi: trx,
        revPct: calcPctChange(rev, prevRev),
        trafPct: calcPctChange(traf, prevTraf),
        trxPct: calcPctChange(trx, prevTrx),
        labelBand: `Custom (${customStart} s/d ${customEnd})`,
        compareNote: `vs ${prevStart} s/d ${prevEnd}`
      };
    }

    if (periodMode === 'tahunan') {
      const revYear = Number(annualTotalsMap['ar-2'] || 0);
      const trafYear = Number(annualTotalsMap['ar-3'] || 0);
      const trxYear = Number(annualTotalsMap['ar-4'] || 0);

      const prevYearRows = annualByYear[selectedAnnualYear - 1] || [];
      const sumPrev = (id) => {
        const row = prevYearRows.find((r) => r.id === id);
        if (!row) return 0;
        return MONTHS_TEMPLATE.reduce((s, m) => s + Number(row.values?.[m.key] || 0), 0);
      };
      const prevRevYear = sumPrev('ar-2');
      const prevTrafYear = sumPrev('ar-3');
      const prevTrxYear = sumPrev('ar-4');

      return {
        revenue: revYear,
        traffic: trafYear,
        transaksi: trxYear,
        revPct: calcPctChange(revYear, prevRevYear),
        trafPct: calcPctChange(trafYear, prevTrafYear),
        trxPct: calcPctChange(trxYear, prevTrxYear),
        labelBand: `Annual ${selectedAnnualYear}`,
        compareNote:
          prevRevYear > 0 || prevTrafYear > 0
            ? `vs Annual ${selectedAnnualYear - 1}`
            : `Data Annual ${selectedAnnualYear}`
      };
    }

    if (selectedWeek !== 'ALL') {
      const idx = weeklyMetrics.findIndex((w) => w.minggu === selectedWeek);
      const curr = weeklyMetrics[idx] || { minggu: selectedWeek, revenue: 0, traffic: 0, transaksi: 0 };
      const prev = idx > 0 ? weeklyMetrics[idx - 1] : null;

      return {
        revenue: Number(curr.revenue || 0),
        traffic: Number(curr.traffic || 0),
        transaksi: Number(curr.transaksi || 0),
        revPct: prev ? calcPctChange(curr.revenue, prev.revenue) : 0,
        trafPct: prev ? calcPctChange(curr.traffic, prev.traffic) : 0,
        trxPct: prev ? calcPctChange(curr.transaksi, prev.transaksi) : 0,
        labelBand: curr.label ? `${curr.minggu} • ${curr.label}` : curr.minggu,
        compareNote: prev ? `vs ${prev.minggu}` : 'Minggu awal (baseline)'
      };
    }

    const totalRev = weeklyMetrics.reduce((s, w) => s + Number(w.revenue || 0), 0);
    const totalTraf = weeklyMetrics.reduce((s, w) => s + Number(w.traffic || 0), 0);
    const totalTrx = weeklyMetrics.reduce((s, w) => s + Number(w.transaksi || 0), 0);

    let lastActiveIdx = weeklyMetrics.length - 1;
    while (
      lastActiveIdx > 0 &&
      Number(weeklyMetrics[lastActiveIdx]?.revenue || 0) === 0 &&
      Number(weeklyMetrics[lastActiveIdx]?.traffic || 0) === 0
    ) {
      lastActiveIdx -= 1;
    }
    const currWk = weeklyMetrics[lastActiveIdx] || { minggu: 'W1', revenue: 0, traffic: 0, transaksi: 0 };
    const prevWk = lastActiveIdx > 0 ? weeklyMetrics[lastActiveIdx - 1] : null;

    return {
      revenue: totalRev,
      traffic: totalTraf,
      transaksi: totalTrx,
      revPct: prevWk ? calcPctChange(currWk.revenue, prevWk.revenue) : 0,
      trafPct: prevWk ? calcPctChange(currWk.traffic, prevWk.traffic) : 0,
      trxPct: prevWk ? calcPctChange(currWk.transaksi, prevWk.transaksi) : 0,
      labelBand: periodMode === 'bulanan' ? 'Bulanan (W1–W5)' : 'Total W1–W5',
      compareNote: prevWk ? `tren ${currWk.minggu} vs ${prevWk.minggu}` : 'Minggu awal'
    };
  }, [
    periodMode,
    selectedWeek,
    weeklyMetrics,
    acquisitions,
    customStart,
    customEnd,
    annualTotalsMap,
    annualByYear,
    selectedAnnualYear
  ]);

  const handleUpdateWeeklyField = (mingguKey, field, val) => {
    setWeeklyMetrics((prev) =>
      prev.map((w) => (w.minggu === mingguKey ? { ...w, [field]: Number(val || 0) } : w))
    );
  };

  const handleUpdateScorecardField = (cardId, rowId, field, newVal) => {
    setScorecards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;
        return {
          ...card,
          rows: card.rows.map((r) =>
            r.id === rowId ? { ...r, [field]: Number(newVal || 0) } : r
          )
        };
      })
    );
  };

  const handleUpdateStrategiField = (groupId, rowId, field, newValue) => {
    setStrategiInisiatif((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          rows: group.rows.map((r) =>
            r.id === rowId ? { ...r, [field]: Number(newValue || 0) } : r
          )
        };
      })
    );
  };

  const computedScorecards = useMemo(() => {
    return scorecards.map((card) => {
      const rowsCalc = card.rows.map((r) => {
        const targetVal = Number(r.target || 0);
        const targetMtdAuto = calcAutoTargetMtd(targetVal, mtdDaysInMonth, mtdCurrentDay);
        const actualVal = Number(r.actual || 0);
        const acvPct = targetVal > 0 ? Number(((actualVal / targetVal) * 100).toFixed(1)) : 0;
        const realisasiPct = acvPct;
        const skorPct = Number(((realisasiPct * Number(r.bobot || 0)) / 100).toFixed(1));
        return {
          ...r,
          targetMtd: targetMtdAuto,
          acvPct,
          realisasiPct,
          skorPct
        };
      });

      const totalSkorPct = Number(
        rowsCalc.reduce((sum, item) => sum + item.skorPct, 0).toFixed(1)
      );
      return {
        ...card,
        rows: rowsCalc,
        totalSkorPct
      };
    });
  }, [scorecards, mtdDaysInMonth, mtdCurrentDay]);

  const computedStrategi = useMemo(() => {
    return strategiInisiatif.map((group) => {
      const rowsCalc = group.rows.map((row) => {
        const targetNum = Number(row.target || 0);
        const targetMtdNum = calcAutoTargetMtd(targetNum, mtdDaysInMonth, mtdCurrentDay);
        const actualNum = Number(row.actual || 0);
        const pct = targetNum > 0 ? Number(((actualNum / targetNum) * 100).toFixed(1)) : 0;
        const nilaiPerform = calcStrategiPerform(actualNum, targetNum, group.bobot);
        const gapSo = actualNum - targetNum;
        return {
          ...row,
          target: targetNum,
          targetMtd: targetMtdNum,
          actual: actualNum,
          pct,
          nilaiPerform,
          gapSo
        };
      });

      const avgPerform =
        rowsCalc.length > 0
          ? Number(
              (
                rowsCalc.reduce((acc, item) => acc + item.nilaiPerform, 0) / rowsCalc.length
              ).toFixed(1)
            )
          : 0;

      return {
        ...group,
        rows: rowsCalc,
        avgPerform
      };
    });
  }, [strategiInisiatif, mtdDaysInMonth, mtdCurrentDay]);

  const funnelSummary = useMemo(() => {
    const stage1Traffic = Math.max(0, Number(mainSummary.traffic || 0));
    const stage2Transaksi = Math.max(0, Number(mainSummary.transaksi || 0));
    const stage3Revenue = Math.max(0, Number(mainSummary.revenue || 0));

    const pctTrafficToTrx =
      stage1Traffic > 0 ? Number(((stage2Transaksi / stage1Traffic) * 100).toFixed(2)) : 0;
    const pctOverallFrom100 =
      stage1Traffic > 0 ? Number(((stage2Transaksi / stage1Traffic) * 100).toFixed(2)) : 0;
    const trxPer1000Pax =
      stage1Traffic > 0 ? Math.round((stage2Transaksi / stage1Traffic) * 1000) : 0;
    const avgOrderValue = stage2Transaksi > 0 ? Math.round(stage3Revenue / stage2Transaksi) : 0;

    return {
      stage1Traffic,
      stage2Transaksi,
      stage3Revenue,
      pctTrafficToTrx,
      pctOverallFrom100,
      trxPer1000Pax,
      avgOrderValue
    };
  }, [mainSummary]);

  const executiveConclusions = useMemo(() => {
    const revTarget = Number(annualTotalsMap['ar-1'] || 0);
    const revActual = Number(annualTotalsMap['ar-2'] || 0);
    const revGap = Math.max(0, revTarget - revActual);
    const revPct = revTarget > 0 ? ((revActual / revTarget) * 100).toFixed(1) : '0.0';

    const trafTarget = Number(annualTotalsMap['ar-3'] || 0);
    const trafActual = Number(mainSummary.traffic || 0);
    const trafPct = trafTarget > 0 ? ((trafActual / trafTarget) * 100).toFixed(1) : '0.0';

    const doneChk = checklists.filter((c) => c.done).length;
    const totalChk = checklists.length || 1;
    const chkPct = Math.round((doneChk / totalChk) * 100);

    return [
      {
        num: 1,
        text:
          revTarget > 0
            ? `Akumulasi Sales Store ${selectedAnnualYear}: ${formatCompactId(revActual)} (${revPct}% dari target ${formatCompactId(revTarget)}) — selisih ${formatCompactId(revGap)}.`
            : `Periode aktif (${mainSummary.labelBand}): Revenue ${formatIDR(mainSummary.revenue)}, Traffic ${formatNum(mainSummary.traffic)} Pax, dan Transaksi ${formatNum(mainSummary.transaksi)} Trx.`
      },
      {
        num: 2,
        text: `Funnel konversi aktif: ${funnelSummary.pctTrafficToTrx}% traffic berkonversi menjadi transaksi (${funnelSummary.trxPer1000Pax} transaksi per 1.000 pax, rata-rata nilai transaksi ${formatIDR(funnelSummary.avgOrderValue)}).`
      },
      {
        num: 3,
        text:
          trafTarget > 0
            ? `Pencapaian traffic periode aktif: ${formatNum(trafActual)} pax (${trafPct}% dari akumulasi traffic tahunan ${formatNum(trafTarget)} pax).`
            : `Progres Checklist SPV & PIC saat ini ${doneChk}/${totalChk} item selesai (${chkPct}%).`
      },
      {
        num: 4,
        text: `Terdapat ${eafRecords.filter((e) => e.status === 'Pending').length} pengajuan EAF berstatus Pending dan ${pics.filter((p) => p.nama === 'VACANT').length} posisi VACANT yang perlu dipantau.`
      }
    ];
  }, [annualTotalsMap, selectedAnnualYear, mainSummary, funnelSummary, checklists, eafRecords, pics]);

  const filteredChecklists = useMemo(() => {
    if (selectedPicWorkspace === 'ALL') return checklists;
    return checklists.filter((c) => c.pic.toUpperCase() === selectedPicWorkspace.toUpperCase());
  }, [checklists, selectedPicWorkspace]);

  const filteredTasksWorkspace = useMemo(() => {
    if (selectedPicWorkspace === 'ALL') return tasks;
    return tasks.filter((t) => t.pic.toUpperCase() === selectedPicWorkspace.toUpperCase());
  }, [tasks, selectedPicWorkspace]);

  const handleToggleChecklist = (id) => {
    setChecklists((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    );
  };

  const handleAddChecklist = (e) => {
    e.preventDefault();
    if (!newChecklist.item.trim()) return;
    setChecklists((prev) => [
      {
        id: `chk-${Date.now()}`,
        pic: newChecklist.pic,
        kategori: newChecklist.kategori || 'Operasional',
        item: newChecklist.item.trim(),
        done: false
      },
      ...prev
    ]);
    setNewChecklist((prev) => ({ ...prev, item: '' }));
  };

  const handleAddPlaybook = (e) => {
    e.preventDefault();
    if (!newPlaybook.judul.trim() || !newPlaybook.ringkasan.trim()) return;
    setPlaybooks((prev) => [
      {
        id: `pb-${Date.now()}`,
        judul: newPlaybook.judul.trim(),
        kanal: newPlaybook.kanal,
        ringkasan: newPlaybook.ringkasan.trim()
      },
      ...prev
    ]);
    setNewPlaybook({ judul: '', kanal: 'GUIDE', ringkasan: '' });
  };

  const handleAddEaf = (e) => {
    e.preventDefault();
    if (!newEaf.judul.trim()) return;
    const autoCode =
      newEaf.kode.trim() || `EAF-${String(eafRecords.length + 1).padStart(2, '0')}`;
    setEafRecords((prev) => [
      {
        id: `eaf-${Date.now()}`,
        kode: autoCode.toUpperCase(),
        tanggal: newEaf.tanggal,
        judul: newEaf.judul.trim(),
        pengaju: newEaf.pengaju,
        kanal: newEaf.kanal,
        estimasiBudget: Number(newEaf.estimasiBudget || 0),
        estimasiRevenue: Number(newEaf.estimasiRevenue || 0),
        status: newEaf.status
      },
      ...prev
    ]);
    setNewEaf((prev) => ({
      ...prev,
      kode: '',
      judul: '',
      estimasiBudget: 0,
      estimasiRevenue: 0
    }));
  };

  const handleToggleEafStatus = (id) => {
    const order = ['Pending', 'Approved', 'Done'];
    setEafRecords((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextIdx = (order.indexOf(item.status) + 1) % order.length;
        return { ...item, status: order[nextIdx] };
      })
    );
  };

  const handleAddPic = (e) => {
    e.preventDefault();
    if (!newPicPos.trim()) return;
    const cleanName = newPicName.trim() ? newPicName.trim().toUpperCase() : 'VACANT';
    setPics((prev) => [
      ...prev,
      {
        id: `pic-${Date.now()}`,
        posisi: newPicPos.trim().toUpperCase(),
        nama: cleanName,
        status: cleanName === 'VACANT' ? 'Vacant' : 'Active'
      }
    ]);
    setNewPicPos('');
    setNewPicName('');
  };

  const handleSavePicEdit = (id) => {
    const cleanName = editingPicName.trim() ? editingPicName.trim().toUpperCase() : 'VACANT';
    setPics((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, nama: cleanName, status: cleanName === 'VACANT' ? 'Vacant' : 'Active' }
          : p
      )
    );
    setEditingPicId(null);
    setEditingPicName('');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.judul.trim()) return;
    setTasks((prev) => [
      {
        id: `task-${Date.now()}`,
        ...newTask,
        progress: Number(newTask.progress || 0)
      },
      ...prev
    ]);
    setNewTask((prev) => ({ ...prev, judul: '', progress: 25 }));
  };

  const handleToggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const isDone = t.status === 'Done';
        return {
          ...t,
          status: isDone ? 'In Progress' : 'Done',
          progress: isDone ? 50 : 100
        };
      })
    );
  };

  const handleAddMom = (e) => {
    e.preventDefault();
    if (!newMom.judul.trim()) return;
    setMoms((prev) => [
      {
        id: `mom-${Date.now()}`,
        ...newMom,
        convertedToTask: false
      },
      ...prev
    ]);
    setNewMom((prev) => ({
      ...prev,
      judul: '',
      poinPembahasan: '',
      actionItem: ''
    }));
  };

  const handleConvertMomToTask = (mom) => {
    if (!mom.actionItem) return;
    setTasks((prev) => [
      {
        id: `task-mom-${Date.now()}`,
        judul: `[MOM] ${mom.actionItem}`,
        pic: mom.picAction || 'WINDA',
        kanal: 'MOM ACTION',
        tanggal: mom.deadline || '2026-11-25',
        waktu: '10:00',
        prioritas: 'High',
        status: 'In Progress',
        progress: 15
      },
      ...prev
    ]);
    setMoms((prev) =>
      prev.map((m) => (m.id === mom.id ? { ...m, convertedToTask: true } : m))
    );
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleExportBackup = () => {
    const dataStr = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        pics,
        scorecards,
        strategiInisiatif,
        annualByYear,
        acquisitions,
        weeklyMetrics,
        posMetrics,
        tasks,
        moms,
        checklists,
        playbooks,
        eafRecords
      },
      null,
      2
    );
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-sales-marketing-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result || '{}'));
        if (parsed.pics) setPics(parsed.pics);
        if (parsed.scorecards) setScorecards(parsed.scorecards);
        if (parsed.strategiInisiatif) setStrategiInisiatif(parsed.strategiInisiatif);
        if (parsed.annualByYear) setAnnualByYear(parsed.annualByYear);
        else if (parsed.annualReportRows) {
          setAnnualByYear((prev) => ({ ...prev, 2026: parsed.annualReportRows }));
        }
        if (parsed.acquisitions) setAcquisitions(parsed.acquisitions);
        if (parsed.weeklyMetrics) setWeeklyMetrics(parsed.weeklyMetrics);
        if (parsed.posMetrics) setPosMetrics(parsed.posMetrics);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.moms) setMoms(parsed.moms);
        if (parsed.checklists) setChecklists(parsed.checklists);
        if (parsed.playbooks) setPlaybooks(parsed.playbooks);
        if (parsed.eafRecords) setEafRecords(parsed.eafRecords);
      } catch (err) {
        console.error('File backup tidak valid:', err);
      }
    };
    reader.readAsText(file);
  };

  const buildLocalStrategistReply = (question) => {
    const q = question.toLowerCase();
    const vacantPositions = pics.filter((p) => p.nama === 'VACANT').map((p) => p.posisi);
    const topWeek = [...comparisonRows].sort((a, b) => Number(b.revenue || 0) - Number(a.revenue || 0))[0];
    const lowestWeek = [...comparisonRows].sort((a, b) => Number(a.revenue || 0) - Number(b.revenue || 0))[0];

    const scoreList = computedScorecards
      .map((sc) => `• ${sc.picName} (${sc.posisi}): Skor ${sc.totalSkorPct}%`)
      .join('\n');

    const negativeGaps = [];
    computedStrategi.forEach((group) => {
      group.rows.forEach((r) => {
        if (r.gapSo < 0) {
          negativeGaps.push(`${group.no} ${r.si} (${group.pic}): gap ${r.gapSo}, Nilai Perform ${r.nilaiPerform}%`);
        }
      });
    });

    const lines = [];

    if (q.includes('funnel') || q.includes('konversi') || q.includes('kesimpulan')) {
      lines.push(
        `Funnel & Kesimpulan (${mainSummary.labelBand}):\n• Traffic: ${formatNum(funnelSummary.stage1Traffic)} Pax (100%)\n• Transaksi: ${formatNum(funnelSummary.stage2Transaksi)} Trx (${funnelSummary.pctOverallFrom100}% konversi, ${funnelSummary.trxPer1000Pax} trx / 1.000 pax)\n• Revenue: ${formatIDR(funnelSummary.stage3Revenue)} (Avg Order ${formatIDR(funnelSummary.avgOrderValue)})`
      );
    }

    if (q.includes('eaf') || q.includes('budget') || q.includes('checklist') || q.includes('playbook')) {
      const totalBudgetEaf = eafRecords.reduce((s, e) => s + Number(e.estimasiBudget || 0), 0);
      const doneChk = checklists.filter((c) => c.done).length;
      lines.push(
        `Operasional & EAF:\n• Checklist selesai: ${doneChk}/${checklists.length} item\n• Total estimasi EAF: ${formatIDR(totalBudgetEaf)} (${eafRecords.length} pengajuan)\n• Playbook tersedia: ${playbooks.length} panduan`
      );
    }

    if (q.includes('pos') || q.includes('basket')) {
      lines.push(
        `Ringkasan Sales POS (${posSummary.labelBand}):\n• Revenue POS: ${formatIDR(posSummary.revenuePos)}\n• Traffic POS: ${formatNum(posSummary.trafficPos)} Pax\n• Transaksi POS: ${formatNum(posSummary.transaksiPos)} Trx\n• Basket Size (Otomatis): ${formatIDR(posSummary.basketSize)}`
      );
    }

    if (q.includes('mtd') || q.includes('hari')) {
      lines.push(
        `Target MTD Otomatis Harian saat ini dihitung dengan rumus Target / ${mtdDaysInMonth} hari × hari ke-${mtdCurrentDay}.`
      );
    }

    if (q.includes('vacant') || q.includes('posisi') || q.includes('tim') || q.includes('pic')) {
      lines.push(
        vacantPositions.length > 0
          ? `Posisi VACANT saat ini: ${vacantPositions.join(', ')}. Rekomendasi: tugaskan PIC terdekat secara sementara (mis. Travel/B2B ke Nadia & Fahmi, Driver ke Dharma/Nadia) dan prioritaskan rekrutmen untuk posisi yang berdampak langsung ke traffic.`
          : 'Seluruh posisi pada struktur tim saat ini sudah terisi.'
      );
    }

    if (q.includes('kpi') || q.includes('skor')) {
      lines.push(`Ringkasan Skor KPI Bulanan per PIC:\n${scoreList}`);
    }

    if (q.includes('si') || q.includes('strategi') || q.includes('gap') || q.includes('so') || q.includes('perform')) {
      const performSummary = computedStrategi
        .map((g) => `• ${g.no} ${g.pic}: Avg Nilai Perform ${g.avgPerform}%`)
        .join('\n');
      lines.push(`Rata-rata Nilai Perform per SO:\n${performSummary}`);
      if (negativeGaps.length > 0) {
        lines.push(`Item Strategi Inisiatif dengan Gap negatif:\n• ${negativeGaps.slice(0, 6).join('\n• ')}`);
      }
    }

    if (lines.length === 0) {
      lines.push(
        `Ringkasan Performa W1–W5:\n• Tertinggi: ${topWeek?.minggu || '-'} (${formatIDR(topWeek?.revenue || 0)}, ${formatNum(topWeek?.traffic || 0)} Pax)\n• Terendah: ${lowestWeek?.minggu || '-'} (${formatIDR(lowestWeek?.revenue || 0)}, ${formatNum(lowestWeek?.traffic || 0)} Pax)`
      );
      lines.push(
        `Funnel & Konversi:\n• ${formatNum(funnelSummary.stage1Traffic)} Pax → ${formatNum(funnelSummary.stage2Transaksi)} Trx (${funnelSummary.pctOverallFrom100}%, ${funnelSummary.trxPer1000Pax} trx/1.000 pax) | Revenue ${formatIDR(funnelSummary.stage3Revenue)}`
      );
      lines.push(`Skor KPI per PIC:\n${scoreList}`);
      if (vacantPositions.length > 0) {
        lines.push(`Perhatian Posisi VACANT: ${vacantPositions.join(', ')} perlu backup eksekusi harian.`);
      }
      lines.push(
        `Rencana Aksi 7 Hari:\n1. Update Target, Target MTD harian (hari ke-${mtdCurrentDay}/${mtdDaysInMonth}), dan Actual di tab KPI & FUNNEL.\n2. Kunci jadwal rombongan & event masuk ke Schedule dan Google Calendar.\n3. Follow up mitra aktif (Guide, Travel, EO, Pemerintahan) serta tutup action item di MOM & Checklist.`
      );
    }

    return lines.join('\n\n');
  };

  const handleAskAi = async (customQuery) => {
    const queryText = (customQuery ?? aiPrompt).trim();
    if (!queryText) return;
    setAiMessages((prev) => [...prev, { role: 'user', text: queryText }]);
    if (!customQuery) setAiPrompt('');
    setAiLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const vacantPositions = pics.filter((p) => p.nama === 'VACANT').map((p) => p.posisi);
    const weeklySummaryText = comparisonRows
      .map((r) => `${r.minggu} (${r.label}): Rev ${formatIDR(r.revenue)} (${r.revGrowth}%), Pax ${r.traffic}`)
      .join(' | ');
    const funnelSummaryText = `Traffic ${formatNum(funnelSummary.stage1Traffic)} -> Transaksi ${formatNum(funnelSummary.stage2Transaksi)} (${funnelSummary.pctOverallFrom100}%, ${funnelSummary.trxPer1000Pax} trx/1000 pax) -> Revenue ${formatIDR(funnelSummary.stage3Revenue)}`;
    const scorecardSummary = computedScorecards
      .map((sc) => `${sc.picName} (${sc.posisi}): Skor ${sc.totalSkorPct}%`)
      .join(' | ');
    const siSummary = computedStrategi
      .map((g) => `${g.no} ${g.pic} (Avg Perform ${g.avgPerform}%): ${g.rows.map((r) => `${r.si} (${r.actual}/${r.target}, Perform ${r.nilaiPerform}%)`).join(', ')}`)
      .join(' || ');

    try {
      if (apiKey) {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Anda adalah konsultan operasional Sales Marketing THE KERANJANG BALI. Jawab singkat, jelas, dan actionable dalam Bahasa Indonesia.\nPerbandingan W1-W5: ${weeklySummaryText}\nFunnel Sales: ${funnelSummaryText}\nSkor KPI per PIC: ${scorecardSummary}\nStrategi Inisiatif: ${siSummary}\nPosisi VACANT: ${vacantPositions.join(', ')}\nPertanyaan: ${queryText}`
                    }
                  ]
                }
              ]
            })
          }
        );
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!replyText) throw new Error('Empty response');
        setAiMessages((prev) => [...prev, { role: 'assistant', text: replyText }]);
      } else {
        setAiMessages((prev) => [
          ...prev,
          { role: 'assistant', text: buildLocalStrategistReply(queryText) }
        ]);
      }
    } catch {
      setAiMessages((prev) => [
        ...prev,
        { role: 'assistant', text: buildLocalStrategistReply(queryText) }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3 },
    { id: 'annual', label: 'ANNUAL 2024–2028', icon: Table2 },
    { id: 'perbandingan', label: 'W1–W5 & PERIODE', icon: Layers },
    { id: 'kpi', label: 'KPI & FUNNEL', icon: Target },
    { id: 'workspace', label: 'WORKSPACE & EAF', icon: ClipboardCheck },
    { id: 'schedule', label: 'SCHEDULE & KALENDER', icon: Calendar },
    { id: 'tim', label: 'TIM & PIC', icon: Users },
    { id: 'mom_ai', label: 'MOM & AI SOLVER', icon: Sparkles }
  ];

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0e131d] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-wide text-white uppercase">
              Sales & Marketing Command Center
            </h1>
            <p className="text-xs text-slate-400">
              Akses terbatas internal tim. Masukkan kata sandi untuk membuka dashboard.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi Akses Tim
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={passInput}
                  onChange={(e) => {
                    setPassInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Masukkan kata sandi..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 pr-10 text-sm text-white outline-none focus:border-emerald-500"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  aria-label="Tampilkan atau sembunyikan sandi"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <p className="mt-2 text-xs font-medium text-rose-400">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 text-sm transition"
            >
              Buka Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            THE KERANJANG BALI • Sales & Marketing Division
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 pb-20 md:pb-10 print:bg-white print:text-black print:pb-0">
      <style>{`
        @media print {
          body { background: #ffffff !important; color: #000000 !important; }
          .print\\:hidden { display: none !important; }
          input, select, textarea { border: none !important; background: transparent !important; color: #000000 !important; padding: 0 !important; }
        }
      `}</style>

      <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#0b0f17]/95 backdrop-blur print:static print:bg-white print:border-slate-300">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold print:border-slate-400 print:text-black">
              TK
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-wide text-white uppercase print:text-black">
                THE KERANJANG BALI — Sales & Marketing OS
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 print:text-slate-600">
                <span className="inline-flex items-center gap-1 text-emerald-400 print:text-black">
                  <ShieldCheck className="w-3.5 h-3.5" /> Auto-Backup Aktif ({lastSavedAt})
                </span>
                <span>•</span>
                <span>Workspace Tim, Funnel & Annual Report</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 transition"
            >
              <Printer className="w-3.5 h-3.5" /> Convert to PDF
            </button>
            <button
              type="button"
              onClick={handleExportBackup}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" /> Backup JSON
            </button>
            <label className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-amber-400" /> Restore
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
            <button
              type="button"
              onClick={handleLock}
              className="inline-flex items-center gap-1.5 rounded-md border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1.5 text-xs font-semibold text-rose-300 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Kunci
            </button>
          </div>
        </div>

        <nav className="hidden md:flex border-t border-slate-800/80 bg-[#090c12] px-6 gap-1 overflow-x-auto print:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold tracking-wider border-b-2 transition whitespace-nowrap ${
                  active
                    ? 'border-emerald-400 text-emerald-300 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-[1440px] px-3 sm:px-6 pt-5 space-y-5">
        <section className="rounded-xl border border-slate-800 bg-[#0e131d] p-3.5 sm:p-4 space-y-3 print:hidden">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'harian', label: 'Harian' },
                { id: 'mingguan', label: 'Mingguan' },
                { id: 'bulanan', label: 'Bulanan' },
                { id: 'tahunan', label: 'Tahunan' },
                { id: 'custom', label: 'Custom Tanggal' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPeriodMode(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    periodMode === p.id
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">Dari:</span>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="bg-transparent text-slate-100 outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5">
                <span className="text-slate-400">s/d:</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="bg-transparent text-slate-100 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase">
                Pilih Minggu:
              </span>
              {['ALL', 'W1', 'W2', 'W3', 'W4', 'W5'].map((wk) => {
                const weekMeta = weeklyMetrics.find((m) => m.minggu === wk);
                return (
                  <button
                    key={wk}
                    type="button"
                    onClick={() => {
                      setSelectedWeek(wk);
                      if (periodMode === 'harian' || periodMode === 'custom') {
                        setPeriodMode('mingguan');
                      }
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                      selectedWeek === wk
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    {wk === 'ALL'
                      ? 'SEMUA (W1–W5)'
                      : weekMeta?.label
                      ? `${wk} (${weekMeta.label})`
                      : wk}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleResetWeekLabels}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-cyan-300 transition"
              >
                <RotateCcw className="w-3 h-3" /> Reset Label Week
              </button>
              <button
                type="button"
                onClick={handleResetDashboardMetrics}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 transition"
              >
                <RefreshCw className="w-3 h-3" /> Reset Angka Dashboard
              </button>
            </div>
          </div>
        </section>

        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5 print:bg-white print:border-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase print:text-slate-700">
                    REVENUE ({mainSummary.labelBand})
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tabular-nums print:text-black">
                  {formatIDR(mainSummary.revenue)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold ${
                      mainSummary.revPct >= 0
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    {mainSummary.revPct >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {mainSummary.revPct >= 0 ? `+${mainSummary.revPct}%` : `${mainSummary.revPct}%`}
                  </span>
                  <span className="text-slate-400 print:text-slate-600">{mainSummary.compareNote}</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5 print:bg-white print:border-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase print:text-slate-700">
                    TRAFFIC / PAX ({mainSummary.labelBand})
                  </span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tabular-nums print:text-black">
                  {formatNum(mainSummary.traffic)} <span className="text-sm font-normal text-slate-400">Pax</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold ${
                      mainSummary.trafPct >= 0
                        ? 'bg-cyan-500/15 text-cyan-300'
                        : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    {mainSummary.trafPct >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {mainSummary.trafPct >= 0 ? `+${mainSummary.trafPct}%` : `${mainSummary.trafPct}%`}
                  </span>
                  <span className="text-slate-400 print:text-slate-600">{mainSummary.compareNote}</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5 print:bg-white print:border-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase print:text-slate-700">
                    TRANSAKSI ({mainSummary.labelBand})
                  </span>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tabular-nums print:text-black">
                  {formatNum(mainSummary.transaksi)} <span className="text-sm font-normal text-slate-400">Trx</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold ${
                      mainSummary.trxPct >= 0
                        ? 'bg-amber-500/15 text-amber-300'
                        : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    {mainSummary.trxPct >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {mainSummary.trxPct >= 0 ? `+${mainSummary.trxPct}%` : `${mainSummary.trxPct}%`}
                  </span>
                  <span className="text-slate-400 print:text-slate-600">{mainSummary.compareNote}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5 space-y-3 print:bg-white print:border-slate-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 print:text-black">
                      <Sparkles className="w-4 h-4 text-sky-400" /> Kesimpulan
                    </h2>
                    <p className="text-[11px] text-slate-400 print:text-slate-600">
                      Ringkasan poin utama yang perlu diperhatikan periode ini
                    </p>
                  </div>
                </div>
                <div className="space-y-2.5 text-xs">
                  {executiveConclusions.map((item) => (
                    <div
                      key={item.num}
                      className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-slate-950/70 p-2.5 print:bg-slate-50"
                    >
                      <span className="h-5 w-5 shrink-0 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold flex items-center justify-center text-[11px]">
                        {item.num}
                      </span>
                      <p className="text-slate-200 leading-relaxed print:text-black">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5 space-y-3 print:bg-white print:border-slate-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2 print:text-black">
                      <Filter className="w-4 h-4 text-emerald-400" /> Funnel Sales ({mainSummary.labelBand})
                    </h2>
                    <p className="text-[11px] text-slate-400 print:text-slate-600">
                      Dari traffic pengunjung sampai transaksi & realisasi revenue
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('kpi')}
                    className="text-[11px] font-semibold text-cyan-300 hover:underline print:hidden"
                  >
                    Detail di KPI & Funnel →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center tabular-nums">
                  <div className="sm:col-span-2 space-y-2">
                    <div className="rounded-lg bg-sky-600/80 px-3.5 py-2.5 text-white flex items-center justify-between">
                      <span className="text-[11px] uppercase font-semibold">Traffic / Pax</span>
                      <span className="text-sm font-extrabold">{formatCompactId(funnelSummary.stage1Traffic)}</span>
                    </div>
                    <div className="rounded-lg bg-cyan-600/80 px-3.5 py-2.5 text-white flex items-center justify-between mx-2">
                      <span className="text-[11px] uppercase font-semibold">Transaksi</span>
                      <span className="text-sm font-extrabold">{formatNum(funnelSummary.stage2Transaksi)}</span>
                    </div>
                    <div className="rounded-lg bg-emerald-600/80 px-3.5 py-2.5 text-white flex items-center justify-between mx-4">
                      <span className="text-[11px] uppercase font-semibold">Revenue</span>
                      <span className="text-xs sm:text-sm font-extrabold">{formatCompactId(funnelSummary.stage3Revenue)}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                    <div>
                      <div className="text-base font-extrabold text-white">100%</div>
                      <div className="text-[11px] text-slate-400">traffic masuk periode</div>
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-cyan-300">{funnelSummary.pctTrafficToTrx}%</div>
                      <div className="text-[11px] text-slate-400">konversi ke transaksi</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300">
                        {formatNum(funnelSummary.trxPer1000Pax)} transaksi / 1.000 pax
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-[#0e131d] p-4 sm:p-5 space-y-4 print:bg-white print:border-slate-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-xs sm:text-sm font-extrabold text-emerald-300 uppercase tracking-wide flex items-center gap-2 print:text-black">
                    <Store className="w-4 h-4 text-emerald-400" /> Dashboard Sales POS & Basket Size ({posSummary.labelBand})
                  </h2>
                  <p className="text-[11px] text-slate-400 print:text-slate-600">
                    Input manual <span className="text-white font-semibold">Revenue POS</span>, <span className="text-white font-semibold">Traffic POS</span>, dan <span className="text-white font-semibold">Transaksi POS</span> — <span className="text-amber-300 font-semibold">Basket Size</span> terhitung otomatis (Revenue POS / Transaksi POS).
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-[11px] font-bold text-amber-300">
                  <Receipt className="w-3.5 h-3.5" /> Basket Size Otomatis
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 tabular-nums">
                <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3.5 print:bg-white print:border-slate-300">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Revenue POS</span>
                  <div className="mt-1.5 text-lg sm:text-xl font-extrabold text-emerald-300 print:text-black">
                    {formatIDR(posSummary.revenuePos)}
                  </div>
                  <span className="text-[11px] text-slate-500">Input manual POS</span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3.5 print:bg-white print:border-slate-300">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Traffic POS</span>
                  <div className="mt-1.5 text-lg sm:text-xl font-extrabold text-cyan-300 print:text-black">
                    {formatNum(posSummary.trafficPos)} <span className="text-xs font-normal text-slate-400">Pax</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Input manual POS</span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-3.5 print:bg-white print:border-slate-300">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Transaksi POS</span>
                  <div className="mt-1.5 text-lg sm:text-xl font-extrabold text-sky-300 print:text-black">
                    {formatNum(posSummary.transaksiPos)} <span className="text-xs font-normal text-slate-400">Trx</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Input manual POS</span>
                </div>

                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 print:bg-white print:border-slate-300">
                  <span className="text-[11px] font-bold uppercase text-amber-300 print:text-black">Basket Size (Otomatis)</span>
                  <div className="mt-1.5 text-lg sm:text-xl font-extrabold text-amber-200 print:text-black">
                    {formatIDR(posSummary.basketSize)}
                  </div>
                  <span className="text-[11px] text-amber-200/75 print:text-slate-600">
                    {posSummary.transaksiPos > 0
                      ? `${formatIDR(posSummary.revenuePos)} / ${formatNum(posSummary.transaksiPos)} Trx`
                      : '0 Trx (otomatis Rp 0)'}
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleApplyPosManualInput}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-800/80 text-xs print:hidden"
              >
                <div>
                  <label className="block text-slate-400 mb-1">Minggu POS</label>
                  <select
                    value={posManualForm.minggu}
                    onChange={(e) => setPosManualForm({ ...posManualForm, minggu: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    {posMetrics.map((w) => (
                      <option key={w.minggu} value={w.minggu}>
                        {w.minggu} {w.label ? `(${w.label})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tambah Revenue POS (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={posManualForm.revenuePos}
                    onChange={(e) => setPosManualForm({ ...posManualForm, revenuePos: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-emerald-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tambah Traffic POS (Pax)</label>
                  <input
                    type="number"
                    min="0"
                    value={posManualForm.trafficPos}
                    onChange={(e) => setPosManualForm({ ...posManualForm, trafficPos: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-cyan-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tambah Transaksi POS (Trx)</label>
                  <input
                    type="number"
                    min="0"
                    value={posManualForm.transaksiPos}
                    onChange={(e) => setPosManualForm({ ...posManualForm, transaksiPos: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-sky-300 font-semibold"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Data POS
                  </button>
                </div>
              </form>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse text-[11px] sm:text-xs tabular-nums">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 uppercase">
                      <th className="p-2 border border-slate-800">Minggu</th>
                      <th className="p-2 border border-slate-800">Rentang / Label Week (Custom)</th>
                      <th className="p-2 border border-slate-800 text-right">Revenue POS (Edit)</th>
                      <th className="p-2 border border-slate-800 text-right">Traffic POS (Edit)</th>
                      <th className="p-2 border border-slate-800 text-right">Transaksi POS (Edit)</th>
                      <th className="p-2 border border-slate-800 text-right text-amber-300">Basket Size (Otomatis)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posMetrics.map((row) => {
                      const basketRow = calcBasketSize(row.revenuePos, row.transaksiPos);
                      return (
                        <tr key={row.minggu} className="border-b border-slate-800/80 hover:bg-slate-900/50">
                          <td className="p-2 border border-slate-800 font-bold text-cyan-300">
                            {row.minggu}
                          </td>
                          <td className="p-2 border border-slate-800">
                            <input
                              type="text"
                              value={row.label || ''}
                              placeholder="Contoh: 1–7 Nov"
                              onChange={(e) => handleUpdateWeekLabel(row.minggu, e.target.value)}
                              className="w-36 rounded border border-cyan-500/35 bg-slate-950 px-2 py-1 text-cyan-200 font-medium outline-none focus:border-cyan-400"
                            />
                          </td>
                          <td className="p-2 border border-slate-800 text-right">
                            <input
                              type="number"
                              min="0"
                              value={row.revenuePos}
                              onChange={(e) => handleUpdatePosRow(row.minggu, 'revenuePos', e.target.value)}
                              className="w-32 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-emerald-300 font-semibold"
                            />
                          </td>
                          <td className="p-2 border border-slate-800 text-right">
                            <input
                              type="number"
                              min="0"
                              value={row.trafficPos}
                              onChange={(e) => handleUpdatePosRow(row.minggu, 'trafficPos', e.target.value)}
                              className="w-24 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-cyan-300 font-semibold"
                            />
                          </td>
                          <td className="p-2 border border-slate-800 text-right">
                            <input
                              type="number"
                              min="0"
                              value={row.transaksiPos}
                              onChange={(e) => handleUpdatePosRow(row.minggu, 'transaksiPos', e.target.value)}
                              className="w-24 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-sky-300 font-semibold"
                            />
                          </td>
                          <td className="p-2 border border-slate-800 text-right font-extrabold text-amber-300">
                            {formatIDR(basketRow)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-3 print:bg-white print:border-slate-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide print:text-black">
                    Perbandingan Cepat W1 – W5 (Custom Rentang Week & Filter Minggu)
                  </h2>
                  <p className="text-[11px] text-slate-400 print:text-slate-600">
                    Anda bisa ketik rentang/label tiap week secara manual lalu klik kartu untuk memfilter dashboard
                  </p>
                </div>
                {selectedWeek !== 'ALL' && (
                  <button
                    type="button"
                    onClick={() => setSelectedWeek('ALL')}
                    className="text-xs font-semibold text-cyan-300 hover:underline print:hidden"
                  >
                    Tampilkan Semua (W1–W5)
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 tabular-nums">
                {comparisonRows.map((item, idx) => {
                  const isSelected = selectedWeek === item.minggu;
                  return (
                    <div
                      key={item.minggu}
                      className={`rounded-xl border p-3 transition space-y-2 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/10'
                          : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedWeek(isSelected ? 'ALL' : item.minggu)}
                          className="text-xs font-extrabold text-cyan-300 hover:underline text-left"
                        >
                          {item.minggu}
                        </button>
                        {idx === 0 ? (
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            Baseline
                          </span>
                        ) : (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              item.revGrowth >= 0
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {item.revGrowth >= 0 ? `+${item.revGrowth}%` : `${item.revGrowth}%`}
                          </span>
                        )}
                      </div>

                      <input
                        type="text"
                        value={item.label || ''}
                        placeholder="Rentang / label week..."
                        onChange={(e) => handleUpdateWeekLabel(item.minggu, e.target.value)}
                        className="w-full rounded border border-slate-800 bg-[#0b0f17] px-2 py-1 text-[11px] text-slate-200 outline-none focus:border-cyan-400"
                      />

                      <button
                        type="button"
                        onClick={() => setSelectedWeek(isSelected ? 'ALL' : item.minggu)}
                        className="w-full text-left"
                      >
                        <div className="text-sm sm:text-base font-extrabold text-white">
                          {formatIDR(item.revenue)}
                        </div>

                        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                          <span>{formatNum(item.traffic)} Pax</span>
                          <span>{formatNum(item.transaksi)} Trx</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 print:hidden">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wide">
                    Grafik Perbandingan Revenue & Traffic (W1 – W5)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Visualisasi tren mingguan W1 sampai W5 divisi Sales & Marketing
                  </p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonRows}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="minggu" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0b0f17',
                        borderColor: '#334155',
                        color: '#f8fafc',
                        fontSize: '12px'
                      }}
                      formatter={(val, name) =>
                        String(name).includes('Revenue')
                          ? [formatIDR(val), 'Revenue (Rp)']
                          : [formatNum(val), 'Traffic (Pax)']
                      }
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="revenue" name="Revenue (Rp)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="traffic" name="Traffic (Pax)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <form
              onSubmit={handleAddAcquisition}
              className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-3 print:hidden"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" /> Input Manual Daily Report Sales & Marketing
                </h2>
                <span className="text-[11px] text-slate-400">Otomatis update ke tabel & rekap mingguan</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={formAcq.tanggal}
                    onChange={(e) => setFormAcq({ ...formAcq, tanggal: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Minggu</label>
                  <select
                    value={formAcq.minggu}
                    onChange={(e) => setFormAcq({ ...formAcq, minggu: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    {weeklyMetrics.map((w) => (
                      <option key={w.minggu} value={w.minggu}>
                        {w.minggu} {w.label ? `(${w.label})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Posisi / Kanal</label>
                  <select
                    value={formAcq.kanal}
                    onChange={(e) => handleSelectKanal(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    {pics.map((p) => (
                      <option key={p.id} value={p.posisi}>
                        {p.posisi}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">PIC / Nama</label>
                  <input
                    type="text"
                    value={formAcq.pic}
                    onChange={(e) => setFormAcq({ ...formAcq, pic: e.target.value.toUpperCase() })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Event / Rombongan</label>
                  <input
                    type="text"
                    placeholder="Contoh: SMK / EVENT / TOUR"
                    value={formAcq.instansi}
                    onChange={(e) => setFormAcq({ ...formAcq, instansi: e.target.value.toUpperCase() })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Program Paket (Edit Manual)</label>
                  <input
                    type="text"
                    list="program-paket-list"
                    placeholder="Ketik / pilih program paket..."
                    value={formAcq.program}
                    onChange={(e) => setFormAcq({ ...formAcq, program: e.target.value.toUpperCase() })}
                    className="w-full rounded-lg border border-cyan-500/40 bg-slate-950 px-2.5 py-2 text-cyan-200 font-medium"
                  />
                  <datalist id="program-paket-list">
                    {PROGRAM_PAKET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Traffic / Pax</label>
                  <input
                    type="number"
                    min="0"
                    value={formAcq.pax}
                    onChange={(e) => setFormAcq({ ...formAcq, pax: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Revenue (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={formAcq.revenue}
                    onChange={(e) => setFormAcq({ ...formAcq, revenue: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Jumlah Transaksi</label>
                  <input
                    type="number"
                    min="0"
                    value={formAcq.transaksi}
                    onChange={(e) => setFormAcq({ ...formAcq, transaksi: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Waktu / Schedule</label>
                  <input
                    type="text"
                    value={formAcq.waktu}
                    onChange={(e) => setFormAcq({ ...formAcq, waktu: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Partner / WA</label>
                  <input
                    type="text"
                    placeholder="Partner / No HP"
                    value={formAcq.partner}
                    onChange={(e) => setFormAcq({ ...formAcq, partner: e.target.value.toUpperCase() })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Simpan Data
                  </button>
                </div>
              </div>
            </form>

            <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden print:bg-white print:border-slate-300">
              <div className="p-3.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 bg-[#0e131d] print:bg-white">
                <h3 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider print:text-black">
                  SCHEDULE ROMBONGAN EVENT & GUIDE ({filteredAcquisitions.length} Record)
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs print:hidden">
                  <select
                    value={selectedKanalFilter}
                    onChange={(e) => setSelectedKanalFilter(e.target.value)}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-slate-200"
                  >
                    <option value="ALL">Semua Posisi / Kanal</option>
                    {pics.map((p) => (
                      <option key={p.id} value={p.posisi}>
                        {p.posisi}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Cari rombongan / PIC / partner..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-slate-200"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] sm:text-xs tabular-nums">
                  <thead>
                    <tr className="bg-amber-300 text-slate-950 font-bold uppercase">
                      <th className="py-2 px-2.5 border border-slate-800">Posisi</th>
                      <th className="py-2 px-2.5 border border-slate-800">Tanggal</th>
                      <th className="py-2 px-2.5 border border-slate-800">W</th>
                      <th className="py-2 px-2.5 border border-slate-800">Waktu</th>
                      <th className="py-2 px-2.5 border border-slate-800">PIC</th>
                      <th className="py-2 px-2.5 border border-slate-800">Event / Rombongan</th>
                      <th className="py-2 px-2.5 border border-slate-800">Program Paket</th>
                      <th className="py-2 px-2.5 border border-slate-800">Venue</th>
                      <th className="py-2 px-2.5 border border-slate-800">Partner</th>
                      <th className="py-2 px-2.5 border border-slate-800 text-right">Pax</th>
                      <th className="py-2 px-2.5 border border-slate-800 text-right">Revenue</th>
                      <th className="py-2 px-2.5 border border-slate-800 text-center print:hidden">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAcquisitions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={12}
                          className="py-6 px-3 text-center text-slate-500 border border-slate-800/70"
                        >
                          Belum ada data schedule rombongan/event. Silakan input pada form di atas.
                        </td>
                      </tr>
                    ) : (
                      filteredAcquisitions.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-900/80 border-b border-slate-800/80">
                          <td className="py-2 px-2.5 border border-slate-800/70 font-bold text-emerald-300">
                            {row.kanal}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 whitespace-nowrap">{row.tanggal}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 font-semibold text-cyan-300">{row.minggu}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 whitespace-nowrap">{row.waktu}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 font-medium text-slate-200">{row.pic}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 font-semibold text-white">{row.instansi}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-sky-200">{row.program}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-slate-300">{row.venue || '-'}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-slate-300">{row.partner || '-'}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-right">{formatNum(row.pax)}</td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-right font-bold text-emerald-300">
                            {formatIDR(row.revenue)}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-center print:hidden">
                            <button
                              type="button"
                              onClick={() => handleDeleteAcquisition(row.id)}
                              className="p-1 text-rose-400 hover:bg-rose-500/15 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'annual' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <div className="inline-block rounded bg-emerald-500 px-2.5 py-0.5 text-xs font-extrabold text-slate-950 uppercase tracking-wider mb-1">
                  THE KERANJANG BALI
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                  ANNUAL REPORT SALES & MARKETING ({selectedAnnualYear})
                </h2>
                <p className="text-xs text-slate-400">
                  Pilih tahun <span className="text-cyan-300 font-semibold">2024 – 2028</span>. Semua kolom bulan (<span className="text-emerald-300 font-semibold">JANUARY – DESEMBER</span>) dan <span className="text-sky-300 font-semibold">LINK ACTIVITY TEAM</span> bisa diedit langsung.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 print:hidden">
                {ANNUAL_YEARS.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedAnnualYear(yr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
                      selectedAnnualYear === yr
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-emerald-500/50'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleResetActiveYear}
                  className="ml-1 inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Reset {selectedAnnualYear}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-3 print:hidden">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">
                    Grafik Otomatis Tahunan {selectedAnnualYear} (Jan – Des)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Otomatis mengikuti perubahan angka pada tabel Annual Report {selectedAnnualYear} di bawah
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5">
                    <span className="text-slate-400">Seri Utama:</span>
                    <select
                      value={selectedAnnualChartRowId}
                      onChange={(e) => setSelectedAnnualChartRowId(e.target.value)}
                      className="bg-transparent text-emerald-300 font-semibold outline-none"
                    >
                      {numericAnnualRows.map((r) => (
                        <option key={r.id} value={r.id} className="bg-slate-950 text-white">
                          {r.item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5">
                    <span className="text-slate-400">Pembanding:</span>
                    <select
                      value={selectedAnnualCompareRowId}
                      onChange={(e) => setSelectedAnnualCompareRowId(e.target.value)}
                      className="bg-transparent text-cyan-300 font-semibold outline-none"
                    >
                      <option value="NONE" className="bg-slate-950 text-white">
                        Tanpa Pembanding
                      </option>
                      {numericAnnualRows.map((r) => (
                        <option key={r.id} value={r.id} className="bg-slate-950 text-white">
                          {r.item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={annualChartData.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0b0f17',
                        borderColor: '#334155',
                        color: '#f8fafc',
                        fontSize: '12px'
                      }}
                      formatter={(val, name) => {
                        const isPrimary = String(name).includes('Utama');
                        const rowRef = isPrimary
                          ? annualChartData.primaryRow
                          : annualChartData.secondaryRow;
                        return [
                          formatAnnualCell(val, rowRef?.format || 'number'),
                          rowRef?.item || name
                        ];
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar
                      dataKey="primaryVal"
                      name={`${annualChartData.primaryRow?.item || 'Utama'} (Utama)`}
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                    {annualChartData.secondaryRow && (
                      <Bar
                        dataKey="secondaryVal"
                        name={`${annualChartData.secondaryRow.item} (Pembanding)`}
                        fill="#38bdf8"
                        radius={[4, 4, 0, 0]}
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] tabular-nums">
                  <thead>
                    <tr className="bg-amber-300 text-slate-950 uppercase font-extrabold">
                      <th className="p-2 border border-slate-800 sticky left-0 z-10 bg-amber-300 min-w-[260px]">
                        ITEM ({selectedAnnualYear})
                      </th>
                      {currentYearMonths.map((m) => (
                        <th key={m.key} className="p-2 border border-slate-800 text-right min-w-[125px]">
                          {m.label}
                        </th>
                      ))}
                      <th className="p-2 border border-slate-800 text-right bg-emerald-950 text-emerald-200 min-w-[130px]">
                        TOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {computedAnnualReport.map((row) => {
                      const isFormula = row.type === 'formula';
                      const isText = row.type === 'text';
                      return (
                        <tr
                          key={row.id}
                          className={`border-b border-slate-800/80 ${
                            isFormula
                              ? 'bg-sky-950/35 font-semibold'
                              : isText
                              ? 'bg-slate-900/50'
                              : 'hover:bg-slate-900/40'
                          }`}
                        >
                          <td
                            className={`p-2 border border-slate-800 sticky left-0 z-10 ${
                              isFormula
                                ? 'bg-[#0c1b2a] text-sky-200 font-bold'
                                : isText
                                ? 'bg-[#0f1522] text-emerald-300 font-bold'
                                : 'bg-[#0a0d14] text-white font-bold'
                            }`}
                          >
                            {row.item}
                          </td>
                          {currentYearMonths.map((m) => {
                            const val = row.computedValues[m.key];
                            if (isFormula) {
                              return (
                                <td
                                  key={m.key}
                                  className="p-2 border border-slate-800 text-right text-sky-200"
                                >
                                  {formatAnnualCell(val, row.format)}
                                </td>
                              );
                            }
                            if (isText) {
                              return (
                                <td key={m.key} className="p-1.5 border border-slate-800">
                                  <input
                                    type="text"
                                    value={row.values?.[m.key] ?? ''}
                                    placeholder="Tempel link / catatan..."
                                    onChange={(e) => handleUpdateAnnualCell(row.id, m.key, e.target.value)}
                                    className="w-36 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-left text-cyan-200 focus:border-emerald-400 outline-none"
                                  />
                                </td>
                              );
                            }
                            return (
                              <td key={m.key} className="p-1.5 border border-slate-800 text-right">
                                <input
                                  type="number"
                                  value={row.values?.[m.key] ?? 0}
                                  onChange={(e) => handleUpdateAnnualCell(row.id, m.key, e.target.value)}
                                  className="w-28 rounded border border-slate-700/80 bg-slate-950 px-1.5 py-1 text-right text-slate-100 focus:border-emerald-400 outline-none"
                                />
                              </td>
                            );
                          })}
                          <td className="p-2 border border-slate-800 text-right font-extrabold bg-emerald-950/50 text-emerald-300">
                            {formatAnnualCell(row.totalValue, row.format)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'perbandingan' && (
          <div className="space-y-5">
            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase">
                    Perbandingan Mingguan Lengkap W1 – W5 (Revenue, Traffic & Transaksi)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Edit rentang/label week maupun angka W1–W5 secara manual—persentase pertumbuhan Week-over-Week terhitung otomatis
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs tabular-nums">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 uppercase">
                      <th className="p-2.5 border border-slate-800">Minggu</th>
                      <th className="p-2.5 border border-slate-800">Rentang / Label Week</th>
                      <th className="p-2.5 border border-slate-800">Revenue (Input Manual)</th>
                      <th className="p-2.5 border border-slate-800">Growth Rev (%)</th>
                      <th className="p-2.5 border border-slate-800">Traffic / Pax</th>
                      <th className="p-2.5 border border-slate-800">Growth Traffic (%)</th>
                      <th className="p-2.5 border border-slate-800">Transaksi</th>
                      <th className="p-2.5 border border-slate-800">Growth Trx (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, idx) => (
                      <tr key={row.minggu} className="border-b border-slate-800 hover:bg-slate-900/50">
                        <td className="p-2.5 border border-slate-800 font-bold text-cyan-300">
                          {row.minggu}
                        </td>
                        <td className="p-2.5 border border-slate-800">
                          <input
                            type="text"
                            value={row.label || ''}
                            onChange={(e) => handleUpdateWeekLabel(row.minggu, e.target.value)}
                            className="w-32 rounded border border-cyan-500/35 bg-slate-950 px-2 py-1 text-cyan-200 font-medium outline-none"
                          />
                        </td>
                        <td className="p-2.5 border border-slate-800">
                          <input
                            type="number"
                            value={row.revenue}
                            onChange={(e) => handleUpdateWeeklyField(row.minggu, 'revenue', e.target.value)}
                            className="w-36 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-emerald-300 font-semibold"
                          />
                        </td>
                        <td className="p-2.5 border border-slate-800 font-bold">
                          {idx === 0 ? (
                            <span className="text-slate-400">Baseline</span>
                          ) : (
                            <span className={row.revGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                              {row.revGrowth >= 0 ? `+${row.revGrowth}%` : `${row.revGrowth}%`}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 border border-slate-800">
                          <input
                            type="number"
                            value={row.traffic}
                            onChange={(e) => handleUpdateWeeklyField(row.minggu, 'traffic', e.target.value)}
                            className="w-24 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-white"
                          />
                        </td>
                        <td className="p-2.5 border border-slate-800 font-bold">
                          {idx === 0 ? (
                            <span className="text-slate-400">Baseline</span>
                          ) : (
                            <span className={row.trafGrowth >= 0 ? 'text-cyan-400' : 'text-rose-400'}>
                              {row.trafGrowth >= 0 ? `+${row.trafGrowth}%` : `${row.trafGrowth}%`}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 border border-slate-800">
                          <input
                            type="number"
                            value={row.transaksi}
                            onChange={(e) => handleUpdateWeeklyField(row.minggu, 'transaksi', e.target.value)}
                            className="w-24 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-white"
                          />
                        </td>
                        <td className="p-2.5 border border-slate-800 font-bold">
                          {idx === 0 ? (
                            <span className="text-slate-400">Baseline</span>
                          ) : (
                            <span className={row.trxGrowth >= 0 ? 'text-amber-400' : 'text-rose-400'}>
                              {row.trxGrowth >= 0 ? `+${row.trxGrowth}%` : `${row.trxGrowth}%`}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="h-64 w-full mt-5 print:hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparisonRows}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="minggu" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0b0f17',
                        borderColor: '#334155',
                        color: '#f8fafc',
                        fontSize: '12px'
                      }}
                      formatter={(val, name) =>
                        String(name).includes('Revenue')
                          ? [formatIDR(val), 'Revenue (Rp)']
                          : [formatNum(val), 'Traffic (Pax)']
                      }
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="revenue" name="Revenue (Rp)" stroke="#10b981" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="traffic" name="Traffic (Pax)" stroke="#38bdf8" strokeWidth={2.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kpi' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-xs sm:text-sm font-extrabold text-sky-300 uppercase tracking-wide flex items-center gap-2">
                    <Filter className="w-4 h-4 text-sky-400" /> Funnel Konversi Sales ({mainSummary.labelBand})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Tahapan konversi dari traffic pengunjung hingga transaksi & revenue pada periode aktif
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg tabular-nums">
                  {formatNum(funnelSummary.trxPer1000Pax)} transaksi / 1.000 pax
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center tabular-nums">
                <div className="md:col-span-2 space-y-2.5">
                  <div className="rounded-xl bg-sky-600/80 border border-sky-400/30 px-4 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] uppercase font-bold text-sky-100">Tahap 1 • Traffic / Pax</div>
                      <div className="text-xs text-sky-200/80">Total pengunjung / rombongan masuk</div>
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-white">
                      {formatNum(funnelSummary.stage1Traffic)} Pax
                    </div>
                  </div>

                  <div className="rounded-xl bg-cyan-600/80 border border-cyan-400/30 px-4 py-3 flex items-center justify-between mx-2 sm:mx-4">
                    <div>
                      <div className="text-[11px] uppercase font-bold text-cyan-100">Tahap 2 • Transaksi</div>
                      <div className="text-xs text-cyan-200/80">Konversi transaksi tercatat</div>
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-white">
                      {formatNum(funnelSummary.stage2Transaksi)} Trx
                    </div>
                  </div>

                  <div className="rounded-xl bg-emerald-600/80 border border-emerald-400/30 px-4 py-3 flex items-center justify-between mx-4 sm:mx-8">
                    <div>
                      <div className="text-[11px] uppercase font-bold text-emerald-100">Tahap 3 • Revenue</div>
                      <div className="text-xs text-emerald-200/80">Avg order: {formatIDR(funnelSummary.avgOrderValue)}</div>
                    </div>
                    <div className="text-base sm:text-lg font-extrabold text-white">
                      {formatIDR(funnelSummary.stage3Revenue)}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-3 text-xs">
                  <div className="border-b border-slate-800 pb-2.5">
                    <div className="text-xl font-extrabold text-white">100%</div>
                    <div className="text-slate-400">traffic masuk pada periode terpilih</div>
                  </div>
                  <div className="border-b border-slate-800 pb-2.5">
                    <div className="text-xl font-extrabold text-cyan-300">{funnelSummary.pctTrafficToTrx}%</div>
                    <div className="text-slate-400">berkonversi menjadi transaksi dari traffic</div>
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-amber-300">
                      {formatNum(funnelSummary.trxPer1000Pax)} transaksi per 1.000 pax
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Rata-rata belanja per transaksi: {formatIDR(funnelSummary.avgOrderValue)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                  KPI SCORECARD PER PIC & POSISI (BULANAN)
                </h2>
                <p className="text-xs text-slate-400">
                  <span className="text-emerald-300 font-semibold">Target MTD</span> dihitung otomatis harian dengan rumus <span className="text-white font-semibold">(Target ÷ Jumlah Hari Bulan) × Hari Ke-</span>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs print:hidden">
                <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5">
                  <span className="text-slate-400">Hari Ke-:</span>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={mtdCurrentDay}
                    onChange={(e) => setMtdCurrentDay(Number(e.target.value || 1))}
                    className="w-12 bg-transparent text-cyan-300 font-bold outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5">
                  <span className="text-slate-400">Jumlah Hari Bulan:</span>
                  <input
                    type="number"
                    min="28"
                    max="31"
                    value={mtdDaysInMonth}
                    onChange={(e) => setMtdDaysInMonth(Number(e.target.value || 30))}
                    className="w-12 bg-transparent text-emerald-300 font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            {computedScorecards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden shadow-lg"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs tabular-nums">
                    <thead>
                      <tr>
                        <th className="p-2 border border-slate-800 bg-[#0e131d] text-slate-400 w-36">
                          PIC / NAMA
                        </th>
                        <th
                          colSpan={2}
                          className="p-2 border border-slate-800 bg-amber-300 text-slate-950 font-extrabold text-center uppercase"
                        >
                          {card.picName}
                        </th>
                        <th className="p-2 border border-slate-800 bg-emerald-700 text-white font-bold text-center uppercase">
                          {card.periodeLabel}
                        </th>
                        <th colSpan={6} className="p-2 border border-slate-800 bg-[#0e131d]" />
                      </tr>
                      <tr className="bg-slate-900 text-slate-200 uppercase text-[11px]">
                        <th className="p-2 border border-slate-800">Posisi</th>
                        <th className="p-2 border border-slate-800">Indikator</th>
                        <th className="p-2 border border-slate-800 text-center">Bobot</th>
                        <th className="p-2 border border-slate-800 text-right">Target</th>
                        <th className="p-2 border border-slate-800 text-right">Target MTD (Auto)</th>
                        <th className="p-2 border border-slate-800 text-right">Actual</th>
                        <th className="p-2 border border-slate-800 text-center">%ACV</th>
                        <th className="p-2 border border-slate-800 text-center">%Realisasi</th>
                        <th className="p-2 border border-slate-800 text-center">Skor</th>
                        <th className="p-2 border border-slate-800 text-center">Measurement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {card.rows.map((row, idx) => (
                        <tr key={row.id} className="border-b border-slate-800/80 hover:bg-slate-900/50">
                          {idx === 0 && (
                            <td
                              rowSpan={card.rows.length}
                              className="p-2.5 border border-slate-800 bg-emerald-950/50 text-emerald-200 font-bold uppercase align-middle text-center"
                            >
                              {card.posisi}
                            </td>
                          )}
                          <td className="p-2 border border-slate-800 font-semibold text-white">
                            {row.indikator}
                          </td>
                          <td className="p-2 border border-slate-800 text-center font-bold text-slate-200">
                            {row.bobot}%
                          </td>
                          <td className="p-2 border border-slate-800 text-right">
                            <input
                              type="number"
                              value={row.target}
                              onChange={(e) =>
                                handleUpdateScorecardField(card.id, row.id, 'target', e.target.value)
                              }
                              className="w-32 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-slate-200 font-medium focus:border-emerald-400 outline-none"
                            />
                          </td>
                          <td className="p-2 border border-slate-800 text-right font-semibold text-emerald-300">
                            {formatCellVal(row.targetMtd, row)}
                          </td>
                          <td className="p-2 border border-slate-800 text-right">
                            <input
                              type="number"
                              value={row.actual}
                              onChange={(e) =>
                                handleUpdateScorecardField(card.id, row.id, 'actual', e.target.value)
                              }
                              className="w-32 rounded border border-cyan-500/40 bg-slate-950 px-2 py-1 text-right text-cyan-300 font-semibold focus:border-emerald-400 outline-none"
                            />
                          </td>
                          <td className="p-2 border border-slate-800 text-center font-bold text-amber-300">
                            {row.acvPct}%
                          </td>
                          <td className="p-2 border border-slate-800 text-center font-bold bg-amber-500/15 text-amber-200">
                            {row.realisasiPct}%
                          </td>
                          <td className="p-2 border border-slate-800 text-center font-extrabold text-emerald-300">
                            {row.skorPct}%
                          </td>
                          {idx === 0 && (
                            <td
                              rowSpan={card.rows.length}
                              className="p-0 border border-slate-800 align-middle w-28"
                            >
                              <div className="grid grid-cols-2 text-[10px] font-bold">
                                <div className="p-1 bg-emerald-600/80 text-white text-center border-b border-r border-slate-800">
                                  4
                                </div>
                                <div className="p-1 bg-emerald-900/50 text-emerald-200 text-center border-b border-slate-800">
                                  &gt;100%
                                </div>
                                <div className="p-1 bg-sky-600/80 text-white text-center border-b border-r border-slate-800">
                                  3
                                </div>
                                <div className="p-1 bg-sky-900/40 text-sky-200 text-center border-b border-slate-800">
                                  90%-99%
                                </div>
                                <div className="p-1 bg-amber-500/80 text-slate-950 text-center border-b border-r border-slate-800">
                                  2
                                </div>
                                <div className="p-1 bg-amber-900/40 text-amber-200 text-center border-b border-slate-800">
                                  75%-89%
                                </div>
                                <div className="p-1 bg-rose-600/80 text-white text-center border-r border-slate-800">
                                  1
                                </div>
                                <div className="p-1 bg-rose-900/40 text-rose-200 text-center">
                                  &lt;75%
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      <tr className="bg-slate-900/90 font-bold">
                        <td colSpan={6} className="p-2 border border-slate-800 text-right text-slate-400 text-[11px]">
                          {card.summaryLabel ? `${card.summaryLabel} SKOR` : 'SKOR PENCAPAIAN'}
                        </td>
                        <td colSpan={3} className="p-2 border border-slate-800 text-center bg-cyan-500/20 text-cyan-200 font-extrabold">
                          {card.totalSkorPct}%
                        </td>
                        <td className="p-2 border border-slate-800" />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden shadow-lg">
              <div className="p-3.5 bg-[#0e131d] border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-cyan-300 uppercase tracking-wide">
                    C. STRATEGI INISIATIF — BULANAN
                  </h3>
                  <p className="text-xs text-slate-400">
                    Edit kolom <span className="text-slate-200 font-semibold">Target</span> dan <span className="text-cyan-300 font-semibold">Actual</span> — <span className="text-emerald-300 font-semibold">Target MTD</span> terhitung otomatis per hari (<span className="text-white font-semibold">Target ÷ {mtdDaysInMonth} × {mtdCurrentDay}</span>), lalu <span className="text-amber-300 font-semibold">Presentase</span>, <span className="text-amber-300 font-semibold">Nilai Perform</span>, dan <span className="text-rose-300 font-semibold">Gap SO</span> terhitung otomatis.
                  </p>
                </div>
                <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-lg">
                  {computedStrategi.length} Kelompok SO
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] sm:text-xs tabular-nums">
                  <thead>
                    <tr className="bg-[#0f2942] text-white uppercase">
                      <th className="p-2 border border-slate-800 w-12 text-center">NO</th>
                      <th className="p-2 border border-slate-800">SO</th>
                      <th className="p-2 border border-slate-800 text-center w-16">BOBOT</th>
                      <th className="p-2 border border-slate-800 text-center w-24">PIC</th>
                      <th className="p-2 border border-slate-800">SI</th>
                      <th className="p-2 border border-slate-800 text-right">Target</th>
                      <th className="p-2 border border-slate-800 text-right">Target MTD</th>
                      <th className="p-2 border border-slate-800 text-right">Actual</th>
                      <th className="p-2 border border-slate-800 text-center">Presentase</th>
                      <th className="p-2 border border-slate-800 text-center">Nilai Perform</th>
                      <th className="p-2 border border-slate-800 text-right bg-rose-950/60 text-rose-200">Gap SO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computedStrategi.map((group) => (
                      <React.Fragment key={group.id}>
                        {group.rows.map((row, idx) => {
                          const isVacant = group.pic.toLowerCase() === 'vacant';

                          return (
                            <tr key={row.id} className="border-b border-slate-800/80 hover:bg-slate-900/60">
                              {idx === 0 && (
                                <>
                                  <td
                                    rowSpan={group.rows.length + 1}
                                    className="p-2 border border-slate-800 text-center font-bold text-slate-200 align-middle"
                                  >
                                    {group.no}
                                  </td>
                                  <td
                                    rowSpan={group.rows.length + 1}
                                    className="p-2 border border-slate-800 font-semibold text-white align-middle"
                                  >
                                    {group.so}
                                  </td>
                                  <td
                                    rowSpan={group.rows.length + 1}
                                    className="p-2 border border-slate-800 text-center font-bold text-cyan-200 align-middle"
                                  >
                                    {group.bobot}%
                                  </td>
                                  <td
                                    rowSpan={group.rows.length + 1}
                                    className={`p-2 border border-slate-800 text-center font-bold align-middle ${
                                      isVacant ? 'text-rose-400' : 'text-emerald-200'
                                    }`}
                                  >
                                    {group.pic}
                                  </td>
                                </>
                              )}
                              <td className="p-2 border border-slate-800 text-slate-200">{row.si}</td>
                              <td className="p-2 border border-slate-800 text-right">
                                <input
                                  type="number"
                                  value={row.target}
                                  onChange={(e) =>
                                    handleUpdateStrategiField(group.id, row.id, 'target', e.target.value)
                                  }
                                  className="w-20 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-slate-200 font-medium focus:border-cyan-400 outline-none"
                                />
                              </td>
                              <td className="p-2 border border-slate-800 text-right font-semibold text-emerald-300">
                                {formatNum(row.targetMtd)}
                              </td>
                              <td className="p-2 border border-slate-800 text-right">
                                <input
                                  type="number"
                                  value={row.actual}
                                  onChange={(e) =>
                                    handleUpdateStrategiField(group.id, row.id, 'actual', e.target.value)
                                  }
                                  className="w-20 rounded border border-cyan-500/40 bg-slate-950 px-2 py-1 text-right text-cyan-300 font-semibold focus:border-emerald-400 outline-none"
                                />
                              </td>
                              <td
                                className={`p-2 border border-slate-800 text-center font-bold ${
                                  row.pct >= 100 ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-200'
                                }`}
                              >
                                {row.pct}%
                              </td>
                              <td className="p-2 border border-slate-800 text-center font-extrabold text-amber-300">
                                {row.nilaiPerform}%
                              </td>
                              <td
                                className={`p-2 border border-slate-800 text-right font-bold ${
                                  row.gapSo < 0 ? 'text-rose-400' : 'text-emerald-400'
                                }`}
                              >
                                {row.gapSo > 0 ? `+${formatNum(row.gapSo)}` : formatNum(row.gapSo)}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-bold">
                          <td colSpan={4} className="p-1.5 border border-slate-800 text-right text-slate-400">
                            Rata-rata Nilai Perform SO {group.no}
                          </td>
                          <td className="p-1.5 border border-slate-800 text-center text-amber-200 bg-amber-500/10">
                            {group.avgPerform}%
                          </td>
                          <td className="p-1.5 border border-slate-800" />
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workspace' && (
          <div className="space-y-5">
            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                  Workspace Sales & Marketing — Checklist SPV/PIC, Playbook & EAF
                </h2>
                <p className="text-xs text-slate-400">
                  Kelola workspace harian per PIC, standar eksekusi sales/event, dan pencatatan pengajuan EAF
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 print:hidden">
                {[
                  { id: 'checklist', label: 'Workspace & Checklist SPV', icon: ClipboardCheck },
                  { id: 'playbook', label: 'Playbook Sales & Event', icon: BookOpen },
                  { id: 'eaf', label: 'Pencatatan EAF', icon: Wallet }
                ].map((sub) => {
                  const SubIcon = sub.icon;
                  const active = workspaceSubTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setWorkspaceSubTab(sub.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        active
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <SubIcon className="w-3.5 h-3.5" />
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {workspaceSubTab === 'checklist' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-300 uppercase">Filter Workspace PIC:</span>
                    <select
                      value={selectedPicWorkspace}
                      onChange={(e) => setSelectedPicWorkspace(e.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-cyan-300 font-semibold"
                    >
                      <option value="ALL">Semua PIC / SPV</option>
                      {pics
                        .filter((p) => p.nama !== 'VACANT')
                        .map((p) => (
                          <option key={p.id} value={p.nama}>
                            {p.nama} ({p.posisi})
                          </option>
                        ))}
                    </select>
                  </div>
                  <span className="text-emerald-300 font-bold">
                    Selesai: {filteredChecklists.filter((c) => c.done).length} / {filteredChecklists.length} Checklist
                  </span>
                </div>

                <form
                  onSubmit={handleAddChecklist}
                  className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs print:hidden"
                >
                  <select
                    value={newChecklist.pic}
                    onChange={(e) => setNewChecklist({ ...newChecklist, pic: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    {pics
                      .filter((p) => p.nama !== 'VACANT')
                      .map((p) => (
                        <option key={p.id} value={p.nama}>
                          PIC: {p.nama} ({p.posisi})
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Kategori (mis. Follow Up Mitra)"
                    value={newChecklist.kategori}
                    onChange={(e) => setNewChecklist({ ...newChecklist, kategori: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Isi item checklist harian / SPV..."
                    value={newChecklist.item}
                    onChange={(e) => setNewChecklist({ ...newChecklist, item: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Checklist
                  </button>
                </form>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-2.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase">
                      Checklist Harian & Kontrol SPV
                    </h3>
                    {filteredChecklists.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleToggleChecklist(c.id)}
                        className={`w-full text-left rounded-xl border p-3 transition flex items-start gap-3 text-xs ${
                          c.done
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-slate-300'
                            : 'border-slate-800 bg-slate-950/80 text-white hover:border-slate-700'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            c.done ? 'text-emerald-400' : 'text-slate-600'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-cyan-300">{c.pic}</span>
                            <span className="text-[10px] rounded bg-slate-800 px-2 py-0.5 text-slate-300">
                              {c.kategori}
                            </span>
                          </div>
                          <div className={`mt-1 ${c.done ? 'line-through text-slate-400' : ''}`}>
                            {c.item}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-2.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase">
                      Task Aktif PIC ({filteredTasksWorkspace.length})
                    </h3>
                    {filteredTasksWorkspace.map((t) => (
                      <div
                        key={t.id}
                        className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-amber-300">{t.pic}</span>
                          <span className="text-[11px] text-slate-400">{t.tanggal} • {t.status}</span>
                        </div>
                        <div className="font-semibold text-white">{t.judul}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {workspaceSubTab === 'playbook' && (
              <div className="space-y-4">
                <form
                  onSubmit={handleAddPlaybook}
                  className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs print:hidden"
                >
                  <input
                    type="text"
                    placeholder="Judul Playbook / SOP Sales..."
                    value={newPlaybook.judul}
                    onChange={(e) => setNewPlaybook({ ...newPlaybook, judul: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                    required
                  />
                  <select
                    value={newPlaybook.kanal}
                    onChange={(e) => setNewPlaybook({ ...newPlaybook, kanal: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    {pics.map((p) => (
                      <option key={p.id} value={p.posisi}>
                        {p.posisi}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Tambah Playbook
                  </button>
                  <textarea
                    rows={2}
                    placeholder="Langkah eksekusi, script pendekatan mitra, atau standar layanan..."
                    value={newPlaybook.ringkasan}
                    onChange={(e) => setNewPlaybook({ ...newPlaybook, ringkasan: e.target.value })}
                    className="sm:col-span-3 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                    required
                  />
                </form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {playbooks.map((pb) => (
                    <div
                      key={pb.id}
                      className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-2 text-xs"
                    >
                      <span className="inline-block rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 font-bold text-[10px] uppercase">
                        {pb.kanal}
                      </span>
                      <h3 className="text-sm font-bold text-white">{pb.judul}</h3>
                      <p className="text-slate-300 leading-relaxed">{pb.ringkasan}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {workspaceSubTab === 'eaf' && (
              <div className="space-y-4">
                <form
                  onSubmit={handleAddEaf}
                  className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs print:hidden"
                >
                  <input
                    type="text"
                    placeholder="Kode EAF (opsional)"
                    value={newEaf.kode}
                    onChange={(e) => setNewEaf({ ...newEaf, kode: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Judul Pengajuan EAF..."
                    value={newEaf.judul}
                    onChange={(e) => setNewEaf({ ...newEaf, judul: e.target.value })}
                    className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                    required
                  />
                  <select
                    value={newEaf.pengaju}
                    onChange={(e) => setNewEaf({ ...newEaf, pengaju: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    {pics
                      .filter((p) => p.nama !== 'VACANT')
                      .map((p) => (
                        <option key={p.id} value={p.nama}>
                          {p.nama}
                        </option>
                      ))}
                  </select>
                  <input
                    type="number"
                    min="0"
                    placeholder="Estimasi Budget (Rp)"
                    value={newEaf.estimasiBudget}
                    onChange={(e) => setNewEaf({ ...newEaf, estimasiBudget: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Catat EAF
                  </button>
                </form>

                <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs tabular-nums">
                      <thead>
                        <tr className="bg-slate-900 text-slate-300 uppercase">
                          <th className="p-2.5 border border-slate-800">Kode EAF</th>
                          <th className="p-2.5 border border-slate-800">Tanggal</th>
                          <th className="p-2.5 border border-slate-800">Keperluan / Aktivasi</th>
                          <th className="p-2.5 border border-slate-800">Pengaju</th>
                          <th className="p-2.5 border border-slate-800 text-right">Estimasi Budget</th>
                          <th className="p-2.5 border border-slate-800 text-right">Target Revenue</th>
                          <th className="p-2.5 border border-slate-800 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eafRecords.map((item) => (
                          <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-900/50">
                            <td className="p-2.5 border border-slate-800 font-bold text-cyan-300">{item.kode}</td>
                            <td className="p-2.5 border border-slate-800">{item.tanggal}</td>
                            <td className="p-2.5 border border-slate-800 font-semibold text-white">{item.judul}</td>
                            <td className="p-2.5 border border-slate-800 text-emerald-200">{item.pengaju}</td>
                            <td className="p-2.5 border border-slate-800 text-right font-semibold text-amber-300">
                              {formatIDR(item.estimasiBudget)}
                            </td>
                            <td className="p-2.5 border border-slate-800 text-right font-semibold text-emerald-300">
                              {formatIDR(item.estimasiRevenue)}
                            </td>
                            <td className="p-2.5 border border-slate-800 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleEafStatus(item.id)}
                                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                                  item.status === 'Approved' || item.status === 'Done'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                {item.status}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-5">
            <form
              onSubmit={handleAddTask}
              className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs print:hidden"
            >
              <input
                type="text"
                placeholder="Judul agenda / schedule sales..."
                value={newTask.judul}
                onChange={(e) => setNewTask({ ...newTask, judul: e.target.value })}
                className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                required
              />
              <select
                value={newTask.pic}
                onChange={(e) => setNewTask({ ...newTask, pic: e.target.value })}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
              >
                {pics.map((p) => (
                  <option key={p.id} value={p.nama}>
                    {p.posisi} — {p.nama}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={newTask.tanggal}
                onChange={(e) => setNewTask({ ...newTask, tanggal: e.target.value })}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
              />
              <input
                type="time"
                value={newTask.waktu}
                onChange={(e) => setNewTask({ ...newTask, waktu: e.target.value })}
                className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Tambah Schedule
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((t) => {
                const gcalLink = buildGoogleCalendarUrl(
                  t.judul,
                  t.tanggal,
                  t.waktu,
                  `PIC: ${t.pic} | Kanal: ${t.kanal} | Prioritas: ${t.prioritas}`
                );
                return (
                  <div
                    key={t.id}
                    className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 font-semibold">
                          {t.kanal}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 font-semibold ${
                            t.status === 'Done'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {t.status} ({t.progress}%)
                        </span>
                      </div>
                      <h3 className="mt-2.5 text-sm font-bold text-white">{t.judul}</h3>
                      <p className="mt-1 text-xs text-slate-400">PIC: {t.pic}</p>
                      <p className="mt-1 text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" /> {t.tanggal} • {t.waktu}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 print:hidden">
                      <button
                        type="button"
                        onClick={() => handleToggleTaskStatus(t.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {t.status === 'Done' ? 'Buka Kembali' : 'Tandai Done'}
                      </button>

                      <a
                        href={gcalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 px-2.5 py-1.5 text-xs font-semibold text-sky-300"
                      >
                        Google Calendar <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'tim' && (
          <div className="space-y-5">
            <form
              onSubmit={handleAddPic}
              className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs print:hidden"
            >
              <div>
                <label className="block text-slate-400 mb-1">Posisi Baru</label>
                <input
                  type="text"
                  placeholder="Contoh: CORPORATE SALES"
                  value={newPicPos}
                  onChange={(e) => setNewPicPos(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Nama PIC (kosongkan jika VACANT)</label>
                <input
                  type="text"
                  placeholder="Nama lengkap PIC"
                  value={newPicName}
                  onChange={(e) => setNewPicName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Tambah Posisi & PIC
                </button>
              </div>
            </form>

            <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden">
              <div className="p-3.5 bg-[#99d5c9] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-between">
                <span>STRUKTUR POSISI & NAMA PIC SALES MARKETING</span>
                <span>{pics.length} POSISI</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 uppercase text-xs">
                      <th className="p-3 border border-slate-800 w-12">No</th>
                      <th className="p-3 border border-slate-800">Posisi</th>
                      <th className="p-3 border border-slate-800">Nama</th>
                      <th className="p-3 border border-slate-800 text-right w-36 print:hidden">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pics.map((p, index) => {
                      const isEditing = editingPicId === p.id;
                      const isVacant = p.nama === 'VACANT';
                      return (
                        <tr key={p.id} className="bg-[#07090e] hover:bg-slate-900/70 border-b border-slate-800">
                          <td className="p-3 border border-slate-800 text-slate-400">{index + 1}</td>
                          <td className="p-3 border border-slate-800 font-bold text-white uppercase">{p.posisi}</td>
                          <td className="p-3 border border-slate-800 uppercase">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editingPicName}
                                onChange={(e) => setEditingPicName(e.target.value)}
                                className="w-full rounded border border-emerald-500 bg-slate-950 px-2.5 py-1 text-white"
                              />
                            ) : (
                              <span
                                className={
                                  isVacant
                                    ? 'rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 text-xs font-bold'
                                    : 'font-semibold text-emerald-200'
                                }
                              >
                                {p.nama}
                              </span>
                            )}
                          </td>
                          <td className="p-3 border border-slate-800 text-right print:hidden">
                            {isEditing ? (
                              <button
                                type="button"
                                onClick={() => handleSavePicEdit(p.id)}
                                className="rounded bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 text-xs"
                              >
                                Simpan
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPicId(p.id);
                                  setEditingPicName(p.nama);
                                }}
                                className="inline-flex items-center gap-1 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 text-xs text-slate-200"
                              >
                                <Edit3 className="w-3 h-3" /> Edit Nama
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mom_ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <form
                onSubmit={handleAddMom}
                className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-3 text-xs print:hidden"
              >
                <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" /> Pencatat MOM / Notulensi Rapat
                </h2>
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Judul rapat / briefing"
                    value={newMom.judul}
                    onChange={(e) => setNewMom({ ...newMom, judul: e.target.value })}
                    className="col-span-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                    required
                  />
                  <input
                    type="date"
                    value={newMom.tanggal}
                    onChange={(e) => setNewMom({ ...newMom, tanggal: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                  <select
                    value={newMom.picAction}
                    onChange={(e) => setNewMom({ ...newMom, picAction: e.target.value })}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    {pics.map((p) => (
                      <option key={p.id} value={p.nama}>
                        PIC Action: {p.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  rows={3}
                  placeholder="Ringkasan pembahasan & keputusan rapat..."
                  value={newMom.poinPembahasan}
                  onChange={(e) => setNewMom({ ...newMom, poinPembahasan: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Action item utama yang harus dieksekusi..."
                  value={newMom.actionItem}
                  onChange={(e) => setNewMom({ ...newMom, actionItem: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2"
                >
                  Simpan Notulensi MOM
                </button>
              </form>

              <div className="space-y-3">
                {moms.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{m.judul}</span>
                      <span className="text-slate-400">{m.tanggal}</span>
                    </div>
                    <p className="text-slate-400">Peserta: {m.peserta}</p>
                    <p className="text-slate-200 leading-relaxed">{m.poinPembahasan}</p>
                    {m.actionItem && (
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-amber-300 font-medium">
                          Action: {m.actionItem} ({m.picAction})
                        </span>
                        <button
                          type="button"
                          disabled={m.convertedToTask}
                          onClick={() => handleConvertMomToTask(m)}
                          className={`rounded px-2.5 py-1 font-semibold print:hidden ${
                            m.convertedToTask
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
                          }`}
                        >
                          {m.convertedToTask ? 'Sudah Jadi Task' : 'Jadikan Task'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 flex flex-col justify-between h-[560px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white uppercase">
                    AI Problem Solver Real-Time
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleAskAi('Buatkan diagnosis masalah revenue & traffic W1–W5 serta rencana aksi 7 hari ke depan.')
                  }
                  className="rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 px-2.5 py-1 text-xs font-semibold text-emerald-300 print:hidden"
                >
                  Auto-Diagnosa Sekarang
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-3 text-xs">
                {aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-3 whitespace-pre-line leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30 ml-8'
                        : 'bg-slate-950 text-slate-200 border border-slate-800 mr-4'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {aiLoading && (
                  <div className="text-slate-400 italic flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" /> Menganalisis data Sales & Marketing...
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAi();
                }}
                className="pt-3 border-t border-slate-800 flex items-center gap-2 print:hidden"
              >
                <input
                  type="text"
                  placeholder="Tanyakan solusi kendala traffic, konversi, atau pembagian tugas PIC..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-slate-800 bg-[#090c12]/95 backdrop-blur grid grid-cols-8 print:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`py-2 flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold ${
                active ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="truncate max-w-[40px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
