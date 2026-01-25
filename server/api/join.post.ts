  import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (e) => {
  try {  
    const body = await readBody(e);
    const { name, role } = body;
    console.log('name:', name, 'role:', role);
    const { data, error } = await supabase.from('Joiners').insert({ name, role });
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

