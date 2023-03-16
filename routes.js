const json = require('./user.json');

const routes = [
    {
        method: 'GET',
        path:'/contacts',
        handler: (request, h)=>{
            const user = JSON.parse(JSON.stringify(json));
            return h.response(user).code(200);
        }
    },
    {
        method: 'POST',
        path: '/contacts',
        handler: (request, h)=>{
            const {
                name,
                email,
                phone
            } = request.payload;

            const id = json[json.length - 1].id + 1;

            json.push({
                id: id,
                name: name,
                email: email,
                phone: phone,
            })

            return h.response({
                status: 201,
                message: 'Post Success',
                data: [
                    {
                        id: id,
                        name: name,
                        email: email,
                        phone: phone,
                    }
                ]
            })
        }
    },
    {
        method: 'DELETE',
        path: '/contacts/{id}',
        handler: (request, h) => {
            const { id } = request.params;
            const index = json.findIndex(contact => contact.id === Number(id));
    
            if (index === -1) {
                return h.response(
                    { 
                        status: 404,
                        message: 'Contact Not Found' 
                    }
                ).code(404);
            }
    
            json.splice(index, 1);
    
            return h.response(
                { 
                    status: 201,
                    message: 'Contact deleted successfully' 
                }
            )
        },
      },
]

module.exports = routes;