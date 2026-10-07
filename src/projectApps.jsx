import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDashed,
  Edit3,
  Filter,
  MessageSquareText,
  Plus,
  Search,
  Target,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";

const projectOptions = {
  leadflow: { name: "LeadFlow", type: "Sales Enablement Platform" },
  clientconnect: { name: "ClientConnect", type: "Customer Relationship App" },
  dealtracker: { name: "DealTracker", type: "Sales Performance Tracker" },
  taskflow: { name: "Taskflow", type: "Productivity Web App" },
  brandboost: { name: "BrandBoost", type: "Marketing Support Tool" },
  salespilot: { name: "SalesPilot", type: "Sales Performance Hub" },
};

const leadSeed = [
  { id: 1, name: "Aisha Rahman", company: "Northstar Labs", email: "aisha@northstarlabs.com", status: "Qualified", source: "Website", followUp: "2026-10-12", value: "$8,400", activity: "Demo booked and proposal sent." },
  { id: 2, name: "Daniel Ross", company: "Peak Digital", email: "daniel@peakdigital.io", status: "New", source: "Referral", followUp: "2026-10-08", value: "$5,200", activity: "Waiting for response from decision maker." },
  { id: 3, name: "Mariam Ali", company: "Harbor Point", email: "mariam@harborpoint.co", status: "Contacted", source: "LinkedIn", followUp: "2026-10-11", value: "$12,000", activity: "Called twice; asked for pricing deck." },
  { id: 4, name: "Noah Kim", company: "UrbanNest", email: "noah@urbannest.com", status: "Converted", source: "Outbound", followUp: "2026-10-15", value: "$18,600", activity: "Contract signed and onboarding started." },
  { id: 5, name: "Sara Malik", company: "Mercury Studio", email: "sara@mercurystudio.app", status: "Lost", source: "Event", followUp: "2026-10-09", value: "$4,900", activity: "Budget paused due to internal changes." },
];

const customerSeed = [
  { id: 1, name: "Sophia Ahmed", company: "BluePeak", email: "sophia@bluepeak.io", status: "Active", segment: "Enterprise", lastContact: "2 days ago", value: "$24k", note: "Renewal discussion scheduled later this week." },
  { id: 2, name: "Liam Parker", company: "Cinder Labs", email: "liam@cinderlabs.com", status: "At Risk", segment: "SMB", lastContact: "5 days ago", value: "$9.2k", note: "Waiting on feedback from product team." },
  { id: 3, name: "Zara Khan", company: "North Harbor", email: "zara@northharbor.co", status: "Lead", segment: "Startup", lastContact: "Today", value: "$3.8k", note: "Requested a walkthrough of onboarding workflow." },
  { id: 4, name: "Ethan Brooks", company: "Summit Forge", email: "ethan@summitforge.biz", status: "Active", segment: "Mid-market", lastContact: "1 day ago", value: "$15k", note: "Growth plan updated and new features requested." },
];

const dealSeed = [
  { id: 1, name: "Atlas Renewal", account: "Atlas Group", stage: "Proposal", value: 12800, probability: 72, owner: "Ayesha" },
  { id: 2, name: "Northpeak Expansion", account: "Northpeak", stage: "Negotiation", value: 21900, probability: 60, owner: "Omar" },
  { id: 3, name: "Southline Upgrade", account: "Southline", stage: "Discovery", value: 7600, probability: 35, owner: "Nadia" },
  { id: 4, name: "Aster Deal", account: "Aster Labs", stage: "Closed Won", value: 18400, probability: 100, owner: "Raza" },
  { id: 5, name: "BlueHarbor", account: "Blue Harbor", stage: "Closed Lost", value: 9500, probability: 0, owner: "Musa" },
];

const taskSeed = [
  { id: 1, title: "Review outbound campaign", priority: "High", dueDate: "2026-10-08", completed: false, category: "Sales" },
  { id: 2, title: "Prepare client follow-up notes", priority: "Medium", dueDate: "2026-10-09", completed: true, category: "CRM" },
  { id: 3, title: "Schedule demo with enterprise leads", priority: "High", dueDate: "2026-10-10", completed: false, category: "Deal" },
  { id: 4, title: "Update landing page copy", priority: "Low", dueDate: "2026-10-11", completed: true, category: "Marketing" },
];

