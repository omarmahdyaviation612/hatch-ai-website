require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const BASE = '/dashboard';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect root → /dashboard
app.get('/', (req, res) => res.redirect(BASE));

// ─── SESSION ─────────────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || 'hatch-marketing-secret-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// ─── USERS ────────────────────────────────────────────────────────────
const USERS = [{
  username: process.env.DASHBOARD_USER || 'OmarMahdy',
  passwordHash: bcrypt.hashSync(process.env.DASHBOARD_PASS || 'Ic@nisa612', 10)
}];

// ─── PAGES CONFIG ─────────────────────────────────────────────────────
const PAGES = [
  { key: 'smartify',      name: 'smartify.Ai',  id: process.env.SMARTIFY_PAGE_ID,       token: process.env.SMARTIFY_PAGE_TOKEN,      category: 'Education',        color: '#6C63FF' },
  { key: 'salera',        name: 'Salera',        id: process.env.SALERA_PAGE_ID,         token: process.env.SALERA_PAGE_TOKEN,        category: 'Food & Drink',     color: '#FF6B6B' },
  { key: 'hatch',         name: 'Hatch.Ai',      id: process.env.HATCH_PAGE_ID,          token: process.env.HATCH_PAGE_TOKEN,         category: 'Marketing Agency', color: '#4ECDC4' },
  { key: 'gocharter',     name: 'GO Charter',    id: process.env.GOCHARTER_PAGE_ID,      token: process.env.GOCHARTER_PAGE_TOKEN,     category: 'Tour Agency',      color: '#45B7D1' },
  { key: 'koala_jeddah',  name: 'Koala Jeddah',  id: process.env.KOALA_JEDDAH_PAGE_ID,   token: process.env.KOALA_JEDDAH_PAGE_TOKEN,  category: 'Clothing',         color: '#FFA07A' },
  { key: 'koala',         name: 'Koala',         id: process.env.KOALA_PAGE_ID,          token: process.env.KOALA_PAGE_TOKEN,         category: 'Clothing',         color: '#98D8C8' },
];

const GRAPH_API = 'https://graph.facebook.com/v20.0';
let scheduledPosts = [];

// ─── STATIC ASSETS (unprotected) ──────────────────────────────────────
app.use(`${BASE}/assets`, express.static(path.join(__dirname, 'public', 'assets')));

