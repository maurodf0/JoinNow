  import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (e) => {
  console.log(e)
  const getList = await supabase.from('Joiners').select('*').range(0, 10);
  const list = getList.data;

  return {
    statusCode: 200,
    body: list
  };
});


