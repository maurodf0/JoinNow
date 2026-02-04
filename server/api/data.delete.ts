import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
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