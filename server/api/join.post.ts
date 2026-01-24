export default defineEventHandler( async (e) => {

  const { id, name, time } = await readBody(e);
  

  return {
    statusCode: 200,
    message: 'Hai effettuato accesso corretamente!'
  };
  
});