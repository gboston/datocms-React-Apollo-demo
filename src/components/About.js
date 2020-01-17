import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Image } from "react-datocms"

const authorsQuery = gql`
  query authors {
    authors: allAuthors {
      id
      description
      name
      avatar {
        responsiveImage(imgixParams: { fit: crop, crop: faces, w: 300, h: 300 }) {
          aspectRatio
          width
          sizes
          srcSet
          src
          webpSrcSet
          alt
          title
          base64
        }
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
                    <Image
                      className="About-img"
                      data={author.avatar.responsiveImage}
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
