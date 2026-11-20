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
  ArrowDownRight
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

const STORAGE_KEY = 'sm_command_center_v1';

const INITIAL_PICS = [
  { id: 'pic-1', posisi: 'MANAGER', nama: 'ECO MUHAMAD RIDWAN', status: 'Active' },
  { id: 'pic-2', posisi: 'LEADER', nama: 'VACANT', status: 'Vacant' },
  { id: 'pic-3', posisi: 'GUIDE', nama: 'AGNETIA MARIA NADIA SORAYA', status: 'Active' },
  { id: 'pic-4', posisi: 'DRIVER', nama: 'VACANT', status: 'Vacant' },
  { id: 'pic-5', posisi: 'T & T', nama: 'VACANT', status: 'Vacant' },
  { id: 'pic-6', posisi: 'EVENT', nama: 'SILVIA', status: 'Active' },
  { id: 'pic-7', posisi: 'EVENT DEALING', nama: 'DHIMAS', status: 'Active' },
  { id: 'pic-8', posisi: 'GOVERMENT', nama: 'LINDA', status: 'Active' },
  { id: 'pic-9', posisi: 'B2B', nama: 'VACANT', status: 'Vacant' },
  { id: 'pic-10', posisi: 'CRM', nama: 'ARVA', status: 'Active' },
  { id: 'pic-11', posisi: 'HELPER', nama: 'GEDE AGUS DHARMA ARTHA', status: 'Active' },
  { id: 'pic-12', posisi: 'MAGANG', nama: 'FAHMI', status: 'Active' },
  { id: 'pic-13', posisi: 'ADMIN', nama: 'WINDA ELLYANA PUSPA SARI', status: 'Active' },
];

const INITIAL_ACQUISITIONS = [
  {
    id: 'acq-1',
    tanggal: '2026-11-01',
    minggu: 'W1',
    waktu: '15:07',
    kanal: 'GUIDE',
    pic: 'AGNETIA MARIA NADIA SORAYA',
    instansi: 'PT SAMA MANDIRI KARANGANYAR',
    program: 'DINNER + SHOPPING',
    pax: 50,
    revenue: 3125000,
    transaksi: 14,
    noHp: '082266143591',
    keterangan: 'Rombongan korporat tiba tepat waktu'
  },
  {
    id: 'acq-2',
    tanggal: '2026-11-03',
    minggu: 'W1',
    waktu: '14:20',
    kanal: 'GUIDE',
    pic: 'AGNETIA MARIA NADIA SORAYA',
    instansi: 'SMAN 1 BAURENO',
    program: 'DINNER + SHOPPING',
    pax: 270,
    revenue: 5654200,
    transaksi: 27,
    noHp: '081356041945',
    keterangan: 'Study tour sekolah menengah'
  },
  {
    id: 'acq-3',
    tanggal: '2026-11-05',
    minggu: 'W1',
    waktu: '18:30',
    kanal: 'EVENT',
    pic: 'SILVIA',
    instansi: 'UPN VETERAN SURABAYA JATIM',
    program: 'DINNER + SHOPPING',
    pax: 280,
    revenue: 2807200,
    transaksi: 28,
    noHp: '08174293438',
    keterangan: 'Gathering mahasiswa & dosen'
  },
  {
    id: 'acq-4',
    tanggal: '2026-11-07',
    minggu: 'W1',
    waktu: '09:00 - 19:00',
    kanal: 'EVENT DEALING',
    pic: 'DHIMAS',
    instansi: 'KPOP EXO L',
    program: 'EVENT TEATER 1484',
    pax: 150,
    revenue: 5145000,
    transaksi: 19,
    noHp: '082145600496',
    keterangan: 'Event komunitas & gathering'
  },
  {
    id: 'acq-5',
    tanggal: '2026-11-11',
    minggu: 'W2',
    waktu: '10:03',
    kanal: 'CRM',
    pic: 'ARVA',
    instansi: 'BAZAR EO',
    program: 'SHOPPING ONLY',
    pax: 95,
    revenue: 20340060,
    transaksi: 35,
    noHp: '08964158107',
    keterangan: 'Follow up database CRM aktif'
  },
  {
    id: 'acq-6',
    tanggal: '2026-11-12',
    minggu: 'W2',
    waktu: '11:45',
    kanal: 'EVENT',
    pic: 'SILVIA',
    instansi: 'GK MUKERNAS BMPS 2026',
    program: 'EVENT TEATER 1484',
    pax: 120,
    revenue: 14759500,
    transaksi: 36,
    noHp: '082147513515',
    keterangan: 'Agenda mukernas nasional'
  },
  {
    id: 'acq-7',
    tanggal: '2026-11-13',
    minggu: 'W2',
    waktu: '15:19',
    kanal: 'GOVERMENT',
    pic: 'LINDA',
    instansi: 'DINAS PARIWISATA & INSTANSI',
    program: 'DINNER + SHOPPING',
    pax: 85,
    revenue: 8420000,
    transaksi: 18,
    noHp: '081380421170',
    keterangan: 'Kunjungan dinas pemerintahan'
  },
  {
    id: 'acq-8',
    tanggal: '2026-11-16',
    minggu: 'W3',
    waktu: '15:27',
    kanal: 'GUIDE',
    pic: 'AGNETIA MARIA NADIA SORAYA',
    instansi: 'AWI MUSIC CENTER SURABAYA',
    program: 'LUNCH + SHOPPING',
    pax: 150,
    revenue: 2071400,
    transaksi: 20,
    noHp: '089681201575',
    keterangan: 'Rombongan musik & seni'
  },
  {
    id: 'acq-9',
    tanggal: '2026-11-18',
    minggu: 'W3',
    waktu: '15:02',
    kanal: 'GOVERMENT',
    pic: 'LINDA',
    instansi: 'KEMENKES',
    program: 'DINNER + SHOPPING',
    pax: 110,
    revenue: 6762000,
    transaksi: 15,
    noHp: '087760445327',
    keterangan: 'Rombongan instansi kesehatan'
  },
  {
    id: 'acq-10',
    tanggal: '2026-11-20',
    minggu: 'W3',
    waktu: '17:00 - 20:00',
    kanal: 'EVENT DEALING',
    pic: 'DHIMAS',
    instansi: 'MUKERNAS BMPS 2026',
    program: 'EVENT TEATER 1484',
    pax: 300,
    revenue: 49127180,
    transaksi: 85,
    noHp: '08133654514',
    keterangan: 'Puncak acara rombongan besar'
  }
];

