# Blogging Studio

A premium, responsive blogging homepage with Supabase-backed post loading, category filters, search, featured stories, and polished editorial cards.

## Run locally

```bash
npm run dev
```

Open <http://localhost:5173>.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Set these values before `public/app.js` loads, or inject them from your hosting provider:

```html
<script>
  window.BLOG_SUPABASE_URL = 'https://your-project.supabase.co';
  window.BLOG_SUPABASE_ANON_KEY = 'your-anon-key';
</script>
```

4. Insert rows into `public.posts` with `is_published = true`.

When Supabase values are missing, the app displays demo posts so the design remains visible.
