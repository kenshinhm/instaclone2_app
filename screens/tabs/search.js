import React from "react";
import styled from "styled-components";
import SearchBar from "../../components/searchBar.js";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;

class Search extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;

        this.state = {
            term: ""
        };

        navigation.setParams({
            term: this.state.term,
            onChange: this.onChange,
            onSubmit: this.onSubmit
        });
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <SearchBar value={navigation.getParam("term", "")}
                       onChange={navigation.getParam("onChange", () => null)}
                       onSubmit={navigation.getParam("onSubmit", () => null)}
            />
        )
    });

    onChange = text => {
        const {navigation} = this.props;
        this.setState({term: text});
        navigation.setParams({
            term: text
        });
    };

    onSubmit = () => {
        console.log("Submit");
    };

    render() {
        return (
            <View>
                <Text>Search</Text>
            </View>
        );
    }
}

export default Search;