const supabaseUrl = window.BLOG_SUPABASE_URL;
const supabaseAnonKey = window.BLOG_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const demoPosts = [
  {
    id: '1',
    title: 'Designing a calm writing ritual for a noisy world',
    slug: 'calm-writing-ritual',
    excerpt: 'A practical guide to building a repeatable publishing rhythm with mood boards, research notes, and visual storytelling.',
    content: 'Long-form article content lives in Supabase and can be rendered by slug.',
    cover_image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80',
    category: 'Creative Process',
    author_name: 'Maya Chen',
    author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    read_time: '8 min read',
    published_at: '2026-06-02T10:00:00.000Z',
    created_at: '2026-06-01T10:00:00.000Z',
    is_published: true,
    is_featured: true,
  },
  {
    id: '2',
    title: 'The visual checklist every editorial team needs',
    slug: 'visual-editorial-checklist',
    excerpt: 'Turn inspiration images into reusable layout rules so your blog feels consistent from headline to footer.',
    content: 'Long-form article content lives in Supabase and can be rendered by slug.',
    cover_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    category: 'Editorial',
    author_name: 'Noah Rivera',
    author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    read_time: '5 min read',
    published_at: '2026-05-28T09:30:00.000Z',
    created_at: '2026-05-27T09:30:00.000Z',
    is_published: true,
    is_featured: false,
  },
  {
    id: '3',
    title: 'How to brief Supabase content models for scale',
    slug: 'supabase-content-models',
    excerpt: 'A schema-first approach for searchable categories, featured stories, author cards, and publishing states.',
    content: 'Long-form article content lives in Supabase and can be rendered by slug.',
    cover_image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    category: 'Supabase',
    author_name: 'Ari Brooks',
    author_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
    read_time: '6 min read',
    published_at: '2026-05-21T12:15:00.000Z',
    created_at: '2026-05-20T12:15:00.000Z',
    is_published: true,
    is_featured: false,
  },
];

let posts = demoPosts;
let activeCategory = 'All';
let search = '';

const featuredCard = document.querySelector('#featured-card');
const postGrid = document.querySelector('#post-grid');
const categoryList = document.querySelector('#category-list');
const searchInput = document.querySelector('#search-input');
const statusText = document.querySelector('#supabase-status');

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}).format(new Date(date));

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character]));

const renderFeatured = () => {
  const featuredPost = posts.find((post) => post.is_featured) || posts[0];

  featuredCard.innerHTML = `
    <img src="${escapeHtml(featuredPost.cover_image)}" alt="Featured blog cover" />
    <div class="featured-overlay">
      <span>${escapeHtml(featuredPost.category)}</span>
      <h2>${escapeHtml(featuredPost.title)}</h2>
      <p>${escapeHtml(featuredPost.excerpt)}</p>
      <div class="author-row">
        <img src="${escapeHtml(featuredPost.author_avatar)}" alt="${escapeHtml(featuredPost.author_name)}" />
        <div>
          <strong>${escapeHtml(featuredPost.author_name)}</strong>
          <small>${formatDate(featuredPost.published_at)} • ${escapeHtml(featuredPost.read_time)}</small>
        </div>
      </div>
    </div>
  `;
};

const renderCategories = () => {
  const categories = ['All', ...new Set(posts.map((post) => post.category))];

  categoryList.innerHTML = categories.map((category) => `
    <button class="${category === activeCategory ? 'active' : ''}" data-category="${escapeHtml(category)}" type="button">
      ${escapeHtml(category)}
    </button>
  `).join('');

  categoryList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      render();
    });
  });
};

const getFilteredPosts = () => posts.filter((post) => {
  const normalizedSearch = search.trim().toLowerCase();
  const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
  const matchesSearch = normalizedSearch.length === 0 ||
    post.title.toLowerCase().includes(normalizedSearch) ||
    post.excerpt.toLowerCase().includes(normalizedSearch) ||
    post.category.toLowerCase().includes(normalizedSearch);

  return matchesCategory && matchesSearch;
});

const renderPosts = () => {
  const filteredPosts = getFilteredPosts();

  postGrid.innerHTML = filteredPosts.map((post) => `
    <article class="post-card">
      <img src="${escapeHtml(post.cover_image)}" alt="Blog post cover" />
      <div class="post-body">
        <div class="post-meta">
          <span>${escapeHtml(post.category)}</span>
          <span><span aria-hidden="true">◷</span> ${formatDate(post.published_at)}</span>
        </div>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <div class="card-footer">
          <div class="author-row compact">
            <img src="${escapeHtml(post.author_avatar)}" alt="${escapeHtml(post.author_name)}" />
            <div>
              <strong>${escapeHtml(post.author_name)}</strong>
              <small>${escapeHtml(post.read_time)}</small>
            </div>
          </div>
          <a href="/#/${escapeHtml(post.slug)}" aria-label="Read ${escapeHtml(post.title)}">☞</a>
        </div>
      </div>
    </article>
  `).join('');
};

const render = () => {
  renderFeatured();
  renderCategories();
  renderPosts();
};

const loadSupabasePosts = async () => {
  if (!isSupabaseConfigured) {
    return;
  }

  statusText.textContent = 'Loading live posts from Supabase...';

  const endpoint = `${supabaseUrl}/rest/v1/posts?select=*&is_published=eq.true&order=published_at.desc`;
  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase returned ${response.status}`);
  }

  const livePosts = await response.json();

  if (livePosts.length > 0) {
    posts = livePosts;
    statusText.textContent = 'Live Supabase content is connected.';
  } else {
    statusText.textContent = 'Supabase is connected; seed posts to replace demos.';
  }
};

searchInput.addEventListener('input', (event) => {
  search = event.target.value;
  renderPosts();
});

render();
loadSupabasePosts()
  .then(render)
  .catch((error) => {
    statusText.textContent = `Supabase connection issue: ${error.message}. Showing demo posts.`;
  });
