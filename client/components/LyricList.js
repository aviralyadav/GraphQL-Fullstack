import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
    onLick(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    likes: likes + 1,
                    __typename: 'LyricType'
                }
            }
        });

    }
    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return <li className="collection-item" key={id}>
                {content}
                <div className="vote-box">
                    <i className="material-icons" onClick={() => this.onLick(id, likes)}>thumb_up</i>
                    {likes}
                </div>
            </li>;
        });
    }
    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
    mutation LyricLike($id: ID) {
        likeLyric(id: $id) {
        id
        likes
        }
    }
`;

export default graphql(mutation)(LyricList);