'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronRight, MessageSquare, CheckCircle, Plus, ThumbsUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/Toast';

export default function StudentQuestionsPage() {
  const { showToast } = useToast();
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      college: 'College of Engineering Pune (COEP)',
      question: 'How strict is attendance for final year students preparing for GATE or CAT?',
      askedDate: '3 days ago',
      answer: 'Generally in 8th semester, attendance criteria is flexible if you are doing an off-campus sponsored capstone project or internship. However, in 7th semester the 75% rule is enforced.',
      answeredBy: 'Rahul Verma (Alumnus 2024, now at IIM Bangalore)',
      verified: true,
      upvotes: 19,
    },
    {
      id: 'q2',
      college: 'VJTI Mumbai',
      question: 'Are single occupancy rooms available in first year boys hostel?',
      askedDate: '2 weeks ago',
      answer: 'No, first and second year students are assigned triple or double sharing rooms in Block B. Single rooms are allocated in 3rd and 4th year based on CGPA merit.',
      answeredBy: 'Kunal Patil (Final Year B.Tech EE, VJTI)',
      verified: true,
      upvotes: 34,
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [targetCollege, setTargetCollege] = useState('COEP Pune');
  const [newQuestionText, setNewQuestionText] = useState('');

  function handlePostQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setQuestions(prev => [
      {
        id: `q-${Date.now()}`,
        college: targetCollege,
        question: newQuestionText,
        askedDate: 'Just now',
        answer: 'Your question has been routed to verified current students and alumni of this institution. Answers typically arrive within 24 hours.',
        answeredBy: 'CollegeIQ Student Ambassador Bot',
        verified: true,
        upvotes: 1,
      },
      ...prev,
    ]);
    setNewQuestionText('');
    setModalOpen(false);
    showToast('Question broadcast to verified students!');
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-800">
      <Navbar />

      <div className="bg-[#0f1b2d] text-white pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <ChevronRight size={12} />
            <Link href="/student/dashboard" className="hover:text-slate-200">Student Dashboard</Link>
            <ChevronRight size={12} />
            <span className="text-blue-400">Q&A</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
                <HelpCircle size={13} />
                Student Community Q&A
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                My Questions & Inquiries
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Ask candid questions about campus reality, hostel mess, placement packages, and peer culture.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 bg-[#1a56db] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              <Plus size={14} /> Ask a Question
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">My Inquiries & Answers ({questions.length})</h2>

          <div className="space-y-4">
            {questions.map(q => (
              <div key={q.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1a56db] text-[10px] font-bold">
                    {q.college}
                  </span>
                  <span className="text-[11px] text-slate-400">{q.askedDate}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-900">{q.question}</h3>

                <div className="p-3 bg-white border border-slate-100 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={12} className="text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800">{q.answeredBy}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{q.answer}</p>
                </div>

                <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1">
                  <ThumbsUp size={11} className="text-[#1a56db]" /> {q.upvotes} students found this helpful
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Ask a Question</h3>
            <form onSubmit={handlePostQuestion} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target College</label>
                <input
                  type="text"
                  value={targetCollege}
                  onChange={e => setTargetCollege(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Question</label>
                <textarea
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="Ask about faculty strictness, real placement offers, hostel wifi..."
                  className="w-full p-3 border border-slate-200 rounded-xl h-24 outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1a56db] text-white rounded-xl font-bold"
                >
                  Broadcast Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
