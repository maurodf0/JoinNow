  import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (e) => {
  try {  
    const { name, role } = await readBody(e);
    const { data, error } = await supabase.from('Users').insert({ name, role });
    if (error) {
      return {
        statusCode: 500,
        message: error.message
      };  
    }

    return {
      statusCode: 200,
      message: 'Accesso registrato'
    }

  } catch (error) {
    return {
      statusCode: 500,
      message: (error as any).message
    };  
  }
});

