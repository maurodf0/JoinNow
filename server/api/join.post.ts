export default defineEventHandler(async (e) => {
  const { id:number, name:string } = e.body;

  const storage = useStorage();
  const list = (await storage.getItem('join:list')) || [];

  list.push({ id, name, time: new Date().toISOString() });
  await storage.setItem('join:list', list);

  return {
    statusCode: 200,
    message: 'Accesso registrato'
  };
});
