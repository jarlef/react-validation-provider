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
import { validate } from 'react-validation-provider';

@validate()
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
import { validate } from 'react-validation-provider';

class TextInput extends React.Component {
    render() {
        return ( 
            <input type="text" {...this.props} />
        );
    }
}

export default validate()(TextInput);
````

Afterwards you simply place these components inside your form components

```
    <label>Name</label>
    <TextInput value={this.state.name}
               onChange={(ev) => this.setState({name: ev.target.value})}
               rules={[required]}
    <label>Year</label>
    <TextInput value={this.state.year}
               onChange={(ev) => this.setState({year: ev.target.value})}
               rules={[required, year]}
``` 

The rules prop is a special prop used by the 




component to validate 
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
import { scope } from 'react-validation-provider';

@scope()
export default class MyForm extends React.Component {
   render() {
       return( 
           <div>
               //form elements here

               <button disabled={!this.props.isValid} onClick={() => this.submitMyForm()}>Submit</button>
           </div>
       );

   }
}
````

