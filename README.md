# BYOB
Build Your Own Backend

## Endpoints
/api/v1/:id
will return pokemon by type

/api/v1/:id?strongest
will return strongest pokemon for specified type

/api/v1/:id?weakest
will return weakest pokemon for specified type

/api/v1/advantage/:id
get all pokemon that are weak against specified type

/api/v1/advantage/:id?strongest
get strongest pokemon that is weak against specified type

/api/v1/advantage/:id?weakest
get weakest pokemon that is weak against specified type

/api/v1/newtype
add a new type of pokemon

/api/v1/newpokemon
add new pokemon to specified type


/api/v1
removes a pokemon or a type