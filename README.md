# BYOB
Build Your Own Backend

## Endpoints

### GET
http://localhost:3000/api/v1/:poketype
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

### POST

http://localhost:3000/api/v1/newtype
add a new type of pokemon

  example body ```{
	"name": "Ginge",
	"good_against": "Dragon"
}```

  example response ```[
    {
        "id": 1446,
        "name": "Ginge",
        "created_at": "2019-08-17T22:29:20.483Z",
        "updated_at": "2019-08-17T22:29:20.483Z",
        "good_against": "Dragon"
    }
]```

http://localhost:3000/api/v1/newpokemon
add new pokemon to specified type

### DELETE

http://localhost:3000/api/v1
removes a pokemon or a type
