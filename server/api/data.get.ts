import { serverSupabaseClient } from '#supabase/server'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event);

  // Get query take the GET value from the request
  const page = Number(getQuery(event).page) || 1;
  const limit = Number(getQuery(event).limit) || 10;

  // Calculate the range of the query
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  if(user.user_metadata.role !== 'admin') return;
  const { data, error, count } = await supabase
    .from('Joiners')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    body: data,
    total: count
  };
});


