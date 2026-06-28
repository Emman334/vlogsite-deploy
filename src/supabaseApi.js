import { supabase } from './supabaseClient';

// Tables expected:
// - content: id, type, title, content, tags, icon, author_image, audio_url, likes, dislikes, created_at
//
// Storage expected (recommended):
// - author images stored in bucket `author-images`
// - podcast audio stored in bucket `podcast-audio`
// and returned as public URLs (or via `getPublicUrl`).

function toContentRow(row) {
  // Keep as-is; React components expect these fields.
  return row;
}

export async function getHomeData() {
  // Articles ordered by created_at desc
  const { data: articles, error: aErr } = await supabase
    .from('content')
    .select('id,type,title,content,tags,icon,author_image,likes,dislikes,created_at')
    .eq('type', 'article')
    .order('created_at', { ascending: false });
  if (aErr) throw aErr;

  const { data: podcasts, error: pErr } = await supabase
    .from('content')
    .select('id,type,title,content,tags,icon,author_image,likes,dislikes,created_at,audio_url')
    .eq('type', 'podcast')
    .order('created_at', { ascending: false });
  if (pErr) throw pErr;

  const { data: topArticles, error: tAErr } = await supabase
    .from('content')
    .select('id,type,title,content,tags,icon,author_image,likes,dislikes,created_at')
    .eq('type', 'article')
    .order('likes', { ascending: false })
    .limit(3);
  if (tAErr) throw tAErr;

  const { data: topPodcasts, error: tPErr } = await supabase
    .from('content')
    .select('id,type,title,content,tags,icon,author_image,likes,dislikes,created_at,audio_url')
    .eq('type', 'podcast')
    .order('likes', { ascending: false })
    .limit(3);
  if (tPErr) throw tPErr;

  return {
    articles: (articles || []).map(toContentRow),
    podcasts: (podcasts || []).map(toContentRow),
    top_articles: (topArticles || []).map(toContentRow),
    top_podcasts: (topPodcasts || []).map(toContentRow)
  };
}

export async function likeContent(id) {
  // Atomic increment should be done via an RPC in Postgres.
  // For simplicity (and so the UI works), we do a best-effort read/insert-less approach.
  // Recommended: create RPC functions `increment_likes(id)` and `increment_dislikes(id)`.
  const { data, error } = await supabase
    .from('content')
    .select('likes')
    .eq('id', id)
    .single();
  if (error) throw error;

  const nextLikes = (data?.likes || 0) + 1;

  const { error: updErr } = await supabase
    .from('content')
    .update({ likes: nextLikes })
    .eq('id', id);
  if (updErr) throw updErr;
}

export async function dislikeContent(id) {
  const { data, error } = await supabase
    .from('content')
    .select('dislikes')
    .eq('id', id)
    .single();
  if (error) throw error;

  const nextDislikes = (data?.dislikes || 0) + 1;

  const { error: updErr } = await supabase
    .from('content')
    .update({ dislikes: nextDislikes })
    .eq('id', id);
  if (updErr) throw updErr;
}





export async function createContent(formData) {
  // Extract fields
  const type = formData.get('type');
  const title = formData.get('title');
  const content = formData.get('content');
  const tags = formData.get('tags');
  const icon = formData.get('icon');
  const authorImage = formData.get('author_image');
  const audioFile = formData.get('audio_file');

  let authorImageUrl = '';
  if (authorImage && typeof authorImage === 'object' && 'name' in authorImage) {
    const file = authorImage;
    const fileExt = String(file.name).split('.').pop() || 'bin';
    const path = `author-${Date.now()}.${fileExt}`;

    const { error: upErr } = await supabase.storage
      .from('author-images')
      .upload(path, file, { upsert: true });
    if (upErr) throw upErr;

    const { data } = supabase.storage.from('author-images').getPublicUrl(path);
    authorImageUrl = data.publicUrl;
  }

  let audioUrl = '';
  if (type === 'podcast' && audioFile && typeof audioFile === 'object' && 'name' in audioFile) {
    const file = audioFile;
    const fileExt = String(file.name).split('.').pop() || 'mp3';
    const path = `podcast-${Date.now()}.${fileExt}`;

    const { error: upErr } = await supabase.storage
      .from('podcast-audio')
      .upload(path, file, { upsert: true });
    if (upErr) throw upErr;

    const { data } = supabase.storage.from('podcast-audio').getPublicUrl(path);
    audioUrl = data.publicUrl;
  }

  const payload = {
    type,
    title,
    content,
    tags,
    icon,
    author_image: authorImageUrl,
    audio_url: audioUrl,
    likes: 0,
    dislikes: 0
  };

  const { data: inserted, error: insErr } = await supabase
    .from('content')
    .insert(payload)
    .select()
    .single();

  if (insErr) throw insErr;
  return inserted;
}

