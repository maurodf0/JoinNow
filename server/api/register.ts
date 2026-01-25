import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (e) => {

  const { email, password } = await readBody(e);
  console.log(email, password);

  try {

  const supabase = await serverSupabaseClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return {
      status: 400,
      body: null,
      message: error.message
    }
  }

  return {
    status: 200,
    body: data,
    message: 'User registered successfully'
  }
  } catch (error) {
    return {
      status: 500,
      body: error,
      message: 'Error registering user'
    }
  }

})