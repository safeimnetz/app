import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';

const LIST_CONTAINER_PADDING = 20;
const LIST_BORDER_RADIUS = 10;
const LIST_ROW_DIVIDER_COLOR = '#eaeaea';
const LIST_BACKGROUND_COLOR = '#ffffff';

const ListView = (props: {children: ReactNode | ReactNode[]; style?: ViewStyle}) => {
  const renderRows = (rows: ReactNode[]) => {
    const nodes: ReactNode[] = [];
    for (let i = 0; i < rows.length; i++) {
      const current = rows[i];
      const next = rows[i + 1];
      nodes.push(<View key={i}>{current}</View>);
      if (next != null) {
        nodes.push(
          <View key={i + 'div'} style={{width: '100%', height: 1, backgroundColor: LIST_ROW_DIVIDER_COLOR}} />,
        );
      }
    }
    return nodes;
  };

  const children = props.children instanceof Array ? props.children : [props.children];

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: LIST_CONTAINER_PADDING,
        ...props.style,
      }}>
      <View style={{backgroundColor: LIST_BACKGROUND_COLOR, borderRadius: LIST_BORDER_RADIUS, overflow: 'hidden'}}>
        {renderRows(children)}
      </View>
    </View>
  );
};

export default ListView;
