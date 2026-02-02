import { createClient } from '@supabase/supabase-js'
import generator from 'generate-password'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user || user.user_metadata.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const { email, name, role } = await readBody(event)

  const config = useRuntimeConfig()

  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  const password = generator.generate({
    length: 14,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  })

  
  const { error } = await supabase.auth.admin.generateLink({
    type: 'signup',
    email,
    password,
    options: {
      data: { name, role },
    },
  })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  setResponseStatus(event, 200)

  return {
    success: true,
  }
})
