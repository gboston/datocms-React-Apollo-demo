import React from "react";
import Markdown from "react-markdown";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const recipeQuery = gql`
  query singleRecipe($slug: String!) {
    recipe: recipe(filter: { slug: { eq: $slug } }) {
      id
      slug
      title
      author {
        name
      }
      abstract
      ingredients
      coverImage {
        url
      }
      content {
        ... on TextImageBlockRecord {
          id
          __typename
          image {
            url
            alt
          }
          text
        }
        ... on TextBlockRecord {
          id
          __typename
          text
        }
      }
    }
  }
`;

const Recipe = props => {
  return (
    <Query query={recipeQuery} variables={{ slug: props.match.params.slug }}>
      {({ data, loading, error }) => {
        if (loading) return "Loading...";
        if (error) return `ERROR: ${error}`;
        const { recipe } = data;
        return (
          <section>
            {recipe && (
              <article>
                <h1 className="Recipe-title">{recipe.title}</h1>
                <strong>
                  By <Link to={"/about"}>{recipe.author.name}</Link>
                </strong>
                <Markdown
                  source={recipe.abstract}
                  escapeHtml={false}
                  className="Recipe-abstract"
                />
                <Imgix
                  alt={recipe.title}
                  src={recipe.coverImage.url}
                  sizes="100vw"
                  className="Recipe-cover"
                />
                <div className="Recipe-box">
                  <h5 className="Recipe-box-title">Ingredients</h5>
                  <Markdown source={recipe.ingredients} escapeHtml={false} />
                </div>
                {recipe.content.map((block, i) => {
                  if (block.__typename === "TextImageBlockRecord") {
                    return (
                      <div key={block.id} className="Recipe-flag">
                        <div className="Recipe-flag-number">{i + 1}</div>
                        <Imgix
                          alt={block.image.alt}
                          src={block.image.url}
                          sizes="50vw"
                          className="Recipe-flag-image"
                        />
                        <Markdown
                          source={block.text}
                          className="Recipe-flag-text"
                        />
                      </div>
                    );
                  } else if (block.__typename === "TextBlockRecord") {
                    return (
                      <div key={block.id} className="Recipe-flag">
                        <div className="Recipe-flag-number">{i + 1}</div>
                        <Markdown
                          source={block.text}
                          className="Recipe-flag-text"
                        />
                      </div>
                    );
                  }
                  return <div key={block.id} />;
                })}
              </article>
            )}
          </section>
        );
      }}
    </Query>
  );
};

export default Recipe;
