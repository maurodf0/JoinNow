import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    await serverSupabaseClient(event)
  
  const {email, password} = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email e password richieste'
    })
  }

  const supabase = await serverSupabaseClient(event)

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  console.log(data)

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message
    })
  }

  return {
    user: data.user,
  }
} catch (error) {
    return {
      error: error.message,
    }
  }
})
