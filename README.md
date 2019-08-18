# Build Your Own Backend

## Sumary
A restful API created with Node/Express, Knex, and PostgreSQL, to document any and all pokemon by type. User can view, add, and delete pokemon types, and pokemon. BYOB is live on Heroku at https://pure-stream-85311.herokuapp.com.

### Learning Goals
I had 7 days to find data to use in a one to many relational database and, learn enough Node/Express, Knex, and PostgreSQL to build a functioning restful API with profesional documentation and error messages.

## Endpoints

### GET

All GET requests will return an array of objects like this
```
[
    {
        "id": 188,
        "name": "Vulpix",
        "hp": "38",
        "attack": "41",
        "defense": "40",
        "speed": "65",
        "type_id": 1437
    },
]
```

https://pure-stream-85311.herokuapp.com/api/v1/type_list
Will return all documented types of pokemon

https://pure-stream-85311.herokuapp.com/api/v1/:poketype
Will return all pokemon by type

https://pure-stream-85311.herokuapp.com/api/v1/:poketype/strongest
Will return strongest pokemon for specified type

https://pure-stream-85311.herokuapp.com/api/v1/:poketype/weakest
Will return weakest pokemon for specified type

https://pure-stream-85311.herokuapp.com/api/v1/advantage/:poketype
Will return all pokemon that are weak against specified type

https://pure-stream-85311.herokuapp.com/api/v1/advantage/:poketype/strongest
Will return the strongest pokemon that is weak against specified type

https://pure-stream-85311.herokuapp.com/api/v1/advantage/:poketype/weakest
Will return the weakest pokemon that is weak against specified type

### POST

All POST requests must be supplied with a json object and each key may only be a string. Failure to do so will result in an error message.

example body
```
{
	"name": "",
	"good_against": "Dragon"
}
```
example response with 400 error
```
"Body value of <name> should be a string greater than 0"
```

https://pure-stream-85311.herokuapp.com/api/v1/newtype
add a new type of pokemon

  example body 
  ```
  {
	"name": "Ginge",
	"good_against": "Dragon"
}
```

  example response 
  ```
  [
    {
        "id": 1446,
        "name": "Ginge",
        "created_at": "2019-08-17T22:29:20.483Z",
        "updated_at": "2019-08-17T22:29:20.483Z",
        "good_against": "Dragon"
    }
]
```

https://pure-stream-85311.herokuapp.com/api/v1/newpokemon
add new pokemon to specified type

example body 
```
{
	"type": "Ginge",
	"name": "Nathan",
	"hp": "200",
	"attack": "200",
	"defense": "200",
	"speed": "200"
}
```

  example response 
  ```
  [
    {
        "id": 313,
        "name": "Nathan",
        "hp": "200",
        "attack": "200",
        "defense": "200",
        "speed": "200",
        "type_id": 1446
    }
]
```

### DELETE

https://pure-stream-85311.herokuapp.com/api/v1
removes a pokemon or a type

example body 
```
{
	"name": "Ginge",
	"type": "type"
}
```

example response 
```
1
```
