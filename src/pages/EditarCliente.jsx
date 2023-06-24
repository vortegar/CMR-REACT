import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import Formulario from "../components/Fomulario";
import { getCliente, postCliente, putCliente } from "../data/cliente"
import { Error } from "../components/Error";

export async function loader ({params}) {
    const editarCliente = await getCliente(params.clienteId);
    if( Object.values(editarCliente).length === 0 ){
        throw new Response( '', {
            status: 404,
            statusText: 'No hay Resultados'
        })
    }
    // console.log(editarCliente)
    return editarCliente
}

export async function action({ request, params }) {
  const formData = await request.formData();
  // console.log(params.clienteId)
  const datos = Object.fromEntries(formData);

  const email = formData.get('email');

  // Validacion
  const errores = [];
  if(Object.values(datos).includes('')){
    errores.push('Todos los campos son obligatorios');
  }
  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if( !regex.test(email) ){
    errores.push('El Email no es válido')
  }
  // Retornar datos si hay errores
  if(Object.keys(errores).length){
    return errores
  }
    // Actualizar cliente
    await putCliente( params.clienteId , datos);
    return redirect('/')
}
export const EditarCliente = () => {

  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar un Cliente</h1>
      <p className="mt-3">Aqui podras editar el cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        
        {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}
        <Form
          method="post"
          noValidate
        >

          <Formulario cliente={cliente} />

          <input 
            type="submit" 
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Actualizar Cliente"
          />

        </Form>
      </div>
    </>
  )
}
