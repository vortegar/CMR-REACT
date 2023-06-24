export const getClientes = async()  => {
    const resp = await fetch(import.meta.env.VITE_API_URL);
    const data = await resp.json();

    return data
}

export const getCliente = async(id)  => {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const data = await resp.json();
    // console.log(data)
    return data
}

export const postCliente = async(datos) => {

    try {
        const resp = await fetch(import.meta.env.VITE_API_URL,{
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        await resp
    } catch (error) {
        console.log(error)
    }
}

export const putCliente = async(id,datos) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        console.log(resp)
        await resp
    } catch (error) {
        console.log(error)
    }
}


export const eliminarCliente = async(id) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'DELETE',
        });
        console.log(resp)
        await resp
    } catch (error) {
        console.log(error)
    }
}