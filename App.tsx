
import React, { useState, useMemo } from 'react';
import { 
  Mail, CheckCircle, MessageSquare, Snowflake, AlertCircle, 
  Bell, Search, Star, ExternalLink, ArrowRight
} from 'lucide-react';
import StatCard from './components/StatCard';
import { MOCK_STATS } from './constants';

const AGENTS = [
  { name: 'Tanvi', role: 'Senior Outreach', rate: '92%', sent: 1240, replies: 312 },
  { name: 'Emma', role: 'Lead Gen', rate: '88%', sent: 980, replies: 145 },
  { name: 'Leah', role: 'SDR Manager', rate: '95%', sent: 2100, replies: 560 },
  { name: 'Max', role: 'Account Exec', rate: '84%', sent: 750, replies: 89 },
  { name: 'John', role: 'Outreach Spec', rate: '81%', sent: 1100, replies: 112 },
  { name: 'Tom', role: 'Junior SDR', rate: '79%', sent: 540, replies: 42 },
];

const AGENT_EMAILS_MOCK = [
  { id: 1, recipient: 'Sarah Jenkins', email: 's.jenkins@techflow.io', status: 'Replied', followUp: 'Scheduled', date: 'Oct 24, 09:15' },
  { id: 2, recipient: 'Michael Chen', email: 'mchen@nexusglobal.com', status: 'Cold', followUp: 'Pending', date: 'Oct 24, 10:30' },
  { id: 3, recipient: 'Elena Rodriguez', email: 'elena.r@vantagepoint.net', status: 'Completed', followUp: 'N/A', date: 'Oct 23, 14:45' },
  { id: 4, recipient: 'David Smith', email: 'dsmith@summitsolutions.co', status: 'Bounced', followUp: 'Urgent', date: 'Oct 23, 16:20' },
  { id: 5, recipient: 'Jessica Wu', email: 'jess.wu@cloudscale.org', status: 'Replied', followUp: 'Completed', date: 'Oct 22, 11:05' },
  { id: 6, recipient: 'Kevin Miller', email: 'kmiller@ironlogic.com', status: 'Cold', followUp: 'Pending', date: 'Oct 22, 15:40' },
];

