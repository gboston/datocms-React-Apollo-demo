# DatoCMS example blog using React & Apollo

## Set up your own

By clicking the following button you'll set up a project on DatoCMS with the schema and data that you need to run this example.

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/react-apollo-demo)

### How to start

Clone this repo

Create a .env file with your project's read-only api token.

`echo 'REACT_APP_DATO_API_TOKEN=abc123' >> .env`

Then run

`yarn && yarn start`

### Setting up Apollo Client

Apollo does not support modular blocks out of the box because, by default, Apollo Client's cache is not able to deduce the schema when provided GraphQl union types. So if you use modular content in any of your models it is up to you to provide the projects's schema to Apollo's cache.

To do that open the [DatoCMS cda explorer](https://cda-explorer.datocms.com/) and type in this query

```
query Schema {
  __schema {
	    types {
        name
        kind
        possibleTypes {
          name
        }
      }
  }
}
```

Now paste the result in the schema.json file.

Be aware that if you make any changes to the schema you will have to do that again as Apollo Client now relies on the schema you provided to build the cache.

Read more about union types in Apollo [here](https://www.apollographql.com/docs/react/advanced/fragments/?origin_team=T7S1KJ4MS#fragments-on-unions-and-interfaces).

### Read more

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Apollo documentation can be found [here](https://www.apollographql.com/docs/react/).
