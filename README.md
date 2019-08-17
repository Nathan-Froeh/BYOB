# BYOB
Build Your Own Backend

## Endpoints
/api/v1/:poketype
will return all pokemon by type

http://localhost:3000/api/v1/:poketype/strongest
will return strongest pokemon for specified type

http://localhost:3000/api/v1/:poketype/weakest
will return weakest pokemon for specified type

http://localhost:3000/api/v1/advantage/:poketype
get all pokemon that are weak against specified type

http://localhost:3000/api/v1/advantage/:poketype/strongest
get strongest pokemon that is weak against specified type

http://localhost:3000/api/v1/advantage/:poketype/weakest
get weakest pokemon that is weak against specified type

http://localhost:3000/api/v1/newtype
add a new type of pokemon

http://localhost:3000/api/v1/newpokemon
add new pokemon to specified type


http://localhost:3000/api/v1
removes a pokemon or a type