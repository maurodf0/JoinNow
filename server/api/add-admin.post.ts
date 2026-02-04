import { createClient } from '@supabase/supabase-js'
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

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(
      email,
      {
        data: {
          name,
          role,
        },
      }
    )
    

    if (error) {
      throw error

    }

    return { success: true }
  } catch (err) {
    throw err
  }
})
