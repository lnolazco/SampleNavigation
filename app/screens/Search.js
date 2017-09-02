import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { genders, countries, regionlabel, regions } from '../config';
import { nav_actions } from '../redux/actions/types';
import { saveFilter, getLastFilter } from '../services/search';
import Button from '../components/Button';
import SelectItem from '../components/SelectItem';
import Loading from '../components/Loading';

class Search extends Component {
    state = {
        isLoading: true,
        regionLabel: regionlabel.FR,
        regions: [],
    }

    componentWillMount() {
        getLastFilter()
        .then(filter => {
            const country = filter.country;

            this.setState({
                isLoading: false,
                gender: filter.gender,
                country,
                regionLabel: country ? regionlabel[country] : regionlabel.FR,
                regions: country ? regions[country] : [],
                region: filter.region
            });
        })
    }

    onSelectGender = (gender) => this.setState({ gender });
    onSelectCountry = (country) => {
        this.setState({
            country,
            regionLabel: regionlabel[country],
            regions: regions[country]
        });
    };
    onSelectRegion = (region) => this.setState({ region });

    search = () => {
        const { dispatch } = this.props.navigation;
        const state = this.state;

        const filter = {
            gender: state.gender,
            country: state.country,
            region: state.region
        };

        saveFilter(filter);

        dispatch({ type: nav_actions.LIST, filter });
    }

    render() {
        const { state } = this;
        if (state.isLoading) {
            return <Loading />;
        }
        console.log('Render Search state', state);
        return (
            <View style={styles.container}>
                <SelectItem
                    text="Gender"
                    data={genders}
                    selectedValue={state.gender}
                    onSelect={this.onSelectGender}
                />
                <SelectItem
                    text="Country"
                    data={countries}
                    selectedValue={state.country}
                    onSelect={this.onSelectCountry}
                />
                <SelectItem
                    text={state.regionLabel}
                    data={state.regions}
                    selectedValue={state.region}
                    onSelect={this.onSelectRegion}
                />
                <View>
                    <Button text="Search" onPress={this.search} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default Search;
