export default defineNuxtRouteMiddleware((to) => {
  // Su server useSupabaseUser() può essere ancora null (sessione non pronta),
  // quindi controlliamo solo sul client per evitare redirect errati dopo magic link
  if (import.meta.server) return

  const user = useSupabaseUser()
  if (to.path === '/data' && (!user.value || user.value.user_metadata?.role !== 'admin')) {
    return navigateTo('/login')
  }
})