const App: React.FC = () => {
  const [selectedAgentName, setSelectedAgentName] = useState<string | null>(null);

  const selectedAgent = useMemo(() => 
    AGENTS.find(a => a.name === selectedAgentName), 
  [selectedAgentName]);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Replied': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Cold': return 'bg-amber-100 text-amber-700';
      case 'Bounced': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getFollowUpStyle = (status: string) => {
    switch(status) {
      case 'Scheduled': return 'text-indigo-600 font-bold';
      case 'Urgent': return 'text-rose-600 font-black animate-pulse';
      case 'Pending': return 'text-amber-600 font-bold';
      case 'Completed': return 'text-emerald-600 font-bold';
      default: return 'text-slate-400 font-medium';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              MailPulse
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <h1 className="text-lg font-bold hidden sm:block text-slate-700 uppercase tracking-tight">Analytics Pro</h1>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 transition-all"
            />
          </div>
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
            <div className="text-right">
              <p className="text-sm font-bold">Alex Rivera</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto overflow-x-hidden">
        <div className="p-4 lg:p-8 space-y-8">
          {/* Section 1: Email Status Overview */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Email Status Overview</h2>
              <p className="text-slate-500 text-sm">Real-time metrics for your ongoing email operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard 
                title="Total Email"
                value={MOCK_STATS.total.toLocaleString()}
                icon={<Mail size={22} />}
                colorClass="text-indigo-600"
                bgColorClass="bg-indigo-50"
              />
              <StatCard 
                title="Completed Email"
                value={MOCK_STATS.completed.toLocaleString()}
                percentage={`${((MOCK_STATS.completed / MOCK_STATS.total) * 100).toFixed(1)}%`}
                icon={<CheckCircle size={22} />}
                colorClass="text-emerald-600"
                bgColorClass="bg-emerald-50"
              />
              <StatCard 
                title="Replied Email"
                value={MOCK_STATS.replied.toLocaleString()}
                percentage={`${((MOCK_STATS.replied / MOCK_STATS.total) * 100).toFixed(1)}%`}
                icon={<MessageSquare size={22} />}
                colorClass="text-blue-600"
                bgColorClass="bg-blue-50"
              />
              <StatCard 
                title="Cold Email"
                value={MOCK_STATS.cold.toLocaleString()}
                percentage={`${((MOCK_STATS.cold / MOCK_STATS.total) * 100).toFixed(1)}%`}
                icon={<Snowflake size={22} />}
                colorClass="text-amber-600"
                bgColorClass="bg-amber-50"
              />
              <StatCard 
                title="Bounced Email"
                value={MOCK_STATS.bounced.toLocaleString()}
                percentage={`${((MOCK_STATS.bounced / MOCK_STATS.total) * 100).toFixed(1)}%`}
                icon={<AlertCircle size={22} />}
                colorClass="text-rose-600"
                bgColorClass="bg-rose-50"
              />
            </div>
          </section>

          {/* Section 2: Campaign Agents */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Campaign Agents</h2>
              <p className="text-slate-500 text-sm">Manage and track individual agent performance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {AGENTS.map((agent) => {
                const isActive = selectedAgentName === agent.name;
                return (
                  <button
                    key={agent.name}
                    onClick={() => setSelectedAgentName(isActive ? null : agent.name)}
                    className={`
                      relative group flex flex-col p-6 rounded-2xl border transition-all duration-300 shadow-sm text-left
                      ${isActive 
                        ? 'bg-red-600 border-red-500 text-white scale-105 shadow-red-200 z-10' 
                        : 'bg-white border-slate-100 text-slate-900 hover:bg-blue-600 hover:border-blue-500 hover:text-white hover:-translate-y-1'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-black text-xl tracking-tight leading-none">{agent.name}</h3>
                      <div className={`p-1 rounded-full ${isActive ? 'bg-white text-red-600' : 'bg-slate-100 text-slate-300 group-hover:bg-white group-hover:text-blue-600'}`}>
                        <Star size={12} fill="currentColor" />
                      </div>
                    </div>
                    <p className={`text-xs mb-6 font-bold uppercase tracking-widest ${isActive ? 'text-red-100' : 'text-slate-400 group-hover:text-blue-100'}`}>
                      {agent.role}
                    </p>
                    <div className={`mt-auto w-full pt-4 border-t flex justify-between items-center ${isActive ? 'border-white/20' : 'border-slate-100 group-hover:border-white/20'}`}>
                      <span className="text-[10px] uppercase tracking-widest font-black opacity-70">Success Rate</span>
                      <span className="font-black text-sm">{agent.rate}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 3: Agent Activity Log (Conditional) */}
          {selectedAgentName && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                  <div className="flex items-center gap-5">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Agent Activity: {selectedAgentName}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{selectedAgent?.role}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <CheckCircle size={14} className="text-emerald-500" /> Currently Online
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Sent</p>
                      <p className="text-xl font-black text-slate-900">{selectedAgent?.sent.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 text-center">
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Replies</p>
                      <p className="text-xl font-black text-indigo-600">{selectedAgent?.replies}</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead / Recipient</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead status</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">follow up status</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Time</th>
                        <th className="px-6 py-5 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {AGENT_EMAILS_MOCK.map((email) => (
                        <tr key={email.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-5">
                            <div className="font-black text-sm text-slate-900">{email.recipient}</div>
                            <div className="text-[10px] font-bold text-indigo-500 lowercase tracking-wider">{email.email}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusStyle(email.status)}`}>
                              {email.status}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`text-[11px] uppercase tracking-wider ${getFollowUpStyle(email.followUp)}`}>
                              {email.followUp}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right text-xs font-black text-slate-300">
                            {email.date}
                          </td>
                          <td className="px-6 py-5">
                            <button className="p-1.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button className="flex items-center gap-2 text-sm font-black text-indigo-600 hover:gap-4 transition-all uppercase tracking-widest">
                    Interaction History <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
