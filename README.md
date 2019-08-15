# BYOB
Build Your Own Backend

## Endpoints
/api/v1/:id
will return pokemon by type

localhost3000/:id?strongest 
will return strongest pokemon for specified type

localhost3000/:id?weakest 
will return weakest pokemon for specified type

localhost3000/advantage/:id
get all pokemon that are weak against specified type

localhost3000/advantage/:id?strongest
get strongest pokemon that is weak against specified type

localhost3000/advantage/:id?weakest
get weakest pokemon that is weak against specified type

localhost3000/newtype
add a new type of pokemon

localhost3000/:id/newpokemon
add new pokemon to specified type


localhost3000/remove
removes a pokemon or a type