const campaignSeed = [
  { id: 1, name: "Autumn Retargeting", status: "Running", budget: "$4,800", audience: "SMB owners", performance: "8.4% CTR", engagement: 1830 },
  { id: 2, name: "Webinar Launch", status: "Planning", budget: "$2,200", audience: "Sales leaders", performance: "Pending", engagement: 980 },
  { id: 3, name: "Awareness Push", status: "Completed", budget: "$6,900", audience: "Mid-market teams", performance: "12.1% CTR", engagement: 2450 },
];

const salesActivitySeed = [
  { id: 1, title: "Follow-up call completed", owner: "Ayesha", time: "09:30 AM", type: "Call" },
  { id: 2, title: "New lead added to pipeline", owner: "Musa", time: "11:15 AM", type: "Lead" },
  { id: 3, title: "Proposal shared with Harbor Point", owner: "Nadia", time: "01:40 PM", type: "Proposal" },
  { id: 4, title: "Conversion milestone reached", owner: "Omar", time: "03:20 PM", type: "Deal" },
];

const statCardClass = "project-stat-card";

function ProjectAppHeader({ title, subtitle, badge }) {
  return (
    <div className="project-app-header">
      <div>
        <span className="project-app-kicker">{subtitle}</span>
        <h2>{title}</h2>
      </div>
      {badge ? <span className="project-app-badge">{badge}</span> : null}
    </div>
  );
}

