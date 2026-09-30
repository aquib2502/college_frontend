'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, X, Clock, CheckCircle2, AlertTriangle, FileText,
  Building2, Sparkles, Check, Trash2, ArrowUpRight
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'deadline' | 'cutoff' | 'fees' | 'review' | 'verification';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'deadline',
    title: 'MH-CET CAP Round 3 Approaching',
    description: 'Choice filling portal closes in 18 days. Finalize your prioritized option form for Maharashtra colleges.',
    time: '2 hours ago',
    unread: true,
    link: '/student/dashboard',
  },
  {
    id: 'n2',
    type: 'cutoff',
    title: 'COEP Cutoff Released for 2026',
    description: 'Round 1 cutoffs for Computer Engineering closed at 99.4 percentile for general home state candidates.',
    time: '5 hours ago',
    unread: true,
    link: '/colleges/coep',
  },
  {
    id: 'n3',
    type: 'fees',
    title: 'BITS Pilani Fee Schedule Verified',
    description: 'Updated 2026–27 academic tuition and hostel structures have been officially verified by data moderation.',
    time: '1 day ago',
    unread: true,
    link: '/colleges/bits-pilani',
  },
  {
    id: 'n4',
    type: 'review',
    title: '3 New Verified Reviews on VJTI',
    description: 'Recent 2025 graduates from Information Technology posted detailed reflections on campus placements.',
    time: '2 days ago',
    unread: false,
    link: '/reviews',
  },
  {
    id: 'n5',
    type: 'verification',
    title: 'NIRF 2025 Institutional Data Synced',
    description: 'All 6 colleges on your radar had their official national ranking metrics refreshed.',
    time: '3 days ago',
    unread: false,
    link: '/rankings',
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ open, onClose }: Props) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => n.unread).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }

  function markItemRead(id: string) {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, unread: false } : n)));
  }

  const filtered = notifications.filter(n => (filter === 'unread' ? n.unread : true));

  function getTypeIcon(type: NotificationItem['type']) {
    switch (type) {
      case 'deadline':
        return <Clock size={15} className="text-amber-500" />;
      case 'cutoff':
        return <AlertTriangle size={15} className="text-blue-500" />;
      case 'fees':
        return <FileText size={15} className="text-indigo-500" />;
      case 'review':
        return <Sparkles size={15} className="text-yellow-500" />;
      case 'verification':
        return <CheckCircle2 size={15} className="text-emerald-500" />;
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: 350 }}
            animate={{ x: 0 }}
            exit={{ x: 350 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative bg-white w-full max-w-sm sm:max-w-md h-full shadow-2xl border-l border-slate-200 z-10 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1a56db] flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                  <p className="text-[11px] text-slate-400">
                    {unreadCount > 0 ? `${unreadCount} unread alerts` : 'All caught up'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#1a56db] hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 py-2 border-b border-slate-100 flex gap-2 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filter === 'unread' ? 'bg-[#1a56db] text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-400">
                  <Bell size={32} className="mx-auto text-slate-200 mb-2" />
                  No unread notifications at this time.
                </div>
              ) : (
                filtered.map(item => (
                  <div
                    key={item.id}
                    onClick={() => markItemRead(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      item.unread
                        ? 'bg-blue-50/40 border-blue-200/70 hover:bg-blue-50/70'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded-lg bg-white border border-slate-200 shrink-0">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                          <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>

                        {item.link && (
                          <Link
                            href={item.link}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1a56db] mt-2 hover:underline"
                          >
                            <span>Inspect details</span>
                            <ArrowUpRight size={11} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400">
                Real-time simulated notification stream
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
