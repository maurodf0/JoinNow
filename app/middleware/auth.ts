export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()
  
    // Pagine che richiedono solo di essere loggati (es. /data)
    if (to.path === '/data') {
      if (!user.value) {
        return navigateTo('/login')
      }
    }
  })