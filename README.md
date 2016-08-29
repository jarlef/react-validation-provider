# React Validation Provider

Non-intrusive validation library for [React](https://facebook.github.io/react/). 

## Installation

```
npm install --save react-validation-provider
```
    
## Example usage

The first you need to define in you application is the form element types
that is going to be validated. This is done by wrapping the input elements/components
inside a react component that is decorated with *@validationComponent* decorator. 

```
import { validationComponent } from 'reaect-validation-provider';

@validationComponent
export default class TextInput extends React.Component {
    render() {
        return ( 
            <input type="text" {...this.props} />
        );
    }
}
````

```
//alternative without using decorator
import { validationComponent } from 'reaect-validation-provider';

class TextInput extends React.Component {
    render() {
        return ( 
            <input type="text" {...this.props} />
        );
    }
}

export default validationComponent(TextInput);
````

Afterwards you simply place these components inside your form components

```
    <label>Name</label>
    <TextInput value={this.state.name}
               onChange={(ev) => this.setState({name: ev.target.value})}
               rule={[required]}
    <label>Year</label>
    <TextInput value={this.state.year}
               onChange={(ev) => this.setState({year: ev.target.value})}
               rule={[required, year]}
``` 

The rule prop is a special prop used by the validation component to validate 
the value prop of the wrapped component. The rules are simply implemented by 
defining and object with a validation expression and a message hint method.

```
export const required = (message = "Required field") => {
    return {
        validate: value => {
            return !!value.trim();
        },
        hint: () => {
            return message;
        }
    };
};
```

The last thing you have to define the the validation scope. This is typically the top most form component that 
contains all the input components that are going to be evaulted. The result of the evaluated validation is 
injected into the isValid prop.

```
import { validationContext } from 'react-validation-provider';

@validationContext
export default class MyForm extends React.Component {
   render() {
       return( 
           //form elements here

           <button disabled={!this.props.isValid} onClick={() => this.submitMyForm()}>Submit</button>
       );

   }
}
````