export function LeadFlowApp({ onBack }) {
  const [leads, setLeads] = useState(leadSeed);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLeadId, setSelectedLeadId] = useState(leadSeed[0].id);
  const [form, setForm] = useState({ name: "", company: "", email: "", status: "New", source: "Website", followUp: "", value: "" });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesText = [lead.name, lead.company, lead.email].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [leads, query, statusFilter]);

  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId) || leads[0];

  const totalValue = leads.reduce((sum, lead) => sum + Number((lead.value || "0").replace(/[$,]/g, "")), 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.company) return;

    const nextLead = {
      id: Date.now(),
      name: form.name,
      company: form.company,
      email: form.email || `${form.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      status: form.status,
      source: form.source,
      followUp: form.followUp || "2026-10-18",
      value: form.value ? `$${Number(form.value).toLocaleString()}` : "$0",
      activity: "New lead captured from sales application.",
    };

    setLeads((current) => [nextLead, ...current]);
    setSelectedLeadId(nextLead.id);
    setForm({ name: "", company: "", email: "", status: "New", source: "Website", followUp: "", value: "" });
  };

  return (
    <div className="project-app-shell">
      <div className="project-app-topbar">
        <button className="project-back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      </div>
      <ProjectAppHeader title="LeadFlow" subtitle="Sales Enablement Platform" badge="React + JavaScript" />

      <div className="project-stat-grid">
        <div className={statCardClass}><span>Total pipeline</span><strong>{leads.length}</strong><small>{leadSeed.length} live leads</small></div>
        <div className={statCardClass}><span>Qualified</span><strong>{leads.filter((lead) => lead.status === "Qualified").length}</strong><small>+8% this week</small></div>
        <div className={statCardClass}><span>Conversions</span><strong>{leads.filter((lead) => lead.status === "Converted").length}</strong><small>Healthy funnel</small></div>
        <div className={statCardClass}><span>Pipeline value</span><strong>${totalValue.toLocaleString()}</strong><small>Across all leads</small></div>
      </div>

      <div className="project-form-grid">
        <div className="project-panel">
          <div className="panel-toolbar">
            <div className="panel-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leads" /></div>
            <div className="panel-filter"><Filter size={15} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
          </div>

          <div className="project-list">
            {filteredLeads.length ? filteredLeads.map((lead) => (
              <button key={lead.id} type="button" className={`project-list-item ${selectedLead?.id === lead.id ? "active" : ""}`} onClick={() => setSelectedLeadId(lead.id)}>
                <div>
                  <strong>{lead.name}</strong>
                  <span>{lead.company}</span>
                </div>
                <div className="project-pill">{lead.status}</div>
              </button>
            )) : <div className="empty-state">No leads match the current filters.</div>}
          </div>
        </div>

        <div className="project-panel">
          <h3>Add new lead</h3>
          <form className="project-form" onSubmit={handleSubmit}>
            <div className="field-row"><input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="field-row"><input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
            <div className="field-row"><input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="field-row two-up">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
                <option value="Converted">Converted</option>
              </select>
              <input placeholder="Deal value" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
            </div>
            <div className="field-row two-up">
              <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Outbound">Outbound</option>
                <option value="Event">Event</option>
              </select>
              <input type="date" value={form.followUp} onChange={(e) => setForm({ ...form, followUp: e.target.value })} />
            </div>
            <button type="submit" className="project-primary-button"><Plus size={16} /> Add lead</button>
          </form>
        </div>
      </div>

      <div className="project-panel detail-panel">
        <div className="detail-header">
          <div>
            <span className="detail-kicker">Lead details</span>
            <h3>{selectedLead?.name}</h3>
          </div>
          <span className="project-pill">{selectedLead?.status}</span>
        </div>
        <div className="detail-grid">
          <div>
            <p><strong>Company:</strong> {selectedLead?.company}</p>
            <p><strong>Email:</strong> {selectedLead?.email}</p>
            <p><strong>Source:</strong> {selectedLead?.source}</p>
          </div>
          <div>
            <p><strong>Next follow-up:</strong> {selectedLead?.followUp}</p>
            <p><strong>Deal value:</strong> {selectedLead?.value}</p>
            <p><strong>Sales activity:</strong> {selectedLead?.activity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientConnectApp({ onBack }) {
  const [customers, setCustomers] = useState(customerSeed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(customerSeed[0].id);
  const [form, setForm] = useState({ name: "", company: "", email: "", status: "Lead" });

  const filteredCustomers = useMemo(() => customers.filter((customer) => {
    const matchesText = [customer.name, customer.company, customer.email].join(" ").toLowerCase().includes(query.toLowerCase());
    return matchesText && (status === "All" || customer.status === status);
  }), [customers, query, status]);

  const selectedCustomer = filteredCustomers.find((customer) => customer.id === selectedId) || customers[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.company) return;

    const newCustomer = {
      id: Date.now(),
      name: form.name,
      company: form.company,
      email: form.email || "newcustomer@example.com",
      status: form.status,
      segment: "New",
      lastContact: "Today",
      value: "$0",
      note: "New customer profile added to CRM.",
    };

    setCustomers((current) => [newCustomer, ...current]);
    setSelectedId(newCustomer.id);
    setForm({ name: "", company: "", email: "", status: "Lead" });
  };

  return (
    <div className="project-app-shell">
      <div className="project-app-topbar">
        <button className="project-back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      </div>
      <ProjectAppHeader title="ClientConnect" subtitle="Customer Relationship App" badge="React + REST API style" />

      <div className="project-stat-grid">
        <div className={statCardClass}><span>Total clients</span><strong>{customers.length}</strong><small>Up 6% month over month</small></div>
        <div className={statCardClass}><span>Active</span><strong>{customers.filter((item) => item.status === "Active").length}</strong><small>Strong retention</small></div>
        <div className={statCardClass}><span>At risk</span><strong>{customers.filter((item) => item.status === "At Risk").length}</strong><small>Needs attention</small></div>
        <div className={statCardClass}><span>Revenue</span><strong>${customers.reduce((sum, item) => sum + Number((item.value || "$0").replace(/[$,]/g, "")), 0).toLocaleString()}</strong><small>Customer value</small></div>
      </div>

      <div className="project-form-grid">
        <div className="project-panel">
          <div className="panel-toolbar">
            <div className="panel-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers" /></div>
            <div className="panel-filter"><Filter size={15} />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Lead">Lead</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>
          </div>
          <div className="project-list">
            {filteredCustomers.length ? filteredCustomers.map((customer) => (
              <button key={customer.id} type="button" className={`project-list-item ${selectedCustomer?.id === customer.id ? "active" : ""}`} onClick={() => setSelectedId(customer.id)}>
                <div>
                  <strong>{customer.name}</strong>
                  <span>{customer.company}</span>
                </div>
                <div className="project-pill">{customer.status}</div>
              </button>
            )) : <div className="empty-state">No customers match this view.</div>}
          </div>
        </div>

        <div className="project-panel">
          <h3>Add customer</h3>
          <form className="project-form" onSubmit={handleSubmit}>
            <div className="field-row"><input placeholder="Customer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="field-row"><input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
            <div className="field-row"><input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="field-row">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Lead">Lead</option>
                <option value="Active">Active</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>
            <button type="submit" className="project-primary-button"><Users size={16} /> Add customer</button>
          </form>
        </div>
      </div>

      <div className="project-panel detail-panel">
        <div className="detail-header">
          <div>
            <span className="detail-kicker">Customer profile</span>
            <h3>{selectedCustomer?.name}</h3>
          </div>
          <span className="project-pill">{selectedCustomer?.status}</span>
        </div>
        <div className="detail-grid">
          <div>
            <p><strong>Company:</strong> {selectedCustomer?.company}</p>
            <p><strong>Email:</strong> {selectedCustomer?.email}</p>
            <p><strong>Segment:</strong> {selectedCustomer?.segment}</p>
          </div>
          <div>
            <p><strong>Last contact:</strong> {selectedCustomer?.lastContact}</p>
            <p><strong>Value:</strong> {selectedCustomer?.value}</p>
            <p><strong>Note:</strong> {selectedCustomer?.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DealTrackerApp({ onBack }) {
  const [deals, setDeals] = useState(dealSeed);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("All");

  const filteredDeals = useMemo(() => deals.filter((deal) => {
    const matchesText = [deal.name, deal.account, deal.owner].join(" ").toLowerCase().includes(query.toLowerCase());
    return matchesText && (stage === "All" || deal.stage === stage);
  }), [deals, query, stage]);

  const stageGroups = ["Discovery", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

  return (
    <div className="project-app-shell">
      <div className="project-app-topbar">
        <button className="project-back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      </div>
      <ProjectAppHeader title="DealTracker" subtitle="Sales Performance Tracker" badge="React + JavaScript" />

      <div className="project-stat-grid">
        <div className={statCardClass}><span>Total deals</span><strong>{deals.length}</strong><small>Across pipeline</small></div>
        <div className={statCardClass}><span>Open deals</span><strong>{deals.filter((deal) => deal.stage !== "Closed Won" && deal.stage !== "Closed Lost").length}</strong><small>In motion</small></div>
        <div className={statCardClass}><span>Won</span><strong>{deals.filter((deal) => deal.stage === "Closed Won").length}</strong><small>Strong close rate</small></div>
        <div className={statCardClass}><span>Value</span><strong>${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}</strong><small>Total pipeline</small></div>
      </div>

      <div className="project-panel filters-panel">
        <div className="panel-toolbar">
          <div className="panel-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search deals" /></div>
          <div className="panel-filter"><Filter size={15} />
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="All">All stages</option>
              {stageGroups.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="pipeline-grid">
        {stageGroups.map((group) => (
          <div key={group} className="project-panel pipeline-column">
            <h3>{group}</h3>
            {filteredDeals.filter((deal) => deal.stage === group).length ? (
              filteredDeals.filter((deal) => deal.stage === group).map((deal) => (
                <div key={deal.id} className="pipeline-card">
                  <div className="pipeline-topline"><strong>{deal.name}</strong><span>{deal.account}</span></div>
                  <p>${deal.value.toLocaleString()}</p>
                  <div className="pipeline-footer"><span>{deal.owner}</span><small>{deal.probability}%</small></div>
                </div>
              ))
            ) : (
              <div className="empty-state small">No deals in this stage.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TaskflowApp({ onBack }) {
  const [tasks, setTasks] = useState(taskSeed);
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All");
  const [form, setForm] = useState({ title: "", priority: "Medium", dueDate: "", category: "Sales" });
  const [editingId, setEditingId] = useState(null);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesText = task.title.toLowerCase().includes(query.toLowerCase());
    const matchesPriority = priority === "All" || task.priority === priority;
    return matchesText && matchesPriority;
  }), [tasks, query, priority]);

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title) return;

    if (editingId) {
      setTasks((current) => current.map((task) => task.id === editingId ? { ...task, title: form.title, priority: form.priority, dueDate: form.dueDate, category: form.category } : task));
      setEditingId(null);
    } else {
      setTasks((current) => [{ id: Date.now(), ...form, completed: false }, ...current]);
    }

    setForm({ title: "", priority: "Medium", dueDate: "", category: "Sales" });
  };

  const toggleTask = (id) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setForm({ title: task.title, priority: task.priority, dueDate: task.dueDate, category: task.category });
  };

  return (
    <div className="project-app-shell">
      <div className="project-app-topbar">
        <button className="project-back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      </div>
      <ProjectAppHeader title="Taskflow" subtitle="Productivity Web App" badge="React + Node.js + MongoDB ready" />

      <div className="project-stat-grid">
        <div className={statCardClass}><span>Total tasks</span><strong>{tasks.length}</strong><small>Team planning</small></div>
        <div className={statCardClass}><span>Pending</span><strong>{pendingTasks.length}</strong><small>Need action</small></div>
        <div className={statCardClass}><span>Completed</span><strong>{completedTasks.length}</strong><small>Finished</small></div>
        <div className={statCardClass}><span>Focus</span><strong>{tasks.filter((task) => task.priority === "High").length}</strong><small>High priority</small></div>
      </div>

      <div className="project-form-grid task-layout">
        <div className="project-panel">
          <div className="panel-toolbar">
            <div className="panel-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks" /></div>
            <div className="panel-filter"><Filter size={15} />
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="All">All priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="task-column">
            <div>
              <h3>Pending tasks</h3>
              {pendingTasks.length ? pendingTasks.map((task) => (
                <div key={task.id} className="task-item">
                  <button type="button" className="task-check" onClick={() => toggleTask(task.id)}><CircleDashed size={17} /></button>
                  <div className="task-copy">
                    <strong>{task.title}</strong>
                    <span>{task.category} · {task.priority} · {task.dueDate}</span>
                  </div>
                  <div className="task-actions">
                    <button type="button" onClick={() => startEdit(task)}><Edit3 size={15} /></button>
                    <button type="button" onClick={() => deleteTask(task.id)}><Trash2 size={15} /></button>
                  </div>
                </div>
              )) : <div className="empty-state small">No pending tasks.</div>}
            </div>

            <div>
              <h3>Completed</h3>
              {completedTasks.length ? completedTasks.map((task) => (
                <div key={task.id} className="task-item completed">
                  <button type="button" className="task-check" onClick={() => toggleTask(task.id)}><Check size={17} /></button>
                  <div className="task-copy">
                    <strong>{task.title}</strong>
                    <span>{task.category} · {task.priority} · {task.dueDate}</span>
                  </div>
                  <div className="task-actions">
                    <button type="button" onClick={() => deleteTask(task.id)}><Trash2 size={15} /></button>
                  </div>
                </div>
              )) : <div className="empty-state small">No completed tasks yet.</div>}
            </div>
          </div>
        </div>

        <div className="project-panel">
          <h3>{editingId ? "Edit task" : "Add task"}</h3>
          <form className="project-form" onSubmit={handleSubmit}>
            <div className="field-row"><input placeholder="Task name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="field-row two-up">
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </div>
            <div className="field-row">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="Sales">Sales</option>
                <option value="CRM">CRM</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <button type="submit" className="project-primary-button"><Plus size={16} /> {editingId ? "Save task" : "Add task"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function BrandBoostApp({ onBack }) {
  const [campaigns, setCampaigns] = useState(campaignSeed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [form, setForm] = useState({ name: "", status: "Planning", budget: "", audience: "", performance: "Pending" });

  const filteredCampaigns = useMemo(() => campaigns.filter((campaign) => {
    const matchesQuery = [campaign.name, campaign.audience].join(" ").toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "All" || campaign.status === status);
  }), [campaigns, query, status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.audience) return;

    setCampaigns((current) => [{ id: Date.now(), ...form, engagement: 0 }, ...current]);
    setForm({ name: "", status: "Planning", budget: "", audience: "", performance: "Pending" });
  };

  return (
    <div className="project-app-shell">
      <div className="project-app-topbar">
        <button className="project-back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      </div>
      <ProjectAppHeader title="BrandBoost" subtitle="Marketing Support Tool" badge="React + Express + MongoDB ready" />

      <div className="project-stat-grid">
        <div className={statCardClass}><span>Campaigns</span><strong>{campaigns.length}</strong><small>Across lifecycle</small></div>
        <div className={statCardClass}><span>Running</span><strong>{campaigns.filter((item) => item.status === "Running").length}</strong><small>Live now</small></div>
        <div className={statCardClass}><span>Avg. engagement</span><strong>{Math.round(campaigns.reduce((sum, item) => sum + item.engagement, 0) / campaigns.length)}</strong><small>Audience response</small></div>
        <div className={statCardClass}><span>Budget</span><strong>${campaigns.reduce((sum, item) => sum + Number((item.budget || "$0").replace(/[$,]/g, "")), 0).toLocaleString()}</strong><small>Campaign spend</small></div>
      </div>

      <div className="project-form-grid">
        <div className="project-panel">
          <div className="panel-toolbar">
            <div className="panel-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search campaigns" /></div>
            <div className="panel-filter"><Filter size={15} />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Planning">Planning</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="project-list">
            {filteredCampaigns.length ? filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="project-list-item static-item">
                <div>
                  <strong>{campaign.name}</strong>
                  <span>{campaign.audience}</span>
                </div>
                <div className="project-pill">{campaign.status}</div>
              </div>
            )) : <div className="empty-state">No campaigns match the filter.</div>}
          </div>
        </div>

        <div className="project-panel">
          <h3>Launch campaign</h3>
          <form className="project-form" onSubmit={handleSubmit}>
            <div className="field-row"><input placeholder="Campaign name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="field-row"><input placeholder="Target audience" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} /></div>
            <div className="field-row two-up">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Planning">Planning</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
              <input placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </div>
            <div className="field-row"><input placeholder="Performance" value={form.performance} onChange={(e) => setForm({ ...form, performance: e.target.value })} /></div>
            <button type="submit" className="project-primary-button"><Plus size={16} /> Create campaign</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function SalesPilotApp({ onBack }) {
  const [activities] = useState(salesActivitySeed);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const filteredActivities = useMemo(() => activities.filter((activity) => {
    const matchesText = [activity.title, activity.owner].join(" ").toLowerCase().includes(query.toLowerCase());
    return matchesText && (type === "All" || activity.type === type);
  }), [activities, query, type]);

  return (
    <div className="project-app-shell">
      <div className="project-app-topbar">
        <button className="project-back-button" onClick={onBack}><ArrowLeft size={16} /> Back</button>
      </div>
      <ProjectAppHeader title="SalesPilot" subtitle="Sales Performance Hub" badge="React + JavaScript" />

      <div className="project-stat-grid">
        <div className={statCardClass}><span>Leads contacted</span><strong>1,482</strong><small>+12% this month</small></div>
        <div className={statCardClass}><span>Follow-ups</span><strong>342</strong><small>High urgency</small></div>
        <div className={statCardClass}><span>Priority opps</span><strong>28</strong><small>Ready for close</small></div>
        <div className={statCardClass}><span>Conversion rate</span><strong>24.8%</strong><small>Strong momentum</small></div>
      </div>

      <div className="project-panel filters-panel">
        <div className="panel-toolbar">
          <div className="panel-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search activity" /></div>
          <div className="panel-filter"><Filter size={15} />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All">All</option>
              <option value="Call">Call</option>
              <option value="Lead">Lead</option>
              <option value="Proposal">Proposal</option>
              <option value="Deal">Deal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="project-panel detail-panel">
        <div className="detail-header">
          <div>
            <span className="detail-kicker">Activity timeline</span>
            <h3>Recent sales activities</h3>
          </div>
          <span className="project-pill">Live</span>
        </div>
        <div className="activity-list">
          {filteredActivities.length ? filteredActivities.map((item) => (
            <div key={item.id} className="activity-item">
              <div className="activity-dot" />
              <div>
                <strong>{item.title}</strong>
                <span>{item.owner} · {item.time}</span>
              </div>
              <span className="project-pill small-pill">{item.type}</span>
            </div>
          )) : <div className="empty-state">No matching activity found.</div>}
        </div>
      </div>
    </div>
  );
}

export const projectApplications = {
  leadflow: LeadFlowApp,
  clientconnect: ClientConnectApp,
  dealtracker: DealTrackerApp,
  taskflow: TaskflowApp,
  brandboost: BrandBoostApp,
  salespilot: SalesPilotApp,
};

export const projectMeta = projectOptions;
