export default defineEventHandler( async (e) => {

  const body = await readBody(e);
  console.log(body);

  return {
    statusCode: 200,
    message: 'Hai effettuato accesso corretamente!'
  };
  
});