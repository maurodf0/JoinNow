import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)
    const userID = user?.user_metadata?.sub;
    console.log(userID)
    const body = await readBody(event);
    const { name, role } = body;
    const { data, error } = await supabase.from('Joiners').insert({ name, role, user_id: userID } as any);
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

