export default defineEventHandler(async (e) => {
  const storage = useStorage();
  const list = (await storage.getItem('join:list')) || [];

  return {
    statusCode: 200,
    body: list
  };
});