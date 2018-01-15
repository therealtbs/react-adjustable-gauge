import React from 'react';

export function childrenOfType(types) {
  return (props, propName, componentName) => {
    const prop = props[propName];
    const errors = React.Children.map(prop, (e) => {
      if (!types.includes(e.type)) {
        return new Error(`'${componentName}' should only have children of the following types: ' ${types.join('\', \'')}'`);
      }
      return null;
    }).filter((e) => e);
    if (errors.length > 0) {
      return errors[0];
    }
    return null;
  };
}
