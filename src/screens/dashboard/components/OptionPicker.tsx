import Checkbox from '@components/CheckBox';
import ItemSeparator from '@components/ItemSeparator';
import Title from '@components/Title';
import theme from '@utils/theme';
import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export type OptionPickerData = {
  id: string;
  name: string;
  price?: string;
};

type Props = {
  data: OptionPickerData[];
  multiselect?: boolean;
  onSelect?: (seleted?: OptionPickerData) => void;
  onMultiSelect?: (selected: OptionPickerData[]) => void;
  title?: string;
  selected?: OptionPickerData | undefined
  multiselectedData?: OptionPickerData[];
};

const OptionPicker: FC<Props> = ({data, onSelect, multiselect = false, title = 'Choose:', onMultiSelect, selected, multiselectedData}) => {
//   const [selected, setSelected] = useState<OptionPickerData | undefined>();
//   const [multiselectedData, setMultiselectedData] = useState<OptionPickerData[]>([]);

  if (data.length == 0) {
    return <></>
  }

  const _onSingleSelect = (item: OptionPickerData) => {
    // setSelected(item);
    const tmp = {...(selected || {})}
    if (tmp.id == item.id) {
      onSelect?.call(this, undefined);
    } else {
      onSelect?.call(this, item);
    }
    
  }

  const _onMultiSelect = (item: OptionPickerData) => {
    let tmp = [...(multiselectedData ?? [])];
    // remove if exists
    const includes = tmp.filter(t => t.id == item.id).length > 0;
    if (includes) {
        tmp = tmp.filter(t => t.id != item.id)
    } else {
        tmp = [...tmp, item];
    }
    // setMultiselectedData(tmp);
    onMultiSelect?.call(this, tmp);
  }

  return (
    <View>
        <Title size={theme.fonts.textTitleSizeBig} >{title}</Title>
        <FlatList
            scrollEnabled={false}
            data={data}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <ItemSeparator lineColor="#ddd" />}
            contentContainerStyle={{borderColor: '#ddd', borderWidth: 1, marginVertical: 12}}
            renderItem={({item, index}) => {
            return (
                <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    if (!multiselect) {
                        _onSingleSelect(item);
                    } else {
                        _onMultiSelect(item);
                    }
                }}>
                <Title size={theme.fonts.textTitleSize}>{item.name}</Title>
                {item.price && <Title size={theme.fonts.subTextTitleSize}>{item.price}</Title>}
                <View style={styles.spacer} />
                {
                    !multiselect && selected?.id === item.id && (
                        <Icon name="checkmark-outline" size={14} color={'red'}/>
                    )
                }
                {
                    multiselect && multiselectedData!.filter(m => m.id == item.id).length > 0 && (
                        <Icon name="checkmark-outline" size={14} color={'red'}/>
                    )
                }
                </TouchableOpacity>
            );
            }}
        />
        <View style={{height: 8}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center'
  },
  spacer: {
    flex: 1,
  },
});

export default OptionPicker;
