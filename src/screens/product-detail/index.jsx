import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cartSlice';
import { useGetProductByIdQuery } from '../../store/products/api';
import { COLORS } from '../../themes';

function ProductDetail({ navigation, route }) {
    const dispatch = useDispatch();
    const { color, productId } = route.params;
    const { data, isLoading, error } = useGetProductByIdQuery(productId);

    const product = data?.find((product) => product.id === productId);

    const onAddToCart = () => {
        dispatch(addToCart(product));
    };

    if (isLoading)
        return (
            <View style={styles.containerLoader}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );

    return (
        <View style={styles.container}>
            <View style={[styles.imageContainer, { backgroundColor: color }]}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>USD ${product.price}</Text>
                <View style={styles.containerTags}>
                    {product.tags.map((tag) => (
                        <TouchableOpacity
                            key={tag}
                            style={[styles.containerTag, { backgroundColor: color }]}>
                            <Text style={styles.tag}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={onAddToCart} style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Agregar al carrito</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ProductDetail;
