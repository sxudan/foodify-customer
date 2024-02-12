import React, { FC, ReactNode } from 'react';
import { FlexStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

type TileProps = {
    leading?: ReactNode
    trailing?: ReactNode
    body?: ReactNode
    gap?: number
    justifyContent?: FlexStyle["justifyContent"]
}

const Tile: FC<TileProps> = ({leading, trailing, body, gap = 0, justifyContent = 'flex-start'}) => {
    return (
        <View style={[styles.container, {gap: gap, justifyContent: justifyContent}]}>
            <View>{leading}</View>
            <View style={styles.body}>{body}</View>
            <View>{trailing}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Tile;