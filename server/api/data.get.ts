  import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (e) => {
  const path = e._path;

  // Get query take the GET value from the request
  const page = Number(getQuery(e).page) || 1;
  const limit = Number(getQuery(e).limit) || 10;

  // Calculate the range of the query
  const from = (page - 1) * limit;
  const to = from + limit - 1;  

  const getList = await supabase.from('Joiners').select('*').range(from, to);
  const list = getList.data;

  return {
    statusCode: 200,
    body: list
  };
});


