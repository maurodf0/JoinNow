import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
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

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message
    })
  }

  return {
    user: data.user,
  }
})
