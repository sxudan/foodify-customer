import {useField} from 'formik';
import React, {FC, ReactNode, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import LabelledCheckbox from './LabelledCheckbox';

interface CheckboxFieldProps {
  fieldName: string;
  name?: string;
  onPress?: (checked: boolean) => void;
  labelComponent?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  fieldName,
  name,
  containerStyle,
  labelComponent,
  ...rest
}) => {
  const [{checked}, , {setValue}] = useField({
    name: fieldName,
    type: 'checkbox',
  });

  const onPress = useCallback(
    (nextChecked: boolean) => {
      setValue(nextChecked);
      // Expose change event to parent to allow for submit-on-change functionality
      rest.onPress?.(nextChecked);
    },
    [setValue, rest],
  );

  return (
    <LabelledCheckbox
      onPress={onPress}
      checked={checked ?? false}
      label={name}
      containerStyle={containerStyle}
      labelComponent={labelComponent}
    />
  );
};

export default CheckboxField;
