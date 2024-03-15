# Simple CRUD operation API
To run this project, simply run `npm install` on the directory the files are in and then run the `npm run dev` command. This should start the server on `http://localhost:3000`  or any other defined port if modified by yourself

## URLs and API parameters
The base URL is `http://localhost:[port_number]/api/users` . To represent CRUD, the `POST`, `GET`, `PATCH` and `DELETE` method was implemented. The schema of the object to be modified is as follows:
```
[
{
 username: string,
 password: string
},
...
]
```

### JSON payload for the `POST` & `PATCH` method :

| name     | type   |
| -------- | ------ |
| username | string |
| password | string |

### JSON payload for the `DELETE` method:

| name     | type   |
| -------- | ------ |
| username | string |

The `GET` method doesn't require any payload