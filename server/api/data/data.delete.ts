import { serverSupabaseClient } from '#supabase/server'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event);

    if(user?.user_metadata?.role !== 'admin') return;
    const { id } = await readBody(event)
    const { data, error } = await supabase
        .from('Joiners')
        .delete()
        .eq('id', id)
    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }
    return data
})