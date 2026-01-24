  import { supabase } from '../../utils/supabase'

export default defineEventHandler(async (e) => {
  try {  
    const { id, name } = readBody(e);
    console.log(id, name);

    const { data, error } = await supabase.from('Users').insert({ id, name });
    if( error ) {
      return {
        statusCode: 500,
        message: error.message
      };  
    }

    console.log(data);

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

