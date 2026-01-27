  import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (e) => {

  // Get query take the GET value from the request
  const page = Number(getQuery(e).page) || 1;
  const limit = Number(getQuery(e).limit) || 10;

  // Calculate the range of the query
  const from = (page - 1) * limit;
  const to = from + limit - 1;  

    const { data, error, count } = await supabase
    .from('Joiners')
    .select('*', { count: 'exact' }) 
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


