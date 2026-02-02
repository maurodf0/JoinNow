import { createClient } from '@supabase/supabase-js'
import generator from 'generate-password'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  console.log('➡️ add-admin START')

  try {
    const user = await serverSupabaseUser(event)
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
    }

    if (user.user_metadata?.role !== 'admin') {
      console.log('❌ not admin')
      throw createError({ statusCode: 403, statusMessage: 'Not admin' })
    }

    // 2️⃣ body
    const body = await readBody(event)
    console.log('📦 body:', body)

    // 3️⃣ runtime config
    const config = useRuntimeConfig()
    console.log(
      '🔐 has url:',
      !!config.supabaseUrl,
      'has service key:',
      !!config.supabaseServiceRoleKey
    )

    // 4️⃣ supabase admin client
    const supabase = createClient(
      config.supabaseUrl,
      config.supabaseServiceRoleKey
    )

    // 5️⃣ password
    const password = generator.generate({
      length: 14,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    })

    console.log('🔑 password generated')

    // 6️⃣ generate link
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email: body.email,
      password,
      options: {
        data: {
          name: body.name,
          role: body.role,
        },
      },
    })

    console.log('📨 supabase response:', { data, error })

    if (error) {
      throw error
    }

    console.log('✅ add-admin SUCCESS')
    return { success: true }
  } catch (err) {
    console.error('🔥 add-admin ERROR:', err)
    throw err
  }
})
