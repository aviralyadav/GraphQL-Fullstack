import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import query from '../queries/fetchSongs';

class LyricCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }
    onSubmit (event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content
            }
        }).then(()=>this.setState({content: ''}));
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add Lyric</label>
                <input value={this.state.content} onChange={event=>this.setState({content: event.target.value})} />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyric($content: String, $songId:ID){
        addLyricToSong(content: $content, songId: $songId){
        id
        lyrics {
            id
            content
        }
        }
    }
`;

export default graphql(mutation)(LyricCreate);