const INITIAL_WEEKLY_METRICS = [
  { minggu: 'W1', label: 'Week 1 (1-7 Nov)', revenue: 16733200, traffic: 750, transaksi: 88 },
  { minggu: 'W2', label: 'Week 2 (8-14 Nov)', revenue: 43519560, traffic: 640, transaksi: 89 },
  { minggu: 'W3', label: 'Week 3 (15-21 Nov)', revenue: 57960580, traffic: 890, transaksi: 120 },
  { minggu: 'W4', label: 'Week 4 (22-28 Nov)', revenue: 38450000, traffic: 710, transaksi: 76 },
  { minggu: 'W5', label: 'Week 5 (29-30 Nov)', revenue: 14200000, traffic: 340, transaksi: 32 }
];

const INITIAL_KPI_ROWS = [
  { id: 'kpi-1', kategori: 'A. GOALS', funnel: 'TRAFFIC', bobot: 30, pic: 'ALL SALES & MARKETING', target: 4500, targetMtd: 3200, actual: 2620 },
  { id: 'kpi-2', kategori: 'A. GOALS', funnel: 'REVENUE', bobot: 50, pic: 'ECO MUHAMAD RIDWAN', target: 1450000000, targetMtd: 950000000, actual: 170862820 },
  { id: 'kpi-3', kategori: 'A. GOALS', funnel: 'TRANSAKSI', bobot: 20, pic: 'WINDA ELLYANA PUSPA SARI', target: 1200, targetMtd: 850, actual: 434 },
  { id: 'kpi-4', kategori: 'B. STRATEGI OBJECTIVE', funnel: 'TRAFFIC SALES RESERVASI', bobot: 40, pic: 'AGNETIA MARIA NADIA SORAYA', target: 1800, targetMtd: 1200, actual: 820 },
  { id: 'kpi-5', kategori: 'B. STRATEGI OBJECTIVE', funnel: 'TRAFFIC EVENT & DEALING', bobot: 60, pic: 'SILVIA & DHIMAS', target: 2700, targetMtd: 2000, actual: 1800 },
  { id: 'kpi-6', kategori: 'C. STRATEGI INISIATIF', funnel: 'Optimasi Peningkatan Traffic Guide', bobot: 25, pic: 'AGNETIA MARIA NADIA SORAYA', target: 300, targetMtd: 220, actual: 195 },
  { id: 'kpi-7', kategori: 'C. STRATEGI INISIATIF', funnel: 'Optimasi Peningkatan Traffic Event', bobot: 25, pic: 'SILVIA', target: 400, targetMtd: 300, actual: 260 },
  { id: 'kpi-8', kategori: 'C. STRATEGI INISIATIF', funnel: 'Optimasi Event Dealing & B2B', bobot: 25, pic: 'DHIMAS', target: 350, targetMtd: 250, actual: 210 },
  { id: 'kpi-9', kategori: 'C. STRATEGI INISIATIF', funnel: 'Follow Up Database CRM & Gov', bobot: 25, pic: 'ARVA & LINDA', target: 500, targetMtd: 380, actual: 310 }
];

