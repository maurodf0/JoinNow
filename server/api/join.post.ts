import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const body = await readBody(event);
    const { name, role } = body;
    console.log('name:', name, 'role:', role);
    const { data, error } = await supabase.from('Joiners').insert({ name, role } as any);
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

