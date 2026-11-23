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
  Table2
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

const STORAGE_KEY = 'sm_command_center_v5';
const AUTH_SESSION_KEY = 'sm_command_center_unlocked_v1';
const ACCESS_PASSCODE = import.meta.env.VITE_APP_PASSCODE || 'SM2026';

const MONTHS_2026 = [
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
  { id: 'pic-14', posisi: 'ADMIN & ASISTEN', nama: 'WINDA', status: 'Active' },
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
  MONTHS_2026.reduce((acc, m) => ({ ...acc, [m.key]: defaultVal }), {});

const INITIAL_ANNUAL_REPORT = [
  {
    id: 'ar-1',
    item: 'TARGET SALES STORE',
    type: 'input',
    format: 'currency',
    values: {
      ...createEmptyMonthMap(0),
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
    }
  },
  {
    id: 'ar-2',
    item: 'ACTUAL SALES STORE',
    type: 'input',
    format: 'currency',
    values: {
      ...createEmptyMonthMap(0),
      jan: 6065185960,
      feb: 3288294648,
      mar: 5272968813,
      apr: 3903394090,
      may: 4861314523,
      jun: 4431189141,
      jul: 4372321694,
      aug: 4354220796,
      sep: 3223215545715,
      oct: 3544965525
    }
  },
  {
    id: 'ar-3',
    item: 'TRAFFIC PENGUNJUNG',
    type: 'input',
    format: 'number',
    values: {
      ...createEmptyMonthMap(0),
      jan: 35393,
      feb: 316464,
      mar: 21304,
      apr: 23071,
      may: 25424,
      jun: 23705,
      jul: 21510,
      aug: 21920,
      sep: 18306,
      oct: 19473
    }
  },
  {
    id: 'ar-4',
    item: 'TRANSAKSI',
    type: 'input',
    format: 'number',
    values: {
      ...createEmptyMonthMap(0),
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
    }
  },
  {
    id: 'ar-5',
    item: 'TRANSAKSI ROMBONGAN',
    type: 'input',
    format: 'number',
    values: {
      ...createEmptyMonthMap(0),
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
    }
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
    values: {
      ...createEmptyMonthMap(0),
      jan: 450367,
      feb: 433114,
      mar: 455030,
      apr: 480451,
      may: 492815,
      jun: 421598,
      jul: 448102,
      aug: 416992,
      sep: 39380289,
      oct: 422255
    }
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
    values: {
      ...createEmptyMonthMap(0),
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
    }
  },
  {
    id: 'ar-11',
    item: 'ACTUAL SALES ROMBONGAN',
    type: 'input',
    format: 'currency',
    values: {
      ...createEmptyMonthMap(0),
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
    }
  },
  {
    id: 'ar-12',
    item: 'ACTUAL KOMISI TRAVEL',
    type: 'input',
    format: 'currency',
    values: {
      ...createEmptyMonthMap(0),
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
    }
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
    item: 'KONTRIBUSI ROMBONGAN VS SALES',
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
    values: {
      ...createEmptyMonthMap(0),
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
    }
  },
  {
    id: 'ar-16',
    item: 'ACHIEVEMENT SALES OFFLINE',
    type: 'input',
    format: 'currency',
    values: {
      ...createEmptyMonthMap(0),
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
  },
  {
    id: 'ar-17',
    item: 'PERCENTAGE ACHIEVEMENT OFFLINE',
    type: 'formula',
    formula: 'pct_offline',
    format: 'percent',
    values: createEmptyMonthMap(0)
  },
  {
    id: 'ar-18',
    item: 'KONTRIBUSI SALES OFFLINE VS SALES STORE',
    type: 'formula',
    formula: 'contrib_offline_vs_store',
    format: 'percent',
    values: createEmptyMonthMap(0)
  }
];

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

const formatCellVal = (val, row) => {
  const num = Number(val || 0);
  if (row?.isCurrency) return formatNum(num);
  if (row?.isPercentValue) return `${num}%`;
  return formatNum(num);
};

const formatAnnualCell = (val, fmt) => {
  const num = Number(val || 0);
  if (fmt === 'currency') return formatNum(num);
  if (fmt === 'percent') return `${num.toFixed(1)}%`;
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

// Rumus Target MTD harian: target / jumlah hari per bulan * hari ke-
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
    return Math.round(bbt * factor);
  }

  return act > 0 ? bbt : 0;
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
  const [periodMode, setPeriodMode] = useState('mingguan');
  const [selectedWeek, setSelectedWeek] = useState('ALL');
  const [customStart, setCustomStart] = useState('2026-11-01');
  const [customEnd, setCustomEnd] = useState('2026-11-23');
  const [selectedKanalFilter, setSelectedKanalFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Pengaturan Target MTD Otomatis Harian: target / jumlah hari bulan * hari ke-
  const [mtdDaysInMonth, setMtdDaysInMonth] = useState(30);
  const [mtdCurrentDay, setMtdCurrentDay] = useState(23);

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

  const [annualReportRows, setAnnualReportRows] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.annualReportRows || INITIAL_ANNUAL_REPORT;
    } catch {
      return INITIAL_ANNUAL_REPORT;
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

  const [lastSavedAt, setLastSavedAt] = useState(() => new Date().toLocaleTimeString('id-ID'));

  const [formAcq, setFormAcq] = useState({
    tanggal: '2026-11-23',
    minggu: 'W4',
    waktu: '14:00',
    kanal: 'GUIDE',
    pic: 'NADIA',
    instansi: '',
    program: 'DINNER + SHOPPING',
    venue: 'TEATER SABA & BELANJA',
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
      text: 'Halo! AI Strategist aktif & siap dipakai. Tanya saya soal perbandingan W1–W5, annual report 2026, sales POS & basket size, target MTD harian, skor KPI tiap PIC, Strategi Inisiatif (SI) & Nilai Perform, posisi VACANT, atau rencana aksi 7 hari.'
    }
  ]);

  useEffect(() => {
    try {
      const payload = {
        pics,
        scorecards,
        strategiInisiatif,
        annualReportRows,
        acquisitions,
        weeklyMetrics,
        posMetrics,
        tasks,
        moms
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
    annualReportRows,
    acquisitions,
    weeklyMetrics,
    posMetrics,
    tasks,
    moms
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

  const handleUpdateAnnualCell = (rowId, monthKey, val) => {
    setAnnualReportRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              values: {
                ...r.values,
                [monthKey]: Number(val || 0)
              }
            }
          : r
      )
    );
  };

  const computedAnnualReport = useMemo(() => {
    const getVal = (id, mKey) => {
      const found = annualReportRows.find((r) => r.id === id);
      return Number(found?.values?.[mKey] || 0);
    };

    return annualReportRows.map((row) => {
      const monthComputed = {};
      MONTHS_2026.forEach((m) => {
        const mk = m.key;
        if (row.type === 'input') {
          monthComputed[mk] = Number(row.values?.[mk] || 0);
          return;
        }

        const actualStore = getVal('ar-2', mk);
        const trxAll = getVal('ar-4', mk);
        const trxRombongan = getVal('ar-5', mk);
        const budgetSales = getVal('ar-7', mk);
        const salesRombongan = getVal('ar-11', mk);
        const komisiTravel = getVal('ar-12', mk);
        const achOffline = getVal('ar-16', mk);

        if (row.formula === 'basket_size_all') {
          monthComputed[mk] = trxAll > 0 ? Math.round(actualStore / trxAll) : 0;
        } else if (row.formula === 'budget_impact') {
          monthComputed[mk] = actualStore > 0 ? Number(((budgetSales / actualStore) * 100).toFixed(1)) : 0;
        } else if (row.formula === 'contrib_trx_rombongan') {
          monthComputed[mk] = trxAll > 0 ? Number(((trxRombongan / trxAll) * 100).toFixed(1)) : 0;
        } else if (row.formula === 'komisi_vs_driver') {
          monthComputed[mk] = salesRombongan > 0 ? Number(((komisiTravel / salesRombongan) * 100).toFixed(1)) : 0;
        } else if (row.formula === 'contrib_rombongan_vs_sales') {
          monthComputed[mk] = actualStore > 0 ? Number(((salesRombongan / actualStore) * 100).toFixed(1)) : 0;
        } else if (row.formula === 'pct_offline') {
          const targetOff = getVal('ar-15', mk);
          monthComputed[mk] = targetOff > 0 ? Number(((achOffline / targetOff) * 100).toFixed(1)) : 0;
        } else if (row.formula === 'contrib_offline_vs_store') {
          monthComputed[mk] = actualStore > 0 ? Number(((achOffline / actualStore) * 100).toFixed(1)) : 0;
        } else {
          monthComputed[mk] = 0;
        }
      });

      const sumAllMonths = MONTHS_2026.reduce((s, m) => s + Number(monthComputed[m.key] || 0), 0);
      const countActiveMonths = MONTHS_2026.filter((m) => Number(monthComputed[m.key] || 0) !== 0).length;
      const totalColValue =
        row.format === 'percent'
          ? countActiveMonths > 0
            ? Number((sumAllMonths / countActiveMonths).toFixed(1))
            : 0
          : row.formula === 'basket_size_all'
          ? countActiveMonths > 0
            ? Math.round(sumAllMonths / countActiveMonths)
            : 0
          : sumAllMonths;

      return {
        ...row,
        computedValues: monthComputed,
        totalValue: totalColValue
      };
    });
  }, [annualReportRows]);

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
        labelBand: `${curr.minggu} (${curr.label || ''})`
      };
    }

    const totalRev = posMetrics.reduce((s, w) => s + Number(w.revenuePos || 0), 0);
    const totalTraf = posMetrics.reduce((s, w) => s + Number(w.trafficPos || 0), 0);
    const totalTrx = posMetrics.reduce((s, w) => s + Number(w.transaksiPos || 0), 0);
    const multiplier = periodMode === 'tahunan' ? 12 : 1;
    const revFinal = totalRev * multiplier;
    const trxFinal = totalTrx * multiplier;

    return {
      revenuePos: revFinal,
      trafficPos: totalTraf * multiplier,
      transaksiPos: trxFinal,
      basketSize: calcBasketSize(revFinal, trxFinal),
      labelBand:
        periodMode === 'mingguan'
          ? 'Total POS W1–W5'
          : periodMode === 'bulanan'
          ? 'Bulanan POS (W1–W5)'
          : periodMode === 'tahunan'
          ? 'Tahunan POS 2026'
          : 'POS Periode Aktif'
    };
  }, [posMetrics, selectedWeek, periodMode]);

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
    setAcquisitions((prev) => prev.filter((item) => item.id !== id));
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

      let matchDate = true;
      if (periodMode === 'harian') {
        matchDate = row.tanggal === customEnd;
      } else if (periodMode === 'custom') {
        matchDate = row.tanggal >= customStart && row.tanggal <= customEnd;
      } else if (periodMode === 'bulanan') {
        matchDate = row.tanggal.startsWith('2026-11');
      } else if (periodMode === 'tahunan') {
        matchDate = row.tanggal.startsWith('2026');
      }
      return matchKanal && matchWeek && matchSearch && matchDate;
    });
  }, [acquisitions, selectedKanalFilter, selectedWeek, searchQuery, periodMode, customStart, customEnd]);

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
      const dayItems = acquisitions.filter((a) => a.tanggal === customEnd);
      const prevDateObj = new Date(customEnd || '2026-11-23');
      prevDateObj.setDate(prevDateObj.getDate() - 1);
      const prevDateStr = prevDateObj.toISOString().split('T')[0];
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
        labelBand: `Harian (${customEnd})`,
        compareNote: 'vs hari sebelumnya'
      };
    }

    if (periodMode === 'custom') {
      const rangeItems = acquisitions.filter(
        (a) => a.tanggal >= customStart && a.tanggal <= customEnd
      );
      const rev = rangeItems.reduce((s, x) => s + Number(x.revenue || 0), 0);
      const traf = rangeItems.reduce((s, x) => s + Number(x.pax || 0), 0);
      const trx = rangeItems.reduce((s, x) => s + Number(x.transaksi || 0), 0);
      return {
        revenue: rev,
        traffic: traf,
        transaksi: trx,
        revPct: 12.4,
        trafPct: 8.7,
        trxPct: 10.2,
        labelBand: `Custom (${customStart} s/d ${customEnd})`,
        compareNote: 'vs rentang sebelumnya'
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
        labelBand: `${curr.minggu} (${curr.label || ''})`,
        compareNote: prev ? `vs ${prev.minggu}` : 'Minggu awal (baseline)'
      };
    }

    const totalRev = weeklyMetrics.reduce((s, w) => s + Number(w.revenue || 0), 0);
    const totalTraf = weeklyMetrics.reduce((s, w) => s + Number(w.traffic || 0), 0);
    const totalTrx = weeklyMetrics.reduce((s, w) => s + Number(w.transaksi || 0), 0);
    const w3 = weeklyMetrics[2] || { revenue: 0, traffic: 0, transaksi: 0 };
    const w2 = weeklyMetrics[1] || { revenue: 0, traffic: 0, transaksi: 0 };
    const multiplier = periodMode === 'tahunan' ? 12 : 1;

    return {
      revenue: totalRev * multiplier,
      traffic: totalTraf * multiplier,
      transaksi: totalTrx * multiplier,
      revPct: calcPctChange(w3.revenue, w2.revenue),
      trafPct: calcPctChange(w3.traffic, w2.traffic),
      trxPct: calcPctChange(w3.transaksi, w2.transaksi),
      labelBand:
        periodMode === 'mingguan'
          ? 'Total W1–W5'
          : periodMode === 'bulanan'
          ? 'Bulanan (W1–W5)'
          : 'Tahunan 2026',
      compareNote: 'tren W3 vs W2'
    };
  }, [periodMode, selectedWeek, weeklyMetrics, acquisitions, customStart, customEnd]);

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
        const acvPct = targetVal > 0 ? Math.round((actualVal / targetVal) * 100) : 0;
        const realisasiPct = Math.min(100, acvPct);
        const skorPct = Math.round((realisasiPct * Number(r.bobot || 0)) / 100);
        return {
          ...r,
          targetMtd: targetMtdAuto,
          acvPct,
          realisasiPct,
          skorPct
        };
      });

      const totalSkorPct = rowsCalc.reduce((sum, item) => sum + item.skorPct, 0);
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
        const pct = targetNum > 0 ? Math.round((actualNum / targetNum) * 100) : 0;
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
          ? Math.round(rowsCalc.reduce((acc, item) => acc + item.nilaiPerform, 0) / rowsCalc.length)
          : 0;

      return {
        ...group,
        rows: rowsCalc,
        avgPerform
      };
    });
  }, [strategiInisiatif, mtdDaysInMonth, mtdCurrentDay]);

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
        annualReportRows,
        acquisitions,
        weeklyMetrics,
        posMetrics,
        tasks,
        moms
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
        if (parsed.annualReportRows) setAnnualReportRows(parsed.annualReportRows);
        if (parsed.acquisitions) setAcquisitions(parsed.acquisitions);
        if (parsed.weeklyMetrics) setWeeklyMetrics(parsed.weeklyMetrics);
        if (parsed.posMetrics) setPosMetrics(parsed.posMetrics);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.moms) setMoms(parsed.moms);
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
        `Sales POS (${posSummary.labelBand}):\n• Revenue POS: ${formatIDR(posSummary.revenuePos)} | Traffic POS: ${formatNum(posSummary.trafficPos)} Pax | Transaksi POS: ${formatNum(posSummary.transaksiPos)} Trx | Basket Size: ${formatIDR(posSummary.basketSize)}`
      );
      lines.push(`Skor KPI per PIC:\n${scoreList}`);
      if (vacantPositions.length > 0) {
        lines.push(`Perhatian Posisi VACANT: ${vacantPositions.join(', ')} perlu backup eksekusi harian.`);
      }
      lines.push(
        `Rencana Aksi 7 Hari:\n1. Update Target, Target MTD harian (hari ke-${mtdCurrentDay}/${mtdDaysInMonth}), dan Actual di tab KPI & FUNNEL.\n2. Kunci jadwal rombongan & event masuk ke Schedule dan Google Calendar.\n3. Follow up mitra aktif (Guide, Travel, EO, Pemerintahan) serta tutup action item di MOM.`
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
      .map((r) => `${r.minggu}: Rev ${formatIDR(r.revenue)} (${r.revGrowth}%), Pax ${r.traffic}`)
      .join(' | ');
    const posSummaryText = `Revenue POS ${formatIDR(posSummary.revenuePos)}, Traffic POS ${formatNum(posSummary.trafficPos)}, Transaksi POS ${formatNum(posSummary.transaksiPos)}, Basket Size ${formatIDR(posSummary.basketSize)}`;
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
                      text: `Anda adalah konsultan operasional Sales Marketing. Jawab singkat, jelas, dan actionable dalam Bahasa Indonesia.\nPerbandingan W1-W5: ${weeklySummaryText}\nSales POS: ${posSummaryText}\nSkor KPI per PIC: ${scorecardSummary}\nStrategi Inisiatif: ${siSummary}\nPosisi VACANT: ${vacantPositions.join(', ')}\nPertanyaan: ${queryText}`
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
    { id: 'annual', label: 'ANNUAL 2026', icon: Table2 },
    { id: 'perbandingan', label: 'W1–W5 & PERIODE', icon: Layers },
    { id: 'kpi', label: 'KPI & FUNNEL', icon: Target },
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
            Internal Sales & Marketing Division • Terlindungi Kunci Akses
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
              SM
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-wide text-white uppercase print:text-black">
                Sales & Marketing Command Center
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 print:text-slate-600">
                <span className="inline-flex items-center gap-1 text-emerald-400 print:text-black">
                  <ShieldCheck className="w-3.5 h-3.5" /> Auto-Backup Aktif ({lastSavedAt})
                </span>
                <span>•</span>
                <span>Report Sales & Marketing November 2026</span>
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
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider border-b-2 transition whitespace-nowrap ${
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

          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase">
              Pilih Minggu:
            </span>
            {['ALL', 'W1', 'W2', 'W3', 'W4', 'W5'].map((wk) => (
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
                {wk === 'ALL' ? 'SEMUA (W1–W5)' : wk}
              </button>
            ))}
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
                    {['W1', 'W2', 'W3', 'W4', 'W5'].map((wk) => (
                      <option key={wk} value={wk}>
                        {wk}
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
                            {row.minggu} <span className="text-[10px] font-normal text-slate-400">({row.label})</span>
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

            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 print:bg-white print:border-slate-300">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide print:text-black">
                    Perbandingan Cepat W1 – W5 (Ketuk Kartu untuk Filter Minggu)
                  </h2>
                  <p className="text-[11px] text-slate-400 print:text-slate-600">
                    Perbandingan langsung Revenue, Traffic, Transaksi, dan % pertumbuhan tiap minggu
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
                    <button
                      key={item.minggu}
                      type="button"
                      onClick={() => setSelectedWeek(isSelected ? 'ALL' : item.minggu)}
                      className={`text-left rounded-xl border p-3 transition ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/10'
                          : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-cyan-300">
                          {item.minggu}{' '}
                          <span className="text-[10px] font-normal text-slate-400">({item.label})</span>
                        </span>
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

                      <div className="mt-2 text-sm sm:text-base font-extrabold text-white">
                        {formatIDR(item.revenue)}
                      </div>

                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{formatNum(item.traffic)} Pax</span>
                        <span>{formatNum(item.transaksi)} Trx</span>
                      </div>
                    </button>
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
                    {['W1', 'W2', 'W3', 'W4', 'W5'].map((wk) => (
                      <option key={wk} value={wk}>
                        {wk}
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
            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                  ANNUAL REPORT SALES & MARKETING DEPARTMENT 2026
                </h2>
                <p className="text-xs text-slate-400">
                  Semua kolom bulan (<span className="text-emerald-300 font-semibold">JANUARY – DESEMBER</span>) bisa diedit manual dan kolom <span className="text-amber-300 font-semibold">TOTAL</span> serta rasio/basket size terhitung otomatis oleh sistem.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                THE KERANJANG BALI • 2026
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] tabular-nums">
                  <thead>
                    <tr className="bg-slate-900 text-slate-200 uppercase">
                      <th className="p-2 border border-slate-800 sticky left-0 z-10 bg-slate-900 min-w-[240px]">
                        ITEM
                      </th>
                      {MONTHS_2026.map((m) => (
                        <th key={m.key} className="p-2 border border-slate-800 text-right min-w-[115px]">
                          {m.label}
                        </th>
                      ))}
                      <th className="p-2 border border-slate-800 text-right bg-emerald-950 text-emerald-200 min-w-[125px]">
                        TOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {computedAnnualReport.map((row) => {
                      const isFormula = row.type === 'formula';
                      return (
                        <tr
                          key={row.id}
                          className={`border-b border-slate-800/80 ${
                            isFormula ? 'bg-slate-900/75 font-semibold' : 'hover:bg-slate-900/40'
                          }`}
                        >
                          <td
                            className={`p-2 border border-slate-800 sticky left-0 z-10 ${
                              isFormula ? 'bg-slate-900 text-amber-300' : 'bg-[#0a0d14] text-white font-bold'
                            }`}
                          >
                            {row.item}
                          </td>
                          {MONTHS_2026.map((m) => {
                            const val = row.computedValues[m.key];
                            if (isFormula) {
                              return (
                                <td
                                  key={m.key}
                                  className="p-2 border border-slate-800 text-right text-amber-200"
                                >
                                  {formatAnnualCell(val, row.format)}
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
                    Edit angka W1 sampai W5 secara manual—persentase pertumbuhan Week-over-Week terhitung otomatis
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs tabular-nums">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 uppercase">
                      <th className="p-2.5 border border-slate-800">Minggu</th>
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
                          {row.minggu} <span className="text-[11px] font-normal text-slate-400">({row.label})</span>
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

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-slate-800 bg-[#090c12]/95 backdrop-blur grid grid-cols-7 print:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`py-2 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${
                active ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate max-w-[46px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