const INITIAL_TASKS = [
  {
    id: 'task-1',
    judul: 'Follow Up Proposal Rombongan Event W3 & W4',
    pic: 'DHIMAS',
    kanal: 'EVENT DEALING',
    tanggal: '2026-11-21',
    waktu: '10:00',
    prioritas: 'Critical',
    status: 'In Progress',
    progress: 65
  },
  {
    id: 'task-2',
    judul: 'Blast Database Mitra Guide & Travel Agent Bali',
    pic: 'AGNETIA MARIA NADIA SORAYA',
    kanal: 'GUIDE',
    tanggal: '2026-11-22',
    waktu: '09:30',
    prioritas: 'High',
    status: 'In Progress',
    progress: 50
  },
  {
    id: 'task-3',
    judul: 'Rekapitulasi Transaksi & Invoice Mingguan W3',
    pic: 'WINDA ELLYANA PUSPA SARI',
    kanal: 'ADMIN',
    tanggal: '2026-11-21',
    waktu: '16:00',
    prioritas: 'Normal',
    status: 'Done',
    progress: 100
  }
];

const INITIAL_MOMS = [
  {
    id: 'mom-1',
    tanggal: '2026-11-20',
    minggu: 'W3',
    judul: 'Evaluasi Performa Sales & Marketing Mingguan W3',
    peserta: 'ECO MUHAMAD RIDWAN, SILVIA, DHIMAS, LINDA, ARVA, WINDA',
    poinPembahasan: 'Lonjakan transaksi pada rombongan event besar perlu diimbangi dengan pengisian posisi Vacant (Leader, Driver, T&T, B2B) serta percepatan closing leads CRM.',
    actionItem: 'Susun daftar prioritas follow up 50 prospek event & government untuk W4',
    picAction: 'DHIMAS',
    deadline: '2026-11-23',
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

const calcPctChange = (current, previous) => {
  const curr = Number(current || 0);
  const prev = Number(previous || 0);
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Number((((curr - prev) / Math.abs(prev)) * 100).toFixed(1));
};

const buildGoogleCalendarUrl = (title, dateStr, timeStr, details, location = 'Sales & Marketing Command Center') => {
  const cleanDate = (dateStr || '2026-11-21').replace(/-/g, '');
  const cleanTime = (timeStr || '09:00').replace(':', '') + '00';
  const endHourNum = (parseInt((timeStr || '09:00').split(':')[0], 10) + 1) % 24;
  const endHour = String(endHourNum).padStart(2, '0');
  const endMin = (timeStr || '09:00').split(':')[1] || '00';
  const endTime = `${endHour}${endMin}00`;
  const startDT = `${cleanDate}T${cleanTime}`;
  const endDT = `${cleanDate}T${endTime}`;
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [periodMode, setPeriodMode] = useState('mingguan');
  const [weekCountMode, setWeekCountMode] = useState('W5');
  const [customStart, setCustomStart] = useState('2026-11-01');
  const [customEnd, setCustomEnd] = useState('2026-11-30');
  const [selectedKanalFilter, setSelectedKanalFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [pics, setPics] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.pics || INITIAL_PICS;
    } catch {
      return INITIAL_PICS;
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

  const [kpiRows, setKpiRows] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved?.kpiRows || INITIAL_KPI_ROWS;
    } catch {
      return INITIAL_KPI_ROWS;
    }
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
    tanggal: '2026-11-20',
    minggu: 'W3',
    waktu: '14:00',
    kanal: 'GUIDE',
    pic: 'AGNETIA MARIA NADIA SORAYA',
    instansi: '',
    program: 'DINNER + SHOPPING',
    pax: 0,
    revenue: 0,
    transaksi: 0,
    noHp: '',
    keterangan: ''
  });

  const [newPicPos, setNewPicPos] = useState('');
  const [newPicName, setNewPicName] = useState('');
  const [editingPicId, setEditingPicId] = useState(null);
  const [editingPicName, setEditingPicName] = useState('');

  const [newTask, setNewTask] = useState({
    judul: '',
    pic: 'ECO MUHAMAD RIDWAN',
    kanal: 'MANAGER',
    tanggal: '2026-11-21',
    waktu: '10:00',
    prioritas: 'High',
    status: 'In Progress',
    progress: 25
  });

  const [newMom, setNewMom] = useState({
    tanggal: '2026-11-20',
    minggu: 'W3',
    judul: '',
    peserta: 'ECO MUHAMAD RIDWAN, WINDA ELLYANA PUSPA SARI',
    poinPembahasan: '',
    actionItem: '',
    picAction: 'WINDA ELLYANA PUSPA SARI',
    deadline: '2026-11-23'
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: 'Halo! Saya AI Sales & Marketing Strategist. Tanya saya tentang performa revenue W1–W5, strategi penutupan gap target, optimasi kanal Guide/Event/CRM, atau penanganan posisi VACANT.'
    }
  ]);

  useEffect(() => {
    try {
      const payload = {
        pics,
        acquisitions,
        weeklyMetrics,
        kpiRows,
        tasks,
        moms
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedAt(new Date().toLocaleTimeString('id-ID'));
    } catch (e) {
      console.error('Gagal menyimpan data lokal:', e);
    }
  }, [pics, acquisitions, weeklyMetrics, kpiRows, tasks, moms]);

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

    const newItem = {
      id: `acq-${Date.now()}`,
      ...formAcq,
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
      pax: 0,
      revenue: 0,
      transaksi: 0,
      noHp: '',
      keterangan: ''
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
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        row.instansi.toLowerCase().includes(q) ||
        row.pic.toLowerCase().includes(q) ||
        row.kanal.toLowerCase().includes(q) ||
        row.program.toLowerCase().includes(q);

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
      return matchKanal && matchSearch && matchDate;
    });
  }, [acquisitions, selectedKanalFilter, searchQuery, periodMode, customStart, customEnd]);

  const mainSummary = useMemo(() => {
    const activeWeeks =
      weekCountMode === 'W4'
        ? weeklyMetrics.filter((w) => ['W1', 'W2', 'W3', 'W4'].includes(w.minggu))
        : weeklyMetrics;

    if (periodMode === 'harian') {
      const dayItems = acquisitions.filter((a) => a.tanggal === customEnd);
      const prevDateObj = new Date(customEnd || '2026-11-20');
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
        labelBand: `Harian (${customEnd})`
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
        labelBand: `Custom (${customStart} s/d ${customEnd})`
      };
    }

    const totalRev = activeWeeks.reduce((s, w) => s + Number(w.revenue || 0), 0);
    const totalTraf = activeWeeks.reduce((s, w) => s + Number(w.traffic || 0), 0);
    const totalTrx = activeWeeks.reduce((s, w) => s + Number(w.transaksi || 0), 0);

    const lastW = activeWeeks[activeWeeks.length - 1] || { revenue: 0, traffic: 0, transaksi: 0 };
    const prevW = activeWeeks[activeWeeks.length - 2] || { revenue: 0, traffic: 0, transaksi: 0 };

    const multiplier = periodMode === 'tahunan' ? 12 : 1;

    return {
      revenue: totalRev * multiplier,
      traffic: totalTraf * multiplier,
      transaksi: totalTrx * multiplier,
      revPct: calcPctChange(lastW.revenue, prevW.revenue),
      trafPct: calcPctChange(lastW.traffic, prevW.traffic),
      trxPct: calcPctChange(lastW.transaksi, prevW.transaksi),
      labelBand:
        periodMode === 'mingguan'
          ? `Mingguan (${weekCountMode})`
          : periodMode === 'bulanan'
          ? `Bulanan (${weekCountMode})`
          : `Tahunan 2026 (${weekCountMode})`
    };
  }, [periodMode, weekCountMode, weeklyMetrics, acquisitions, customStart, customEnd]);

  const comparisonRows = useMemo(() => {
    const base =
      weekCountMode === 'W4'
        ? weeklyMetrics.filter((w) => ['W1', 'W2', 'W3', 'W4'].includes(w.minggu))
        : weeklyMetrics;

    return base.map((item, idx) => {
      const prev = idx > 0 ? base[idx - 1] : null;
      return {
        ...item,
        revGrowth: prev ? calcPctChange(item.revenue, prev.revenue) : 0,
        trafGrowth: prev ? calcPctChange(item.traffic, prev.traffic) : 0,
        trxGrowth: prev ? calcPctChange(item.transaksi, prev.transaksi) : 0
      };
    });
  }, [weeklyMetrics, weekCountMode]);

  const handleUpdateWeeklyField = (mingguKey, field, val) => {
    setWeeklyMetrics((prev) =>
      prev.map((w) => (w.minggu === mingguKey ? { ...w, [field]: Number(val || 0) } : w))
    );
  };

  const computedKpiRows = useMemo(() => {
    return kpiRows.map((row) => {
      const targetNum = Number(row.target || 1);
      const actualNum = Number(row.actual || 0);
      const achievePct = Number(((actualNum / targetNum) * 100).toFixed(1));
      const nilaiPerform = Number(((achievePct * Number(row.bobot || 0)) / 100).toFixed(1));
      const gap = actualNum - Number(row.target || 0);
      return {
        ...row,
        achievePct,
        nilaiPerform,
        gap
      };
    });
  }, [kpiRows]);

  const handleUpdateKpiActual = (id, newActual) => {
    setKpiRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, actual: Number(newActual || 0) } : r))
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
        pic: mom.picAction || 'WINDA ELLYANA PUSPA SARI',
        kanal: 'MOM ACTION',
        tanggal: mom.deadline || '2026-11-23',
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

  const handleExportBackup = () => {
    const dataStr = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        pics,
        acquisitions,
        weeklyMetrics,
        kpiRows,
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
        if (parsed.acquisitions) setAcquisitions(parsed.acquisitions);
        if (parsed.weeklyMetrics) setWeeklyMetrics(parsed.weeklyMetrics);
        if (parsed.kpiRows) setKpiRows(parsed.kpiRows);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.moms) setMoms(parsed.moms);
      } catch (err) {
        console.error('File backup tidak valid:', err);
      }
    };
    reader.readAsText(file);
  };

  const handleAskAi = async (customQuery) => {
    const queryText = (customQuery ?? aiPrompt).trim();
    if (!queryText) return;
    setAiMessages((prev) => [...prev, { role: 'user', text: queryText }]);
    if (!customQuery) setAiPrompt('');
    setAiLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const vacantPositions = pics.filter((p) => p.nama === 'VACANT').map((p) => p.posisi);

    const contextSummary = `
Data Sales & Marketing saat ini (${mainSummary.labelBand}):
- Revenue: ${formatIDR(mainSummary.revenue)} (${mainSummary.revPct >= 0 ? '+' : ''}${mainSummary.revPct}%)
- Traffic/Pax: ${formatNum(mainSummary.traffic)} (${mainSummary.trafPct >= 0 ? '+' : ''}${mainSummary.trafPct}%)
- Transaksi: ${formatNum(mainSummary.transaksi)} (${mainSummary.trxPct >= 0 ? '+' : ''}${mainSummary.trxPct}%)
- Posisi VACANT: ${vacantPositions.join(', ') || 'Tidak ada'}
- Rekap Mingguan: ${comparisonRows.map((r) => `${r.minggu} rev ${formatIDR(r.revenue)} (${r.revGrowth}%)`).join(' | ')}
`;

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
                      text: `Anda adalah konsultan operasional & strategi Sales Marketing yang praktis dan to-the-point dalam Bahasa Indonesia. Jawab berdasarkan konteks berikut:
${contextSummary}

Pertanyaan user: ${queryText}`
                    }
                  ]
                }
              ]
            })
          }
        );
        const data = await res.json();
        const replyText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Respons AI diterima, silakan cek data metrik terbaru Anda.';
        setAiMessages((prev) => [...prev, { role: 'assistant', text: replyText }]);
      } else {
        const localAdvice = [
          `Evaluasi Cepat (${mainSummary.labelBand}): Revenue berada di ${formatIDR(mainSummary.revenue)} (${mainSummary.revPct}%), Traffic ${formatNum(mainSummary.traffic)} pax, dan Transaksi ${formatNum(mainSummary.transaksi)}.`,
          vacantPositions.length > 0
            ? `Prioritas SDM: Posisi ${vacantPositions.join(', ')} masih VACANT—segera delegasikan tugas harian ke PIC aktif terdekat (Silvia, Dhimas, Linda, Arva, Agnetia) agar tidak ada lead tertunda.`
            : 'Semua posisi tim Sales & Marketing sudah terisi.',
          'Langkah Eksekusi Hari Ini: (1) Follow up rombongan berpotensi tinggi (Event & Government), (2) Dorong konversi pax ke transaksi paket Dinner/Lunch + Shopping, (3) Pastikan input harian masuk sebelum jam tutup operasional.'
        ].join('\n\n');
        setAiMessages((prev) => [...prev, { role: 'assistant', text: localAdvice }]);
      }
    } catch {
      setAiMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Analisis cepat: Fokuskan follow up pada kanal dengan nilai transaksi terbesar dan pantau perbandingan mingguan (${weekCountMode}) agar gap target mengecil.`
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3 },
    { id: 'perbandingan', label: 'W1–W5 & PERIODE', icon: Layers },
    { id: 'kpi', label: 'KPI & FUNNEL', icon: Target },
    { id: 'schedule', label: 'SCHEDULE & KALENDER', icon: Calendar },
    { id: 'tim', label: 'TIM & PIC', icon: Users },
    { id: 'mom_ai', label: 'MOM & AI SOLVER', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 pb-20 md:pb-10">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#0b0f17]/95 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              SM
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-wide text-white uppercase">
                Sales & Marketing Command Center
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Auto-Backup Aktif ({lastSavedAt})
                </span>
                <span>•</span>
                <span>13 Posisi Tim Sales & Marketing</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
          </div>
        </div>

        <nav className="hidden md:flex border-t border-slate-800/80 bg-[#090c12] px-6 gap-1 overflow-x-auto">
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
        <section className="rounded-xl border border-slate-800 bg-[#0e131d] p-3.5 sm:p-4">
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

              <div className="ml-1 inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                {['W4', 'W5'].map((wc) => (
                  <button
                    key={wc}
                    type="button"
                    onClick={() => setWeekCountMode(wc)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                      weekCountMode === wc
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {wc}
                  </button>
                ))}
              </div>
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
        </section>

        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    REVENUE ({mainSummary.labelBand})
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
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
                  <span className="text-slate-400">vs periode sebelumnya</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    TRAFFIC / PAX ({mainSummary.labelBand})
                  </span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
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
                  <span className="text-slate-400">vs periode sebelumnya</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    TRANSAKSI ({mainSummary.labelBand})
                  </span>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
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
                  <span className="text-slate-400">vs periode sebelumnya</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0e131d] p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wide">
                    Grafik Revenue & Traffic Sales ({weekCountMode})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Visualisasi performa mingguan divisi Sales & Marketing
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
                        name === 'revenue' ? [formatIDR(val), 'Revenue'] : [formatNum(val), 'Traffic']
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
              className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-3"
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
                  <label className="block text-slate-400 mb-1">Instansi / Rombongan</label>
                  <input
                    type="text"
                    placeholder="Contoh: SMAN 1 DENPASAR"
                    value={formAcq.instansi}
                    onChange={(e) => setFormAcq({ ...formAcq, instansi: e.target.value.toUpperCase() })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Program Paket</label>
                  <select
                    value={formAcq.program}
                    onChange={(e) => setFormAcq({ ...formAcq, program: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  >
                    <option value="DINNER + SHOPPING">DINNER + SHOPPING</option>
                    <option value="LUNCH + SHOPPING">LUNCH + SHOPPING</option>
                    <option value="SHOPPING ONLY">SHOPPING ONLY</option>
                    <option value="EVENT TEATER 1484">EVENT TEATER 1484</option>
                  </select>
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
                  <label className="block text-slate-400 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={formAcq.waktu}
                    onChange={(e) => setFormAcq({ ...formAcq, waktu: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">No HP / WA</label>
                  <input
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    value={formAcq.noHp}
                    onChange={(e) => setFormAcq({ ...formAcq, noHp: e.target.value })}
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

            <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden">
              <div className="p-3.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 bg-[#0e131d]">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider">
                    DAILY REPORT AKUISISI SALES & MARKETING ({filteredAcquisitions.length} Record)
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
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
                    placeholder="Cari instansi / PIC..."
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
                      <th className="py-2 px-2.5 border border-slate-800">PIC / Nama</th>
                      <th className="py-2 px-2.5 border border-slate-800">Instansi / Rombongan</th>
                      <th className="py-2 px-2.5 border border-slate-800">Program Paket</th>
                      <th className="py-2 px-2.5 border border-slate-800 text-right">Pax</th>
                      <th className="py-2 px-2.5 border border-slate-800 text-right">Revenue</th>
                      <th className="py-2 px-2.5 border border-slate-800 text-right">Trx</th>
                      <th className="py-2 px-2.5 border border-slate-800">No HP</th>
                      <th className="py-2 px-2.5 border border-slate-800 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAcquisitions.map((row) => {
                      const badgeTone =
                        row.kanal === 'EVENT' || row.kanal === 'EVENT DEALING'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : row.kanal === 'GOVERMENT'
                          ? 'bg-violet-500/20 text-violet-300 border-violet-500/40'
                          : row.kanal === 'CRM'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                      const progTone = row.program.includes('EVENT')
                        ? 'bg-rose-500/20 text-rose-200'
                        : row.program.includes('LUNCH')
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : row.program.includes('DINNER')
                        ? 'bg-sky-500/20 text-sky-200'
                        : 'bg-indigo-500/20 text-indigo-200';

                      return (
                        <tr
                          key={row.id}
                          className="hover:bg-slate-900/80 border-b border-slate-800/80"
                        >
                          <td className="py-2 px-2.5 border border-slate-800/70">
                            <span
                              className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold border ${badgeTone}`}
                            >
                              {row.kanal}
                            </span>
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 whitespace-nowrap">
                            {row.tanggal}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 font-semibold text-cyan-300">
                            {row.minggu}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 whitespace-nowrap">
                            {row.waktu}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 font-medium text-slate-200">
                            {row.pic}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 font-semibold text-white">
                            {row.instansi}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70">
                            <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${progTone}`}>
                              {row.program}
                            </span>
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-right">
                            {formatNum(row.pax)}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-right font-bold text-emerald-300">
                            {formatIDR(row.revenue)}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-right">
                            {formatNum(row.transaksi)}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-slate-300">
                            {row.noHp || '-'}
                          </td>
                          <td className="py-2 px-2.5 border border-slate-800/70 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteAcquisition(row.id)}
                              className="p-1 text-rose-400 hover:bg-rose-500/15 rounded"
                              title="Hapus baris"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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
                    Perbandingan Mingguan {weekCountMode} (Revenue, Traffic & Transaksi)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Edit angka mingguan secara manual—persentase pertumbuhan Week-over-Week terhitung otomatis
                  </p>
                </div>
                <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                  {['W4', 'W5'].map((wc) => (
                    <button
                      key={wc}
                      type="button"
                      onClick={() => setWeekCountMode(wc)}
                      className={`px-3 py-1 rounded-md text-xs font-bold ${
                        weekCountMode === wc
                          ? 'bg-emerald-500 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Mode {wc}
                    </button>
                  ))}
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
                    {comparisonRows.map((row) => (
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
                          <span className={row.revGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                            {row.revGrowth >= 0 ? `+${row.revGrowth}%` : `${row.revGrowth}%`}
                          </span>
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
                          <span className={row.trafGrowth >= 0 ? 'text-cyan-400' : 'text-rose-400'}>
                            {row.trafGrowth >= 0 ? `+${row.trafGrowth}%` : `${row.trafGrowth}%`}
                          </span>
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
                          <span className={row.trxGrowth >= 0 ? 'text-amber-400' : 'text-rose-400'}>
                            {row.trxGrowth >= 0 ? `+${row.trxGrowth}%` : `${row.trxGrowth}%`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="h-64 w-full mt-5">
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
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue (Rp)"
                      stroke="#10b981"
                      strokeWidth={2.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="traffic"
                      name="Traffic (Pax)"
                      stroke="#38bdf8"
                      strokeWidth={2.5}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kpi' && (
          <div className="rounded-xl border border-slate-800 bg-[#0a0d14] overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0e131d]">
              <h2 className="text-sm sm:text-base font-bold text-white uppercase">
                KPI & Funnel Sales Marketing (A. Goals, B. Objective, C. Strategi Inisiatif)
              </h2>
              <p className="text-xs text-slate-400">
                Ubah kolom Actual untuk menghitung % Achievement, Nilai Perform, dan Gap secara otomatis
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs tabular-nums">
                <thead>
                  <tr className="bg-emerald-950/70 text-emerald-200 uppercase">
                    <th className="p-2.5 border border-slate-800">Kategori</th>
                    <th className="p-2.5 border border-slate-800">Funnel / Indikator</th>
                    <th className="p-2.5 border border-slate-800">PIC</th>
                    <th className="p-2.5 border border-slate-800 text-right">Bobot %</th>
                    <th className="p-2.5 border border-slate-800 text-right">Target</th>
                    <th className="p-2.5 border border-slate-800 text-right">Actual (Input)</th>
                    <th className="p-2.5 border border-slate-800 text-right">Achieve %</th>
                    <th className="p-2.5 border border-slate-800 text-right">Nilai Perform</th>
                    <th className="p-2.5 border border-slate-800 text-right">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {computedKpiRows.map((row) => (
                    <tr key={row.id} className="border-b border-slate-800 hover:bg-slate-900/60">
                      <td className="p-2.5 border border-slate-800 font-semibold text-amber-300 whitespace-nowrap">
                        {row.kategori}
                      </td>
                      <td className="p-2.5 border border-slate-800 font-semibold text-white">
                        {row.funnel}
                      </td>
                      <td className="p-2.5 border border-slate-800 text-slate-300">{row.pic}</td>
                      <td className="p-2.5 border border-slate-800 text-right">{row.bobot}%</td>
                      <td className="p-2.5 border border-slate-800 text-right">
                        {row.funnel === 'REVENUE' ? formatIDR(row.target) : formatNum(row.target)}
                      </td>
                      <td className="p-2.5 border border-slate-800 text-right">
                        <input
                          type="number"
                          value={row.actual}
                          onChange={(e) => handleUpdateKpiActual(row.id, e.target.value)}
                          className="w-32 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-cyan-300 font-semibold"
                        />
                      </td>
                      <td className="p-2.5 border border-slate-800 text-right">
                        <span
                          className={`inline-block rounded px-2 py-0.5 font-bold ${
                            row.achievePct >= 80
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : row.achievePct >= 50
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {row.achievePct}%
                        </span>
                      </td>
                      <td className="p-2.5 border border-slate-800 text-right font-bold text-white">
                        {row.nilaiPerform}
                      </td>
                      <td
                        className={`p-2.5 border border-slate-800 text-right font-semibold ${
                          row.gap >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {row.funnel === 'REVENUE'
                          ? formatIDR(row.gap)
                          : `${row.gap >= 0 ? '+' : ''}${formatNum(row.gap)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-5">
            <form
              onSubmit={handleAddTask}
              className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs"
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

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
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
              className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
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
                      <th className="p-3 border border-slate-800 text-right w-36">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pics.map((p, index) => {
                      const isEditing = editingPicId === p.id;
                      const isVacant = p.nama === 'VACANT';
                      return (
                        <tr
                          key={p.id}
                          className="bg-[#07090e] hover:bg-slate-900/70 border-b border-slate-800"
                        >
                          <td className="p-3 border border-slate-800 text-slate-400">{index + 1}</td>
                          <td className="p-3 border border-slate-800 font-bold text-white uppercase">
                            {p.posisi}
                          </td>
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
                          <td className="p-3 border border-slate-800 text-right">
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
                className="rounded-xl border border-slate-800 bg-[#0e131d] p-4 space-y-3 text-xs"
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
                          className={`rounded px-2.5 py-1 font-semibold ${
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
                    handleAskAi('Buatkan diagnosis masalah revenue & traffic mingguan serta rencana aksi 7 hari ke depan.')
                  }
                  className="rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 px-2.5 py-1 text-xs font-semibold text-emerald-300"
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
                className="pt-3 border-t border-slate-800 flex items-center gap-2"
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

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-slate-800 bg-[#090c12]/95 backdrop-blur grid grid-cols-6">
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
              <span className="truncate max-w-[54px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
