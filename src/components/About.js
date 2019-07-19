import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const authorsQuery = gql`
  query authors {
    authors: allAuthors {
      id
      description
      name
      avatar {
        url
      }
    }
  }
`;

const Authors = props => {
  return (
    <Query query={authorsQuery}>
      {({ data, loading, error }) => {
        if (loading) return "Loading...";
        if (error) return `ERROR: ${error}`;
        return (
          <section>
            <div>
              {data.authors.map(author => (
                <div className="About-author" key={author.id}>
                  <div className="About-infoHeader">
                    <img
                      className="About-img"
                      alt={author.name}
                      src={author.avatar.url}
                    />
                    <h2>{author.name}</h2>
                  </div>
                  <p>{author.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      }}
    </Query>
  );
};

export default Authors;
