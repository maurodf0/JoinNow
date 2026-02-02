import { createClient } from '@supabase/supabase-js'
import generator from 'generate-password'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {


  try {
    const user = await serverSupabaseUser(event)
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
    }

    if (user.user_metadata?.role !== 'admin') {
      throw createError({ statusCode: 403, statusMessage: 'Not admin' })
    }

    const {name, role, email} = await readBody(event)

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

    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email: email,
      password,
      options: {
        data: {
          name: name,
          role: role,
        },
      },
    })

    if (error) {
      throw error
    }

    return { success: true }
  } catch (err) {
    throw err
  }
})
