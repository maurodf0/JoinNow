export default defineEventHandler(async (e) => {
  const { id, name, time } = await readBody(e);

  const storage = useStorage();
  const list = (await storage.getItem('join:list')) || [];

  list.push({ id, name, time });
  await storage.setItem('join:list', list);

  return {
    statusCode: 200,
    message: 'Accesso registrato'
  };
});
