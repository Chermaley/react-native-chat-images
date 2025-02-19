import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import { trueTypeOf } from "../../utils";
import Img from "../Img";
import styles from "./styles";
import ImageViewer from "react-native-image-zoom-viewer";

class Images extends Component {
    state = {
        activeImageIndex: 0,
        modalVisible: false,
        imgToShow: 0,
    };

    showImageListModal = (modalVisible, activeImageIndex) => {
        this.setState({ activeImageIndex, modalVisible });
    };

    lessThanFourImages = () => {
        const { images, backgroundColor, title, extra, ImagePreloader } = this.props;
        const { modalVisible } = this.state;

        const allImages = (
            <View style={[styles.imageContainer, { backgroundColor }]}>
                {title && <Text style={styles.titleStyle}>{title}</Text>}
                <View style={styles.flexRow}>
                    {images.map((image, i) => (
                        <TouchableOpacity
                            key={`chat-image-${i}`}
                            onPress={() => this.showImageListModal(!modalVisible, i)}
                            activeOpacity={0.8}
                            style={styles.flexOne}
                        >
                            <Img
                                ImagePreloader={ImagePreloader}
                                hideCaption={images.length !== 1}
                                style={styles.flexOne}
                                image={image}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                {extra && <Text style={styles.extraStyle}>{extra}</Text>}
            </View>
        );

        return allImages;
    };

    fourImages = () => {
        const { images, backgroundColor, title, extra } = this.props;
        const { modalVisible } = this.state;

        return (
            <View style={[styles.imageContainer, { backgroundColor }]}>
                {title && <Text style={styles.titleStyle}>{title}</Text>}
                <View style={styles.fourImagesInnerView}>
                    {images.map((image, i) => (
                        <TouchableOpacity
                            key={`chat-image-${i}`}
                            onPress={() => this.showImageListModal(!modalVisible, i)}
                            activeOpacity={0.8}
                            style={styles.flexBasisHalf}
                        >
                            <Img hideCaption ImagePreloader={ImagePreloader} image={image} />
                        </TouchableOpacity>
                    ))}
                </View>
                {extra && <Text style={styles.extraStyle}>{extra}</Text>}
            </View>
        );
    };

    moreThanFourImages = () => {
        const { images, backgroundColor, title, extra } = this.props;
        const { modalVisible } = this.state;

        return (
            <View style={[styles.imageContainer, { backgroundColor }]}>
                {title && <Text style={styles.titleStyle}>{title}</Text>}
                <View style={styles.moreThanFourImagesInnerView}>
                    <TouchableOpacity
                        onPress={() => this.showImageListModal(!modalVisible, 0)}
                        activeOpacity={0.8}
                        style={styles.flexBasisHalf}
                    >
                        <Img hideCaption ImagePreloader={ImagePreloader} image={images[0]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.showImageListModal(!modalVisible, 1)}
                        activeOpacity={0.8}
                        style={styles.flexBasisHalf}
                    >
                        <Img hideCaption ImagePreloader={ImagePreloader} image={images[1]} />
                    </TouchableOpacity>
                </View>

                <View style={styles.moreThanFourImagesInnerView}>
                    <TouchableOpacity
                        onPress={() => this.showImageListModal(!modalVisible, 2)}
                        activeOpacity={0.8}
                        style={styles.flexBasisHalf}
                    >
                        <Img hideCaption ImagePreloader={ImagePreloader} image={images[2]} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.showImageListModal(!modalVisible, 3)}
                        activeOpacity={0.8}
                        style={styles.flexBasisHalf}
                    >
                        <View style={styles.moreImagesOverlayContainer}>
                            <View style={styles.moreImagesOverlay}>
                                <Text style={styles.imagesCount}>+{images.length - 3}</Text>
                            </View>
                            <Img hideCaption ImagePreloader={ImagePreloader} image={images[3]} />
                        </View>
                    </TouchableOpacity>
                </View>
                {extra && <Text style={styles.extraStyle}>{extra}</Text>}
            </View>
        );
    };

    render() {
        const { backgroundColor, images, saveOnLongPress, style, title, width, ImagePreloader } =
            this.props;
        const { activeImageIndex, modalVisible } = this.state;

        const imageUrls = images.map((image) => {
            const hasMoreData = trueTypeOf(image) === "object";
            return { url: hasMoreData ? image.url : image };
        });

        return (
            <ScrollView
                style={[{ backgroundColor: "#fff", flexGrow: 1 }, style, { width }]}
            >
                {images.length < 4 && this.lessThanFourImages()}
                {images.length === 4 && this.fourImages()}
                {images.length > 4 && this.moreThanFourImages()}
                <Modal
                    visible={modalVisible}
                    transparent={false}
                    useNativeDriver={true}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <ImageViewer
                        enableSwipeDown
                        onSwipeDown={() => this.setState({ modalVisible: false })}
                        useNativeDriver
                        index={0}
                        loadingRender={() => (
                            <ActivityIndicator size="small" color="#eee" />
                        )}
                        imageUrls={imageUrls}
                        saveToLocalByLongPress={saveOnLongPress}
                        pageAnimateTime={0}
                    />
                </Modal>
            </ScrollView>
        );
    }
}

Images.defaultProps = {
    backgroundColor: "lightgreen",
    extra: undefined,
    saveOnLongPress: true,
    style: {},
    title: undefined,
    width: "100%",
};

Images.propTypes = {
    backgroundColor: PropTypes.string,
    extra: PropTypes.string,
    images: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({
                caption: PropTypes.string,
                captionStyle: PropTypes.shape({}),
                overlay: PropTypes.element,
                thumbnail: PropTypes.string,
                url: PropTypes.string.isRequired,
            }).isRequired,
        ])
    ).isRequired,
    saveOnLongPress: PropTypes.bool,
    style: PropTypes.shape({}),
    title: PropTypes.string,
    width: PropTypes.string,
};

export default Images;