// ─── LOGIN ────────────────────────────────────────────────────────────
app.get(`${BASE}/login`, (req, res) => {
  if (req.session?.user) return res.redirect(BASE);
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post(`${BASE}/login`, (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username.toLowerCase() === username?.toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.redirect(`${BASE}/login?error=Invalid+username+or+password`);
  }
  req.session.user = { username: user.username };
  res.redirect(BASE);
});

app.get(`${BASE}/logout`, (req, res) => {
  req.session.destroy();
  res.redirect(`${BASE}/login`);
});

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────
app.use(BASE, (req, res, next) => {
  if (req.session?.user) return next();
  if (req.path.startsWith('/api')) return res.status(401).json({ error: 'Unauthorized' });
  res.redirect(`${BASE}/login`);
});

// ─── PROTECTED STATIC FILES ───────────────────────────────────────────
app.use(BASE, express.static(path.join(__dirname, 'public')));

// ─── API: Me ──────────────────────────────────────────────────────────
app.get(`${BASE}/api/me`, (req, res) => {
  res.json({ username: req.session.user.username });
});

// ─── API: Pages ───────────────────────────────────────────────────────
app.get(`${BASE}/api/pages`, (req, res) => {
  res.json(PAGES.map(p => ({ key: p.key, name: p.name, id: p.id, category: p.category, color: p.color })));
});

// ─── API: Summary ─────────────────────────────────────────────────────
app.get(`${BASE}/api/summary`, async (req, res) => {
  const summaries = [];
  for (const page of PAGES) {
    try {
      const r = await axios.get(`${GRAPH_API}/${page.id}`, {
        params: { fields: 'name,fan_count,followers_count,talking_about_count,category', access_token: page.token }
      });
      summaries.push({ key: page.key, color: page.color, ...r.data });
    } catch (err) {
      summaries.push({ key: page.key, name: page.name, color: page.color, error: err.response?.data?.error?.message });
    }
  }
  res.json(summaries);
});

// ─── API: Analytics ───────────────────────────────────────────────────
app.get(`${BASE}/api/analytics/:pageKey`, async (req, res) => {
  const page = PAGES.find(p => p.key === req.params.pageKey);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  try {
    const [insightsRes, postsRes] = await Promise.all([
      axios.get(`${GRAPH_API}/${page.id}/insights`, {
        params: { metric: 'page_fans,page_impressions,page_engaged_users,page_post_engagements', period: 'day', access_token: page.token }
      }),
      axios.get(`${GRAPH_API}/${page.id}/posts`, {
        params: { fields: 'id,message,created_time,likes.summary(true),comments.summary(true),shares', limit: 10, access_token: page.token }
      })
    ]);
    res.json({ insights: insightsRes.data.data, posts: postsRes.data.data });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
});

// ─── API: Posts ────────────────────────────────────────────────────────
app.get(`${BASE}/api/posts/:pageKey`, async (req, res) => {
  const page = PAGES.find(p => p.key === req.params.pageKey);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  try {
    const r = await axios.get(`${GRAPH_API}/${page.id}/posts`, {
      params: { fields: 'id,message,story,created_time,full_picture,likes.summary(true),comments.summary(true),shares', limit: 20, access_token: page.token }
    });
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
});

// ─── API: Publish Multi ───────────────────────────────────────────────
app.post(`${BASE}/api/publish/multi`, async (req, res) => {
  const { pageKeys, message, link, imageUrl } = req.body;
  const results = [];
  for (const pageKey of pageKeys) {
    const page = PAGES.find(p => p.key === pageKey);
    if (!page) { results.push({ page: pageKey, error: 'Not found' }); continue; }
    try {
      let endpoint = `${GRAPH_API}/${page.id}/feed`;
      let payload = { message, access_token: page.token };
      if (link) payload.link = link;
      if (imageUrl) {
        endpoint = `${GRAPH_API}/${page.id}/photos`;
        payload = { url: imageUrl, caption: message, access_token: page.token };
      }
      const r = await axios.post(endpoint, payload);
      results.push({ page: page.name, success: true, postId: r.data.id });
    } catch (err) {
      results.push({ page: page.name, error: err.response?.data?.error?.message || err.message });
    }
  }
  res.json({ results });
});

// ─── API: Schedule ────────────────────────────────────────────────────
app.post(`${BASE}/api/schedule`, (req, res) => {
  const { pageKeys, message, link, imageUrl, scheduledTime } = req.body;
  const post = { id: Date.now().toString(), pageKeys, message, link, imageUrl, scheduledTime, status: 'scheduled', createdAt: new Date().toISOString() };
  scheduledPosts.push(post);
  res.json({ success: true, post });
});

app.get(`${BASE}/api/schedule`, (req, res) => res.json(scheduledPosts));

app.delete(`${BASE}/api/schedule/:id`, (req, res) => {
  scheduledPosts = scheduledPosts.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

// ─── API: Comments ────────────────────────────────────────────────────
app.get(`${BASE}/api/comments/:postId`, async (req, res) => {
  const page = PAGES.find(p => p.key === req.query.pageKey) || PAGES[0];
  try {
    const r = await axios.get(`${GRAPH_API}/${req.params.postId}/comments`, {
      params: { fields: 'id,message,from,created_time,like_count', limit: 50, access_token: page.token }
    });
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
});

// ─── API: AI Caption ──────────────────────────────────────────────────
app.post(`${BASE}/api/ai/caption`, (req, res) => {
  const { topic, tone, pageKey } = req.body;
  const pageName = PAGES.find(p => p.key === pageKey)?.name || 'our brand';
  const captions = {
    professional: [
      `🚀 Exciting news from ${pageName}! ${topic} – stay tuned for more updates. #Innovation #Growth`,
      `📢 At ${pageName}, we're proud to share: ${topic}. Follow us for the latest. #Business`,
      `💡 ${topic} – ${pageName} is leading the way. Join us on this journey. #Excellence`
    ],
    casual: [
      `Hey everyone! 👋 ${topic} – and we couldn't be more excited! Drop a ❤️ if you agree!`,
      `So... ${topic} 🎉 Who else is pumped?! Tag a friend who needs to see this!`,
      `Just wanted to share: ${topic} 😍 Like & share to spread the word!`
    ],
    promotional: [
      `🔥 LIMITED TIME! ${topic} – Don't miss out! Click link in bio. #Sale #Deal`,
      `💥 SPECIAL OFFER: ${topic}! Contact us NOW before it's gone! #Promo`,
      `✨ ${pageName} presents: ${topic}! Book/Order today – link in bio! 🛒`
    ]
  };
  const list = captions[tone] || captions.professional;
  res.json({ suggestions: list.map((c, i) => ({ id: i + 1, caption: c })) });
});

// ─── SCHEDULED POSTS RUNNER ───────────────────────────────────────────
setInterval(async () => {
  const now = new Date();
  for (const post of scheduledPosts.filter(p => p.status === 'scheduled' && new Date(p.scheduledTime) <= now)) {
    post.status = 'publishing';
    try {
      for (const pageKey of post.pageKeys) {
        const page = PAGES.find(p => p.key === pageKey);
        if (!page) continue;
        await axios.post(`${GRAPH_API}/${page.id}/feed`, { message: post.message, access_token: page.token });
      }
      post.status = 'published';
      post.publishedAt = new Date().toISOString();
    } catch (err) {
      post.status = 'failed';
      post.error = err.message;
    }
  }
}, 60000);

// ─── START ────────────────────────────────────────────────────────────
const PORT = process.env.DASHBOARD_PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Hatch Marketing Dashboard → http://localhost:${PORT}/dashboard`);
  console.log(`🔐 Login: ${process.env.DASHBOARD_USER || 'OmarMahdy'}`);
  console.log(`📊 Pages: ${PAGES.map(p => p.name).join(', ')}\n`);
});
