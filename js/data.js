/* Demo Data Generator - ScheduleHub Booking Platform */
const DataStore = (() => {
  const FIRST = ['Alex','Jordan','Taylor','Morgan','Casey','Riley','Quinn','Avery','Blake','Cameron','Dakota','Emery','Finley','Harper','Indigo','Jules','Kai','Logan','Marley','Noel','Parker','Reese','Sage','Skyler','Tatum','Val','Winter','Zion','Adrian','Brook','Cedar','Drew','Ellis','Gray','Haven','Iris','Jade','Kit','Lane','Milan','North','Ocean','Pace','Rain','Storm','True','Urban','Vale','West','Yael','Azure'];
  const LAST = ['Chen','Patel','Kim','Nguyen','Garcia','Martinez','Johnson','Williams','Brown','Jones','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Robinson','Clark','Lewis','Lee','Walker','Hall','Allen','Young','King','Wright','Scott','Green','Baker','Adams','Nelson','Hill','Campbell','Mitchell','Roberts','Carter','Phillips','Evans','Turner','Torres','Parker','Collins','Edwards','Stewart'];
  const SERVICES = [
    { id: 's1', name: 'General Consultation', category: 'medical', icon: '🏥', duration: 30, price: 85, color: '#EF4444' },
    { id: 's2', name: 'Dental Checkup', category: 'medical', icon: '🦷', duration: 45, price: 120, color: '#EF4444' },
    { id: 's3', name: 'Haircut & Style', category: 'salon', icon: '✂️', duration: 60, price: 55, color: '#EC4899' },
    { id: 's4', name: 'Color Treatment', category: 'salon', icon: '💇', duration: 120, price: 150, color: '#EC4899' },
    { id: 's5', name: 'Personal Training', category: 'fitness', icon: '💪', duration: 60, price: 75, color: '#22C55E' },
    { id: 's6', name: 'Yoga Session', category: 'fitness', icon: '🧘', duration: 90, price: 45, color: '#22C55E' },
    { id: 's7', name: 'Strategy Meeting', category: 'business', icon: '💼', duration: 60, price: 200, color: '#3B82F6' },
    { id: 's8', name: 'Team Workshop', category: 'business', icon: '👥', duration: 180, price: 500, color: '#3B82F6' },
    { id: 's9', name: 'Video Consultation', category: 'consultation', icon: '📹', duration: 30, price: 65, color: '#7C3AED' },
    { id: 's10', name: 'Telehealth Visit', category: 'consultation', icon: '🩺', duration: 20, price: 50, color: '#7C3AED' },
    { id: 's11', name: 'Life Coaching', category: 'coaching', icon: '🎯', duration: 60, price: 95, color: '#F59E0B' },
    { id: 's12', name: 'Career Coaching', category: 'coaching', icon: '📈', duration: 45, price: 110, color: '#F59E0B' },
    { id: 's13', name: 'Manicure', category: 'salon', icon: '💅', duration: 45, price: 40, color: '#EC4899' },
    { id: 's14', name: 'Massage Therapy', category: 'fitness', icon: '💆', duration: 60, price: 90, color: '#22C55E' },
    { id: 's15', name: 'Nutrition Consult', category: 'medical', icon: '🥗', duration: 30, price: 70, color: '#EF4444' }
  ];
  const STAFF = [
    { id: 'st1', name: 'Dr. Sam Rivera', role: 'Physician', dept: 'Medical', avatar: 'SR', rating: 4.9, bookings: 342 },
    { id: 'st2', name: 'Jamie Ortiz', role: 'Stylist', dept: 'Salon', avatar: 'JO', rating: 4.8, bookings: 289 },
    { id: 'st3', name: 'Chris Park', role: 'Trainer', dept: 'Fitness', avatar: 'CP', rating: 4.7, bookings: 256 },
    { id: 'st4', name: 'Morgan Lee', role: 'Consultant', dept: 'Business', avatar: 'ML', rating: 4.9, bookings: 198 },
    { id: 'st5', name: 'Riley Chen', role: 'Coach', dept: 'Coaching', avatar: 'RC', rating: 4.8, bookings: 167 },
    { id: 'st6', name: 'Dana Brooks', role: 'Therapist', dept: 'Medical', avatar: 'DB', rating: 4.6, bookings: 145 },
    { id: 'st7', name: 'Alex Kim', role: 'Stylist', dept: 'Salon', avatar: 'AK', rating: 4.7, bookings: 223 },
    { id: 'st8', name: 'Jordan Wells', role: 'Trainer', dept: 'Fitness', avatar: 'JW', rating: 4.5, bookings: 189 },
    { id: 'st9', name: 'Taylor Fox', role: 'Advisor', dept: 'Business', avatar: 'TF', rating: 4.8, bookings: 134 },
    { id: 'st10', name: 'Casey Dunn', role: 'Coach', dept: 'Coaching', avatar: 'CD', rating: 4.9, bookings: 156 },
    { id: 'st11', name: 'Quinn Hayes', role: 'Nurse', dept: 'Medical', avatar: 'QH', rating: 4.7, bookings: 278 },
    { id: 'st12', name: 'Avery Stone', role: 'Stylist', dept: 'Salon', avatar: 'AS', rating: 4.6, bookings: 201 }
  ];
  const STATUSES = ['confirmed','pending','completed','cancelled','rescheduled','no-show'];
  const NOTIF_TYPES = ['confirmation','reminder','cancellation','payment','reschedule','system','promo'];

  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[rand(0, arr.length - 1)]; }
  function genName() { return `${pick(FIRST)} ${pick(LAST)}`; }
  function genEmail(name) { return name.toLowerCase().replace(' ', '.') + rand(1,99) + '@demo-mail.example'; }
  function genPhone() { return `+1 (${rand(200,999)}) ${rand(200,999)}-${String(rand(1000,9999))}`; }
  function genDate(daysOffset) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
  }
  function genTime() {
    const h = rand(8, 18);
    const m = pick([0, 15, 30, 45]);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  }

  const customers = [];
  for (let i = 0; i < 250; i++) {
    const name = genName();
    const bookings = rand(1, 45);
    customers.push({
      id: `c${i + 1}`,
      name,
      email: genEmail(name),
      phone: genPhone(),
      avatar: name.split(' ').map(n => n[0]).join('').slice(0, 2),
      bookings,
      spent: bookings * rand(40, 200),
      lastVisit: genDate(-rand(0, 90)),
      status: pick(['active', 'active', 'active', 'inactive', 'vip']),
      notes: pick(['Prefers morning slots', 'Allergic to latex', 'Regular client', 'New referral', 'Corporate account', '']),
      rating: (3.5 + Math.random() * 1.5).toFixed(1)
    });
  }

  const appointments = [];
  for (let i = 0; i < 500; i++) {
    const svc = pick(SERVICES);
    const cust = pick(customers);
    const staff = pick(STAFF);
    const dayOffset = rand(-60, 60);
    appointments.push({
      id: `a${i + 1}`,
      title: `${svc.name} - ${cust.name.split(' ')[0]}`,
      customerId: cust.id,
      customerName: cust.name,
      serviceId: svc.id,
      serviceName: svc.name,
      category: svc.category,
      staffId: staff.id,
      staffName: staff.name,
      date: genDate(dayOffset),
      time: genTime(),
      duration: svc.duration,
      price: svc.price,
      status: pick(STATUSES),
      color: svc.color,
      notes: pick(['', 'First visit', 'Follow-up required', 'VIP client', 'Insurance covered'])
    });
  }

  const notifications = [];
  const notifMsgs = [
    'Appointment confirmed for tomorrow at 10:00 AM',
    'Reminder: Your session starts in 1 hour',
    'Booking cancelled by client',
    'Payment of $85.00 received successfully',
    'Appointment rescheduled to next week',
    'New booking request pending approval',
    'Weekly report is ready for download',
    'Staff member updated availability',
    'Customer left a 5-star review',
    'Waitlist slot now available',
    'Subscription renewal due in 3 days',
    'System maintenance scheduled tonight',
    'New team member added to schedule',
    'Peak hours detected for Friday',
    'Automated reminder sent to 12 clients'
  ];
  for (let i = 0; i < 120; i++) {
    notifications.push({
      id: `n${i + 1}`,
      type: pick(NOTIF_TYPES),
      message: pick(notifMsgs),
      time: `${rand(1, 59)} ${pick(['min', 'hrs', 'days'])} ago`,
      read: Math.random() > 0.4,
      icon: pick(['📅', '🔔', '💳', '✅', '⚠️', '📧', '🔄', '⭐'])
    });
  }

  const reviews = [];
  const reviewTexts = [
    'Excellent service, very professional and on time.',
    'Great experience overall, will book again.',
    'Staff was friendly and knowledgeable.',
    'Clean facility and smooth booking process.',
    'Highly recommend, exceeded expectations.',
    'Good value for money, convenient scheduling.',
    'Quick appointment, minimal wait time.',
    'Very satisfied with the consultation.',
    'Easy online booking, seamless check-in.',
    'Outstanding care and attention to detail.'
  ];
  for (let i = 0; i < 180; i++) {
    const cust = pick(customers);
    const svc = pick(SERVICES);
    reviews.push({
      id: `r${i + 1}`,
      customerName: cust.name,
      serviceName: svc.name,
      rating: rand(3, 5),
      text: pick(reviewTexts),
      date: genDate(-rand(0, 180)),
      staffName: pick(STAFF).name
    });
  }

  const activityLogs = [];
  const actions = ['Booked appointment', 'Cancelled booking', 'Rescheduled session', 'Completed payment', 'Updated profile', 'Left review', 'Joined waitlist', 'Checked in via QR'];
  for (let i = 0; i < 200; i++) {
    activityLogs.push({
      id: `al${i + 1}`,
      action: pick(actions),
      user: pick(customers).name,
      time: `${rand(1, 120)} ${pick(['min', 'hrs', 'days'])} ago`,
      type: pick(['booking', 'payment', 'system', 'review'])
    });
  }

  const payments = [];
  for (let i = 0; i < 150; i++) {
    const appt = pick(appointments.filter(a => a.status === 'completed' || a.status === 'confirmed'));
    payments.push({
      id: `p${i + 1}`,
      amount: appt ? appt.price : rand(40, 500),
      method: pick(['Credit Card', 'UPI', 'PayPal', 'Wallet', 'Bank Transfer']),
      status: pick(['completed', 'completed', 'completed', 'pending', 'refunded']),
      date: genDate(-rand(0, 90)),
      customer: appt ? appt.customerName : genName(),
      invoice: `INV-${String(10000 + i).slice(1)}`
    });
  }

  const waitlist = [];
  for (let i = 0; i < 25; i++) {
    const svc = pick(SERVICES);
    waitlist.push({
      id: `w${i + 1}`,
      customer: pick(customers).name,
      service: svc.name,
      preferredDate: genDate(rand(1, 14)),
      priority: pick(['high', 'medium', 'low']),
      added: `${rand(1, 48)} hrs ago`
    });
  }

  const analytics = {
    totalAppointments: 12847,
    totalRevenue: 892450,
    activeCustomers: 3842,
    avgRating: 4.7,
    monthlyRevenue: [62000, 71000, 68500, 78000, 82000, 89500, 94000, 88000, 91000, 97000, 102000, 108500],
    monthlyBookings: [820, 910, 880, 950, 1020, 1100, 1150, 1080, 1120, 1180, 1240, 1310],
    serviceBreakdown: SERVICES.map(s => ({ name: s.name, value: rand(50, 400), color: s.color })),
    peakHours: Array.from({ length: 24 }, (_, h) => ({ hour: h, count: h >= 8 && h <= 18 ? rand(15, 85) : rand(0, 10) })),
    staffPerformance: STAFF.map(s => ({ name: s.name.split(' ')[0], bookings: s.bookings, revenue: s.bookings * rand(50, 120), rating: s.rating })),
    retentionRate: 78,
    cancellationRate: 4.2,
    noShowRate: 2.8,
    categories: [
      { name: 'Medical', pct: 28, color: '#EF4444' },
      { name: 'Salon', pct: 22, color: '#EC4899' },
      { name: 'Fitness', pct: 18, color: '#22C55E' },
      { name: 'Business', pct: 15, color: '#3B82F6' },
      { name: 'Consultation', pct: 10, color: '#7C3AED' },
      { name: 'Coaching', pct: 7, color: '#F59E0B' }
    ],
    weeklyHeatmap: Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => rand(0, 100)))
  };

  const plans = [
    { id: 'free', name: 'Starter', price: 0, features: ['50 bookings/mo', '1 staff member', 'Basic calendar', 'Email notifications'] },
    { id: 'pro', name: 'Professional', price: 29, features: ['500 bookings/mo', '10 staff members', 'Advanced analytics', 'SMS reminders', 'Custom branding', 'Payment integration'], popular: true },
    { id: 'biz', name: 'Business', price: 79, features: ['Unlimited bookings', 'Unlimited staff', 'Team scheduling', 'API access', 'Priority support', 'White-label', 'Video consultations'] },
    { id: 'ent', name: 'Enterprise', price: 199, features: ['Everything in Business', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'Advanced security', 'Multi-location'] }
  ];

  const devices = [
    { id: 'd1', name: 'Windows Desktop', location: 'Office Network', lastActive: '2 min ago', current: true },
    { id: 'd2', name: 'Mobile Device', location: 'Mobile App', lastActive: '1 hr ago', current: false },
    { id: 'd3', name: 'Tablet', location: 'Home Network', lastActive: '3 days ago', current: false },
    { id: 'd4', name: 'MacBook', location: 'Office Network', lastActive: '1 week ago', current: false }
  ];

  const loginActivity = [];
  for (let i = 0; i < 30; i++) {
    loginActivity.push({
      id: `la${i + 1}`,
      device: pick(['Windows Desktop', 'Mobile Device', 'Tablet', 'MacBook']),
      location: pick(['Office Network', 'Home Network', 'Mobile App', 'VPN']),
      time: genDate(-rand(0, 30)) + ' ' + genTime(),
      status: pick(['success', 'success', 'success', 'failed'])
    });
  }

  const consultations = [];
  for (let i = 0; i < 20; i++) {
    consultations.push({
      id: `vc${i + 1}`,
      title: pick(['Follow-up Consult', 'Initial Assessment', 'Progress Review', 'Wellness Check']),
      host: pick(STAFF).name,
      participants: rand(2, 6),
      time: genTime(),
      date: genDate(rand(0, 7)),
      status: pick(['scheduled', 'live', 'completed'])
    });
  }

  return {
    services: SERVICES,
    staff: STAFF,
    customers,
    appointments,
    notifications,
    reviews,
    activityLogs,
    payments,
    waitlist,
    analytics,
    plans,
    devices,
    loginActivity,
    consultations,
    categories: ['medical', 'salon', 'fitness', 'business', 'consultation', 'coaching']
  };
})();

if (typeof module !== 'undefined') module.exports = DataStore;
