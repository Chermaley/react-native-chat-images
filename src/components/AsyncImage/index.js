import React, { Component } from "react";
import { Image, View, Platform} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

class AsyncImage extends Component {
    state = { error: false, loaded: false };

    render() {
        const { source, isLocal, ImagePreloader } = this.props;
        const { loaded, error } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Image
                        onError={() => this.setState({ error: true, loaded: false })}
                        onLoad={() => this.setState({ loaded: true })}
                        source={{ uri: source }}
                        style={{...styles.img, opacity: loaded || isLocal ? 1: 0}}
                    />
                    {Platform.OS !== 'ios' && !isLocal && !loaded && ImagePreloader}
                </View>
            </View>
        );
    }
}

AsyncImage.propTypes = { source: PropTypes.string.isRequired };

export default AsyncImage;


