  import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (e) => {
  const getList = await supabase.from('Users').select('*');
  const list = getList.data;

  return {
    statusCode: 200,
    body: list
  };
});


